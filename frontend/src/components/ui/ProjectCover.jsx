import { cn } from "../../lib/utils";

/**
 * PROJECT COVER
 * ---------------------------------------------------------------------------
 * Renders the client photograph when one exists. Until then it draws a
 * designed brand cover instead of a grey box or stock photo — each category
 * gets its own geometric motif, all inside the ink + volt duotone so the
 * portfolio grid still reads as one system.
 *
 * Pass `image` on a project in /src/data/projects.js and this component steps
 * aside automatically.
 */

const motifs = {
  /* Photography — an aperture inside a framing crop */
  photography: [(
    <g>
      <circle cx="100" cy="70" r="34" />
      <circle cx="100" cy="70" r="21" />
      <path d="M100 36v20M134 70h-20M100 104V84M66 70h20" />
      <path d="M46 26h22M46 26v18M154 26h-22M154 26v18M46 114h22M46 114V96M154 114h-22M154 114V96" />
    </g>
  )],
  /* Web — two wireframe variants so neighbouring web projects never twin */
  web: [
    (
      <g>
        <rect x="38" y="24" width="124" height="92" rx="5" />
        <path d="M38 40h124" />
        <circle cx="49" cy="32" r="2.4" />
        <circle cx="58" cy="32" r="2.4" />
        <path d="M52 54h44M52 66h64M52 78h34" />
        <rect x="52" y="90" width="30" height="12" rx="2.5" />
        <rect x="122" y="54" width="30" height="48" rx="3" />
      </g>
    ),
    (
      <g>
        <rect x="76" y="16" width="48" height="108" rx="7" />
        <path d="M76 34h48M92 24h16" />
        <rect x="84" y="42" width="32" height="24" rx="3" />
        <path d="M84 76h32M84 86h20" />
        <rect x="84" y="98" width="32" height="12" rx="3" />
        <path d="M34 40h28M34 54h20M34 68h24M138 40h28M138 54h20M138 68h24" />
        <rect x="34" y="86" width="28" height="20" rx="3" />
        <rect x="138" y="86" width="28" height="20" rx="3" />
      </g>
    ),
  ],
  /* Branding — a monogram plate with baseline grid */
  branding: [(
    <g>
      <rect x="60" y="20" width="80" height="100" rx="5" />
      <path d="M78 96V44h20a13 13 0 0 1 0 26H78M96 70l18 26" />
      <path d="M46 44h-14M46 70h-14M46 96h-14M168 44h-14M168 70h-14M168 96h-14" />
    </g>
  )],
  /* Social — a stacked content feed */
  social: [(
    <g>
      <rect x="34" y="30" width="60" height="80" rx="5" />
      <rect x="106" y="18" width="60" height="80" rx="5" />
      <path d="M34 58h60M106 46h60" />
      <circle cx="49" cy="44" r="5" />
      <circle cx="121" cy="32" r="5" />
      <path d="M46 72h36M46 84h24M118 60h36M118 72h24" />
    </g>
  )],
  /* Marketing — a rising performance curve on target */
  marketing: [(
    <g>
      <path d="M34 110h132" />
      <path d="M40 96l28-20 26 14 30-38 34-22" />
      <path d="M132 30h26v26" />
      <circle cx="68" cy="76" r="4" />
      <circle cx="94" cy="90" r="4" />
      <circle cx="124" cy="52" r="4" />
    </g>
  )],
};


/* Each cover gets a different light origin so the grid never looks tiled. */
const washes = [
  "at 78% 18%",
  "at 22% 82%",
  "at 50% 8%",
  "at 12% 24%",
  "at 88% 78%",
  "at 35% 55%",
];

export default function ProjectCover({ project, className }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.name} — ${project.categoryLabel}`}
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  const variants = motifs[project.category] ?? motifs.web;
  const motif = variants[(project.coverVariant ?? 0) % variants.length];
  const initials = project.name
    .split(" ")
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-ink-900", className)}>
      {/* Light wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(60% 70% ${washes[(project.coverWash ?? 0) % washes.length]}, rgba(30,123,255,0.28), transparent 70%)`,
        }}
      />
      {/* Blueprint grid */}
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />

      {/* Ghost initials */}
      <span
        aria-hidden="true"
        className="absolute -bottom-6 left-4 font-display text-[9rem] font-extrabold leading-none tracking-tighter text-white/[0.045]"
      >
        {initials}
      </span>

      {/* Category motif */}
      <svg
        viewBox="0 0 200 140"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-volt-300/35 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        preserveAspectRatio="xMidYMid meet"
      >
        {motif}
      </svg>

      {/* Vignette so overlaid text always has contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/25 to-transparent"
      />
    </div>
  );
}
