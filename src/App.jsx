import React, { useState, useEffect, useRef } from 'react';
import SunCalc from 'suncalc';
import { 
  Sparkles, 
  Rocket, 
  Utensils, 
  Pizza, 
  Moon, 
  MapPin, 
  Flame, 
  Bath, 
  BookOpen, 
  Bed, 
  Clock, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Lock, 
  Plus, 
  Trash2, 
  Shield, 
  Calendar, 
  Users, 
  Eye, 
  HelpCircle,
  LogOut,
  ChevronRight,
  Smile,
  Compass,
  Gift
} from 'lucide-react';
import { 
  playLegoPop, 
  playSlideWhistle, 
  playCenteringZip, 
  playUnlockChime, 
  playErrorBuzz,
  playTick
} from './utils/audio';

// Map icon names to Lucide React components
const IconMap = {
  Sparkles,
  Rocket,
  Utensils,
  Pizza,
  Moon,
  MapPin,
  Flame,
  Bath,
  BookOpen,
  Bed,
  Clock,
  HelpCircle
};

// Initial default tasks for the day with activityType and frequency
const DEFAULT_TASKS = [
  { id: '1', title: 'Bricks & Waffles Breakfast', icon: 'Utensils', startTime: 8.0, duration: 0.75, color: 'yellow', status: 'pending', activityType: 'mandatory', frequency: 'daily' },
  { id: '2', title: 'Brush Dinosaur Teeth', icon: 'Sparkles', startTime: 9.0, duration: 0.5, color: 'green', status: 'pending', activityType: 'mandatory', frequency: 'daily' },
  { id: '3', title: 'Lego Spaceship Build', icon: 'Rocket', startTime: 10.0, duration: 1.5, color: 'blue', status: 'pending', activityType: 'surprise', frequency: 'one-off' },
  { id: '4', title: 'Lego Pizza Lunch', icon: 'Pizza', startTime: 12.5, duration: 0.75, color: 'red', status: 'pending', activityType: 'mandatory', frequency: 'daily' },
  { id: '5', title: 'Time Patrol Nap Time', icon: 'Moon', startTime: 13.5, duration: 1.5, color: 'purple', status: 'pending', activityType: 'optional', frequency: 'daily' },
  { id: '6', title: 'Outdoor Playground Mission', icon: 'MapPin', startTime: 15.5, duration: 1.5, color: 'orange', status: 'pending', activityType: 'optional', frequency: 'weekly' },
  { id: '7', title: 'Family Fuel Dinner', icon: 'Flame', startTime: 18.0, duration: 1.0, color: 'yellow', status: 'pending', activityType: 'mandatory', frequency: 'daily' },
  { id: '8', title: 'Bath Time Splash', icon: 'Bath', startTime: 19.5, duration: 0.5, color: 'blue', status: 'pending', activityType: 'optional', frequency: 'daily' },
  { id: '9', title: 'Story Time Adventure', icon: 'BookOpen', startTime: 20.0, duration: 0.5, color: 'purple', status: 'pending', activityType: 'surprise', frequency: 'daily' },
  { id: '10', title: 'Dreams of Lego Land', icon: 'Bed', startTime: 20.5, duration: 8.0, color: 'purple', status: 'pending', activityType: 'mandatory', frequency: 'daily' }
];

// Initial profiles
const DEFAULT_PROFILES = [
  { id: 'liam', name: 'Lego Liam 🚀', age: 4, role: 'child' },
  { id: 'emma', name: 'Space Emma 🛰️', age: 6, role: 'child' }
];

// Comic Style Celestial & Backdrop components
function ComicSun({ style }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      width="80" 
      height="80" 
      style={style}
      className="sky-celestial sun-comic"
      data-component="ComicSun"
    >
      {/* Rays */}
      <g stroke="var(--lego-black)" strokeWidth="3" fill="#ffea70">
        <line x1="50" y1="10" x2="50" y2="2" strokeLinecap="round" />
        <line x1="50" y1="90" x2="50" y2="98" strokeLinecap="round" />
        <line x1="10" y1="50" x2="2" y2="50" strokeLinecap="round" />
        <line x1="90" y1="50" x2="98" y2="50" strokeLinecap="round" />
        <line x1="22" y1="22" x2="16" y2="16" strokeLinecap="round" />
        <line x1="78" y1="78" x2="84" y2="84" strokeLinecap="round" />
        <line x1="22" y1="78" x2="16" y2="84" strokeLinecap="round" />
        <line x1="78" y1="22" x2="84" y2="16" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="50" r="32" fill="#ffd32a" stroke="var(--lego-black)" strokeWidth="3.5" />
      <circle cx="42" cy="42" r="26" fill="#ffea70" />
    </svg>
  );
}

function ComicMoon({ phase, style }) {
  const maskId = "moon-phase-mask-comic";
  const getMoonMaskPath = (p) => {
    const R = 36;
    const cx = 50;
    const cy = 50;
    
    if (p <= 0.03 || p >= 0.97) return "";
    if (p >= 0.47 && p <= 0.53) {
      return `M ${cx} ${cy - R} A ${R} ${R} 0 1 1 ${cx} ${cy + R} A ${R} ${R} 0 1 1 ${cx} ${cy - R}`;
    }

    const isWaxing = p < 0.5;
    let k = isWaxing ? (p * 4 - 1) : ((1 - p) * 4 - 1);
    
    const rx = Math.abs(k) * R;
    const sweep1 = isWaxing ? 1 : 0;
    const sweep2 = (k < 0) ? (isWaxing ? 0 : 1) : (isWaxing ? 1 : 0);
    
    const startY = cy - R;
    const endY = cy + R;
    
    return `
      M ${cx} ${startY}
      A ${R} ${R} 0 0 ${sweep1} ${cx} ${endY}
      A ${rx} ${R} 0 0 ${sweep2} ${cx} ${startY}
      Z
    `;
  };

  const maskPath = getMoonMaskPath(phase);

  return (
    <svg 
      viewBox="0 0 100 100" 
      width="80" 
      height="80" 
      style={style}
      className="sky-celestial moon-comic"
      data-component="ComicMoon"
    >
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="100" height="100" fill="black" />
          {maskPath && <path d={maskPath} fill="white" />}
        </mask>
      </defs>

      {/* Dark side / Unlit side of moon */}
      <circle cx="50" cy="50" r="36" fill="#3c40c6" stroke="var(--lego-black)" strokeWidth="3.5" opacity="0.3" />

      {/* Lit side of moon, masked */}
      <g mask={`url(#${maskId})`}>
        <circle cx="50" cy="50" r="36" fill="#f7f1e3" stroke="var(--lego-black)" strokeWidth="3.5" />
        <circle cx="36" cy="40" r="5" fill="#d1ccc0" opacity="0.5" />
        <circle cx="60" cy="36" r="8" fill="#d1ccc0" opacity="0.5" />
        <circle cx="48" cy="68" r="6" fill="#d1ccc0" opacity="0.5" />
        <circle cx="68" cy="60" r="4" fill="#d1ccc0" opacity="0.5" />
      </g>
    </svg>
  );
}

function ComicCloud({ style }) {
  return (
    <svg 
      viewBox="0 0 120 70" 
      width="120" 
      height="70" 
      style={style}
      className="comic-cloud-svg"
      data-component="ComicCloud"
    >
      <path 
        d="M 25 50 
           A 20 20 0 0 1 35 15 
           A 25 25 0 0 1 80 15 
           A 20 20 0 0 1 95 50 
           Z" 
        fill="var(--lego-white)" 
        stroke="var(--lego-black)" 
        strokeWidth="3.5" 
        strokeLinejoin="round"
      />
      <rect x="25" y="32" width="70" height="18" fill="var(--lego-white)" />
      <line x1="25" y1="50" x2="95" y2="50" stroke="var(--lego-black)" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function ComicBackdrop() {
  return (
    <div className="comic-backdrop-container" data-component="ComicLandscapeBackdrop">
      {/* Left Buildings: Soft Pastel City Skyline */}
      <svg className="comic-backdrop-svg left" width="300" height="120" viewBox="0 0 300 120">
        {/* Building 1 (Pastel Pink) */}
        <rect x="15" y="40" width="50" height="80" fill="#ffb8b8" stroke="var(--lego-black)" strokeWidth="3.5" rx="4" />
        <rect x="30" y="55" width="8" height="12" fill="#fff9db" stroke="var(--lego-black)" strokeWidth="2.5" rx="2" />
        <rect x="42" y="55" width="8" height="12" fill="#fff9db" stroke="var(--lego-black)" strokeWidth="2.5" rx="2" />
        <rect x="30" y="75" width="8" height="12" fill="#fff9db" stroke="var(--lego-black)" strokeWidth="2.5" rx="2" />
        <rect x="42" y="75" width="8" height="12" fill="#fff9db" stroke="var(--lego-black)" strokeWidth="2.5" rx="2" />
        
        {/* Building 2 (Pastel Blue) */}
        <rect x="75" y="15" width="60" height="105" fill="#c7ecee" stroke="var(--lego-black)" strokeWidth="3.5" rx="4" />
        <rect x="90" y="30" width="10" height="15" fill="#fff9db" stroke="var(--lego-black)" strokeWidth="2.5" rx="2" />
        <rect x="110" y="30" width="10" height="15" fill="#fff9db" stroke="var(--lego-black)" strokeWidth="2.5" rx="2" />
        <rect x="90" y="55" width="10" height="15" fill="#fff9db" stroke="var(--lego-black)" strokeWidth="2.5" rx="2" />
        <rect x="110" y="55" width="10" height="15" fill="#fff9db" stroke="var(--lego-black)" strokeWidth="2.5" rx="2" />
        <rect x="90" y="80" width="10" height="15" fill="#fff9db" stroke="var(--lego-black)" strokeWidth="2.5" rx="2" />
        <rect x="110" y="80" width="10" height="15" fill="#fff9db" stroke="var(--lego-black)" strokeWidth="2.5" rx="2" />

        {/* Building 3 (Pastel Purple/Yellow) */}
        <rect x="145" y="60" width="40" height="60" fill="#e0dbff" stroke="var(--lego-black)" strokeWidth="3.5" rx="4" />
        <rect x="157" y="72" width="16" height="20" fill="#fff9db" stroke="var(--lego-black)" strokeWidth="2.5" rx="2" />
      </svg>

      {/* Right Landscape: Soft Pastel Mountain and Sea */}
      <svg className="comic-backdrop-svg right" width="400" height="120" viewBox="0 0 400 120">
        {/* Mountain peak */}
        <polygon 
          points="150,120 280,30 380,120" 
          fill="#81ecec" 
          stroke="var(--lego-black)" 
          strokeWidth="3.5" 
          strokeLinejoin="round" 
        />
        {/* Snow Peak Cap */}
        <polygon 
          points="260,44 280,30 300,44 290,52 280,46 270,52" 
          fill="#ffffff" 
          stroke="var(--lego-black)" 
          strokeWidth="3.5" 
          strokeLinejoin="round" 
        />

        {/* Smaller Mountain (Pastel Green) */}
        <polygon 
          points="60,120 160,50 260,120" 
          fill="#b2bec3" 
          stroke="var(--lego-black)" 
          strokeWidth="3.5" 
          strokeLinejoin="round" 
        />

        {/* Sea Waves (Pastel Blue) at bottom right */}
        <path 
          d="M 0,110 
             Q 20,105 40,110 
             Q 60,115 80,110 
             Q 100,105 120,110 
             Q 140,115 160,110 
             Q 180,105 200,110 
             L 200,120 L 0,120 Z" 
          fill="#74b9ff" 
          stroke="var(--lego-black)" 
          strokeWidth="3.5" 
        />
        <path 
          d="M 180,112 
             Q 200,107 220,112 
             Q 240,117 260,112 
             Q 280,107 300,112 
             Q 320,117 340,112 
             Q 360,107 380,112 
             L 380,120 L 180,120 Z" 
          fill="#0984e3" 
          stroke="var(--lego-black)" 
          strokeWidth="3.5" 
        />
      </svg>
    </div>
  );
}

const getComponentDescription = (name) => {
  switch (name) {
    case 'TopHeader': return 'The main top bar containing page navigation and active profiles.';
    case 'LogoContainer': return 'Lego Time Patrol logo mark.';
    case 'ProfileSelector': return 'Buttons to switch between Child and Parent modes.';
    case 'NavigationControls': return 'Controls to zoom the timeline or snap the camera back to NOW.';
    case 'SkyBackdropContainer': return 'Thematic background showing day/night sky cycles.';
    case 'LegoDateTimeWidget': return 'Displays the current real-world time and date.';
    case 'ComicSun': return 'Active daytime indicator that moves across the sky arc.';
    case 'ComicMoon': return 'Active night indicator changing phases depending on time.';
    case 'ComicCloud': return 'Decorational sky clouds floating in the atmosphere.';
    case 'ComicLandscapeBackdrop': return 'Scenic mountain skyline behind the timeline.';
    case 'TimelineViewport': return 'Scrollable baseplate track where routine bricks are aligned.';
    case 'TaskBrick': return 'Interactive routine activity block. Double-tap to complete.';
    case 'LegoCadetMarker': return 'Your Lego Cadet mascot representing the current time.';
    case 'MoodJoystickBoard': return 'The dashboard panel containing the emotion joystick.';
    case 'MoodJoystickTrackpad': return 'The boundary trackpad for adjusting emotion coordinates.';
    case 'MoodJoystickHandle': return 'Interactive yellow Lego head cursor adjusting mood and energy.';
    default: return 'Lego Time Patrol interface element.';
  }
};

const getDayOfYear = (date = new Date()) => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Amsterdam',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    const parts = formatter.formatToParts(date);
    const map = {};
    parts.forEach(p => { map[p.type] = p.value; });
    
    const year = parseInt(map.year, 10);
    const month = parseInt(map.month, 10) - 1;
    const day = parseInt(map.day, 10);
    
    const start = new Date(year, 0, 1);
    const current = new Date(year, month, day);
    const diff = current - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay) + 1;
  } catch (e) {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay) + 1;
  }
};

