const core = [
  "C++",
  "Core Java",
  "Collections & Streams",
  "DSA (Arrays, Strings, Trees, DP)",
  "DBMS & SQL",
  "Operating Systems",
  "OOPs & Design Principles"
];

const web = [
  "HTML5 & CSS3",
  "JavaScript (ES6+)",
  "React.js (Basics)",
  "REST APIs & JSON",
  "Spring Boot (APIs, JPA basics)",
  "Basic Node.js"
];

const tools = [
  "Git & GitHub",
  "VS Code",
  "Postman",
  "Vercel",
  "Linux basics",
  "Canva / Figma (UI ideas)"
];

export default function Skills() {
  return (
    <section>
      <h2 className="section-heading">Skills & Tech Focus</h2>
      <p className="section-subtitle">
        Strong focus on Java, DSA, and backend fundamentals, plus hands-on web
        development with React and real projects.
      </p>

      <div className="grid grid-2" style={{ marginTop: "1.4rem" }}>
        <div className="glass" style={{ padding: "1.4rem 1.5rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.2rem" }}>My Direction</h3>
          <p style={{ marginTop: "0.7rem", fontSize: "0.95rem", opacity: 0.85 }}>
            I’m intentionally building depth in{" "}
            <b>C++, Java, DSA, DBMS, OS, and OOPs</b>. Alongside that, I ship
            products using <b>HTML, CSS, JavaScript, React</b>, and backend
            logic with <b>Java / Spring Boot</b> and Node where needed.
          </p>
        </div>

        <div className="grid grid-2">
          <SkillCard title="Core CS" items={core} />
          <SkillCard title="Web & Backend" items={web} />
          <SkillCard title="Tools & Workflow" items={tools} />
        </div>
      </div>
    </section>
  );
}

function SkillCard({ title, items }) {
  return (
    <div className="card">
      <h3 style={{ fontSize: "1.05rem", marginBottom: "0.3rem" }}>{title}</h3>
      <ul
        style={{
          paddingLeft: "1.1rem",
          margin: 0,
          marginTop: "0.3rem",
          fontSize: "0.9rem"
        }}
      >
        {items.map((item) => (
          <li key={item} style={{ marginTop: "0.22rem" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
