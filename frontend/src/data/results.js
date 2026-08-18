/**
 * RESULTS
 * ---------------------------------------------------------------------------
 * ⚠️  IMPORTANT — these are ILLUSTRATIVE TARGETS, not verified client results.
 *
 * `RESULTS_ARE_ILLUSTRATIVE` drives a visible label in the UI. Once a metric is
 * backed by a real, permissioned client report, add `verified: true` and a
 * `source` to that metric and flip the flag to false. The section is built so
 * verified and illustrative numbers can coexist.
 */

export const RESULTS_ARE_ILLUSTRATIVE = true;

export const metrics = [
  {
    id: "reach",
    value: 120,
    prefix: "+",
    suffix: "%",
    label: "Reach",
    detail: "Growth in monthly accounts reached across social channels.",
    verified: false,
  },
  {
    id: "enquiries",
    value: 65,
    prefix: "+",
    suffix: "%",
    label: "Enquiries",
    detail: "Increase in calls, forms and WhatsApp messages received.",
    verified: false,
  },
  {
    id: "roas",
    value: 3.2,
    decimals: 1,
    suffix: "X",
    label: "ROAS",
    detail: "Revenue returned for every rupee of ad spend.",
    verified: false,
  },
  {
    id: "gbp",
    value: 40,
    prefix: "+",
    suffix: "%",
    label: "Google Profile Actions",
    detail: "Direction requests, calls and website clicks from Maps.",
    verified: false,
  },
];
