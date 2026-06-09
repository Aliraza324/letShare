import {
  Bookmark,
  Calendar,
  CircleHelp,
  Compass,
  Film,
  Home,
  LogOut,
  Plus,
  Settings,
  Users,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const mainMenu = [
  { icon: Home, label: 'Home', to: '/home' },
  { icon: Compass, label: 'Explore', to: '/explore' },
  { icon: Film, label: 'Reels', to: '/reels' },
  { icon: Users, label: 'Communities', to: '/select-community' },
  { icon: Calendar, label: 'Events', to: '/events' },
  { icon: Bookmark, label: 'Saved', to: '/saved' },
]

const myCommunities = [
  { icon: '🌎', label: 'Travel Lovers', to: '/communities/travel-lovers' },
  {
    icon: '📸',
    label: 'Photography Hub',
    to: '/communities/photography-hub',
  },
  { icon: '💪', label: 'Fitness Club', to: '/communities/fitness-club' },
]

const SidebarContent = ({ onNavigate }) => {
  const { pathname } = useLocation()

  return (
    <div className="space-y-4">
      <section className="rounded-[18px] bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
        <Link
          to="/select-community"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#a6ef00] text-sm font-medium text-black"
          onClick={onNavigate}
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          Create Community
        </Link>

        <h2 className="mb-3 mt-6 px-2 text-xs font-extrabold uppercase text-slate-950">
          Main Menu
        </h2>
        <nav className="space-y-1">
          {mainMenu.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium ${
                pathname === to
                  ? 'bg-[#def7a8] text-slate-950'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
              onClick={onNavigate}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="rounded-[18px] bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
        <h2 className="mb-4 px-2 text-xs font-extrabold uppercase text-slate-950">
          My Communities
        </h2>
        <div className="space-y-3">
          {myCommunities.map((community) => (
            <Link
              key={community.label}
              to={community.to}
              className="flex h-9 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={onNavigate}
            >
              <span className="grid h-6 w-6 place-items-center rounded bg-[#ecffd4] text-xs">
                {community.icon}
              </span>
              {community.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[18px] bg-white py-4 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
        <Link
          to="/settings"
          className="flex h-10 w-full items-center gap-3 px-6 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={onNavigate}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <Link
          to="/help"
          className="flex h-10 w-full items-center gap-3 px-6 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={onNavigate}
        >
          <CircleHelp className="h-4 w-4" />
          Help
        </Link>
        <Link
          to="/login"
          className="mt-2 flex h-11 w-[78%] items-center gap-3 rounded-r-full bg-[#def7a8] px-6 text-sm font-medium text-slate-700"
          onClick={onNavigate}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Link>
      </section>
    </div>
  )
}

const LeftSidebar = ({ isOpen = false, onClose }) => {
  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <SidebarContent />
        </div>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={onClose}
            />

            <motion.aside
              className="relative h-full w-[min(82vw,310px)] overflow-y-auto bg-[#f8fee9] p-4 shadow-[18px_0_45px_rgba(15,23,42,0.18)]"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={logo}
                    alt="LetShare"
                    className="h-10 w-10 rounded-2xl object-contain shadow-[0_8px_18px_rgba(15,23,42,0.14)]"
                  />
                  <span className="text-base font-extrabold text-slate-950">
                    LetShare
                  </span>
                </div>

                <button
                  type="button"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-700 shadow-[0_10px_20px_rgba(15,23,42,0.08)]"
                  aria-label="Close menu"
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <SidebarContent onNavigate={onClose} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LeftSidebar
