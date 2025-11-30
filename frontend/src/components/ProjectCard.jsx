import { ExternalLink } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <a
      href={project.url === "#" ? undefined : project.url}
      target={project.url === "#" ? undefined : "_blank"}
      rel="noreferrer"
      className="card"
      style={{
        textDecoration: "none",
        opacity: project.url === "#" ? 0.8 : 1,
        cursor: project.url === "#" ? "default" : "pointer",
        position: "relative"
      }}
    >
      <div className="chip" style={{ marginBottom: "0.6rem" }}>
        {project.badge}
      </div>
      <h3 style={{ fontSize: "1.1rem" }}>{project.title}</h3>
      <p style={{ marginTop: "0.35rem", fontSize: "0.9rem", opacity: 0.8 }}>
        {project.stack}
      </p>
      {project.url !== "#" && (
        <span
          style={{
            position: "absolute",
            right: "1.1rem",
            bottom: "1.1rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.8rem",
            opacity: 0.9
          }}
        >
          Open <ExternalLink size={13} />
        </span>
      )}
    </a>
  );
}
