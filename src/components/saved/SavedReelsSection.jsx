import { useRef, useState } from 'react'
import { Music } from 'lucide-react'
import avatar from '../../assets/images/avatar.jpg'
import seventhVideo from '../../assets/videos/seventhVideo.mp4'
import sixthVideo from '../../assets/videos/sixthVideo.mp4'
import thirdVideo from '../../assets/videos/thirdVideo.mp4'

const reels = [
  { id: 1, video: seventhVideo, progress: '44%' },
  { id: 2, video: sixthVideo, progress: '38%' },
  { id: 3, video: thirdVideo, progress: '58%' },
]

const ReelCard = ({ reel }) => {
  return (
    <article className="relative h-[420px] overflow-hidden rounded-[18px] bg-black sm:h-[520px]">
      <video
        src={reel.video}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/12 to-transparent" />

      <div className="absolute inset-x-5 bottom-6 text-white">
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt=""
            className="h-8 w-8 rounded-full border border-[#8ddf00] object-cover"
          />
          <span className="text-sm font-extrabold">@kris56</span>
          <button
            type="button"
            className="h-5 rounded-full border border-white/50 px-2 text-[10px] font-bold"
          >
            Follow
          </button>
        </div>

        <p className="mt-4 text-xs font-medium leading-5">
          Paradise found! #travel #nature #adventure
          <br />
          more
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold">
          <Music className="h-3.5 w-3.5 fill-white" />
          Original Sound - kris56
        </div>

        <div className="mt-4 h-1 rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-[#9bf000]"
            style={{ width: reel.progress }}
          />
        </div>
      </div>
    </article>
  )
}

const SavedReelsSection = () => {
  const sliderRef = useRef(null)
  const dragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  })
  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (event) => {
    const slider = sliderRef.current
    if (!slider) return

    dragState.current = {
      isDown: true,
      startX: event.clientX,
      scrollLeft: slider.scrollLeft,
    }
    setIsDragging(true)
    slider.setPointerCapture?.(event.pointerId)
  }

  const handlePointerMove = (event) => {
    const slider = sliderRef.current
    const state = dragState.current
    if (!slider || !state.isDown) return

    slider.scrollLeft = state.scrollLeft - (event.clientX - state.startX)
  }

  const stopDrag = (event) => {
    const slider = sliderRef.current
    if (slider) {
      slider.releasePointerCapture?.(event.pointerId)
    }

    dragState.current.isDown = false
    setIsDragging(false)
  }

  return (
    <section className="bg-white p-0 shadow-none sm:rounded-[18px] sm:p-8 sm:shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
          Reels
        </h1>
        <button
          type="button"
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 sm:text-base"
        >
          View All
        </button>
      </div>

      <div
        ref={sliderRef}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onPointerLeave={stopDrag}
      >
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="w-[82%] max-w-[280px] flex-none snap-start sm:w-[44%] sm:max-w-none lg:w-[31.5%]"
          >
            <ReelCard reel={reel} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default SavedReelsSection
