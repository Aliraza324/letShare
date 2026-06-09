import { Plus } from 'lucide-react'

const StoryCard = ({ story }) => {
  if (story.type === 'create') {
    return (
      <label className="flex h-[105px] cursor-pointer flex-col items-center justify-center rounded-[10px] bg-black text-center sm:aspect-[0.9] sm:h-auto sm:min-h-[190px] sm:rounded-xl sm:bg-[#ecffc8]">
        <input
          type="file"
          accept="image/*,video/*"
          className="sr-only"
          aria-label="Upload image or video"
        />
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#8ddf00] text-black shadow-[0_10px_18px_rgba(122,201,0,0.34)] sm:h-11 sm:w-11">
          <Plus className="h-5 w-5 stroke-[2.4] sm:h-6 sm:w-6" />
        </span>
        <span className="mt-3 max-w-[58px] text-[10px] font-extrabold leading-tight text-[#8ddf00] sm:mt-7 sm:max-w-[92px] sm:text-lg sm:leading-none">
          {story.title}
        </span>
      </label>
    )
  }

  return (
    <article className="relative h-[105px] overflow-hidden rounded-[10px] bg-white sm:aspect-[0.9] sm:h-auto sm:min-h-[190px] sm:rounded-xl">
      <img
        src={story.image}
        alt={story.title}
        className="h-full w-full object-cover"
      />
      {story.avatar && (
        <img
          src={story.avatar}
          alt=""
          className="absolute left-1.5 top-1.5 h-7 w-7 rounded-full border-2 border-[#8ddf00] object-cover shadow-[0_6px_12px_rgba(15,23,42,0.22)] sm:left-2 sm:top-2 sm:h-9 sm:w-9"
        />
      )}
    </article>
  )
}

export default StoryCard
