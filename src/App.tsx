import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import {
  Search,
  ChevronUp,
  Download,
  MessageCircle,
  HelpCircle,
  X,
  Filter,
  ChevronDown,
  Info,
  Palette,
  ArrowUp,
  Check,
  Play,
  Folder,
  ArrowLeft,
  Eye,
} from 'lucide-react';

// Import data from the data directory
import { toolsData } from './data';

// Main category filters
const mainCategories = [
  'Software',
  'Plugin',
  'Extension',
  'Leaks',
  'Clips',
  'Scripts',
];

// Discord server link
const DISCORD_SERVER_LINK = 'https://discord.gg/ErHZJJ7Tdh';

// Theme options
const themeOptions = [
  {
    name: 'Blue',
    primary: '#0070f3',
    accent: '#00c2ff',
    background: '#0a0a0a',
    primaryRgb: '0, 112, 243',
    accentRgb: '0, 194, 255',
  },
  {
    name: 'Red',
    primary: '#ff0040',
    accent: '#ff5e5e',
    background: '#0a0a0a',
    primaryRgb: '255, 0, 64',
    accentRgb: '255, 94, 94',
  },
  {
    name: 'Green',
    primary: '#00c853',
    accent: '#69f0ae',
    background: '#0a0a0a',
    primaryRgb: '0, 200, 83',
    accentRgb: '105, 240, 174',
  },
  {
    name: 'Purple',
    primary: '#7c4dff',
    accent: '#b388ff',
    background: '#0a0a0a',
    primaryRgb: '124, 77, 255',
    accentRgb: '179, 136, 255',
  },
  {
    name: 'Orange',
    primary: '#ff6d00',
    accent: '#ffab40',
    background: '#0a0a0a',
    primaryRgb: '255, 109, 0',
    accentRgb: '255, 171, 64',
  },
];

// Local storage keys
const THEME_STORAGE_KEY = 'aura-theme-preference';
const DISCLAIMER_STORAGE_KEY = 'aura-disclaimer-accepted';

