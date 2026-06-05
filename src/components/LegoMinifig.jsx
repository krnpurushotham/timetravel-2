const palette = {
  red: { base: '#d8342a', dark: '#7f160f', light: '#ff6a5e' },
  blue: { base: '#145da0', dark: '#071c40', light: '#46a6f2' },
  green: { base: '#1f9d48', dark: '#0d4f24', light: '#63d987' },
  lime: { base: '#b8d42d', dark: '#697c12', light: '#e5f66b' },
  grey: { base: '#9aa6ad', dark: '#4d5960', light: '#d9e0e4' },
  yellow: { base: '#f4c51c', dark: '#b56c00', light: '#fff06a' },
  brown: { base: '#6b3c22', dark: '#2d160b', light: '#a86a42' },
  blonde: { base: '#f4d548', dark: '#a76c00', light: '#fff1a0' },
  orange: { base: '#f07a1a', dark: '#8d3000', light: '#ffb45a' },
  black: { base: '#111827', dark: '#020617', light: '#475569' },
  white: { base: '#f7fbff', dark: '#b8c7d1', light: '#ffffff' }
};

function outfitColor(torso) {
  if (torso === 'red_hoodie') return palette.red;
  if (torso === 'green_shirt') return palette.green;
  if (torso === 'sailor') return palette.white;
  if (torso === 'grey_hoodie') return palette.grey;
  return palette.blue;
}

function legColor(legs) {
  if (legs === 'lime') return palette.lime;
  if (legs === 'grey') return palette.grey;
  if (legs === 'jeans') return palette.blue;
  return palette.red;
}

function hairColor(hair) {
  if (hair === 'ponytail') return palette.blonde;
  if (hair === 'orange') return palette.orange;
  if (hair === 'cap') return palette.red;
  if (hair === 'beanie') return palette.lime;
  if (hair === 'police') return palette.blue;
  return palette.brown;
}

