/**
 * THE SPAN
 * ===========================================================================
 * What happens between "I sent a message" and "it is live and working" — the
 * one thing the home page never answered.
 *
 * It sits between the FAQ and the contact form on purpose. The FAQ clears the
 * stated objections; this clears the unstated one, which is the biggest of
 * them: a local business owner does not hesitate over the price of a website,
 * they hesitate because they cannot picture what they are agreeing to. Four
 * named stages, two of them free, with the decision point drawn in, is a more
 * persuasive thing to put in front of a form than another paragraph about us.
 *
 * WHY IT IS A BOW. Ramdhenu is Assamese for rainbow, and the figure is the one
 * place on the site where the name is allowed to mean something: a single beam
 * arrives, bends through an arc, and what lands on the far side is spread
 * rather than singular. That is also, exactly, the argument the whole site
 * makes — one brief in, six disciplines out — so the shape is doing the work a
 * shape is supposed to do rather than decorating a list.
 *
 * `stages` is read twice, and that is the point: the figure takes the labels
 * and the key underneath takes the sentences, so a stage cannot appear in the
 * drawing and go missing from the caption.
 */
export const span = {
  eyebrow: "What happens next",
  heading: "From your first message to live",
  body: "You are not agreeing to a mystery. Every engagement runs the same four stages, in the same order, and the first two cost nothing — the money and the commitment start at the third, after you have the scope in writing.",

  /* The two ends of the bow, labelled on the drawing itself. */
  foot: {
    start: "One message from you",
    end: "Work that keeps arriving",
  },

  /* WHAT EACH SENTENCE IS FOR: it names what the stage costs and what it
     leaves you free to do. A stage described only by what we do at it is a
     process diagram; described by what it commits you to, it is an answer.
     
     `free` IS LOAD-BEARING IN TWO PLACES AND MUST STAY TRUE OF THE COPY. It
     puts the "no charge" mark on a stage in the key, and — through
     `commitAt` below — it is where the bow stops being dashed. Charge for the
     written plan one day and clearing this flag moves both, in one edit. */
  stages: [
    {
      num: "01",
      label: "A conversation",
      icon: "listen",
      free: true,
      body: "Half an hour on a call or a WhatsApp thread. What you sell, who buys it, what has already been tried. Free, and it ends with our honest read — including when the answer is that you do not need us yet.",
    },
    {
      num: "02",
      label: "A written plan",
      icon: "brief",
      free: true,
      body: "Scope, price and timeline on paper before anything begins, and the channels we would leave alone named alongside the ones we would not. Also free. If the numbers do not work, this is where you say so.",
    },
    {
      num: "03",
      label: "The build",
      icon: "create",
      body: "Site, photography, profiles and campaigns, run off that one plan by one team. You see it in progress rather than at the end, and nothing outside the written scope arrives on an invoice.",
    },
    {
      num: "04",
      label: "Live, and watched",
      icon: "learn",
      body: "We launch, verify the tracking reports real enquiries, then read the first weeks and fix what the data shows. Anything monthly runs on from here, rolling — you can stop at the end of any month.",
    },
  ],
};

/**
 * The figure's own view of the same four stages, plus the two words on the
 * ground that belong to the drawing rather than to any card.
 */
export const spanFigure = {
  kind: "arc",
  foot: span.foot,
  /* The first stage that costs money, as an index. The figure draws the bow
     dashed up to it and solid from it on, so the point where the drawing
     changes and the point where the money starts are the same fact read
     twice rather than two numbers that have to be kept in step. */
  commitAt: span.stages.findIndex((stage) => !stage.free),
  nodes: span.stages.map(({ label, icon }) => ({ label, icon })),
};
