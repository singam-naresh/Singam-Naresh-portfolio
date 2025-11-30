import { useLocation, useNavigate } from "react-router-dom";
import { Github, Linkedin, Code2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Home", path: "/" },
  { label: "Skills", path: "/skills" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Startups", path: "/startups" },
  { label: "Contact", path: "/contact" }
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand-block" onClick={() => navigate("/")}>
          <span className="brand-name">Naresh Singam</span>
          <span className="brand-sub">
            Software / Backend / AI Hiring • Bengaluru
          </span>
        </div>

        <nav className="nav-links">
          {links.map((item) => (
            <span
              key={item.path}
              className={
                "nav-link" + (location.pathname === item.path ? " active" : "")
              }
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </span>
          ))}

          <a
            href="https://github.com/nareshreddysingam"
            target="_blank"
            rel="noreferrer"
            className="icon-button"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/singamnaresh"
            target="_blank"
            rel="noreferrer"
            className="icon-button"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://leetcode.com/u/NareshSingam9515/"
            target="_blank"
            rel="noreferrer"
            className="icon-button"
          >
            <Code2 size={16} />
          </a>

          <ThemeToggle />
        </nav>
      </div>
    </header>
    
  );
  
}
<button
  className={`nav-link ${location.pathname === "/blog" ? "active" : ""}`}
  onClick={() => navigate("/blog")}
>
  Blog
</button>
