export default function Experience() {
  const items = [
    {
      title: "Full Stack Intern – Zymo Cars & Rentals",
      period: "Bengaluru • Internship",
      detail:
        "Contributed to a real-world car rental platform: worked on APIs, dashboards, bug fixes, and operations-facing tools."
    },
    {
      title: "Backend Developer – Wells Fargo (Project)",
      period: "Java • Spring Boot • SQL",
      detail:
        "Built secure backend modules for a banking-style system: data models, validations, and service-layer logic."
    }
  ];

  return (
    <section>
      <h2 className="section-heading">Experience</h2>
      <p className="section-subtitle">
        Real-world exposure through internships and deep project work.
      </p>

      <div className="grid" style={{ marginTop: "1.3rem" }}>
        {items.map((exp) => (
          <div key={exp.title} className="card">
            <h3 style={{ fontSize: "1.2rem" }}>{exp.title}</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.3rem" }}>
              {exp.period}
            </p>
            <p style={{ marginTop: "0.6rem", fontSize: "0.92rem" }}>
              {exp.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
