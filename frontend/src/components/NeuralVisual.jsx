const NODES = [
  { cx: 300, cy: 110, r: 7, gold: false },
  { cx: 160, cy: 180, r: 5, gold: false },
  { cx: 440, cy: 170, r: 6, gold: true },
  { cx: 90, cy: 300, r: 6, gold: false },
  { cx: 300, cy: 290, r: 10, gold: false, core: true },
  { cx: 510, cy: 300, r: 5, gold: false },
  { cx: 190, cy: 400, r: 5, gold: true },
  { cx: 420, cy: 420, r: 6, gold: false },
  { cx: 300, cy: 490, r: 5, gold: false },
  { cx: 60, cy: 120, r: 4, gold: false },
  { cx: 540, cy: 90, r: 4, gold: false },
  { cx: 560, cy: 480, r: 4, gold: false },
];

const EDGES = [
  [0, 1], [0, 2], [0, 4], [1, 3], [1, 4], [2, 4], [2, 5],
  [3, 4], [3, 6], [4, 5], [4, 6], [4, 7], [4, 8], [6, 8],
  [7, 8], [1, 9], [2, 10], [5, 11], [7, 11],
];

const NeuralVisual = () => (
  <svg viewBox="0 0 600 600" className="w-full h-full" role="img" aria-label="Abstract AI network of connected business modules">
    <defs>
      <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0057D9" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#0057D9" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="edge-grad" x1="0" y1="0" x2="600" y2="600" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#00E5FF" stopOpacity="0.55" />
        <stop offset="1" stopColor="#0057D9" stopOpacity="0.35" />
      </linearGradient>
    </defs>

    <circle cx="300" cy="290" r="200" fill="url(#core-glow)" />
    <circle cx="300" cy="290" r="150" fill="none" stroke="rgba(148,163,184,0.14)" strokeDasharray="3 7" />
    <circle cx="300" cy="290" r="230" fill="none" stroke="rgba(148,163,184,0.08)" strokeDasharray="2 9" />

    {EDGES.map(([a, b], i) => (
      <line
        key={i}
        x1={NODES[a].cx} y1={NODES[a].cy}
        x2={NODES[b].cx} y2={NODES[b].cy}
        stroke="url(#edge-grad)"
        strokeWidth="1.1"
        className={i % 3 === 0 ? "flow-line" : ""}
        opacity={i % 3 === 0 ? 0.9 : 0.35}
      />
    ))}

    {NODES.map((n, i) => (
      <g key={i} className="node-pulse" style={{ animationDelay: `${i * 0.35}s` }}>
        {n.core && <circle cx={n.cx} cy={n.cy} r={n.r + 14} fill="none" stroke="rgba(0,229,255,0.35)" strokeWidth="1" />}
        <circle
          cx={n.cx} cy={n.cy} r={n.r}
          fill={n.gold ? "#D4AF37" : n.core ? "#00E5FF" : "#0F111A"}
          stroke={n.gold ? "#E8CC6E" : n.core ? "#00E5FF" : "#3D85E8"}
          strokeWidth="1.6"
        />
      </g>
    ))}
  </svg>
);

export default NeuralVisual;
