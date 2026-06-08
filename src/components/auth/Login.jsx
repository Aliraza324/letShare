import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import greenBg from '../../assets/images/greenBg.png'
import loginPic from '../../assets/images/loginPic.png'
import logo from '../../assets/images/logo.png'
import googleIcon from '../../assets/images/googleIcon.png'
import fbIcon from '../../assets/images/fbIcon.png'
import { fadeUp } from '../../animations/animation'
import Toast from '../../utils/toast.jsx'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.checkValidity()) {
      setToast({
        message: 'Please enter your email and password.',
        title: 'Login error',
        type: 'error',
      })
      form.reportValidity()
      return
    }

    setToast({
      message: 'You are logged in successfully.',
      title: 'Login successful',
      type: 'success',
    })
    window.setTimeout(() => navigate('/home'), 700)
  }

  return (
    <main className="h-screen overflow-hidden bg-white text-slate-950">
      <Toast
        show={Boolean(toast)}
        title={toast?.title}
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
      <div className="grid h-screen grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,0.95fr)_minmax(390px,1.05fr)]">
        <section className="relative hidden h-screen items-center justify-center overflow-hidden lg:flex">
          <img
            src={greenBg}
            alt=""
            className="absolute inset-y-0 left-0 h-full w-[96%] object-fill object-right"
          />
          <motion.img
            src={loginPic}
            alt="People joining LetShare"
            className="relative z-10 w-[62%] max-w-[430px] drop-shadow-2xl"
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
            className="relative z-10 w-full max-w-[430px] rounded-[26px] border border-slate-100 bg-white px-5 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.16)] sm:px-8 sm:py-6 lg:px-10"
          >
            <div className="mb-4 flex justify-center">
              <img
                src={logo}
                alt="LetShare"
                className="h-14 w-14 rounded-2xl object-contain shadow-[0_8px_18px_rgba(15,23,42,0.14)]"
              />
            </div>

            <div className="mb-5 text-center">
              <h1 className="text-2xl font-bold leading-tight text-slate-950 sm:text-[26px]">
                Welcome back!
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Log in to your account to continue your journey.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold text-slate-950"
                >
                  Email / Phone
                </label>
                <div className="flex h-10 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#a6ef00] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#a6ef00]/20">
                  <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold text-slate-950"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#7ac900] hover:text-[#65a900]"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="flex h-10 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#a6ef00] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#a6ef00]/20">
                  <Lock className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="********"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  <motion.button
                    type="button"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 transition "
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((current) => !current)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </motion.button>
                </div>
              </div>

              <label className="flex w-fit items-center gap-2 text-xs text-slate-800">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-slate-300 accent-[#a6ef00]"
                />
                Keep me logged in
              </label>

              <button
                type="submit"
                className="h-11 w-full rounded-xl bg-[#a6ef00] text-sm font-bold text-black shadow-[0_10px_18px_rgba(122,201,0,0.34)] transition focus:outline-none focus:ring-4 focus:ring-[#a6ef00]/30"
              >
                Log In
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-100" />
              <span className="text-xs text-slate-400">Or continue with</span>
              <span className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
              <motion.button
                type="button"
                className="flex h-10 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition "
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <img src={googleIcon} alt="" className="h-4 w-4 object-cover" />
                Google
              </motion.button>
              <motion.button
                type="button"
                className="flex h-10 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition "
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <img src={fbIcon} alt="" className="h-4 w-4" />
                Facebook
              </motion.button>
            </div>

            <p className="mt-5 text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-[#7ac900]">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  )
}

export default Login
