import { useMemo, useState } from 'react'
import { Play } from 'lucide-react'
import LightboxMediaViewer from './LightboxMediaViewer'

const normalizeMedia = (post) => {
  if (post.media?.length) return post.media

  return [
    {
      id: `${post.id}-media`,
      type: post.isVideo ? 'video' : 'image',
      src: post.image,
      thumbnail: post.image,
    },
  ]
}

const MediaTile = ({ hiddenCount = 0, item, onClick, tall = false }) => (
  <button
    type="button"
    className="group relative h-full min-h-0 w-full overflow-hidden bg-slate-100 text-left"
    onClick={onClick}
    aria-label="Open media viewer"
  >
    <img
      src={item.thumbnail || item.src}
      alt=""
      loading="lazy"
      className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
        tall ? 'h-[300px]' : 'h-full'
      }`}
    />
    {item.type === 'video' && (
      <span className="absolute inset-0 m-auto grid h-12 w-12 place-items-center rounded-full border-4 border-white bg-[#8ddf00] text-white">
        <Play className="ml-1 h-6 w-6 fill-white" />
      </span>
    )}
    {hiddenCount > 0 && (
      <span className="absolute inset-0 grid place-items-center bg-black/55 text-4xl font-extrabold text-white">
        +{hiddenCount}
      </span>
    )}
  </button>
)

const MediaGallery = ({ post }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const items = useMemo(() => normalizeMedia(post), [post])

  return (
    <>
      <div className="relative mx-4 overflow-hidden rounded-[14px] bg-slate-100">
        {items.length === 1 && (
          <MediaTile
            item={items[0]}
            tall
            onClick={() => setLightboxIndex(0)}
          />
        )}

        {items.length === 2 && (
          <div className="grid h-[300px] grid-cols-2 gap-1">
            {items.map((item, index) => (
              <MediaTile
                key={item.id}
                item={item}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </div>
        )}

        {items.length === 3 && (
          <div className="grid h-[360px] grid-rows-[1.35fr_1fr] gap-1">
            <MediaTile item={items[0]} onClick={() => setLightboxIndex(0)} />
            <div className="grid grid-cols-2 gap-1">
              {items.slice(1).map((item, index) => (
                <MediaTile
                  key={item.id}
                  item={item}
                  onClick={() => setLightboxIndex(index + 1)}
                />
              ))}
            </div>
          </div>
        )}

        {items.length >= 4 && (
          <div className="grid h-[360px] grid-cols-2 gap-1">
            {items.slice(0, 4).map((item, index) => (
              <MediaTile
                key={item.id}
                hiddenCount={index === 3 ? items.length - 4 : 0}
                item={item}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <LightboxMediaViewer
          initialIndex={lightboxIndex}
          items={items}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}

export default MediaGallery
