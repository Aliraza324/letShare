import { memo, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Send, Smile } from 'lucide-react'

const mentionPattern = /(@[a-zA-Z0-9_.]+)/g

const formatNumber = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`
  }

  return String(value)
}

const formatRelativeTime = (date) => {
  const diff = Math.max(0, Date.now() - new Date(date).getTime())
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

const CommentText = memo(({ text }) => {
  const parts = useMemo(() => text.split(mentionPattern), [text])

  return (
    <>
      {parts.map((part, index) =>
        part.match(mentionPattern) ? (
          <span key={`${part}-${index}`} className="font-bold text-[#65a900]">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
})

CommentText.displayName = 'CommentText'

const MentionSuggestions = ({ query, users, onSelect }) => {
  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(query.replace('@', '').toLowerCase()),
    )
    .slice(0, 4)

  if (!query || filteredUsers.length === 0) return null

  return (
    <div className="absolute bottom-full left-0 mb-2 w-56 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
      {filteredUsers.map((user) => (
        <button
          key={user.id}
          type="button"
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-[#f4fbdf]"
          onClick={() => onSelect(user)}
        >
          <img src={user.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
          @{user.handle}
        </button>
      ))}
    </div>
  )
}

const ReplyComposer = ({
  autoFocus = false,
  error,
  onSubmit,
  submitting,
  users,
}) => {
  const [value, setValue] = useState('')
  const mentionQuery = value.match(/(^|\s)(@[a-zA-Z0-9_.]*)$/)?.[2] || ''

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(value, {
      onSuccess: () => setValue(''),
    })
  }

  const insertMention = (user) => {
    setValue((current) =>
      current.replace(/(^|\s)(@[a-zA-Z0-9_.]*)$/, `$1@${user.handle} `),
    )
  }

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="relative flex items-center gap-2">
        <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-slate-100 px-3 text-slate-400 focus-within:ring-2 focus-within:ring-[#a6ef00]/40">
          <Smile className="h-4 w-4 shrink-0" />
          <input
            autoFocus={autoFocus}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            type="text"
            placeholder="Write a reply..."
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#9bf000] text-black transition hover:bg-[#8be000] disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Send reply"
        >
          <Send className="h-4 w-4" />
        </button>

        <MentionSuggestions
          query={mentionQuery}
          users={users}
          onSelect={insertMention}
        />
      </div>
      {error && <p className="mt-1 px-3 text-xs font-medium text-red-500">{error}</p>}
    </form>
  )
}

const CommentCard = memo(
  ({
    comment,
    currentUser,
    depth = 0,
    onAddReply,
    onLike,
    users,
  }) => {
    const [showReplyComposer, setShowReplyComposer] = useState(false)
    const [replyError, setReplyError] = useState('')
    const [isSubmittingReply, setIsSubmittingReply] = useState(false)
    const replies = comment.replies || []

    const handleReplySubmit = (text, { onSuccess }) => {
      setReplyError('')

      if (!text.trim()) {
        setReplyError('Reply cannot be empty.')
        return
      }

      setIsSubmittingReply(true)
      window.setTimeout(() => {
        onAddReply(comment.id, text.trim())
        setIsSubmittingReply(false)
        setShowReplyComposer(false)
        onSuccess()
      }, 300)
    }

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className={depth > 0 ? 'ml-8 border-l-2 border-slate-100 pl-3' : ''}
      >
        <div className="flex items-start gap-2.5">
          <img
            src={comment.avatar}
            alt={comment.author}
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="inline-block max-w-full rounded-2xl bg-slate-100 px-3 py-2">
              <h4 className="truncate text-xs font-extrabold text-slate-950">
                {comment.author}
              </h4>
              <p className="mt-1 text-xs leading-5 text-slate-700">
                <CommentText text={comment.text} />
              </p>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-3 px-2 text-[11px] font-bold text-slate-400">
              <span className="font-medium">{formatRelativeTime(comment.createdAt)}</span>
              <button
                type="button"
                className={comment.liked ? 'text-red-500' : 'hover:text-slate-600'}
                onClick={() => onLike(comment.id)}
              >
                Like
              </button>
              {depth === 0 && (
                <button
                  type="button"
                  className="hover:text-slate-600"
                  onClick={() => setShowReplyComposer((current) => !current)}
                >
                  Reply
                </button>
              )}
              <span className="inline-flex items-center gap-1">
                <Heart
                  className={`h-3.5 w-3.5 ${
                    comment.liked ? 'fill-red-500 text-red-500' : 'text-slate-300'
                  }`}
                />
                {formatNumber(comment.likeCount)}
              </span>
              {depth === 0 && replies.length > 0 && (
                <span>{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</span>
              )}
            </div>

            <AnimatePresence>
              {showReplyComposer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <ReplyComposer
                    autoFocus
                    currentUser={currentUser}
                    error={replyError}
                    onSubmit={handleReplySubmit}
                    submitting={isSubmittingReply}
                    users={users}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {replies.length > 0 && (
              <div className="mt-3 space-y-3">
                <AnimatePresence initial={false}>
                  {replies.map((reply) => (
                    <CommentCard
                      key={reply.id}
                      comment={reply}
                      currentUser={currentUser}
                      depth={depth + 1}
                      onAddReply={onAddReply}
                      onLike={onLike}
                      users={users}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  },
)

CommentCard.displayName = 'CommentCard'

export default CommentCard
