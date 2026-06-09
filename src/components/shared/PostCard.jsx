import { useState } from 'react'
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Play,
  Send,
  Smile,
} from 'lucide-react'
import CommentCard from './CommentCard'
import { comments } from '../../mock/homeFeed'
import avatar from '../../assets/images/avatar.jpg'

const reactions = ['🙌', '🔥', '👏', '🥲', '😍', '🙂', '😂']

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false)

  return (
    <article className="overflow-hidden rounded-[18px] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
      <div className="flex items-start gap-3 px-4 pt-4">
        <img
          src={post.avatar}
          alt={post.author}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-1.5 text-xs text-slate-500">
            <h2 className="text-sm font-extrabold text-slate-950">
              {post.author}
            </h2>
            <span>›</span>
            <span className="font-semibold text-slate-700">
              {post.community}
            </span>
            <span className="text-[#7ac900]">●</span>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">
            {post.time} • {post.visibility}
          </p>
        </div>

        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-50"
          aria-label="Post options"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <p className="px-4 py-3 text-sm leading-6 text-slate-700">
        {post.content}
      </p>

      <div className="relative mx-4 overflow-hidden rounded-[14px] bg-slate-100">
        <img
          src={post.image}
          alt=""
          className="h-[230px] w-full object-cover sm:h-[300px]"
        />
        {post.isVideo && (
          <button
            type="button"
            className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-[#8ddf00] text-white shadow-[0_12px_26px_rgba(15,23,42,0.22)]"
            aria-label="Play video"
          >
            <Play className="ml-1 h-7 w-7 fill-white" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-3 text-slate-400">
        <div className="flex items-center gap-5 text-xs font-medium">
          <button
            type="button"
            className="flex items-center gap-1.5 transition hover:text-red-500"
            aria-label="Like post"
          >
            <Heart className="h-5 w-5" />
            {post.likes}
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 transition hover:text-slate-700"
            aria-expanded={showComments}
            aria-label="Show comments"
            onClick={() => setShowComments((current) => !current)}
          >
            <MessageCircle className="h-5 w-5" />
            {post.comments}
          </button>
          <button
            type="button"
            className="transition hover:text-slate-700"
            aria-label="Share post"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          className="transition hover:text-slate-700"
          aria-label="Save post"
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      {showComments && (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3">
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>

          <div className="mt-5 border-t border-slate-100 pt-3">
            <div className="mb-3 flex items-center justify-between text-lg">
              {reactions.map((reaction) => (
                <button
                  key={reaction}
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-slate-50"
                  aria-label={`React ${reaction}`}
                >
                  {reaction}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <img
                src={avatar}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
              <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-slate-100 px-4 text-slate-400">
                <Smile className="h-4 w-4 shrink-0" />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  className="grid h-7 w-7 place-items-center rounded-full text-[#7ac900] transition hover:bg-white"
                  aria-label="Send comment"
                >
                  <Send className="h-4 w-4" />
                </button>
              </label>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default PostCard
