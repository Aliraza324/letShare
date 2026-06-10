
import { AnimatePresence, motion } from 'framer-motion'
import { Play } from 'lucide-react'

const ReelVideo = ({
  reel,
  active,
  shouldLoad,
  muted,
  playing,
  onTogglePlay,
  onDoubleLike,
  onLongPressStart,
  onLongPressEnd,
  videoRef,
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-none bg-zinc-950 shadow-[0_28px_80px_rgba(0,0,0,0.45)] md:aspect-[9/16] md:h-[min(82vh,860px)] md:w-auto md:rounded-[28px]">
      {!shouldLoad && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-zinc-800 via-zinc-950 to-zinc-800" />
      )}
      {shouldLoad && (
        <video
          ref={videoRef}
          src={reel.video}
          className="h-full w-full object-cover"
          muted={muted}
          loop
          playsInline
          preload={active ? 'auto' : 'metadata'}
          onClick={onTogglePlay}
          onDoubleClick={onDoubleLike}
          onPointerDown={onLongPressStart}
          onPointerUp={onLongPressEnd}
          onPointerCancel={onLongPressEnd}
          onPointerLeave={onLongPressEnd}
        />
      )}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/78 via-transparent to-black/35 md:hidden" />
      <AnimatePresence>
        {!playing && active && (
          <motion.div
            className="pointer-events-none absolute inset-0 grid place-items-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12 }}
          >
            <span className="grid h-20 w-20 place-items-center rounded-full bg-black/45 text-white backdrop-blur-md">
              <Play className="ml-1 h-9 w-9 fill-white" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ReelVideo
