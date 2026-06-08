import { useMemo, useState } from 'react'
import { ArrowRight, Plus, Search, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import communityPic from '../../assets/images/community.png'
import worldPic from '../../assets/images/world.png'
import { fadeUp } from '../../animations/animation'

const interestGroups = [
  {
    title: 'Business & Career',
    items: [
      'Entrepreneurship',
      'Real Estate',
      'Innovation',
      'Digital',
      'Marketing',
      'AI',
    ],
  },
  {
    title: 'Lifestyle',
    items: ['Fashion', 'Style', 'Food', 'Travel', 'Dinning', 'Automative'],
  },
  {
    title: 'Fitness & Sports',
    items: ['Fitness', 'Gym', 'Yoga', 'Basketball'],
  },
  {
    title: 'Entertainment',
    items: [
      'Music',
      'video',
      'Live shows',
      'Running',
      'Beach',
      'Dating',
      'Cooking',
      'Swimming',
      'Investing',
      'Pets',
    ],
  },
]

const CommunityInterests = () => {
  const [selectedInterests, setSelectedInterests] = useState([
    'AI',
    'Travel',
    'Fitness',
  ])
  const [customInterests, setCustomInterests] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const groups = useMemo(() => {
    if (!customInterests.length) {
      return interestGroups
    }

    return [
      ...interestGroups,
      {
        title: 'Custom',
        items: customInterests,
      },
    ]
  }, [customInterests])

  const filteredGroups = useMemo(() => {
    const query = searchValue.trim().toLowerCase()

    if (!query) {
      return groups
    }

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.toLowerCase().includes(query)),
      }))
      .filter((group) => group.items.length)
  }, [groups, searchValue])

  const toggleInterest = (interest) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    )
  }

  const addInterest = () => {
    const interest = searchValue.trim()

    if (!interest) {
      return
    }

    const allInterests = groups.flatMap((group) => group.items)
    const existingInterest = allInterests.find(
      (item) => item.toLowerCase() === interest.toLowerCase(),
    )
    const nextInterest = existingInterest || interest

    if (!existingInterest) {
      setCustomInterests((current) => [...current, nextInterest])
    }

    setSelectedInterests((current) =>
      current.includes(nextInterest) ? current : [...current, nextInterest],
    )
    setSearchValue('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    addInterest()
  }

  const progress = Math.min(100, Math.max(20, selectedInterests.length * 22 + 2))

  return (
    <main className="min-h-screen bg-[#fbfff4] text-slate-950">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(360px,0.95fr)_minmax(430px,1.05fr)]">
        <section className="relative flex min-h-[48vh] items-center justify-center overflow-hidden px-5 py-8 lg:min-h-screen lg:px-10">
          <div className="absolute left-1/2 top-1/2 h-[560px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ddffb9]/55 blur-3xl" />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex w-full max-w-[430px] flex-col items-center text-center"
          >
            <h1 className="max-w-[390px] text-[28px] font-extrabold leading-[1.12] text-slate-950 sm:text-[34px]">
              Discover communities
              <br />
              made just for you
              <img
                src={worldPic}
                alt="World"
                className="ml-1 inline h-6 w-6 align-[-3px] sm:h-7 sm:w-7"
              />
            </h1>
            <p className="mt-4 max-w-[330px] text-sm leading-6 text-slate-800">
              Choose what inspires you and personalize your MEEM experience.
            </p>
            <div className="relative mt-8 w-full max-w-[360px]">
              <div className="absolute inset-x-8 bottom-4 h-24 rounded-full bg-[#cfff80]/45 blur-2xl" />
              <motion.img
                src={communityPic}
                alt="Person discovering communities"
                className="relative z-10 w-full object-contain"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
              />
            </div>
          </motion.div>
        </section>

        <section className="flex items-center justify-center px-4 pb-6 lg:min-h-screen lg:px-10 lg:py-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex w-full max-w-[640px] flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]"
          >
            <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
              <form
                className="mb-5 flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 shadow-sm focus-within:border-[#a6ef00] focus-within:ring-4 focus-within:ring-[#a6ef00]/15"
                onSubmit={handleSearchSubmit}
              >
                <Search className="h-4 w-4 shrink-0 text-slate-500" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search interests / Add your own interest"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
                <motion.button
                  type="submit"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-950"
                  aria-label="Add interest"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <Plus className="h-4 w-4" />
                </motion.button>
              </form>

              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-[0.08em] text-slate-700">
                  Selected Interests
                </h2>
                <span className="rounded-full bg-[#ecffd4] px-3 py-1 text-xs font-bold text-[#8bdc00]">
                  {selectedInterests.length} Selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className="flex h-9 items-center gap-2 rounded-full bg-[#a6ef00] px-4 text-sm font-semibold text-slate-950"
                  >
                    {interest}
                    <X className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5 px-5 py-5 sm:px-7">
              {!filteredGroups.length && (
                <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                  Press + to add this interest.
                </div>
              )}

              {filteredGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-700">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => {
                      const isSelected = selectedInterests.includes(item)

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleInterest(item)}
                          className={`h-9 rounded-full border px-4 text-sm font-medium transition ${
                            isSelected
                              ? 'border-[#a6ef00] bg-[#a6ef00] text-slate-950'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-[#a6ef00]'
                          }`}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto border-t border-slate-100 bg-white px-5 py-5 sm:px-7">
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
                  onClick={() => navigate('/select-community')}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}

export default CommunityInterests
