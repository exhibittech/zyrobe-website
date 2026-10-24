/** A tailor's dress form on a tripod stand (stand-in for "your photo": the site never shows a real person). */
export default function DressForm({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 400" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="df-linen" x1="0" x2="1">
          <stop offset="0" stopColor="#cdbda3" />
          <stop offset=".28" stopColor="#efe6d6" />
          <stop offset=".5" stopColor="#f6efe3" />
          <stop offset=".75" stopColor="#e4d8c4" />
          <stop offset="1" stopColor="#bfae92" />
        </linearGradient>
        <linearGradient id="df-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#6b5233" stopOpacity=".18" />
        </linearGradient>
        <linearGradient id="df-wood" x1="0" x2="1">
          <stop offset="0" stopColor="#5a3d26" />
          <stop offset=".45" stopColor="#a47c55" />
          <stop offset="1" stopColor="#4d3420" />
        </linearGradient>
        <radialGradient id="df-floor">
          <stop offset="0" stopColor="#2e1c12" stopOpacity=".3" />
          <stop offset="1" stopColor="#2e1c12" stopOpacity="0" />
        </radialGradient>
        <pattern id="df-weave" width="2.4" height="2.4" patternUnits="userSpaceOnUse">
          <path d="M0 .6h2.4M.6 0v2.4" stroke="#7a6342" strokeOpacity=".07" strokeWidth=".45" />
        </pattern>
      </defs>

      <ellipse cx="100" cy="392" rx="62" ry="6" fill="url(#df-floor)" />
      {/* Tripod and pole */}
      <path d="M100 356 62 389M100 356l38 33M100 356v35" stroke="url(#df-wood)" strokeWidth="4.5" strokeLinecap="round" />
      <rect x="97" y="226" width="6" height="134" rx="3" fill="url(#df-wood)" />
      <rect x="91" y="224" width="18" height="8" rx="2.5" fill="#8a6a48" />

      {/* Neck and cap */}
      <path d="M88 52c0-9 1-16 2.5-21h19c1.5 5 2.5 12 2.5 21Z" fill="url(#df-linen)" />
      <ellipse cx="100" cy="30" rx="13.5" ry="4.6" fill="url(#df-wood)" />
      <rect x="98.6" y="20" width="2.8" height="8" fill="#5a3d26" />
      <circle cx="100" cy="19" r="4.2" fill="url(#df-wood)" />

      {/* Torso */}
      <path
        id="df-torso"
        d="M88 50c0 8-18 12-32 16-10 3-14 12-13 26 1 26 15 48 21 68 4 15-4 35-6 54-1 10 12 18 42 19 30-1 43-9 42-19-2-19-10-39-6-54 6-20 20-42 21-68 1-14-3-23-13-26-14-4-32-8-32-16Z"
        fill="url(#df-linen)"
      />
      <use href="#df-torso" fill="url(#df-weave)" />
      <use href="#df-torso" fill="url(#df-shade)" />
      {/* Princess seams, centre seam, waist tape */}
      <g fill="none" stroke="#6b5233" strokeOpacity=".22" strokeWidth=".8">
        <path d="M78 66c-4 40 4 78 1 166" />
        <path d="M122 66c4 40-4 78-1 166" />
        <path d="M100 52v181" strokeDasharray="2 2.5" />
        <path d="M65 160c22 6 48 6 70 0" strokeOpacity=".3" />
      </g>
    </svg>
  );
}
