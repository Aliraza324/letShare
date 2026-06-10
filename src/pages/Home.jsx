import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Send, Smile, X } from 'lucide-react'
import InfiniteScroll from 'react-infinite-scroll-component'
import MainLayout from '../layouts/MainLayout'
import ExploreCommunities from '../components/home/ExploreCommunities'
import HeroSection from '../components/home/HeroSection'
import PostComposer from '../components/home/PostComposer'
import EmojiPicker from '../components/shared/EmojiPicker'
import PostCard from '../components/shared/PostCard'
import StoryCard from '../components/shared/StoryCard'
import { feedPosts, stories } from '../mock/homeFeed'
import { insertAtCursor } from '../utils/social'

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const storyVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.36,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const storyReactions = ['Like', 'Love', 'Haha', 'Wow', 'Sad']
const storyViewers = ['Ali', 'Ahmed', 'Sara', 'John']
const FEED_BATCH_SIZE = 3
const MAX_FEED_POSTS = 12

const Home = () => {
  const storySliderRef = useRef(null)
  const storyReplyRef = useRef(null)
  const uploadedStoryUrls = useRef([])
  const dragState = useRef({
    isDown: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
  })
  const [isDraggingStories, setIsDraggingStories] = useState(false)
  const [storyItems, setStoryItems] = useState(stories)
  const [selectedStoryId, setSelectedStoryId] = useState(null)
  const [storyReply, setStoryReply] = useState('')
  const [selectedReaction, setSelectedReaction] = useState('')
  const [showStoryEmojiPicker, setShowStoryEmojiPicker] = useState(false)
  const [visiblePostCount, setVisiblePostCount] = useState(FEED_BATCH_SIZE)
  const [feedBaseTime] = useState(() => Date.now())
  const viewableStories = useMemo(
    () => storyItems.filter((story) => story.type !== 'create'),
    [storyItems],
  )
  const selectedStoryIndex = viewableStories.findIndex(
    (story) => story.id === selectedStoryId,
  )
  const selectedStory = selectedStoryIndex >= 0 ? viewableStories[selectedStoryIndex] : null
  const hydratedPosts = useMemo(
    () =>
      Array.from({ length: MAX_FEED_POSTS }, (_, index) => {
        const seedPost = feedPosts[index % feedPosts.length]

        return {
          ...seedPost,
          id: `${seedPost.id}-${index}`,
          createdAt: new Date(feedBaseTime - (index + 1) * 38 * 60000).toISOString(),
        }
      }),
    [feedBaseTime],
  )
  const visiblePosts = hydratedPosts.slice(0, visiblePostCount)
  const hasMorePosts = visiblePostCount < hydratedPosts.length

  useEffect(() => {
    const objectUrls = uploadedStoryUrls.current

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const loadMorePosts = () => {
    window.setTimeout(() => {
      setVisiblePostCount((current) =>
        Math.min(current + FEED_BATCH_SIZE, hydratedPosts.length),
      )
    }, 550)
  }

  const handleCreateStory = (files, caption = '') => {
    const uploadedStories = files
      .filter((file) => file.type.startsWith('image/') || file.type.startsWith('video/'))
      .map((file) => {
        const url = URL.createObjectURL(file)

        uploadedStoryUrls.current.push(url)

        return {
          id: `uploaded-${url}`,
          title: caption || 'Your moment',
          ...(file.type.startsWith('video/') ? { video: url } : { image: url }),
        }
      })

    if (uploadedStories.length === 0) return

    setStoryItems((currentStories) => [
      currentStories[0],
      ...uploadedStories,
      ...currentStories.slice(1),
    ])
    setSelectedStoryId(uploadedStories[0].id)
  }

  const handleOpenStory = useCallback((story) => {
    setSelectedStoryId(story.id)
    setSelectedReaction('')
    setStoryReply('')
    setStoryItems((currentStories) =>
      currentStories.map((item) =>
        item.id === story.id ? { ...item, viewed: true } : item,
      ),
    )
  }, [])

  const submitStoryReply = (event) => {
    event.preventDefault()
    setStoryReply('')
  }

  const insertStoryEmoji = (emoji) => {
    const { nextCursor, nextValue } = insertAtCursor(
      storyReply,
      emoji,
      storyReplyRef.current,
    )

    setStoryReply(nextValue)
    setShowStoryEmojiPicker(false)

    window.requestAnimationFrame(() => {
      storyReplyRef.current?.focus()
      storyReplyRef.current?.setSelectionRange(nextCursor, nextCursor)
    })
  }

  const showPreviousStory = useCallback(() => {
    if (viewableStories.length === 0 || selectedStoryIndex < 0) return

    const previousIndex =
      selectedStoryIndex === 0 ? viewableStories.length - 1 : selectedStoryIndex - 1

    handleOpenStory(viewableStories[previousIndex])
  }, [handleOpenStory, selectedStoryIndex, viewableStories])

  const showNextStory = useCallback(() => {
    if (viewableStories.length === 0 || selectedStoryIndex < 0) return

    const nextIndex =
      selectedStoryIndex === viewableStories.length - 1 ? 0 : selectedStoryIndex + 1

    handleOpenStory(viewableStories[nextIndex])
  }, [handleOpenStory, selectedStoryIndex, viewableStories])

  useEffect(() => {
    if (!selectedStory) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedStoryId(null)
      }

      if (event.key === 'ArrowLeft') {
        showPreviousStory()
      }

      if (event.key === 'ArrowRight') {
        showNextStory()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedStory, showNextStory, showPreviousStory])

  const handleStoryPointerDown = (event) => {
    const slider = storySliderRef.current
    if (!slider || event.target.closest('[data-story-upload]')) return

    dragState.current = {
      isDown: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: slider.scrollLeft,
    }
    setIsDraggingStories(true)
    slider.setPointerCapture?.(event.pointerId)
  }

  const handleStoryPointerMove = (event) => {
    const slider = storySliderRef.current
    const state = dragState.current
    if (!slider || !state.isDown) return

    const distance = event.clientX - state.startX
    if (Math.abs(distance) > 4) {
      state.moved = true
    }

    slider.scrollLeft = state.scrollLeft - distance
  }

  const stopStoryDrag = (event) => {
    const slider = storySliderRef.current
    if (slider) {
      slider.releasePointerCapture?.(event.pointerId)
    }

    dragState.current.isDown = false
    setIsDraggingStories(false)
  }

  const handleStoryClickCapture = (event) => {
    if (event.target.closest('[data-story-card], [data-story-upload]')) {
      dragState.current.moved = false
      return
    }

    if (!dragState.current.moved) return

    event.preventDefault()
    event.stopPropagation()
    dragState.current.moved = false
  }

  return (
    <>
      <MainLayout>
        <motion.div
          className="space-y-4 sm:space-y-5"
          variants={pageVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={sectionVariants}>
            <HeroSection />
          </motion.div>

        <motion.section
          ref={storySliderRef}
          className={`!mt-0 flex gap-2 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] sm:gap-4 md:!mt-5 [&::-webkit-scrollbar]:hidden ${
            isDraggingStories ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          variants={sectionVariants}
          onClickCapture={handleStoryClickCapture}
          onPointerDown={handleStoryPointerDown}
          onPointerMove={handleStoryPointerMove}
          onPointerUp={stopStoryDrag}
          onPointerCancel={stopStoryDrag}
          onPointerLeave={stopStoryDrag}
        >
          {storyItems.map((story) => (
            <motion.div
              key={story.id}
              className="w-16 flex-none sm:w-[152px] lg:w-[164px]"
              variants={storyVariants}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <StoryCard
                story={story}
                onCreateStory={handleCreateStory}
                onOpenStory={handleOpenStory}
              />
            </motion.div>
          ))}
        </motion.section>

        <motion.div variants={sectionVariants}>
          <PostComposer />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <ExploreCommunities />
        </motion.div>

        <motion.section className="space-y-3" variants={sectionVariants}>
          <h2 className="text-lg font-extrabold text-slate-950 sm:text-xl">
            Explore Newest Feed
          </h2>
          <div className="grid grid-cols-3 items-center gap-2 sm:flex sm:flex-wrap sm:gap-3">
            <motion.button
              type="button"
              className="h-9 min-w-0 rounded-full bg-[#8ddf00] px-2 text-xs font-extrabold text-black sm:h-10 sm:px-6 sm:text-sm"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              ✨ For You
            </motion.button>
            <motion.button
              type="button"
              className="h-9 min-w-0 rounded-full border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 sm:h-10 sm:px-5 sm:text-sm"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              🔥 Trending
            </motion.button>
            <motion.button
              type="button"
              className="h-9 min-w-0 rounded-full border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 sm:h-10 sm:px-5 sm:text-sm"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              🎥 Reels
            </motion.button>
          </div>
        </motion.section>

        <InfiniteScroll
          dataLength={visiblePosts.length}
          hasMore={hasMorePosts}
          loader={
            <div className="space-y-3">
              {[0, 1].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[18px] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-32 animate-pulse rounded-full bg-slate-100" />
                      <div className="h-3 w-20 animate-pulse rounded-full bg-slate-100" />
                    </div>
                  </div>
                  <div className="mt-4 h-64 animate-pulse rounded-2xl bg-slate-100" />
                </div>
              ))}
            </div>
          }
          next={loadMorePosts}
          scrollThreshold={0.82}
          className="space-y-3 overflow-visible"
        >
          {visiblePosts.map((post) => (
            <motion.div
              key={post.id}
              variants={sectionVariants}
              whileHover={{ y: -3 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </InfiniteScroll>
      </motion.div>
      </MainLayout>

      <AnimatePresence>
        {selectedStory && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/85 px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStoryId(null)}
          >
            <motion.div
              className="relative flex h-full max-h-[720px] w-full max-w-[430px] overflow-hidden rounded-2xl bg-black ring-1 ring-white/15 sm:max-h-[760px] lg:max-w-[900px]"
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute left-3 right-3 top-3 z-10 h-1 overflow-hidden rounded-full bg-white/25 lg:right-[300px]">
                <div className="h-full w-2/3 rounded-full bg-white" />
              </div>

              <div className="absolute left-3 right-3 top-7 z-10 flex items-center justify-between lg:right-[300px]">
                <div className="flex min-w-0 items-center gap-2">
                  {selectedStory.avatar ? (
                    <img
                      src={selectedStory.avatar}
                      alt=""
                      className="h-9 w-9 rounded-full border-2 border-[#8ddf00] object-cover"
                    />
                  ) : (
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#8ddf00] text-sm font-extrabold text-black">
                      {(selectedStory.title || 'S').charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-white">
                      {selectedStory.title || 'Story'}
                    </p>
                    <p className="text-xs font-semibold text-white/65">Just now</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                  aria-label="Close story"
                  onClick={() => setSelectedStoryId(null)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {selectedStory.video ? (
                <video
                  key={selectedStory.id}
                  src={selectedStory.video}
                  className="h-full min-w-0 flex-1 object-cover"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={selectedStory.image}
                  alt=""
                  className="h-full min-w-0 flex-1 object-cover"
                />
              )}

              <div className="absolute bottom-20 left-3 right-3 z-10 flex gap-2 overflow-x-auto [scrollbar-width:none] lg:right-[300px] [&::-webkit-scrollbar]:hidden">
                {storyReactions.map((reaction) => (
                  <button
                    key={reaction}
                    type="button"
                    className={`rounded-full px-3 py-1.5 text-xs font-extrabold backdrop-blur transition ${
                      selectedReaction === reaction
                        ? 'bg-[#8ddf00] text-black'
                        : 'bg-black/45 text-white hover:bg-black/65'
                    }`}
                    onClick={() => setSelectedReaction(reaction)}
                  >
                    {reaction}
                  </button>
                ))}
              </div>

              <form
                className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-2 rounded-full bg-black/45 p-2 backdrop-blur lg:right-[300px]"
                onSubmit={submitStoryReply}
              >
                <div className="relative flex-none">
                  <button
                    type="button"
                    className="grid h-8 w-8 place-items-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white"
                    aria-label="Open story emoji picker"
                    onClick={() => setShowStoryEmojiPicker((current) => !current)}
                  >
                    <Smile className="h-5 w-5" />
                  </button>
                  {showStoryEmojiPicker && (
                    <EmojiPicker
                      onClose={() => setShowStoryEmojiPicker(false)}
                      onSelect={insertStoryEmoji}
                    />
                  )}
                </div>
                <input
                  ref={storyReplyRef}
                  value={storyReply}
                  onChange={(event) => setStoryReply(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/60"
                  placeholder="Reply to Story..."
                  aria-label="Reply to story"
                />
                <button
                  type="submit"
                  className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[#8ddf00] text-black"
                  aria-label="Send story reply"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <button
                type="button"
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
                aria-label="Previous story"
                onClick={showPreviousStory}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65 lg:right-[300px]"
                aria-label="Next story"
                onClick={showNextStory}
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <aside className="hidden w-[288px] flex-none flex-col gap-5 bg-white p-5 text-slate-900 lg:flex">
                <div>
                  <p className="text-xs font-extrabold uppercase text-slate-400">
                    Story details
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold">
                    {selectedStory.title || 'Story'}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Viewed by {storyViewers.length} people
                  </p>
                </div>

                <div>
                  <p className="text-sm font-extrabold text-slate-900">Reactions</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {storyReactions.map((reaction) => (
                      <button
                        key={reaction}
                        type="button"
                        className={`rounded-full px-3 py-2 text-xs font-extrabold transition ${
                          selectedReaction === reaction
                            ? 'bg-[#8ddf00] text-black'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        onClick={() => setSelectedReaction(reaction)}
                      >
                        {reaction}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-extrabold text-slate-900">Viewers</p>
                  <div className="mt-3 space-y-2">
                    {storyViewers.map((viewer) => (
                      <div
                        key={viewer}
                        className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600"
                      >
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ecffc8] text-xs font-extrabold text-black">
                          {viewer.charAt(0)}
                        </span>
                        {viewer}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Home
