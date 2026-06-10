import { Image, Play, Plus, Video } from 'lucide-react'

const StoryCard = ({ onCreateStory, onOpenStory, story }) => {
  const stopStoryDrag = (event) => {
    event.stopPropagation()
  }

  const handleFilesSelected = (event) => {
    const files = Array.from(event.target.files || [])

    if (files.length > 0) {
      onCreateStory?.(files)
    }

    event.target.value = ''
  }

  const isOwnStory =
    story.isOwn || String(story.id).startsWith('uploaded-') || /^your/i.test(story.title || '')
  const isViewed = story.viewed
  const storyRingClass = isViewed
    ? 'border-white/80 ring-2 ring-slate-300'
    : 'border-white ring-2 ring-[#8ddf00] ring-offset-2 ring-offset-white'
  const title = story.title || story.username || 'Story'

  if (story.type === 'create') {
    return (
      <label
        className="group relative flex h-[72px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[8px] bg-black text-center ring-1 ring-black/5 transition focus-within:ring-2 focus-within:ring-[#8ddf00] sm:aspect-[0.9] sm:h-auto sm:min-h-[190px] sm:rounded-xl sm:bg-[#ecffc8]"
        data-story-upload
        onPointerDown={stopStoryDrag}
      >
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          className="sr-only"
          aria-label="Upload image or video"
          onChange={handleFilesSelected}
        />
        <span className="absolute left-1 top-1 hidden items-center gap-1 rounded-full bg-white/75 px-1.5 py-1 text-black sm:flex">
          <Image className="h-3.5 w-3.5" />
          <Video className="h-3.5 w-3.5" />
        </span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#8ddf00] text-black transition group-hover:scale-105 sm:h-11 sm:w-11">
          <Plus className="h-4 w-4 stroke-[2.4] sm:h-6 sm:w-6" />
        </span>
        <span className="mt-2 max-w-[44px] text-[8px] font-extrabold leading-tight text-[#8ddf00] sm:mt-7 sm:max-w-[92px] sm:text-lg sm:leading-none">
          {title}
        </span>
        <span className="mt-1 hidden text-[10px] font-bold text-black/55 sm:block">
          Image or video
        </span>
      </label>
    )
  }

  return (
    <button
      type="button"
      className="group relative h-[72px] w-full overflow-hidden rounded-[8px] bg-white text-left outline-none ring-1 ring-black/5 transition focus-visible:ring-2 focus-visible:ring-[#8ddf00] sm:aspect-[0.9] sm:h-auto sm:min-h-[190px] sm:rounded-xl"
      data-story-card
      aria-label={`Open ${title}'s story`}
      onPointerDown={stopStoryDrag}
      onClick={() => onOpenStory?.(story)}
    >
      {story.video ? (
        <video
          src={story.video}
          aria-label={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          muted
          loop
          playsInline
          autoPlay
        />
      ) : (
        <img
          src={story.image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />
      <span className="absolute left-1 top-1 flex items-center gap-1 sm:left-2 sm:top-2">
        {story.avatar ? (
          <img
            src={story.avatar}
            alt=""
            className={`h-6 w-6 rounded-full border-2 object-cover sm:h-10 sm:w-10 ${storyRingClass}`}
          />
        ) : (
          <span
            className={`grid h-6 w-6 place-items-center rounded-full bg-[#8ddf00] text-[10px] font-extrabold text-black sm:h-10 sm:w-10 sm:text-sm ${storyRingClass}`}
            aria-hidden="true"
          >
            {title.charAt(0).toUpperCase()}
          </span>
        )}
      </span>
      {story.video && (
        <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/70 text-white backdrop-blur sm:right-2 sm:top-2 sm:h-7 sm:w-7">
          <Play className="h-3 w-3 fill-current sm:h-4 sm:w-4" />
        </span>
      )}
      {isOwnStory && (
        <span className="absolute bottom-6 left-1 rounded-full bg-[#8ddf00] px-1.5 py-0.5 text-[7px] font-extrabold uppercase leading-none text-black sm:bottom-10 sm:left-2 sm:px-2 sm:text-[10px]">
          Yours
        </span>
      )}
      <span className="absolute bottom-1 left-1 right-1 line-clamp-2 text-[8px] font-extrabold leading-tight text-white drop-shadow sm:bottom-2 sm:left-2 sm:right-2 sm:text-base sm:leading-[1.05]">
        {title}
      </span>
    </button>
  )
}

export default StoryCard
