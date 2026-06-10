
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bookmark,
  CheckCircle2,
  Copy,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
  UserPlus,
  X,
} from 'lucide-react'
import { CommentInput, CommentsList } from './Comments'
import { creators } from './reelsData'
import { formatCount } from './reelsUtils'

const DesktopPanel = ({
  reel,
  liked,
  saved,
  expanded,
  comments,
  input,
  replyTarget,
  editingTarget,
  shareOpen,
  onInput,
  onMentionPick,
  onSubmitComment,
  onToggleExpanded,
  onLike,
  onCommentLike,
  onReply,
  onEdit,
  onDelete,
  onReplyLike,
  onShare,
  onSave,
  onToggleShare,
  onCancelMode,
}) => {
  return (
    <aside className="hidden h-full min-w-0 flex-col border-l border-white/10 bg-[#101010]/92 text-white backdrop-blur-xl md:flex md:w-[40%] xl:w-[30%]">
      <div className="border-b border-white/10 p-5 lg:p-6">
        <div className="flex items-start gap-3">
          <img
            src={reel.creator.avatar}
            alt=""
            className="h-12 w-12 rounded-full object-cover ring-2 ring-[#b7f238]"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="truncate text-base font-extrabold">
                {reel.creator.name}
              </h2>
              <CheckCircle2 className="h-4 w-4 fill-[#3b82f6] text-white" />
            </div>
            <p className="truncate text-xs font-semibold text-white/50">
              @{reel.creator.handle} . {reel.postedAt}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full bg-[#b7f238] px-3 text-xs font-extrabold text-black"
          >
            <UserPlus className="h-4 w-4" />
            Follow
          </button>
        </div>

        <p className="mt-5 text-sm leading-6 text-white/82">
          {expanded ? reel.caption : `${reel.caption.slice(0, 118)}... `}
          <button
            type="button"
            className="font-extrabold text-white"
            onClick={onToggleExpanded}
          >
            {expanded ? 'less' : 'more'}
          </button>
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {reel.hashtags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#b7f238]/12 px-2.5 py-1 text-xs font-bold text-[#b7f238]"
            >
              #{tag}
            </span>
          ))}
          {reel.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/8 px-2.5 py-1 text-xs font-bold text-white/70"
            >
              @{tag}
            </span>
          ))}
        </div>

        <div className="relative mt-5 grid grid-cols-4 gap-2">
          <button
            type="button"
            className={`flex h-12 flex-col items-center justify-center rounded-2xl text-xs font-extrabold ${
              liked ? 'bg-[#ff3b6b] text-white' : 'bg-white/8 text-white'
            }`}
            onClick={onLike}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            {formatCount(reel.likes + (liked ? 1 : 0))}
          </button>
          <button
            type="button"
            className="flex h-12 flex-col items-center justify-center rounded-2xl bg-white/8 text-xs font-extrabold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            {formatCount(reel.comments)}
          </button>
          <button
            type="button"
            className="flex h-12 flex-col items-center justify-center rounded-2xl bg-white/8 text-xs font-extrabold text-white"
            onClick={onToggleShare}
          >
            <Share2 className="h-4 w-4" />
            {formatCount(reel.shares)}
          </button>
          <button
            type="button"
            className={`flex h-12 flex-col items-center justify-center rounded-2xl text-xs font-extrabold ${
              saved ? 'bg-[#b7f238] text-black' : 'bg-white/8 text-white'
            }`}
            onClick={onSave}
          >
            <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
            Save
          </button>

          <AnimatePresence>
            {shareOpen && (
              <motion.div
                className="absolute right-0 top-14 z-20 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#171717] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {['Copy link', 'Share to feed', 'Share to story', 'Send to user'].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className="flex h-10 w-full items-center gap-2 rounded-xl px-3 text-left text-xs font-bold text-white hover:bg-white/10"
                      onClick={onShare}
                    >
                      <Copy className="h-4 w-4" />
                      {item}
                    </button>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5 lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-extrabold">Comments</h3>
          <MoreHorizontal className="h-5 w-5 text-white/45" />
        </div>
        <CommentsList
          comments={comments}
          onLike={onCommentLike}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          onReplyLike={onReplyLike}
        />
      </div>

      <div className="border-t border-white/10 p-4">
        {(replyTarget || editingTarget) && (
          <div className="mb-2 flex items-center justify-between rounded-full bg-white/8 px-3 py-2 text-xs font-bold text-white/65">
            <span>
              {editingTarget
                ? 'Editing your comment'
                : `Replying to ${replyTarget.author.name}`}
            </span>
            <button type="button" onClick={onCancelMode} aria-label="Cancel">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <CommentInput
          value={input}
          onChange={onInput}
          onSubmit={onSubmitComment}
          mentionOptions={creators}
          onMentionPick={onMentionPick}
        />
      </div>
    </aside>
  )
}

export default DesktopPanel
