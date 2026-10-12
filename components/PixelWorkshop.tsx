"use client";

export default function PixelWorkshop({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full ${className}`} style={{ maxWidth: "640px" }}>
      <svg
        viewBox="0 0 640 360"
        width="100%"
        className="block"
        shapeRendering="crispEdges"
        aria-label="Pixel art workshop scene with desk, monitor, keyboard, and coffee"
      >
        {/* Wall / background gradient via layered rects */}
        <rect width="640" height="240" fill="#151227" />
        <rect width="640" height="180" fill="#1e1a35" />
        <rect width="640" height="120" fill="#2a2444" />

        {/* Window with moonlight */}
        <rect x="420" y="20" width="180" height="120" fill="#0d0b1a" />
        <rect x="420" y="20" width="180" height="120" fill="none" stroke="#3a3458" strokeWidth="2" />
        <line x1="510" y1="20" x2="510" y2="140" stroke="#3a3458" strokeWidth="2" />
        <line x1="420" y1="80" x2="600" y2="80" stroke="#3a3458" strokeWidth="2" />
        {/* Moon */}
        <rect x="540" y="35" width="32" height="32" fill="#e8a838" opacity="0.3" />
        <rect x="545" y="40" width="20" height="20" fill="#e8a838" opacity="0.6" />
        {/* Stars */}
        <rect x="435" y="30" width="2" height="2" fill="#c4c0d8" />
        <rect x="470" y="45" width="2" height="2" fill="#c4c0d8" />
        <rect x="445" y="65" width="2" height="2" fill="#c4c0d8" />
        <rect x="575" y="100" width="2" height="2" fill="#c4c0d8" />

        {/* Shelf with books */}
        <rect x="30" y="60" width="200" height="4" fill="#2d8a76" opacity="0.4" />
        <rect x="40" y="40" width="12" height="20" fill="#e06c75" opacity="0.7" />
        <rect x="55" y="35" width="12" height="25" fill="#c678dd" opacity="0.7" />
        <rect x="70" y="42" width="12" height="18" fill="#4ec9b0" opacity="0.7" />
        <rect x="85" y="38" width="12" height="22" fill="#e8a838" opacity="0.7" />
        <rect x="100" y="40" width="12" height="20" fill="#e06c75" opacity="0.5" />

        {/* Poster frame on wall */}
        <rect x="280" y="30" width="80" height="60" fill="#1e1a35" stroke="#3a3458" strokeWidth="2" />
        <rect x="285" y="35" width="70" height="50" fill="#2a2444" />
        <rect x="295" y="45" width="40" height="20" fill="#4ec9b0" opacity="0.3" />
        <rect x="300" y="50" width="30" height="10" fill="#e8a838" opacity="0.4" />

        {/* Desk surface */}
        <rect x="0" y="240" width="640" height="120" fill="#1a1530" />
        <rect x="0" y="240" width="640" height="4" fill="#2d8a76" opacity="0.15" />
        <rect x="0" y="244" width="640" height="2" fill="#3a3458" />

        {/* Monitor */}
        <rect x="180" y="170" width="180" height="100" fill="#0d0b1a" stroke="#3a3458" strokeWidth="3" rx="2" />
        {/* Screen glow */}
        <rect x="186" y="176" width="168" height="88" fill="#151227" />
        {/* Screen content - code lines */}
        <rect x="194" y="184" width="60" height="3" fill="#4ec9b0" opacity="0.6" />
        <rect x="194" y="192" width="100" height="3" fill="#e8a838" opacity="0.5" />
        <rect x="202" y="200" width="80" height="3" fill="#c678dd" opacity="0.5" />
        <rect x="202" y="208" width="120" height="3" fill="#e06c75" opacity="0.4" />
        <rect x="194" y="216" width="50" height="3" fill="#4ec9b0" opacity="0.5" />
        <rect x="194" y="224" width="90" height="3" fill="#e8a838" opacity="0.4" />
        <rect x="202" y="232" width="70" height="3" fill="#c4c0d8" opacity="0.3" />
        {/* Cursor blink */}
        <rect x="194" y="240" width="8" height="3" fill="#e8a838" className="blink" />
        {/* Monitor stand */}
        <rect x="255" y="270" width="30" height="20" fill="#3a3458" />
        <rect x="240" y="288" width="60" height="6" fill="#3a3458" />

        {/* Monitor glow on desk */}
        <rect x="150" y="290" width="240" height="20" fill="#e8a838" opacity="0.04" />

        {/* Keyboard */}
        <rect x="180" y="300" width="180" height="30" fill="#1e1a35" stroke="#3a3458" strokeWidth="2" rx="2" />
        {/* Keys grid */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <g key={i}>
            <rect x={188 + i * 17} y={305} width={14} height={10} fill="#2a2444" />
            <rect x={188 + i * 17} y={318} width={14} height={10} fill="#2a2444" />
          </g>
        ))}

        {/* Coffee cup */}
        <rect x="420" y="290" width="30" height="35" fill="#e06c75" opacity="0.8" />
        <rect x="424" y="294" width="22" height="4" fill="#1e1a35" />
        <rect x="426" y="295" width="18" height="2" fill="#b07d28" />
        {/* Handle */}
        <rect x="450" y="298" width="10" height="14" fill="none" stroke="#e06c75" strokeWidth="3" opacity="0.8" />
        {/* Steam */}
        <rect x="428" y="280" width="2" height="8" fill="#c4c0d8" opacity="0.2" className="float" />
        <rect x="434" y="276" width="2" height="12" fill="#c4c0d8" opacity="0.15" className="float" style={{ animationDelay: "0.5s" }} />

        {/* Headphones on desk */}
        <rect x="480" y="300" width="40" height="25" fill="#2d8a76" opacity="0.5" rx="4" />
        <rect x="490" y="295" width="20" height="6" fill="#2d8a76" opacity="0.3" rx="2" />

        {/* Game cartridge */}
        <rect x="540" y="295" width="50" height="35" fill="#3a3458" stroke="#2d8a76" strokeWidth="1" rx="2" />
        <rect x="548" y="305" width="34" height="15" fill="#2a2444" />
        <rect x="552" y="308" width="8" height="3" fill="#e8a838" opacity="0.6" />

        {/* Potted plant */}
        <rect x="80" y="295" width="30" height="35" fill="#3a3458" />
        <rect x="82" y="297" width="26" height="3" fill="#2a2444" />
        <rect x="85" y="280" width="6" height="16" fill="#2d8a76" opacity="0.5" />
        <rect x="95" y="275" width="6" height="21" fill="#2d8a76" opacity="0.6" />
        <rect x="100" y="282" width="6" height="14" fill="#2d8a76" opacity="0.4" />

        {/* Ambient floor light pool */}
        <rect x="100" y="340" width="440" height="20" fill="#e8a838" opacity="0.02" />
      </svg>
    </div>
  );
}
