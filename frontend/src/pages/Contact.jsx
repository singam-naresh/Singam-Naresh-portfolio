import { useState, useEffect } from "react";
import axios from "axios";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [message, setMessage] = useState("");

  const [status, setStatus] = useState("idle");
  const [modal, setModal] = useState({
    open: false,
    type: "success",
    text: "",
  });

  // Auto-detect country by IP
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data.country_calling_code) {
          setCountryCode(data.country_calling_code);
        }
      } catch (err) {
        console.error("Country auto-detect failed, using +91");
      }
    })();
  }, []);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // Validate phone
  const validatePhone = (rawValue) => {
    const onlyNumbers = rawValue.replace(/\D/g, "");

    if (onlyNumbers.length === 10) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const onlyDigits = phone.replace(/\D/g, "");

    if (!name || !email || !message || onlyDigits.length !== 10) {
      setModal({
        open: true,
        type: "error",
        text: "Please fill all fields correctly before sending.",
      });
      return;
    }

    setStatus("loading");

    try {
      const res = await axios.post(`${backendUrl}/api/contact`, {
        name,
        email,
        phone: `${countryCode} ${phone}`,
        message,
      });

      if (res.data.success) {
        setStatus("success");
        setModal({
          open: true,
          type: "success",
          text:
            "Your message has been sent successfully. I’ll get back to you soon! 🚀",
        });

        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        throw new Error(res.data.error || "Failed to send");
      }
    } catch (err) {
      setStatus("error");
      setModal({
        open: true,
        type: "error",
        text: "Failed to send your message. Please try again later.",
      });
    }
  };

  const isLoading = status === "loading";

  return (
    <section className="contact-section">
      <h1 className="contact-title">Let’s collaborate</h1>
      <p className="contact-sub">
        Tell me about your idea, role, or project — I’m actively looking for
        backend / full stack roles & building JobNext / Hirenxt AI.
      </p>

      <div className="contact-card glass">
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="field">
            <label>Your name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              className={!name ? "error-border" : ""}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              className={!email ? "error-border" : ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PHONE */}
          <div className="field">
            <label>Phone number</label>

            <div className="phone-row">
              <select
                className="phone-code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value={countryCode}>{countryCode}</option>
              </select>

              <div className="tooltip-wrapper">
                <input
                  type="tel"
                  className={`phone-input ${phoneError ? "error-border" : ""}`}
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    value = value.slice(0, 10);

                    if (value.length > 5) {
                      value = value.slice(0, 5) + " " + value.slice(5);
                    }

                    validatePhone(value);
                    setPhone(value);
                  }}
                />

                {phoneError && (
                  <span className="tooltip">Enter a valid 10-digit number</span>
                )}
              </div>
            </div>
          </div>

          {/* MESSAGE */}
          <div className="field">
            <label>Message</label>
            <textarea
              rows={4}
              placeholder="Tell me about the role, project, or idea…"
              value={message}
              className={!message ? "error-border" : ""}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn-primary contact-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="btn-loading">
                <span className="spinner" /> Sending…
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        {/* EXTRAS */}
        <div className="contact-extras">
          <p>Or mail me directly:</p>
          <div className="email-box">
            <span>inareshofficial@gmail.com</span>
            <button
              type="button"
              onClick={() =>
                navigator.clipboard?.writeText("inareshofficial@gmail.com")
              }
            >
              Copy
            </button>
          </div>

          <div className="social-row">
            <a href="https://www.linkedin.com/in/singamnaresh" target="_blank">
              LinkedIn
            </a>
            <a href="https://github.com/nareshreddysingam" target="_blank">
              GitHub
            </a>
            <a
              href="https://leetcode.com/u/NareshSingam9515/"
              target="_blank"
            >
              LeetCode
            </a>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modal.open && (
        <div
          className="modal-backdrop"
          onClick={() => setModal((m) => ({ ...m, open: false }))}
        >
          <div
            className={`modal-card ${
              modal.type === "success" ? "modal-success" : "modal-error"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">
              {modal.type === "success"
                ? "Message sent 🎉"
                : "Something went wrong"}
            </h2>
            <p className="modal-text">{modal.text}</p>
            <button
              type="button"
              className="btn-primary modal-btn"
              onClick={() =>
                setModal({
                  open: false,
                  type: "success",
                  text: "",
                })
              }
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
