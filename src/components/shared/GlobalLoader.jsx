import { AnimatePresence, motion } from 'framer-motion'
import logo from '../../assets/images/logo.png'

const GlobalLoader = ({ active = true, message = 'Loading...', overlay = false }) => {
  const content = (
    <motion.div
      className="relative flex flex-col items-center gap-5"
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      role="status"
      aria-live="polite"
    >
      <div className="relative grid h-28 w-28 place-items-center">
        <motion.span
          className="absolute h-full w-full rounded-full bg-[#a6ef00]/15 blur-xl"
          animate={{ scale: [0.86, 1.08, 0.86], opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute h-24 w-24 rounded-full border border-[#a6ef00]/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#8ddf00] shadow-[0_0_18px_rgba(141,223,0,0.9)]" />
          <span className="absolute bottom-2 right-1 h-2 w-2 rounded-full bg-slate-900 shadow-[0_0_14px_rgba(15,23,42,0.35)]" />
        </motion.span>
        <motion.span
          className="absolute h-20 w-20 rounded-full border-4 border-transparent border-t-[#8ddf00] border-r-[#8ddf00]"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="relative grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.16)]"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src={logo} alt="" className="h-11 w-11 object-contain" />
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-extrabold tracking-normal text-slate-950">
          LetShare
        </span>
        <span className="text-xs font-semibold text-slate-500">{message}</span>
      </div>

      <div className="flex h-1.5 w-36 overflow-hidden rounded-full bg-slate-100">
        <motion.span
          className="h-full rounded-full bg-[#8ddf00]"
          initial={{ x: '-100%', width: '45%' }}
          animate={{ x: ['-100%', '230%'] }}
          transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )

  if (!overlay) {
    return (
      <div className="grid min-h-screen place-items-center bg-white text-slate-950">
        {content}
      </div>
    )
  }

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9999] grid place-items-center bg-white/80 text-slate-950 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GlobalLoader
