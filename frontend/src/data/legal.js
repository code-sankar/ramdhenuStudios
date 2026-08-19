/**
 * LEGAL
 * ---------------------------------------------------------------------------
 * The footer's Privacy Policy and Terms open as dialogs rather than separate
 * routes — this is a one-page site, and a modal keeps the visitor in place
 * without pulling a router in for two documents.
 *
 * ⚠️  These are plain-language starting points written to describe what this
 *     site actually does (one enquiry form, no tracking, no cookies). Have
 *     them reviewed before launch, and update them the moment analytics, a
 *     CRM or any third-party embed is added.
 */

export const LEGAL_NEEDS_REVIEW = true;

export const privacy = {
  title: "Privacy Policy",
  updated: "Last updated: August 2026",
  sections: [
    {
      heading: "What we collect",
      body: "When you send an enquiry we receive the name, business name, phone number, service interest and message you type into the form. That is the only personal information this website collects. We do not use cookies, analytics or advertising trackers on this site.",
    },
    {
      heading: "How we use it",
      body: "Solely to reply to your enquiry and, if you become a client, to deliver the work. We do not sell, rent or share your details with anyone else, and we do not add you to a mailing list unless you ask us to.",
    },
    {
      heading: "Where it goes",
      body: "Depending on how you contact us, your enquiry arrives by WhatsApp or email. Those services carry their own privacy terms, which apply to the message in transit.",
    },
    {
      heading: "How long we keep it",
      body: "Enquiries are kept while we are in conversation and for a reasonable period afterwards in case you come back to us. Ask us to delete your details at any time and we will.",
    },
    {
      heading: "Your rights",
      body: "You can ask what we hold about you, ask us to correct it, or ask us to delete it. Write to us at the email address in the footer and we will respond within a reasonable time.",
    },
  ],
};

export const terms = {
  title: "Terms & Conditions",
  updated: "Last updated: August 2026",
  sections: [
    {
      heading: "About this site",
      body: "This website describes the services Ramdhenu offers. Nothing on it is a binding offer or a guarantee of a particular result — every engagement is agreed separately in writing before work begins.",
    },
    {
      heading: "Enquiries",
      body: "Sending an enquiry does not create a contract. We will reply, discuss scope and, where it makes sense for both sides, issue a written proposal covering deliverables, timelines and fees.",
    },
    {
      heading: "Project work",
      body: "Scope, payment schedule, revision rounds and delivery dates are set out in the proposal for each project. Where a project depends on material from you — photographs, copy, account access — timelines assume that material arrives when agreed.",
    },
    {
      heading: "Ownership",
      body: "On full payment, the final deliverables produced for you are yours. We keep ownership of our working files, internal tooling and any pre-existing material we bring to the work, and we may show finished work in our portfolio unless you ask us not to.",
    },
    {
      heading: "Examples shown here",
      body: "Project examples and client quotes marked as samples on this site are illustrative placeholders, not claims about completed work. They are replaced with real, permissioned case studies as those publish.",
    },
    {
      heading: "Third-party platforms",
      body: "Work involving Google, Meta or other platforms is subject to those platforms' own rules and approval processes. We cannot guarantee outcomes that depend on decisions those platforms make.",
    },
  ],
};
