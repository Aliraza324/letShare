import { Image, Smile, Video, X } from 'lucide-react'
import boyAvatar from '../../assets/images/boy.png'

const PostComposer = () => {
  return (
    <section className="rounded-[22px] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <img
            src={boyAvatar}
            alt="Samra Ahmed"
            className="h-16 w-16 shrink-0 rounded-full object-cover shadow-[0_8px_18px_rgba(15,23,42,0.18)] sm:h-20 sm:w-20"
          />
          <div className="min-w-0">
            <h2 className="truncate text-xl font-extrabold text-slate-950 sm:text-2xl">
              Samra Ahmed
            </h2>
            <p className="mt-0.5 truncate text-base text-slate-500 sm:text-lg">
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

      <div className="mt-8 sm:ml-[88px]">
        <textarea
          rows={1}
          placeholder="What's on your mind?"
          className="w-full resize-none border-0 border-b border-slate-300 bg-transparent pb-3 text-lg text-slate-700 outline-none placeholder:text-slate-500 focus:border-[#a6ef00]"
        />

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              aria-label="Add feeling"
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
          </div>

          <button
            type="button"
            className="h-11 rounded-lg bg-[#9bf000] px-5 text-base font-bold text-black transition hover:bg-[#8be000]"
          >
            Post Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default PostComposer
