import { Clock, MapPin, MoreHorizontal } from 'lucide-react'
import david from '../assets/images/david.jpg'
import jannat from '../assets/images/jannat.jpg'
import john from '../assets/images/john.jpg'
import samra from '../assets/images/samra.jpg'

const trends = [
  { label: '#Travel', posts: '12.4K posts' },
  { label: '#Photography', posts: '8.2K posts' },
]

const connections = [
  { name: 'David Chen', role: 'Photographer', image: david },
  { name: 'John Chen', role: 'Photographer', image: john },
  { name: 'Samra', role: 'Photographer', image: samra },
  { name: 'Jannat', role: 'Photographer', image: jannat },
]

const events = [
  {
    date: '12',
    month: 'Oct',
    title: 'Night Sky Photography',
    meta: '8:00 PM • Virtual',
    icon: Clock,
  },
  {
    date: '15',
    month: 'Oct',
    title: 'Morning Beach Run',
    meta: 'Santa Monica, CA',
    icon: MapPin,
  },
  {
    date: '20',
    month: 'Oct',
    title: 'Art History Webinar',
    meta: '6:30 PM • Live Stream',
    icon: Clock,
  },
]

const RightSidebar = ({ children }) => {
  if (children) {
    return <>{children}</>
  }

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-20 min-h-[calc(100vh-96px)] rounded-[18px] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-950">
              Trending Now 🔥
            </h2>
            <button className="text-xs font-semibold text-[#7ac900]">
              See all
            </button>
          </div>
          <div className="space-y-4">
            {trends.map((trend) => (
              <div key={trend.label} className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-950">
                    {trend.label}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">{trend.posts}</p>
                </div>
                <MoreHorizontal className="h-4 w-4 text-slate-300" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-extrabold text-slate-950">
            Suggested Connections
          </h2>
          <div className="mt-4 space-y-4">
            {connections.map((connection) => (
              <div key={connection.name} className="flex items-center gap-3">
                <img
                  src={connection.image}
                  alt={connection.name}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-extrabold text-slate-950">
                    {connection.name}
                  </h3>
                  <p className="text-xs text-slate-400">{connection.role}</p>
                </div>
                <button className="h-8 rounded-lg bg-[#a6ef00] px-3 text-xs font-bold text-black">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-extrabold text-slate-950">
            Upcoming Events
          </h2>
          <div className="mt-5 space-y-4">
            {events.map(({ date, icon: Icon, meta, month, title }) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-center">
                  <span>
                    <span className="block text-[10px] font-extrabold uppercase text-[#a6ef00]">
                      {month}
                    </span>
                    <span className="block text-xl font-extrabold text-slate-950">
                      {date}
                    </span>
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-extrabold text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                    <Icon className="h-3 w-3" />
                    {meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

     
      </div>
    </aside>
  )
}

export default RightSidebar
