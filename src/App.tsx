import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Discover from '@/pages/Discover';
import ScrollToTop from '@/utils/ScrollToTop';
import NotFound from '@/pages/NotFound';
import DefaultLayout from '@/layouts/Default';
import AuthLayout from '@/layouts/Auth';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify'
import { setAuthorizationHeader } from '@axios';

function App() {
  // get token from local storage
  const token = localStorage.getItem('token')

  if (token) {
    setAuthorizationHeader(token)
  }

  const defaultMiddleware = () => {
    if (!token) {
      return <Navigate to="/auth/login" />
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
              <Route path="/" element={defaultMiddleware()}>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="discover" element={<Discover />}/>
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route path="/auth" element={authMiddleware()}>
                <Route index element={<Navigate to="/auth/login" />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Navigate to="/auth/login" />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App
