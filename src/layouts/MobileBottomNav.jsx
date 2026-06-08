import { Bookmark, Calendar, Compass, Film, Home, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const mobileMenu = [
  { icon: Home, label: 'Home', to: '/home' },
  { icon: Compass, label: 'Explore', to: '/explore' },
  { icon: Film, label: 'Reels', to: '/reels', badge: 8 },
  { icon: Users, label: 'Communities', to: '/select-community' },
  { icon: Calendar, label: 'Events', to: '/events' },
  { icon: Bookmark, label: 'Saved', to: '/saved' },
]

const MobileBottomNav = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/80 backdrop-blur-lg lg:hidden">
      <div className="grid h-14 grid-cols-6 items-center px-2">
        {mobileMenu.map(({ badge, icon: Icon, label, to }, index) => (
          <Link
            key={label}
            to={to}
            className={`relative flex h-full flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-medium ${
              index === 0
                ? 'text-[#7ac900]'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
            <span className="max-w-full truncate px-1">{label}</span>
            {badge && (
              <span className="absolute right-2 top-0.5 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-xs font-extrabold text-white">
                {badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default MobileBottomNav
