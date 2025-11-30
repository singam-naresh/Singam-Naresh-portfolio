import { useEffect, useState } from "react";

const roles = [
  "Software Developer",
  "Backend Developer (Java & Spring Boot)",
  "AI Hiring Developer",
  "Full Stack Developer",
];

export default function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return <span className="role-rotate">{roles[index]}</span>;
}
