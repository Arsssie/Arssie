import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mount once inside <BrowserRouter> (e.g. in App.tsx).
 * Whenever the URL hash changes (e.g. navigating to "/#about" from another
 * page), this scrolls smoothly to the element with that id once it's on
 * the page. If there's no hash, it resets scroll to the top on route change.
 */
export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");

      // The target page may not have rendered yet on the same tick as the
      // route change, so retry briefly instead of scrolling too early.
      let attempts = 0;
      const maxAttempts = 20; // ~1s total at 50ms intervals

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        attempts += 1;
        if (attempts < maxAttempts) {
          setTimeout(tryScroll, 50);
        }
      };

      const timeout = setTimeout(tryScroll, 0);
      return () => clearTimeout(timeout);
    }

    // No hash: land at the top of the new page
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [hash, pathname]);

  return null;
}