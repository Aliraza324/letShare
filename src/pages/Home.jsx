import MainLayout from '../layouts/MainLayout'
import PostCard from '../components/shared/PostCard'
import StoryCard from '../components/shared/StoryCard'
import { feedPosts, stories } from '../mock/homeFeed'

const Home = () => {
  return (
    <MainLayout>
      <div className="space-y-5">
        <section className="rounded-[22px] bg-[#efffda] p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#7ac900]">
                LetShare Feed
              </p>
              <h1 className="mt-2 max-w-[360px] text-3xl font-extrabold leading-tight text-slate-950">
                Discover what your communities are sharing today
              </h1>
            </div>
            <button
              type="button"
              className="h-11 rounded-xl bg-[#a6ef00] px-5 text-sm font-bold text-black shadow-[0_10px_20px_rgba(122,201,0,0.25)]"
            >
              Create Post
            </button>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </section>

        <section className="rounded-[22px] bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <textarea
            rows={3}
            placeholder="Share something with your communities..."
            className="w-full resize-none rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm outline-none focus:border-[#a6ef00] focus:ring-4 focus:ring-[#a6ef00]/15"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              className="h-10 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white"
            >
              Post
            </button>
          </div>
        </section>

        {feedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </MainLayout>
  )
}

export default Home
