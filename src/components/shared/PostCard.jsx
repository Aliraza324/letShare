import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Smile,
} from 'lucide-react'
import CommentCard from './CommentCard'
import EmojiPicker from './EmojiPicker'
import MediaGallery from './MediaGallery'
import MentionDropdown from './MentionDropdown'
import { useToast } from '../../utils/toastContext'
import {
  formatRelativeTime,
  getMentionQuery,
  insertAtCursor,
  insertMention as insertMentionText,
} from '../../utils/social'
import { comments as seedComments } from '../../mock/homeFeed'
import avatar from '../../assets/images/avatar.jpg'
import boyAvatar from '../../assets/images/boy.png'
import davidAvatar from '../../assets/images/david.jpg'
import samraAvatar from '../../assets/images/samra.jpg'
import pinkiAvatar from '../../assets/images/pinki.png'

const INITIAL_VISIBLE_COMMENTS = 3
const SORT_ORDER = 'newest'

const mentionUsers = [
  { id: 'samra', name: 'Samra Ahmed', handle: 'samra', avatar: samraAvatar },
  { id: 'david', name: 'David Cooper', handle: 'david', avatar: davidAvatar },
  { id: 'pinki', name: 'Pinki Khan', handle: 'pinki', avatar: pinkiAvatar },
  { id: 'courtney', name: 'Courtney Henry', handle: 'courtney', avatar: boyAvatar },
]

const currentUser = {
  id: 'me',
  author: 'Samra Ahmed',
  avatar,
}

const parseLikeCount = (likes) => {
  if (typeof likes === 'number') return likes
  if (!likes) return 0
  const normalized = String(likes).toLowerCase()
  const value = Number.parseFloat(normalized)
  if (Number.isNaN(value)) return 0
  return normalized.includes('k') ? Math.round(value * 1000) : value
}