function Face({ head }) {
  if (head === 'laughing') {
    return (
      <g className="face-print">
        <path d="M 65 60 Q 70 55 75 60" fill="none" stroke="#111" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M 93 60 Q 98 55 103 60" fill="none" stroke="#111" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M 70 70 Q 84 91 100 70 Z" fill="#151515" />
        <path d="M 76 80 Q 84 90 94 80 Q 84 79 76 80 Z" fill="#ef5350" />
        <path d="M 72 71 L 98 71 Q 92 76 85 76 Q 78 76 72 71 Z" fill="#fff" />
      </g>
    );
  }

  if (head === 'winking') {
    return (
      <g className="face-print">
        <circle cx="68" cy="62" r="4.2" fill="#111" />
        <circle cx="66.8" cy="60.8" r="1.2" fill="#fff" />
        <path d="M 93 63 Q 99 58 105 63" fill="none" stroke="#111" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M 69 76 Q 84 86 101 73" fill="none" stroke="#111" strokeWidth="3.2" strokeLinecap="round" />
      </g>
    );
  }

  if (head === 'sunglasses') {
    return (
      <g className="face-print">
        <path d="M 56 58 L 112 58 L 109 70 C 107 77, 101 80, 96 79 C 91 78, 88 74, 86 68 L 82 68 C 80 74, 76 78, 71 79 C 66 80, 60 77, 58 70 Z" fill="#111" />
        <path d="M 62 61 L 75 61 L 68 74 L 64 74 Z" fill="#9ee7ff" opacity="0.72" />
        <path d="M 91 61 L 104 61 L 97 74 L 93 74 Z" fill="#9ee7ff" opacity="0.72" />
        <path d="M 73 87 Q 84 94 96 87" fill="none" stroke="#111" strokeWidth="3.2" strokeLinecap="round" />
      </g>
    );
  }

  if (head === 'sad') {
    return (
      <g className="face-print">
        <circle cx="68" cy="63" r="4.1" fill="#111" />
        <circle cx="100" cy="63" r="4.1" fill="#111" />
        <path d="M 60 55 L 75 50" stroke="#111" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M 93 50 L 108 55" stroke="#111" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M 70 83 Q 84 74 98 83" fill="none" stroke="#111" strokeWidth="3.2" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g className="face-print">
      <path d="M 61 54 Q 68 49 76 53" fill="none" stroke="#111" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M 92 53 Q 100 49 107 54" fill="none" stroke="#111" strokeWidth="2.3" strokeLinecap="round" />
      <circle cx="68" cy="64" r="4.1" fill="#111" />
      <circle cx="100" cy="64" r="4.1" fill="#111" />
      <circle cx="66.8" cy="62.8" r="1.2" fill="#fff" />
      <circle cx="98.8" cy="62.8" r="1.2" fill="#fff" />
      <path d="M 67 78 Q 84 91 101 78" fill="none" stroke="#111" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M 67 79 L 64 76" stroke="#111" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M 101 79 L 104 76" stroke="#111" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
}

function HairHat({ hair }) {
  if (hair === 'none') return null;
  const c = hairColor(hair);

  if (hair === 'cap') {
    return (
      <g>
        <path d="M 46 47 C 43 28, 58 16, 84 16 C 108 16, 123 29, 120 48 Z" fill="url(#capShell)" stroke="#0b1729" strokeWidth="3" />
        <ellipse cx="84" cy="17" rx="7" ry="3.4" fill={c.dark} />
        <path d="M 116 42 Q 147 42, 151 49 Q 143 56, 114 53 Z" fill="url(#capShell)" stroke="#0b1729" strokeWidth="3" />
        <path d="M 51 48 Q 84 58, 118 48 Q 84 64, 51 48" fill="#111" opacity="0.2" />
      </g>
    );
  }

  if (hair === 'police') {
    return (
      <g>
        <path d="M 40 44 Q 84 60, 128 44 L 133 50 Q 84 68, 35 50 Z" fill="#111827" stroke="#0b1729" strokeWidth="2.5" />
        <path d="M 42 43 L 36 29 Q 84 16, 132 29 L 126 43 Z" fill="url(#policeShell)" stroke="#0b1729" strokeWidth="3" />
        <path d="M 77 24 L 84 18 L 91 24 L 89 35 L 79 35 Z" fill="#f3c546" stroke="#0b1729" strokeWidth="1.7" />
      </g>
    );
  }

  if (hair === 'beanie') {
    return (
      <g>
        <path d="M 43 49 C 40 26, 56 13, 84 13 C 112 13, 128 26, 125 49 Z" fill="url(#beanieShell)" stroke="#0b1729" strokeWidth="3" />
        <rect x="40" y="42" width="88" height="14" rx="5" fill={c.dark} stroke="#0b1729" strokeWidth="2.5" />
        {[58, 70, 84, 98, 110].map(x => <line key={x} x1={x} y1="18" x2={x} y2="42" stroke={c.dark} strokeWidth="2.3" opacity="0.7" />)}
        <circle cx="84" cy="11" r="8" fill={c.light} stroke="#0b1729" strokeWidth="2" />
      </g>
    );
  }

  if (hair === 'ponytail') {
    return (
      <g>
        <path d="M 43 50 C 41 27, 58 20, 84 20 C 110 20, 127 28, 124 51 L 123 62 Q 118 65, 114 54 Q 98 51, 84 52 Q 70 51, 54 54 Q 50 65, 45 62 Z" fill="url(#blondeShell)" stroke="#0b1729" strokeWidth="3" />
        <ellipse cx="123" cy="50" rx="4" ry="8" fill="#d8342a" />
        <path d="M 125 49 C 138 51, 154 65, 147 82 C 143 90, 133 90, 130 82 C 127 73, 130 60, 125 53 Z" fill="url(#blondeShell)" stroke="#0b1729" strokeWidth="2.7" />
        <path d="M 60 31 Q 74 18, 79 34 M 86 25 Q 103 18, 110 35" fill="none" stroke="#fff4b5" strokeWidth="3" opacity="0.45" strokeLinecap="round" />
      </g>
    );
  }

  if (hair === 'orange') {
    return (
      <g>
        <path d="M 44 50 C 42 26, 59 19, 84 19 C 109 19, 126 26, 124 50 L 128 74 Q 121 81, 116 65 L 114 54 Q 100 51, 84 52 Q 68 51, 54 54 L 52 65 Q 47 81, 40 74 Z" fill="url(#orangeShell)" stroke="#0b1729" strokeWidth="3" />
        <path d="M 72 22 C 79 35, 74 43, 66 49 M 96 23 C 91 34, 95 43, 105 49" fill="none" stroke={c.dark} strokeWidth="2.4" opacity="0.7" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g>
      <path d="M 44 52 C 38 43, 42 27, 56 25 C 56 17, 68 12, 77 18 C 82 8, 99 9, 103 20 C 114 19, 126 30, 123 43 L 126 57 Q 119 62, 115 51 Q 98 54, 84 52 Q 69 54, 53 51 Q 50 62, 44 57 Z" fill="url(#brownShell)" stroke="#0b1729" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 57 31 Q 69 18, 73 29 M 79 23 Q 87 11, 93 27 M 98 25 Q 111 18, 114 34" fill="none" stroke="#b7835a" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
    </g>
  );
}

function TorsoPrint({ torso }) {
  if (torso === 'red_hoodie') {
    return (
      <g>
        <line x1="84" y1="122" x2="84" y2="190" stroke="#fff" strokeWidth="4" opacity="0.85" />
        <path d="M 71 111 Q 75 129, 80 141 M 97 111 Q 93 129, 88 141" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M 58 166 L 110 166 L 104 190 L 64 190 Z" fill="none" stroke="#861912" strokeWidth="3" />
      </g>
    );
  }

  if (torso === 'green_shirt') {
    return (
      <g>
        <path d="M 64 104 L 84 123 L 104 104" fill="none" stroke="#063f1a" strokeWidth="4" />
        <line x1="84" y1="124" x2="84" y2="184" stroke="#063f1a" strokeWidth="3" />
        <rect x="57" y="128" width="21" height="20" rx="3" fill="none" stroke="#063f1a" strokeWidth="3" />
        <rect x="91" y="128" width="21" height="20" rx="3" fill="none" stroke="#063f1a" strokeWidth="3" />
        {[138, 151, 164].map(y => <circle key={y} cx="84" cy={y} r="2.5" fill="#f4c51c" stroke="#063f1a" strokeWidth="1" />)}
        <rect x="50" y="181" width="68" height="12" fill="#5d3b23" stroke="#0b1729" strokeWidth="2" />
        <rect x="76" y="177" width="16" height="18" rx="2" fill="#f2c94c" stroke="#0b1729" strokeWidth="2" />
      </g>
    );
  }

  if (torso === 'sailor') {
    return (
      <g>
        {[122, 138, 154, 170].map(y => <line key={y} x1="47" y1={y} x2="121" y2={y} stroke="#1565c0" strokeWidth="5" />)}
        <path d="M 63 101 L 84 130 L 105 101" fill="#1565c0" stroke="#0b1729" strokeWidth="2" />
        <path d="M 67 101 L 84 122 L 101 101" fill="#fff" />
        <circle cx="84" cy="133" r="6" fill="#d8342a" stroke="#0b1729" strokeWidth="2" />
      </g>
    );
  }

  if (torso === 'grey_hoodie') {
    return (
      <g>
        <path d="M 66 101 L 84 136 L 102 101 Z" fill="url(#yellowShell)" stroke="#0b1729" strokeWidth="2" />
        <path d="M 67 101 L 76 134 L 76 190 M 101 101 L 92 134 L 92 190" fill="none" stroke="#4d5960" strokeWidth="4" />
        <path d="M 55 165 Q 67 165, 72 177 M 113 165 Q 101 165, 96 177" fill="none" stroke="#4d5960" strokeWidth="3" />
      </g>
    );
  }

  return (
    <g>
      <path d="M 66 106 Q 84 120, 102 106" fill="none" stroke="#08265a" strokeWidth="4" />
      <circle cx="92" cy="145" r="17" fill="#08265a" opacity="0.75" />
      <circle cx="92" cy="145" r="13" fill="none" stroke="#9ee7ff" strokeWidth="4" />
      <path d="M 98 136 A 10 10 0 1 0 98 154" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M 54 111 L 62 190" stroke="#6cc9ff" strokeWidth="3" opacity="0.75" />
      <path d="M 114 111 L 106 190" stroke="#6cc9ff" strokeWidth="3" opacity="0.75" />
    </g>
  );
}

function Accessory({ accessory }) {
  if (accessory === 'none') return null;

  return (
    <g transform="translate(142, 165) rotate(-11)">
      {accessory === 'magnifier' && (
        <g>
          <line x1="0" y1="0" x2="0" y2="39" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
          <circle cx="0" cy="-22" r="18" fill="#9ee7ff" fillOpacity="0.42" stroke="#111827" strokeWidth="6" />
          <path d="M -8 -31 Q -2 -36, 6 -31" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {accessory === 'wrench' && (
        <g transform="rotate(42)">
          <rect x="-5" y="-28" width="10" height="56" rx="4" fill="url(#redShell)" stroke="#0b1729" strokeWidth="3" />
          <path d="M -14 -28 C -14 -38, 14 -38, 14 -28 L 6 -28 C 5 -32, -5 -32, -6 -28 Z" fill="url(#redShell)" stroke="#0b1729" strokeWidth="3" />
        </g>
      )}
      {accessory === 'compass' && (
        <g transform="translate(0,-14)">
          <circle cx="0" cy="0" r="21" fill="url(#brassShell)" stroke="#0b1729" strokeWidth="4" />
          <circle cx="0" cy="0" r="15" fill="#fff" stroke="#0b1729" strokeWidth="2" />
          <path d="M 0 -13 L 4 0 L -4 0 Z" fill="#d8342a" />
          <path d="M 0 13 L 4 0 L -4 0 Z" fill="#145da0" />
          <circle cx="0" cy="0" r="2.3" fill="#111827" />
        </g>
      )}
      {accessory === 'mug' && (
        <g transform="translate(-5,-8) rotate(12)">
          <path d="M 11 -10 Q 24 -10, 24 0 Q 24 10, 11 10" fill="none" stroke="url(#greenShell)" strokeWidth="6" strokeLinecap="round" />
          <rect x="-12" y="-18" width="24" height="36" rx="4" fill="url(#greenShell)" stroke="#0b1729" strokeWidth="4" />
          <ellipse cx="0" cy="-18" rx="12" ry="4" fill="#0d4f24" stroke="#0b1729" strokeWidth="3" />
        </g>
      )}
      {accessory === 'banana' && (
        <g transform="rotate(-42)">
          <path d="M -22 -18 C -8 -28, 19 -18, 22 9 C 23 16, 16 18, 14 10 C 11 -6, -9 -15, -18 -8 Z" fill="#ffe85c" stroke="#0b1729" strokeWidth="4" />
          <path d="M -15 -14 Q 3 -18, 12 3" fill="none" stroke="#f2c230" strokeWidth="3" />
        </g>
      )}
    </g>
  );
}

export function LegoMinifig({
  hair = 'spiky',
  head = 'neutral',
  torso = 'blue_c',
  legs = 'red',
  accessory = 'none',
  badges = [],
  size = 180,
  isWalking = false,
  moodAction = null,
  style = {}
}) {
  const body = outfitColor(torso);
  const leg = legColor(legs);
  const hip = legs === 'jeans' ? palette.brown : leg;
  const leftLegStyle = isWalking
    ? { transform: 'rotate(6deg)', transformOrigin: '71px 234px', transition: 'transform 0.15s ease' }
    : {};
  const rightLegStyle = isWalking
    ? { transform: 'rotate(-6deg)', transformOrigin: '99px 234px', transition: 'transform 0.15s ease' }
    : {};
  const leftArmStyle = isWalking
    ? { transform: 'rotate(-7deg)', transformOrigin: '48px 122px', transition: 'transform 0.15s ease' }
    : {};
  const rightArmStyle = isWalking
    ? { transform: 'rotate(7deg)', transformOrigin: '120px 122px', transition: 'transform 0.15s ease' }
    : {};

  let characterClass = 'lego-minifig-svg realistic-minifig';
  if (moodAction === 'shake') characterClass += ' action-shake';
  if (moodAction === 'cheer') characterClass += ' action-cheer';

  return (
    <svg
      viewBox="0 0 168 300"
      width={size}
      height={size * 1.785}
      className={characterClass}
      style={{
        overflow: 'visible',
        filter: 'drop-shadow(0 18px 20px rgba(23, 48, 69, 0.32))',
        ...style
      }}
      role="img"
      aria-label="Configured Lego minifigure"
    >
      <defs>
        <linearGradient id="yellowShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={palette.yellow.light} />
          <stop offset="42%" stopColor={palette.yellow.base} />
          <stop offset="100%" stopColor={palette.yellow.dark} />
        </linearGradient>
        <linearGradient id="redShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={palette.red.light} />
          <stop offset="52%" stopColor={palette.red.base} />
          <stop offset="100%" stopColor={palette.red.dark} />
        </linearGradient>
        <linearGradient id="blueShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={palette.blue.light} />
          <stop offset="48%" stopColor={palette.blue.base} />
          <stop offset="100%" stopColor={palette.blue.dark} />
        </linearGradient>
        <linearGradient id="greenShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={palette.green.light} />
          <stop offset="52%" stopColor={palette.green.base} />
          <stop offset="100%" stopColor={palette.green.dark} />
        </linearGradient>
        <linearGradient id="limeShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={palette.lime.light} />
          <stop offset="52%" stopColor={palette.lime.base} />
          <stop offset="100%" stopColor={palette.lime.dark} />
        </linearGradient>
        <linearGradient id="greyShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={palette.grey.light} />
          <stop offset="52%" stopColor={palette.grey.base} />
          <stop offset="100%" stopColor={palette.grey.dark} />
        </linearGradient>
        <linearGradient id="brownShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={palette.brown.light} />
          <stop offset="52%" stopColor={palette.brown.base} />
          <stop offset="100%" stopColor={palette.brown.dark} />
        </linearGradient>
        <linearGradient id="blondeShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={palette.blonde.light} />
          <stop offset="52%" stopColor={palette.blonde.base} />
          <stop offset="100%" stopColor={palette.blonde.dark} />
        </linearGradient>
        <linearGradient id="orangeShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={palette.orange.light} />
          <stop offset="52%" stopColor={palette.orange.base} />
          <stop offset="100%" stopColor={palette.orange.dark} />
        </linearGradient>
        <linearGradient id="capShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#ff7368" />
          <stop offset="55%" stopColor="#df2e25" />
          <stop offset="100%" stopColor="#7f160f" />
        </linearGradient>
        <linearGradient id="policeShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#327fc4" />
          <stop offset="55%" stopColor="#145da0" />
          <stop offset="100%" stopColor="#071c40" />
        </linearGradient>
        <linearGradient id="beanieShell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#dff56b" />
          <stop offset="55%" stopColor="#b8d42d" />
          <stop offset="100%" stopColor="#697c12" />
        </linearGradient>
        <radialGradient id="headHighlight" cx="33%" cy="18%" r="62%">
          <stop offset="0%" stopColor="#fff6a8" />
          <stop offset="42%" stopColor="#f4c51c" />
          <stop offset="100%" stopColor="#c67a05" />
        </radialGradient>
        <radialGradient id="brassShell" cx="35%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fff4a3" />
          <stop offset="58%" stopColor="#e5b62c" />
          <stop offset="100%" stopColor="#a86c00" />
        </radialGradient>
        <filter id="innerGloss" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="-2" dy="-2" stdDeviation="1.2" floodColor="#ffffff" floodOpacity="0.45" />
          <feDropShadow dx="2" dy="3" stdDeviation="1.8" floodColor="#0b1729" floodOpacity="0.22" />
        </filter>
      </defs>

      {badges.includes('speed') && <circle cx="84" cy="150" r="103" fill="none" stroke="#29b6f6" strokeWidth="9" strokeOpacity="0.33" strokeDasharray="7,5" className="badge-glow-ring speed" />}
      {badges.includes('bulb') && <circle cx="84" cy="150" r="99" fill="none" stroke="#ffee58" strokeWidth="11" strokeOpacity="0.32" className="badge-glow-ring bulb" />}
      {badges.includes('shield') && <circle cx="84" cy="150" r="106" fill="none" stroke="#66bb6a" strokeWidth="8" strokeOpacity="0.36" className="badge-glow-ring shield" />}
      {badges.includes('brick') && <circle cx="84" cy="150" r="109" fill="none" stroke="#ef5350" strokeWidth="9" strokeOpacity="0.32" strokeDasharray="14,7" className="badge-glow-ring brick" />}

      <ellipse cx="84" cy="286" rx="52" ry="8" fill="rgba(15, 37, 55, 0.24)" />

      <g className="lego-legs" filter="url(#innerGloss)">
        <rect x="47" y="193" width="74" height="22" rx="4" fill={hip.base} stroke="#0b1729" strokeWidth="3" />
        <path d="M 47 193 L 121 193 L 115 206 L 53 206 Z" fill={hip.light} opacity="0.32" />
        <g style={leftLegStyle}>
          <path d="M 47 214 H 78 V 273 Q 78 281 70 281 H 43 Q 37 281 37 274 L 40 218 Q 41 214 47 214 Z" fill={leg.base} stroke="#0b1729" strokeWidth="3" />
          <path d="M 39 258 H 78 V 281 H 43 Q 37 281 37 274 Z" fill={leg.dark} opacity="0.55" />
          <path d="M 52 219 V 253" stroke={leg.light} strokeWidth="3" opacity="0.55" strokeLinecap="round" />
          {legs === 'jeans' && <path d="M 43 234 Q 55 240, 68 234 M 44 221 V 256" fill="none" stroke="#ffb45a" strokeWidth="2" opacity="0.75" />}
        </g>
        <g style={rightLegStyle}>
          <path d="M 90 214 H 121 Q 127 214 128 220 L 131 274 Q 131 281 125 281 H 98 Q 90 281 90 273 Z" fill={leg.base} stroke="#0b1729" strokeWidth="3" />
          <path d="M 90 258 H 129 L 131 274 Q 131 281 125 281 H 98 Q 90 281 90 273 Z" fill={leg.dark} opacity="0.55" />
          <path d="M 116 219 V 253" stroke={leg.light} strokeWidth="3" opacity="0.55" strokeLinecap="round" />
          {legs === 'jeans' && <path d="M 100 234 Q 113 240, 125 234 M 124 221 V 256" fill="none" stroke="#ffb45a" strokeWidth="2" opacity="0.75" />}
        </g>
      </g>

      <g className="lego-arms" filter="url(#innerGloss)">
        <g style={leftArmStyle}>
          <path d="M 51 103 C 38 111, 25 138, 21 160 C 20 170, 28 176, 36 171 C 45 165, 54 143, 61 121 Z" fill={body.base} stroke="#0b1729" strokeWidth="3" />
          <path d="M 38 113 C 31 126, 25 143, 23 158" fill="none" stroke={body.light} strokeWidth="4" opacity="0.45" strokeLinecap="round" />
          <path d="M 25 167 C 20 169, 16 176, 17 183 C 18 191, 27 194, 34 189 C 39 185, 38 177, 34 174 M 18 183 C 12 185, 9 193, 14 199 C 20 205, 32 200, 34 190" fill="none" stroke="url(#yellowShell)" strokeWidth="8" strokeLinecap="round" />
        </g>
        <g style={rightArmStyle}>
          <path d="M 117 103 C 130 111, 143 138, 147 160 C 148 170, 140 176, 132 171 C 123 165, 114 143, 107 121 Z" fill={body.base} stroke="#0b1729" strokeWidth="3" />
          <path d="M 130 113 C 137 126, 143 143, 145 158" fill="none" stroke={body.light} strokeWidth="4" opacity="0.45" strokeLinecap="round" />
          <path d="M 143 167 C 148 169, 152 176, 151 183 C 150 191, 141 194, 134 189 C 129 185, 130 177, 134 174 M 150 183 C 156 185, 159 193, 154 199 C 148 205, 136 200, 134 190" fill="none" stroke="url(#yellowShell)" strokeWidth="8" strokeLinecap="round" />
        </g>
      </g>

      <g className="lego-torso" filter="url(#innerGloss)">
        <path d="M 54 100 H 114 L 124 194 H 44 Z" fill={body.base} stroke="#0b1729" strokeWidth="3.2" strokeLinejoin="round" />
        <path d="M 56 103 H 112 L 118 123 Q 84 135 50 123 Z" fill={body.light} opacity="0.22" />
        <path d="M 48 190 H 120 L 124 194 H 44 Z" fill={body.dark} opacity="0.35" />
        <TorsoPrint torso={torso} />
      </g>

      <g className="lego-neck">
        <rect x="70" y="88" width="28" height="14" rx="3" fill="url(#yellowShell)" stroke="#0b1729" strokeWidth="3" />
      </g>

      <g className="lego-head" filter="url(#innerGloss)">
        <ellipse cx="84" cy="38" rx="38" ry="10" fill="#ffe168" stroke="#0b1729" strokeWidth="3" />
        <rect x="46" y="38" width="76" height="58" rx="15" fill="url(#headHighlight)" stroke="#0b1729" strokeWidth="3" />
        <ellipse cx="84" cy="96" rx="34" ry="9" fill="#cc8008" opacity="0.42" />
        <rect x="67" y="23" width="34" height="16" rx="4" fill="url(#headHighlight)" stroke="#0b1729" strokeWidth="3" />
        <ellipse cx="84" cy="23" rx="16" ry="5" fill="#fff3a0" opacity="0.8" />
        <path d="M 53 45 C 57 41, 62 42, 59 90" fill="none" stroke="#fff9b5" strokeWidth="5" opacity="0.4" strokeLinecap="round" />
        <Face head={head} />
      </g>

      <g className="lego-hair-hat">
        <HairHat hair={hair} />
      </g>

      <Accessory accessory={accessory} />
    </svg>
  );
}
