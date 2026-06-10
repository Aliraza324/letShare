
import { Music, Play } from 'lucide-react'
import { formatCount } from './reelsUtils'

const ReelPreviewCard = ({ onOpen, reel }) => {
  const handleOpen = (event) => {
    event?.preventDefault()
    event?.stopPropagation()
    onOpen()
  }

  return (
    <article
      role="button"
      tabIndex={0}
      data-reel-preview-card
      className="group relative block h-[420px] w-full overflow-hidden rounded-[18px] bg-black text-left shadow-[0_12px_28px_rgba(15,23,42,0.08)] outline-none transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.16)] focus-visible:ring-2 focus-visible:ring-[#9bf000] sm:h-[520px]"
      aria-label="Open reel"
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleOpen(event)
        }
      }}
    >
      <video
        src={reel.video}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/12 to-transparent" />
      <span className="pointer-events-none absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/14 text-white backdrop-blur-md transition group-hover:bg-[#9bf000] group-hover:text-black">
        <Play className="ml-0.5 h-5 w-5 fill-current" />
      </span>

      <div className="pointer-events-none absolute inset-x-5 bottom-6 text-white">
        <div className="flex items-center gap-2">
          <img
            src={reel.creator.avatar}
            alt=""
            className="h-8 w-8 rounded-full border border-[#8ddf00] object-cover"
          />
          <span className="min-w-0 truncate text-sm font-extrabold">
            @{reel.creator.handle}
          </span>
          <span className="h-5 rounded-full border border-white/50 px-2 text-[10px] font-bold">
            Saved
          </span>
        </div>

        <p className="mt-4 line-clamp-2 text-xs font-medium leading-5">
          {reel.caption}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold">
          <Music className="h-3.5 w-3.5 fill-white" />
          <span className="min-w-0 truncate">{reel.music}</span>
        </div>

        <div className="mt-4 flex items-center gap-4 text-[11px] font-bold text-white/80">
          <span>{formatCount(reel.likes)} likes</span>
          <span>{formatCount(reel.comments)} comments</span>
        </div>
      </div>
    </article>
  )
}

export default ReelPreviewCard
