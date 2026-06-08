import { User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import greenBg from '../../assets/images/greenBg.png'
import forgotPic from '../../assets/images/forgotPic.png'
import logo from '../../assets/images/logo.png'
import { fadeUp } from '../../animations/animation'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/verify-otp')
  }

  return (
    <main className="h-screen overflow-hidden bg-white text-slate-950">
      <div className="grid h-screen grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,0.95fr)_minmax(390px,1.05fr)]">
        <section className="relative hidden h-screen items-center justify-center overflow-hidden lg:flex">
          <img
            src={greenBg}
            alt=""
            className="absolute inset-y-0 left-0 h-full w-[96%] object-fill object-right"
          />
          <motion.img
            src={forgotPic}
            alt="LetShare community cards"
            className="relative z-10 w-[60%] max-w-[440px] drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        </section>

        <section className="flex h-screen items-center justify-center overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
          <div className="absolute inset-x-0 top-0 h-44 bg-[#a6ef00] lg:hidden" />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative z-10 w-full max-w-[430px] rounded-[26px] border border-slate-100 bg-white px-5 py-7 shadow-[0_18px_45px_rgba(15,23,42,0.16)] sm:px-8 sm:py-8 lg:px-10"
          >
            <div className="mb-5 flex justify-center">
              <img
                src={logo}
                alt="LetShare"
                className="h-14 w-14 rounded-2xl object-contain shadow-[0_8px_18px_rgba(15,23,42,0.14)]"
              />
            </div>

            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold leading-tight text-slate-950 sm:text-[26px]">
                Forgot Password
              </h1>
              <p className="mx-auto mt-2 max-w-[310px] text-sm leading-5 text-slate-500">
                Enter your registered email. We will send you a reset code.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-xs font-semibold text-slate-950"
                >
                  Email
                </label>
                <motion.div
                  className="flex h-10 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#a6ef00] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#a6ef00]/20"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <User className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </motion.div>
              </div>

              <motion.button
                type="submit"
                className="h-11 w-full rounded-xl bg-[#a6ef00] text-sm font-bold text-black shadow-[0_10px_18px_rgba(122,201,0,0.34)] transition hover:bg-[#98df00] focus:outline-none focus:ring-4 focus:ring-[#a6ef00]/30"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
              >
                Reset Password
              </motion.button>
            </form>
          </motion.div>
        </section>
      </div>
    </main>
  )
}

export default ForgotPassword
