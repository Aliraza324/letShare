import PostCard from '../shared/PostCard'
import avatar from '../../assets/images/avatar.jpg'
import samraAvatar from '../../assets/images/samra.jpg'
import fatimaImage from '../../assets/images/fatima.jpg'
import hrImage from '../../assets/images/hr.jpg'

const savedPosts = [
  {
    id: 'saved-post-1',
    author: 'Samra',
    community: 'Travel Lovers',
    avatar: samraAvatar,
    time: '2 hours ago',
    visibility: 'Public',
    content:
      'Best places to visit this summer? Looking for somewhere with great beaches but also good hiking trails!',
    image: hrImage,
    likes: 245,
    comments: 56,
  },
  {
    id: 'saved-post-2',
    author: 'Samra',
    community: 'Travel Lovers',
    avatar,
    time: '2 days ago',
    visibility: 'Public',
    content:
      'Best place to visit this summer? Looking for hidden gems in Europe!',
    image: fatimaImage,
    likes: 312,
    comments: 84,
    isVideo: true,
  },
]

const SavedPostsSection = () => {
  return (
    <section className="bg-white p-0 shadow-none sm:rounded-[18px] sm:p-6 sm:shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">Posts</h2>
        <button
          type="button"
          className="text-[10px] font-semibold text-slate-500 hover:text-slate-800"
        >
          View All
        </button>
      </div>

      <div className="mx-auto max-w-[620px] space-y-5">
        {savedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

export default SavedPostsSection
