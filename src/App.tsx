import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  AlertTriangle,
  Shield,
  Check,
  Play,
  Folder,
  ArrowLeft,
  Eye
} from 'lucide-react';

// Tool data with file sizes
export const toolsData = [
  {
    id: 1,
    name: "Adobe Photoshop 2025",
    tags: ["Software", "Adobe", "Photoshop"],
    size: "4.76 GB",
    downloads: 0,
    link: "https://link-center.net/1302991/photoshop-2025"
  },
  {
    id: 2,
    name: "Adobe Premiere Pro 2025",
    tags: ["Software", "Adobe", "Premiere Pro"],
    size: "2.08 GB",
    downloads: 0,
    link: "https://link-center.net/1302991/premiere-pro-2025"
  },
  {
    id: 3,
    name: "Adobe After Effect 2025",
    tags: ["Software", "Adobe", "After Effect"],
    size: "3.79 GB",
    downloads: 0,
    link: "https://direct-link.net/1302991/after-effect-2025"
  },
  {
    id: 4,
    name: "Adobe Photoshop 2024",
    tags: ["Software", "Adobe", "Photoshop"],
    size: "4.62 GB",
    downloads: 0,
    link: "https://link-target.net/1302991/photoshop-2024"
  },
  {
    id: 5,
    name: "Adobe Premiere Pro 2024",
    tags: ["Software", "Adobe", "Premiere Pro"],
    size: "2.06 GB",
    downloads: 0,
    link: "https://link-hub.net/1302991/premiere-pro-2024"
  },
  {
    id: 6,
    name: "Adobe After Effect 2024",
    tags: ["Software", "Adobe", "After Effect"],
    size: "3.43 GB",
    downloads: 0,
    link: "https://direct-link.net/1302991/after-effect-2024"
  },
  {
    id: 7,
    name: "Adobe Photoshop 2023",
    tags: ["Software", "Adobe", "Photoshop"],
    size: "4.09 GB",
    downloads: 0,
    link: "https://link-target.net/1302991/photoshop-2023"
  },
  {
    id: 8,
    name: "Adobe Premiere Pro 2023",
    tags: ["Software", "Adobe", "Premiere Pro"],
    size: "1.92 GB",
    downloads: 0,
    link: "https://link-center.net/1302991/premiere-pro-2023"
  },
  {
    id: 9,
    name: "Adobe After Effect 2023",
    tags: ["Software", "Adobe", "After Effect"],
    size: "2.99 GB",
    downloads: 0,
    link: "https://link-center.net/1302991/after-effect-2023"
  },
  {
    id: 10,
    name: "Adobe Photoshop 2022",
    tags: ["Software", "Adobe", "Photoshop"],
    size: "2.82 GB",
    downloads: 0,
    link: "https://link-center.net/1302991/photoshop-2022"
  },
  {
    id: 11,
    name: "Adobe Premiere Pro 2022",
    tags: ["Software", "Adobe", "Premiere Pro"],
    size: "1.71 GB",
    downloads: 0,
    link: "https://link-center.net/1302991/premiere-pro-2022"
  },
  {
    id: 12,
    name: "Adobe After Effect 2022",
    tags: ["Software", "Adobe", "After Effect"],
    size: "2.69 GB",
    downloads: 0,
    link: "https://link-hub.net/1302991/after-effect-2022"
  },
  {
    id: 13,
    name: "Adobe Photoshop 2021",
    tags: ["Software", "Adobe", "Photoshop"],
    size: "2.37 GB",
    downloads: 0,
    link: "https://link-hub.net/1302991/photoshop-2021"
  },
  {
    id: 14,
    name: "Adobe Premiere Pro 2021",
    tags: ["Software", "Adobe", "Premiere Pro"],
    size: "1.51 GB",
    downloads: 0,
    link: "https://link-center.net/1302991/premiere-pro-2021"
  },
  {
    id: 15,
    name: "Adobe After Effect 2021",
    tags: ["Software", "Adobe", "After Effect"],
    size: "1.96 GB",
    downloads: 0,
    link: "https://link-hub.net/1302991/after-effect-2021"
  },
  {
    id: 16,
    name: "Adobe Photoshop 2020",
    tags: ["Software", "Adobe", "Photoshop"],
    size: "1.77 GB",
    downloads: 0,
    link: "https://link-center.net/1302991/photoshop-2020"
  },
  {
    id: 17,
    name: "Adobe Premiere Pro 2020",
    tags: ["Software", "Adobe", "Premiere Pro"],
    size: "1.51 GB",
    downloads: 0,
    link: "https://link-target.net/1302991/premiere-pro-2020"
  },
  {
    id: 18,
    name: "Adobe After Effect 2020",
    tags: ["Software", "Adobe", "After Effect"],
    size: "1.95 GB",
    downloads: 0,
    link: "https://link-target.net/1302991/after-effect-2020"
  },
  {
    id: 19,
    name: "Wondershare Filmora 14",
    tags: ["Software", "Wondershare", "Filmora"],
    size: "829 MB",
    downloads: 0,
    link: "https://direct-link.net/1302991/wondershare-filmora-14"
  },
  {
    id: 20,
    name: "MAGIX Vegas Pro 21",
    tags: ["Software", "Magix", "Vegas Pro"],
    size: "592 MB",
    downloads: 0,
    link: "https://link-center.net/1302991/magix-vegas-pro-21"
  },
  {
    id: 21,
    name: "MAGIX Vegas Pro 22",
    tags: ["Software", "Magix", "Vegas Pro"],
    size: "681 MB",
    downloads: 0,
    link: "https://link-target.net/1302991/magix-vegas-pro-22"
  },
  {
    id: 22,
    name: "The Foundry Nuke Studio 15",
    tags: ["Software", "The Foundry", "Nuke Studio"],
    size: "2.88 GB",
    downloads: 0,
    link: "https://link-target.net/1302991/the-foundry-nuke-studio"
  },
  {
    id: 23,
    name: "Topaz Video AI 2024",
    tags: ["Software", "Topaz", "AI"],
    size: "402 MB",
    downloads: 0,
    link: "https://link-center.net/1302991/topaz-video-ai"
  },
  {
    id: 24,
    name: "Topaz Gigapixel AI 2024",
    tags: ["Software", "Topaz", "AI"],
    size: "360 MB",
    downloads: 0,
    link: "https://link-hub.net/1302991/topaz-gigapixel-ai-2024"
  },
  {
    id: 25,
    name: "Red Giant Complete 2025",
    tags: ["Plugin", "Red Giant", "After Effect"],
    size: "2.8 GB",
    downloads: 0,
    link: "https://direct-link.net/1302991/red-giant-20252"
  },
  {
    id: 26,
    name: "Deep Glow 2",
    tags: ["Plugin", "Deep Glow 2", "After Effect"],
    size: "21.1 MB",
    downloads: 0,
    link: "https://link-center.net/1302991/deep-glow-2"
  },
  {
    id: 27,
    name: "Deep Glow 1",
    tags: ["Plugin", "Deep Glow 1", "After Effect"],
    size: "311 KB",
    download: 0,
    link: "https://link-hub.net/1302991/deep-glow-1"
  },
  {
    id: 28,
    name: "Boris FX Sapphire AE 2024",
    tags: ["Plugin", "Boris FX", "After Effect"],
    size: "318 MB",
    download: 0,
    link: "https://link-center.net/1302991/boris-fx-sapphire-ae-2024"
  },
  {
    id: 29,
    name: "BorisFX Continuum 2025 Adobe",
    tags: ["Plugin", "Boris FX", "After Effect"],
    size: "866 MB",
    download: 0,
    link: "https://link-hub.net/1302991/borisfx-continuum-2025-ae"
  },
  {
    id: 30,
    name: "FredPelle – Matrix",
    tags: ["Plugin", "FredPelle", "After Effect"],
    size: "172 MB",
    download: 0,
    link: "https://link-center.net/1302991/fredpellematrix"
  },
  {
    id: 31,
    name: "FredPelle - MXM Plugin",
    tags: ["Plugin", "FredPelle", "After Effect"],
    size: "1.88 GB",
    download: 0,
    link: "https://link-center.net/1302991/fredpelle-mxm-plugin"
  },
  {
    id: 32,
    name: "Constantine 2005",
    tags: ["Clips", "Constantine"],
    size: "5.2 GB",
    download: 0,
    link: "https://direct-link.net/1302991/constantine-2005", // Download All
    isClip: true,
    files: [
      { name: "Constantine 2005.mp4", 
        size: "5.2 GB",
        link: "https://drive.google.com/file/d/1aqqUsAtz7_x7QOTFyOZZ63oNCTJmaW0J/preview?embedded=true", // Preview Download
        thumbnail: "https://i.imgur.com/LeCaa6J.jpego" }
    ]
  },
  {
    id: 33,
    name: "TypeMonkey",
    tags: ["Scripts", "TypeMonkey", "After Effect"],
    size: "611 KB",
    download: 0,
    link: "https://direct-link.net/1302991/type-monkey"
  },
  {
    id: 34,
    name: "TextEvo 2",
    tags: ["Extension", "TextEvo", "After Effect"],
    size: "394 KB",
    download: 0,
    link: "https://link-hub.net/1302991/text-evo-2"
  },
  {
    id: 35,
    name: "Fast Bokeh Pro v2",
    tags: ["Plugin", "Fast Bokeh", "After Effect"],
    size: "24.2 MB",
    download: 0,
    link: "https://link-hub.net/1302991/fast-bokeh-pro-v2"
  },
  {
    id: 36,
    name: "Flow",
    tags: ["Scripts", "Flow", "After Effect"],
    size: "33.1 MB",
    download: 0,
    link: "https://link-hub.net/1302991/flow"
  },
  {
    id: 37,
    name: "Lockdown",
    tags: ["Plugin", "Lockdown", "After Effect"],
    size: "9.65 MB",
    download: 0,
    link: "https://link-target.net/1302991/lockdown"
  },
  {
    id: 38,
    name: "Optical Flare",
    tags: ["Plugin", "Video Copilot", "After Effect"],
    size: "34.1 MB",
    download: 0,
    link: "https://link-target.net/1302991/optical-flare"
  },
  {
    id: 39,
    name: "Discotext",
    tags: ["Scripts", "Discotext", "After Effect"],
    size: "120 MB",
    download: 0,
    link: "https://link-center.net/1302991/discotext"
  },
  {
    id: 40,
    name: "Plexus",
    tags: ["Plugin", "Plexus", "After Effect"],
    size: "17.5 MB",
    download: 0,
    link: "https://link-hub.net/1302991/plexus"
  },
  {
    id: 41,
    name: "RSMB",
    tags: ["Plugin", "RSMB", "After Effect"],
    size: "19.5 MB",
    download: 0,
    link: "https://link-center.net/1302991/rsmb"
  },
  {
    id: 42,
    name: "SpeedX",
    tags: ["Scripts", "SpeedX", "After Effect"],
    size: "80 MB",
    download: 0,
    link: "https://direct-link.net/1302991/speedx"
  },
  {
    id: 43,
    name: "Ae Pixel Sorter",
    tags: ["Scripts", "Pixel Sorter", "After Effect"],
    size: "5.9 MB",
    download: 0,
    link: "https://link-target.net/1302991/ae-pixel-sorter"
  },
  {
    id: 44,
    name: "Twitch",
    tags: ["Plugin", "Twitch", "After Effect"],
    size: "1.1 MB",
    download: 0,
    link: "https://link-hub.net/1302991/twitch"
  },
  {
    id: 45,
    name: "Twixtor Pro",
    tags: ["Plugin", "Twixtor Pro", "After Effect"],
    size: "31.2 MB",
    download: 0,
    link: "https://link-center.net/1302991/twixtor-pro"
  },
  {
    id: 46,
    name: "Mt. Mograph Motion",
    tags: ["Extension", "Mt. Mograph Motion", "After Effect"],
    size: "3.3 MB",
    download: 0,
    link: ""
  },
  {
    id: 47,
    name: "Mt. Mograph Motion",
    tags: ["Extension", "Mt. Mograph Motion", "After Effect"],
    size: "3.3 MB",
    download: 0,
    link: "https://link-hub.net/1302991/mt-mograph-motion"
  },
  {
    id: 48,
    name: "RTFX 1000+ Eelements V2.2",
    tags: ["Extension", "RTFX 1000+ Eelements", "After Effect"],
    size: "516 MB",
    download: 0,
    link: "https://link-target.net/1302991/rtfx-1000-eelements-v22"
  },
  {
    id: 49,
    name: "labels 3.0",
    tags: ["Extension", "labels", "After Effect"],
    size: "310 KB",
    download: 0,
    link: "https://link-hub.net/1302991/labels"
  },
  {
    id: 50,
    name: "FreqReact v1.5",
    tags: ["Extension", "FreqReact", "After Effect"],
    size: "120 KB",
    download: 0,
    link: "https://link-center.net/1302991/freqreact-v15"
  },
  {
    id: 51,
    name: "Easecopy v1.7.2",
    tags: ["Extension", "Easecopy", "After Effect"],
    size: "215 KB",
    download: 0,
    link: "https://link-hub.net/1302991/easecopy-v172"
  },
  {
    id: 52,
    name: "Motion Bro 2 - Collection",
    tags: ["Extension", "Motion Bro", "After Effect"],
    size: "6.3 GB",
    download: 0,
    link: "https://link-hub.net/1302991/motion-bro-2-collection"
  },
  {
    id: 53,
    name: "BlenderAe",
    tags: ["Extension", "Blenderae", "After Effect"],
    size: "23 MB",
    download: 0,
    link: "https://link-target.net/1302991/blenderae"
  },
  {
    id: 54,
    name: "Create3DShapes",
    tags: ["Extension", "Create3DShapes", "After Effect"],
    size: "4.04 MB",
    download: 0,
    link: "https://direct-link.net/1302991/create3dshapes-v37"
  },
  {
    id: 55,
    name: "CapCut - Windows",
    tags: ["Software", "CapCut", "Windows"],
    size: "650 MB",
    download: 0,
    link: "https://link-center.net/1302991/capcut-windows"
  },
  {
    id: 56,
    name: "CapCut - Android",
    tags: ["Software", "CapCut", "Android"],
    size: "150 MB",
    download: 0,
    link: "https://direct-link.net/1302991/capcut-android"
  },
  {
    id: 57,
    name: "Boris FX Sapphire AE 2025",
    tags: ["Plugin", "Boris FX", "After Effect"],
    size: "309 MB",
    download: 0,
    link: "https://link-target.net/1302991/boris-fx-sapphire-ae-2025"
  },
  {
    id: 58,
    name: "Element 3D",
    tags: ["Plugin", "Element 3D", "After Effect"],
    size: "290 MB",
    download: 0,
    link: "https://direct-link.net/1302991/element-3d"
  },
  {
    id: 59,
    name: "Motion Pulse Black Box",
    tags: ["Plugin", "Video Copilot", "After Effect"],
    size: "3.56 GB",
    download: 0,
    link: "https://link-target.net/1302991/motion-pulse-black-box"
  },
  {
    id: 60,
    name: "Jerry Flow V2",
    tags: ["Extension", "Jerry Flow", "After Effect"],
    size: "34.7 MB",
    download: 0,
    link: "https://direct-link.net/1302991/jerry-flow-v2"
  }
];

