import { useCallback, useRef, useState } from 'react'
import { Image, Send, Smile, Video, X } from 'lucide-react'
import { Mention, MentionsInput } from 'react-mentions'
import boyAvatar from '../../assets/images/boy.png'
import davidAvatar from '../../assets/images/david.jpg'
import pinkiAvatar from '../../assets/images/pinki.png'
import samraAvatar from '../../assets/images/samra.jpg'
import EmojiPicker from '../shared/EmojiPicker'
import MediaUploader from '../shared/MediaUploader'
import {
  extractMentionMetadata,
  insertAtCursor,
} from '../../utils/social'

const mentionUsers = [
  { id: 'samra', name: 'Samra Ahmed', handle: 'samra', avatar: samraAvatar },
  { id: 'david', name: 'David Cooper', handle: 'david', avatar: davidAvatar },
  { id: 'pinki', name: 'Pinki Khan', handle: 'pinki', avatar: pinkiAvatar },
  { id: 'courtney', name: 'Courtney Henry', handle: 'courtney', avatar: boyAvatar },
]

const PostComposer = () => {
  const inputRef = useRef(null)
  const [text, setText] = useState('')
  const [mediaItems, setMediaItems] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const mentionMetadata = extractMentionMetadata(text, mentionUsers)
  const mentionData = mentionUsers.map((user) => ({
    id: user.handle,
    display: user.name,
  }))

  const updateMediaItems = useCallback((updater) => {
    setMediaItems((current) =>
      typeof updater === 'function' ? updater(current) : updater,
    )
  }, [])

  const insertEmoji = (emoji) => {
    const { nextCursor, nextValue } = insertAtCursor(text, emoji, inputRef.current)
    setText(nextValue)
    setShowEmojiPicker(false)

    window.requestAnimationFrame(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(nextCursor, nextCursor)
    })
  }

  const publishPost = () => {
    const payload = {
      text: text.trim(),
      media: mediaItems.map((item) => ({
        name: item.name,
        type: item.type,
        file: item.file,
      })),
      mentions: mentionMetadata,
    }

    if (!payload.text && payload.media.length === 0) return

    setText('')
    setMediaItems([])
  }

  return (
    <section className="rounded-[18px] bg-white px-4 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <img
            src={boyAvatar}
            alt="Samra Ahmed"
            className="h-12 w-12 shrink-0 rounded-full object-cover sm:h-20 sm:w-20"
          />
          <div className="min-w-0">
            <h2 className="truncate text-lg font-extrabold text-slate-950 sm:text-2xl">
              Samra Ahmed
            </h2>
            <p className="mt-0.5 truncate text-sm text-slate-500 sm:text-lg">
              @Samra.Ahmed
            </p>
          </div>
        </div>

        <button
          type="button"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
          aria-label="Close composer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 sm:ml-[88px]">
        <MentionsInput
          inputRef={inputRef}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What's on your mind?"
          className="mentions"
          style={{
            control: {
              minHeight: 96,
              border: '1px solid rgb(226 232 240)',
              borderRadius: 16,
              backgroundColor: 'rgb(248 250 252)',
              fontSize: 16,
              color: 'rgb(51 65 85)',
            },
            highlighter: {
              padding: 12,
              minHeight: 96,
              lineHeight: 1.5,
            },
            input: {
              padding: 12,
              minHeight: 96,
              outline: 0,
              lineHeight: 1.5,
            },
            suggestions: {
              list: {
                overflow: 'hidden',
                border: '1px solid rgb(241 245 249)',
                borderRadius: 16,
                backgroundColor: 'white',
                boxShadow: '0 18px 45px rgba(15,23,42,0.14)',
              },
              item: {
                padding: '10px 12px',
                fontSize: 13,
                fontWeight: 700,
              },
            },
          }}
        >
          <Mention
            trigger="@"
            data={mentionData}
            displayTransform={(id) => `@${id}`}
            markup="@__id__"
            appendSpaceOnAdd
          />
        </MentionsInput>

        {mentionMetadata.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {mentionMetadata.map((mention) => (
              <span
                key={mention.id}
                className="rounded-full bg-[#f4fbdf] px-3 py-1 text-xs font-extrabold text-[#4f8500]"
              >
                @{mention.handle}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4">
          <MediaUploader items={mediaItems} onChange={updateMediaItems} />
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="relative flex items-center gap-2">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              aria-label="Open emoji picker"
              onClick={() => setShowEmojiPicker((current) => !current)}
            >
              <Smile className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              aria-label="Add image"
            >
              <Image className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              aria-label="Add video"
            >
              <Video className="h-5 w-5" />
            </button>

            {showEmojiPicker && (
              <EmojiPicker
                onClose={() => setShowEmojiPicker(false)}
                onSelect={insertEmoji}
              />
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#9bf000] px-5 text-sm font-bold text-black transition hover:bg-[#8be000] disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            disabled={!text.trim() && mediaItems.length === 0}
            onClick={publishPost}
          >
            <Send className="h-4 w-4" />
            Post Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default PostComposer
