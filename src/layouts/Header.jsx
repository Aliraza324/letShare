import {
  Bell,
  Menu,
  MessageCircle,
  MessageSquare,
  Plus,
  Search,
} from 'lucide-react'
import logo from '../assets/images/logo.png'
import avatar from '../assets/images/avatar.jpg'

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="bg-[#f5fde4] px-5 py-3 md:hidden">
        <div className="flex h-11 items-center gap-3">
          <button
            type="button"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black text-white shadow-[0_8px_18px_rgba(15,23,42,0.12)]"
            aria-label="Open menu"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5 stroke-[3]" />
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[9px] font-medium leading-tight text-slate-600">
              Samra! Great Day
            </p>
            <h1 className="mt-1 truncate text-sm font-extrabold leading-none text-slate-950">
              Welcome Back!
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="relative grid h-8 w-8 place-items-center rounded-lg bg-white text-slate-500 shadow-[0_8px_16px_rgba(15,23,42,0.06)]"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#b7f238] px-1 text-[10px] font-bold leading-none text-slate-950">
                3
              </span>
            </button>

            <img
              src={avatar}
              alt="Profile"
              className="h-8 w-8 rounded-full border-2 border-slate-950 object-cover p-0.5"
            />
          </div>
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
