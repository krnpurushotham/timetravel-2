// --- Gradients and Styling definitions ---
// We define SVG gradients inline so they can be referenced inside the paths.
// To avoid ID collisions between multiple Minifigs, we can use static ids
// since they are global in the document, or use unique prefixes if needed.
// However, standard unique names for parts will work perfectly.

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
  // Determine if walking state should trigger keyframe swings
  // We can animate leg rotation and arm rotation using CSS inline transforms
  const leftLegStyle = isWalking 
    ? { transform: 'rotate(20deg)', transformOrigin: '80px 144px', transition: 'transform 0.15s ease' }
    : {};
  const rightLegStyle = isWalking 
    ? { transform: 'rotate(-20deg)', transformOrigin: '80px 144px', transition: 'transform 0.15s ease' }
    : {};
    
  const leftArmStyle = isWalking
    ? { transform: 'rotate(-15deg)', transformOrigin: '58px 80px', transition: 'transform 0.15s ease' }
    : {};
  const rightArmStyle = isWalking
    ? { transform: 'rotate(15deg)', transformOrigin: '102px 80px', transition: 'transform 0.15s ease' }
    : {};

  // Custom action animation triggers
  let characterClass = 'lego-minifig-svg';
  if (moodAction === 'shake') characterClass += ' action-shake';
  if (moodAction === 'cheer') characterClass += ' action-cheer';

  return (
    <svg
      viewBox="0 0 160 220"
      width={size}
      height={size * 1.375}
      className={characterClass}
      style={{
        overflow: 'visible',
        filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.15))',
        ...style
      }}
    >
      <defs>
        {/* --- Global Plastic Gradients --- */}
        {/* Yellow Plastic for head & hands */}
        <linearGradient id="yellowPlastic" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="30%" stopColor="#FDD835" />
          <stop offset="70%" stopColor="#FBC02D" />
          <stop offset="100%" stopColor="#F57F17" />
        </linearGradient>
        
        {/* Red Plastic */}
        <linearGradient id="redPlastic" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF5350" />
          <stop offset="30%" stopColor="#E53935" />
          <stop offset="70%" stopColor="#D32F2F" />
          <stop offset="100%" stopColor="#B71C1C" />
        </linearGradient>

        {/* Blue Plastic */}
        <linearGradient id="bluePlastic" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#42A5F5" />
          <stop offset="30%" stopColor="#1E88E5" />
          <stop offset="70%" stopColor="#1565C0" />
          <stop offset="100%" stopColor="#0D47A1" />
        </linearGradient>

        {/* Green Plastic */}
        <linearGradient id="greenPlastic" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#66BB6A" />
          <stop offset="30%" stopColor="#43A047" />
          <stop offset="70%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>

        {/* Lime Green Plastic */}
        <linearGradient id="limePlastic" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4E157" />
          <stop offset="30%" stopColor="#C0CA33" />
          <stop offset="70%" stopColor="#AFB42B" />
          <stop offset="100%" stopColor="#827717" />
        </linearGradient>

        {/* Grey Plastic */}
        <linearGradient id="greyPlastic" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#CFD8DC" />
          <stop offset="30%" stopColor="#90A4AE" />
          <stop offset="70%" stopColor="#78909C" />
          <stop offset="100%" stopColor="#455A64" />
        </linearGradient>

        {/* Brown Hair Plastic */}
        <linearGradient id="brownHair" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8D6E63" />
          <stop offset="50%" stopColor="#5D4037" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>

        {/* Orange Bob Hair */}
        <linearGradient id="orangeHair" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB74D" />
          <stop offset="50%" stopColor="#FB8C00" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>

        {/* Blonde Hair */}
        <linearGradient id="blondeHair" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF59D" />
          <stop offset="50%" stopColor="#FBC02D" />
          <stop offset="100%" stopColor="#F57F17" />
        </linearGradient>

        {/* Stud / Top Highlights */}
        <linearGradient id="studHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Metallic Compass Brass */}
        <radialGradient id="brassComp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFEE58" />
          <stop offset="70%" stopColor="#FBC02D" />
          <stop offset="100%" stopColor="#F57F17" />
        </radialGradient>
      </defs>

      {/* --- BADGE GLOWS (Background layer) --- */}
      {badges.includes('speed') && (
        <circle cx="80" cy="110" r="85" fill="none" stroke="#29B6F6" strokeWidth="8" strokeOpacity="0.4" strokeDasharray="6,4" className="badge-glow-ring speed" />
      )}
      {badges.includes('bulb') && (
        <circle cx="80" cy="110" r="82" fill="none" stroke="#FFEE58" strokeWidth="10" strokeOpacity="0.4" className="badge-glow-ring bulb" />
      )}
      {badges.includes('shield') && (
        <circle cx="80" cy="110" r="88" fill="none" stroke="#66BB6A" strokeWidth="6" strokeOpacity="0.5" className="badge-glow-ring shield" />
      )}
      {badges.includes('brick') && (
        <circle cx="80" cy="110" r="90" fill="none" stroke="#EF5350" strokeWidth="8" strokeOpacity="0.4" strokeDasharray="12,6" className="badge-glow-ring brick" />
      )}

      {/* --- LEGS & HIPS CONNECTOR --- */}
      <g className="lego-legs">
        {/* Hips connector bar */}
        <rect
          x="50"
          y="130"
          width="60"
          height="14"
          rx="3"
          fill={legs === 'jeans' ? '#3E2723' : legs === 'lime' ? 'url(#limePlastic)' : legs === 'grey' ? 'url(#greyPlastic)' : 'url(#redPlastic)'}
          stroke="#1a1a1a"
          strokeWidth="2.5"
        />

        {/* Left Leg */}
        <g style={leftLegStyle} className="left-leg">
          <path
            d="M 50 144 L 76 144 L 76 194 C 76 197, 73 200, 70 200 L 46 200 C 43 200, 42 196, 42 192 L 44 146 Z"
            fill={legs === 'lime' ? 'url(#limePlastic)' : legs === 'grey' ? 'url(#greyPlastic)' : legs === 'jeans' ? 'url(#bluePlastic)' : 'url(#redPlastic)'}
            stroke="#1a1a1a"
            strokeWidth="2.5"
          />
          {/* Foot cutout detail */}
          <path
            d="M 42 184 L 42 192 C 42 196, 43 200, 46 200 L 76 200 L 76 184 Z"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
          />
          {/* Jeans detailing (Belt loop / orange seams) */}
          {legs === 'jeans' && (
            <>
              <line x1="46" y1="150" x2="46" y2="180" stroke="#FFB74D" strokeWidth="1.5" strokeDasharray="2,2" />
              <path d="M 44 162 Q 52 165, 60 162" fill="none" stroke="#FFB74D" strokeWidth="1.2" />
            </>
          )}
        </g>

        {/* Right Leg */}
        <g style={rightLegStyle} className="right-leg">
          <path
            d="M 84 144 L 110 144 L 116 146 L 118 192 C 118 196, 117 200, 114 200 L 90 200 C 87 200, 84 197, 84 194 Z"
            fill={legs === 'lime' ? 'url(#limePlastic)' : legs === 'grey' ? 'url(#greyPlastic)' : legs === 'jeans' ? 'url(#bluePlastic)' : 'url(#redPlastic)'}
            stroke="#1a1a1a"
            strokeWidth="2.5"
          />
          {/* Foot cutout detail */}
          <path
            d="M 84 184 L 84 200 L 114 200 C 117 200, 118 196, 118 192 L 118 184 Z"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
          />
          {/* Jeans detailing */}
          {legs === 'jeans' && (
            <>
              <line x1="114" y1="150" x2="114" y2="180" stroke="#FFB74D" strokeWidth="1.5" strokeDasharray="2,2" />
              <path d="M 100 162 Q 108 165, 116 162" fill="none" stroke="#FFB74D" strokeWidth="1.2" />
            </>
          )}
        </g>
      </g>

      {/* --- ARMS --- */}
      {/* Left Arm & Hand */}
      <g style={leftArmStyle} className="left-arm">
        {/* Left Arm body */}
        <path
          d="M 50 78 C 44 86, 30 102, 26 114 C 24 120, 27 125, 33 123 C 38 121, 46 112, 52 102 C 55 96, 55 86, 52 78 Z"
          fill={
            torso === 'red_hoodie' ? 'url(#redPlastic)' :
            torso === 'green_shirt' ? 'url(#greenPlastic)' :
            torso === 'sailor' ? 'white' :
            torso === 'grey_hoodie' ? 'url(#greyPlastic)' :
            'url(#bluePlastic)'
          }
          stroke="#1a1a1a"
          strokeWidth="2.5"
        />
        {/* Sailor stripes sleeve lines */}
        {torso === 'sailor' && (
          <path d="M 28 110 L 33 113 M 31 104 L 37 107" stroke="#1565C0" strokeWidth="2.5" />
        )}
        {/* Left Hand (Yellow hook) */}
        <path
          d="M 23 118 C 22 120, 20 124, 21 127 C 22 131, 26 132, 29 130 C 31 128, 30 124, 29 122 M 22 126 C 18 128, 16 133, 19 137 C 22 140, 28 138, 29 133"
          fill="none"
          stroke="url(#yellowPlastic)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* Right Arm & Hand */}
      <g style={rightArmStyle} className="right-arm">
        {/* Right Arm body */}
        <path
          d="M 110 78 C 116 86, 130 102, 134 114 C 136 120, 133 125, 127 123 C 122 121, 114 112, 108 102 C 105 96, 105 86, 108 78 Z"
          fill={
            torso === 'red_hoodie' ? 'url(#redPlastic)' :
            torso === 'green_shirt' ? 'url(#greenPlastic)' :
            torso === 'sailor' ? 'white' :
            torso === 'grey_hoodie' ? 'url(#greyPlastic)' :
            'url(#bluePlastic)'
          }
          stroke="#1a1a1a"
          strokeWidth="2.5"
        />
        {/* Sailor stripes sleeve lines */}
        {torso === 'sailor' && (
          <path d="M 132 110 L 127 113 M 129 104 L 123 107" stroke="#1565C0" strokeWidth="2.5" />
        )}
        {/* Right Hand (Yellow hook) */}
        <path
          d="M 137 118 C 138 120, 140 124, 139 127 C 138 131, 134 132, 131 130 C 129 128, 130 124, 131 122 M 138 126 C 142 128, 144 133, 141 137 C 138 140, 132 138, 131 133"
          fill="none"
          stroke="url(#yellowPlastic)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* --- TORSO --- */}
      <g className="lego-torso">
        {/* Standard Lego Trapezoid Torso */}
        <path
          d="M 58 70 L 102 70 L 110 130 L 50 130 Z"
          fill={
            torso === 'red_hoodie' ? 'url(#redPlastic)' :
            torso === 'green_shirt' ? 'url(#greenPlastic)' :
            torso === 'sailor' ? 'white' :
            torso === 'grey_hoodie' ? 'url(#greyPlastic)' :
            'url(#bluePlastic)'
          }
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Torso specular reflections (diagonal gloss line) */}
        <path
          d="M 62 73 L 72 73 L 64 126 L 54 126 Z"
          fill="white"
          opacity="0.12"
        />

        {/* --- Torso Print Overlays --- */}

        {/* DEFAULT Cadet Blue Torso */}
        {torso === 'blue_c' && (
          <g>
            {/* Darker blue contour line on chest */}
            <path d="M 68 76 Q 80 84, 92 76" fill="none" stroke="#0D47A1" strokeWidth="2" />
            {/* Cadet Space "C" Badge */}
            <circle cx="88" cy="94" r="11" fill="#0D47A1" opacity="0.8" />
            <circle cx="88" cy="94" r="9" fill="none" stroke="#80D8FF" strokeWidth="2.5" />
            <path d="M 92 90 A 6 6 0 1 0 92 98" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* RED HOODIE */}
        {torso === 'red_hoodie' && (
          <g>
            {/* White zipper down center */}
            <line x1="80" y1="82" x2="80" y2="130" stroke="#FFFFFF" strokeWidth="2.5" />
            {/* Zipper pull tab */}
            <rect x="78" y="78" width="4" height="6" rx="1" fill="#CFD8DC" stroke="#1a1a1a" strokeWidth="1" />
            {/* White drawstring cords */}
            <path d="M 72 76 Q 71 88, 74 96" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 88 76 Q 89 88, 86 96" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="74" cy="97" r="1.5" fill="#EF5350" />
            <circle cx="86" cy="97" r="1.5" fill="#EF5350" />
            {/* Kangaroo pocket */}
            <path d="M 62 110 L 98 110 L 94 130 L 66 130 Z" fill="none" stroke="#B71C1C" strokeWidth="2" />
            <path d="M 68 110 L 64 120 M 92 110 L 96 120" stroke="#B71C1C" strokeWidth="2" />
          </g>
        )}

        {/* GREEN SHIRT */}
        {torso === 'green_shirt' && (
          <g>
            {/* Neck Collar */}
            <path d="M 70 70 L 80 80 L 90 70" fill="none" stroke="#1B5E20" strokeWidth="2.5" />
            {/* Shirt seams down center */}
            <line x1="80" y1="80" x2="80" y2="122" stroke="#1B5E20" strokeWidth="2" />
            {/* Pocket templates */}
            <rect x="61" y="82" width="12" height="12" rx="1.5" fill="none" stroke="#1B5E20" strokeWidth="2" />
            <rect x="87" y="82" width="12" height="12" rx="1.5" fill="none" stroke="#1B5E20" strokeWidth="2" />
            <circle cx="67" cy="85" r="1" fill="#E0F2F1" />
            <circle cx="93" cy="85" r="1" fill="#E0F2F1" />
            {/* Buttons */}
            <circle cx="80" cy="88" r="1.5" fill="#E0F2F1" stroke="#1B5E20" strokeWidth="0.5" />
            <circle cx="80" cy="98" r="1.5" fill="#E0F2F1" stroke="#1B5E20" strokeWidth="0.5" />
            <circle cx="80" cy="108" r="1.5" fill="#E0F2F1" stroke="#1B5E20" strokeWidth="0.5" />
            {/* Belt */}
            <rect x="51" y="120" width="58" height="9" fill="#5D4037" stroke="#1a1a1a" strokeWidth="1.5" />
            {/* Gold buckle */}
            <rect x="74" y="118" width="12" height="13" fill="#FFD54F" stroke="#1a1a1a" strokeWidth="1.5" />
            <rect x="77" y="121" width="6" height="7" fill="#5D4037" />
          </g>
        )}

        {/* SAILOR STRIPES */}
        {torso === 'sailor' && (
          <g>
            {/* Sailor blue stripes */}
            <line x1="56" y1="84" x2="104" y2="84" stroke="#1565C0" strokeWidth="3" />
            <line x1="54" y1="96" x2="106" y2="96" stroke="#1565C0" strokeWidth="3" />
            <line x1="52" y1="108" x2="108" y2="108" stroke="#1565C0" strokeWidth="3" />
            <line x1="51" y1="120" x2="109" y2="120" stroke="#1565C0" strokeWidth="3" />
            {/* Blue sailor bib */}
            <path d="M 68 70 L 80 88 L 92 70" fill="#1565C0" stroke="#1a1a1a" strokeWidth="1.5" />
            <path d="M 70 70 L 80 84 L 90 70" fill="white" />
            {/* Red scarf knot */}
            <circle cx="80" cy="89" r="3.5" fill="#D32F2F" stroke="#1a1a1a" strokeWidth="1.5" />
            <path d="M 78 91 L 74 100 L 79 101 Z" fill="#D32F2F" stroke="#1a1a1a" strokeWidth="1" />
            <path d="M 82 91 L 86 100 L 81 101 Z" fill="#D32F2F" stroke="#1a1a1a" strokeWidth="1" />
          </g>
        )}

        {/* GREY HOODIE */}
        {torso === 'grey_hoodie' && (
          <g>
            {/* Yellow Inner T-shirt triangle */}
            <path d="M 70 70 L 80 92 L 90 70 Z" fill="url(#yellowPlastic)" stroke="#1a1a1a" strokeWidth="1.5" />
            {/* T-shirt neck collar line */}
            <path d="M 72 74 Q 80 80, 88 74" fill="none" stroke="#F57F17" strokeWidth="1.5" />
            {/* Open grey jacket lapels */}
            <path d="M 70 70 L 75 90 L 75 130 M 90 70 L 85 90 L 85 130" fill="none" stroke="#455A64" strokeWidth="2.5" />
            {/* Left and right pockets */}
            <path d="M 58 112 Q 66 112, 70 120" fill="none" stroke="#455A64" strokeWidth="1.8" />
            <path d="M 102 112 Q 94 112, 90 120" fill="none" stroke="#455A64" strokeWidth="1.8" />
          </g>
        )}
      </g>

      {/* --- NECK --- */}
      <rect
        x="72"
        y="66"
        width="16"
        height="5"
        fill="url(#yellowPlastic)"
        stroke="#1a1a1a"
        strokeWidth="2.5"
      />

      {/* --- HEAD --- */}
      <g className="lego-head">
        {/* Head Cylindrical Body */}
        <rect
          x="62"
          y="32"
          width="36"
          height="35"
          rx="8"
          ry="8"
          fill="url(#yellowPlastic)"
          stroke="#1a1a1a"
          strokeWidth="2.5"
        />

        {/* Head Stud on top */}
        <rect
          x="71"
          y="25"
          width="18"
          height="8"
          rx="1.5"
          fill="url(#yellowPlastic)"
          stroke="#1a1a1a"
          strokeWidth="2.5"
        />
        {/* Stud Glossy Overlay */}
        <rect
          x="72"
          y="26"
          width="16"
          height="3"
          rx="1"
          fill="url(#studHighlight)"
        />

        {/* Head Glossy Reflection Overlay (real plastic shine) */}
        <path
          d="M 65 35 Q 70 34, 66 64 C 64 64, 63 60, 63 56 Z"
          fill="white"
          opacity="0.22"
        />

        {/* --- Facial Print Expression Overlays --- */}

        {/* NEUTRAL SMILEY (Classic Lego) */}
        {head === 'neutral' && (
          <g>
            {/* Eyes */}
            <circle cx="72" cy="46" r="2.5" fill="#1a1a1a" />
            <circle cx="88" cy="46" r="2.5" fill="#1a1a1a" />
            <circle cx="71.5" cy="45" r="0.8" fill="white" />
            <circle cx="87.5" cy="45" r="0.8" fill="white" />
            {/* Eyebrows */}
            <path d="M 68 40 Q 72 38, 76 40" fill="none" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 84 40 Q 88 38, 92 40" fill="none" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" />
            {/* Classic smiley mouth */}
            <path d="M 70 54 Q 80 62, 90 54" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
            {/* Cheek ticks */}
            <path d="M 70 55 L 68 53" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 90 55 L 92 53" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}

        {/* LAUGHING */}
        {head === 'laughing' && (
          <g>
            {/* Squinty laughing eyes */}
            <path d="M 69 47 Q 73 43, 76 47" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 84 47 Q 87 43, 91 47" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
            {/* Raised happy eyebrows */}
            <path d="M 67 39 Q 72 35, 77 38" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 83 38 Q 88 35, 93 39" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
            {/* Open laughing mouth */}
            <path d="M 70 51 Q 80 65, 90 51 Z" fill="#1a1a1a" />
            {/* Red tongue inside */}
            <path d="M 74 57 Q 80 64, 86 57 Q 80 57, 74 57 Z" fill="#EF5350" />
            {/* White teeth band at top */}
            <path d="M 72 52 L 88 52 C 86 54, 84 54, 80 54 C 76 54, 74 54, 72 52 Z" fill="#FFFFFF" />
          </g>
        )}

        {/* WINKING */}
        {head === 'winking' && (
          <g>
            {/* Left Eye (Normal) */}
            <circle cx="71" cy="46" r="2.5" fill="#1a1a1a" />
            <circle cx="70.5" cy="45" r="0.8" fill="white" />
            {/* Right Eye (Winking squint) */}
            <path d="M 85 47 Q 88 44, 91 47" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
            {/* Left raised / Right winking eyebrows */}
            <path d="M 67 39 Q 72 36, 76 39" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 84 41 Q 88 42, 92 40" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
            {/* Sly smirk mouth */}
            <path d="M 71 55 Q 81 60, 89 53" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 71 56 L 69 54" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 89 54 L 91 52" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}

        {/* SUNGLASSES */}
        {head === 'sunglasses' && (
          <g>
            {/* Sunglasses black body */}
            <path d="M 63 41 L 97 41 L 95 49 C 94 53, 90 55, 87 55 C 84 55, 82 52, 81 49 C 80 49, 80 49, 79 49 C 78 52, 76 55, 73 55 C 70 55, 66 53, 65 49 Z" fill="#212121" stroke="#1a1a1a" strokeWidth="1" />
            {/* Cyan glare streaks */}
            <path d="M 66 43 L 74 43 L 70 51 L 68 51 Z" fill="#80DEEA" opacity="0.8" />
            <path d="M 82 43 L 90 43 L 86 51 L 84 51 Z" fill="#80DEEA" opacity="0.8" />
            {/* Glasses frame side wraps */}
            <rect x="61.5" y="42" width="2" height="4" fill="#212121" />
            <rect x="96.5" y="42" width="2" height="4" fill="#212121" />
            {/* Confident smirk smile */}
            <path d="M 72 56 Q 80 60, 88 56" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {/* SAD */}
        {head === 'sad' && (
          <g>
            {/* Dot eyes */}
            <circle cx="72" cy="46" r="2.5" fill="#1a1a1a" />
            <circle cx="88" cy="46" r="2.5" fill="#1a1a1a" />
            {/* Slanted worried eyebrows */}
            <path d="M 67 42 L 75 39" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 85 39 L 93 42" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
            {/* Sad downturned mouth */}
            <path d="M 72 58 Q 80 52, 88 58" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" />
            {/* Frown corner ticks */}
            <path d="M 72 57 L 70 59" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 88 57 L 90 59" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* --- HAIR / HATS (Sits on top of head, covering the stud if needed) --- */}
      <g className="lego-hair-hat">
        {/* SPIKY BROWN HAIR */}
        {hair === 'spiky' && (
          <g>
            {/* Back base of hair */}
            <path d="M 62 36 C 60 30, 64 22, 74 20 C 76 20, 84 20, 86 20 C 96 22, 100 30, 98 36 L 98 42 L 62 42 Z" fill="url(#brownHair)" />
            {/* Spiky crown paths */}
            <path
              d="M 62 38 
                 C 58 35, 59 26, 64 26 
                 C 63 21, 68 18, 72 20 
                 C 74 15, 80 13, 84 16
                 C 86 12, 93 14, 95 19 
                 C 98 18, 101 22, 100 28 
                 C 103 30, 101 37, 98 38 
                 L 99 44 Q 96 46, 95 42
                 Q 80 43, 65 42 Q 64 45, 61 44 Z"
              fill="url(#brownHair)"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Lighter highlight spikes inside */}
            <path
              d="M 67 27 Q 73 21, 74 25 M 78 20 Q 82 16, 83 22 M 87 19 Q 91 16, 92 21"
              fill="none"
              stroke="#A1887F"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* RED BASEBALL CAP */}
        {hair === 'cap' && (
          <g>
            {/* Cap dome */}
            <path
              d="M 61 36 C 60 26, 68 18, 80 18 C 92 18, 100 26, 99 36 Z"
              fill="url(#redPlastic)"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
            {/* Top button */}
            <ellipse cx="80" cy="18" rx="3.5" ry="1.5" fill="#B71C1C" stroke="#1a1a1a" strokeWidth="1" />
            {/* Cap Brim / Visor (sticking out to the right/front) */}
            <path
              d="M 97 34 Q 115 34, 117 38 Q 115 42, 97 40 Z"
              fill="url(#redPlastic)"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Brim shadow cast on forehead */}
            <path
              d="M 65 36 Q 80 40, 95 36 Q 80 44, 65 36"
              fill="black"
              opacity="0.18"
            />
          </g>
        )}

        {/* GREEN KNITTED BEANIE */}
        {hair === 'beanie' && (
          <g>
            {/* Beanie main cap */}
            <path
              d="M 60 38 C 58 24, 66 16, 80 16 C 94 16, 102 24, 100 38 Z"
              fill="url(#greenPlastic)"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
            {/* Folded rim at bottom */}
            <rect
              x="58"
              y="34"
              width="44"
              height="8"
              rx="2.5"
              fill="#1B5E20"
              stroke="#1a1a1a"
              strokeWidth="1.8"
            />
            {/* Knitted ribbed lines */}
            <line x1="68" y1="18" x2="68" y2="34" stroke="#1B5E20" strokeWidth="1.5" />
            <line x1="74" y1="17" x2="74" y2="34" stroke="#1B5E20" strokeWidth="1.5" />
            <line x1="80" y1="16" x2="80" y2="34" stroke="#1B5E20" strokeWidth="1.5" />
            <line x1="86" y1="17" x2="86" y2="34" stroke="#1B5E20" strokeWidth="1.5" />
            <line x1="92" y1="18" x2="92" y2="34" stroke="#1B5E20" strokeWidth="1.5" />
            {/* Fluffy pompom on top */}
            <circle cx="80" cy="14" r="4.5" fill="#81C784" stroke="#1a1a1a" strokeWidth="1.5" />
          </g>
        )}

        {/* BLONDE PONYTAIL */}
        {hair === 'ponytail' && (
          <g>
            {/* Side sweeps */}
            <path
              d="M 61 38 C 60 25, 68 20, 80 20 C 92 20, 100 25, 99 38 L 99 44 C 99 44, 96 44, 94 40 C 92 36, 85 36, 80 37 C 75 36, 68 36, 66 40 C 64 44, 61 44, 61 44 Z"
              fill="url(#blondeHair)"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
            {/* Hairband */}
            <ellipse cx="98" cy="36" rx="2" ry="4" fill="#E53935" />
            {/* Ponytail swoop */}
            <path
              d="M 99 36 C 104 36, 114 42, 111 52 C 109 56, 105 57, 103 54 C 101 51, 101 44, 99 40 Z"
              fill="url(#blondeHair)"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* BLUE POLICE OFFICER HAT */}
        {hair === 'police' && (
          <g>
            {/* Visor / Brim (front peak) */}
            <path d="M 57 32 Q 80 38, 103 32 L 105 35 Q 80 43, 55 35 Z" fill="#212121" stroke="#1a1a1a" strokeWidth="1.8" />
            {/* Cap dome */}
            <path
              d="M 59 32 L 54 24 Q 80 18, 106 24 L 101 32 Z"
              fill="url(#bluePlastic)"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Gold Badge in Center */}
            <path d="M 80 21 L 83 24 L 82 28 L 78 28 L 77 24 Z" fill="#FFD54F" stroke="#1a1a1a" strokeWidth="1" />
            <circle cx="80" cy="25" r="1" fill="#F57F17" />
            {/* Black strap across bottom */}
            <rect x="58" y="30" width="44" height="2.5" fill="#212121" />
          </g>
        )}

        {/* ORANGE SHORT HAIR (Bob Cut) */}
        {hair === 'orange' && (
          <g>
            {/* Bob curves covering ears */}
            <path
              d="M 61 36 C 60 22, 70 18, 80 18 C 90 18, 100 22, 99 36 L 100 48 C 100 52, 97 50, 96 46 L 96 40 C 96 40, 91 38, 80 39 C 69 38, 64 40, 64 40 L 64 46 C 63 50, 60 52, 60 48 Z"
              fill="url(#orangeHair)"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Fringe details */}
            <path d="M 72 19 C 74 24, 76 27, 72 29" fill="none" stroke="#E65100" strokeWidth="1.5" />
            <path d="M 88 19 C 86 24, 84 27, 88 29" fill="none" stroke="#E65100" strokeWidth="1.5" />
          </g>
        )}
      </g>

      {/* --- ACCESSORIES (Held in Right Hand) --- */}
      {/* Right Hand C-hook is positioned around x=135, y=127 in our model.
          We render the accessory centered and rotated to look like it is held. */}
      {accessory !== 'none' && (
        <g transform="translate(133, 127) rotate(-15)">
          {/* MAGNIFYING GLASS */}
          {accessory === 'magnifier' && (
            <g>
              {/* Handle */}
              <line x1="0" y1="0" x2="0" y2="28" stroke="#212121" strokeWidth="4.5" strokeLinecap="round" />
              {/* Silver shaft */}
              <line x1="0" y1="0" x2="0" y2="6" stroke="#90A4AE" strokeWidth="4.5" />
              {/* Circle frame */}
              <circle cx="0" cy="-15" r="13" fill="none" stroke="#212121" strokeWidth="4" />
              {/* Glass Lens (translucent cyan) */}
              <circle cx="0" cy="-15" r="11" fill="#80DEEA" fillOpacity="0.5" />
              {/* Glare line on lens */}
              <path d="M -6 -21 Q -2 -24, 2 -21" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}

          {/* RED WRENCH */}
          {accessory === 'wrench' && (
            <g transform="rotate(45)">
              {/* Shaft */}
              <rect x="-3.5" y="-18" width="7" height="36" rx="2" fill="url(#redPlastic)" stroke="#1a1a1a" strokeWidth="1.8" />
              {/* Top jaw C-shape */}
              <path d="M -9 -18 C -9 -24, 9 -24, 9 -18 L 4 -18 C 4 -20, -4 -20, -4 -18 Z" fill="url(#redPlastic)" stroke="#1a1a1a" strokeWidth="1.8" />
              {/* Bottom jaw C-shape */}
              <path d="M -9 18 C -9 24, 9 24, 9 18 L 4 18 C 4 20, -4 20, -4 18 Z" fill="url(#redPlastic)" stroke="#1a1a1a" strokeWidth="1.8" />
            </g>
          )}

          {/* COMPASS */}
          {accessory === 'compass' && (
            <g transform="translate(0, -10)">
              {/* Brass loop hanger */}
              <circle cx="0" cy="-17" r="4.5" fill="none" stroke="#F57F17" strokeWidth="2" />
              {/* Body */}
              <circle cx="0" cy="0" r="14" fill="url(#brassComp)" stroke="#1a1a1a" strokeWidth="2.2" />
              {/* Inside dial */}
              <circle cx="0" cy="0" r="10.5" fill="#FFFFFF" stroke="#1a1a1a" strokeWidth="1" />
              {/* Compass ticks */}
              <line x1="0" y1="-10.5" x2="0" y2="-8.5" stroke="#1a1a1a" strokeWidth="1" />
              <line x1="0" y1="10.5" x2="0" y2="8.5" stroke="#1a1a1a" strokeWidth="1" />
              <line x1="-10.5" y1="0" x2="-8.5" y2="0" stroke="#1a1a1a" strokeWidth="1" />
              <line x1="10.5" y1="0" x2="8.5" y2="0" stroke="#1a1a1a" strokeWidth="1" />
              {/* Needle (Red pointing up, blue down) */}
              <path d="M 0 -9 L 2.5 0 L -2.5 0 Z" fill="#EF5350" />
              <path d="M 0 9 L 2.5 0 L -2.5 0 Z" fill="#1565C0" />
              <circle cx="0" cy="0" r="1.5" fill="#1a1a1a" />
            </g>
          )}

          {/* GREEN MUG */}
          {accessory === 'mug' && (
            <g transform="translate(-4, -6) rotate(15)">
              {/* Mug handle */}
              <path d="M 8 -7 Q 16 -7, 16 0 Q 16 7, 8 7" fill="none" stroke="url(#greenPlastic)" strokeWidth="3.5" strokeLinecap="round" />
              {/* Mug Body */}
              <rect x="-8" y="-12" width="16" height="24" rx="2" fill="url(#greenPlastic)" stroke="#1a1a1a" strokeWidth="2" />
              {/* Mug opening ellipse */}
              <ellipse cx="0" cy="-12" rx="8" ry="2.5" fill="#1B5E20" stroke="#1a1a1a" strokeWidth="2" />
              {/* Drink fluid inside */}
              <ellipse cx="0" cy="-12" rx="6.5" ry="1.5" fill="#8D6E63" />
            </g>
          )}

          {/* BANANA */}
          {accessory === 'banana' && (
            <g transform="translate(0, -6) rotate(-45)">
              {/* Banana crescent */}
              <path
                d="M -14 -12 C -6 -18, 12 -12, 14 6 C 15 10, 11 11, 10 7 C 8 -5, -6 -11, -12 -5 Z"
                fill="#FFEE58"
                stroke="#1a1a1a"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              {/* Brown tips */}
              <path d="M -14 -12 C -13 -13, -11 -12, -12 -10 Z" fill="#5D4037" stroke="#1a1a1a" strokeWidth="1" />
              {/* Banana ridges */}
              <path d="M -10 -11 Q 2 -13, 8 0" fill="none" stroke="#FDD835" strokeWidth="1.5" />
            </g>
          )}
        </g>
      )}
    </svg>
  );
}
