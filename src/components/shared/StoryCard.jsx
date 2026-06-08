const StoryCard = ({ story }) => {
  return (
    <article className="overflow-hidden rounded-[18px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div className={`h-28 bg-gradient-to-br ${story.image}`} />
      <div className="p-3">
        <h3 className="truncate text-sm font-extrabold text-slate-950">
          {story.title}
        </h3>
        <p className="mt-1 text-xs text-slate-400">New story</p>
      </div>
    </article>
  )
}

export default StoryCard