const formatNumber = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`
  }

  return String(value)
}

const createSeedComments = () => {
  const now = Date.now()

  return seedComments.map((comment, index) => ({
    ...comment,
    createdAt: new Date(now - (index + 1) * 12 * 60000).toISOString(),
    likeCount: parseLikeCount(comment.likes),
    replies:
      index === 0
        ? [
            {
              id: `${comment.id}-reply-1`,
              author: 'Samra Ahmed',
              avatar,
              text: '@courtney That is such a good point.',
              createdAt: new Date(now - 5 * 60000).toISOString(),
              likeCount: 4,
              liked: false,
              replies: [],
            },
          ]
        : [],
  }))
}

const countComments = (items) =>
  items.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0)

const updateCommentTree = (items, targetId, updater) =>
  items.map((comment) => {
    if (comment.id === targetId) return updater(comment)

    if (comment.replies?.length) {
      return {
        ...comment,
        replies: updateCommentTree(comment.replies, targetId, updater),
      }
    }

    return comment
  })

const addReplyToTree = (items, targetId, reply) =>
  items.map((comment) => {
    if (comment.id === targetId) {
      return {
        ...comment,
        replies: [reply, ...(comment.replies || [])],
      }
    }

    if (comment.replies?.length) {
      return {
        ...comment,
        replies: addReplyToTree(comment.replies, targetId, reply),
      }
    }

    return comment
  })

const PostCard = ({ post }) => {
  const { showToast } = useToast()
  const commentInputRef = useRef(null)
  const [showComments, setShowComments] = useState(false)
  const [commentItems, setCommentItems] = useState(() => createSeedComments())
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COMMENTS)
  const [commentInput, setCommentInput] = useState('')
  const [commentError, setCommentError] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [activeMentionIndex, setActiveMentionIndex] = useState(0)
  const mentionQuery = getMentionQuery(commentInput)

  const sortedComments = [...commentItems].sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime()
      const bTime = new Date(b.createdAt).getTime()
      return SORT_ORDER === 'newest' ? bTime - aTime : aTime - bTime
    })

  const visibleComments = sortedComments.slice(0, visibleCount)
  const totalComments = countComments(commentItems)
  const postCommentCount = totalComments || parseLikeCount(post.comments)

  const pushNotification = (message) => {
    setNotifications((current) => [
      { id: crypto.randomUUID(), message },
      ...current.slice(0, 2),
    ])
  }

  const notifyMentions = (text) => {
    const mentions = text.match(/@[a-zA-Z0-9_.]+/g) || []
    mentions.forEach((mention) => {
      pushNotification(`${mention} was mentioned in a comment.`)
    })
  }

  const addComment = (event) => {
    event.preventDefault()
    setCommentError('')

    if (!commentInput.trim()) {
      setCommentError('Comment cannot be empty.')
      return
    }

    setIsSubmittingComment(true)
    window.setTimeout(() => {
      const newComment = {
        id: crypto.randomUUID(),
        author: currentUser.author,
        avatar: currentUser.avatar,
        text: commentInput.trim(),
        createdAt: new Date().toISOString(),
        likeCount: 0,
        liked: false,
        replies: [],
      }

      setCommentItems((current) => [newComment, ...current])
      setVisibleCount((current) => Math.max(current, INITIAL_VISIBLE_COMMENTS))
      pushNotification(`${currentUser.author} commented on ${post.author}'s post.`)
      notifyMentions(commentInput)
      setCommentInput('')
      setIsSubmittingComment(false)
      setShowComments(true)
    }, 350)
  }

  const addReply = (commentId, text) => {
    const reply = {
      id: crypto.randomUUID(),
      author: currentUser.author,
      avatar: currentUser.avatar,
      text,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      liked: false,
      replies: [],
    }

    setCommentItems((current) => addReplyToTree(current, commentId, reply))
    pushNotification(`${currentUser.author} replied to a comment.`)
    notifyMentions(text)
  }

  const toggleCommentLike = (commentId) => {
    setCommentItems((current) =>
      updateCommentTree(current, commentId, (comment) => ({
        ...comment,
        liked: !comment.liked,
        likeCount: Math.max(0, comment.likeCount + (comment.liked ? -1 : 1)),
      })),
    )
    pushNotification('Someone liked a comment.')
  }

  const insertMention = (user) => {
    setCommentInput((current) => insertMentionText(current, user))
    setActiveMentionIndex(0)
    window.requestAnimationFrame(() => commentInputRef.current?.focus())
  }

  const insertEmoji = (emoji) => {
    const { nextCursor, nextValue } = insertAtCursor(
      commentInput,
      emoji,
      commentInputRef.current,
    )

    setCommentInput(nextValue)
    setShowEmojiPicker(false)

    window.requestAnimationFrame(() => {
      commentInputRef.current?.focus()
      commentInputRef.current?.setSelectionRange(nextCursor, nextCursor)
    })
  }

  const handleCommentKeyDown = (event) => {
    if (!mentionQuery) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveMentionIndex((current) => Math.min(current + 1, 4))
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveMentionIndex((current) => Math.max(current - 1, 0))
    }
  }

  const handleSavePost = () => {
    showToast({
      title: 'Post saved',
      message: 'This post has been added to your saved collection.',
      type: 'success',
    })
  }

  return (
    <article className="overflow-hidden rounded-[18px] bg-white ">
      <div className="flex items-start gap-3 px-4 pt-4">
        <img
          src={post.avatar}
          alt={post.author}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-1.5 text-xs text-slate-500">
            <h2 className="text-sm font-extrabold text-slate-950">
              {post.author}
            </h2>
            <span>›</span>
            <span className="font-semibold text-slate-700">
              {post.community}
            </span>
            <span className="text-[#7ac900]">●</span>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">
            {formatRelativeTime(post.createdAt)} • {post.visibility}
          </p>
        </div>

        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-50"
          aria-label="Post options"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <p className="px-4 py-3 text-sm leading-6 text-slate-700">
        {post.content}
      </p>

      <MediaGallery post={post} />

      <div className="flex items-center justify-between px-4 py-3 text-slate-400">
        <div className="flex items-center gap-5 text-xs font-medium">
          <button
            type="button"
            className="flex items-center gap-1.5 transition hover:text-red-500"
            aria-label="Like post"
          >
            <Heart className="h-5 w-5" />
            {post.likes}
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 transition hover:text-slate-700"
            aria-expanded={showComments}
            aria-label="Show comments"
            onClick={() => setShowComments((current) => !current)}
          >
            <MessageCircle className="h-5 w-5" />
            {formatNumber(postCommentCount)}
          </button>
          <button
            type="button"
            className="transition hover:text-slate-700"
            aria-label="Share post"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          className="transition hover:text-slate-700"
          aria-label="Save post"
          onClick={handleSavePost}
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-visible border-t border-slate-100"
          >
            <div className="px-4 pb-4 pt-3">
              {notifications.length > 0 && (
                <div className="mb-3 space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="rounded-xl bg-[#f4fbdf] px-3 py-2 text-xs font-semibold text-slate-700"
                    >
                      {notification.message}
                    </div>
                  ))}
                </div>
              )}

              {sortedComments.length > visibleCount && (
                <button
                  type="button"
                  className="mb-3 text-xs font-extrabold text-[#65a900] hover:text-[#4f8500]"
                  onClick={() => setVisibleCount((current) => current + 3)}
                >
                  View More Comments
                </button>
              )}

              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {visibleComments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      currentUser={currentUser}
                      onAddReply={addReply}
                      onLike={toggleCommentLike}
                      users={mentionUsers}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <form className="mt-5 border-t border-slate-100 pt-3" onSubmit={addComment}>
                <div className="flex items-center gap-2">
                  <img
                    src={avatar}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="relative min-w-0 flex-1">
                    <label className="flex h-10 min-w-0 items-center gap-2 rounded-full bg-slate-100 px-4 text-slate-400 focus-within:ring-2 focus-within:ring-[#a6ef00]/40">
                      <button
                        type="button"
                        className="shrink-0 text-slate-400 transition hover:text-slate-600"
                        aria-label="Open emoji picker"
                        onClick={() => setShowEmojiPicker((current) => !current)}
                      >
                        <Smile className="h-4 w-4" />
                      </button>
                      <input
                        ref={commentInputRef}
                        type="text"
                        value={commentInput}
                        onChange={(event) => {
                          setCommentInput(event.target.value)
                          setActiveMentionIndex(0)
                        }}
                        onKeyDown={handleCommentKeyDown}
                        placeholder="Add a comment..."
                        className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                      />
                      <button
                        type="submit"
                        disabled={isSubmittingComment}
                        className="grid h-7 w-7 place-items-center rounded-full text-[#7ac900] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                        aria-label="Send comment"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </label>

                    {showEmojiPicker && (
                      <EmojiPicker
                        onClose={() => setShowEmojiPicker(false)}
                        onSelect={insertEmoji}
                      />
                    )}

                    <MentionDropdown
                      activeIndex={activeMentionIndex}
                      query={mentionQuery}
                      users={mentionUsers}
                      onSelect={insertMention}
                    />
                  </div>
                </div>

                {commentError && (
                  <p className="mt-2 pl-10 text-xs font-medium text-red-500">
                    {commentError}
                  </p>
                )}
                {isSubmittingComment && (
                  <p className="mt-2 pl-10 text-xs font-medium text-slate-400">
                    Posting comment...
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default PostCard
