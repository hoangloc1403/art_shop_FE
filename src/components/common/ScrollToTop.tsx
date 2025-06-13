// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll lên top mỗi khi pathname (route) thay đổi
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
