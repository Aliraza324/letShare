import { Bell, MessageSquare, Plus, Search } from 'lucide-react'
import logo from '../assets/images/logo.png'
import avatar from '../assets/images/avatar.jpg'

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="flex h-[76px] items-center gap-4 px-6">
        <img
          src={logo}
          alt="LetShare"
          className="h-12 w-12 rounded-2xl object-contain shadow-[0_8px_18px_rgba(15,23,42,0.14)]"
        />

        <div className="mx-auto hidden h-12 max-w-[1060px] flex-1 items-center gap-4 rounded-full border border-slate-200 bg-slate-50/70 px-5 text-slate-400 shadow-inner md:flex">
          <Search className="h-5 w-5 shrink-0" />
          <input
            type="text"
            placeholder="Search communities, posts, people..."
            className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          <button
            type="button"
            className="relative grid h-10 w-10 place-items-center rounded-full text-slate-500 hover:bg-slate-50"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-slate-500 hover:bg-slate-50"
            aria-label="Messages"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full bg-fuchsia-50 text-fuchsia-600"
            aria-label="Create"
          >
            <Plus className="h-5 w-5 stroke-[3]" />
          </button>
          <span className="h-10 w-px bg-slate-100" />
          <img
            src={avatar}
            alt="Profile"
            className="h-11 w-11 rounded-full object-cover"
          />
        </div>

        <button
          type="button"
          className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-slate-50 text-slate-600 md:hidden"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}

export default Header
