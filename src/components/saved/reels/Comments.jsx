
import { useState } from 'react'
import { Send, Smile } from 'lucide-react'
import { formatCount } from './reelsUtils'

const HighlightedText = ({ text }) => {
  return (
    <>
      {text.split(/(@[a-zA-Z0-9_.]+)/g).map((part, index) =>
        part.startsWith('@') ? (
          <span key={`${part}-${index}`} className="font-bold text-[#b7f238]">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  )
}

const CommentInput = ({
  value,
  onChange,
  onSubmit,
  mentionOptions,
  onMentionPick,
  placeholder = 'Add a comment...',
}) => {
  const showMentions = value.includes('@')

  return (
    <form className="relative flex items-center gap-2" onSubmit={onSubmit}>
      <button
        type="button"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white hover:bg-white/15"
        aria-label="Add emoji"
        onClick={() => onChange(`${value} :)`)}
      >
        <Smile className="h-4 w-4" />
      </button>
      <div className="relative min-w-0 flex-1">
        {showMentions && (
          <div className="absolute bottom-12 left-0 z-20 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
            {mentionOptions.map((user) => (
              <button
                key={user.handle}
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-white hover:bg-white/10"
                onClick={() => onMentionPick(user)}
              >
                <img
                  src={user.avatar}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover"
                />
                @{user.handle}
              </button>
            ))}
          </div>
        )}
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-full border border-white/10 bg-white/10 px-4 text-sm font-medium text-white outline-none placeholder:text-white/50 focus:border-[#b7f238]/70"
        />
      </div>
      <button
        type="submit"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#b7f238] text-black disabled:opacity-50"
        aria-label="Send comment"
        disabled={!value.trim()}
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  )
}

const CommentItem = ({
  comment,
  onLike,
  onReply,
  onEdit,
  onDelete,
  onReplyLike,
}) => {
  const [showReplies, setShowReplies] = useState(true)

  return (
    <article className="space-y-3">
      <div className="flex gap-3">
        <img
          src={comment.author.avatar}
          alt=""
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="rounded-2xl bg-white/8 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-extrabold text-white">
                {comment.author.name}
              </span>
              <span className="text-[11px] font-semibold text-white/45">
                {comment.time}
              </span>
            </div>
            <p className="mt-1 text-sm leading-5 text-white/78">
              <HighlightedText text={comment.text} />
            </p>
          </div>
          <div className="mt-2 flex items-center gap-4 px-1 text-[11px] font-bold text-white/55">
            <button type="button" onClick={() => onLike(comment.id)}>
              Like {comment.likes ? formatCount(comment.likes) : ''}
            </button>
            <button type="button" onClick={() => onReply(comment)}>
              Reply
            </button>
            {comment.own && (
              <>
                <button type="button" onClick={() => onEdit(comment)}>
                  Edit
                </button>
                <button type="button" onClick={() => onDelete(comment.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="ml-12 space-y-3 border-l border-white/10 pl-3">
          <button
            type="button"
            className="text-xs font-bold text-white/55"
            onClick={() => setShowReplies((current) => !current)}
          >
            {showReplies ? 'Hide replies' : `View ${comment.replies.length} replies`}
          </button>
          {showReplies &&
            comment.replies.map((reply) => (
              <div key={reply.id} className="flex gap-2">
                <img
                  src={reply.author.avatar}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="rounded-2xl bg-white/7 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-xs font-extrabold text-white">
                        {reply.author.name}
                      </span>
                      <span className="text-[10px] font-semibold text-white/40">
                        {reply.time}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-white/72">
                      <HighlightedText text={reply.text} />
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-3 px-1 text-[10px] font-bold text-white/50">
                    <button
                      type="button"
                      onClick={() => onReplyLike(comment.id, reply.id)}
                    >
                      Like {reply.likes ? formatCount(reply.likes) : ''}
                    </button>
                    <button type="button" onClick={() => onReply(comment)}>
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </article>
  )
}

const CommentsList = ({
  comments,
  onLike,
  onReply,
  onEdit,
  onDelete,
  onReplyLike,
}) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onLike={onLike}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          onReplyLike={onReplyLike}
        />
      ))}
    </div>
  )
}

export { CommentInput, CommentsList }
