/**
 * BOOKING
 * ===========================================================================
 * The "Book a call" route. Hidden until configured — with `calLink` empty the
 * button does not render at all, so nothing on the page offers a booking that
 * cannot be made.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TO TURN IT ON                                                          │
 * │                                                                         │
 * │  1. Create the event type on cal.com (a 20-minute intro call).          │
 * │  2. Copy the part of its URL after cal.com/ — e.g. the link             │
 * │     https://cal.com/ramdhenu/intro  →  calLink: "ramdhenu/intro"        │
 * │  3. Connect the calendar you actually use, or it will offer slots you   │
 * │     are not free for. This is the step people skip.                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ⚠️  src/data/legal.js reads `calLink` and adds a paragraph about the embed
 *     to the privacy policy when it is set. Cal.com is a third party; the
 *     policy has to say so once a visitor's browser can reach it.
 */

export const booking = {
  /** "<user>/<event>" from your cal.com URL. Empty hides the button. */
  calLink: "",

  /** The button, on the contact panel. */
  label: "Book a call",

  /** The dialog. `duration` should match the event type you created. */
  title: "Book an intro call",
  duration: "20 minutes",
  blurb:
    "A short call, no charge and no pitch deck. Pick a slot that suits you and we will call you on WhatsApp or the phone, whichever you prefer.",

  /** What the visitor gets out of it — set expectations before they book. */
  covers: [
    "What you are trying to fix, and whether we are the right people for it",
    "Which of the six services would actually move the needle first",
    "A rough sense of timeline and budget, before either of us spends more time",
  ],
};

export const bookingEnabled = () => Boolean(booking.calLink);

/** The plain cal.com page. The fallback when the embed cannot load. */
export const bookingUrl = () => `https://cal.com/${booking.calLink}`;
