import { useCallback, useRef, useState } from "react";
import Blueprint from "./Blueprint";
import Plate from "./Plate";

/**
 * VIDEO EMBED — a facade, not a bare iframe.
 * ===========================================================================
 * Dropping YouTube's `<iframe>` straight into the page costs roughly 1.5 MB of
 * script and a dozen requests on *every* page load, whether or not anyone
 * watches. On a mid-range phone on a patchy connection — which is most of this
 * site's audience — that is the difference between a fast page and a slow one,
 * and it lands squarely on the hero's LCP.
 *
 * So nothing loads until someone presses play:
 *
 *   • Before play  a local still (or a drawn plate) plus a play control.
 *                  Zero third-party requests.
 *   • On hover     `preconnect` to YouTube's origins, so the DNS and TLS
 *                  handshakes happen during the moment of intent rather than
 *                  after the click. Play still feels instant, without paying
 *                  for it upfront.
 *   • On click     the iframe mounts with `autoplay=1` and takes over.
 *
 * `youtube-nocookie.com` is used so YouTube sets no cookie until the visitor
 * has actually chosen to watch — which is what keeps the privacy policy's
 * "nothing is sent to YouTube until you press play" true. Keep the poster
 * local for the same reason.
 */

const ORIGINS = [
  "https://www.youtube-nocookie.com",
  "https://www.google.com",
  "https://googleapis.com",
];

export default function VideoEmbed({ id, title, poster, caption, motif = "video" }) {
  const [playing, setPlaying] = useState(false);
  const warmed = useRef(false);
  const frameRef = useRef(null);

  /* Warm the connection on intent, once. */
  const warm = useCallback(() => {
    if (warmed.current || !id) return;
    warmed.current = true;
    for (const href of ORIGINS) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      link.crossOrigin = "";
      document.head.appendChild(link);
    }
  }, [id]);

  const play = () => {
    if (!id) return;
    setPlaying(true);
    /* Focus follows the action, so a keyboard user lands in the player. */
    requestAnimationFrame(() => frameRef.current?.focus());
  };

  return (
    <figure className="m-0">
      <Blueprint className="relative block aspect-video w-full overflow-hidden bg-panel">
        {playing ? (
          <iframe
            ref={frameRef}
            title={title}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={play}
            onPointerEnter={warm}
            onFocus={warm}
            disabled={!id}
            aria-label={id ? `Play video: ${title}` : undefined}
            className="group absolute inset-0 grid w-full place-items-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-steel enabled:cursor-pointer"
          >
            {poster ? (
              <span className="absolute inset-0 block">
                <img
                  src={poster}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </span>
            ) : (
              <Plate motif={motif} label={title} />
            )}

            {id && (
              <span
                aria-hidden="true"
                className="relative grid h-[clamp(56px,6vw,76px)] w-[clamp(56px,6vw,76px)] place-items-center border border-steel bg-steel text-paper shadow-[0_6px_24px_-8px_rgba(0,0,0,0.45)] transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-steel-400"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
              </span>
            )}
          </button>
        )}
      </Blueprint>

      {(caption || !id) && (
        <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {!id && <span className="tag tag-outline">Sample</span>}
          <span className="text-muted text-[13px]">
            {id ? caption : "Video slot ready — add the YouTube ID in src/data/site.js."}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