// Main category filters
const mainCategories = ["Software", "Plugin", "Extension", "Leaks", "Clips", "Scripts"];

// All unique tags from tools
const allTags = Array.from(new Set(toolsData.flatMap(tool => tool.tags)));

// Discord server link
const DISCORD_SERVER_LINK = "https://discord.gg/ErHZJJ7Tdh";

// Theme options
const themeOptions = [
  { name: "Blue", primary: "#0070f3", accent: "#00c2ff", background: "#0a0a0a", primaryRgb: "0, 112, 243", accentRgb: "0, 194, 255" },
  { name: "Red", primary: "#ff0040", accent: "#ff5e5e", background: "#0a0a0a", primaryRgb: "255, 0, 64", accentRgb: "255, 94, 94" },
  { name: "Green", primary: "#00c853", accent: "#69f0ae", background: "#0a0a0a", primaryRgb: "0, 200, 83", accentRgb: "105, 240, 174" },
  { name: "Purple", primary: "#7c4dff", accent: "#b388ff", background: "#0a0a0a", primaryRgb: "124, 77, 255", accentRgb: "179, 136, 255" },
  { name: "Orange", primary: "#ff6d00", accent: "#ffab40", background: "#0a0a0a", primaryRgb: "255, 109, 0", accentRgb: "255, 171, 64" }
];

