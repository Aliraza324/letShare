import { Flame, Search, Star } from 'lucide-react'
import avatarGroup from '../../assets/images/Container.png'
import fitnessMembers from '../../assets/images/Container (1).png'
import travelImage from '../../assets/images/community.png'
import fitnessImage from '../../assets/images/com.png'
import { communities } from '../../mock/communities'

const filters = [
  'All',
  'Trending',
  'New',
  'Travel',
  'Photography',
  'Fitness',
  'Gaming',
  'Art',
]

const communityPresentation = {
  'travel-lovers': {
    image: travelImage,
    membersImage: avatarGroup,
    badge: 'Trending',
    icon: Flame,
  },
  'fitness-enthusiasts': {
    image: fitnessImage,
    membersImage: fitnessMembers,
    badge: 'Popular',
    icon: Star,
  },
}

const savedCommunities = communities
  .filter((community) => communityPresentation[community.id])
  .map((community) => ({
    ...community,
    ...communityPresentation[community.id],
    title: community.name,
    members: community.members,
  }))

const SavedOverviewSection = () => {
  return (
    <section className="bg-white p-0 shadow-none sm:rounded-[18px] sm:p-8 sm:shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">Saved</h1>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Discover your saved favourites
          </p>
        </div>

        <label className="flex h-9 w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-400 sm:max-w-[270px]">
          <Search className="h-4 w-4 shrink-0" />
          <input
            type="text"
            placeholder="Find a community..."
            className="h-full min-w-0 flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((filter, index) => (
          <button
            key={filter}
            type="button"
            className={`h-8 shrink-0 rounded-full px-4 text-xs font-semibold ${
              index === 0
                ? 'bg-[#9bf000] text-black'
                : 'border border-slate-200 bg-white text-slate-600'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {savedCommunities.map(({ icon: BadgeIcon, ...community }) => (
          <article
            key={community.id}
            className="overflow-hidden rounded-[16px] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={community.image}
                alt={community.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 inline-flex h-6 items-center gap-1 rounded-full bg-white px-2.5 text-[10px] font-bold text-slate-900">
                <BadgeIcon
                  className={`h-3 w-3 ${
                    community.badge === 'Popular'
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-orange-500 text-orange-500'
                  }`}
                />
                {community.badge}
              </span>
            </div>

            <div className="p-5">
              <h2 className="text-base font-extrabold text-slate-950">
                {community.title}
              </h2>
              <p className="mt-2 min-h-[40px] text-xs leading-5 text-slate-500">
                {community.description}
              </p>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <img
                    src={community.membersImage}
                    alt=""
                    className="h-7 w-[68px] shrink-0 object-contain object-left"
                  />
                  <span className="truncate text-xs font-bold text-slate-500">
                    {community.members} Members
                  </span>
                </div>

                <button
                  type="button"
                  className="h-8 shrink-0 rounded-lg bg-[#ecffc8] px-4 text-xs font-extrabold text-[#65a900]"
                >
                  Join Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SavedOverviewSection