const getAmsterdamDecimalHour = (date) => {
  if (!date || isNaN(date.getTime())) return null;
  try {
    const amsterdamTimeStr = date.toLocaleTimeString('en-US', {
      timeZone: 'Europe/Amsterdam',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    const matches = amsterdamTimeStr.match(/\d+/g);
    if (matches && matches.length >= 3) {
      const h = parseInt(matches[0], 10);
      const m = parseInt(matches[1], 10);
      const s = parseInt(matches[2], 10);
      return (h % 24) + m / 60 + s / 3600;
    }
  } catch (e) {
    console.warn("Amsterdam timezone conversion failed for date", date, e);
  }
  return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
};

const getSunriseSunset = (doy) => {
  // Amsterdam coordinates: latitude 52.3676, longitude 4.9041
  let dateObj = doy;
  if (typeof doy === 'number') {
    const year = new Date().getFullYear();
    dateObj = new Date(year, 0, doy);
  } else if (!(doy instanceof Date)) {
    dateObj = new Date();
  }
  const times = SunCalc.getTimes(dateObj, 52.3676, 4.9041);
  const sunrise = getAmsterdamDecimalHour(times.sunrise) ?? 6.0;
  const sunset = getAmsterdamDecimalHour(times.sunset) ?? 18.0;
  return { sunrise, sunset };
};

const getMoonTimes = (date = new Date()) => {
  // Amsterdam coordinates: latitude 52.3676, longitude 4.9041
  const times = SunCalc.getMoonTimes(date, 52.3676, 4.9041);
  const rise = times.rise ? getAmsterdamDecimalHour(times.rise) : null;
  const set = times.set ? getAmsterdamDecimalHour(times.set) : null;
  return { 
    rise, 
    set,
    alwaysUp: times.alwaysUp || false,
    alwaysDown: times.alwaysDown || false
  };
};

const isMoonCurrentlyVisible = (hour, rise, set, alwaysUp = false, alwaysDown = false) => {
  if (alwaysUp) return true;
  if (alwaysDown) return false;
  if (rise === null || set === null) {
    return false;
  }
  if (rise < set) {
    return hour >= rise && hour < set;
  } else {
    return hour >= rise || hour < set;
  }
};

function App() {
  const getDateKey = (date) => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Amsterdam',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).formatToParts(date);
      const map = {};
      parts.forEach(p => { map[p.type] = p.value; });
      return `${map.year}-${map.month}-${map.day}`;
    } catch (e) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
  };

  const [routineTemplates, setRoutineTemplates] = useState(() => {
    try {
      const saved = localStorage.getItem('lego_routine_templates');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return DEFAULT_TASKS.map(t => ({ ...t, frequency: t.frequency === 'one-off' ? 'daily' : t.frequency }));
  });

  const [dailyTasksMap, setDailyTasksMap] = useState(() => {
    try {
      const saved = localStorage.getItem('lego_daily_tasks_map');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [currentDate, setCurrentDate] = useState(() => new Date());
  const currentDateRef = useRef(currentDate);
  useEffect(() => {
    currentDateRef.current = currentDate;
  }, [currentDate]);

  const [seriesModal, setSeriesModal] = useState(null);

  // --- Persistent State ---
  const [tasks, setTasks] = useState(() => {
    const todayKey = getDateKey(new Date());
    try {
      const savedMap = localStorage.getItem('lego_daily_tasks_map');
      if (savedMap) {
        const parsed = JSON.parse(savedMap);
        if (parsed[todayKey]) return parsed[todayKey];
      }
    } catch (e) {}

    let templates = DEFAULT_TASKS.map(t => ({ ...t, frequency: t.frequency === 'one-off' ? 'daily' : t.frequency }));
    try {
      const savedTemplates = localStorage.getItem('lego_routine_templates');
      if (savedTemplates) {
        templates = JSON.parse(savedTemplates);
      }
    } catch (e) {}
    return templates.map(t => ({ ...t, status: 'pending' }));
  });

  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [profiles, setProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem('lego_profiles');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILES;
    } catch (e) {
      console.warn("Failed parsing profiles, loading defaults:", e);
      return DEFAULT_PROFILES;
    }
  });

  const [activeProfile, setActiveProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('lego_active_profile');
      if (saved) {
        // Handle double-quoted JSON strings or raw strings
        if (saved.startsWith('"') && saved.endsWith('"')) {
          return JSON.parse(saved);
        }
        return saved;
      }
      return 'liam';
    } catch (e) {
      return 'liam';
    }
  });

  const [logs, setLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('lego_logs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  // --- Kid's Mood 2D Joystick State ---
  // moodX represents emotion index: 0 = Sad, 20 = Afraid, 40 = Angry, 60 = Calm, 80 = Happy, 100 = Naughty
  const [moodX, setMoodX] = useState(80); // Default Happy
  const [moodY, setMoodY] = useState(8); // Default High Energy (8/10)

  // Revealed Surprise Task IDs
  const [revealedSurpriseIds, setRevealedSurpriseIds] = useState([]);

  // --- App View States ---
  const [activePage, setActivePage] = useState('timeline');

  const getSystemHour = () => {
    try {
      const amsterdamTimeStr = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Europe/Amsterdam',
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });
      const matches = amsterdamTimeStr.match(/\d+/g);
      if (matches && matches.length >= 3) {
        const h = parseInt(matches[0], 10);
        const m = parseInt(matches[1], 10);
        const s = parseInt(matches[2], 10);
        return (h % 24) + m / 60 + s / 3600;
      }
    } catch (e) {
      console.warn("Timezone calculation failed, falling back to local time", e);
    }
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  };

  const [timelineCenterHour, setTimelineCenterHour] = useState(getSystemHour());
  const [zoomLevel, setZoomLevel] = useState(2.0); // Visible hours window
  const [systemHour, setSystemHour] = useState(getSystemHour());

  // Interactivity / Gestures
  const [particles, setParticles] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null); // { id, startY, currentY }
  const [ambientItems, setAmbientItems] = useState([]); // floats mood particles in background
  const [cadetAction, setCadetAction] = useState(null); // 'shake' | 'cheer' | null
  const [hoveredComponent, setHoveredComponent] = useState(null); // { name, x, y }
  const hoverTimerRef = useRef(null);

  // Modals & PIN
  const [parentPanelOpen, setParentPanelOpen] = useState(false);
  const [pinLockOpen, setPinLockOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [parentModeActive, setParentModeActive] = useState(false);
  
  // Parent Admin Tab
  const [parentTab, setParentTab] = useState('tasks');

  // Forms State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskIcon, setNewTaskIcon] = useState('Sparkles');
  const [newTaskStart, setNewTaskStart] = useState('09:00');
  const [newTaskDuration, setNewTaskDuration] = useState('1.0');
  const [newTaskColor, setNewTaskColor] = useState('yellow');
  const [newTaskType, setNewTaskType] = useState('mandatory'); // mandatory, optional, surprise
  const [newTaskFreq, setNewTaskFreq] = useState('daily'); // daily, weekly, one-off
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileAge, setNewProfileAge] = useState('4');

  // Tap-detection
  const lastTapRef = useRef({});

  // Viewport tracking
  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(800);

  // Timeline dragging
  const dragStartRef = useRef(null); // { x, y, centerHour, hasMoved }
  const [isWalking, setIsWalking] = useState(false);
  const longPressTimeoutRef = useRef(null);
  const lastTickTimeRef = useRef(0);
  const lastTickRef = useRef(Math.floor(timelineCenterHour * 4));
  const momentumFrameRef = useRef(null);
  const longPressStartPosRef = useRef(null);
  const joystickRef = useRef(null);
  const isDraggingJoystick = useRef(false);
  const initialTasksRef = useRef([]);
  const lastBuzzTimeRef = useRef(0);


  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('lego_tasks', JSON.stringify(tasks));
    const key = getDateKey(currentDateRef.current);
    setDailyTasksMap(prev => {
      if (JSON.stringify(prev[key]) === JSON.stringify(tasks)) {
        return prev;
      }
      return {
        ...prev,
        [key]: tasks
      };
    });
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('lego_daily_tasks_map', JSON.stringify(dailyTasksMap));
  }, [dailyTasksMap]);

  useEffect(() => {
    localStorage.setItem('lego_routine_templates', JSON.stringify(routineTemplates));
  }, [routineTemplates]);


  // Ensure dummy task if tasks is empty
  useEffect(() => {
    if (tasks.length === 0) {
      setTasks([
        {
          id: 'dummy-placeholder',
          title: 'Routine Baseplate Setup 🧱',
          icon: 'Sparkles',
          startTime: 9.0,
          duration: 1.0,
          color: 'yellow',
          status: 'pending',
          activityType: 'mandatory',
          frequency: 'daily'
        }
      ]);
    }
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('lego_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('lego_active_profile', activeProfile);
  }, [activeProfile]);

  useEffect(() => {
    localStorage.setItem('lego_logs', JSON.stringify(logs));
  }, [logs]);

  // Update current time tick
  useEffect(() => {
    const timer = setInterval(() => {
      const current = getSystemHour();
      setSystemHour(current);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update viewport width
  useEffect(() => {
    if (!viewportRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setViewportWidth(entry.contentRect.width);
      }
    });
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  // --- Component Inspector Hover Event Listener ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const element = e.target.closest('[data-component]');
      
      // Always clear timer on mouse move to ensure we only trigger when mouse stays STILL
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      
      if (element) {
        const componentName = element.getAttribute('data-component');
        
        // Hide the current popup while moving to prevent lag/jitter
        setHoveredComponent(null);

        hoverTimerRef.current = setTimeout(() => {
          setHoveredComponent({
            name: componentName,
            x: e.clientX,
            y: e.clientY
          });
        }, 800); // 800ms still-time
      } else {
        setHoveredComponent(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  // Generate background ambient particles on mood changes
  useEffect(() => {
    const interval = setInterval(() => {
      spawnMoodAmbientItem();
    }, moodY > 60 ? 300 : moodY > 30 ? 800 : 2500); // Higher frequency for higher energy

    return () => clearInterval(interval);
  }, [moodX, moodY]);

  // Helper: log events
  const addLog = (taskTitle, action, details = '') => {
    const active = profiles.find(p => p.id === activeProfile);
    const logName = parentModeActive ? 'Parent' : (active ? active.name : 'Unknown');
    const role = parentModeActive ? 'parent' : 'child';
    const newEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/Amsterdam', hour12: false }) + ' ' + new Date().toLocaleDateString('en-US', { timeZone: 'Europe/Amsterdam' }),
      user: logName,
      role: role,
      taskTitle: taskTitle,
      action: action,
      details: details
    };
    setLogs(prev => [newEntry, ...prev]);
  };

  // --- Sound and Visual Effects ---
  const spawnExplosionParticles = (x, y, color) => {
    const startX = x || window.innerWidth / 2;
    const startY = y || window.innerHeight / 2;
    
    const colorMap = {
      red: 'var(--lego-red)',
      blue: 'var(--lego-blue)',
      yellow: 'var(--lego-yellow)',
      green: 'var(--lego-green)',
      orange: 'var(--lego-orange)',
      purple: 'var(--lego-purple)'
    };
    const realColor = colorMap[color] || color || 'var(--lego-yellow)';

    const newParticles = Array.from({ length: 16 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 140;
      return {
        id: Math.random().toString(36).substring(2, 9),
        x: startX,
        y: startY,
        color: realColor,
        isRound: Math.random() > 0.5,
        dx: `${Math.cos(angle) * speed}px`,
        dy: `${Math.sin(angle) * speed - 60}px`
      };
    });

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev => {
        const idsToRemove = new Set(newParticles.map(p => p.id));
        return prev.filter(p => !idsToRemove.has(p.id));
      });
    }, 1000);
  };

  const triggerCadetAction = (action) => {
    setCadetAction(action);
    setTimeout(() => {
      setCadetAction(null);
    }, 600);
  };

  // Ambient mood particles (emojis floating upward in the sky area)
  const spawnMoodAmbientItem = () => {
    // Animations disabled for now
  };

  // --- Mood Interpolation Math ---
  const getEmotionByX = (x) => {
    if (x <= 16) return 'Sad';
    if (x <= 33) return 'Afraid';
    if (x <= 50) return 'Angry';
    if (x <= 67) return 'Calm';
    if (x <= 84) return 'Happy';
    return 'Naughty';
  };

  const getEmotionEmoji = (emotion) => {
    const emojis = {
      Sad: '😢',
      Afraid: '😨',
      Angry: '😡',
      Calm: '😌',
      Happy: '😊',
      Naughty: '😜'
    };
    return emojis[emotion] || '😊';
  };

  const getEnergyByY = (y) => {
    if (y <= 3) return 'Low Energy 💤';
    if (y <= 7) return 'Calm Energy 🔋';
    return 'High Energy ⚡';
  };

  const handleJoystickMove = (clientX, clientY) => {
    if (!joystickRef.current) return;
    const rect = joystickRef.current.getBoundingClientRect();
    let x = ((clientX - rect.left) / rect.width) * 100;
    let y = Math.round((1 - (clientY - rect.top) / rect.height) * 10);

    // Constrain
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(10, y));

    setMoodX(x);
    setMoodY(y);
  };

  const handleJoystickStart = (e) => {
    isDraggingJoystick.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    handleJoystickMove(clientX, clientY);
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDraggingJoystick.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      handleJoystickMove(clientX, clientY);
    };

    const handleEnd = () => {
      if (isDraggingJoystick.current) {
        isDraggingJoystick.current = false;
        playLegoPop();
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, []);

  // --- Time Math Helpers ---
  const hourToX = (hour) => {
    const relativeHour = hour - timelineCenterHour;
    const fraction = relativeHour / zoomLevel;
    return viewportWidth / 2 + fraction * viewportWidth;
  };

  const deltaXToHours = (dx) => {
    return -(dx / viewportWidth) * zoomLevel;
  };

  const changeDate = (nextDate) => {
    const prevKey = getDateKey(currentDateRef.current);
    const nextKey = getDateKey(nextDate);

    if (prevKey === nextKey) {
      setCurrentDate(nextDate);
      return;
    }

    setDailyTasksMap(prev => {
      const updated = { ...prev, [prevKey]: tasks };
      
      let nextTasks = updated[nextKey];
      if (!nextTasks) {
        nextTasks = routineTemplates.map(t => ({ ...t, status: 'pending' }));
      }
      setTasks(nextTasks);
      return updated;
    });

    setCurrentDate(nextDate);
  };

  // --- Interactive Timeline Panning ---
  const handleTimelineLongPress = (clientX) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const hour = timelineCenterHour + ((relativeX - viewportWidth / 2) / viewportWidth) * zoomLevel;
    
    // Snap to 5-minute increments (1/12 hour)
    let snappedHour = Math.round(hour * 12) / 12;
    snappedHour = Math.max(0, Math.min(24, snappedHour));
    
    const hours = Math.floor(snappedHour);
    const minutes = Math.round((snappedHour - hours) * 60);
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    
    setNewTaskStart(formattedTime);
    setParentModeActive(true);
    setParentPanelOpen(true);
    setParentTab('tasks');
    playLegoPop();
    
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
    dragStartRef.current = null;
    setIsWalking(false);
  };

  const handleTimelineDragStart = (e) => {
    if (momentumFrameRef.current) {
      cancelAnimationFrame(momentumFrameRef.current);
      momentumFrameRef.current = null;
    }

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const nowMs = Date.now();

    dragStartRef.current = {
      x: clientX,
      y: clientY,
      centerHour: timelineCenterHour,
      lastX: clientX,
      lastTime: nowMs,
      velocity: 0
    };
    setIsWalking(true);

    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
    
    longPressStartPosRef.current = { x: clientX, y: clientY };
    longPressTimeoutRef.current = setTimeout(() => {
      handleTimelineLongPress(clientX);
    }, 800);
  };

  const handleTimelineDragMove = (e) => {
    if (!dragStartRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
        longPressTimeoutRef.current = null;
      }
    }

    const nowMs = Date.now();
    const dt = nowMs - dragStartRef.current.lastTime;
    if (dt > 10) {
      const instVelocity = (clientX - dragStartRef.current.lastX) / dt;
      dragStartRef.current.velocity = dragStartRef.current.velocity * 0.4 + instVelocity * 0.6;
      dragStartRef.current.lastX = clientX;
      dragStartRef.current.lastTime = nowMs;
    }

    const deltaHours = deltaXToHours(dx);
    let newCenter = dragStartRef.current.centerHour + deltaHours;

    let nextDate = new Date(currentDateRef.current);
    let dateChanged = false;
    while (newCenter >= 24) {
      newCenter -= 24;
      nextDate.setDate(nextDate.getDate() + 1);
      dateChanged = true;
    }
    while (newCenter < 0) {
      newCenter += 24;
      nextDate.setDate(nextDate.getDate() - 1);
      dateChanged = true;
    }

    if (dateChanged) {
      const dayDiff = Math.round((nextDate - currentDateRef.current) / (1000 * 60 * 60 * 24));
      dragStartRef.current.centerHour -= dayDiff * 24;
      changeDate(nextDate);
    }

    setTimelineCenterHour(newCenter);

    const tickInterval = 0.25;
    const tickVal = Math.floor(newCenter / tickInterval);
    if (tickVal !== lastTickRef.current) {
      lastTickRef.current = tickVal;
      const currentMs = Date.now();
      if (currentMs - lastTickTimeRef.current > 60) {
        playTick();
        lastTickTimeRef.current = currentMs;
      }
    }
  };

  const handleTimelineDragEnd = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
    
    const dragInfo = dragStartRef.current;
    dragStartRef.current = null;
    setIsWalking(false);

    if (dragInfo && Math.abs(dragInfo.velocity) > 0.15) {
      let vel = dragInfo.velocity;
      let lastTime = Date.now();
      const friction = 0.95;
      const tickInterval = 0.25;

      const runMomentum = () => {
        const nowMs = Date.now();
        const frameDt = Math.min(nowMs - lastTime, 32);
        lastTime = nowMs;

        vel *= friction;

        const dx = vel * frameDt;
        const deltaHours = deltaXToHours(dx);

        setTimelineCenterHour(prev => {
          let newCenter = prev + deltaHours;
          
          let nextDate = new Date(currentDateRef.current);
          let dateChanged = false;
          while (newCenter >= 24) {
            newCenter -= 24;
            nextDate.setDate(nextDate.getDate() + 1);
            dateChanged = true;
          }
          while (newCenter < 0) {
            newCenter += 24;
            nextDate.setDate(nextDate.getDate() - 1);
            dateChanged = true;
          }
          if (dateChanged) {
            changeDate(nextDate);
          }

          const tickVal = Math.floor(newCenter / tickInterval);
          if (tickVal !== lastTickRef.current) {
            lastTickRef.current = tickVal;
            const currentMs = Date.now();
            if (currentMs - lastTickTimeRef.current > 60) {
              playTick();
              lastTickTimeRef.current = currentMs;
            }
          }

          return newCenter;
        });

        if (Math.abs(vel) > 0.05) {
          momentumFrameRef.current = requestAnimationFrame(runMomentum);
        } else {
          momentumFrameRef.current = null;
        }
      };

      momentumFrameRef.current = requestAnimationFrame(runMomentum);
    }
  };

  // --- Task Bricks Interactivity (Gestures) ---
  const handleTaskDragStart = (e, task) => {
    e.stopPropagation();
    if (!parentModeActive && task.activityType === 'mandatory') {
      playErrorBuzz();
      triggerCadetAction('shake');
      return;
    }
    initialTasksRef.current = JSON.parse(JSON.stringify(tasks));
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDraggedTask({
      id: task.id,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
      initialStartTime: task.startTime,
      initialDuration: task.duration,
      dragMode: null
    });
    setSelectedTaskId(task.id);
  };

  const handleResizeStart = (e, task) => {
    e.stopPropagation();
    e.preventDefault();
    if (!parentModeActive && task.activityType === 'mandatory') {
      playErrorBuzz();
      triggerCadetAction('shake');
      return;
    }
    initialTasksRef.current = JSON.parse(JSON.stringify(tasks));
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDraggedTask({
      id: task.id,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
      initialStartTime: task.startTime,
      initialDuration: task.duration,
      dragMode: 'resize-right'
    });
    setSelectedTaskId(task.id);
  };

  const handleTaskDragMove = (e) => {
    if (!draggedTask) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const dx = clientX - draggedTask.startX;
    const dy = clientY - draggedTask.startY;
    
    let mode = draggedTask.dragMode;
    if (mode === null) {
      if (Math.abs(dx) > 10) {
        mode = 'horizontal';
      } else if (Math.abs(dy) > 10) {
        mode = 'vertical';
      }
    }

    if (mode === 'horizontal') {
      const draggedTaskObj = tasks.find(t => t.id === draggedTask.id);
      if (draggedTaskObj) {
        let hoursShift = (dx / viewportWidth) * zoomLevel;
        hoursShift = Math.round(hoursShift * 12) / 12;

        let finalShift = hoursShift;
        let shouldSnapBackVal = false;

        if (!parentModeActive) {
          // Identify which tasks are shifting (dragged task + subsequent flexible tasks)
          const shiftedIds = initialTasksRef.current
            .filter(t => t.id === draggedTask.id || (t.startTime > draggedTask.initialStartTime && t.activityType !== 'mandatory'))
            .map(t => t.id);

          const fixedTasks = initialTasksRef.current.filter(t => !shiftedIds.includes(t.id) && t.activityType === 'mandatory');

          let maxShift = 24 - draggedTask.initialStartTime - draggedTask.initialDuration;
          let minShift = -draggedTask.initialStartTime;

          // Find boundaries of shifted tasks against fixed tasks
          initialTasksRef.current.filter(t => shiftedIds.includes(t.id)).forEach(st => {
            fixedTasks.forEach(ft => {
              if (ft.startTime >= st.startTime + st.duration) {
                const limit = ft.startTime - st.startTime - st.duration;
                if (limit < maxShift) maxShift = limit;
              } else if (ft.startTime + ft.duration <= st.startTime) {
                const limit = ft.startTime + ft.duration - st.startTime;
                if (limit > minShift) minShift = limit;
              }
            });
          });

          // Check if dragging past limits
          if (hoursShift > maxShift || hoursShift < minShift) {
            finalShift = Math.max(minShift, Math.min(maxShift, hoursShift));

            // Exceeding limit by 15 mins triggers snapback
            if (hoursShift > maxShift + 0.25 || hoursShift < minShift - 0.25) {
              shouldSnapBackVal = true;
            }

            const nowTime = Date.now();
            if (nowTime - lastBuzzTimeRef.current > 1000) {
              lastBuzzTimeRef.current = nowTime;
              playErrorBuzz();
              triggerCadetAction('shake');
            }
          }

          setTasks(prev => prev.map(t => {
            if (shiftedIds.includes(t.id)) {
              const initTask = initialTasksRef.current.find(it => it.id === t.id);
              if (initTask) {
                let s = initTask.startTime + finalShift;
                s = Math.max(0, Math.min(24, Math.round(s * 12) / 12));
                return { ...t, startTime: s };
              }
            }
            return t;
          }));
        } else {
          // Parent Mode: Dragged task moves freely, no constraints/ripple
          let newStart = draggedTask.initialStartTime + hoursShift;
          newStart = Math.max(0, Math.min(24, Math.round(newStart * 12) / 12));
          setTasks(prev => prev.map(t => {
            if (t.id === draggedTask.id) {
              return { ...t, startTime: newStart };
            }
            return t;
          }));
        }

        if (shouldSnapBackVal !== draggedTask.shouldSnapBack) {
          setDraggedTask(prev => ({
            ...prev,
            shouldSnapBack: shouldSnapBackVal,
            dragMode: mode
          }));
        } else {
          setDraggedTask(prev => ({
            ...prev,
            currentX: clientX,
            currentY: clientY,
            dragMode: mode
          }));
        }
      }
    } else if (mode === 'resize-right') {
      let hoursShift = (dx / viewportWidth) * zoomLevel;
      hoursShift = Math.round(hoursShift * 12) / 12;

      let finalShift = hoursShift;
      let shouldSnapBackVal = false;

      if (!parentModeActive) {
        // Find nearest subsequent mandatory task
        const draggedTaskObj = initialTasksRef.current.find(t => t.id === draggedTask.id);
        if (draggedTaskObj) {
          const subsequentMandatoryTasks = initialTasksRef.current.filter(t => 
            t.activityType === 'mandatory' && t.startTime >= draggedTaskObj.startTime + draggedTaskObj.duration
          );

          let maxDurationShift = 24 - draggedTask.initialStartTime - draggedTask.initialDuration;
          subsequentMandatoryTasks.forEach(ft => {
            const limit = ft.startTime - draggedTask.initialStartTime - draggedTask.initialDuration;
            if (limit < maxDurationShift) maxDurationShift = limit;
          });

          if (hoursShift > maxDurationShift) {
            finalShift = maxDurationShift;
            if (hoursShift > maxDurationShift + 0.25) {
              shouldSnapBackVal = true;
            }
            const nowTime = Date.now();
            if (nowTime - lastBuzzTimeRef.current > 1000) {
              lastBuzzTimeRef.current = nowTime;
              playErrorBuzz();
              triggerCadetAction('shake');
            }
          }

          let newDuration = draggedTask.initialDuration + finalShift;
          const minDuration = 1 / 12;
          if (newDuration < minDuration) newDuration = minDuration;
          if (newDuration > 24) newDuration = 24;

          setTasks(prev => prev.map(t => {
            if (t.id === draggedTask.id) {
              return { ...t, duration: newDuration };
            }
            return t;
          }));
        }
      } else {
        // Parent mode resizes freely
        let newDuration = draggedTask.initialDuration + hoursShift;
        newDuration = Math.round(newDuration * 12) / 12;
        const minDuration = 1 / 12;
        if (newDuration < minDuration) newDuration = minDuration;
        if (newDuration > 24) newDuration = 24;

        setTasks(prev => prev.map(t => {
          if (t.id === draggedTask.id) {
            return { ...t, duration: newDuration };
          }
          return t;
        }));
      }

      if (shouldSnapBackVal !== draggedTask.shouldSnapBack) {
        setDraggedTask(prev => ({
          ...prev,
          shouldSnapBack: shouldSnapBackVal,
          dragMode: mode
        }));
      } else {
        setDraggedTask(prev => ({
          ...prev,
          currentX: clientX,
          currentY: clientY,
          dragMode: mode
        }));
      }
    } else {
      setDraggedTask(prev => ({
        ...prev,
        currentX: clientX,
        currentY: clientY,
        dragMode: mode
      }));
    }
  };

  const handleTaskDragEnd = () => {
    if (!draggedTask) return;

    if (draggedTask.shouldSnapBack) {
      setTasks(initialTasksRef.current);
      playErrorBuzz();
      triggerCadetAction('shake');
      setDraggedTask(null);
      return;
    }

    if (draggedTask.dragMode === 'vertical') {
      const offset = draggedTask.currentY - draggedTask.startY;
      if (offset > 60) {
        setTasks(prev => prev.map(t => {
          if (t.id === draggedTask.id) {
            const newStatus = t.status === 'skipped' ? 'pending' : 'skipped';
            if (newStatus === 'skipped') {
              playSlideWhistle();
              addLog(t.title, 'skipped');
            } else {
              addLog(t.title, 'restored to pending');
            }
            return { ...t, status: newStatus };
          }
          return t;
        }));
      }
    } else if (draggedTask.dragMode === 'horizontal' || draggedTask.dragMode === 'resize-right') {
      const task = tasks.find(t => t.id === draggedTask.id);
      const initialTask = initialTasksRef.current.find(t => t.id === draggedTask.id);
      const changed = initialTask && (
        Math.abs(task.startTime - initialTask.startTime) > 0.01 ||
        Math.abs(task.duration - initialTask.duration) > 0.01
      );

      if (changed) {
        setSeriesModal({
          title: "Adjust Routine",
          message: `Do you want to apply this timing adjustment for "${task.title}" to all future days (the series) or only to today (this event only)?`,
          onConfirmEvent: () => {
            playLegoPop();
            if (draggedTask.dragMode === 'horizontal') {
              addLog(task.title, `re-scheduled to start at ${Math.floor(task.startTime)}:${String(Math.round((task.startTime % 1) * 60)).padStart(2, '0')} (today only)`);
            } else {
              const durMins = Math.round(task.duration * 60);
              addLog(task.title, `resized duration to ${durMins} minutes (today only)`);
            }
            setSeriesModal(null);
          },
          onConfirmSeries: () => {
            playLegoPop();
            if (draggedTask.dragMode === 'horizontal') {
              addLog(task.title, `re-scheduled to start at ${Math.floor(task.startTime)}:${String(Math.round((task.startTime % 1) * 60)).padStart(2, '0')} (series)`);
            } else {
              const durMins = Math.round(task.duration * 60);
              addLog(task.title, `resized duration to ${durMins} minutes (series)`);
            }

            setRoutineTemplates(prev => prev.map(t => {
              if (t.id === task.id) {
                return { ...t, startTime: task.startTime, duration: task.duration };
              }
              return t;
            }));

            setDailyTasksMap(prev => {
              const updated = { ...prev };
              Object.keys(updated).forEach(dateStr => {
                updated[dateStr] = updated[dateStr].map(t => {
                  if (t.id === task.id) {
                    return { ...t, startTime: task.startTime, duration: task.duration };
                  }
                  return t;
                });
              });
              return updated;
            });
            setSeriesModal(null);
          },
          onCancel: () => {
            setTasks(initialTasksRef.current);
            setSeriesModal(null);
          }
        });
      }
    }

    setDraggedTask(null);
  };

  // Bind global mouse/touch handlers during active card drags
  useEffect(() => {
    const handleGlobalMove = (e) => {
      if (draggedTask) {
        handleTaskDragMove(e);
      }
    };

    const handleGlobalEnd = () => {
      if (draggedTask) {
        handleTaskDragEnd();
      }
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalEnd);
    window.addEventListener('touchmove', handleGlobalMove, { passive: false });
    window.addEventListener('touchend', handleGlobalEnd);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchmove', handleGlobalMove);
      window.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [draggedTask, tasks, zoomLevel, viewportWidth]);

  const handleTaskTap = (e, task) => {
    e.stopPropagation();
    
    // Always select the tapped task!
    setSelectedTaskId(task.id);
    
    // If it's a surprise/mystery task and not yet revealed, click reveals it!
    if (task.activityType === 'surprise' && !revealedSurpriseIds.includes(task.id)) {
      playLegoPop();
      spawnExplosionParticles(e.clientX || e.touches?.[0]?.clientX, e.clientY || e.touches?.[0]?.clientY, task.color);
      triggerCadetAction('cheer');
      setRevealedSurpriseIds(prev => [...prev, task.id]);
      addLog(task.title, 'revealed surprise routine');
      return;
    }

    const now = Date.now();
    const lastTap = lastTapRef.current[task.id] || 0;

    if (now - lastTap < 300) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX || (e.touches && e.touches[0].clientX) || (rect.left + rect.width / 2);
      const clickY = e.clientY || (e.touches && e.touches[0].clientY) || (rect.top + rect.height / 2);

      setTasks(prev => prev.map(t => {
        if (t.id === task.id) {
          const newStatus = t.status === 'completed' ? 'pending' : 'completed';
          if (newStatus === 'completed') {
            playLegoPop();
            spawnExplosionParticles(clickX, clickY, t.color);
            triggerCadetAction('cheer');
            addLog(t.title, 'completed');
          } else {
            addLog(t.title, 'un-completed');
          }
          return { ...t, status: newStatus };
        }
        return t;
      }));
      lastTapRef.current[task.id] = 0;
    } else {
      lastTapRef.current[task.id] = now;
    }
  };

  // --- Zoom Controls ---
  const handleZoom = (direction) => {
    playCenteringZip();
    setZoomLevel(prev => {
      let nextZoom = direction === 'in' ? prev * 0.7 : prev * 1.4;
      if (nextZoom < 0.5) nextZoom = 0.5;
      if (nextZoom > 24.0) nextZoom = 24.0;
      return nextZoom;
    });
  };

  const handleCenterNow = () => {
    playCenteringZip();
    setTimelineCenterHour(systemHour);
    changeDate(new Date());
  };

  const handleJumpHour = (direction) => {
    playLegoPop();
    setTimelineCenterHour(prev => {
      const offset = direction === 'left' ? -1 : 1;
      let target = prev + offset;
      
      let nextDate = new Date(currentDateRef.current);
      let dateChanged = false;
      if (target >= 24) {
        target -= 24;
        nextDate.setDate(nextDate.getDate() + 1);
        dateChanged = true;
      } else if (target < 0) {
        target += 24;
        nextDate.setDate(nextDate.getDate() - 1);
        dateChanged = true;
      }
      if (dateChanged) {
        changeDate(nextDate);
      }
      return target;
    });
  };

  const getCenterTimeFormatted = () => {
    const totalMinutes = Math.round(timelineCenterHour * 60);
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(h)}:${pad(m)}`;
  };

  // --- Parent Mode Settings Panel ---
  const handleParentSettingsClick = () => {
    if (parentModeActive) {
      setParentPanelOpen(true);
    } else {
      setPinInput('');
      setPinError(false);
      setPinLockOpen(true);
    }
  };

  const handlePinKeyPress = (val) => {
    if (pinInput.length >= 4 && val !== 'clear' && val !== 'back') return;

    if (val === 'clear') {
      setPinInput('');
    } else if (val === 'back') {
      setPinInput(prev => prev.slice(0, -1));
    } else {
      const nextInput = pinInput + val;
      setPinInput(nextInput);
      
      if (nextInput === '1234') {
        playUnlockChime();
        setParentModeActive(true);
        setPinLockOpen(false);
        setParentPanelOpen(true);
        setPinInput('');
      } else if (nextInput.length === 4) {
        playErrorBuzz();
        setPinError(true);
        setTimeout(() => {
          setPinInput('');
          setPinError(false);
        }, 1000);
      }
    }
  };

  const handleLockOut = () => {
    setParentModeActive(false);
    setParentPanelOpen(false);
  };

  // --- Parent CRUD Actions ---
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const [hours, minutes] = newTaskStart.split(':').map(Number);
    const startHour = hours + minutes / 60;
    const duration = parseFloat(newTaskDuration);

    const newTask = {
      id: Math.random().toString(36).substring(2, 9),
      title: newTaskTitle,
      icon: newTaskIcon,
      startTime: startHour,
      duration: duration,
      color: newTaskColor,
      status: 'pending',
      activityType: newTaskType,
      frequency: newTaskFreq
    };

    setSeriesModal({
      title: "Add Routine",
      message: `Do you want to add "${newTaskTitle}" to all days in the series, or for today only?`,
      onConfirmEvent: () => {
        setTasks(prev => {
          const updated = [...prev, newTask];
          return updated.sort((a, b) => a.startTime - b.startTime);
        });
        addLog(newTaskTitle, `added for today only`);
        setNewTaskTitle('');
        setSeriesModal(null);
      },
      onConfirmSeries: () => {
        setRoutineTemplates(prev => [...prev, newTask].sort((a, b) => a.startTime - b.startTime));
        setTasks(prev => {
          const updated = [...prev, newTask];
          return updated.sort((a, b) => a.startTime - b.startTime);
        });
        setDailyTasksMap(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(dateStr => {
            updated[dateStr] = [...updated[dateStr], newTask].sort((a, b) => a.startTime - b.startTime);
          });
          return updated;
        });
        addLog(newTaskTitle, `added to series`);
        setNewTaskTitle('');
        setSeriesModal(null);
      },
      onCancel: () => {
        setSeriesModal(null);
      }
    });
  };

  const handleDeleteTask = (id, title) => {
    setSeriesModal({
      title: "Delete Routine",
      message: `Do you want to delete "${title}" from all days in the series, or for today only?`,
      onConfirmEvent: () => {
        setTasks(prev => prev.filter(t => t.id !== id));
        setSelectedTaskId(null);
        addLog(title, 'deleted for today only');
        setSeriesModal(null);
      },
      onConfirmSeries: () => {
        setRoutineTemplates(prev => prev.filter(t => t.id !== id));
        setTasks(prev => prev.filter(t => t.id !== id));
        setDailyTasksMap(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(dateStr => {
            updated[dateStr] = updated[dateStr].filter(t => t.id !== id);
          });
          return updated;
        });
        setSelectedTaskId(null);
        addLog(title, 'deleted from series');
        setSeriesModal(null);
      },
      onCancel: () => {
        setSeriesModal(null);
      }
    });
  };

  const handleResetTasks = () => {
    setSeriesModal({
      title: "Reset Routines",
      message: "Do you want to reset routines for all days (clearing history/overrides) or just reset today?",
      onConfirmEvent: () => {
        const resetToday = DEFAULT_TASKS.map(t => ({
          ...t,
          frequency: t.frequency === 'one-off' ? 'daily' : t.frequency,
          status: 'pending'
        }));
        setTasks(resetToday);
        setSelectedTaskId(null);
        setRevealedSurpriseIds([]);
        addLog("Today's routines", 'reset to defaults');
        setSeriesModal(null);
      },
      onConfirmSeries: () => {
        const defaults = DEFAULT_TASKS.map(t => ({
          ...t,
          frequency: t.frequency === 'one-off' ? 'daily' : t.frequency
        }));
        setRoutineTemplates(defaults);
        setDailyTasksMap({});
        setTasks(defaults.map(t => ({ ...t, status: 'pending' })));
        setSelectedTaskId(null);
        setRevealedSurpriseIds([]);
        addLog('All routines', 'reset to defaults for all days');
        setSeriesModal(null);
      },
      onCancel: () => {
        setSeriesModal(null);
      }
    });
  };

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (!newProfileName) return;
    const newProf = {
      id: newProfileName.toLowerCase().replace(/\s+/g, '-'),
      name: newProfileName,
      age: parseInt(newProfileAge),
      role: 'child'
    };
    setProfiles(prev => [...prev, newProf]);
    addLog(`Profile "${newProfileName}"`, 'created');
    setNewProfileName('');
  };

  const handleDeleteProfile = (id, name) => {
    setProfiles(prev => {
      const remaining = prev.filter(p => p.id !== id);
      if (remaining.length > 0) {
        if (activeProfile === id) {
          setActiveProfile(remaining[0].id);
        }
      } else {
        // Fallback so it is never completely empty
        const defaultProfile = { id: 'liam', name: 'Lego Liam 🚀', age: 4, role: 'child' };
        setActiveProfile('liam');
        return [defaultProfile];
      }
      return remaining;
    });
    addLog(`Profile "${name}"`, 'removed');
    playSlideWhistle();
  };

  const handleUpdateProfileName = (id, newName) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, name: newName };
      }
      return p;
    }));
  };

  // --- Activity-Specific Characters and Backdrop Calculations ---
  // Find task active at current systemHour
  const activeTask = tasks.find(t => systemHour >= t.startTime && systemHour < (t.startTime + t.duration));
  
  // Set character image and background build based on the active task
  let activeCharImg = '/lego_guide.png'; // Fallback Space Astronaut
  let activeBuildTitle = 'Time Patrol Space Base';
  let hasPreGeneratedBackdrop = false;
  let customBackdropType = 'space'; // space, teeth, meals, sleep, playground

  if (activeTask) {
    const titleLower = activeTask.title.toLowerCase();
    
    // Check for core preloaded activities
    if (titleLower.includes('breakfast') || titleLower.includes('lunch') || titleLower.includes('dinner') || titleLower.includes('pizza') || titleLower.includes('waffle')) {
      activeCharImg = '/lego_chef.png';
      activeBuildTitle = 'Lego Waffle Diner Build';
      customBackdropType = 'meals';
      hasPreGeneratedBackdrop = true;
    } else if (titleLower.includes('teeth') || titleLower.includes('brush') || titleLower.includes('dinosaur')) {
      activeCharImg = '/lego_dino.png';
      activeBuildTitle = 'Brushing Dino Build';
      customBackdropType = 'teeth';
      hasPreGeneratedBackdrop = true;
    } else if (titleLower.includes('sleep') || titleLower.includes('dreams') || titleLower.includes('nap')) {
      activeCharImg = ''; // No character image, uses sleeping emojis/Zzz builds
      activeBuildTitle = 'Starry Dreams Build';
      customBackdropType = 'sleep';
      hasPreGeneratedBackdrop = true;
    } else if (titleLower.includes('playground') || titleLower.includes('park') || titleLower.includes('outdoor')) {
      activeCharImg = '/lego_guide.png';
      activeBuildTitle = 'Park Playground Build';
      customBackdropType = 'playground';
      hasPreGeneratedBackdrop = true;
    } else if (titleLower.includes('spaceship') || titleLower.includes('build')) {
      activeCharImg = '/lego_guide.png';
      activeBuildTitle = 'Star Patrol Rocket Build';
      customBackdropType = 'space';
      hasPreGeneratedBackdrop = true;
    } else {
      activeBuildTitle = `Lego "${activeTask.title}" Build`;
      customBackdropType = 'generic';
    }
  }

  // Dynamic Netherlands Astronomical Calculations
  const systemDate = new Date();
  const doy = getDayOfYear(systemDate);
  const { sunrise, sunset } = getSunriseSunset(doy);
  const { rise: moonRise, set: moonSet, alwaysUp: moonAlwaysUp, alwaysDown: moonAlwaysDown } = getMoonTimes(systemDate);

  // Determine ambient sky color class dynamically aligned to sunrise/sunset
  let skyClass = 'sky-day';
  if (timelineCenterHour >= sunrise - 1.0 && timelineCenterHour < sunrise + 1.0) {
    skyClass = 'sky-dawn';
  } else if (timelineCenterHour >= sunrise + 1.0 && timelineCenterHour < sunset - 1.0) {
    skyClass = 'sky-day';
  } else if (timelineCenterHour >= sunset - 1.0 && timelineCenterHour < sunset + 1.0) {
    skyClass = 'sky-dusk';
  } else {
    skyClass = 'sky-night';
  }

  // Calculate sun style using exact sunrise/sunset hours
  const isSunVisible = timelineCenterHour >= sunrise && timelineCenterHour < sunset;
  let sunStyle = { display: 'none' };
  if (isSunVisible) {
    const sunFraction = (timelineCenterHour - sunrise) / (sunset - sunrise);
    const left = sunFraction * 80 + 10;
    const top = 70 - 55 * Math.sin(Math.PI * sunFraction);
    sunStyle = {
      left: `${left}%`,
      top: `${top}%`,
      display: 'block',
      position: 'absolute',
      transform: 'translate(-50%, -50%)'
    };
  }

  // Moon phase calculation using SunCalc (global phase)
  const moonPhase = SunCalc.getMoonIllumination(systemDate).phase;

  // Calculate moon style using exact moonrise/moonset hours
  const isMoonVisible = isMoonCurrentlyVisible(timelineCenterHour, moonRise, moonSet, moonAlwaysUp, moonAlwaysDown);
  let moonStyle = { display: 'none' };
  if (isMoonVisible) {
    let moonFraction = 0.5;
    if (moonRise !== null && moonSet !== null) {
      const duration = moonRise < moonSet ? (moonSet - moonRise) : (moonSet - moonRise + 24.0) % 24.0;
      const elapsed = (timelineCenterHour - moonRise + 24.0) % 24.0;
      moonFraction = duration > 0 ? (elapsed / duration) : 0;
    } else {
      // If always visible, map it continuously across the 24 hour range
      moonFraction = timelineCenterHour / 24.0;
    }
    const left = moonFraction * 80 + 10;
    const top = 70 - 55 * Math.sin(Math.PI * moonFraction);
    moonStyle = {
      left: `${left}%`,
      top: `${top}%`,
      display: 'block',
      position: 'absolute',
      transform: 'translate(-50%, -50%)'
    };
  }

  const moodEmotion = getEmotionByX(moodX);
  const moodEmoji = getEmotionEmoji(moodEmotion);
  const moodEnergy = getEnergyByY(moodY);

  const now = new Date();
  const isToday = currentDate.getFullYear() === now.getFullYear() &&
                  currentDate.getMonth() === now.getMonth() &&
                  currentDate.getDate() === now.getDate();
  const formattedTime = now.toLocaleTimeString('en-US', { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedDate = currentDate.toLocaleDateString('en-US', { timeZone: 'Europe/Amsterdam', weekday: 'short', month: 'short', day: 'numeric' });
  const isNotNow = !isToday || Math.abs(timelineCenterHour - systemHour) > 0.05;

  return (
    <>
      {/* Top Header / Profile Switcher */}
      <header className="top-bar" data-component="TopHeader">
        <div className="logo-container" data-component="LogoContainer">
          <span className="logo-text">LEGO TIME PATROL</span>
        </div>

        {/* Page Navigation Switcher */}
        <div className="profile-selector" style={{ marginRight: 'auto', marginLeft: '24px' }} data-component="ProfileSelector">
          <button 
            className={`profile-btn ${activePage === 'timeline' ? 'active' : ''}`}
            onClick={() => { setActivePage('timeline'); playLegoPop(); }}
          >
            🚀 Timeline
          </button>
          <button 
            className={`profile-btn ${activePage === 'mood' ? 'active' : ''}`}
            onClick={() => { setActivePage('mood'); playLegoPop(); }}
          >
            🔋 Mood Station
          </button>
        </div>

        {/* Profile Switcher */}
        <div className="profile-selector" data-component="ProfileSelector">
          {profiles.map(p => (
            <button
              key={p.id}
              className={`profile-btn ${activeProfile === p.id && !parentModeActive ? 'active' : ''}`}
              onClick={() => {
                if (parentModeActive) setParentModeActive(false);
                setActiveProfile(p.id);
                playLegoPop();
              }}
            >
              <span>{p.name}</span>
            </button>
          ))}
          
          <button
            className={`profile-btn ${parentModeActive ? 'active' : ''}`}
            onClick={() => {
              handleParentSettingsClick();
              playLegoPop();
            }}
            style={{ borderStyle: 'dashed' }}
          >
            <Shield size={16} />
            <span>Parents {parentModeActive && '⚙️'}</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="nav-controls" data-component="NavigationControls">
          <div className="zoom-display">
            Zoom: {Math.round(24 / zoomLevel)}x
          </div>
          <button className="lego-button gray" onClick={() => handleZoom('out')} title="Zoom Out">
            <ZoomOut size={20} />
          </button>
          <button className="lego-button gray" onClick={() => handleZoom('in')} title="Zoom In">
            <ZoomIn size={20} />
          </button>
          <button className="lego-button blue" onClick={handleCenterNow} title="Center on Now">
            <RotateCcw size={20} />
            <span>Now</span>
          </button>
        </div>
      </header>

      {activePage === 'timeline' ? (
        <>
          {/* Thematic Active-Activity Backdrop / Sky Area */}
          <section className={`sky-container ${skyClass}`} data-component="SkyBackdropContainer">
            {/* Real-time Time & Date Lego Brick Widget */}
            <div className="lego-datetime-widget" data-component="LegoDateTimeWidget">
              <div className="lego-brick-studs">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="datetime-content">
                <div className="datetime-time">{formattedTime}</div>
                <div className="datetime-date">{formattedDate}</div>
              </div>
            </div>

            <div className="sky-stars"></div>
            
            {/* Twinkling ambient elements from joystick mood controller */}
            <div className="ambient-particle-flow">
              {ambientItems.map(item => (
                <span
                  key={item.id}
                  className="mood-floating-item"
                  style={{
                    left: item.left,
                    bottom: '10px',
                    '--mxd': item.mxd,
                    '--mrot': item.mrot
                  }}
                >
                  {item.content}
                </span>
              ))}
            </div>

            {/* Sun & Moon arcs */}
            <ComicSun style={sunStyle} />
            <ComicMoon phase={moonPhase} style={moonStyle} />

            <div className="lego-clouds">
              <ComicCloud style={{ top: '15%', left: '10%', transform: 'scale(0.7)', position: 'absolute' }} />
              <ComicCloud style={{ top: '25%', left: '75%', transform: 'scale(0.9)', position: 'absolute' }} />
            </div>

            {/* Skyline and Mountain Backdrop */}
            <ComicBackdrop />


          </section>

          {/* Daily Timeline */}
          <section 
            className="timeline-viewport"
            data-component="TimelineViewport"
            ref={viewportRef}
            onMouseDown={handleTimelineDragStart}
            onMouseMove={handleTimelineDragMove}
            onMouseUp={handleTimelineDragEnd}
            onMouseLeave={handleTimelineDragEnd}
            onTouchStart={handleTimelineDragStart}
            onTouchMove={handleTimelineDragMove}
            onTouchEnd={handleTimelineDragEnd}
          >
            {/* Left & Right 1-Hour Jump Arrows */}
            <button 
              className="lego-jump-btn left-jump" 
              onClick={() => handleJumpHour('left')} 
              onMouseDown={(e) => e.stopPropagation()} 
              onTouchStart={(e) => e.stopPropagation()} 
              title="Jump 1 Hour Back"
            >
              ◀
            </button>
            <button 
              className="lego-jump-btn right-jump" 
              onClick={() => handleJumpHour('right')} 
              onMouseDown={(e) => e.stopPropagation()} 
              onTouchStart={(e) => e.stopPropagation()} 
              title="Jump 1 Hour Forward"
            >
              ▶
            </button>

            {/* Viewport Center Pointer */}
            {isNotNow && (
              <div 
                className="timeline-center-pointer"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <div className="pointer-pill">Viewing: {getCenterTimeFormatted()}</div>
                <div className="pointer-arrow">▼</div>
              </div>
            )}

            <div className="timeline-baseplate" style={{ width: '100%', height: '100%' }}>
              
              {/* Task Bricks Area */}
              <div 
                className="tasks-container"
              >
                {tasks.map(task => {
                  const startX = hourToX(task.startTime);
                  const endX = hourToX(task.startTime + task.duration);
                  const width = Math.max(endX - startX, 85);
                  
                  if (startX + width < 0 || startX > viewportWidth) return null;

                  const isDragged = draggedTask && draggedTask.id === task.id;
                  const dragOffset = isDragged && draggedTask.dragMode === 'vertical' ? Math.max(0, draggedTask.currentY - draggedTask.startY) : 0;
                  const TaskIcon = IconMap[task.icon] || HelpCircle;

                  // Check surprise routine revealed status
                  const isSurprise = task.activityType === 'surprise';
                  const isRevealed = revealedSurpriseIds.includes(task.id) || task.status !== 'pending' || parentModeActive;
                  const displayTitle = (isSurprise && !isRevealed) ? 'Mystery Box!' : task.title;
                  const isSelected = task.id === selectedTaskId;

                  return (
                    <div
                      key={task.id}
                      className={`task-brick ${task.color} ${task.status} ${isSurprise && !isRevealed ? 'mystery' : ''} ${isSelected ? 'selected' : ''}`}
                      data-component="TaskBrick"
                      style={{
                        left: `${startX}px`,
                        width: `${width}px`,
                        transform: `translateY(${dragOffset}px) scale(${isDragged ? 0.98 : 1})`,
                        zIndex: isDragged ? 10 : 4,
                        boxShadow: isDragged ? '0 12px 16px rgba(0,0,0,0.3)' : ''
                      }}
                      onMouseDown={(e) => handleTaskDragStart(e, task)}
                      onTouchStart={(e) => handleTaskDragStart(e, task)}
                      onClick={(e) => handleTaskTap(e, task)}
                    >
                      <div className="lego-brick-studs">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>

                      {/* Compact horizontal layout for 80px height */}
                      <div className="task-brick-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '100%', width: '100%', marginTop: '4px' }}>
                        <div className="task-brick-icon-wrapper" style={{ flex: 'none' }}>
                          {(isSurprise && !isRevealed) ? (
                            <Gift size={24} style={{ color: 'var(--lego-yellow)' }} />
                          ) : (
                            <TaskIcon size={24} />
                          )}
                        </div>
                        
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, justifyContent: 'center', textAlign: 'left' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px' }}>
                            <span className="task-brick-title" style={{ fontSize: '0.85rem', marginBottom: 0 }}>{displayTitle}</span>
                            <span className="task-brick-time" style={{ fontSize: '0.7rem', padding: '1px 4px', flex: 'none' }}>
                              {Math.floor(task.startTime)}:
                              {String(Math.round((task.startTime % 1) * 60)).padStart(2, '0')}
                            </span>
                          </div>
                          
                          <div className="task-brick-instruction" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.65rem', padding: 0, background: 'transparent', color: 'rgba(255,255,255,0.85)', textShadow: 'none', border: 'none', marginTop: '2px', width: '100%' }}>
                            <span>
                              {task.status === 'completed' && '🏆 Completed'}
                              {task.status === 'skipped' && '💤 Skipped'}
                              {task.status === 'pending' && (
                                (isSurprise && !isRevealed) ? 'Tap to reveal' : 'Double-tap to snap'
                              )}
                            </span>
                            
                            <span style={{ fontSize: '0.65rem' }}>
                              {task.frequency === 'daily' && '🔁'}
                              {task.frequency === 'weekly' && '📅'}
                              {task.frequency === 'one-off' && '🚀'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Resize stud handle */}
                      {isSelected && (
                        <div 
                          className="resize-handle-stud"
                          onMouseDown={(e) => handleResizeStart(e, task)}
                          onTouchStart={(e) => handleResizeStart(e, task)}
                        >
                          <span></span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Timeline Beam */}
              <div className="timeline-beam">
                <div className="timeline-beam-studs">
                  {Array.from({ length: Math.ceil(viewportWidth / 26) }).map((_, i) => (
                    <span key={i}></span>
                  ))}
                </div>

                <div className="timeline-ticks">
                  {Array.from({ length: 49 }).map((_, i) => {
                    const hour = i * 0.5;
                    const x = hourToX(hour);
                    const isWholeHour = hour % 1 === 0;

                    if (x < 0 || x > viewportWidth) return null;

                    return (
                      <React.Fragment key={hour}>
                        <div 
                          className="timeline-tick"
                          style={{ 
                            left: `${x}px`,
                            height: isWholeHour ? '14px' : '8px',
                            backgroundColor: isWholeHour ? 'var(--lego-black)' : 'rgba(255,255,255,0.4)'
                          }}
                        ></div>
                        {isWholeHour && (
                          <div className="timeline-hour-label" style={{ left: `${x}px` }}>
                            {hour === 0 ? 'Midnight' : hour === 12 ? 'Noon' : `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'pm' : 'am'}`}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {isToday && systemHour >= 0 && systemHour <= 24 && (
                    <div 
                      className="now-indicator-bottom"
                      style={{
                        left: `${hourToX(systemHour)}px`,
                        position: 'absolute',
                        top: '0px',
                        bottom: '0px',
                        width: '6px',
                        backgroundColor: 'var(--lego-red)',
                        border: '2px solid var(--lego-black)',
                        zIndex: 20,
                        borderRadius: '3px',
                        pointerEvents: 'none',
                        transform: 'translateX(-50%)',
                        boxShadow: '0 0 6px var(--lego-red)'
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Draggable character sitting directly on "NOW" mark on the timeline */}
              {isToday && systemHour >= 0 && systemHour <= 24 && (
                <>
                  {/* Walking Lego Figure at NOW */}
                  <div 
                    className={`now-character ${isWalking ? 'walking' : ''} ${cadetAction ? cadetAction : ''}`}
                    data-component="LegoCadetMarker"
                    style={{ left: `${hourToX(systemHour)}px` }}
                    title="Lego Cadet Marker"
                    onClick={() => {
                      playLegoPop();
                      spawnExplosionParticles(hourToX(systemHour), window.innerHeight - 150, 'yellow');
                    }}
                  >
                    <div className="now-character-head">
                      {moodEmoji}
                    </div>
                    <div className={`now-character-torso ${activeTask ? activeTask.color : 'blue'}`}></div>
                    <div className="now-character-legs">
                      <span></span>
                      <span></span>
                    </div>
                  </div>


                </>
              )}

            </div>
          </section>
        </>
      ) : (
        /* Mood Station dedicated full-screen page */
        <section className="mood-station-page">
          <div className="mood-station-panel" data-component="MoodJoystickBoard">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Cadet Mood & Energy Console</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--lego-gray-dark)', fontWeight: 600, marginTop: '-6px', textAlign: 'center' }}>
              Drag your yellow Lego head joystick on the board!
            </p>

            <div className="mood-axis-layout">
              {/* Y Axis Labels */}
              <div className="mood-y-labels">
                <div>High ⚡</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Medium</div>
                <div>Low 😴</div>
              </div>

              {/* Color Split Trackpad */}
              <div 
                className="mood-trackpad-large"
                data-component="MoodJoystickTrackpad"
                ref={joystickRef}
                onMouseDown={handleJoystickStart}
                onTouchStart={handleJoystickStart}
              >
                {/* 6 vertical columns split by colors with indicator heads at top */}
                {[
                  { key: 'sad', label: 'Sad', emoji: '😢', colClass: 'col-sad' },
                  { key: 'afraid', label: 'Afraid', emoji: '😨', colClass: 'col-afraid' },
                  { key: 'angry', label: 'Angry', emoji: '😡', colClass: 'col-angry' },
                  { key: 'calm', label: 'Calm', emoji: '😌', colClass: 'col-calm' },
                  { key: 'happy', label: 'Happy', emoji: '😊', colClass: 'col-happy' },
                  { key: 'naughty', label: 'Naughty', emoji: '😜', colClass: 'col-naughty' }
                ].map((moodInfo) => (
                  <div key={moodInfo.key} className={`mood-trackpad-column ${moodInfo.colClass}`}>
                    <div className="mood-guide-head">
                      {moodInfo.emoji}
                    </div>
                    <div className="mood-guide-label">{moodInfo.label}</div>
                  </div>
                ))}

                {/* Draggable Active Knob */}
                <div 
                  className="mood-knob"
                  data-component="MoodJoystickHandle"
                  style={{
                    left: `${moodX}%`,
                    top: `${100 - (moodY * 10)}%`
                  }}
                >
                  {moodEmoji}
                </div>
              </div>
            </div>

            <div className="mood-status-bar">
              Mood: <strong style={{ color: 'var(--lego-blue-dark)' }}>{moodEmotion}</strong> & <strong style={{ color: 'var(--lego-red)' }}>Energy: {moodY}/10</strong>
            </div>

            <button 
              className="lego-button green"
              style={{ width: '100%', padding: '12px', fontSize: '1.2rem', justifyContent: 'center' }}
              onClick={() => { setActivePage('timeline'); playUnlockChime(); }}
            >
              <span>Save & Play! 🚀</span>
            </button>
          </div>
        </section>
      )}

      {/* PIN Lock Screen */}
      {pinLockOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '320px', textAlign: 'center' }}>
            <div className="modal-header">
              <h2 className="modal-title">Parent Lock</h2>
              <button className="close-btn" onClick={() => setPinLockOpen(false)}>×</button>
            </div>
            
            <p style={{ fontWeight: 600, marginBottom: '8px' }}>Type PIN to open settings</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--lego-gray-dark)' }}>(Hint: Default PIN is 1234)</p>

            <div className="pin-display">
              {Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`pin-dot ${pinInput.length > i ? 'active' : ''} ${pinError ? 'red' : ''}`}
                ></div>
              ))}
            </div>

            <div className="pin-grid">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'].map(key => {
                const label = key === 'clear' ? 'C' : key === 'back' ? '⌫' : key;
                return (
                  <button
                    key={key}
                    className={`pin-key ${key === 'clear' ? 'clear' : key === 'back' ? 'back' : ''}`}
                    onClick={() => handlePinKeyPress(key)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Parent Control Dashboard Modal */}
      {parentPanelOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={24} style={{ color: 'var(--lego-red)' }} />
                <h2 className="modal-title">Parent Dashboard</h2>
              </div>
              <button className="lego-button red" onClick={handleLockOut} style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                <LogOut size={16} />
                <span>Exit Parent</span>
              </button>
            </div>

            {/* Dashboard Tabs */}
            <div className="tabs-container">
              <button 
                className={`tab-btn ${parentTab === 'tasks' ? 'active' : ''}`}
                onClick={() => setParentTab('tasks')}
              >
                📝 Routines
              </button>
              <button 
                className={`tab-btn ${parentTab === 'logs' ? 'active' : ''}`}
                onClick={() => setParentTab('logs')}
              >
                📜 Records Logs
              </button>
              <button 
                className={`tab-btn ${parentTab === 'profiles' ? 'active' : ''}`}
                onClick={() => setParentTab('profiles')}
              >
                👥 Profiles
              </button>
            </div>

            {/* TAB: Manage Tasks & Routines */}
            {parentTab === 'tasks' && (
              <div>
                <form onSubmit={handleAddTask} className="lego-card" style={{ padding: '16px', marginBottom: '20px', borderSize: '2px' }}>
                  <h3 style={{ marginBottom: '12px', textAlign: 'left' }}>Add New Routine Task</h3>
                  
                  <div className="form-group">
                    <label>Task Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Brush teeth, Tidy blocks"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Time</label>
                      <input 
                        type="time" 
                        className="form-control"
                        value={newTaskStart}
                        onChange={(e) => setNewTaskStart(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Duration (Hours)</label>
                      <select 
                        className="form-control"
                        value={newTaskDuration}
                        onChange={(e) => setNewTaskDuration(e.target.value)}
                      >
                        <option value="0.25">15 Minutes</option>
                        <option value="0.5">30 Minutes</option>
                        <option value="0.75">45 Minutes</option>
                        <option value="1.0">1 Hour</option>
                        <option value="1.5">1.5 Hours</option>
                        <option value="2.0">2 Hours</option>
                        <option value="3.0">3 Hours</option>
                      </select>
                    </div>
                  </div>

                  {/* Task type & Frequency selections */}
                  <div className="form-row">
                    <div className="form-group">
                      <label>Activity Type</label>
                      <select 
                        className="form-control"
                        value={newTaskType}
                        onChange={(e) => setNewTaskType(e.target.value)}
                      >
                        <option value="mandatory">🛡️ Mandatory</option>
                        <option value="optional">⭐ Optional</option>
                        <option value="surprise">🎁 Surprise</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Frequency</label>
                      <select 
                        className="form-control"
                        value={newTaskFreq}
                        onChange={(e) => setNewTaskFreq(e.target.value)}
                      >
                        <option value="daily">🔁 Daily</option>
                        <option value="weekly">📅 Weekly</option>
                        <option value="one-off">🚀 One-off</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Brick Color</label>
                      <div className="color-picker-grid">
                        {['red', 'blue', 'yellow', 'green', 'orange', 'purple'].map(color => (
                          <div
                            key={color}
                            className={`color-option ${color} ${newTaskColor === color ? 'active' : ''}`}
                            onClick={() => setNewTaskColor(color)}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Select Icon</label>
                      <div className="icon-picker-grid">
                        {Object.keys(IconMap).slice(0, 12).map(iconName => {
                          const PickerIcon = IconMap[iconName];
                          return (
                            <div
                              key={iconName}
                              className={`icon-option ${newTaskIcon === iconName ? 'active' : ''}`}
                              onClick={() => setNewTaskIcon(iconName)}
                            >
                              <PickerIcon size={18} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="lego-button green" style={{ width: '100%', marginTop: '10px' }}>
                    <Plus size={20} />
                    <span>Add Task to Timeline</span>
                  </button>
                </form>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3>Today's Routine Timeline</h3>
                  <button className="lego-button red" onClick={handleResetTasks} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                    Reset to Default Routines
                  </button>
                </div>

                <div className="parent-list">
                  {tasks.map(t => {
                    const TaskIcon = IconMap[t.icon] || HelpCircle;
                    return (
                      <div key={t.id} className="parent-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ 
                            background: `var(--lego-${t.color})`, 
                            padding: '6px', 
                            borderRadius: '8px', 
                            color: t.color === 'yellow' ? 'black' : 'white',
                            border: '2px solid black'
                          }}>
                            <TaskIcon size={20} />
                          </div>
                          <div>
                            <p style={{ fontWeight: 'bold' }}>
                              {t.title}
                              <span style={{ fontSize: '0.7rem', color: 'var(--lego-gray-dark)', marginLeft: '6px' }}>
                                ({t.activityType} | {t.frequency})
                              </span>
                            </p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--lego-gray-dark)' }}>
                              Start: {Math.floor(t.startTime)}:{String(Math.round((t.startTime % 1) * 60)).padStart(2, '0')} | Duration: {t.duration}h
                            </p>
                          </div>
                        </div>

                        <button 
                          className="lego-button red"
                          onClick={() => handleDeleteTask(t.id, t.title)}
                          style={{ padding: '6px 10px', boxShadow: '2px 2px 0 black' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: Records Logs */}
            {parentTab === 'logs' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3>Access & Action Log</h3>
                  <button 
                    className="lego-button red" 
                    onClick={() => { setLogs([]); playSlideWhistle(); }}
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  >
                    Clear Logs
                  </button>
                </div>

                {logs.length === 0 ? (
                  <div className="lego-card" style={{ padding: '24px', background: '#f8f9fa', textAlign: 'center' }}>
                    <p style={{ color: 'var(--lego-gray-dark)', fontWeight: 600 }}>No actions logged yet. Go complete some tasks!</p>
                  </div>
                ) : (
                  <div className="log-table-container">
                    <table className="log-table">
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Who</th>
                          <th>Task</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map(log => (
                          <tr key={log.id}>
                            <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                            <td style={{ fontWeight: 600 }}>
                              {log.user} 
                              <span style={{ fontSize: '0.7rem', color: 'var(--lego-gray-dark)', marginLeft: '4px' }}>
                                ({log.role})
                              </span>
                            </td>
                            <td style={{ fontWeight: 500 }}>{log.taskTitle}</td>
                            <td>
                              <span className={`log-tag ${
                                log.action.includes('completed') ? 'complete' :
                                log.action.includes('skipped') ? 'skip' :
                                log.action.includes('reset') ? 'reset' : 'add'
                              }`}>
                                {log.action}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Manage Profiles */}
            {parentTab === 'profiles' && (
              <div>
                <form onSubmit={handleAddProfile} className="lego-card" style={{ padding: '16px', marginBottom: '20px' }}>
                  <h3 style={{ marginBottom: '12px', textAlign: 'left' }}>Add Child Profile</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Child Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Liam, Emma"
                        value={newProfileName}
                        onChange={(e) => setNewProfileName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <input 
                        type="number" 
                        min="2"
                        max="12"
                        className="form-control"
                        value={newProfileAge}
                        onChange={(e) => setNewProfileAge(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="lego-button green" style={{ width: '100%', marginTop: '10px' }}>
                    <Plus size={20} />
                    <span>Create Profile</span>
                  </button>
                </form>

                <h3 style={{ marginBottom: '10px', textAlign: 'left' }}>Configured Profiles</h3>
                <div className="parent-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {profiles.map(p => (
                    <div 
                      key={p.id} 
                      className="parent-item"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        backgroundColor: '#fff',
                        border: '3px solid var(--lego-black)',
                        borderRadius: '8px',
                        boxShadow: '3px 3px 0 var(--lego-black)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <Users size={20} style={{ color: 'var(--lego-blue)', flexShrink: 0 }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--lego-gray-dark)', margin: 0 }}>Playful Name:</label>
                            <input 
                              type="text"
                              className="form-control"
                              style={{ 
                                padding: '4px 8px', 
                                fontSize: '0.85rem', 
                                width: '220px', 
                                border: '2px solid var(--lego-black)',
                                borderRadius: '4px'
                              }}
                              value={p.name}
                              onChange={(e) => handleUpdateProfileName(p.id, e.target.value)}
                            />
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--lego-gray-dark)', textAlign: 'left' }}>
                            Age: {p.age} | Role: <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{p.role}</span>
                          </span>
                        </div>
                      </div>
                      
                      <button 
                        type="button"
                        className="lego-button red" 
                        onClick={() => handleDeleteProfile(p.id, p.name)}
                        style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Remove Profile"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {seriesModal && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-content series-modal" style={{ maxWidth: '400px', padding: '24px', textAlign: 'center' }}>
            <div className="modal-header" style={{ borderBottom: 'none', padding: 0, justifyContent: 'center', position: 'relative' }}>
              <h2 className="modal-title" style={{ fontSize: '1.4rem' }}>⏰ {seriesModal.title}</h2>
              <button 
                className="close-btn" 
                onClick={() => { playSlideWhistle(); seriesModal.onCancel(); }}
                style={{ position: 'absolute', right: '-10px', top: '-10px' }}
              >×</button>
            </div>
            <p style={{ fontWeight: 600, margin: '20px 0', fontSize: '1.05rem', color: 'var(--lego-black)' }}>
              {seriesModal.message}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
              <button 
                className="lego-button yellow" 
                onClick={seriesModal.onConfirmEvent}
                autoFocus
                style={{ width: '100%', padding: '14px', justifyContent: 'center', fontSize: '1.1rem' }}
              >
                <span>Only Today (This Event)</span>
              </button>
              <button 
                className="lego-button blue" 
                onClick={seriesModal.onConfirmSeries}
                style={{ width: '100%', padding: '14px', justifyContent: 'center', fontSize: '1.1rem' }}
              >
                <span>All Days (Series)</span>
              </button>
              <button 
                className="lego-button gray" 
                onClick={() => { playSlideWhistle(); seriesModal.onCancel(); }}
                style={{ width: '100%', padding: '10px', justifyContent: 'center', fontSize: '0.95rem', background: '#eaeaea', border: '3px solid var(--lego-black)' }}
              >
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Particles Rendering */}
      {particles.map(p => (
        <div
          key={p.id}
          className="pop-particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            backgroundColor: p.color,
            borderRadius: p.isRound ? '50%' : '2px',
            '--dx': p.dx,
            '--dy': p.dy
          }}
        ></div>
      ))}

      {/* Component Inspector Hover Dialog */}
      {hoveredComponent && (
        <div 
          className="component-inspector-dialog"
          style={{
            left: `${hoveredComponent.x + 15}px`,
            top: `${hoveredComponent.y + 15}px`
          }}
        >
          <div className="inspector-title">🧱 Component Inspector</div>
          <div className="inspector-name">{hoveredComponent.name}</div>
          <div className="inspector-desc">
            {getComponentDescription(hoveredComponent.name)}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
