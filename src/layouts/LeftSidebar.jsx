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
} from 'lucide-react'
import { Link } from 'react-router-dom'

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

const LeftSidebar = () => {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 space-y-4">
        <section className="rounded-[18px] bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
          <Link
            to="/select-community"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#a6ef00] text-sm font-medium text-black"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            Create Community
          </Link>

          <h2 className="mb-3 mt-6 px-2 text-xs font-extrabold uppercase text-slate-950">
            Main Menu
          </h2>
          <nav className="space-y-1">
            {mainMenu.map(({ icon: Icon, label, to }, index) => (
              <Link
                key={label}
                to={to}
                className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium ${
                  index === 0
                    ? 'bg-[#def7a8] text-slate-950'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
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
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            to="/help"
            className="flex h-10 w-full items-center gap-3 px-6 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <CircleHelp className="h-4 w-4" />
            Help
          </Link>
          <Link
            to="/login"
            className="mt-2 flex h-11 w-[78%] items-center gap-3 rounded-r-full bg-[#def7a8] px-6 text-sm font-medium text-slate-700"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Link>
        </section>
      </div>
    </aside>
  )
}

export default LeftSidebar
