import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Expand,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Music,
  Pause,
  Play,
  Send,
  Share2,
  Smile,
  UserPlus,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import avatar from '../../assets/images/avatar.jpg'
import samraAvatar from '../../assets/images/samra.jpg'
import fatimaAvatar from '../../assets/images/fatima.jpg'
import johnAvatar from '../../assets/images/john.jpg'
import davidAvatar from '../../assets/images/david.jpg'
import seventhVideo from '../../assets/videos/seventhVideo.mp4'
import sixthVideo from '../../assets/videos/sixthVideo.mp4'
import thirdVideo from '../../assets/videos/thirdVideo.mp4'

const nearbyRange = 1

const creators = [
  { name: 'Samra', handle: 'samra.travels', avatar: samraAvatar },
  { name: 'Kris', handle: 'kris56', avatar },
  { name: 'Fatima', handle: 'fatima.frames', avatar: fatimaAvatar },
  { name: 'John', handle: 'john.moves', avatar: johnAvatar },
  { name: 'David', handle: 'david.fit', avatar: davidAvatar },
]

const initialReels = [
  {
    id: 'reel-1',
    video: seventhVideo,
    creator: creators[1],
    caption:
      'Paradise found on a quiet cliff trail after sunrise. Saved this route for anyone chasing blue water, clean air, and slow mornings.',
    hashtags: ['travel', 'nature', 'adventure'],
    tags: ['Samra', 'Fatima'],
    music: 'Original Sound - kris56',
    postedAt: '12 min ago',
    likes: 12800,
    shares: 927,
    comments: 428,
  },
  {
    id: 'reel-2',
    video: sixthVideo,
    creator: creators[0],
    caption:
      'The little moments between destinations always become the memory. Coffee, wind, windows down, and a saved map full of pins.',
    hashtags: ['roadtrip', 'friends', 'explore'],
    tags: ['Kris'],
    music: 'Weekend Drive - LetShare Audio',
    postedAt: '1 hr ago',
    likes: 9800,
    shares: 581,
    comments: 214,
  },
  {
    id: 'reel-3',
    video: thirdVideo,
    creator: creators[2],
    caption:
      'Golden hour did the heavy lifting here. A tiny behind-the-scenes edit for the photography community.',
    hashtags: ['photography', 'goldenhour', 'creative'],
    tags: ['John', 'David'],
    music: 'Soft Focus - Studio Mix',
    postedAt: '3 hr ago',
    likes: 15700,
    shares: 1300,
    comments: 671,
  },
]

const initialComments = {
  'reel-1': [
    {
      id: 'c1',
      author: creators[0],
      text: 'That coastline is unreal. Saving this for my next trip.',
      time: '4m',
      likes: 24,
      own: false,
      replies: [
        {
          id: 'r1',
          author: creators[1],
          text: '@Samra you would love the morning trail.',
          time: '2m',
          likes: 8,
          own: false,
        },
      ],
    },
    {
      id: 'c2',
      author: creators[3],
      text: 'The color grade is so clean.',
      time: '9m',
      likes: 11,
      own: false,
      replies: [],
    },
  ],
  'reel-2': [
    {
      id: 'c3',
      author: creators[2],
      text: 'This feels like a whole short film.',
      time: '18m',
      likes: 31,
      own: false,
      replies: [],
    },
  ],
  'reel-3': [
    {
      id: 'c4',
      author: creators[4],
      text: 'The lens flare at the end is perfect.',
      time: '24m',
      likes: 16,
      own: false,
      replies: [],
    },
  ],
}

const formatCount = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

