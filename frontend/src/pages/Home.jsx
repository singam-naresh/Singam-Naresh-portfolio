import { motion } from "framer-motion";
import ThreeHero from "../components/ThreeHero";
import RoleRotator from "../components/RoleRotator";

export default function Home() {
  return (
    <section className="hero-section">
      <div className="hero-container glass">
        {/* Left: Text */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="chip">India • Java • AI Hiring • Full Stack</div>

          <h1 className="hero-title">
            Hi, I'm <span className="hero-highlight">Naresh Singam</span>
          </h1>

          <p className="hero-roles">
            <RoleRotator />
          </p>

          <p className="hero-bio">
            I’m a B.Tech ECE graduate from India who loves building things
            end-to-end – not just solving DSA questions. My focus is on Java,
            Spring Boot, clean backend design, and simple architectures that
            actually scale.
            <br />
            <br />
            I’ve built real products like{" "}
            <strong>JobNext.in</strong> (AI-first job platform),{" "}
            <strong>Hirenxt AI</strong> (interview & resume screening),{" "}
            <strong>Lavs Dairy</strong> and <strong>GoRide</strong>, constantly
            iterating on performance, reliability, and UX.
            <br />
            <br />
            Right now I’m sharpening my DSA, system design, and AI assistant
            skills to be ready for top product companies. Give me a full-time
            opportunity and a real problem – I’ll learn fast, own the work, and
            prove myself through outcomes, not buzzwords.
          </p>

          <div className="hero-buttons">
            <a href="/projects" className="btn-primary">
              View My Work
            </a>
            <a
              href="mailto:inareshofficial@gmail.com"
              className="btn-secondary"
            >
              Hire / Collaborate
            </a>
            <a
              href="/assets/Singam_Naresh_Resume.pdf"
              className="btn-secondary"
              download
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right: Profile image */}
        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Removed the foggy "hero-orbit" layer */}

          <div className="hero-image-ring">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQHjWNqBgm0RSA/profile-displayphoto-scale_400_400/B56Zo.lAGmJkAg-/0/1761986479409?e=1766016000&v=beta&t=scCtH-9pZVQeiJq94zADhWsTZvtHc9dgY3GvvQYQP2g"
              alt="Naresh profile"
              className="hero-image"
            />
          </div>
        </motion.div>
      </div>

      {/* 3D Hero */}
      <div style={{ marginTop: "1.8rem" }}>
        <ThreeHero />
      </div>

      {/* Startup Banners */}
      <div style={{ marginTop: "1.8rem" }} className="grid grid-2">
        <a
          href="https://jobnext-in.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="card"
        >
          <div className="chip">Flagship</div>
          <h3 style={{ marginTop: "0.6rem", fontSize: "1.1rem" }}>
            JobNext.in – AI-first Job Platform
          </h3>
          <p
            style={{
              marginTop: "0.4rem",
              fontSize: "0.9rem",
              opacity: 0.85,
            }}
          >
            Smart job portal vision focused on skill-based matching and cleaner
            hiring.
          </p>
        </a>

        <a href="#" className="card">
          <div className="chip">In progress</div>
          <h3 style={{ marginTop: "0.6rem", fontSize: "1.1rem" }}>
            Hirenxt AI – AI Interview & Screening
          </h3>
          <p
            style={{
              marginTop: "0.4rem",
              fontSize: "0.9rem",
              opacity: 0.85,
            }}
          >
            AI-driven interviews, resume screening and evaluation workflows for
            modern hiring.
          </p>
        </a>
      </div>
    </section>
  );
}
