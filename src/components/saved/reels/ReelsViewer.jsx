
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  Expand,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import avatar from '../../../assets/images/avatar.jpg'
import DesktopPanel from './DesktopPanel'
import MobileCommentsSheet from './MobileCommentsSheet'
import MobileOverlay from './MobileOverlay'
import ReelVideo from './ReelVideo'
import { initialComments, initialReels } from './reelsData'

const nearbyRange = 1

const ReelsViewer = ({ initialIndex = 0, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [likedIds, setLikedIds] = useState(() => new Set())
  const [savedIds, setSavedIds] = useState(() => new Set(initialReels.map((reel) => reel.id)))
  const [expandedIds, setExpandedIds] = useState(() => new Set())
  const [commentsByReel, setCommentsByReel] = useState(initialComments)
  const [commentInput, setCommentInput] = useState('')
  const [replyTarget, setReplyTarget] = useState(null)
  const [editingTarget, setEditingTarget] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [likePulse, setLikePulse] = useState(false)
  const [shareNotice, setShareNotice] = useState('')
  const videoRefs = useRef([])
  const wheelLock = useRef(false)
  const longPressTimer = useRef(null)
  const touchStartY = useRef(0)

  const reels = useMemo(() => initialReels, [])
  const activeReel = reels[activeIndex]
  const activeComments = commentsByReel[activeReel.id] || []

  const playVideo = useCallback((video) => {
    const playPromise = video.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => setPlaying(false))
    }
  }, [])

  const navigateReel = useCallback(
    (direction) => {
      setActiveIndex((current) => {
        const next = (current + direction + reels.length) % reels.length
        return next
      })
      setPlaying(true)
      setShareOpen(false)
      setReplyTarget(null)
      setEditingTarget(null)
      setCommentInput('')
    },
    [reels.length]
  )

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return

      if (index === activeIndex && playing) {
        playVideo(video)
      } else {
        video.pause()
      }
    })
  }, [activeIndex, playing, playVideo])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        navigateReel(1)
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        navigateReel(-1)
      }
      if (event.key === ' ') {
        event.preventDefault()
        setPlaying((current) => !current)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigateReel])

  const toggleSet = (setter, id) => {
    setter((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleLike = () => {
    toggleSet(setLikedIds, activeReel.id)
    setLikePulse(true)
    window.setTimeout(() => setLikePulse(false), 520)
  }

  const handleDoubleLike = () => {
    setLikedIds((current) => new Set(current).add(activeReel.id))
    setLikePulse(true)
    window.setTimeout(() => setLikePulse(false), 560)
  }

  const handleTogglePlay = (event) => {
    const video = event.currentTarget

    if (video.paused || video.ended) {
      setPlaying(true)
      playVideo(video)
      return
    }

    video.pause()
    setPlaying(false)
  }

  const handleWheel = (event) => {
    if (Math.abs(event.deltaY) < 28 || wheelLock.current) return

    wheelLock.current = true
    navigateReel(event.deltaY > 0 ? 1 : -1)
    window.setTimeout(() => {
      wheelLock.current = false
    }, 720)
  }

  const handleTouchStart = (event) => {
    touchStartY.current = event.touches[0].clientY
  }

  const handleTouchEnd = (event) => {
    if (sheetOpen) return
    const delta = touchStartY.current - event.changedTouches[0].clientY
    if (Math.abs(delta) < 60) return
    navigateReel(delta > 0 ? 1 : -1)
  }

  const handleLongPressStart = () => {
    longPressTimer.current = window.setTimeout(() => setPlaying(false), 320)
  }

  const handleLongPressEnd = () => {
    window.clearTimeout(longPressTimer.current)
  }

  const handleMentionPick = (user) => {
    setCommentInput((current) => {
      const marker = current.lastIndexOf('@')
      if (marker === -1) return `${current}@${user.handle} `
      return `${current.slice(0, marker)}@${user.handle} `
    })
  }

  const handleSubmitComment = (event) => {
    event.preventDefault()
    const text = commentInput.trim()
    if (!text) return

    if (editingTarget) {
      setCommentsByReel((current) => ({
        ...current,
        [activeReel.id]: current[activeReel.id].map((comment) =>
          comment.id === editingTarget.id ? { ...comment, text } : comment
        ),
      }))
      setEditingTarget(null)
      setCommentInput('')
      return
    }

    const newComment = {
      id: `own-${Date.now()}`,
      author: { name: 'You', handle: 'you', avatar },
      text,
      time: 'now',
      likes: 0,
      own: true,
      replies: [],
    }

    setCommentsByReel((current) => {
      const list = current[activeReel.id] || []

      if (replyTarget) {
        return {
          ...current,
          [activeReel.id]: list.map((comment) =>
            comment.id === replyTarget.id
              ? {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      ...newComment,
                      id: `reply-${Date.now()}`,
                      text,
                    },
                  ],
                }
              : comment
          ),
        }
      }

      return {
        ...current,
        [activeReel.id]: [newComment, ...list],
      }
    })

    setReplyTarget(null)
    setCommentInput('')
  }

  const updateCommentLike = (commentId) => {
    setCommentsByReel((current) => ({
      ...current,
      [activeReel.id]: current[activeReel.id].map((comment) =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      ),
    }))
  }

  const updateReplyLike = (commentId, replyId) => {
    setCommentsByReel((current) => ({
      ...current,
      [activeReel.id]: current[activeReel.id].map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
              ),
            }
          : comment
      ),
    }))
  }

  const handleReply = (comment) => {
    setReplyTarget(comment)
    setEditingTarget(null)
    setCommentInput(`@${comment.author.handle} `)
    setSheetOpen(true)
  }

  const handleEdit = (comment) => {
    setEditingTarget(comment)
    setReplyTarget(null)
    setCommentInput(comment.text)
    setSheetOpen(true)
  }

  const handleDelete = (commentId) => {
    setCommentsByReel((current) => ({
      ...current,
      [activeReel.id]: current[activeReel.id].filter(
        (comment) => comment.id !== commentId
      ),
    }))
  }

  const handleShare = () => {
    setShareNotice('Link copied')
    window.setTimeout(() => setShareNotice(''), 1400)
  }

  return (
    <section
      className="relative h-[100dvh] overflow-hidden bg-[#050505] text-white"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-3 md:px-6">
        <div>
          
          <h1 className="text-lg font-black md:text-2xl">Reels</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
            aria-label={muted ? 'Unmute' : 'Mute'}
            onClick={() => setMuted((current) => !current)}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={() => setPlaying((current) => !current)}
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
          </button>
          {onClose && (
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
              aria-label="Close reels viewer"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div
        className="flex h-full flex-col transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${activeIndex * 100}%)` }}
      >
        {reels.map((reel, index) => {
          const active = index === activeIndex
          const shouldLoad = Math.abs(index - activeIndex) <= nearbyRange
          const liked = likedIds.has(reel.id)
          const saved = savedIds.has(reel.id)
          const expanded = expandedIds.has(reel.id)

          return (
            <article
              key={reel.id}
              className="relative flex h-full w-full shrink-0 flex-col md:flex-row"
            >
              <div className="relative flex h-full min-w-0 flex-1 items-center justify-center bg-[#070707] md:w-[60%] xl:w-[70%]">
                <ReelVideo
                  reel={reel}
                  active={active}
                  shouldLoad={shouldLoad}
                  muted={muted}
                  playing={playing}
                  onTogglePlay={handleTogglePlay}
                  onDoubleLike={handleDoubleLike}
                  onLongPressStart={handleLongPressStart}
                  onLongPressEnd={handleLongPressEnd}
                  videoRef={(node) => {
                    videoRefs.current[index] = node
                  }}
                />

                <div className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15 disabled:opacity-30"
                    aria-label="Previous reel"
                    onClick={() => navigateReel(-1)}
                  >
                    <ChevronUp className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
                    aria-label="Next reel"
                    onClick={() => navigateReel(1)}
                  >
                    <ChevronDown className="h-6 w-6" />
                  </button>
                </div>

                <button
                  type="button"
                  className="absolute bottom-5 right-5 z-20 hidden h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15 md:grid"
                  aria-label="Fullscreen"
                  onClick={() => videoRefs.current[index]?.requestFullscreen?.()}
                >
                  <Expand className="h-5 w-5" />
                </button>

                <MobileOverlay
                  reel={reel}
                  liked={liked}
                  saved={saved}
                  expanded={expanded}
                  onToggleExpanded={() => toggleSet(setExpandedIds, reel.id)}
                  onLike={handleLike}
                  onComment={() => setSheetOpen(true)}
                  onShare={handleShare}
                  onSave={() => toggleSet(setSavedIds, reel.id)}
                  likePulse={active && likePulse}
                />
              </div>

              <DesktopPanel
                reel={reel}
                liked={liked}
                saved={saved}
                expanded={expanded}
                comments={commentsByReel[reel.id] || []}
                input={commentInput}
                replyTarget={replyTarget}
                editingTarget={editingTarget}
                shareOpen={active && shareOpen}
                onInput={setCommentInput}
                onMentionPick={handleMentionPick}
                onSubmitComment={handleSubmitComment}
                onToggleExpanded={() => toggleSet(setExpandedIds, reel.id)}
                onLike={handleLike}
                onCommentLike={updateCommentLike}
                onReply={handleReply}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onReplyLike={updateReplyLike}
                onShare={handleShare}
                onSave={() => toggleSet(setSavedIds, reel.id)}
                onToggleShare={() => setShareOpen((current) => !current)}
                onCancelMode={() => {
                  setReplyTarget(null)
                  setEditingTarget(null)
                  setCommentInput('')
                }}
              />
            </article>
          )
        })}
      </div>

      <div className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 gap-1.5 md:flex">
        {reels.map((reel, index) => (
          <button
            key={reel.id}
            type="button"
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex ? 'w-9 bg-[#b7f238]' : 'w-3 bg-white/25'
            }`}
            aria-label={`Go to reel ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {shareNotice && (
          <motion.div
            className="fixed left-1/2 top-20 z-[90] -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-black shadow-[0_16px_35px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {shareNotice}
          </motion.div>
        )}
      </AnimatePresence>

      <MobileCommentsSheet
        open={sheetOpen}
        comments={activeComments}
        input={commentInput}
        replyTarget={replyTarget}
        editingTarget={editingTarget}
        onClose={() => setSheetOpen(false)}
        onInput={setCommentInput}
        onMentionPick={handleMentionPick}
        onSubmitComment={handleSubmitComment}
        onCommentLike={updateCommentLike}
        onReply={handleReply}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReplyLike={updateReplyLike}
        onCancelMode={() => {
          setReplyTarget(null)
          setEditingTarget(null)
          setCommentInput('')
        }}
      />
    </section>
  )
}

export default ReelsViewer
