
import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { CommentInput, CommentsList } from './Comments'
import { creators } from './reelsData'

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

export default MobileCommentsSheet
