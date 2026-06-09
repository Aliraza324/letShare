import { Flame, Plus, Star } from 'lucide-react'
import fitnessImage from '../../assets/images/com.png'
import photographyImage from '../../assets/images/communiti.png'
import travelImage from '../../assets/images/community.png'
import fitnessMembers from '../../assets/images/Container (1).png'
import photographyMembers from '../../assets/images/Container.png'
import { communities } from '../../mock/communities'

const communityMedia = {
  'photography-hub': {
    image: photographyImage,
    membersImage: photographyMembers,
    badge: 'Trending',
    icon: Flame,
    title: 'Photography Hub',
    description:
      'Master your craft. Critique, gear talk, and daily photo challenges for all skill levels.',
    members: '+12k Members',
  },
  'fitness-enthusiasts': {
    image: fitnessImage,
    membersImage: fitnessMembers,
    badge: 'Popular',
    icon: Star,
    title: 'Fitness Enthusiasts',
    description:
      'Your daily dose of motivation. Workout routines, nutrition advice, and progress sharing.',
    members: '+45k Members',
  },
}

const featuredCommunities = communities
  .filter((community) => communityMedia[community.id])
  .map((community) => ({
    ...community,
    ...communityMedia[community.id],
  }))

const mobileCommunities = [
  {
    id: 'travel-lovers',
    image: travelImage,
    badge: 'Trending',
    title: 'Travel Lovers 🌍',
    membersImage: photographyMembers,
    members: 'Member In this Community',
  },
  {
    id: 'fitness-enthusiasts',
    image: fitnessImage,
    badge: 'Popular',
    title: 'Fitness Enthusiasts 💪',
    membersImage: fitnessMembers,
    members: 'Member In this Community',
  },
]

const ExploreCommunities = () => {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-4 sm:mb-5">
        <h2 className="text-lg font-extrabold text-black sm:text-2xl">
          Explore Communities
        </h2>
        <button
          type="button"
          className="text-[10px] font-bold text-[#7ac900] transition hover:text-[#65a900] sm:h-10 sm:rounded-full sm:bg-[#ecffc8] sm:px-5 sm:text-sm sm:font-medium sm:hover:bg-[#e1ffad]"
        >
          View All
        </button>
      </div>

      <div className="space-y-3 sm:hidden">
        {mobileCommunities.map((community) => (
          <article
            key={community.id}
            className="relative h-[163px] overflow-hidden rounded-lg bg-slate-100"
          >
            <img
              src={community.image}
              alt={community.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/10 to-black/0" />

            <span className="absolute left-4 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-950">
              {community.badge}
            </span>

            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
              <div className="min-w-0 text-white">
                <h3 className="truncate text-base font-extrabold leading-none">
                  {community.title}
                </h3>
                <div className="mt-2 flex items-center gap-1.5">
                  <img
                    src={community.membersImage}
                    alt=""
                    className="h-5 w-[58px] shrink-0 object-contain object-left"
                  />
                  <span className="max-w-[64px] text-[6px] font-medium leading-tight text-white/90">
                    {community.members}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-white/28 px-4 text-xs font-bold text-white backdrop-blur-md"
              >
                Join Now
                <Plus className="h-4 w-4 text-[#8ddf00] stroke-[3]" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden gap-4 sm:grid lg:grid-cols-2">
        {featuredCommunities.map((community) => {
          const BadgeIcon = community.icon

          return (
            <article
              key={community.id}
              className="overflow-hidden rounded-[22px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
            >
              <div className="relative h-36 overflow-hidden sm:h-40">
                <img
                  src={community.image}
                  alt={community.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-sm font-bold text-slate-800 shadow-[0_8px_18px_rgba(15,23,42,0.16)]">
                  <BadgeIcon
                    className={`h-4 w-4 ${
                      community.badge === 'Popular'
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-orange-500 text-orange-500'
                    }`}
                  />
                  {community.badge}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-extrabold text-slate-950">
                  {community.title}
                </h3>
                <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
                  {community.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={community.membersImage}
                      alt=""
                      className="h-8 w-[74px] shrink-0 object-contain object-left"
                    />
                    <span className="truncate text-sm font-bold text-slate-500">
                      {community.members}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="h-10 shrink-0 rounded-xl bg-[#ecffc8] px-5 text-sm font-extrabold text-[#66aa00] transition hover:bg-[#dcffa3]"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ExploreCommunities
