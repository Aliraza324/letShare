import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import greenBg from '../../assets/images/greenBg.png'
import forgotPic from '../../assets/images/forgotPic.png'
import logo from '../../assets/images/logo.png'
import { fadeUp } from '../../animations/animation'
import Toast from '../../utils/toast.jsx'

const otpLength = 5

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(otpLength).fill(''))
  const [toast, setToast] = useState(null)
  const inputRefs = useRef([])
  const navigate = useNavigate()

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const nextOtp = [...otp]
    nextOtp[index] = digit
    setOtp(nextOtp)

    if (digit && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (otp.some((digit) => !digit)) {
      setToast({
        message: 'Please enter the complete verification code.',
        title: 'OTP error',
        type: 'error',
      })
      return
    }

    setToast({
      message: 'OTP verified successfully.',
      title: 'Verified',
      type: 'success',
    })
    window.setTimeout(() => navigate('/set-password'), 700)
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
                Verify Your Account
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <form className="space-y-7" onSubmit={handleSubmit}>
              <div>
                <div className="flex justify-center gap-3">
                  {otp.map((value, index) => (
                    <motion.input
                      key={index}
                      ref={(element) => {
                        inputRefs.current[index] = element
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={value}
                      onChange={(event) =>
                        handleChange(index, event.target.value)
                      }
                      onKeyDown={(event) => handleKeyDown(index, event)}
                      className="h-10 w-10 rounded-lg border border-slate-200 bg-white text-center text-sm font-medium text-slate-900 outline-none transition focus:border-[#a6ef00] focus:ring-4 focus:ring-[#a6ef00]/20"
                      whileFocus={{ scale: 1.06 }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-center text-xs text-slate-950">
                  Didn&apos;t receive the code?{' '}
                  <button
                    type="button"
                    className="font-medium text-orange-500"
                  >
                    Resend
                  </button>
                </p>
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

export default VerifyOtp
