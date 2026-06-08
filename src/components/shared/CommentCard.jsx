const CommentCard = ({ comment }) => {
  return (
    <div className="flex gap-3">
      <div className="h-8 w-8 shrink-0 rounded-full bg-slate-200" />
      <div className="rounded-2xl bg-slate-50 px-3 py-2">
        <h4 className="text-xs font-extrabold text-slate-950">
          {comment.author}
        </h4>
        <p className="mt-1 text-xs text-slate-500">{comment.text}</p>
      </div>
    </div>
  )
}

export default CommentCard
