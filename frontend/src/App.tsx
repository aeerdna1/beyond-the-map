import { Component, lazy, Suspense, useEffect, type ReactNode } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Loading } from './components/Status';
import { useT } from './i18n';

// Every page is its own file, downloaded the first time it is opened. The home page is
// fetched right away (below), because most visits start there.
const loadHome = () => import('./pages/Home');
const Home = lazy(loadHome);
const Destinations = lazy(() => import('./pages/Destinations'));
const Country = lazy(() => import('./pages/Country'));
const PlacePage = lazy(() => import('./pages/Place'));
const About = lazy(() => import('./pages/About'));
const PlanTrip = lazy(() => import('./pages/PlanTrip'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Start downloading the home page together with the main bundle instead of after it.
void loadHome();

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/** Shown when a page file cannot be downloaded (offline, or an old version after a deploy). */
function PageLoadError() {
  const t = useT();
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="text-6xl">📡</p>
      <h1 className="mt-4 text-3xl font-bold">{t.status.loadErrorTitle}</h1>
      <p className="mt-2 text-plum/70">{t.status.loadErrorText}</p>
      <button type="button" className="btn-primary mt-8" onClick={() => window.location.reload()}>
        {t.status.reload}
      </button>
    </div>
  );
}

// Catches a failed page download so the visitor gets a retry button instead of a blank page.
// Keyed by the path in App, so moving to another page clears the error.
class PageErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <PageLoadError /> : this.props.children;
  }
}

export default function App() {
  const location = useLocation();
  // overflow-x-clip (not hidden): stops slide-in animations from making the page scroll sideways
  // on phones, without creating a scroll container that would break the sticky header.
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <PageErrorBoundary key={location.pathname}>
            {/* Inside the animated <main>, so the header and footer stay put while a page loads. */}
            <Suspense fallback={<Loading />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destinations/:slug" element={<Country />} />
                <Route path="/destinations/:slug/:placeSlug" element={<PlacePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/plan-my-trip" element={<PlanTrip />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageErrorBoundary>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
