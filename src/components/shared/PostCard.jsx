import { Heart, MessageCircle, Send, Share2 } from 'lucide-react'
import CommentCard from './CommentCard'
import { comments } from '../../mock/homeFeed'

const PostCard = ({ post }) => {
  return (
    <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-3 p-4">
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#a6ef00] to-emerald-500" />
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-extrabold text-slate-950">
            {post.author}
          </h2>
          <p className="text-xs text-slate-400">{post.community}</p>
        </div>
        <button className="rounded-full bg-[#ecffd4] px-3 py-1 text-xs font-bold text-[#6fb600]">
          Joined
        </button>
      </div>

      <p className="px-4 pb-4 text-sm leading-6 text-slate-600">
        {post.content}
      </p>
      <div className={`mx-4 h-72 rounded-[18px] bg-gradient-to-br ${post.image}`} />

      <div className="flex items-center justify-between px-4 py-3 text-xs font-bold text-slate-500">
        <span>{post.likes} likes</span>
        <span>{post.comments} comments</span>
      </div>

      <div className="grid grid-cols-4 border-y border-slate-100 px-2 py-2">
        {[
          ['Like', Heart],
          ['Comment', MessageCircle],
          ['Share', Share2],
          ['Send', Send],
        ].map(([label, Icon]) => (
          <button
            key={label}
            className="flex h-9 items-center justify-center gap-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3 p-4">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </article>
  )
}

export default PostCard
