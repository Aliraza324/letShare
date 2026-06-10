
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { initialReels } from './reels/reelsData'
import ReelPreviewCard from './reels/ReelPreviewCard'
import ReelsViewer from './reels/ReelsViewer'

const SavedReelsSection = () => {
  const sliderRef = useRef(null)
  const dragState = useRef({
    isDown: false,
    hasMoved: false,
    startX: 0,
    scrollLeft: 0,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [selectedReelIndex, setSelectedReelIndex] = useState(null)

  const handlePointerDown = (event) => {
    if (event.target.closest('[data-reel-preview-card]')) return

    const slider = sliderRef.current
    if (!slider) return

    dragState.current = {
      isDown: true,
      hasMoved: false,
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

    const delta = event.clientX - state.startX
    if (Math.abs(delta) > 6) {
      state.hasMoved = true
    }

    slider.scrollLeft = state.scrollLeft - delta
  }

  const stopDrag = (event) => {
    const slider = sliderRef.current
    if (slider) {
      slider.releasePointerCapture?.(event.pointerId)
    }

    dragState.current.isDown = false
    window.setTimeout(() => {
      dragState.current.hasMoved = false
      setIsDragging(false)
    }, 0)
  }

  return (
    <>
      <section className="bg-white p-0 shadow-none sm:rounded-[18px] sm:p-8 sm:shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
            Reels
          </h1>
          <button
            type="button"
            className="text-sm font-semibold text-slate-500 hover:text-slate-800 sm:text-base"
            onClick={() => setSelectedReelIndex(0)}
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
          {initialReels.map((reel, index) => (
            <div
              key={reel.id}
              className="w-[82%] max-w-[280px] flex-none snap-start sm:w-[44%] sm:max-w-none lg:w-[31.5%]"
            >
              <ReelPreviewCard
                reel={reel}
                onOpen={() => setSelectedReelIndex(index)}
              />
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedReelIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReelsViewer
              initialIndex={selectedReelIndex}
              onClose={() => setSelectedReelIndex(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SavedReelsSection
