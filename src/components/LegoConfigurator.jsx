import React from 'react';
import { LegoMinifig } from './LegoMinifig';
import {
  playLegoPop,
  playSlideWhistle,
  playUnlockChime
} from '../utils/audio';

// --- Small Preview Components to draw individual Lego parts ---

// 1. Mini Head Preview
function HeadPreview({ expression }) {
  return (
    <svg viewBox="0 0 40 40" width="44" height="44" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="yellowHeadPrev" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="50%" stopColor="#FDD835" />
          <stop offset="100%" stopColor="#FBC02D" />
        </linearGradient>
      </defs>
      <rect x="7" y="8" width="26" height="26" rx="6.5" fill="url(#yellowHeadPrev)" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="14" y="3" width="12" height="5.5" rx="1" fill="url(#yellowHeadPrev)" stroke="#1a1a1a" strokeWidth="2" />
      {/* Gloss reflection */}
      <path d="M 9 10 Q 13 9, 10 32" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      {/* Expressions */}
      {expression === 'neutral' && (
        <g>
          <circle cx="15" cy="18" r="1.8" fill="#1a1a1a" />
          <circle cx="25" cy="18" r="1.8" fill="#1a1a1a" />
          <path d="M 14 24 Q 20 29, 26 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {expression === 'laughing' && (
        <g>
          <path d="M 13 18 Q 16 15, 18 18" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
          <path d="M 22 18 Q 24 15, 27 18" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
          <path d="M 14 22 Q 20 31, 26 22 Z" fill="#1a1a1a" />
          <path d="M 17 26 Q 20 30, 23 26 Q 20 26, 17 26 Z" fill="#EF5350" />
        </g>
      )}
      {expression === 'winking' && (
        <g>
          <circle cx="15" cy="18" r="1.8" fill="#1a1a1a" />
          <path d="M 22 19 Q 25 16, 27 19" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
          <path d="M 15 24 Q 20 28, 25 23" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {expression === 'sunglasses' && (
        <g>
          <path d="M 9 15 L 31 15 L 30 20 C 29 23, 27 24, 25 24 C 23 24, 22 22, 21 20 C 20 20, 20 20, 19 20 C 18 22, 17 24, 15 24 C 13 24, 11 23, 10 20 Z" fill="#212121" />
          <path d="M 11 16 L 15 16 L 13 21 L 12 21 Z" fill="#80DEEA" opacity="0.8" />
          <path d="M 22 16 L 26 16 L 24 21 L 23 21 Z" fill="#80DEEA" opacity="0.8" />
          <path d="M 15 26 Q 20 29, 25 26" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {expression === 'sad' && (
        <g>
          <circle cx="15" cy="18" r="1.8" fill="#1a1a1a" />
          <circle cx="25" cy="18" r="1.8" fill="#1a1a1a" />
          <path d="M 15 26 Q 20 21, 25 26" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

// 2. Mini Torso Preview
function TorsoPreview({ type }) {
  return (
    <svg viewBox="0 0 50 45" width="55" height="50" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="redTorsoP" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF5350" /><stop offset="100%" stopColor="#B71C1C" />
        </linearGradient>
        <linearGradient id="greenTorsoP" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#66BB6A" /><stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>
        <linearGradient id="greyTorsoP" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#CFD8DC" /><stop offset="100%" stopColor="#455A64" />
        </linearGradient>
      </defs>
      {/* Torso block */}
      <path
        d="M 14 5 L 36 5 L 41 38 L 9 38 Z"
        fill={
          type === 'red_hoodie' ? 'url(#redTorsoP)' :
          type === 'green_shirt' ? 'url(#greenTorsoP)' :
          type === 'sailor' ? 'white' :
          type === 'grey_hoodie' ? 'url(#greyTorsoP)' :
          '#1E88E5'
        }
        stroke="#1a1a1a"
        strokeWidth="2"
      />
      {/* Arm joints (little circles at sides) */}
      <circle cx="10" cy="12" r="3" fill="#FFEE58" stroke="#1a1a1a" strokeWidth="1" />
      <circle cx="40" cy="12" r="3" fill="#FFEE58" stroke="#1a1a1a" strokeWidth="1" />

      {/* Decorative lines */}
      {type === 'red_hoodie' && (
        <g>
          <line x1="25" y1="12" x2="25" y2="38" stroke="white" strokeWidth="2" />
          <path d="M 20 8 M 20 10 L 22 18 M 30 10 L 28 18" stroke="white" strokeWidth="1.5" />
          <path d="M 16 26 L 34 26 L 32 38 L 18 38 Z" fill="none" stroke="#B71C1C" strokeWidth="1.5" />
        </g>
      )}
      {type === 'green_shirt' && (
        <g>
          <line x1="25" y1="10" x2="25" y2="34" stroke="#1B5E20" strokeWidth="1.5" />
          <rect x="21" y="32" width="8" height="6" fill="#5D4037" stroke="#1a1a1a" strokeWidth="1" />
          <rect x="23" y="31" width="4" height="8" fill="#FFD54F" />
          <circle cx="18" cy="15" r="1.5" fill="none" stroke="#1B5E20" />
          <circle cx="32" cy="15" r="1.5" fill="none" stroke="#1B5E20" />
        </g>
      )}
      {type === 'sailor' && (
        <g>
          <line x1="12" y1="18" x2="38" y2="18" stroke="#1565C0" strokeWidth="2.5" />
          <line x1="10" y1="26" x2="40" y2="26" stroke="#1565C0" strokeWidth="2.5" />
          <path d="M 20 5 L 25 15 L 30 5" fill="#1565C0" stroke="#1a1a1a" strokeWidth="1" />
          <circle cx="25" cy="16" r="2" fill="#D32F2F" />
        </g>
      )}
      {type === 'grey_hoodie' && (
        <g>
          <path d="M 21 5 L 25 16 L 29 5 Z" fill="#FDD835" />
          <path d="M 21 5 L 23 15 L 23 38 M 29 5 L 27 15 L 27 38" fill="none" stroke="#455A64" strokeWidth="1.8" />
        </g>
      )}
    </svg>
  );
}

// 3. Mini Hair/Hat Preview
function HairPreview({ type }) {
  return (
    <svg viewBox="0 0 50 45" width="55" height="50" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="brownHPrev" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8D6E63" /><stop offset="100%" stopColor="#3E2723" />
        </linearGradient>
        <linearGradient id="orangeHPrev" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB74D" /><stop offset="100%" stopColor="#E65100" />
        </linearGradient>
        <linearGradient id="blondeHPrev" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF59D" /><stop offset="100%" stopColor="#F57F17" />
        </linearGradient>
      </defs>
      {/* Draw hair/hat centered */}
      {type === 'spiky' && (
        <path
          d="M 10 32 Q 8 20, 16 16 Q 14 10, 24 8 Q 30 6, 36 12 Q 42 16, 40 32 L 36 24 Q 25 26, 14 24 Z"
          fill="url(#brownHPrev)"
          stroke="#1a1a1a"
          strokeWidth="1.8"
        />
      )}
      {type === 'cap' && (
        <g>
          <path d="M 10 30 C 8 16, 20 8, 36 14 C 42 17, 42 26, 40 30 Z" fill="#E53935" stroke="#1a1a1a" strokeWidth="1.8" />
          <path d="M 36 24 Q 48 24, 49 28 Q 46 32, 34 30 Z" fill="#E53935" stroke="#1a1a1a" strokeWidth="1.8" />
          <circle cx="26" cy="11" r="2.5" fill="#B71C1C" />
        </g>
      )}
      {type === 'beanie' && (
        <g>
          <path d="M 12 30 C 10 14, 22 8, 38 14 C 40 16, 40 26, 38 30 Z" fill="#43A047" stroke="#1a1a1a" strokeWidth="1.8" />
          <rect x="10" y="26" width="30" height="6" rx="2" fill="#1B5E20" stroke="#1a1a1a" strokeWidth="1.5" />
          <circle cx="25" cy="8" r="3.5" fill="#81C784" stroke="#1a1a1a" strokeWidth="1" />
        </g>
      )}
      {type === 'ponytail' && (
        <g>
          <path d="M 11 32 C 10 20, 18 16, 26 16 C 34 16, 39 20, 39 32 C 39 32, 32 30, 26 31 C 20 30, 11 32, 11 32 Z" fill="url(#blondeHPrev)" stroke="#1a1a1a" strokeWidth="1.8" />
          <circle cx="37" cy="28" r="2" fill="#D32F2F" />
          <path d="M 38 28 C 42 28, 48 34, 46 40 C 44 42, 41 42, 40 39 Q 39 34, 38 30" fill="url(#blondeHPrev)" stroke="#1a1a1a" strokeWidth="1.5" />
        </g>
      )}
      {type === 'police' && (
        <g>
          <path d="M 8 26 L 42 26 L 39 12 Q 25 8, 11 12 Z" fill="#1E88E5" stroke="#1a1a1a" strokeWidth="1.8" />
          <path d="M 6 26 Q 25 32, 44 26 L 46 29 Q 25 36, 4 29 Z" fill="#212121" stroke="#1a1a1a" strokeWidth="1" />
          <path d="M 23 15 L 27 15 L 26 21 L 24 21 Z" fill="#FFD54F" stroke="#1a1a1a" strokeWidth="0.8" />
        </g>
      )}
      {type === 'orange' && (
        <path
          d="M 11 30 C 10 16, 20 12, 30 12 C 40 12, 40 16, 39 30 L 40 38 C 37 39, 36 34, 36 30 C 36 30, 30 28, 25 29 C 20 28, 14 30, 14 30 L 14 38 C 13 39, 10 38, 11 30 Z"
          fill="url(#orangeHPrev)"
          stroke="#1a1a1a"
          strokeWidth="1.8"
        />
      )}
    </svg>
  );
}

// 4. Mini Legs Preview
function LegsPreview({ type }) {
  return (
    <svg viewBox="0 0 50 45" width="55" height="50" style={{ overflow: 'visible' }}>
      <rect x="6" y="5" width="38" height="8" rx="1.5" fill={type === 'jeans' ? '#3E2723' : type === 'lime' ? '#C0CA33' : type === 'grey' ? '#78909C' : '#E53935'} stroke="#1a1a1a" strokeWidth="1.8" />
      {/* Left leg */}
      <rect x="6" y="14" width="17" height="25" rx="2" fill={type === 'lime' ? '#C0CA33' : type === 'grey' ? '#78909C' : type === 'jeans' ? '#1E88E5' : '#E53935'} stroke="#1a1a1a" strokeWidth="1.8" />
      <path d="M 6 32 L 23 32 L 23 39 L 6 39" fill="none" stroke="#1a1a1a" strokeWidth="1.8" />
      {/* Right leg */}
      <rect x="27" y="14" width="17" height="25" rx="2" fill={type === 'lime' ? '#C0CA33' : type === 'grey' ? '#78909C' : type === 'jeans' ? '#1E88E5' : '#E53935'} stroke="#1a1a1a" strokeWidth="1.8" />
      <path d="M 27 32 L 44 32 L 44 39 L 27 39" fill="none" stroke="#1a1a1a" strokeWidth="1.8" />
    </svg>
  );
}

// 5. Mini Accessory Preview
function AccessoryPreview({ type }) {
  return (
    <svg viewBox="0 0 40 40" width="44" height="44" style={{ overflow: 'visible' }}>
      {type === 'magnifier' && (
        <g transform="translate(20, 20) rotate(-15)">
          <line x1="0" y1="0" x2="0" y2="15" stroke="#212121" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="0" cy="-9" r="8" fill="#80DEEA" fillOpacity="0.6" stroke="#212121" strokeWidth="2.5" />
        </g>
      )}
      {type === 'wrench' && (
        <g transform="translate(20, 20) rotate(45)">
          <rect x="-2" y="-12" width="4" height="24" rx="1" fill="#E53935" stroke="#1a1a1a" strokeWidth="1" />
          <path d="M -5 -12 C -5 -16, 5 -16, 5 -12 L 2 -12 C 2 -13, -2 -13, -2 -12 Z" fill="#E53935" stroke="#1a1a1a" strokeWidth="1.2" />
          <path d="M -5 12 C -5 16, 5 16, 5 12 L 2 12 C 2 13, -2 13, -2 12 Z" fill="#E53935" stroke="#1a1a1a" strokeWidth="1.2" />
        </g>
      )}
      {type === 'compass' && (
        <g transform="translate(20, 20)">
          <circle cx="0" cy="0" r="10" fill="#FFD54F" stroke="#1a1a1a" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="7.5" fill="white" stroke="#1a1a1a" strokeWidth="0.8" />
          <path d="M 0 -6 L 1.8 0 L -1.8 0 Z" fill="#EF5350" />
          <path d="M 0 6 L 1.8 0 L -1.8 0 Z" fill="#1565C0" />
        </g>
      )}
      {type === 'mug' && (
        <g transform="translate(20, 20)">
          <path d="M 5 -5 Q 10 -5, 10 0 Q 10 5, 5 5" fill="none" stroke="#43A047" strokeWidth="2.2" />
          <rect x="-6" y="-8" width="12" height="16" rx="1.5" fill="#43A047" stroke="#1a1a1a" strokeWidth="1.5" />
          <ellipse cx="0" cy="-8" rx="6" ry="1.8" fill="#1B5E20" stroke="#1a1a1a" strokeWidth="1.5" />
        </g>
      )}
      {type === 'banana' && (
        <g transform="translate(20, 20) rotate(-30)">
          <path d="M -10 -8 C -4 -12, 8 -8, 9 4 C 10 6, 8 7, 7 5 C 6 -3, -4 -7, -8 -3 Z" fill="#FFEE58" stroke="#1a1a1a" strokeWidth="1.8" />
        </g>
      )}
    </svg>
  );
}

// 6. Glowing Stat Badges previews
function BadgePreview({ type, active, onClick }) {
  const badgeColors = {
    speed: { border: '#29B6F6', bg: '#039BE5', icon: '👟', label: 'Speed' },
    bulb: { border: '#FFEE58', bg: '#FBC02D', icon: '💡', label: 'Smart' },
    shield: { border: '#66BB6A', bg: '#2E7D32', icon: '🛡️', label: 'Shield' },
    brick: { border: '#EF5350', bg: '#D32F2F', icon: '🧱', label: 'Build' }
  };
  const { border, bg, icon, label } = badgeColors[type];

  return (
    <button
      className={`configurator-badge-btn ${type} ${active ? 'active' : ''}`}
      onClick={onClick}
      style={{
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        background: bg,
        border: `3px solid ${active ? '#fff' : '#1a1a1a'}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.6rem',
        position: 'relative',
        boxShadow: active ? `0 0 16px ${border}` : '2px 2px 0 #1a1a1a',
        transform: active ? 'scale(1.05)' : 'none',
        transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      title={label}
    >
      <span>{icon}</span>
      {active && (
        <span
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: `2px dashed ${border}`,
            top: '-5px',
            left: '-5px',
            padding: '3px',
            animation: 'spin 8s linear infinite'
          }}
        />
      )}
    </button>
  );
}


// --- Main Configurator Page ---
export function LegoConfigurator({ activeProfile, minifig, onChange, onSave }) {
  
  // Set up options matching the layout
  const headsOptions = ['laughing', 'winking', 'neutral', 'sunglasses', 'sad'];
  const torsosOptions = ['red_hoodie', 'green_shirt', 'sailor', 'grey_hoodie', 'blue_c']; // default included
  const accessoriesOptions = ['magnifier', 'wrench', 'compass', 'mug', 'banana', 'none'];
  const hairOptions = ['spiky', 'cap', 'beanie', 'ponytail', 'police', 'orange', 'none'];
  const legsOptions = ['lime', 'grey', 'jeans', 'red']; // default red

  const handleSelect = (key, val) => {
    playLegoPop();
    onChange({
      ...minifig,
      [key]: val
    });
  };

  const toggleBadge = (badgeName) => {
    playLegoPop();
    const isSelected = minifig.badges.includes(badgeName);
    const updatedBadges = isSelected
      ? minifig.badges.filter(b => b !== badgeName)
      : [...minifig.badges, badgeName];
    onChange({
      ...minifig,
      badges: updatedBadges
    });
  };

  const handleSaveClick = () => {
    playUnlockChime();
    onSave();
  };

  return (
    <section className="configurator-page-wrapper">
      <div className="configurator-container">
        
        {/* LEFT PANEL: Head, Torso, Accessory */}
        <div className="configurator-panel left">
          
          {/* Card 1: Heads Selection */}
          <div className="lego-card option-card" data-component="HeadsSelectCard">
            <h3 className="card-heading">😀 Expression Face</h3>
            <div className="options-grid scrollable">
              {headsOptions.map(headExp => (
                <button
                  key={headExp}
                  className={`option-btn ${minifig.head === headExp ? 'selected' : ''}`}
                  onClick={() => handleSelect('head', headExp)}
                >
                  <HeadPreview expression={headExp} />
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: Torso Selection */}
          <div className="lego-card option-card" data-component="TorsosSelectCard">
            <h3 className="card-heading">👕 Torso Prints</h3>
            <div className="options-grid grid-2x2">
              {torsosOptions.map(torsoStyle => (
                <button
                  key={torsoStyle}
                  className={`option-btn ${minifig.torso === torsoStyle ? 'selected' : ''}`}
                  onClick={() => handleSelect('torso', torsoStyle)}
                >
                  <TorsoPreview type={torsoStyle} />
                </button>
              ))}
            </div>
          </div>

          {/* Card 3: Accessory Selection */}
          <div className="lego-card option-card" data-component="AccessoriesSelectCard">
            <h3 className="card-heading">🍌 Held Accessories</h3>
            <div className="options-grid scrollable">
              {accessoriesOptions.map(item => (
                <button
                  key={item}
                  className={`option-btn ${minifig.accessory === item ? 'selected' : ''}`}
                  onClick={() => handleSelect('accessory', item)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  {item === 'none' ? (
                    <span style={{ fontSize: '1.8rem', height: '44px', display: 'flex', alignItems: 'center' }}>🚫</span>
                  ) : (
                    <AccessoryPreview type={item} />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* MIDDLE PREVIEW AREA */}
        <div className="configurator-preview-area">
          <div className="blueprint-circle">
            {/* Lego Baseplate Circular Pedestal */}
            <div className="lego-pedestal">
              <div className="pedestal-top"></div>
              <div className="pedestal-shadow"></div>
            </div>

            {/* Dynamic Minifigure */}
            <div className="preview-fig-wrapper">
              <LegoMinifig
                {...minifig}
                size={290}
                isWalking={false}
              />
            </div>
          </div>

          {/* Active stats display */}
          <div className="active-config-bar">
            <span>Configuring: <strong style={{ color: 'var(--lego-blue-dark)' }}>{activeProfile?.name || 'Cadet'}</strong></span>
          </div>
          
          <button
            className="lego-button green save-btn"
            onClick={handleSaveClick}
          >
            <span>Save & Apply 🚀</span>
          </button>
        </div>

        {/* RIGHT PANEL: Hair/Hat, Legs, Badges */}
        <div className="configurator-panel right">
          
          {/* Card 1: Hair & Hats Selection */}
          <div className="lego-card option-card" data-component="HairSelectCard">
            <h3 className="card-heading">🧢 Hair & Hats</h3>
            <div className="options-grid grid-2x3">
              {hairOptions.map(hairStyle => (
                <button
                  key={hairStyle}
                  className={`option-btn ${minifig.hair === hairStyle ? 'selected' : ''}`}
                  onClick={() => handleSelect('hair', hairStyle)}
                >
                  {hairStyle === 'none' ? (
                    <span style={{ fontSize: '1.8rem', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🚫</span>
                  ) : (
                    <HairPreview type={hairStyle} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: Legs Selection */}
          <div className="lego-card option-card" data-component="LegsSelectCard">
            <h3 className="card-heading">👖 Leg Pants</h3>
            <div className="options-grid scrollable">
              {legsOptions.map(legsStyle => (
                <button
                  key={legsStyle}
                  className={`option-btn ${minifig.legs === legsStyle ? 'selected' : ''}`}
                  onClick={() => handleSelect('legs', legsStyle)}
                >
                  <LegsPreview type={legsStyle} />
                </button>
              ))}
            </div>
          </div>

          {/* Card 3: Badges Selection */}
          <div className="lego-card option-card" data-component="BadgesSelectCard">
            <h3 className="card-heading">⚡ Ability Chips</h3>
            <div className="options-grid scrollable" style={{ gap: '14px', padding: '6px 0', overflowX: 'visible', justifyContent: 'center' }}>
              {['speed', 'bulb', 'shield', 'brick'].map(badgeType => (
                <BadgePreview
                  key={badgeType}
                  type={badgeType}
                  active={minifig.badges.includes(badgeType)}
                  onClick={() => toggleBadge(badgeType)}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
