import { useCallback, useEffect, useId, useRef, useState } from "react";

import Blueprint from "./Blueprint";
import Dialog from "./Dialog";
import Icon from "./Icon";
import { booking, bookingEnabled, bookingUrl } from "../data/booking";
import { track } from "../lib/track";

/**
 * BOOK A CALL — a Cal.com embed, loaded the way the video is: on intent only.
 * ===========================================================================
 * A scheduling widget is the same trade as a YouTube iframe. Dropped into the
 * page it costs a third-party script and a run of requests on every visit,
 * paid for by everyone including the majority who will never book. So nothing
 * reaches Cal.com until someone asks for it:
 *
 *   • At rest    a button. Zero third-party requests, and none of the layout
 *                shift a calendar widget brings with it.
 *   • On hover   `preconnect` to Cal's origins, so the handshakes happen
 *                during the moment of intent rather than after the click.
 *   • On click   the dialog opens and the embed loads inside it.
 *
 * The dialog is the site's existing one, so Escape closes, focus is trapped
 * and returns to the button, and the backdrop dismisses — none of which Cal's
 * own modal would give us control over.
 *
 * THE FALLBACK IS NOT OPTIONAL. A blocked script, an ad blocker, a captive
 * wifi portal or Cal being down all end with a visitor staring at an empty
 * box. The direct cal.com link is rendered before the embed is asked for and
 * stays visible the whole time, so the booking can always be made.
 */

const CAL_SCRIPT = "https://app.cal.com/embed/embed.js";
const CAL_ORIGINS = ["https://app.cal.com", "https://cal.com"];

/* The steel accent, so Cal's buttons match the rest of the page rather than
   arriving in its own brand colour. Keep in step with --color-accent. */
const BRAND = "#5980a6";

/** Module-level: the script is one per document, however often this mounts. */
let loading = null;
let initialised = false;

function loadCal() {
  if (window.Cal) return Promise.resolve(window.Cal);
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = CAL_SCRIPT;
    el.async = true;
    el.addEventListener("load", () =>
      window.Cal ? resolve(window.Cal) : reject(new Error("Cal loaded but did not initialise")),
    );
    el.addEventListener("error", () => reject(new Error("Cal embed could not be reached")));
    document.head.appendChild(el);
  });

  /* A failed load must not poison the next attempt — the visitor may simply
     have been offline for a moment. */
  loading.catch(() => {
    loading = null;
  });

  return loading;
}

export default function BookCall({ from = "contact" }) {
  const uid = useId();
  const containerId = `cal-${uid.replace(/:/g, "")}`;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState("idle");
  const warmed = useRef(false);

  /* Warm the connection on intent, once — same trick as the video facade. */
  const warm = useCallback(() => {
    if (warmed.current) return;
    warmed.current = true;
    for (const href of CAL_ORIGINS) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      link.crossOrigin = "";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    loadCal()
      .then((Cal) => {
        /* The dialog may have been closed while the script was in flight. */
        if (cancelled || !document.getElementById(containerId)) return;

        if (!initialised) {
          Cal("init", { origin: "https://cal.com" });
          Cal("on", {
            action: "bookingSuccessful",
            callback: () => track("Call booked", { from }),
          });
          initialised = true;
        }

        Cal("inline", {
          elementOrSelector: `#${containerId}`,
          calLink: booking.calLink,
          layout: "month_view",
        });
        Cal("ui", {
          layout: "month_view",
          hideEventTypeDetails: false,
          cssVarsPerTheme: { light: { "cal-brand": BRAND } },
        });

        setState("ready");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [open, containerId, from]);

  /* Nothing to offer until a cal.com link exists, so offer nothing. */
  if (!bookingEnabled()) return null;

  const close = () => {
    setOpen(false);
    setState("idle");
  };

  return (
    <>
      <Blueprint
        as="button"
        type="button"
        reversed
        onPointerEnter={warm}
        onFocus={warm}
        onClick={() => {
          track("Booking opened", { from });
          /* "loading" is set here rather than in the effect: the click is what
             starts the fetch, so that is where the state belongs. */
          setState("loading");
          setOpen(true);
        }}
        className="btn btn-secondary relative border-paper/35 px-[22px] py-[13px] text-[15px] on-steel hover:bg-paper/10 active:bg-paper/20"
      >
        <Icon name="calendar" size={16} />
        {booking.label}
      </Blueprint>

      <Dialog open={open} onClose={close} title={booking.title} labelledBy={`${uid}-title`}>
        <p className="text-muted mb-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="tag tag-outline">{booking.duration}</span>
          <span>Free, and there is no obligation after it.</span>
        </p>

        <p className="m-0 mb-4 text-sm">{booking.blurb}</p>

        <ul className="m-0 mb-6 list-none border-t border-line p-0">
          {booking.covers.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 border-b border-line py-2.5 text-[14px] leading-snug"
            >
              <Icon name="check" size={15} className="mt-0.5 flex-none text-steel-700" />
              {item}
            </li>
          ))}
        </ul>

        {/* Rendered before the embed is asked for and never taken away: if the
            script is blocked or Cal is down, this is still a working booking. */}
        <p className="text-muted m-0 mb-4 text-[13px]">
          Calendar not loading?{" "}
          <a
            href={bookingUrl()}
            target="_blank"
            rel="noreferrer"
            className="linkish"
            onClick={() => track("Booking fallback", { from })}
          >
            Open it on cal.com
          </a>
          .
        </p>

        {state === "error" ? (
          <p className="border border-line bg-panel p-4 text-[14px]">
            The calendar could not load — an ad blocker or a restricted network will do that.
            Use the cal.com link above, or message us on WhatsApp and we will find a time.
          </p>
        ) : (
          <div className="relative min-h-[420px] border border-line">
            {state === "loading" && (
              <p
                className="text-muted absolute inset-0 grid place-items-center text-[13px]"
                role="status"
              >
                Loading the calendar…
              </p>
            )}
            <div id={containerId} className="relative h-full min-h-[420px] w-full" />
          </div>
        )}
      </Dialog>
    </>
  );
}
