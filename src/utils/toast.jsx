import { useEffect } from 'react'
import { AlertCircle, Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Toast = ({ message, onClose, show, title, type = 'success' }) => {
  const isError = type === 'error'

  useEffect(() => {
    if (!show) return undefined

    const timer = window.setTimeout(() => {
      onClose?.()
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [onClose, show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className={`fixed left-4 right-4 top-4 z-50 flex items-center gap-3 rounded border bg-white px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.16)] sm:left-auto sm:w-[min(calc(100vw-32px),430px)] sm:items-start sm:gap-4 sm:px-5 sm:py-4 ${
            isError ? 'border-red-400' : 'border-[#a6ef00]'
          }`}
          role="status"
        >
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-white sm:h-12 sm:w-12 ${
              isError ? 'bg-red-500' : 'bg-[#a6ef00]'
            }`}
          >
            {isError ? (
              <AlertCircle className="h-6 w-6 sm:h-7 sm:w-7" />
            ) : (
              <Check className="h-7 w-7 sm:h-8 sm:w-8" />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-extrabold leading-tight text-slate-950">
              {title}
            </h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              {message}
            </p>
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