const HighlightedText = ({ text }) => {
  return (
    <>
      {text.split(/(@[a-zA-Z0-9_.]+)/g).map((part, index) =>
        part.startsWith('@') ? (
          <span key={`${part}-${index}`} className="font-bold text-[#b7f238]">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  )
}

const ActionButton = ({ icon: Icon, label, count, active, onClick }) => {
  return (
    <button
      type="button"
      className="group flex flex-col items-center gap-1 text-white"
      aria-label={label}
      onClick={onClick}
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-full border border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition group-hover:scale-105 ${
          active ? 'bg-[#b7f238] text-black' : 'bg-white/12 text-white'
        }`}
      >
        <Icon className={`h-5 w-5 ${active ? 'fill-current' : ''}`} />
      </span>
      {count && <span className="text-[11px] font-bold">{count}</span>}
    </button>
  )
}

const CommentInput = ({
  value,
  onChange,
  onSubmit,
  mentionOptions,
  onMentionPick,
  placeholder = 'Add a comment...',
}) => {
  const showMentions = value.includes('@')

  return (
    <form className="relative flex items-center gap-2" onSubmit={onSubmit}>
      <button
        type="button"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white hover:bg-white/15"
        aria-label="Add emoji"
        onClick={() => onChange(`${value} :)`)}
      >
        <Smile className="h-4 w-4" />
      </button>
      <div className="relative min-w-0 flex-1">
        {showMentions && (
          <div className="absolute bottom-12 left-0 z-20 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
            {mentionOptions.map((user) => (
              <button
                key={user.handle}
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-white hover:bg-white/10"
                onClick={() => onMentionPick(user)}
              >
                <img
                  src={user.avatar}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover"
                />
                @{user.handle}
              </button>
            ))}
          </div>
        )}
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-full border border-white/10 bg-white/10 px-4 text-sm font-medium text-white outline-none placeholder:text-white/50 focus:border-[#b7f238]/70"
        />
      </div>
      <button
        type="submit"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#b7f238] text-black disabled:opacity-50"
        aria-label="Send comment"
        disabled={!value.trim()}
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  )
}

const CommentItem = ({
  comment,
  onLike,
  onReply,
  onEdit,
  onDelete,
  onReplyLike,
}) => {
  const [showReplies, setShowReplies] = useState(true)

  return (
    <article className="space-y-3">
      <div className="flex gap-3">
        <img
          src={comment.author.avatar}
          alt=""
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="rounded-2xl bg-white/8 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-extrabold text-white">
                {comment.author.name}
              </span>
              <span className="text-[11px] font-semibold text-white/45">
                {comment.time}
              </span>
            </div>
            <p className="mt-1 text-sm leading-5 text-white/78">
              <HighlightedText text={comment.text} />
            </p>
          </div>
          <div className="mt-2 flex items-center gap-4 px-1 text-[11px] font-bold text-white/55">
            <button type="button" onClick={() => onLike(comment.id)}>
              Like {comment.likes ? formatCount(comment.likes) : ''}
            </button>
            <button type="button" onClick={() => onReply(comment)}>
              Reply
            </button>
            {comment.own && (
              <>
                <button type="button" onClick={() => onEdit(comment)}>
                  Edit
                </button>
                <button type="button" onClick={() => onDelete(comment.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="ml-12 space-y-3 border-l border-white/10 pl-3">
          <button
            type="button"
            className="text-xs font-bold text-white/55"
            onClick={() => setShowReplies((current) => !current)}
          >
            {showReplies ? 'Hide replies' : `View ${comment.replies.length} replies`}
          </button>
          {showReplies &&
            comment.replies.map((reply) => (
              <div key={reply.id} className="flex gap-2">
                <img
                  src={reply.author.avatar}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="rounded-2xl bg-white/7 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-xs font-extrabold text-white">
                        {reply.author.name}
                      </span>
                      <span className="text-[10px] font-semibold text-white/40">
                        {reply.time}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-white/72">
                      <HighlightedText text={reply.text} />
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-3 px-1 text-[10px] font-bold text-white/50">
                    <button
                      type="button"
                      onClick={() => onReplyLike(comment.id, reply.id)}
                    >
                      Like {reply.likes ? formatCount(reply.likes) : ''}
                    </button>
                    <button type="button" onClick={() => onReply(comment)}>
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </article>
  )
}

const CommentsList = ({
  comments,
  onLike,
  onReply,
  onEdit,
  onDelete,
  onReplyLike,
}) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onLike={onLike}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          onReplyLike={onReplyLike}
        />
      ))}
    </div>
  )
}

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

const MobileOverlay = ({
  reel,
  liked,
  saved,
  expanded,
  onToggleExpanded,
  onLike,
  onComment,
  onShare,
  onSave,
  likePulse,
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex md:hidden">
      <AnimatePresence>
        {likePulse && (
          <motion.div
            className="absolute inset-0 grid place-items-center"
            initial={{ opacity: 0, scale: 0.45 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
          >
            <Heart className="h-24 w-24 fill-[#ff3b6b] text-[#ff3b6b] drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4">
        <ActionButton
          icon={Heart}
          label="Like reel"
          count={formatCount(reel.likes + (liked ? 1 : 0))}
          active={liked}
          onClick={onLike}
        />
        <ActionButton
          icon={MessageCircle}
          label="Open comments"
          count={formatCount(reel.comments)}
          onClick={onComment}
        />
        <ActionButton
          icon={Share2}
          label="Share reel"
          count={formatCount(reel.shares)}
          onClick={onShare}
        />
        <ActionButton
          icon={Bookmark}
          label="Save reel"
          active={saved}
          onClick={onSave}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 px-4 pb-8 pr-20 text-white">
        <div className="pointer-events-auto flex items-center gap-2">
          <img
            src={reel.creator.avatar}
            alt=""
            className="h-10 w-10 rounded-full border border-[#b7f238] object-cover"
          />
          <span className="min-w-0 truncate text-sm font-extrabold">
            @{reel.creator.handle}
          </span>
          <button
            type="button"
            className="h-7 rounded-full border border-white/45 px-3 text-xs font-bold"
          >
            Follow
          </button>
        </div>
        <p className="pointer-events-auto mt-3 text-sm font-medium leading-5 text-white/90">
          {expanded ? reel.caption : `${reel.caption.slice(0, 82)}... `}
          <button
            type="button"
            className="font-extrabold text-white"
            onClick={onToggleExpanded}
          >
            {expanded ? 'See less' : 'See more'}
          </button>
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-xs font-bold text-[#b7f238]">
          {reel.hashtags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <div className="mt-3 flex min-w-0 items-center gap-2 text-xs font-semibold text-white/80">
          <Music className="h-4 w-4 shrink-0 fill-white" />
          <span className="truncate">{reel.music}</span>
        </div>
      </div>
    </div>
  )
}

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

const MobileCommentsSheet = ({
  open,
  comments,
  input,
  replyTarget,
  editingTarget,
  onClose,
  onInput,
  onMentionPick,
  onSubmitComment,
  onCommentLike,
  onReply,
  onEdit,
  onDelete,
  onReplyLike,
  onCancelMode,
}) => {
  const startY = useRef(0)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end bg-black/20 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close comments"
            onClick={onClose}
          />
          <motion.section
            className="relative flex h-[72vh] w-full flex-col rounded-t-[28px] border border-white/10 bg-[#101010]/96 text-white shadow-[0_-20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 34 }}
            onTouchStart={(event) => {
              startY.current = event.touches[0].clientY
            }}
            onTouchEnd={(event) => {
              const delta = event.changedTouches[0].clientY - startY.current
              if (delta > 80) onClose()
            }}
          >
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/18" />
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-base font-extrabold">Comments</h2>
              <button
                type="button"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/8"
                aria-label="Close comments"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
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
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const ReelsViewer = ({ initialIndex = 0, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [likedIds, setLikedIds] = useState(() => new Set())
  const [savedIds, setSavedIds] = useState(() => new Set(initialReels.map((reel) => reel.id)))
  const [expandedIds, setExpandedIds] = useState(() => new Set())
  const [commentsByReel, setCommentsByReel] = useState(initialComments)
  const [commentInput, setCommentInput] = useState('')
  const [replyTarget, setReplyTarget] = useState(null)
  const [editingTarget, setEditingTarget] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [likePulse, setLikePulse] = useState(false)
  const [shareNotice, setShareNotice] = useState('')
  const videoRefs = useRef([])
  const wheelLock = useRef(false)
  const longPressTimer = useRef(null)
  const touchStartY = useRef(0)

  const reels = useMemo(() => initialReels, [])
  const activeReel = reels[activeIndex]
  const activeComments = commentsByReel[activeReel.id] || []

  const playVideo = useCallback((video) => {
    const playPromise = video.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => setPlaying(false))
    }
  }, [])

  const navigateReel = useCallback(
    (direction) => {
      setActiveIndex((current) => {
        const next = (current + direction + reels.length) % reels.length
        return next
      })
      setPlaying(true)
      setShareOpen(false)
      setReplyTarget(null)
      setEditingTarget(null)
      setCommentInput('')
    },
    [reels.length]
  )

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return

      if (index === activeIndex && playing) {
        playVideo(video)
      } else {
        video.pause()
      }
    })
  }, [activeIndex, playing, playVideo])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        navigateReel(1)
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        navigateReel(-1)
      }
      if (event.key === ' ') {
        event.preventDefault()
        setPlaying((current) => !current)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigateReel])

  const toggleSet = (setter, id) => {
    setter((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleLike = () => {
    toggleSet(setLikedIds, activeReel.id)
    setLikePulse(true)
    window.setTimeout(() => setLikePulse(false), 520)
  }

  const handleDoubleLike = () => {
    setLikedIds((current) => new Set(current).add(activeReel.id))
    setLikePulse(true)
    window.setTimeout(() => setLikePulse(false), 560)
  }

  const handleTogglePlay = (event) => {
    const video = event.currentTarget

    if (video.paused || video.ended) {
      setPlaying(true)
      playVideo(video)
      return
    }

    video.pause()
    setPlaying(false)
  }

  const handleWheel = (event) => {
    if (Math.abs(event.deltaY) < 28 || wheelLock.current) return

    wheelLock.current = true
    navigateReel(event.deltaY > 0 ? 1 : -1)
    window.setTimeout(() => {
      wheelLock.current = false
    }, 720)
  }

  const handleTouchStart = (event) => {
    touchStartY.current = event.touches[0].clientY
  }

  const handleTouchEnd = (event) => {
    if (sheetOpen) return
    const delta = touchStartY.current - event.changedTouches[0].clientY
    if (Math.abs(delta) < 60) return
    navigateReel(delta > 0 ? 1 : -1)
  }

  const handleLongPressStart = () => {
    longPressTimer.current = window.setTimeout(() => setPlaying(false), 320)
  }

  const handleLongPressEnd = () => {
    window.clearTimeout(longPressTimer.current)
  }

  const handleMentionPick = (user) => {
    setCommentInput((current) => {
      const marker = current.lastIndexOf('@')
      if (marker === -1) return `${current}@${user.handle} `
      return `${current.slice(0, marker)}@${user.handle} `
    })
  }

  const handleSubmitComment = (event) => {
    event.preventDefault()
    const text = commentInput.trim()
    if (!text) return

    if (editingTarget) {
      setCommentsByReel((current) => ({
        ...current,
        [activeReel.id]: current[activeReel.id].map((comment) =>
          comment.id === editingTarget.id ? { ...comment, text } : comment
        ),
      }))
      setEditingTarget(null)
      setCommentInput('')
      return
    }

    const newComment = {
      id: `own-${Date.now()}`,
      author: { name: 'You', handle: 'you', avatar },
      text,
      time: 'now',
      likes: 0,
      own: true,
      replies: [],
    }

    setCommentsByReel((current) => {
      const list = current[activeReel.id] || []

      if (replyTarget) {
        return {
          ...current,
          [activeReel.id]: list.map((comment) =>
            comment.id === replyTarget.id
              ? {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      ...newComment,
                      id: `reply-${Date.now()}`,
                      text,
                    },
                  ],
                }
              : comment
          ),
        }
      }

      return {
        ...current,
        [activeReel.id]: [newComment, ...list],
      }
    })

    setReplyTarget(null)
    setCommentInput('')
  }

  const updateCommentLike = (commentId) => {
    setCommentsByReel((current) => ({
      ...current,
      [activeReel.id]: current[activeReel.id].map((comment) =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      ),
    }))
  }

  const updateReplyLike = (commentId, replyId) => {
    setCommentsByReel((current) => ({
      ...current,
      [activeReel.id]: current[activeReel.id].map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
              ),
            }
          : comment
      ),
    }))
  }

  const handleReply = (comment) => {
    setReplyTarget(comment)
    setEditingTarget(null)
    setCommentInput(`@${comment.author.handle} `)
    setSheetOpen(true)
  }

  const handleEdit = (comment) => {
    setEditingTarget(comment)
    setReplyTarget(null)
    setCommentInput(comment.text)
    setSheetOpen(true)
  }

  const handleDelete = (commentId) => {
    setCommentsByReel((current) => ({
      ...current,
      [activeReel.id]: current[activeReel.id].filter(
        (comment) => comment.id !== commentId
      ),
    }))
  }

  const handleShare = () => {
    setShareNotice('Link copied')
    window.setTimeout(() => setShareNotice(''), 1400)
  }

  return (
    <section
      className="relative h-[100dvh] overflow-hidden bg-[#050505] text-white"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-3 md:px-6">
        <div>
          
          <h1 className="text-lg font-black md:text-2xl">Reels</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
            aria-label={muted ? 'Unmute' : 'Mute'}
            onClick={() => setMuted((current) => !current)}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={() => setPlaying((current) => !current)}
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
          </button>
          {onClose && (
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
              aria-label="Close reels viewer"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div
        className="flex h-full flex-col transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${activeIndex * 100}%)` }}
      >
        {reels.map((reel, index) => {
          const active = index === activeIndex
          const shouldLoad = Math.abs(index - activeIndex) <= nearbyRange
          const liked = likedIds.has(reel.id)
          const saved = savedIds.has(reel.id)
          const expanded = expandedIds.has(reel.id)

          return (
            <article
              key={reel.id}
              className="relative flex h-full w-full shrink-0 flex-col md:flex-row"
            >
              <div className="relative flex h-full min-w-0 flex-1 items-center justify-center bg-[#070707] md:w-[60%] xl:w-[70%]">
                <ReelVideo
                  reel={reel}
                  active={active}
                  shouldLoad={shouldLoad}
                  muted={muted}
                  playing={playing}
                  onTogglePlay={handleTogglePlay}
                  onDoubleLike={handleDoubleLike}
                  onLongPressStart={handleLongPressStart}
                  onLongPressEnd={handleLongPressEnd}
                  videoRef={(node) => {
                    videoRefs.current[index] = node
                  }}
                />

                <div className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15 disabled:opacity-30"
                    aria-label="Previous reel"
                    onClick={() => navigateReel(-1)}
                  >
                    <ChevronUp className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
                    aria-label="Next reel"
                    onClick={() => navigateReel(1)}
                  >
                    <ChevronDown className="h-6 w-6" />
                  </button>
                </div>

                <button
                  type="button"
                  className="absolute bottom-5 right-5 z-20 hidden h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/15 md:grid"
                  aria-label="Fullscreen"
                  onClick={() => videoRefs.current[index]?.requestFullscreen?.()}
                >
                  <Expand className="h-5 w-5" />
                </button>

                <MobileOverlay
                  reel={reel}
                  liked={liked}
                  saved={saved}
                  expanded={expanded}
                  onToggleExpanded={() => toggleSet(setExpandedIds, reel.id)}
                  onLike={handleLike}
                  onComment={() => setSheetOpen(true)}
                  onShare={handleShare}
                  onSave={() => toggleSet(setSavedIds, reel.id)}
                  likePulse={active && likePulse}
                />
              </div>

              <DesktopPanel
                reel={reel}
                liked={liked}
                saved={saved}
                expanded={expanded}
                comments={commentsByReel[reel.id] || []}
                input={commentInput}
                replyTarget={replyTarget}
                editingTarget={editingTarget}
                shareOpen={active && shareOpen}
                onInput={setCommentInput}
                onMentionPick={handleMentionPick}
                onSubmitComment={handleSubmitComment}
                onToggleExpanded={() => toggleSet(setExpandedIds, reel.id)}
                onLike={handleLike}
                onCommentLike={updateCommentLike}
                onReply={handleReply}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onReplyLike={updateReplyLike}
                onShare={handleShare}
                onSave={() => toggleSet(setSavedIds, reel.id)}
                onToggleShare={() => setShareOpen((current) => !current)}
                onCancelMode={() => {
                  setReplyTarget(null)
                  setEditingTarget(null)
                  setCommentInput('')
                }}
              />
            </article>
          )
        })}
      </div>

      <div className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 gap-1.5 md:flex">
        {reels.map((reel, index) => (
          <button
            key={reel.id}
            type="button"
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex ? 'w-9 bg-[#b7f238]' : 'w-3 bg-white/25'
            }`}
            aria-label={`Go to reel ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {shareNotice && (
          <motion.div
            className="fixed left-1/2 top-20 z-[90] -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-black shadow-[0_16px_35px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {shareNotice}
          </motion.div>
        )}
      </AnimatePresence>

      <MobileCommentsSheet
        open={sheetOpen}
        comments={activeComments}
        input={commentInput}
        replyTarget={replyTarget}
        editingTarget={editingTarget}
        onClose={() => setSheetOpen(false)}
        onInput={setCommentInput}
        onMentionPick={handleMentionPick}
        onSubmitComment={handleSubmitComment}
        onCommentLike={updateCommentLike}
        onReply={handleReply}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReplyLike={updateReplyLike}
        onCancelMode={() => {
          setReplyTarget(null)
          setEditingTarget(null)
          setCommentInput('')
        }}
      />
    </section>
  )
}

const ReelPreviewCard = ({ reel, onOpen }) => {
  return (
    <button
      type="button"
      className="group relative block h-[420px] w-full overflow-hidden rounded-[18px] bg-black text-left shadow-[0_12px_28px_rgba(15,23,42,0.08)] outline-none transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.16)] focus-visible:ring-2 focus-visible:ring-[#9bf000] sm:h-[520px]"
      onClick={onOpen}
    >
      <video
        src={reel.video}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/12 to-transparent" />
      <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/14 text-white backdrop-blur-md transition group-hover:bg-[#9bf000] group-hover:text-black">
        <Play className="ml-0.5 h-5 w-5 fill-current" />
      </span>

      <div className="absolute inset-x-5 bottom-6 text-white">
        <div className="flex items-center gap-2">
          <img
            src={reel.creator.avatar}
            alt=""
            className="h-8 w-8 rounded-full border border-[#8ddf00] object-cover"
          />
          <span className="min-w-0 truncate text-sm font-extrabold">
            @{reel.creator.handle}
          </span>
          <span className="h-5 rounded-full border border-white/50 px-2 text-[10px] font-bold">
            Saved
          </span>
        </div>

        <p className="mt-4 line-clamp-2 text-xs font-medium leading-5">
          {reel.caption}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold">
          <Music className="h-3.5 w-3.5 fill-white" />
          <span className="min-w-0 truncate">{reel.music}</span>
        </div>

        <div className="mt-4 flex items-center gap-4 text-[11px] font-bold text-white/80">
          <span>{formatCount(reel.likes)} likes</span>
          <span>{formatCount(reel.comments)} comments</span>
        </div>
      </div>
    </button>
  )
}

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

  const handleOpenReel = (index) => {
    if (dragState.current.hasMoved) return
    setSelectedReelIndex(index)
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
                onOpen={() => handleOpenReel(index)}
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
