import { useMemo, useState } from 'react'
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  communities,
  filterCommunitySizes,
  filterLocations,
} from '../../mock/communities'
import sidebarBottom from '../../assets/images/sidebarBottom.png'
import forgotPic from '../../assets/images/forgotPic.png'
import loginPic from '../../assets/images/loginPic.png'
import signUpPic from '../../assets/images/signUp.png'
import communityPic from '../../assets/images/community.png'
import Toast from '../../utils/toast.jsx'
import { fadeUp } from '../../animations/animation'
import { joinCommunity as joinCommunityAction } from '../../store/signupFlowSlice'

const communityImages = {
  art: sidebarBottom,
  creator: sidebarBottom,
  fitness: forgotPic,
  food: signUpPic,
  photography: sidebarBottom,
  travel: loginPic,
}

const SelectCommunity = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const storedJoinedIds = useSelector(
    (state) => state.signupFlow.joinedCommunityIds,
  )
  const [query, setQuery] = useState('')
  const [hashtags, setHashtags] = useState('#travel, #fitness')
  const [activeLocation, setActiveLocation] = useState('Area')
  const [activeSize, setActiveSize] = useState('medium')
  const [showToast, setShowToast] = useState(false)

  const filteredCommunities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return communities
    }

    return communities.filter((community) =>
      [community.name, community.description, ...community.categories]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [query])

  const progress = Math.min(100, Math.max(68, storedJoinedIds.length * 18 + 50))

  const joinCommunity = (communityId) => {
    dispatch(joinCommunityAction(communityId))
    setShowToast(true)
  }

  return (
    <main className="min-h-screen bg-[#fbfff4] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <Toast
        show={showToast}
        title="You are all set, Let's Share"
        message="Your profile is ready. Feed is now just personalized for you."
        onClose={() => setShowToast(false)}
      />

      <div className="mx-auto grid max-w-[1320px] gap-7 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-[34px] border border-white/80 bg-white/62 p-6 shadow-[0_28px_80px_rgba(139,220,0,0.16)] backdrop-blur-2xl">
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-lg font-extrabold leading-none text-slate-950">
                Advanced Filters
              </h2>
              <button
                type="button"
                className="text-xs font-semibold text-[#67aa00]"
                onClick={() => {
                  setActiveLocation('Area')
                  setActiveSize('medium')
                  setQuery('')
                }}
              >
                Reset
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[#9aabc3]">
                  Location
                </h3>
                <div className="mb-4 flex h-10 items-center gap-3 rounded-[16px] border border-slate-200/80 bg-slate-50/80 px-4 text-slate-400 shadow-inner focus-within:border-[#a6ef00] focus-within:ring-4 focus-within:ring-[#a6ef00]/15">
                  <Search className="h-4 w-4 shrink-0 text-slate-300" />
                  <input
                    type="text"
                    placeholder="Search City..."
                    className="h-full min-w-0 flex-1 bg-transparent text-sm font-normal text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  {filterLocations.map((location) => (
                    <button
                      key={location}
                      type="button"
                      className={`h-9 rounded-full px-4 text-sm font-semibold ${
                        activeLocation === location
                          ? 'bg-[#f2ffd9] text-[#6fb600] ring-1 ring-[#d7ff8f]'
                          : 'bg-white/80 text-slate-600 ring-1 ring-slate-200'
                      }`}
                      onClick={() => setActiveLocation(location)}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[#9aabc3]">
                  Community Size
                </h3>
                <div className="space-y-3">
                  {filterCommunitySizes.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      className={`flex min-h-[58px] w-full items-center gap-4 rounded-[18px] px-4 text-left transition ${
                        activeSize === size.id
                          ? 'bg-[#a6ef00] text-white shadow-[0_12px_24px_rgba(139,220,0,0.28)]'
                          : 'bg-slate-50/80 text-slate-500'
                      }`}
                      onClick={() => setActiveSize(size.id)}
                    >
                      <span className="h-4 w-4 rounded-full border-[3px] border-current" />
                      <span>
                        <span className="block text-sm font-extrabold leading-tight">
                          {size.label}
                        </span>
                        <span className="block text-xs opacity-70">
                          {size.detail}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[#9aabc3]">
                  Hashtags
                </h3>
                <input
                  type="text"
                  value={hashtags}
                  onChange={(event) => setHashtags(event.target.value)}
                  placeholder="#travel, #fitness"
                  className="h-10 w-full rounded-[16px] border border-slate-200/70 bg-slate-50/80 px-5 text-sm font-medium text-slate-700 shadow-inner outline-none placeholder:text-slate-400 focus:border-[#a6ef00] focus:ring-4 focus:ring-[#a6ef00]/15"
                />
              </div>

              <button
                type="button"
                className="h-12 w-full rounded-[16px] bg-[#a6ef00] text-sm font-bold text-white shadow-[0_16px_30px_rgba(122,201,0,0.30)]"
              >
                Apply Filters
              </button>
            </div>
          </div>

          <div className="relative min-h-[210px] overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_20px_50px_rgba(15,23,42,0.22)]">
            <img
              src={sidebarBottom}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/20 to-transparent" />
            <div className="relative z-10 flex h-full min-h-[160px] flex-col justify-end">
              <p className="text-xl font-extrabold leading-tight">
                Can&apos;t find your interest?
              </p>
              <button
                type="button"
                className="mt-2 text-sm font-bold text-[#a6ef00]"
              >
                Create a Community
                <ArrowRight className="ml-2 inline h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </aside>

        <section>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
          >
            <div>
              <h1 className="max-w-[520px] text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                Communities According To Your Interest
              </h1>
              <p className="mt-3 max-w-[520px] text-sm leading-6 text-slate-500">
                Discover spaces where you belong. Search or pick from our
                curated list.
              </p>
            </div>
            <button
              type="button"
              className="flex h-9 w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Sort By: Recommended
            </button>
          </motion.div>

          <div className="mb-5 flex h-12 items-center gap-3 rounded-2xl bg-white px-4 shadow-[0_10px_30px_rgba(15,23,42,0.07)]">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search interests / Add your own interest"
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-950 text-white"
              aria-label="Search communities"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCommunities.map((community) => {
              const isJoined = storedJoinedIds.includes(community.id)

              return (
                <motion.article
                  key={community.id}
                  className="overflow-hidden rounded-[22px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                  whileHover={{ y: -4 }}
                >
                  <div className="relative h-36 overflow-hidden bg-slate-100">
                    <img
                      src={communityImages[community.image] || communityPic}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${community.gradient} opacity-35 mix-blend-multiply`}
                    />
                    {community.badge && (
                      <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-extrabold uppercase text-slate-700">
                        {community.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {community.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full bg-[#ecffd4] px-2 py-1 text-[10px] font-bold uppercase text-[#7ac900]"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-base font-extrabold text-slate-950">
                      {community.name}
                    </h2>
                    <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">
                      {community.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {community.avatars.map((avatar) => (
                          <span
                            key={avatar}
                            className={`h-6 w-6 rounded-full border-2 border-white ${avatar}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400">
                        {community.members} Members active now
                      </span>
                    </div>
                    <motion.button
                      type="button"
                      className={`mt-4 h-11 w-full rounded-xl text-sm font-bold ${
                        isJoined
                          ? 'border border-[#a6ef00] bg-[#f3ffd9] text-[#69aa00]'
                          : 'bg-slate-950 text-white'
                      }`}
                      onClick={() => joinCommunity(community.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isJoined ? 'Joined' : 'Join Community'}
                    </motion.button>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <div className="mt-6 rounded-[22px] bg-white px-5 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-[#a6ef00]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                className="h-12 px-4 text-sm font-bold text-slate-700"
              >
                Skip
              </button>
              <motion.button
                type="button"
                className="flex h-12 min-w-[190px] items-center justify-center gap-2 rounded-xl bg-[#a6ef00] px-7 text-sm font-bold text-black shadow-[0_10px_18px_rgba(122,201,0,0.30)]"
                onClick={() => navigate('/home')}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default SelectCommunity
