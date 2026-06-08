import { Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Toast = ({ message, onClose, show, title }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed right-4 top-4 z-50 flex w-[min(calc(100vw-32px),430px)] items-start gap-4 rounded border border-[#a6ef00] bg-white px-5 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.16)]"
          role="status"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#a6ef00] text-white">
            <Check className="h-8 w-8" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-extrabold text-slate-950">
              {title}
            </h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">{message}</p>
          </div>
          <button
            type="button"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close notification"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
