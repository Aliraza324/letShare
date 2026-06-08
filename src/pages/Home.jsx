import { useRef, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import ExploreCommunities from '../components/home/ExploreCommunities'
import HeroSection from '../components/home/HeroSection'
import PostComposer from '../components/home/PostComposer'
import PostCard from '../components/shared/PostCard'
import StoryCard from '../components/shared/StoryCard'
import { feedPosts, stories } from '../mock/homeFeed'

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
      <div className="space-y-5">
        <HeroSection />

        <section
          ref={storySliderRef}
          className={`flex gap-4 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDraggingStories ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          onClickCapture={handleStoryClickCapture}
          onPointerDown={handleStoryPointerDown}
          onPointerMove={handleStoryPointerMove}
          onPointerUp={stopStoryDrag}
          onPointerCancel={stopStoryDrag}
          onPointerLeave={stopStoryDrag}
        >
          {stories.map((story) => (
            <div key={story.id} className="w-[142px] flex-none sm:w-[152px] lg:w-[164px]">
              <StoryCard story={story} />
            </div>
          ))}
        </section>

        <PostComposer />

        <ExploreCommunities />

        {feedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </MainLayout>
  )
}

export default Home
