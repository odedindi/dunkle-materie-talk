interface Segment {
  frac: number;
  color: string;
  label: string;
}

export default function DonutChart(): React.JSX.Element {
  const R = 84;
  const C = 2 * Math.PI * R;
  const segs: Segment[] = [
    { frac: 0.05, color: '#7dd3fc', label: '5 %' },
    { frac: 0.27, color: '#a78bfa', label: '27 %' },
    { frac: 0.68, color: '#22d3ee', label: '68 %' },
  ];
  let offset = 0.25;
  return (
    <svg
      viewBox="0 0 220 220"
      role="img"
      aria-label="Tortendiagramm: 5 Prozent normale Materie, 27 Prozent Dunkle Materie, 68 Prozent Dunkle Energie"
    >
      <circle cx="110" cy="110" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="30" />
      {segs.map((s) => {
        const el = (
          <circle
            key={s.label}
            cx="110"
            cy="110"
            r={R}
            fill="none"
            stroke={s.color}
            strokeWidth="30"
            strokeDasharray={`${(s.frac * C).toFixed(1)} ${C.toFixed(1)}`}
            strokeDashoffset={(-offset * C).toFixed(1)}
            strokeLinecap="butt"
            style={{ filter: `drop-shadow(0 0 10px ${s.color}66)` }}
          />
        );
        offset += s.frac;
        return el;
      })}
      <text x="110" y="104" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800" fontFamily="Exo, sans-serif">
        27 %
      </text>
      <text x="110" y="126" textAnchor="middle" fill="#b9c3ea" fontSize="12" fontWeight="600">
        DUNKLE MATERIE
      </text>
    </svg>
  );
}
