import React from 'react'
import heroImage from '../../assets/images/hero.png'

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden rounded-[22px] border border-slate-100 bg-white bg-none bg-contain bg-right bg-no-repeat shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:bg-[image:var(--hero-bg)]"
      style={{ '--hero-bg': `url(${heroImage})` }}
    >
      <div className="relative min-h-[270px] p-6 sm:p-8 lg:min-h-[390px] lg:p-10">
        <div className="flex h-full max-w-[390px] flex-col items-start justify-center">
          <span className="rounded-full bg-[#ddff80] px-5 py-2 text-xs font-extrabold text-slate-900 shadow-[0_10px_22px_rgba(122,201,0,0.16)]">
            Welcome Back, Samra
          </span>

          <h1 className="mt-5 max-w-[360px] text-4xl font-extrabold leading-tight text-black sm:text-5xl">
            Discover communities, That Match{' '}
            <span className="text-[#8ddf00]">Your World</span>
          </h1>

          <button
            type="button"
            className="mt-8 h-12 rounded-xl bg-[#9bf000] px-7 text-base font-bold text-black shadow-[0_14px_26px_rgba(122,201,0,0.26)] transition hover:bg-[#8be000]"
          >
            Explore Communities
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