function App() {
  // State for UI elements
  const [showWarning, setShowWarning] = useState(() => {
    return localStorage.getItem(DISCLAIMER_STORAGE_KEY) !== 'true';
  });
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [showCollapseMenu, setShowCollapseMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFaq, setShowFaq] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch (e) {
        return themeOptions[0];
      }
    }
    return themeOptions[0];
  });

  // State for clips preview modal
  const [showClipsPreview, setShowClipsPreview] = useState(false);
  const [selectedClip, setSelectedClip] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  // Refs for custom cursor
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailerRef = useRef<HTMLDivElement>(null);
  const particleBgRef = useRef<HTMLDivElement>(null);

  // Initialize particles with memoization for better performance
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Handle warning acceptance
  const handleAcceptWarning = () => {
    setShowWarning(false);
    setLoading(true);

    if (dontShowAgain) {
      localStorage.setItem(DISCLAIMER_STORAGE_KEY, 'true');
    }

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setLoadingPercentage(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    }, 15);
  };

  // Apply theme to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', currentTheme.primary);
    document.documentElement.style.setProperty('--accent', currentTheme.accent);
    document.documentElement.style.setProperty('--background', currentTheme.background);
    document.documentElement.style.setProperty('--primary-rgb', currentTheme.primaryRgb);
    document.documentElement.style.setProperty('--accent-rgb', currentTheme.accentRgb);

    const primaryDark = adjustColor(currentTheme.primary, -20);
    document.documentElement.style.setProperty('--primary-dark', primaryDark);

    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(currentTheme));
  }, [currentTheme]);

  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    return '#' + color.replace(/^#/, '').replace(/../g, (color) => {
      const value = Math.min(255, Math.max(0, parseInt(color, 16) + amount));
      return value.toString(16).padStart(2, '0');
    });
  };

  // Create star particles for enhanced background
  useEffect(() => {
    if (!particleBgRef.current) return;

    particleBgRef.current.innerHTML = '';

    const createStars = () => {
      const starsCount = 100;
      const container = particleBgRef.current;
      if (!container) return;

      for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('particle-star');

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.7 + 0.3;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--delay', `${delay}s`);
        star.style.setProperty('--opacity', `${opacity}`);

        if (Math.random() > 0.5) {
          star.style.background = currentTheme.primary;
        } else {
          star.style.background = currentTheme.accent;
        }

        container.appendChild(star);
      }

      for (let i = 0; i < 5; i++) {
        const orb = document.createElement('div');
        orb.classList.add('floating-orb');

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 200 + 100;
        const delay = Math.random() * 5;

        orb.style.left = `${x}%`;
        orb.style.top = `${y}%`;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.animationDelay = `${delay}s`;

        container.appendChild(orb);
      }
    };

    createStars();
  }, [currentTheme]);

  // Custom cursor effect with debounce for better performance
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${lastX}px`;
            cursorRef.current.style.top = `${lastY}px`;
          }

          if (cursorTrailerRef.current) {
            cursorTrailerRef.current.style.left = `${lastX}px`;
            cursorTrailerRef.current.style.top = `${lastY}px`;
          }

          rafId = null;
        });
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '15px';
        cursorRef.current.style.height = '15px';
      }
      if (cursorTrailerRef.current) {
        cursorTrailerRef.current.style.width = '30px';
        cursorTrailerRef.current.style.height = '30px';
      }
    };

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '20px';
        cursorRef.current.style.height = '20px';
      }
      if (cursorTrailerRef.current) {
        cursorTrailerRef.current.style.width = '40px';
        cursorTrailerRef.current.style.height = '40px';
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', handleContextMenu);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll to top functionality with smoother animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable background interaction when disclaimer is shown
  useEffect(() => {
    if (showWarning || showClipsPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showWarning, showClipsPreview]);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 25;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  // Handle Discord button click
  const handleDiscordClick = () => {
    window.open(DISCORD_SERVER_LINK, '_blank');
  };

  // Filter tools based on search and tags - memoized for better performance
  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      const matchesSearch = tool.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => tool.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedTags]);

  // Toggle tag selection
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  // Handle download click
  const handleDownload = useCallback((link: string) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      alert('Download link is not available at the moment. Please try again later.');
    }
  }, []);

  // Change theme
  const changeTheme = useCallback((theme: (typeof themeOptions)[0]) => {
    setCurrentTheme(theme);
    setShowThemeSelector(false);
  }, []);

  // Handle clip preview
  const handleClipPreview = useCallback((clip: any) => {
    setSelectedClip(clip);
    setShowClipsPreview(true);
  }, []);

  // Handle file selection in preview
  const handleFileSelect = useCallback((file: any) => {
    setSelectedFile(file);
  }, []);

  // Close clips preview modal
  const closeClipsPreview = useCallback(() => {
    setShowClipsPreview(false);
    setSelectedClip(null);
    setSelectedFile(null);
  }, []);

  // Memoize particle options for better performance
  const particleOptions = useMemo(() => {
    return {
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: [currentTheme.primary, currentTheme.accent],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 0.5,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            size_min: 0.3,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: currentTheme.primary,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab',
          },
          onclick: {
            enable: true,
            mode: 'push',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },
          push: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
      background: {
        color: 'transparent',
        image: '',
        position: '50% 50%',
        repeat: 'no-repeat',
        size: 'cover',
      },
    };
  }, [currentTheme.primary, currentTheme.accent]);

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorTrailerRef} className="cursor-trailer"></div>

      {/* Enhanced Particle Background */}
      <div ref={particleBgRef} className="particle-bg"></div>

      {/* Particles Background */}
      <div className="particles-container">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particleOptions}
        />
      </div>

      {/* Enhanced Disclaimer Modal */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            className="warning-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="disclaimer-content modern-disclaimer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="disclaimer-glow"></div>

              <div className="disclaimer-header">
                <motion.h2
                  className="disclaimer-title"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  WELCOME TO AURA
                </motion.h2>
              </div>

              <div className="disclaimer-body">
                <motion.div
                  className="disclaimer-icon-container"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 12 }}
                >
                  <Check size={40} className="disclaimer-main-icon" />
                </motion.div>

                <motion.p
                  className="disclaimer-message"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Everything on this website is safe to download and use.
                  However, we recommend using an anti-virus program for your own
                  protection and peace of mind.
                </motion.p>

                <motion.div
                  className="disclaimer-checkbox-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="disclaimer-checkbox-label">
                    <input
                      type="checkbox"
                      checked={dontShowAgain}
                      onChange={() => setDontShowAgain(!dontShowAgain)}
                      className="disclaimer-checkbox"
                    />
                    <span className="disclaimer-checkbox-custom">
                      {dontShowAgain && <Check size={12} />}
                    </span>
                    <span>Don't show this message again</span>
                  </label>
                </motion.div>
              </div>

              <div className="disclaimer-footer">
                <motion.button
                  className="disclaimer-btn modern-btn"
                  onClick={handleAcceptWarning}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Continue to Aura
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loading-aura"></div>
            <motion.div
              className="loading-content"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="loading-title">Defining Your Aura</h1>
              <p className="loading-subtitle">
                Preparing your digital workspace...
              </p>
              <div className="loading-bar-container">
                <motion.div
                  className="loading-bar"
                  initial={{ width: '0%' }}
                  animate={{ width: `${loadingPercentage}%` }}
                  transition={{ duration: 0.1 }}
                ></motion.div>
              </div>
              <p className="loading-percentage">{loadingPercentage}%</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Modal */}
      <AnimatePresence>
        {showFaq && (
          <motion.div
            className="faq-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="faq-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="faq-header">
                <h2 className="faq-title">Frequently Asked Questions</h2>
                <button className="close-btn" onClick={() => setShowFaq(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="faq-body">
                <div className="faq-item">
                  <h3>What is EditTools?</h3>
                  <p>
                    EditTools is a platform that provides access to various
                    editing software for educational purposes. We aim to help
                    users explore different tools before making a purchase
                    decision.
                  </p>
                </div>

                <div className="faq-item">
                  <h3>Are these downloads safe?</h3>
                  <p>
                    While we try to ensure the safety of all downloads, we
                    cannot guarantee that all files are 100% safe. We recommend
                    using a reliable antivirus program when downloading and
                    installing any software.
                  </p>
                </div>

                <div className="faq-item">
                  <h3>What if a download requires a password?</h3>
                  <p>
                    If any zip file requires a password, the password is always
                    "aura" (without quotes). This is the standard password for
                    all protected archives on our site.
                  </p>
                </div>

                <div className="faq-item">
                  <h3>Why do some downloads redirect to external sites?</h3>
                  <p>
                    Some downloads are hosted on external platforms to ensure
                    availability. You may need to navigate through ad pages or
                    link shorteners to access the actual download.
                  </p>
                </div>

                <div className="faq-item">
                  <h3>How do I report a broken link?</h3>
                  <p>
                    You can report broken links by joining our Discord community
                    and posting in the #broken-links channel.
                  </p>
                </div>

                <div className="faq-item">
                  <h3>How often is the site updated?</h3>
                  <p>
                    We update our collection regularly with the latest versions
                    of software. Check back frequently for new additions.
                  </p>
                </div>

                <div className="faq-item">
                  <h3>Is using this software legal?</h3>
                  <p>
                    Using pirated software may violate copyright laws in your
                    country. This site is for educational purposes only, and we
                    encourage users to purchase legitimate licenses for software
                    they use regularly.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Selector Modal */}
      <AnimatePresence>
        {showThemeSelector && (
          <motion.div
            className="theme-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="theme-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="theme-header">
                <h2 className="theme-title">Choose a Theme</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowThemeSelector(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="theme-body">
                {themeOptions.map((theme, index) => (
                  <div
                    key={index}
                    className={`theme-option ${
                      currentTheme.name === theme.name ? 'active' : ''
                    }`}
                    onClick={() => changeTheme(theme)}
                    style={{
                      background: `linear-gradient(45deg, ${theme.primary}, ${theme.accent})`,
                    }}
                  >
                    <span>{theme.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clips Preview Modal */}
      <AnimatePresence>
        {showClipsPreview && selectedClip && (
          <motion.div
            className="clips-preview-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="clips-preview-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="clips-preview-header">
                <div className="clips-preview-title-container">
                  <button
                    className="clips-preview-back-btn"
                    onClick={closeClipsPreview}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="clips-preview-title">{selectedClip.name}</h2>
                </div>
                <button className="close-btn" onClick={closeClipsPreview}>
                  <X size={24} />
                </button>
              </div>

              <div className="clips-preview-body">
                <div className="clips-preview-sidebar">
                  <div className="clips-preview-folder-header">
                    <Folder size={18} className="clips-preview-folder-icon" />
                    <span>Files</span>
                  </div>
                  <div className="clips-preview-file-list">
                    {selectedClip.files.map((file: any, index: number) => (
                      <div
                        key={index}
                        className={`clips-preview-file-item ${
                          selectedFile === file ? 'active' : ''
                        }`}
                        onClick={() => handleFileSelect(file)}
                      >
                        <div className="clips-preview-file-name">
                          {file.name}
                        </div>
                        <div className="clips-preview-file-size">
                          {file.size}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="clips-preview-main">
                  {selectedFile ? (
                    <div className="clips-preview-file-details">
                      <div className="clips-preview-thumbnail">
                        {selectedFile.link.includes('drive.google.com') ? (
                          <iframe
                            src={selectedFile.link}
                            width="600px"
                            height="380px"
                            allow=""
                            className="clips-preview-video"
                          />
                        ) : (
                          <>
                            <img
                              src={
                                selectedFile.thumbnail ||
                                'https://i.imgur.com/placeholder.jpg'
                              }
                              alt={selectedFile.name}
                              className="clips-preview-thumbnail-img"
                            />
                            <div className="clips-preview-play-overlay">
                              <Play
                                size={40}
                                className="clips-preview-play-icon"
                              />
                            </div>
                          </>
                        )}
                      </div>

                      <div className="clips-preview-file-info">
                        <h3 className="clips-preview-file-title">
                          {selectedFile.name}
                        </h3>
                        <p className="clips-preview-file-size-detail">
                          Size: {selectedFile.size}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="clips-preview-no-selection">
                      <div className="clips-preview-no-selection-icon">
                        <Eye size={40} />
                      </div>
                      <p>Select a file from the list to preview</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            className="search-container mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Search for editing tools..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="search-icon" size={20} />
          </motion.div>

           <motion.div
            className="flex items-center gap-2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          >
            <Filter size={16} className="text-filter-icon" />
            <span className="text-filter-text text-sm">Advanced Search</span>
            {showAdvancedSearch ? (
              <ChevronUp size={16} className="text-filter-icon" />
            ) : (
              <ChevronDown size={16} className="text-filter-icon" />
            )}
          </motion.div>

          <div
            className={`advanced-search w-full max-w-3xl ${
              showAdvancedSearch ? 'open' : ''
            }`}
          >
            <div className="glass p-4 rounded-lg mt-3">
              <h3 className="text-white text-sm mb-2">Filter by category:</h3>
              <div className="filter-group">
                {mainCategories.map((tag) => (
                  <div
                    key={tag}
                    className={`filter-tag ${
                      selectedTags.includes(tag) ? 'active' : ''
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredTools.map((tool: any) => (
            <motion.div
              key={tool.id}
              className={`glass-card rounded-lg overflow-hidden flex flex-col h-full ${
                tool.isClip ? 'clips-card' : ''
              }`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              whileHover={{ y: -5 }}
              layout
            >
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-bold mb-2 text-white">
                  {tool.name}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.map((tag: string, index: number) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 mt-auto border-t border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-300 flex items-center">
                    <Info size={14} className="mr-1 text-info-icon" />
                    Size: {tool.size}
                  </span>
                </div>

                {tool.isClip ? (
                  <div className="flex gap-2">
                    <button
                      className="preview-btn flex items-center gap-1 flex-1 justify-center"
                      onClick={() => handleClipPreview(tool)}
                    >
                      <Play size={16} />
                      <span>Preview</span>
                    </button>
                    <button
                      className="download-btn flex items-center gap-1 flex-1 justify-center"
                      onClick={() => handleDownload(tool.link)}
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                ) : (
                  <button
                    className="download-btn flex items-center gap-1 w-full justify-center"
                    onClick={() => handleDownload(tool.link)}
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            className="scroll-top-btn"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
          >
            <ArrowUp size={20} color="white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse Menu */}
      <div className="collapse-menu">
        <motion.div
          className="collapse-btn"
          onClick={() => setShowCollapseMenu(!showCollapseMenu)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {showCollapseMenu ? (
            <X size={24} color="white" />
          ) : (
            <ChevronUp size={24} color="white" />
          )}
        </motion.div>

        <AnimatePresence>
          {showCollapseMenu && (
            <motion.div
              className="collapse-menu-items"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ staggerChildren: 0.1, staggerDirection: -1 }}
            >
              <motion.div
                className="collapse-menu-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowThemeSelector(true)}
              >
                <Palette size={20} color="var(--primary)" />
                <span className="tooltip">Change Theme</span>
              </motion.div>

              <motion.div
                className="collapse-menu-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFaq(true)}
              >
                <HelpCircle size={20} color="var(--primary)" />
                <span className="tooltip">FAQ</span>
              </motion.div>

              <motion.div
                className="collapse-menu-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDiscordClick}
              >
                <MessageCircle size={20} color="var(--primary)" />
                <span className="tooltip">Join Discord</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;