
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  EMAIL,
  PHONE,
  LINKEDIN,
  GITHUB,
  RESUME,
  skills,
  experience,
  projects,
  certs,
  nodes,
  pipeline,
  type Project,
} from "./data";

const SECTIONS = [
  "about",
  "skills",
  "experience",
  "projects",
  "certifications",
  "contact",
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".rv").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
}

function useActive() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    SECTIONS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function Roles() {
  const roles = [
    "AI/ML Developer",
    "Full-Stack Developer",
    "Python Developer",
    "Data Analytics Enthusiast",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <p
      className="mono text-lg"
      style={{ color: "var(--cy)" }}
      aria-live="polite"
    >
      {roles[index]}
      <span className="caret">▌</span>
    </p>
  );
}

function Network() {
  const [selected, setSelected] = useState(nodes[0]?.id ?? "");

  const current = nodes.find((node) => node.id === selected) ?? nodes[0];

  const points = nodes.map((node, index) => {
    const angle = (index / nodes.length) * Math.PI * 2 - Math.PI / 2;

    return {
      ...node,
      x: 200 + 140 * Math.cos(angle),
      y: 200 + 140 * Math.sin(angle),
    };
  });

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 400 400"
        role="group"
        aria-label="Interactive technical skills network"
        className="mx-auto w-full max-w-[420px]"
      >
        {points.map((point) => (
          <line
            key={point.id}
            x1="200"
            y1="200"
            x2={point.x}
            y2={point.y}
            stroke={
              selected === point.id ? "var(--cy)" : "var(--line)"
            }
            strokeWidth={selected === point.id ? 2 : 1.5}
            strokeDasharray="4 6"
          />
        ))}

        <circle
          cx="200"
          cy="200"
          r="47"
          fill="var(--surf)"
          stroke="var(--vio)"
          strokeWidth="2"
        />

        <text
          x="200"
          y="204"
          textAnchor="middle"
          fill="var(--tx)"
          className="mono"
          fontSize="11"
        >
          DHEERAJ.SYS
        </text>

        {points.map((point) => (
          <g
            key={point.id}
            tabIndex={0}
            role="button"
            aria-label={point.id}
            aria-pressed={selected === point.id}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setSelected(point.id)}
            onFocus={() => setSelected(point.id)}
            onClick={() => setSelected(point.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelected(point.id);
              }
            }}
          >
            <circle
              cx={point.x}
              cy={point.y}
              r={selected === point.id ? 31 : 27}
              fill="var(--surf)"
              stroke={
                selected === point.id ? "var(--cy)" : "var(--line)"
              }
              strokeWidth="1.5"
            />

            <text
              x={point.x}
              y={point.y + (point.id.includes(" ") ? -3 : 3)}
              textAnchor="middle"
              fill="var(--tx)"
              className="mono"
              fontSize="8"
            >
              {point.id.split(" ").map((word, index) => (
                <tspan
                  key={word + index}
                  x={point.x}
                  dy={index === 0 ? 0 : 10}
                >
                  {word}
                </tspan>
              ))}
            </text>
          </g>
        ))}
      </svg>

      {current && (
        <p
          className="muted mx-auto min-h-[48px] max-w-sm text-center text-sm"
          aria-live="polite"
        >
          <b style={{ color: "var(--cy)" }}>{current.id}</b> — {current.d}
        </p>
      )}
    </div>
  );
}

function Pipeline() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="flex flex-col items-stretch gap-2 md:flex-row">
        {pipeline.map((step, index) => (
          <button
            key={step.n}
            type="button"
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
            className={`chip flex-1 !rounded-xl !p-3 text-left ${
              selected === index ? "on" : ""
            }`}
          >
            {step.n}
          </button>
        ))}
      </div>

      <p
        className="mono mt-3 text-sm"
        style={{ color: "var(--cy)" }}
        aria-live="polite"
      >
        {pipeline[selected]?.d}
      </p>

      <p className="muted mt-2 text-xs">
        Conceptual workflow based on the project description, not a live demo.
      </p>
    </div>
  );
}

