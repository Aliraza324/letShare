import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import GlobalLoader from '../components/shared/GlobalLoader.jsx'

const Login = lazy(() => import('../components/auth/Login.jsx'))
const SignUp = lazy(() => import('../components/auth/SignUp.jsx'))
const ForgotPassword = lazy(() =>
  import('../components/auth/ForgotPassword.jsx')
)
const VerifyOtp = lazy(() => import('../components/auth/VerifyOtp.jsx'))
const SetPassword = lazy(() => import('../components/auth/SetPassword.jsx'))
const CommunityInterests = lazy(() =>
  import('../components/auth/CommunityInterests.jsx')
)
const SelectCommunity = lazy(() =>
  import('../components/auth/SelectCommunity.jsx')
)
const Home = lazy(() => import('../pages/Home.jsx'))

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/communities" element={<CommunityInterests />} />
          <Route path="/select-community" element={<SelectCommunity />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRoutes
