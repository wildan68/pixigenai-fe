import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop ({ children }: { children: React.ReactNode }) {
  const route = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  return <>{children}</>;
}