
import { AnimatePresence, motion } from 'framer-motion'
import { Bookmark, Heart, MessageCircle, Music, Share2 } from 'lucide-react'
import ActionButton from './ActionButton'
import { formatCount } from './reelsUtils'

const MobileOverlay = ({
  reel,
  liked,
  saved,
  expanded,
  onToggleExpanded,
  onLike,
  onComment,
  onShare,
  onSave,
  likePulse,
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex md:hidden">
      <AnimatePresence>
        {likePulse && (
          <motion.div
            className="absolute inset-0 grid place-items-center"
            initial={{ opacity: 0, scale: 0.45 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
          >
            <Heart className="h-24 w-24 fill-[#ff3b6b] text-[#ff3b6b] drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4">
        <ActionButton
          icon={Heart}
          label="Like reel"
          count={formatCount(reel.likes + (liked ? 1 : 0))}
          active={liked}
          onClick={onLike}
        />
        <ActionButton
          icon={MessageCircle}
          label="Open comments"
          count={formatCount(reel.comments)}
          onClick={onComment}
        />
        <ActionButton
          icon={Share2}
          label="Share reel"
          count={formatCount(reel.shares)}
          onClick={onShare}
        />
        <ActionButton
          icon={Bookmark}
          label="Save reel"
          active={saved}
          onClick={onSave}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 px-4 pb-8 pr-20 text-white">
        <div className="pointer-events-auto flex items-center gap-2">
          <img
            src={reel.creator.avatar}
            alt=""
            className="h-10 w-10 rounded-full border border-[#b7f238] object-cover"
          />
          <span className="min-w-0 truncate text-sm font-extrabold">
            @{reel.creator.handle}
          </span>
          <button
            type="button"
            className="h-7 rounded-full border border-white/45 px-3 text-xs font-bold"
          >
            Follow
          </button>
        </div>
        <p className="pointer-events-auto mt-3 text-sm font-medium leading-5 text-white/90">
          {expanded ? reel.caption : `${reel.caption.slice(0, 82)}... `}
          <button
            type="button"
            className="font-extrabold text-white"
            onClick={onToggleExpanded}
          >
            {expanded ? 'See less' : 'See more'}
          </button>
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-xs font-bold text-[#b7f238]">
          {reel.hashtags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <div className="mt-3 flex min-w-0 items-center gap-2 text-xs font-semibold text-white/80">
          <Music className="h-4 w-4 shrink-0 fill-white" />
          <span className="truncate">{reel.music}</span>
        </div>
      </div>
    </div>
  )
}

export default MobileOverlay
