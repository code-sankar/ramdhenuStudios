/**
 * ATMOSPHERE
 * ---------------------------------------------------------------------------
 * One fixed layer behind the entire page: two very large, very slow volt
 * gradients plus a fine grain. Mounted once at the app root so the whole site
 * shares a single composited layer instead of every section painting its own.
 *
 * Deliberately restrained — 20–28% opacity, 22s drift. It should read as
 * atmosphere, not as a light show.
 */
export default function Atmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />

      <div
        className="animate-drift absolute -top-[28vh] -right-[18vw] h-[75vh] w-[75vw] rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(30,123,255,0.28), rgba(30,123,255,0.06) 55%, transparent 72%)",
        }}
      />
      <div
        className="animate-drift absolute -bottom-[32vh] -left-[22vw] h-[70vh] w-[70vw] rounded-full opacity-50 blur-[130px] [animation-delay:-11s] [animation-direction:alternate-reverse]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,228,255,0.16), rgba(10,91,214,0.08) 55%, transparent 72%)",
        }}
      />

      {/* Grain — kills gradient banding on large flat areas */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
