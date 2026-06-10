import Picker from 'emoji-picker-react'
import { useEffect, useRef } from 'react'

const EmojiPicker = ({ onClose, onSelect }) => {
  const panelRef = useRef(null)

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!panelRef.current?.contains(event.target)) {
        onClose?.()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [onClose])

  return (
    <div
      ref={panelRef}
      className="fixed bottom-3 left-3 right-3 z-[80] mx-auto max-w-[380px] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] sm:absolute sm:bottom-full sm:left-0 sm:right-auto sm:z-30 sm:mb-2 sm:max-w-[calc(100vw-32px)]"
      role="dialog"
      aria-label="Emoji picker"
    >
      <Picker
        height={340}
        lazyLoadEmojis
        previewConfig={{ showPreview: false }}
        searchPlaceHolder="Search emoji"
        skinTonesDisabled
        width="100%"
        onEmojiClick={(emojiData) => onSelect(emojiData.emoji)}
      />
    </div>
  )
}

export default EmojiPicker
