import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Discover from '@/pages/Discover';
import ScrollToTop from '@/utils/ScrollToTop';
import NotFound from '@/pages/NotFound';
import DefaultLayout from '@/layouts/Default';
import AuthLayout from '@/layouts/Auth';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import VerifyOTP from '@/pages/VerifyOTP';
import SetupProfile from '@/pages/SetupProfile';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify'
import { setAuthorizationHeader } from '@axios';
import { useDispatch } from 'react-redux';
import { userProfile } from '@stores/UserStores';
import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores';
import { useEffect } from 'react';

function App() {
  // get token from local storage
  const token = localStorage.getItem('token')

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  useEffect(() => {
    if (token) {
      setAuthorizationHeader(token as string)

      dispatch(userProfile({ id: null }))
        .then(({ meta }) => {
          if (meta.requestStatus === 'rejected') {
            localStorage.removeItem('token')
            window.open('/login', '_self')
          }
        })
    }
  }, [dispatch, token])

  const defaultMiddleware = () => {
    if (!token) {
      return <Navigate to="/login" />
    }

    return <DefaultLayout/>
  }

  const authMiddleware = () => {
    if (token) {
      return <Navigate to="/" />
    }

    return <AuthLayout />
  }

  return (
    <>
      <ToastContainer theme='dark'/>

      <Router>
        <ScrollToTop>
          <AnimatePresence>
            <Routes>
              <Route element={defaultMiddleware()}>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="discover" element={<Discover />}/>
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route element={authMiddleware()}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="verify-otp" element={<VerifyOTP />} />
                <Route path="setup-profile" element={<SetupProfile />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App
