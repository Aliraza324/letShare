import { Image, Trash2, UploadCloud, Video } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ImageCropper from './ImageCropper'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
const MAX_FILE_SIZE = 25 * 1024 * 1024

const createPreview = (file) => ({
  id: crypto.randomUUID(),
  file,
  name: file.name,
  type: file.type.startsWith('video/') ? 'video' : 'image',
  url: URL.createObjectURL(file),
  progress: 8,
})

const MediaUploader = ({ items, onChange }) => {
  const inputRef = useRef(null)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [cropTarget, setCropTarget] = useState(null)

  useEffect(() => {
    if (items.length === 0) return undefined

    const timer = window.setInterval(() => {
      onChange((current) =>
        current.map((item) => ({
          ...item,
          progress: Math.min(100, item.progress + 24),
        })),
      )
    }, 260)

    return () => window.clearInterval(timer)
  }, [items.length, onChange])

  const addFiles = (fileList) => {
    const files = Array.from(fileList)
    const invalidFile = files.find(
      (file) => !ACCEPTED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE,
    )

    if (invalidFile) {
      setError('Use images or MP4/WebM videos up to 25MB.')
      return
    }

    setError('')
    onChange((current) => [...current, ...files.map(createPreview)])
  }

  const removeItem = (itemId) => {
    onChange((current) => {
      const removed = current.find((item) => item.id === itemId)
      if (removed) URL.revokeObjectURL(removed.url)

      return current.filter((item) => item.id !== itemId)
    })
  }

  const applyCrop = (cropData) => {
    onChange((current) =>
      current.map((item) =>
        item.id === cropTarget.id ? { ...item, cropData } : item,
      ),
    )
    setCropTarget(null)
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        className={`flex min-h-28 w-full flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-5 text-center transition ${
          isDragging
            ? 'border-[#8ddf00] bg-[#f4fbdf]'
            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          addFiles(event.dataTransfer.files)
        }}
      >
        <UploadCloud className="h-7 w-7 text-slate-400" />
        <span className="mt-2 text-sm font-extrabold text-slate-700">
          Drag media here or click to upload
        </span>
        <span className="mt-1 text-xs font-medium text-slate-400">
          Images, GIFs, MP4, WebM
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="sr-only"
        onChange={(event) => {
          addFiles(event.target.files)
          event.target.value = ''
        }}
      />

      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}

      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="relative overflow-hidden rounded-xl bg-slate-100">
              {item.type === 'video' ? (
                <video src={item.url} className="h-28 w-full object-cover" muted />
              ) : (
                <img src={item.url} alt="" className="h-28 w-full object-cover" />
              )}
              <div className="absolute left-2 top-2 rounded-full bg-black/60 p-1 text-white">
                {item.type === 'video' ? <Video className="h-3.5 w-3.5" /> : <Image className="h-3.5 w-3.5" />}
              </div>
              <button
                type="button"
                className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white"
                aria-label="Remove media"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {item.type === 'image' && (
                <button
                  type="button"
                  className="absolute bottom-3 left-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-extrabold text-slate-700"
                  onClick={() => setCropTarget(item)}
                >
                  Crop
                </button>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                <div
                  className="h-full bg-[#8ddf00] transition-all"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {cropTarget && (
        <ImageCropper
          image={cropTarget}
          onClose={() => setCropTarget(null)}
          onSave={applyCrop}
        />
      )}
    </div>
  )
}

export default MediaUploader
