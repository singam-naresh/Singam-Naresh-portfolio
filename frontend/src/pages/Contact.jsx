import { useState } from "react";
import axios from "axios";

// 🌍 Country code list (most major countries)
const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 India" },
  { code: "+1", label: "🇺🇸 United States / Canada" },
  { code: "+44", label: "🇬🇧 United Kingdom" },
  { code: "+61", label: "🇦🇺 Australia" },
  { code: "+64", label: "🇳🇿 New Zealand" },
  { code: "+81", label: "🇯🇵 Japan" },
  { code: "+82", label: "🇰🇷 South Korea" },
  { code: "+86", label: "🇨🇳 China" },
  { code: "+65", label: "🇸🇬 Singapore" },
  { code: "+60", label: "🇲🇾 Malaysia" },
  { code: "+62", label: "🇮🇩 Indonesia" },
  { code: "+63", label: "🇵🇭 Philippines" },
  { code: "+94", label: "🇱🇰 Sri Lanka" },
  { code: "+880", label: "🇧🇩 Bangladesh" },
  { code: "+92", label: "🇵🇰 Pakistan" },
  { code: "+971", label: "🇦🇪 United Arab Emirates" },
  { code: "+966", label: "🇸🇦 Saudi Arabia" },
  { code: "+974", label: "🇶🇦 Qatar" },
  { code: "+968", label: "🇴🇲 Oman" },
  { code: "+973", label: "🇧🇭 Bahrain" },
  { code: "+20", label: "🇪🇬 Egypt" },
  { code: "+27", label: "🇿🇦 South Africa" },
  { code: "+212", label: "🇲🇦 Morocco" },
  { code: "+234", label: "🇳🇬 Nigeria" },

  { code: "+33", label: "🇫🇷 France" },
  { code: "+49", label: "🇩🇪 Germany" },
  { code: "+39", label: "🇮🇹 Italy" },
  { code: "+34", label: "🇪🇸 Spain" },
  { code: "+31", label: "🇳🇱 Netherlands" },
  { code: "+32", label: "🇧🇪 Belgium" },
  { code: "+41", label: "🇨🇭 Switzerland" },
  { code: "+43", label: "🇦🇹 Austria" },
  { code: "+46", label: "🇸🇪 Sweden" },
  { code: "+47", label: "🇳🇴 Norway" },
  { code: "+45", label: "🇩🇰 Denmark" },
  { code: "+48", label: "🇵🇱 Poland" },
  { code: "+420", label: "🇨🇿 Czech Republic" },
  { code: "+36", label: "🇭🇺 Hungary" },
  { code: "+30", label: "🇬🇷 Greece" },
  { code: "+351", label: "🇵🇹 Portugal" },
  { code: "+353", label: "🇮🇪 Ireland" },

  { code: "+52", label: "🇲🇽 Mexico" },
  { code: "+55", label: "🇧🇷 Brazil" },
  { code: "+54", label: "🇦🇷 Argentina" },
  { code: "+57", label: "🇨🇴 Colombia" },
  { code: "+56", label: "🇨🇱 Chile" },
  { code: "+51", label: "🇵🇪 Peru" },
  { code: "+593", label: "🇪🇨 Ecuador" },
  { code: "+58", label: "🇻🇪 Venezuela" },

  { code: "+7", label: "🇷🇺 Russia / Kazakhstan" },
  { code: "+90", label: "🇹🇷 Türkiye" },
  { code: "+98", label: "🇮🇷 Iran" },

  // fallback / generic
  { code: "+000", label: "🌐 Other / Not listed" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [modal, setModal] = useState({
    open: false,
    type: "success",
    text: "",
  });

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !message) {
      setModal({
        open: true,
        type: "error",
        text: "Please fill all fields (name, email, phone, message) before sending.",
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
        setCountryCode("+91");
      } else {
        throw new Error(res.data.error || "Failed to send");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setModal({
        open: true,
        type: "error",
        text: "Failed to send your message. Please try again after a moment.",
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
          <div className="field">
            <label>Your name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 🌍 Phone with country code */}
          <div className="field">
            <label>Phone number</label>
            <div className="phone-row">
              <select
                className="phone-code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code + c.label} value={c.code}>
                    {c.label} {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                className="phone-input"
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Message</label>
            <textarea
              rows={4}
              placeholder="Tell me about the role, project, or idea…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

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

        <div className="contact-extras">
          <p>Or mail me directly:</p>
          <div className="email-box">
            <span>inareshofficial@gmail.com</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText("inareshofficial@gmail.com");
              }}
            >
              Copy
            </button>
          </div>

          <div className="social-row">
            <a
              href="https://www.linkedin.com/in/singamnaresh"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/nareshreddysingam"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://leetcode.com/u/NareshSingam9515/"
              target="_blank"
              rel="noreferrer"
            >
              LeetCode
            </a>
          </div>
        </div>
      </div>

      {/* Success / error modal */}
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
