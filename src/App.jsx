import { useState, useCallback, useEffect } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'

// SCREENS
import NavigationBar from './pages/screens/NavigationBar.jsx';
import SideBar from './pages/screens/SideBar.jsx';
import Dashboard from "./pages/screens/Dashboard.jsx";
import Error404 from './pages/screens/Error404.jsx';

// POPUPPS
import Profile from './pages/popupps/screens/Profile.jsx';

// COMPONENTS
import IntroAnimation from './components/IntroAnimation.jsx';
import IdleSessionPrompt from './components/IdleSessionPrompt.jsx';
import AppUpdatesAlert from './components/AppUpdatesAlert.jsx';
import SiteTutorial from './components/SiteTutorial.jsx';
import { isSiteTutorialComplete } from './config/tutorialPreferences';
import Osbot from './components/Osbot.jsx';
import FallingParticles from './components/FallingParticles.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';
import BackgroundMusic from './components/BackgroundMusic.jsx';
import {
  loadPreferences,
  savePreferences,
  applyPreferences,
} from './config/themePreferences';
import { usePaletteRandomizer } from './hooks/usePaletteRandomizer';

// STYLINGS
import './App.css';

// RESUME
const resume = '/oscarkylpoco.pdf';

function App() {
  const routeMap = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/skills': 'Skills',
    '/experience': 'Experience',
    '/education': 'Education',
    '/featured': 'Featured',
    '/testimonials': 'Testimonials',
    '/journey': 'Journey',
    '/contact': 'Contact'
  };

  const normalizePath = (pathname) => {
    const cleaned = pathname.trim().toLowerCase();
    if (!cleaned || cleaned === '/') return '/';
    return cleaned.replace(/\/+$/, '');
  };

  const getRouteFromPath = (pathname) => {
    const normalized = normalizePath(pathname);
    return routeMap[normalized] || null;
  };

  const initialRoute = getRouteFromPath(window.location.pathname);

  const [showIntro, setShowIntro] = useState(initialRoute === 'Dashboard');
  const [activeItem, setActiveItem] = useState(initialRoute || 'Dashboard');
  const [routeNotFound, setRouteNotFound] = useState(!initialRoute);
  const [isProfile, setIsProfile] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState(() => loadPreferences());
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dashboardReady, setDashboardReady] = useState(false);
  const [idleSessionOpen, setIdleSessionOpen] = useState(false);
  const [tutorialFinished, setTutorialFinished] = useState(() =>
    isSiteTutorialComplete()
  );
  const [musicPreview, setMusicPreview] = useState(false);

  const darkMode = preferences.darkMode;
  const backgroundMusicOn =
    preferences.backgroundMusic || (settingsOpen && musicPreview);

  const randomizePalettesActive =
    !settingsOpen &&
    preferences.randomizePalette &&
    backgroundMusicOn;

  usePaletteRandomizer(
    randomizePalettesActive,
    preferences.palette,
    useCallback(
      (nextPalette) =>
        setPreferences((prev) => ({ ...prev, palette: nextPalette })),
      []
    )
  );

  useEffect(() => {
    if (!preferences.randomizePalette || backgroundMusicOn) return;
    setPreferences((prev) => ({ ...prev, randomizePalette: false }));
  }, [backgroundMusicOn, preferences.randomizePalette]);

  const handleDashboardReady = useCallback(() => {
    setDashboardReady(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    applyPreferences(preferences);
  }, [preferences]);

  const resolveRoute = (pathname) => {
    const normalized = normalizePath(pathname);
    if (routeMap[normalized]) {
      setActiveItem(routeMap[normalized]);
      setRouteNotFound(false);
      return true;
    }
    setRouteNotFound(true);
    return false;
  };

  useEffect(() => {
    const path = window.location.pathname;
    resolveRoute(path);

    const onPopState = () => {
      resolveRoute(window.location.pathname);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!routeNotFound) {
      const slug = activeItem.toLowerCase() === 'dashboard' ? '' : activeItem.toLowerCase();
      const newPath = `/${slug}`;
      if (window.location.pathname !== newPath) {
        window.history.replaceState(null, '', newPath);
      }
    }
  }, [activeItem, routeNotFound]);

  const toggleTheme = useCallback(() => {
    setPreferences((prev) => {
      const next = { ...prev, darkMode: !prev.darkMode };
      savePreferences(next);
      return next;
    });
  }, []);

  const handleSavePreferences = useCallback((next) => {
    setPreferences(next);
    savePreferences(next);
  }, []);

  const handleDownload = () => {
    const cvUrl = resume;
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'oscarkylpoco.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigateToSection = useCallback((section) => {
    setActiveItem(section);
    setRouteNotFound(false);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  if (routeNotFound) {
    return <Error404 />;
  }

  const particleEffect =
    reducedMotion || preferences.particles === "none"
      ? "none"
      : preferences.particles;

  return (
    <div className={`Parent ${darkMode ? 'dark-theme' : ''}`}>
      <FallingParticles effect={particleEffect} />

      <div className='top'>
        <NavigationBar
          onOpen={() => setIsProfile(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          toggleTheme={toggleTheme}
          darkMode={darkMode}
          activeItem={activeItem}
          musicPlaying={backgroundMusicOn}
          reducedMotion={reducedMotion}
        />
      </div>

      <div className='bottom'>
        <SideBar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        <Dashboard
          activeItem={activeItem}
          toggleTheme={toggleTheme}
          darkMode={darkMode}
          handleDownload={handleDownload}
          navigateToSection={navigateToSection}
          onReady={handleDashboardReady}
          particles={particleEffect}
        />
      </div>

      {isProfile && (
        <Profile
          onClose={() => setIsProfile(false)}
          handleDownload={handleDownload}
          darkMode={darkMode}
        />
      )}

      <IdleSessionPrompt
        darkMode={darkMode}
        onOpenChange={setIdleSessionOpen}
      />
      <SiteTutorial
        ready={dashboardReady && !tutorialFinished}
        darkMode={darkMode}
        onComplete={() => setTutorialFinished(true)}
      />
      <AppUpdatesAlert
        ready={dashboardReady && tutorialFinished}
        darkMode={darkMode}
        idleSessionOpen={idleSessionOpen}
      />
      <Osbot />

      <BackgroundMusic enabled={backgroundMusicOn} />

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        preferences={preferences}
        onSave={handleSavePreferences}
        onMusicPreviewChange={setMusicPreview}
      />

      <button
        className="theme-toggle theme-toggle-global"
        data-tutorial="global-theme"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {darkMode ? <MdOutlineLightMode size={24} /> : <MdOutlineDarkMode size={24} />}
      </button>

      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
