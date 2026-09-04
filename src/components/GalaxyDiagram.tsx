export default function GalaxyDiagram(): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 420 320"
      role="img"
      aria-label="Spiralgalaxie: erwartete langsame Rotation außen gegen beobachtete schnelle Rotation"
    >
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="#a78bfa" stopOpacity="0" />
          <stop offset="78%" stopColor="#a78bfa" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="210" cy="160" rx="190" ry="120" fill="url(#halo)" />
      <text x="210" y="38" textAnchor="middle" fill="#a78bfa" fontSize="13" fontWeight="700" letterSpacing="2">
        UNSICHTBARER HALO · DUNKLE MATERIE
      </text>

      <g>
        <ellipse cx="210" cy="160" rx="120" ry="62" fill="none" stroke="#7dd3fc" strokeWidth="2" opacity="0.9" />
        <ellipse
          cx="210"
          cy="160"
          rx="150"
          ry="86"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="1.4"
          opacity="0.55"
          strokeDasharray="7 7"
        />
        <ellipse cx="210" cy="160" rx="78" ry="38" fill="none" stroke="#7dd3fc" strokeWidth="1.2" opacity="0.7" />
        <circle cx="210" cy="160" r="34" fill="url(#core)" />
        <circle cx="300" cy="130" r="6" fill="#fff">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="130" cy="190" r="5" fill="#fff" opacity="0.9" />
        <circle cx="255" cy="198" r="5" fill="#22d3ee" opacity="0.95" />
        <text x="312" y="122" fill="#fff" fontSize="12" fontWeight="700">
          schnell
        </text>
      </g>

      <g fontSize="13" fontWeight="600">
        <line x1="60" y1="272" x2="150" y2="272" stroke="#7f8cbd" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
        <text x="60" y="294" fill="#7f8cbd">
          erwartet: langsam
        </text>
        <line x1="230" y1="272" x2="330" y2="272" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
        <text x="230" y="294" fill="#22d3ee">
          beobachtet: schnell
        </text>
      </g>
      <text x="210" y="312" textAnchor="middle" fill="#b9c3ea" fontSize="12">
        Äußere Sterne sind zu schnell → unsichtbare Masse zieht mit.
      </text>
    </svg>
  );
}
