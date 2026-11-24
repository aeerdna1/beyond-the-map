import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Country from './pages/Country';
import PlacePage from './pages/Place';
import About from './pages/About';
import PlanTrip from './pages/PlanTrip';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
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
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
