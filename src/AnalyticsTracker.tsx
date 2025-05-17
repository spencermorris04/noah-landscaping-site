// src/components/AnalyticsTracker.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';

export function AnalyticsTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1) on every route change
    posthog.capture('$pageview', { path: pathname });

    // handler for page-leave (route unmount or tab close)
    const handleLeave = () => {
      posthog.capture('$pageleave', { path: pathname });
    };

    // when the tab is hidden (user switches away or closes)
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') handleLeave();
    };

    window.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('beforeunload', handleLeave);

    return () => {
      // when this route unmounts (SPA navigation away)
      handleLeave();
      window.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('beforeunload', handleLeave);
    };
  }, [pathname]);

  return null;
}
