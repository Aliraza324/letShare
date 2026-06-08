import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import greenBg from '../../assets/images/greenBg.png'
import signUpPic from '../../assets/images/signUp.png'
import logo from '../../assets/images/logo.png'
import { fadeUp } from '../../animations/animation'
import { setSignupUser } from '../../store/signupFlowSlice'
import Toast from '../../utils/toast.jsx'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const password = form.elements.password.value
    const confirmPassword = form.elements.confirmPassword.value

    if (!form.checkValidity()) {
      setToast({
        message: 'Please fill all required fields correctly.',
        title: 'Signup error',
        type: 'error',
      })
      form.reportValidity()
      return
    }

    if (password !== confirmPassword) {
      setToast({
        message: 'Password and confirm password must match.',
        title: 'Signup error',
        type: 'error',
      })
      form.elements.confirmPassword.setCustomValidity('Passwords do not match')
      form.reportValidity()
      form.elements.confirmPassword.setCustomValidity('')
      return
    }

    dispatch(
      setSignupUser({
        email: form.elements.email.value,
        fullName: form.elements.fullName.value,
        isPublic,
      }),
    )
    setToast({
      message: 'Account created successfully. Choose your interests next.',
      title: 'Signup successful',
      type: 'success',
    })
    window.setTimeout(() => navigate('/communities'), 700)
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Toast
        show={Boolean(toast)}
        title={toast?.title}
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
      <div className="grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,0.95fr)_minmax(390px,1.05fr)]">
        <section className="relative hidden min-h-screen items-center justify-center overflow-hidden lg:flex">
          <img
            src={greenBg}
            alt=""
            className="absolute inset-y-0 left-0 h-full w-[96%] object-fill object-right"
          />
          <motion.img
            src={signUpPic}
            alt="LetShare subscriber cards"
            className="relative z-10 w-[66%] max-w-[500px] drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-5 sm:px-6 lg:px-8">
          <div className="absolute inset-x-0 top-0 h-44 bg-[#a6ef00] lg:hidden" />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative z-10 w-full max-w-[430px] rounded-[26px] border border-slate-100 bg-white px-5 py-6 shadow-[0_18px_45px_rgba(15,23,42,0.16)] sm:px-8 sm:py-7 lg:px-10"
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
                Create Your Account
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Create your account to explore something amazing
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-xs font-semibold text-slate-950"
                >
                  Full Name
                </label>
                <motion.div
                  className="flex h-10 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#a6ef00] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#a6ef00]/20"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <User className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </motion.div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold text-slate-950"
                >
                  Email / Phone
                </label>
                <motion.div
                  className="flex h-10 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#a6ef00] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#a6ef00]/20"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </motion.div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-semibold text-slate-950"
                >
                  Password
                </label>
                <motion.div
                  className="flex h-10 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#a6ef00] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#a6ef00]/20"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <Lock className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="********"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  <motion.button
                    type="button"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
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
                </motion.div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-semibold text-slate-950"
                >
                  Confirm Password
                </label>
                <motion.div
                  className="flex h-10 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#a6ef00] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#a6ef00]/20"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <Lock className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="********"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  <motion.button
                    type="button"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label={
                      showConfirmPassword
                        ? 'Hide confirm password'
                        : 'Show confirm password'
                    }
                    aria-pressed={showConfirmPassword}
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </motion.button>
                </motion.div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-950">
                <span>Public</span>
                <button
                  type="button"
                  className={`relative h-4 w-8 rounded-full p-0.5 transition-colors ${
                    isPublic ? 'bg-[#a6ef00]' : 'bg-slate-300'
                  }`}
                  aria-label="Toggle account privacy"
                  aria-pressed={isPublic}
                  onClick={() => setIsPublic((current) => !current)}
                >
                  <motion.span
                    className="block h-3 w-3 rounded-full bg-white shadow-sm"
                    animate={{ x: isPublic ? 14 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
                <span>Private</span>
              </div>

              <motion.button
                type="submit"
                className="h-11 w-full rounded-xl bg-[#a6ef00] text-sm font-bold text-black shadow-[0_10px_18px_rgba(122,201,0,0.34)] transition hover:bg-[#98df00] focus:outline-none focus:ring-4 focus:ring-[#a6ef00]/30"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
              >
                Sign Up
              </motion.button>
            </form>



            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#7ac900]">
                Log In
              </Link>
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  )
}

export default SignUp
