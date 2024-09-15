import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Create from '@/pages/Create';
import ScrollToTop from '@/components/ScrollToTop';
import NotFound from '@/pages/NotFound';
import DefaultLayout from '@/layouts/Default';
import AuthLayout from '@/layouts/Auth';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import VerifyOTP from '@/pages/VerifyOTP';
import SetupProfile from '@/pages/SetupProfile';
import ResetPassword from '@/pages/ResetPassword';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '@stores/UserStores';
import { setAuthenticated } from './stores/AuthStores';
import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores';
import { useEffect, Suspense } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { setAuthorizationHeader } from './plugins/axios';

function App() {
  // get token from local storage
  const token = localStorage.getItem('token')

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const { authenticated } = useSelector((state: RootState) => state.auth)

  const googleClientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID

  useEffect(() => {
    if (token) {
      setAuthorizationHeader(token as string)

      dispatch(userProfile({ id: null }))
        .then(({ meta }) => {
          if (meta.requestStatus === 'rejected') {
            localStorage.removeItem('token')
            window.open('/login', '_self')
          }

          if (meta.requestStatus === 'fulfilled') {
            dispatch(setAuthenticated(true))
          }
        })
    }
  }, [dispatch, token])

  const defaultMiddleware = () => {
    if (!token && !authenticated) {
      return <Navigate to="/login" />
    }

    return <DefaultLayout/>
  }

  const authMiddleware = () => {
    if (token && authenticated) {
      return <Navigate to="/" />
    }

    return <AuthLayout />
  }

  return (
    <>
      <ToastContainer theme='dark'/>

      <GoogleOAuthProvider clientId={googleClientId}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <ScrollToTop>
              <AnimatePresence>
                <Routes>
                  <Route element={defaultMiddleware()}>
                    <Route index element={<Navigate to="/dashboard" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="create" element={<Create />}/>
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  <Route element={authMiddleware()}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="verify-otp" element={<VerifyOTP />} />
                    <Route path="setup-profile" element={<SetupProfile />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                  </Route>
                </Routes>
              </AnimatePresence>
            </ScrollToTop>
          </Suspense>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App
