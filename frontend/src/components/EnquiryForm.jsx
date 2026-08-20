import { useId, useRef, useState } from "react";
import Blueprint from "./Blueprint";
import Icon from "./Icon";
import { contact, enquiry } from "../data/site";
import { track } from "../lib/track";
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
        track("Enquiry sent", { via: "form", service: values.service });
        setValues(EMPTY);
        setStatus({
          state: "sent",
          message: "Thanks — your enquiry is in. We reply the same working day.",
        });
      } catch {
        /* Worth measuring: a form that quietly fails looks identical to one
           nobody fills in. */
        track("Enquiry failed", { service: values.service });
        setStatus({
          state: "error",
          message: "That didn't send. Try WhatsApp below, or email us directly.",
        });
      }
      return;
    }

    track("Enquiry sent", { via: "whatsapp", service: values.service });
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
    track("Enquiry sent", { via: "email", service: values.service });
    window.location.href = `${contact.emailHref}?subject=${encodeURIComponent(
      "Enquiry from the website",
    )}&body=${encodeURIComponent(composeMessage(values))}`;
  };

  return (
    <Blueprint as="div" reversed className="relative bg-paper p-[clamp(24px,3vw,36px)]">
      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <h3 className="display mb-2 text-[22px]">Tell us about your business</h3>
        <p className="text-muted mb-6 text-sm">
          Takes under a minute. We reply the same working day.
        </p>

        <div className="grid gap-4 max-md:grid-cols-1 md:grid-cols-2">
          {Object.entries(FIELDS).map(([key, field]) => {
            const id = `${uid}-${key}`;
            const invalid = Boolean(errors[key]);
            return (
              <p className="field m-0" key={key}>
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
                  <span className="mt-[5px] block text-xs text-steel-800" id={`${id}-error`}>
                    {errors[key]}
                  </span>
                )}
              </p>
            );
          })}

          <p className="field m-0">
            <label htmlFor={`${uid}-service`}>Interested in</label>
            {/* Native select kept; only the chevron is ours. */}
            <span className="relative block [&_select]:appearance-none [&_select]:pr-[34px]">
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
              <Icon
                name="chevronDown"
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-[11px] -translate-y-1/2 text-ink/55"
              />
            </span>
          </p>

          <p className="field col-span-full m-0">
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
          className="btn btn-primary btn-block mt-6 py-[13px] text-[15px]"
          disabled={status.state === "sending"}
        >
          <Icon name="plus" size={15} strokeWidth={2} />
          {status.state === "sending" ? "Sending…" : "Send Enquiry"}
        </button>

        <p className="text-muted mt-3 mb-0 text-center text-xs">
          {enquiry.endpoint ? "Prefer email?" : "Opens WhatsApp with your details filled in."}{" "}
          <button type="button" className="linkish" onClick={emailFallback}>
            Email it instead
          </button>
        </p>

        {/* Both states are announced, so the result is never visual-only. */}
        <p
          role="status"
          aria-live="polite"
          hidden={!status.message}
          className={`mt-4 mb-0 border p-3 text-[13px] text-steel-900 ${
            status.state === "error"
              ? "border-steel-800 bg-mute-100"
              : "border-steel bg-steel-100"
          }`}
        >
          {status.message}
        </p>
      </form>
    </Blueprint>
  );
}
