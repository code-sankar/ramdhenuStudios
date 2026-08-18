import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { Monogram } from "../brand/Logo";
import { cn } from "../../lib/utils";
import { useMediaQuery, useReducedMotion } from "../../lib/hooks";
import { EASE_EXPO, stagger } from "../../lib/motion";

/* The four capabilities that orbit the brand mark. */
const orbit = [
  {
    icon: "browser",
    label: "Web Design",
    detail: "Sites built to convert",
    position: "left-0 top-[3%] sm:top-[5%]",
    anchor: { x: 26, y: 22 },
    depth: 1,
  },
  {
    icon: "camera",
    label: "Photography",
    detail: "Visuals that sell",
    position: "right-0 top-[20%]",
    anchor: { x: 74, y: 34 },
    depth: 1.6,
  },
  {
    icon: "social",
    label: "Social Media",
    detail: "Content that lands",
    position: "left-0 bottom-[19%]",
    anchor: { x: 26, y: 70 },
    depth: 1.9,
  },
  {
    icon: "target",
    label: "Growth & Ads",
    detail: "Spend that pays back",
    position: "right-[4%] bottom-[2%]",
    anchor: { x: 72, y: 84 },
    depth: 1.25,
  },
];

/** A headline line that rises out of its own clip mask. */
function RevealLine({ children, delay = 0, className }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE_EXPO, delay }}
        className={cn("block", className)}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const reduced = useReducedMotion();
  /* Parallax is a desktop affordance. On a phone the viewport is the parallax,
     and shifting the composition only risks clipping it against the section. */
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const parallax = isDesktop && !reduced;

  /* Scroll parallax — the composition drifts slower than the copy. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, parallax ? 70 : 0]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, parallax ? 120 : 0]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, parallax ? 0.15 : 1]);

  /* Pointer parallax — cards shift a few pixels against the mark. */
  const pointerX = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });

  const handlePointerMove = (event) => {
    if (reduced || event.pointerType !== "mouse" || !stageRef.current) return;
    const bounds = stageRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-24"
    >
      {/* Blueprint grid, faded out towards the edges */}
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(75%_65%_at_50%_35%,#000,transparent)]"
      />

      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* ---------------------------------------------------------------
              COPY
          --------------------------------------------------------------- */}
          <motion.div style={{ y: copyY, opacity: fade }} className="lg:col-span-6 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.1 }}
              className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-volt-400" />
              </span>
              <span className="font-mono text-[0.625rem] tracking-[0.2em] text-mist-200 uppercase">
                Digital Growth Partner
              </span>
            </motion.div>

            <h1 className="mt-7 text-display-xl uppercase">
              <RevealLine delay={0.2}>We Build Brands.</RevealLine>
              <RevealLine delay={0.32}>
                Drive <span className="text-glow">Growth.</span>
              </RevealLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.52 }}
              className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-mist-400 sm:text-lg"
            >
              We help local businesses build a powerful online presence, attract the right
              audience and turn visibility into real enquiries and customers.
            </motion.p>

            <motion.div
              variants={stagger(0.08, 0.66)}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: EASE_EXPO }}
              >
                <Button to="services" size="lg" icon="arrowDown" className="w-full sm:w-auto">
                  Explore Services
                </Button>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: EASE_EXPO }}
              >
                <Button
                  to="contact"
                  variant="secondary"
                  size="lg"
                  icon="arrowUpRight"
                  className="w-full sm:w-auto"
                >
                  Book a Free Consultation
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.9 }}
              className="mt-12 flex items-center gap-4 border-t border-line pt-6"
            >
              <Icon name="spark" className="h-4 w-4 text-volt-400" />
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-mist-500 uppercase">
                Helping local businesses grow digitally
              </p>
            </motion.div>
          </motion.div>

          {/* ---------------------------------------------------------------
              CAPABILITY COMPOSITION
          --------------------------------------------------------------- */}
          <motion.div
            style={{ y: stageY }}
            className="lg:col-span-6 xl:col-span-6 xl:pl-8"
          >
            <div
              ref={stageRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointer}
              className="relative mx-auto aspect-square w-full max-w-[34rem]"
            >
              {/* Connective tissue between the mark and each capability */}
              <svg
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {orbit.map((item, index) => (
                  <motion.line
                    key={item.label}
                    x1="50"
                    y1="50"
                    x2={item.anchor.x}
                    y2={item.anchor.y}
                    stroke="url(#hero-thread)"
                    strokeWidth="0.34"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.85 + index * 0.1 }}
                  />
                ))}
                <defs>
                  <linearGradient id="hero-thread" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#5ae4ff" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#1e7bff" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Centre: the brand mark on a glowing plinth */}
              <motion.div
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.35 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative grid h-40 w-40 place-items-center sm:h-48 sm:w-48">
                  <div className="animate-pulse-glow absolute -inset-4 rounded-full bg-volt-500/30 blur-3xl" />
                  <div className="absolute inset-0 rounded-full border border-volt-400/35" />
                  <div className="absolute inset-5 rounded-full border border-line-strong" />
                  <div className="glass absolute inset-9 grid place-items-center rounded-full shadow-[0_0_50px_-10px_rgba(30,123,255,0.55)]">
                    <Monogram className="h-14 w-auto sm:h-16" id="hero" />
                  </div>
                </div>
              </motion.div>

              {/* Four floating capability cards */}
              {orbit.map((item, index) => (
                <OrbitCard
                  key={item.label}
                  item={item}
                  index={index}
                  pointerX={pointerX}
                  pointerY={pointerY}
                  reduced={reduced}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        style={{ opacity: fade }}
        className="shell mt-16 hidden items-center gap-3 lg:flex"
      >
        <span className="font-mono text-[0.625rem] tracking-[0.24em] text-mist-600 uppercase">
          Scroll
        </span>
        <span aria-hidden="true" className="h-px w-16 bg-linear-to-r from-line-strong to-transparent" />
      </motion.div>
    </section>
  );
}

function OrbitCard({ item, index, pointerX, pointerY, reduced }) {
  const shift = reduced ? 0 : item.depth * 9;
  const x = useTransform(pointerX, [-1, 1], [-shift, shift]);
  const y = useTransform(pointerY, [-1, 1], [-shift * 0.75, shift * 0.75]);

  return (
    <motion.div
      style={reduced ? undefined : { x, y }}
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.6 + index * 0.11 }}
      className={cn("absolute w-[9.5rem] sm:w-[10.75rem]", item.position)}
    >
      <div className="glass group rounded-lg p-3.5 transition-colors duration-300 hover:border-line-volt sm:p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-line-volt/50 bg-volt-500/10 text-volt-300 transition-colors duration-300 group-hover:bg-volt-500/20">
          <Icon name={item.icon} className="h-[1.15rem] w-[1.15rem]" />
        </div>
        <p className="mt-3 font-display text-[0.8125rem] font-semibold tracking-[-0.01em] text-mist-50">
          {item.label}
        </p>
        <p className="mt-0.5 text-[0.6875rem] leading-snug text-mist-500">{item.detail}</p>
      </div>
    </motion.div>
  );
}
