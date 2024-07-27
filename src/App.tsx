import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Discover from '@/pages/Discover';
import ScrollToTop from '@/utlities/ScrollToTop';
import NotFound from '@/pages/NotFound';
import DefaultLayout from '@/layouts/Default';
import AuthLayout from '@/layouts/Auth';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<DefaultLayout/>}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="discover" element={<Discover />}/>
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/auth" element={<AuthLayout />}>
              <Route index element={<Navigate to="/auth/login" />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<Navigate to="/auth/login" />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </ScrollToTop>
    </Router>
  );
}

export default App
