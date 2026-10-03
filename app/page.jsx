const projects = [
  {
    title: "Portfolio System",
    description:
      "A fast, durable personal site foundation built with Next.js and ready for real project case studies.",
    meta: "Next.js / JavaScript"
  },
  {
    title: "Interactive Web Work",
    description:
      "A space for experiments, polished UI builds, and frontend systems that feel good to use.",
    meta: "UI engineering"
  },
  {
    title: "Learning Log",
    description:
      "Notes, reflections, and technical writeups can grow here as the portfolio gets more personal.",
    meta: "Writing / Process"
  }
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Samyak Manandhar home">
          SM
        </a>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="mailto:samyak@example.com">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio in progress</p>
          <h1>Samyak Manandhar builds calm, sharp web experiences.</h1>
          <p className="lede">
            This is a clean Next.js foundation for your personal site: fast,
            responsive, and ready for the real projects, writing, and personality
            you want to add next.
          </p>
          <div className="actions">
            <a className="button primary" href="#work">
              View work
            </a>
            <a className="button secondary" href="mailto:samyak@example.com">
              Get in touch
            </a>
          </div>
        </div>

        <div className="signal-card" aria-label="Portfolio highlights">
          <span className="signal-label">Current focus</span>
          <strong>Next.js portfolio setup</strong>
          <p>App Router, responsive CSS, and repo basics are ready.</p>
        </div>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">A starting shelf for the work that matters.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span>{project.meta}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about" id="about" aria-labelledby="about-title">
        <p className="eyebrow">About</p>
        <h2 id="about-title">Make this feel like you.</h2>
        <p>
          Replace this starter copy with your story, favorite projects, skills,
          resume links, and the kind of work you want people to hire you for.
        </p>
      </section>
    </main>
  );
}
