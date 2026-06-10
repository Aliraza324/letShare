import { useState } from 'react'
import Cropper from 'react-easy-crop'
import { X } from 'lucide-react'

const ImageCropper = ({ image, onClose, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-black/80 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label="Crop image"
    >
      <div className="flex h-[min(760px,100%)] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white">
        <div className="flex h-14 items-center justify-between border-b border-slate-100 px-4">
          <h2 className="text-sm font-extrabold text-slate-950">Crop image</h2>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
            aria-label="Close cropper"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 bg-slate-950">
          <Cropper
            image={image.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
            onZoomChange={setZoom}
          />
        </div>

        <div className="space-y-4 border-t border-slate-100 p-4">
          <label className="block text-xs font-extrabold uppercase text-slate-400">
            Zoom
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              className="mt-2 w-full accent-[#8ddf00]"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-bold text-slate-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="h-10 rounded-lg bg-[#8ddf00] px-4 text-sm font-extrabold text-black"
              onClick={() => onSave({ crop, zoom, croppedAreaPixels })}
            >
              Apply crop
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCropper
