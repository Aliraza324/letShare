import { useCallback, useState } from 'react'
import Toast from './toast.jsx'
import { ToastContext } from './toastContext'

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((nextToast) => {
    setToast({
      type: 'success',
      ...nextToast,
    })
  }, [])

  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  return (
    <ToastContext.Provider value={{ hideToast, showToast }}>
      {children}
      <Toast
        show={Boolean(toast)}
        title={toast?.title}
        message={toast?.message}
        type={toast?.type}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  )
}
