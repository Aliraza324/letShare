import {
  Bell,
  MessageCircle,
  MessageSquare,
  Plus,
  Search,
} from 'lucide-react'
import logo from '../assets/images/logo.png'
import avatar from '../assets/images/avatar.jpg'

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <img
            src={logo}
            alt="LetShare"
            className="h-11 w-11 shrink-0 rounded-2xl object-contain shadow-[0_8px_18px_rgba(15,23,42,0.14)]"
          />

          <div className="flex items-center gap-0.5 text-slate-600">
            <button
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-50"
              aria-label="Messages"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-50"
              aria-label="Create"
            >
              <Plus className="h-5 w-5 stroke-[2.6]" />
            </button>
          </div>
        </div>

        <div className="flex h-16 items-center gap-3 px-4">
          <img
            src={avatar}
            alt="Profile"
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />

          <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 text-slate-500 shadow-inner">
            <Search className="h-5 w-5 shrink-0 stroke-[2.5]" />
            <input
              type="text"
              placeholder="Search LetShare"
              className="h-full min-w-0 flex-1 bg-transparent text-base font-medium text-slate-950 outline-none placeholder:text-slate-400"
              aria-label="Search LetShare"
            />
          </label>
        </div>
      </div>

      <div className="hidden h-16 items-center gap-2 px-3 sm:gap-3 sm:px-4 md:flex lg:h-[76px] lg:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img
            src={logo}
            alt="LetShare"
            className="h-11 w-11 rounded-2xl object-contain shadow-[0_8px_18px_rgba(15,23,42,0.14)] lg:h-12 lg:w-12"
          />
        </div>

        <div className="mx-auto hidden h-11 max-w-[1060px] flex-1 items-center gap-4 rounded-full border border-slate-200 bg-slate-50/70 px-5 text-slate-400 shadow-inner md:flex lg:h-12">
          <Search className="h-5 w-5 shrink-0" />
          <input
            type="text"
            placeholder="Search communities, posts, people..."
            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 lg:text-base"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 md:hidden"
            aria-label="Create"
          >
            <Plus className="h-5 w-5 stroke-[3]" />
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 md:hidden"
            aria-label="Messages"
          >
            <MessageCircle className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="relative hidden h-10 w-10 place-items-center rounded-full text-slate-500 hover:bg-slate-50 md:grid"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <button
            type="button"
            className="hidden h-10 w-10 place-items-center rounded-full text-slate-500 hover:bg-slate-50 md:grid"
            aria-label="Messages"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="hidden h-12 w-12 place-items-center rounded-full bg-fuchsia-50 text-fuchsia-600 md:grid"
            aria-label="Create"
          >
            <Plus className="h-5 w-5 stroke-[3]" />
          </button>
          <span className="hidden h-10 w-px bg-slate-100 md:block" />
          <img
            src={avatar}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover lg:h-11 lg:w-11"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
