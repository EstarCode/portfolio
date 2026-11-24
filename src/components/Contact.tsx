import { useState, useRef, useEffect } from "react";
import type { Profile } from "../types";
import { Section } from "./Section";

const MAX_MSG = 2500;

export function Contact({ p }: { p: Profile }) {
  const socials = p.socials || { email: p.email };
  const recipientEmail = socials.email || p.email;

  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const copyTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    if (!recipientEmail) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(recipientEmail);
      } else {
        // Fallback for HTTP contexts without Clipboard API
        const textarea = document.createElement("textarea");
        textarea.value = recipientEmail;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission denied — silent fail
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    if (!recipientEmail) {
      setErrorMessage("No contact email is configured.");
      setStatus("error");
      return;
    }

    // Silent bot trap: if honeypot is populated, pretend success without sending
    if (honeypot.trim() !== "") {
      setStatus("success");
      setSenderName("");
      setSenderEmail("");
      setSubject("");
      setMessage("");
      return;
    }

    // Rate limiting: enforce 10s cooldown between submissions
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      setErrorMessage("Please wait a moment before sending another message.");
      setStatus("error");
      return;
    }

    const trimmedName = senderName.trim();
    const trimmedEmail = senderEmail.trim();
    const trimmedSubject = subject.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMsg) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            _subject: trimmedSubject || `Portfolio Message from ${trimmedName}`,
            message: trimmedMsg,
            _gotcha: honeypot,
            _template: "table",
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (
        response.ok ||
        (data &&
          (data.success === "true" ||
            data.success === true ||
            (typeof data.message === "string" && data.message.includes("Activation"))))
      ) {
        setStatus("success");
        setLastSubmitTime(Date.now());
        setSenderName("");
        setSenderEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error(
          data?.message || "Delivery failed. Please try again or use direct channels."
        );
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to send message right now. Please try direct channels.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  const msgCharsLeft = MAX_MSG - message.length;

  return (
    <Section id="contact" title="Contact">
      {/* Accessible live region for copy-email status — lives outside the button */}
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        {copied ? "Email address copied to clipboard." : ""}
      </span>

      <div className="contact-layout">
        {/* Message Form Column */}
        <div className="contact-form-col">
          {status === "success" ? (
            <div className="contact-feedback-box is-success" role="status" aria-live="polite">
              <div className="feedback-header">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h4 className="feedback-title">Message Sent Successfully</h4>
              </div>
              <p className="feedback-desc">
                Thank you for reaching out. I'll get back to you shortly.
              </p>
              <div style={{ marginTop: "0.5rem" }}>
                <button type="button" className="cta" onClick={() => setStatus("idle")}>
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendEmail} className="contact-form" noValidate>
              {/* Hidden honeypot field — invisible to real users */}
              <div
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  height: 0,
                  overflow: "hidden",
                }}
                aria-hidden="true"
              >
                <label htmlFor="contact-hp">Do not fill this</label>
                <input
                  id="contact-hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required
                    maxLength={100}
                    autoComplete="name"
                    disabled={status === "sending"}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    required
                    maxLength={100}
                    autoComplete="email"
                    disabled={status === "sending"}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Project · Collaboration · Opportunity"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={150}
                  autoComplete="off"
                  disabled={status === "sending"}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="contact-message">Message</label>
                  <span
                    className={`form-char-counter ${msgCharsLeft < 100 ? "is-warning" : ""}`}
                    aria-live="polite"
                    aria-label={`${msgCharsLeft} characters remaining`}
                  >
                    {msgCharsLeft}
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  maxLength={MAX_MSG}
                  disabled={status === "sending"}
                  className="form-textarea"
                />
              </div>

              {status === "error" && errorMessage && (
                <div className="form-error-alert" role="alert">
                  {errorMessage}
                </div>
              )}

              <div className="form-actions-row">
                <button type="submit" className="cta" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="spin-icon"
                        aria-hidden="true"
                      >
                        <line x1="12" y1="2" x2="12" y2="6" />
                        <line x1="12" y1="18" x2="12" y2="22" />
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                        <line x1="2" y1="12" x2="6" y2="12" />
                        <line x1="18" y1="12" x2="22" y2="12" />
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="ghost"
                  aria-label={copied ? "Email copied!" : "Copy email address to clipboard"}
                >
                  {copied ? "Copied!" : "Copy email"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Channel Links */}
        <div className="contact-channels-col">
          <div className="channels-grid">
            <a
              href={`mailto:${socials.email || p.email}`}
              className="channel-card"
              aria-label={`Send email to ${socials.email || p.email}`}
            >
              <div className="channel-icon-box">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="channel-info">
                <span className="channel-name">Email</span>
                <span className="channel-handle">{socials.email || p.email}</span>
              </div>
              <span className="channel-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </a>

            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card"
                aria-label="GitHub profile: EstarCode (opens in new tab)"
              >
                <div className="channel-icon-box">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div className="channel-info">
                  <span className="channel-name">GitHub</span>
                  <span className="channel-handle">EstarCode</span>
                </div>
                <span className="channel-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
              </a>
            )}

            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card"
                aria-label="LinkedIn profile: abraham-tiruneh (opens in new tab)"
              >
                <div className="channel-icon-box">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="channel-info">
                  <span className="channel-name">LinkedIn</span>
                  <span className="channel-handle">abraham-tiruneh</span>
                </div>
                <span className="channel-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
              </a>
            )}

            {socials.telegram && (
              <a
                href={socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card"
                aria-label="Telegram: @kokpic (opens in new tab)"
              >
                <div className="channel-icon-box">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
                <div className="channel-info">
                  <span className="channel-name">Telegram</span>
                  <span className="channel-handle">@kokpic</span>
                </div>
                <span className="channel-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
              </a>
            )}

            {socials.whatsapp && (
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card"
                aria-label="WhatsApp: +251 924 276 862 (opens in new tab)"
              >
                <div className="channel-icon-box">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="channel-info">
                  <span className="channel-name">WhatsApp</span>
                  <span className="channel-handle">+251 924 276 862</span>
                </div>
                <span className="channel-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
