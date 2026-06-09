import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  ChevronRight,
  Menu,
  MessageCircle,
  MessageSquare,
  Plus,
  Search,
  X,
} from 'lucide-react'
import logo from '../assets/images/logo.png'
import avatar from '../assets/images/avatar.jpg'

const profileLinks = [
  { label: 'Manage Communities', to: '/select-community' },
  { label: 'Finance & Billing', to: '/billing' },
  { label: 'Legal & Verification', to: '/verification' },
]

const ProfileModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[70] bg-black/10 px-3 pt-20 backdrop-blur-[1px] md:bg-transparent md:pt-20">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close profile menu"
        onClick={onClose}
      />

      <div className="relative mx-auto w-full max-w-[352px] rounded-[28px] bg-white px-6 py-7 shadow-[0_18px_45px_rgba(15,23,42,0.18)] md:mr-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-950">User</h2>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full text-slate-950 transition hover:bg-slate-50"
            aria-label="Close profile menu"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Link
          to="/profile"
          className="mt-5 flex items-center gap-3 rounded-xl py-2 transition hover:bg-slate-50"
          onClick={onClose}
        >
          <img
            src={avatar}
            alt="User profile"
            className="h-11 w-11 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-slate-950">
              User Name
            </h3>
            <p className="truncate text-xs font-medium text-slate-600">
              Nafuser@gmail.com
            </p>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-slate-950" />
        </Link>

        <div className="my-4 h-px bg-slate-200" />

        <nav className="space-y-1">
          {profileLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex h-10 items-center justify-between rounded-xl text-sm font-bold text-slate-950 transition hover:bg-slate-50"
              onClick={onClose}
            >
              {item.label}
              <ChevronRight className="h-5 w-5 text-slate-950" />
            </Link>
          ))}
        </nav>

        <div className="my-4 h-px bg-slate-200" />

        <Link
          to="/business-profile"
          className="flex h-11 items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm font-medium text-slate-500 transition hover:border-[#a6ef00] hover:text-[#65a900]"
          onClick={onClose}
        >
          Switch To Business Profile
        </Link>

        <div className="my-5 h-px bg-slate-200" />

        <div className="flex justify-end">
          <Link
            to="/login"
            className="flex h-9 min-w-[110px] items-center justify-center rounded-full bg-[#9bf000] px-6 text-sm font-medium text-black transition hover:bg-[#8be000]"
            onClick={onClose}
          >
            Log Out
          </Link>
        </div>
      </div>
    </div>
  )
}

const Header = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

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

            <button
              type="button"
              aria-label="Open profile menu"
              onClick={() => setIsProfileOpen(true)}
            >
              <img
                src={avatar}
                alt="Profile"
                className="h-8 w-8 rounded-full border-2 border-slate-950 object-cover p-0.5"
              />
            </button>
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
          <button
            type="button"
            aria-label="Open profile menu"
            onClick={() => setIsProfileOpen(true)}
          >
            <img
              src={avatar}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover lg:h-11 lg:w-11"
            />
          </button>
        </div>
      </div>

      {isProfileOpen && <ProfileModal onClose={() => setIsProfileOpen(false)} />}
    </header>
  )
}

export default Header
