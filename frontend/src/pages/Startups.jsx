export default function Startups() {
  const startups = [
    {
      title: "JobNext.in",
      tagline: "AI-first Job Platform",
      desc: "A smarter job portal vision: focus on skills, reduce spam, and match serious candidates with serious companies.",
      url: "https://jobnext-in.vercel.app/"
    },
    {
      title: "Hirenxt AI",
      tagline: "AI Interview & Hiring Automation",
      desc: "End-to-end resume screening, interview bots, coding tests and evaluation. Long-term vision: a full hiring autopilot.",
      url: "#"
    },
    {
      title: "Lavs Dairy",
      tagline: "Dairy Brand & E-commerce Concept",
      desc: "From rural dairy idea to an online store concept – exploring subscriptions, logistics and local branding.",
      url: "https://lavs-dairy.vercel.app/"
    },
    {
      title: "Laverse",
      tagline: "AI & Web Experiments",
      desc: "Umbrella for future AI tools, SaaS dashboards and web products. A playground to try, fail and ship fast.",
      url: "#"
    }
  ];

  return (
    <section>
      <h2 className="section-heading">Startups & Vision</h2>
      <p className="section-subtitle">
        I don’t just prepare for interviews – I build small, bold ideas that can
        grow into something big.
      </p>

      <div className="grid grid-2" style={{ marginTop: "1.3rem" }}>
        {startups.map((s) => (
          <a
            key={s.title}
            href={s.url === "#" ? undefined : s.url}
            target={s.url === "#" ? undefined : "_blank"}
            rel="noreferrer"
            className="card"
          >
            <div className="chip">{s.tagline}</div>
            <h3 style={{ marginTop: "0.6rem", fontSize: "1.2rem" }}>{s.title}</h3>
            <p style={{ marginTop: "0.6rem", fontSize: "0.92rem" }}>{s.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
