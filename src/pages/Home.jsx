import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import ExploreCommunities from '../components/home/ExploreCommunities'
import HeroSection from '../components/home/HeroSection'
import PostComposer from '../components/home/PostComposer'
import PostCard from '../components/shared/PostCard'
import StoryCard from '../components/shared/StoryCard'
import { feedPosts, stories } from '../mock/homeFeed'

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const storyVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.36,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const Home = () => {
  const storySliderRef = useRef(null)
  const dragState = useRef({
    isDown: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
  })
  const [isDraggingStories, setIsDraggingStories] = useState(false)

  const handleStoryPointerDown = (event) => {
    const slider = storySliderRef.current
    if (!slider) return

    dragState.current = {
      isDown: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: slider.scrollLeft,
    }
    setIsDraggingStories(true)
    slider.setPointerCapture?.(event.pointerId)
  }

  const handleStoryPointerMove = (event) => {
    const slider = storySliderRef.current
    const state = dragState.current
    if (!slider || !state.isDown) return

    const distance = event.clientX - state.startX
    if (Math.abs(distance) > 4) {
      state.moved = true
    }

    slider.scrollLeft = state.scrollLeft - distance
  }

  const stopStoryDrag = (event) => {
    const slider = storySliderRef.current
    if (slider) {
      slider.releasePointerCapture?.(event.pointerId)
    }

    dragState.current.isDown = false
    setIsDraggingStories(false)
  }

  const handleStoryClickCapture = (event) => {
    if (!dragState.current.moved) return

    event.preventDefault()
    event.stopPropagation()
    dragState.current.moved = false
  }

  return (
    <MainLayout>
      <motion.div
        className="space-y-5"
        variants={pageVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={sectionVariants}>
          <HeroSection />
        </motion.div>

        <motion.section
          ref={storySliderRef}
          className={`!mt-0 flex gap-2 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] sm:gap-4 md:!mt-5 [&::-webkit-scrollbar]:hidden ${
            isDraggingStories ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          variants={sectionVariants}
          onClickCapture={handleStoryClickCapture}
          onPointerDown={handleStoryPointerDown}
          onPointerMove={handleStoryPointerMove}
          onPointerUp={stopStoryDrag}
          onPointerCancel={stopStoryDrag}
          onPointerLeave={stopStoryDrag}
        >
          {stories.map((story) => (
            <motion.div
              key={story.id}
              className="w-[92px] flex-none sm:w-[152px] lg:w-[164px]"
              variants={storyVariants}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <StoryCard story={story} />
            </motion.div>
          ))}
        </motion.section>

        <motion.div variants={sectionVariants}>
          <PostComposer />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <ExploreCommunities />
        </motion.div>

        <motion.section className="space-y-3" variants={sectionVariants}>
          <h2 className="text-xl font-extrabold text-black">For You</h2>
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              type="button"
              className="h-10 rounded-full bg-[#8ddf00] px-6 text-sm font-extrabold text-black"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              ✨ For You
            </motion.button>
            <motion.button
              type="button"
              className="h-10 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              🔥 Trending
            </motion.button>
            <motion.button
              type="button"
              className="h-10 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-500 transition hover:bg-slate-50"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              🎥 Reels
            </motion.button>
          </div>
        </motion.section>

        {feedPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={sectionVariants}
            whileHover={{ y: -3 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
    </MainLayout>
  )
}

export default Home
