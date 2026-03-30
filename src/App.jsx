import { useState, useCallback, useEffect } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

// SCREENS
import NavigationBar from './pages/screens/NavigationBar.jsx';
import SideBar from './pages/screens/SideBar.jsx';
import Dashboard from "./pages/screens/Dashboard.jsx";
import Error404 from './pages/screens/Error404.jsx';

// POPUPPS
import Profile from './pages/popupps/screens/Profile.jsx';

// COMPONENTS
import IntroAnimation from './components/IntroAnimation.jsx';

// STYLINGS
import './App.css';

// RESUME
import resume from './assets/oscarkylpoco.pdf'

function App() {
  const routeMap = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/skills': 'Skills',
    '/experience': 'Experience',
    '/education': 'Education',
    '/featured': 'Featured',
    '/testimonials': 'Testimonials',
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

  // INTRO ANIMATION STATE (only dashboard)
  const [showIntro, setShowIntro] = useState(initialRoute === 'Dashboard');

  // SIDEBAR NAVIGATION STATE
  const [activeItem, setActiveItem] = useState(initialRoute || 'Dashboard');
  const [routeNotFound, setRouteNotFound] = useState(!initialRoute);

  // PROFILE STATE
  const [isProfile, setIsProfile] = useState(false);

  // AUTH
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // DARK MODE - Default to dark theme
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  // MOBILE VIEW unsupported overlay
  const [isMobileView, setIsMobileView] = useState(false);

  // Apply theme on mount and when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileView(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    let redirectTimer;
    if (window.innerWidth <= 768) {
      redirectTimer = setTimeout(() => {
        window.location.href = 'https://oscar-oldsite.vercel.app/';
      }, 5000);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, []);

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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // DOWNLOAD RESUME
  const handleDownload = () => {
    const cvUrl = resume;

    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'oscarkylpoco.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // NAVIGATE TO SECTION - passed to About component for card clicks
  const navigateToSection = useCallback((section) => {
    setActiveItem(section);
    setRouteNotFound(false);
  }, []);

  // HANDLE INTRO COMPLETE
  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  if (isMobileView) {
    return (
      <div className="mobile-blocker" style={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '24px',
          background: '#0f172a',
          color: '#f8fafc'
      }}>
        <div>
          <h1>Mobile view is not supported</h1>
          <p style={{margin: '1rem 0'}}>Click here to view the compatible site for mobile, or wait to auto-redirect.</p>
          <a href="https://oscar-oldsite.vercel.app/" style={{
            color: '#ffffff',
            background: '#2563eb',
            borderRadius: '10px',
            padding: '12px 18px',
            textDecoration: 'none',
            fontWeight: 600
          }}>Go to mobile-friendly site</a>
        </div>
      </div>
    );
  }

  if (routeNotFound) {
    return <Error404 />;
  }

  return (
    <div className={`Parent ${darkMode ? 'dark-theme' : ''}`}>
      <div className='top'>
        <NavigationBar
          onOpen={() => setIsProfile(true)}
          isAuthenticated={isAuthenticated}
          toggleTheme={toggleTheme}
          darkMode={darkMode}
          activeItem={activeItem}
        />
      </div>

      <div className='bottom'>

        {/* SIDEBAR */}
        <SideBar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isAuthenticated={isAuthenticated}
          darkMode={darkMode}
        />

        {/* DASHBOARD */}
        <Dashboard
          activeItem={activeItem}
          isAuthenticated={isAuthenticated}
         
          toggleTheme={toggleTheme}
          darkMode={darkMode}
          handleDownload={handleDownload}
          navigateToSection={navigateToSection}
        />

      </div>

      {/* POPUPPS */}

      {isProfile &&
        (
          <Profile
            onClose={() => setIsProfile(false)}
            isAuthenticated={isAuthenticated}
            handleDownload={handleDownload}
            darkMode={darkMode}
          />
        )}

      {/* FLOATING GLOBAL THEME BUTTON */}
      <button
        className="theme-toggle theme-toggle-global"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {darkMode ? <MdOutlineLightMode size={24} /> : <MdOutlineDarkMode size={24} />}
      </button>

      {/* ENDS */}

    </div>
  );
}

export default App;
