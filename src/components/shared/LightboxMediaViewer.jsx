import { useMemo } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Video from 'yet-another-react-lightbox/plugins/video'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'

const LightboxMediaViewer = ({ initialIndex = 0, items, onClose }) => {
  const slides = useMemo(
    () =>
      items.map((item) =>
        item.type === 'video'
          ? {
              type: 'video',
              poster: item.thumbnail,
              sources: [{ src: item.src, type: 'video/mp4' }],
            }
          : { src: item.src },
      ),
    [items],
  )

  return (
    <Lightbox
      close={onClose}
      index={initialIndex}
      open
      plugins={[Video, Zoom]}
      slides={slides}
      carousel={{ finite: false }}
      controller={{ closeOnBackdropClick: true }}
      render={{
        buttonPrev: items.length <= 1 ? () => null : undefined,
        buttonNext: items.length <= 1 ? () => null : undefined,
      }}
      video={{
        autoPlay: true,
        controls: true,
        playsInline: true,
      }}
      zoom={{
        maxZoomPixelRatio: 2.5,
        scrollToZoom: true,
      }}
    />
  )
}

export default LightboxMediaViewer
