// src/hooks/usePageTracking.ts
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

declare global {
  interface Window { gtag: any; }
}

export function usePageTracking() {
  const location = useLocation();
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-F267SWD6JC', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);
}