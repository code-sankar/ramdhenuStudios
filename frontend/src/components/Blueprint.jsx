/**
 * BLUEPRINT
 * ---------------------------------------------------------------------------
 * The wireframe frame every card, figure and primary button wears in the
 * Industry system: a square, hairline-bordered box with a "+" registration
 * mark at each corner.
 *
 * The design system's rule is that a framed element never drops its marks, so
 * this component owns both halves — you cannot render the border without them.
 *
 * `reversed` lightens the marks for use on the dark steel field.
 */
export default function Blueprint({
  as: Tag = "span",
  reversed = false,
  className = "",
  children,
  ...rest
}) {
  const corner = reversed ? "corner corner--reversed" : "corner";
  return (
    <Tag className={`blueprint ${className}`.trim()} {...rest}>
      {children}
      <i className={`${corner} tl`} />
      <i className={`${corner} tr`} />
      <i className={`${corner} bl`} />
      <i className={`${corner} br`} />
    </Tag>
  );
}
