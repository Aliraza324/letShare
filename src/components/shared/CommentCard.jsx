import { Heart } from 'lucide-react'

const CommentCard = ({ comment }) => {
  return (
    <div className="flex items-start gap-3">
      <img
        src={comment.avatar}
        alt={comment.author}
        className="h-8 w-8 shrink-0 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="truncate text-xs font-extrabold text-slate-950">
              {comment.author}
            </h4>
            <p className="mt-1 max-w-[520px] text-xs leading-5 text-slate-600">
              {comment.text}
            </p>
          </div>

          <button
            type="button"
            className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full transition hover:bg-slate-50 ${
              comment.liked ? 'text-red-500' : 'text-slate-400'
            }`}
            aria-label="Like comment"
          >
            <Heart
              className={`h-4 w-4 ${comment.liked ? 'fill-red-500' : ''}`}
            />
          </button>
        </div>

        <div className="mt-1 flex items-center gap-3 text-[11px] font-medium text-slate-400">
          <button type="button" className="hover:text-slate-600">
            Like
          </button>
          <button type="button" className="hover:text-slate-600">
            Reply
          </button>
          <span>{comment.likes}</span>
        </div>
      </div>
    </div>
  )
}

export default CommentCard
