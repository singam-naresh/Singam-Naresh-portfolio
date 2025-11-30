import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL;
    if (!url) {
      // fallback static data if backend not set
      setProjects(defaultProjects);
      return;
    }

    axios
      .get(`${url}/api/projects`)
      .then((res) => setProjects(res.data))
      .catch(() => setProjects(defaultProjects));
  }, []);

  return (
    <section>
      <h2 className="section-heading">Projects & Builds</h2>
      <p className="section-subtitle">
        Real products and experiments – from AI hiring tools to e-commerce and
        mobility.
      </p>

      <div className="grid" style={{ marginTop: "1.4rem" }}>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

const defaultProjects = [
  {
    id: 1,
    title: "JobNext.in — AI Hiring Platform",
    stack: "React • Node • MongoDB • AI-first hiring",
    url: "https://jobnext-in.vercel.app/",
    badge: "Flagship"
  },
  {
    id: 2,
    title: "Hirenxt AI — AI Interview & Screening",
    stack: "LLM • Interview bot • Evaluation pipeline",
    url: "#",
    badge: "In progress"
  },
  {
    id: 3,
    title: "Zomio E-Commerce",
    stack: "React • Product listing • Cart basics",
    url: "https://zomio-ecommerce.vercel.app/",
    badge: "E-commerce"
  },
  {
    id: 4,
    title: "Lavs Dairy",
    stack: "Brand-first design • Landing page",
    url: "https://lavs-dairy.vercel.app/",
    badge: "Brand"
  },
  {
    id: 5,
    title: "GoRide Travelling",
    stack: "React • Travel concept UI",
    url: "https://goridetravelling.vercel.app/",
    badge: "Mobility"
  }
];
