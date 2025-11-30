import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    title: "Building JobNext.in – My vision for smarter hiring",
    date: "2025-11-30",
    tags: ["JobNext", "Backend", "AI Hiring"],
    summary:
      "How I’m designing JobNext.in as an AI-first job platform focusing on skills, not just keywords.",
  },
  {
    id: 2,
    title: "From ECE to Backend Developer – My path with Java & Spring Boot",
    date: "2025-11-25",
    tags: ["Java", "Spring Boot", "Career"],
    summary:
      "My journey from ECE background to building full stack projects with Java, Spring Boot, and React.",
  },
  {
    id: 3,
    title: "Hirenxt AI – Early thoughts on automated interviews",
    date: "2025-11-28",
    tags: ["Hirenxt AI", "LLM", "Interviews"],
    summary:
      "Notes on designing AI-driven interview and resume screening workflows for modern companies.",
  },
];

export default function Blog() {
  return (
    <section>
      <h1 className="section-heading">Writing & Updates</h1>
      <p className="section-subtitle">
        Short notes about JobNext, Hirenxt AI, my learning journey, and
        experiments with Java / DSA / backend systems.
      </p>

      <div className="grid" style={{ marginTop: "1.4rem" }}>
        {posts.map((post) => (
          <motion.article
            key={post.id}
            className="card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                opacity: 0.75,
                marginBottom: "0.3rem",
              }}
            >
              {new Date(post.date).toLocaleDateString("en-IN")}
            </p>
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{post.title}</h3>
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.9rem",
                opacity: 0.85,
              }}
            >
              {post.summary}
            </p>
            <div style={{ marginTop: "0.6rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    border: "1px solid var(--card-border)",
                    opacity: 0.85,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