function GitHubButton({
  project,
}: {
  project: Project;
}) {
  if (!project.github) return null;

  return (
    <a
      className="btn"
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.title} source code on GitHub`}
    >
      GitHub ↗
    </a>
  );
}

function Modal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButton.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,.68)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="card w-full max-w-2xl overflow-auto"
        style={{ maxHeight: "88vh" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="mono text-xs"
              style={{ color: "var(--cy)" }}
            >
              {project.kind}
            </p>
            <h3 className="mt-1 text-2xl font-semibold">
              {project.title}
            </h3>
          </div>

          <button
            ref={closeButton}
            className="btn"
            type="button"
            onClick={onClose}
            aria-label="Close project details"
          >
            Close
          </button>
        </div>

        <p className="muted mt-4">{project.summary}</p>

        <h4 className="mt-5 font-semibold">Problem</h4>
        <p className="muted mt-1">{project.problem}</p>

        <h4 className="mt-4 font-semibold">Approach</h4>
        <p className="muted mt-1">{project.approach}</p>

        {project.id === "privacyaudit" && (
          <div className="mt-5">
            <h4 className="mb-3 font-semibold">Architecture</h4>
            <Pipeline />
          </div>
        )}

        <h4 className="mt-5 font-semibold">Features</h4>
        <ul className="muted mt-2 list-disc pl-5">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((technology) => (
            <span key={technology} className="chip mono">
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <GitHubButton project={project} />
        </div>
      </div>
    </div>
  );
}

function Palette({
  open,
  setOpen,
  toggleTheme,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggleTheme: () => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const items = [
    ...SECTIONS.map((section) => ({
      name: `Go to ${section[0].toUpperCase()}${section.slice(1)}`,
      action: () => go(section),
    })),
    {
      name: "Toggle theme",
      action: () => {
        toggleTheme();
        setOpen(false);
      },
    },
    {
      name: "Copy email",
      action: () => {
        void navigator.clipboard?.writeText(EMAIL);
        setOpen(false);
      },
    },
    {
      name: "Open resume",
      action: () => {
        window.open(RESUME, "_blank", "noopener,noreferrer");
        setOpen(false);
      },
    },
    {
      name: "Open GitHub",
      action: () => {
        window.open(GITHUB, "_blank", "noopener,noreferrer");
        setOpen(false);
      },
    },
  ].filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24"
      style={{ background: "rgba(0,0,0,.65)" }}
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="card w-full max-w-md"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          autoFocus
          placeholder="Type a command…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
            if (event.key === "Enter" && items[0]) items[0].action();
          }}
          aria-label="Search commands"
        />

        <ul className="mt-2">
          {items.length ? (
            items.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  className="w-full rounded p-2 text-left hover:bg-white/5"
                  onClick={item.action}
                >
                  {item.name}
                </button>
              </li>
            ))
          ) : (
            <li className="muted p-2">No matching command.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function Terminal() {
  const [log, setLog] = useState<string[]>([
    "DHEERAJ.SYS TERMINAL",
    "Type 'help' for commands.",
  ]);
  const [value, setValue] = useState("");

  const commands: Record<string, string> = {
    help: "Commands: help, about, skills, projects, contact, clear",
    about:
      "Dheeraj Suriya — B.Tech CSE (AI/ML), Garden City University, CGPA 8.27/10.0.",
    skills: Object.entries(skills)
      .map(([category, values]) => `${category}: ${values.join(", ")}`)
      .join("\n"),
    projects: projects.map((project) => `• ${project.title}`).join("\n"),
    contact: `Email: ${EMAIL}\nLinkedIn: ${LINKEDIN}\nGitHub: ${GITHUB}`,
  };

  const run = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = value.trim().toLowerCase();
    setValue("");

    if (!command) return;

    if (command === "clear") {
      setLog([]);
      return;
    }

    setLog((previous) => [
      ...previous,
      `$ ${command}`,
      commands[command] ?? `Unknown command '${command}'. Try 'help'.`,
    ]);
  };

  return (
    <div className="card mono text-sm">
      <div
        className="min-h-[120px] max-h-64 overflow-auto whitespace-pre-wrap"
        aria-live="polite"
      >
        {log.join("\n")}
      </div>

      <form onSubmit={run} className="mt-3 flex gap-2">
        <label className="sr-only" htmlFor="terminal-command">
          Terminal command
        </label>
        <input
          id="terminal-command"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="help"
          autoComplete="off"
        />
        <button className="btn" type="submit">
          Run
        </button>
      </form>
    </div>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      setError("");
    } catch {
      setError(`Copy failed. Email me at ${EMAIL}.`);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const from = String(form.get("email") || "").trim();
    const message = String(form.get("msg") || "").trim();

    if (!name || !/^\S+@\S+\.\S+$/.test(from) || message.length < 10) {
      setNote("");
      setError(
        "Enter your name, a valid email address, and a message of at least 10 characters.",
      );
      return;
    }

    setError("");

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${from}`);

    window.location.href =
      `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    setNote(
      "Your email app should open with your message filled in. Press Send to send it.",
    );
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col items-start gap-3">
        <a className="btn" href={`mailto:${EMAIL}`}>
          Email Me
        </a>
        <a className="btn" href={`tel:${PHONE}`}>
          Call +91 9916137007
        </a>
        <a
          className="btn"
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
        <a
          className="btn"
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
        <button className="btn" type="button" onClick={copy}>
          {copied ? "Copied ✓" : "Copy Email"}
        </button>
      </div>

      <form onSubmit={submit} noValidate className="flex flex-col gap-3">
        <label>
          Name
          <input name="name" autoComplete="name" />
        </label>

        <label>
          Email
          <input name="email" type="email" autoComplete="email" />
        </label>

        <label>
          Message
          <textarea name="msg" rows={4} />
        </label>

        {error && (
          <p role="alert" style={{ color: "#f87171" }}>
            {error}
          </p>
        )}

        {note && (
          <p role="status" className="muted">
            {note}
          </p>
        )}

        <button className="btn pri self-start" type="submit">
          Open in Email App
        </button>

        <p className="muted text-xs">
          This form opens your email app. It does not send messages directly
          from the website.
        </p>
      </form>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menu, setMenu] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [category, setCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(0);

  const active = useActive();
  useReveal();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setPaletteOpen((previous) => !previous);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const projectCategories = [
    "All",
    "AI/ML",
    "Data Analytics",
    "Backend",
    "Full Stack",
  ];

  const shownProjects = projects.filter(
    (project) => filter === "All" || project.cat === filter,
  );

  const relatedProjects = selectedSkill
    ? projects.filter((project) =>
        project.tech.some((technology) =>
          technology
            .toLowerCase()
            .includes(selectedSkill.toLowerCase().replace(".js", "")),
        ),
      )
    : [];

  return (
    <>
      <header
        className="sticky top-0 z-40"
        style={{
          background: "color-mix(in srgb,var(--bg) 88%,transparent)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <nav
          className="wrap flex h-16 items-center justify-between"
          aria-label="Main navigation"
        >
          <a href="#top" className="logo text-lg font-bold">
            DHEERAJ<span style={{ color: "var(--cy)" }}>.SYS</span>
          </a>

          <ul className="hidden gap-6 md:flex">
            {SECTIONS.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  aria-current={
                    active === section ? "location" : undefined
                  }
                  style={{
                    color: active === section ? "var(--cy)" : "var(--mut)",
                  }}
                >
                  {section[0].toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-2">
            <button
              className="btn"
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
            >
              ⌘K
            </button>

            <button
              className="btn"
              type="button"
              onClick={toggleTheme}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>

            <button
              className="btn md:hidden"
              type="button"
              onClick={() => setMenu((current) => !current)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
            >
              Menu
            </button>
          </div>
        </nav>

        {menu && (
          <ul
            id="mobile-menu"
            className="wrap flex flex-col gap-2 pb-4 md:hidden"
          >
            {SECTIONS.map((section) => (
              <li key={section}>
                <a
                  className="block py-2"
                  href={`#${section}`}
                  onClick={() => setMenu(false)}
                >
                  {section[0].toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <main id="top">
        <section style={{ paddingTop: 56 }}>
          <div className="wrap grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="mono text-xs muted">
                Computer Science • Artificial Intelligence • Software Engineering
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
                Building Intelligent Systems. Creating Real-World Impact.
              </h1>

              <p className="muted mt-5 max-w-xl">
                I'm Dheeraj Suriya, an AI/ML student and developer exploring
                intelligent applications, privacy-focused AI tools, data
                analytics, and full-stack engineering.
              </p>

              <div className="mt-4">
                <Roles />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn pri" href="#projects">
                  Explore Projects
                </a>

                <a
                  className="btn"
                  href={RESUME}
                  download="Dheeraj_Suriya_Resume.pdf"
                >
                  Download Resume
                </a>

                <a className="btn" href="#contact">
                  Contact Me
                </a>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Degree", "B.Tech CSE (AI/ML)"],
                  ["CGPA", "8.27/10.0"],
                  ["Experience", "AI/ML and Data Analysis"],
                  ["Featured Project", "PrivacyAudit AI"],
                ].map(([heading, value]) => (
                  <div key={heading} className="card !p-3">
                    <dt className="muted">{heading}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col items-center gap-5">
              <div className="group relative">
                <div
                  className="absolute -inset-3 rounded-full opacity-40 blur-xl transition-opacity duration-300 group-hover:opacity-70"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--vio), var(--cy))",
                  }}
                />

                <img
                  src="/profile.jpeg"
                  alt="Dheeraj Suriya"
                  className="relative h-56 w-56 rounded-full object-cover object-[70%_20%] transition-transform duration-300 group-hover:scale-[1.03] md:h-72 md:w-72"
                  style={{
                    border: "3px solid var(--vio)",
                    boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)",
                  }}
                />
              </div>

              <div className="text-center">
                <p className="text-lg font-semibold">Dheeraj Suriya</p>
                <p
                  className="mono mt-1 text-sm"
                  style={{ color: "var(--cy)" }}
                >
                  AI/ML • Software Development
                </p>
              </div>

              <Network />
            </div>
          </div>
        </section>

        <section id="about">
          <div className="wrap rv">
            <h2 className="text-3xl font-bold md:text-4xl">
              Curiosity into Code. Ideas into Systems.
            </h2>

            <p className="muted mt-4 max-w-2xl">
              B.Tech student specializing in AI and Machine Learning, building
              Python-based applications, REST APIs, and full-stack projects.
              Interested in AI-powered applications, privacy auditing, and
              intelligent automation.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Artificial Intelligence and Machine Learning",
                "Generative AI",
                "Backend Engineering",
                "Data Analytics",
                "Privacy-Focused Applications",
                "Full-Stack Development",
              ].map((item) => (
                <div key={item} className="card font-medium">
                  {item}
                </div>
              ))}
            </div>

            <div className="card mt-6">
              <h3 className="font-semibold">Garden City University</h3>
              <p className="muted">
                B.Tech Computer Science &amp; Engineering (AI/ML) · 2024–2028 ·
                CGPA 8.27/10.0
              </p>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="wrap rv">
            <h2 className="text-3xl font-bold">Technical Skills</h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {["All", ...Object.keys(skills)].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`chip ${category === item ? "on" : ""}`}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {Object.entries(skills)
                .filter(([key]) => category === "All" || key === category)
                .flatMap(([key, values]) =>
                  values.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      className={`chip mono ${
                        selectedSkill === skill ? "on" : ""
                      }`}
                      title={key}
                      aria-pressed={selectedSkill === skill}
                      onClick={() =>
                        setSelectedSkill(
                          selectedSkill === skill ? null : skill,
                        )
                      }
                    >
                      {skill}
                    </button>
                  )),
                )}
            </div>

            {selectedSkill && (
              <p className="muted mt-4" aria-live="polite">
                <strong>{selectedSkill}:</strong>{" "}
                {relatedProjects.length
                  ? "Used in " +
                    relatedProjects.map((project) => project.title).join(", ")
                  : "Listed in my technical skills."}
              </p>
            )}
          </div>
        </section>

        <section id="experience">
          <div className="wrap rv">
            <h2 className="text-3xl font-bold">Experience</h2>

            <ol
              className="mt-6 flex flex-col gap-4 border-l pl-6"
              style={{ borderColor: "var(--line)" }}
            >
              {experience.map((item, index) => (
                <li key={`${item.role}-${item.org}`} className="card">
                  <button
                    type="button"
                    className="flex w-full justify-between gap-4 text-left"
                    aria-expanded={expandedExperience === index}
                    onClick={() =>
                      setExpandedExperience(
                        expandedExperience === index ? null : index,
                      )
                    }
                  >
                    <span>
                      <strong>{item.role}</strong>{" "}
                      <span className="muted">· {item.org}</span>
                    </span>
                    <span aria-hidden="true">
                      {expandedExperience === index ? "−" : "+"}
                    </span>
                  </button>

                  {expandedExperience === index && (
                    <ul className="muted mt-3 list-disc pl-5">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="projects">
          <div className="wrap rv">
            <h2 className="text-3xl font-bold">Featured Projects</h2>

            <p className="muted mt-2">
              Explore my projects, technologies, approaches, and source code.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["All", "AI/ML", "Data Analytics", "Backend", "Full Stack"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    className={`chip ${filter === item ? "on" : ""}`}
                    aria-pressed={filter === item}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {shownProjects.map((project) => (
                <article
                  key={project.id}
                  className={`card flex flex-col ${
                    project.id === "privacyaudit" ? "md:col-span-2" : ""
                  }`}
                  style={
                    project.id === "privacyaudit"
                      ? { borderColor: "var(--vio)" }
                      : undefined
                  }
                >
                  <p
                    className="mono text-xs"
                    style={{ color: "var(--cy)" }}
                  >
                    {project.kind}
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    {project.title}
                  </h3>

                  <p className="muted mt-2">{project.summary}</p>

                  {project.id === "privacyaudit" && (
                    <div className="mt-4">
                      <Pipeline />
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((technology) => (
                      <span
                        key={technology}
                        className="chip mono !cursor-default"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setOpenProject(project)}
                    >
                      View Case Study
                    </button>

                    <GitHubButton project={project} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications">
          <div className="wrap rv">
            <h2 className="text-3xl font-bold">Certifications</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certs.map((certificate) => (
                <article key={certificate.t} className="card">
                  <p
                    className="mono text-xs"
                    style={{ color: "var(--cy)" }}
                  >
                    {certificate.c}
                  </p>

                  <h3 className="mt-1 font-semibold">{certificate.t}</h3>
                  <p className="muted mt-1 text-sm">{certificate.i}</p>
                </article>
              ))}
            </div>

            <h3 className="mt-10 text-xl font-semibold">
              Achievements and Activities
            </h3>

            <ul className="muted mt-3 max-w-2xl list-disc pl-5">
              <li>
                Participated in Smart India Hackathon, proposing a DWLR-based
                groundwater-monitoring solution.
              </li>
              <li>
                Contribute learning resources and knowledge-sharing content at
                GenZenius.
              </li>
              <li>
                Completed an Artificial Intelligence virtual internship with
                CodeAlpha.
              </li>
            </ul>
          </div>
        </section>

        <section id="contact">
          <div className="wrap rv">
            <h2 className="text-3xl font-bold md:text-4xl">
              Have an Idea Worth Building?
            </h2>

            <p className="muted mb-8 mt-3 max-w-xl">
              I'm interested in AI/ML projects, software development, and
              internship opportunities. Let's connect and build something
              useful.
            </p>

            <Contact />

            <h3 className="mb-3 mt-12 text-xl font-semibold">
              Interactive Terminal
            </h3>

            <Terminal />
          </div>
        </section>
      </main>

      <footer
        className="wrap py-8 text-sm muted"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        DHEERAJ.SYS — Intelligent Systems. Thoughtful Engineering.
        <span className="ml-2">Press Ctrl+K for commands.</span>
      </footer>

      <Palette
        open={paletteOpen}
        setOpen={setPaletteOpen}
        toggleTheme={toggleTheme}
      />

      {openProject && (
        <Modal
          project={openProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </>
  );
}