// Local storage keys
const THEME_STORAGE_KEY = 'aura-theme-preference';
const DISCLAIMER_STORAGE_KEY = 'aura-disclaimer-accepted';
const ADBLOCK_NOTICE_STORAGE_KEY = 'aura-adblock-notice-dismissed';

function App() {
  // State for UI elements
  const [showWarning, setShowWarning] = useState(() => {
    // Check if user has previously accepted the disclaimer
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
  const [showAdBlocker, setShowAdBlocker] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Get saved theme from localStorage or use default
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
  
  // New state for clips preview modal
  const [showClipsPreview, setShowClipsPreview] = useState(false);
  const [selectedClip, setSelectedClip] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  
  // Refs for custom cursor
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailerRef = useRef<HTMLDivElement>(null);
  const particleBgRef = useRef<HTMLDivElement>(null);
  const adBlockDetectionRef = useRef<HTMLDivElement>(null);

  // Initialize particles with memoization for better performance
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Ad blocker detection
  useEffect(() => {
    // Check if the user has already dismissed the notice
    if (localStorage.getItem(ADBLOCK_NOTICE_STORAGE_KEY) === 'true') {
      return;
    }

    // Create a bait element to detect ad blockers
    const bait = document.createElement('div');
    bait.className = 'ad-placement ad-banner adsbox pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad';
    bait.style.cssText = 'position: absolute; left: -10000px; top: -10000px; width: 1px; height: 1px;';
    bait.textContent = '&nbsp;';
    document.body.appendChild(bait);

    // Check if the ad blocker detection element is hidden or removed
    setTimeout(() => {
      const isAdBlockerActive = 
        bait.offsetHeight === 0 || 
        bait.offsetWidth === 0 || 
        bait.clientHeight === 0 || 
        bait.clientWidth === 0 || 
        window.getComputedStyle(bait).display === 'none' ||
        window.getComputedStyle(bait).visibility === 'hidden';

      // Also check if Linkvertise script is blocked
      const isLinkvertiseBlocked = typeof window.linkvertise !== 'function';

      if (isAdBlockerActive || isLinkvertiseBlocked) {
        setShowAdBlocker(true);
      }

      // Clean up
      document.body.removeChild(bait);
    }, 100);
  }, []);

  // Handle ad blocker notice dismissal
  const dismissAdBlockerNotice = (dontShowAgain = false) => {
    setShowAdBlocker(false);
    if (dontShowAgain) {
      localStorage.setItem(ADBLOCK_NOTICE_STORAGE_KEY, 'true');
    }
  };

  // Memoize particle options for better performance
  const particleOptions = useMemo(() => {
    return {
      fullScreen: {
        enable: true,
        zIndex: -1
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: 50, // Reduced from 80 for better performance
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: [currentTheme.primary, currentTheme.accent]
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 0.5, // Reduced for better performance
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 1, // Reduced for better performance
            size_min: 0.3,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: currentTheme.primary,
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.8, // Reduced for better performance
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          },
          push: {
            particles_nb: 2 // Reduced from 4 for better performance
          }
        }
      },
      retina_detect: true,
      background: {
        color: "transparent",
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover"
      }
    };
  }, [currentTheme.primary, currentTheme.accent]);

  // Handle warning acceptance
  const handleAcceptWarning = () => {
    setShowWarning(false);
    setLoading(true);
    
    // Save preference if "Don't show again" is checked
    if (dontShowAgain) {
      localStorage.setItem(DISCLAIMER_STORAGE_KEY, 'true');
    }
    
    // Simulate loading
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2; // Faster loading (increment by 2 instead of 1)
      setLoadingPercentage(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 300); // Reduced from 500ms
      }
    }, 15); // Reduced from 20ms
  };

  // Apply theme to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', currentTheme.primary);
    document.documentElement.style.setProperty('--accent', currentTheme.accent);
    document.documentElement.style.setProperty('--background', currentTheme.background);
    document.documentElement.style.setProperty('--primary-rgb', currentTheme.primaryRgb);
    document.documentElement.style.setProperty('--accent-rgb', currentTheme.accentRgb);
    
    // Derived colors
    const primaryDark = adjustColor(currentTheme.primary, -20);
    document.documentElement.style.setProperty('--primary-dark', primaryDark);
    
    // Save theme preference to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(currentTheme));
  }, [currentTheme]);

  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => {
      const value = Math.min(255, Math.max(0, parseInt(color, 16) + amount));
      return value.toString(16).padStart(2, '0');
    });
  };

  // Create star particles for enhanced background
  useEffect(() => {
    if (!particleBgRef.current) return;
    
    // Clear existing stars
    particleBgRef.current.innerHTML = '';
    
    // Create new stars based on current theme
    const createStars = () => {
      const starsCount = 100;
      const container = particleBgRef.current;
      if (!container) return;
      
      for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('particle-star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 3 + 1;
        
        // Random animation properties
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.7 + 0.3;
        
        // Apply styles
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--delay', `${delay}s`);
        star.style.setProperty('--opacity', `${opacity}`);
        
        // Set color based on theme (randomly choose primary or accent)
        if (Math.random() > 0.5) {
          star.style.background = currentTheme.primary;
        } else {
          star.style.background = currentTheme.accent;
        }
        
        container.appendChild(star);
      }
      
      // Add floating orbs for enhanced effect
      for (let i = 0; i < 5; i++) {
        const orb = document.createElement('div');
        orb.classList.add('floating-orb');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 200 + 100;
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        // Apply styles
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

    // Disable right-click
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

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable background interaction when disclaimer is shown
  useEffect(() => {
    if (showWarning || showAdBlocker || showClipsPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showWarning, showAdBlocker, showClipsPreview]);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 25; // Smoother scrolling
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
    return toolsData.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                          selectedTags.some(tag => tool.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedTags]);

  // Toggle tag selection
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
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
  const changeTheme = useCallback((theme: typeof themeOptions[0]) => {
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
      
      {/* Ad Blocker Detection Alert */}
      <AnimatePresence>
        {showAdBlocker && (
          <motion.div 
            className="adblock-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="adblock-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="adblock-header">
                <motion.div 
                  className="adblock-icon-container"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 10 }}
                >
                  <AlertTriangle size={32} className="adblock-icon" />
                </motion.div>
                <motion.h2 
                  className="adblock-title"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Ad Blocker Detected
                </motion.h2>
              </div>
              
              <motion.div 
                className="adblock-body"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="adblock-message">
                  We've detected that you're using an ad blocker or tracker blocker. Our site relies on ads to keep our content free. Please disable your ad blocker to continue using our site.
                </p>
                
                <div className="adblock-steps">
                  <h3>How to disable your ad blocker:</h3>
                  <ol>
                    <li>Click on the ad blocker icon in your browser's toolbar</li>
                     <li>Select "Pause on this site" or "Disable for this website"</li>
                    <li>Refresh the page to continue</li>
                  </ol>
                </div>
                
                <div className="adblock-checkbox-container">
                  <label className="adblock-checkbox-label">
                    <input 
                      type="checkbox" 
                      onChange={(e) => setDontShowAgain(e.target.checked)}
                      className="adblock-checkbox"
                    />
                    <span className="adblock-checkbox-custom">
                      {dontShowAgain && <Check size={12} />}
                    </span>
                    <span>Don't show this message again</span>
                  </label>
                </div>
              </motion.div>
              
              <motion.div 
                className="adblock-footer"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button 
                  className="adblock-btn adblock-btn-secondary"
                  onClick={() => dismissAdBlockerNotice(dontShowAgain)}
                >
                  Continue Anyway
                </button>
                <button 
                  className="adblock-btn adblock-btn-primary"
                  onClick={() => {
                    dismissAdBlockerNotice(dontShowAgain);
                    window.location.reload();
                  }}
                >
                  I've Disabled My Ad Blocker
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
              transition={{ type: "spring", damping: 15 }}
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
                  transition={{ delay: 0.2, type: "spring", damping: 12 }}
                >
                  <Shield size={40} className="disclaimer-main-icon" />
                </motion.div>
                
                <motion.p 
                  className="disclaimer-message"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Everything on this website is safe to download and use. However, we recommend using an anti-virus program for your own protection and peace of mind.
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
              <p className="loading-subtitle">Preparing your digital workspace...</p>
              <div className="loading-bar-container">
                <motion.div 
                  className="loading-bar"
                  initial={{ width: "0%" }}
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
              transition={{ type: "spring", damping: 15 }}
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
                  <p>EditTools is a platform that provides access to various editing software for educational purposes. We aim to help users explore different tools before making a purchase decision.</p>
                </div>
                
                <div className="faq-item">
                  <h3>Are these downloads safe?</h3>
                  <p>While we try to ensure the safety of all downloads, we cannot guarantee that all files are 100% safe. We recommend using a reliable antivirus program when downloading and installing any software.</p>
                </div>
                
                <div className="faq-item">
                  <h3>What if a download requires a password?</h3>
                  <p>If any zip file requires a password, the password is always "aura" (without quotes). This is the standard password for all protected archives on our site.</p>
                </div>
                
                <div className="faq-item">
                  <h3>Why do some downloads redirect to external sites?</h3>
                  <p>Some downloads are hosted on external platforms to ensure availability. You may need to navigate through ad pages or link shorteners to access the actual download.</p>
                </div>
                
                <div className="faq-item">
                  <h3>How do I report a broken link?</h3>
                  <p>You can report broken links by joining our Discord community and posting in the #broken-links channel.</p>
                </div>
                
                <div className="faq-item">
                  <h3>How often is the site updated?</h3>
                  <p>We update our collection regularly with the latest versions of software. Check back frequently for new additions.</p>
                </div>
                
                <div className="faq-item">
                  <h3>Is using this software legal?</h3>
                  <p>Using pirated software may violate copyright laws in your country. This site is for educational purposes only, and we encourage users to purchase legitimate licenses for software they use regularly.</p>
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
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="theme-header">
                <h2 className="theme-title">Choose a Theme</h2>
                <button className="close-btn" onClick={() => setShowThemeSelector(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="theme-body">
                {themeOptions.map((theme, index) => (
                  <div 
                    key={index} 
                    className={`theme-option ${currentTheme.name === theme.name ? 'active' : ''}`}
                    onClick={() => changeTheme(theme)}
                    style={{
                      background: `linear-gradient(45deg, ${theme.primary}, ${theme.accent})`
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
              transition={{ type: "spring", damping: 15 }}
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
                        className={`clips-preview-file-item ${selectedFile === file ? 'active' : ''}`}
                        onClick={() => handleFileSelect(file)}
                      >
                        <div className="clips-preview-file-name">{file.name}</div>
                        <div className="clips-preview-file-size">{file.size}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="clips-preview-main">
                  {selectedFile ? (
                    <div className="clips-preview-file-details">
                      <div className="clips-preview-thumbnail">
  {selectedFile.link.includes("drive.google.com") ? (
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
        src={selectedFile.thumbnail || 'https://i.imgur.com/placeholder.jpg'} 
        alt={selectedFile.name}
        className="clips-preview-thumbnail-img"
      />
      <div className="clips-preview-play-overlay">
        <Play size={40} className="clips-preview-play-icon" />
      </div>
    </>
  )}
</div>

                      
                      <div className="clips-preview-file-info">
                        <h3 className="clips-preview-file-title">{selectedFile.name}</h3>
                        <p className="clips-preview-file-size-detail">Size: {selectedFile.size}</p>
                        
                        
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
          
          <div className={`advanced-search w-full max-w-3xl ${showAdvancedSearch ? 'open' : ''}`}>
            <div className="glass p-4 rounded-lg mt-3">
              <h3 className="text-white text-sm mb-2">Filter by category:</h3>
              <div className="filter-group">
                {mainCategories.map((tag) => (
                  <div
                    key={tag}
                    className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
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
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              className={`glass-card rounded-lg overflow-hidden flex flex-col h-full ${tool.isClip ? 'clips-card' : ''}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 12 }}
              whileHover={{ y: -5 }}
              layout
            >
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-bold mb-2 text-white">{tool.name}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.map((tag: string, index: number) => (
                    <span key={index} className="tag">{tag}</span>
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
                      <span>Download All</span>
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
          {showCollapseMenu ? <X size={24} color="white" /> : <ChevronUp size={24} color="white" />}
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