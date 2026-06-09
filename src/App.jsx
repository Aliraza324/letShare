import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import AppRoutes from './routes/AppRoutes.jsx'
import GlobalLoader from './components/shared/GlobalLoader.jsx'

const App = () => {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const isBusy = isFetching + isMutating > 0

  return (
    <>
      <AppRoutes />
      <GlobalLoader active={isBusy} overlay message="Please wait..." />
    </>
  )
}

export default App
