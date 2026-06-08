import { Plus } from 'lucide-react'

const StoryCard = ({ story }) => {
  if (story.type === 'create') {
    return (
      <label className="flex aspect-[0.9] min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-xl bg-[#ecffc8] text-center ">
        <input
          type="file"
          accept="image/*,video/*"
          className="sr-only"
          aria-label="Upload image or video"
        />
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#8ddf00] text-black shadow-[0_10px_18px_rgba(122,201,0,0.34)]">
          <Plus className="h-6 w-6 stroke-[2.4]" />
        </span>
        <span className="mt-7 max-w-[92px] text-lg font-extrabold leading-none text-[#8ddf00]">
          {story.title}
        </span>
      </label>
    )
  }

  return (
    <article className="relative aspect-[0.9] min-h-[190px] overflow-hidden rounded-xl bg-white ">
      <img
        src={story.image}
        alt={story.title}
        className="h-full w-full object-cover"
      />
      {story.avatar && (
        <img
          src={story.avatar}
          alt=""
          className="absolute left-2 top-2 h-9 w-9 rounded-full border-2 border-[#8ddf00] object-cover shadow-[0_6px_12px_rgba(15,23,42,0.22)]"
        />
      )}
    </article>
  )
}

export default StoryCard
