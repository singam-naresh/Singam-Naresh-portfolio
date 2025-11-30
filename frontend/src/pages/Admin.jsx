// frontend/src/pages/Admin.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:4000";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined"
    ? localStorage.getItem("adminToken")
    : null;

  useEffect(() => {
    if (token) {
      setIsAuth(true);
      fetchMessages(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/api/admin/login`, {
        password,
      });

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        setIsAuth(true);
        setPassword("");
        fetchMessages(res.data.token);
      } else {
        setError(res.data.error || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  }

  async function fetchMessages(tokenValue) {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${API_BASE}/api/admin/messages`, {
        headers: {
          "x-admin-token": tokenValue,
        },
      });

      if (res.data.success) {
        setMessages(res.data.messages || []);
      } else {
        setError(res.data.error || "Failed to load messages");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("adminToken");
    setIsAuth(false);
    setMessages([]);
    setPassword("");
  }

  // ---------- UI ----------
  if (!isAuth) {
    return (
      <div className="page-wrapper">
        <main className="content">
          <section className="contact-section">
            <h1 className="contact-title">Admin Login</h1>
            <p className="contact-sub">
              Protected dashboard to view portfolio contact messages.
            </p>

            <form onSubmit={handleLogin} className="contact-form">
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="contact-input"
              />
              <button
                type="submit"
                className="contact-button"
                disabled={loginLoading || !password}
              >
                {loginLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            {error && (
              <p
                style={{
                  marginTop: "1rem",
                  color: "#ff6b6b",
                  fontSize: "0.9rem",
                }}
              >
                {error}
              </p>
            )}
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <main className="content" style={{ paddingTop: "6rem" }}>
        <section className="contact-section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <h1 className="contact-title">Admin Dashboard</h1>
              <p className="contact-sub">
                All messages submitted from your portfolio contact form.
              </p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "0.6rem 1.2rem",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                background:
                  "linear-gradient(90deg, #6366f1, #ec4899, #22d3ee)",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Logout
            </button>
          </div>

          {loading ? (
            <p style={{ color: "#9ca3af" }}>Loading messages...</p>
          ) : messages.length === 0 ? (
            <p style={{ color: "#9ca3af" }}>No messages yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    padding: "1rem 1.2rem",
                    borderRadius: "1rem",
                    background:
                      "radial-gradient(circle at top left, rgba(148,163,253,0.15), transparent 60%), rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,253,0.25)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <h3 style={{ color: "#e5e7eb", fontSize: "1rem" }}>
                      {msg.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#9ca3af",
                      }}
                    >
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#a5b4fc",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {msg.email}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#d1d5db",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}

          {error && (
            <p
              style={{
                marginTop: "1rem",
                color: "#ff6b6b",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
