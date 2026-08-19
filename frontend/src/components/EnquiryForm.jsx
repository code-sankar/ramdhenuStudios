import { useId, useRef, useState } from "react";
import Blueprint from "./Blueprint";
import Icon from "./Icon";
import { contact, enquiry } from "../data/site";
import { services } from "../data/services";

/**
 * ENQUIRY FORM
 * ---------------------------------------------------------------------------
 * The site's one conversion point, so it is built to survive a real visitor:
 * native inputs, real labels, inline validation that fires on submit (not on
 * every keystroke), and focus moved to the first field that failed.
 *
 * Delivery has two paths, both of which work with no backend:
 *   • `enquiry.endpoint` set  → POST JSON, report the result inline.
 *   • otherwise               → compose the message and hand it to WhatsApp.
 * Email is always offered as a fallback. See `enquiry` in /src/data/site.js.
 */

const FIELDS = {
  name: { label: "Your name", required: true, autoComplete: "name", placeholder: "Full name" },
  business: {
    label: "Business name",
    required: false,
    autoComplete: "organization",
    placeholder: "e.g. Bamboo Kitchen",
  },
  phone: {
    label: "Phone / WhatsApp",
    required: true,
    type: "tel",
    autoComplete: "tel",
    placeholder: "+91",
  },
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) errors.phone = "We need a number to reach you on.";
  else if (digits.length < 10) errors.phone = "That doesn't look like a complete number.";
  return errors;
}

function composeMessage(values) {
  return [
    "New enquiry from the Ramdhenu website",
    "",
    `Name: ${values.name}`,
    `Business: ${values.business || "—"}`,
    `Phone: ${values.phone}`,
    `Interested in: ${values.service}`,
    "",
    values.message || "—",
  ].join("\n");
}

const EMPTY = { name: "", business: "", phone: "", service: "Not sure yet", message: "" };

export default function EnquiryForm() {
  const uid = useId();
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    /* Clear a field's error as soon as the visitor starts fixing it. */
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      formRef.current?.querySelector(`#${CSS.escape(`${uid}-${firstBad}`)}`)?.focus();
      setStatus({ state: "idle", message: "" });
      return;
    }

    const text = composeMessage(values);

    if (enquiry.endpoint) {
      setStatus({ state: "sending", message: "" });
      try {
        const response = await fetch(enquiry.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...values, text }),
        });
        if (!response.ok) throw new Error(String(response.status));
        setValues(EMPTY);
        setStatus({
          state: "sent",
          message: "Thanks — your enquiry is in. We reply the same working day.",
        });
      } catch {
        setStatus({
          state: "error",
          message: "That didn't send. Try WhatsApp below, or email us directly.",
        });
      }
      return;
    }

    window.open(
      `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setStatus({
      state: "sent",
      message: "WhatsApp is open in a new tab — send the message to reach us.",
    });
  };

  const emailFallback = () => {
    window.location.href = `${contact.emailHref}?subject=${encodeURIComponent(
      "Enquiry from the website",
    )}&body=${encodeURIComponent(composeMessage(values))}`;
  };

  return (
    <Blueprint as="div" reversed className="enquiry">
      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <h3 className="enquiry__title">Tell us about your business</h3>
        <p className="enquiry__lede text-muted">
          Takes under a minute. We reply the same working day.
        </p>

        <div className="enquiry__grid">
          {Object.entries(FIELDS).map(([key, field]) => {
            const id = `${uid}-${key}`;
            const invalid = Boolean(errors[key]);
            return (
              <p className="field" key={key}>
                <label htmlFor={id}>
                  {field.label}
                  {field.required && <span aria-hidden="true"> *</span>}
                </label>
                <input
                  id={id}
                  name={key}
                  className="input"
                  type={field.type ?? "text"}
                  value={values[key]}
                  onChange={update(key)}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  aria-invalid={invalid || undefined}
                  aria-describedby={invalid ? `${id}-error` : undefined}
                />
                {invalid && (
                  <span className="field__error" id={`${id}-error`}>
                    {errors[key]}
                  </span>
                )}
              </p>
            );
          })}

          <p className="field">
            <label htmlFor={`${uid}-service`}>Interested in</label>
            <span className="field__select">
              <select
                id={`${uid}-service`}
                name="service"
                className="input"
                value={values.service}
                onChange={update("service")}
              >
                <option>Not sure yet</option>
                {services.map((service) => (
                  <option key={service.num}>{service.title}</option>
                ))}
              </select>
              <Icon name="chevronDown" aria-hidden="true" />
            </span>
          </p>

          <p className="field field--full">
            <label htmlFor={`${uid}-message`}>What would you like to achieve?</label>
            <textarea
              id={`${uid}-message`}
              name="message"
              className="input"
              rows={3}
              value={values.message}
              onChange={update("message")}
              placeholder="More walk-ins, more enquiries, a website that actually works…"
            />
          </p>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block enquiry__submit"
          disabled={status.state === "sending"}
        >
          <Icon name="plus" size={15} strokeWidth={2} />
          {status.state === "sending" ? "Sending…" : "Send Enquiry"}
        </button>

        <p className="enquiry__fallback text-muted">
          {enquiry.endpoint ? "Prefer email?" : "Opens WhatsApp with your details filled in."}{" "}
          <button type="button" className="linkish" onClick={emailFallback}>
            Email it instead
          </button>
        </p>

        {/* Both states are announced, so the result is never visual-only. */}
        <p
          role="status"
          aria-live="polite"
          className={`enquiry__status${status.state === "error" ? " is-error" : ""}`}
          hidden={!status.message}
        >
          {status.message}
        </p>
      </form>
    </Blueprint>
  );
}
