import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
];

const projects = [
  {
    id: "portfolio",
    title: "Portfolio Experience",
    type: "Branding • UI/UX",
    description:
      "A personal portfolio built to showcase product thinking, design craft, and frontend execution in a clean, premium experience.",
    link: "https://github.com/",
  },
  {
    id: "booking",
    title: "Booking Flow Redesign",
    type: "Product Design",
    description:
      "A streamlined appointment flow that made booking easier for users and clearer for operators with higher completion intent.",
    link: "https://dribbble.com/",
  },
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    type: "Frontend Build",
    description:
      "A dashboard concept focused on clarity, hierarchy, and fast decision-making with mobile-friendly data presentation.",
    link: "https://www.figma.com/",
  },
];

export default function Projects() {
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Array<HTMLLIElement | null>>([]);
  const topBarRef = useRef<HTMLSpanElement>(null);
  const midBarRef = useRef<HTMLSpanElement>(null);
  const botBarRef = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP({ scope: overlayRef });

  const toggleMenu = contextSafe(() => {
    const next = !open;
    setOpen(next);

    gsap.to(topBarRef.current, {
      rotate: next ? 45 : 0,
      y: next ? 6 : 0,
      duration: 0.35,
      ease: "power3.inOut",
    });
    gsap.to(midBarRef.current, {
      opacity: next ? 0 : 1,
      duration: 0.25,
      ease: "power3.inOut",
    });
    gsap.to(botBarRef.current, {
      rotate: next ? -45 : 0,
      y: next ? -6 : 0,
      duration: 0.35,
      ease: "power3.inOut",
    });

    if (next) {
      gsap.set(overlayRef.current, { display: "flex" });
      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power4.inOut" }
      ).fromTo(
        linkRefs.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" },
        "-=0.25"
      );
    } else {
      const tl = gsap.timeline();
      tl.to(linkRefs.current, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
      }).to(
        overlayRef.current,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "power4.inOut",
          onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
        },
        "-=0.1"
      );
    }
  });

  const closeMenu = contextSafe(() => {
    if (!open) return;
    toggleMenu();
  });

  return (
    <div className="min-h-screen bg-[#f7f5ff] px-8 md:px-16 pt-28 pb-20">
      <nav className="fixed top-0 left-0 w-full z-50 px-8 md:px-16 py-6 flex items-center justify-between backdrop-blur-sm bg-white/70 border-b border-black/5">
        <Link to="/" className="text-lg font-bold text-[#443199] tracking-tight">
          Arssiely<span className="text-[#E05454]">.</span>
        </Link>

        <button
          className="relative z-[60] w-8 h-6 flex flex-col justify-between"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            ref={topBarRef}
            className="block h-[2px] w-full bg-[#443199] origin-center"
          />
          <span
            ref={midBarRef}
            className="block h-[2px] w-full bg-[#443199] origin-center"
          />
          <span
            ref={botBarRef}
            className="block h-[2px] w-full bg-[#443199] origin-center"
          />
        </button>

        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 hidden flex-col items-center justify-center gap-8 bg-white/95 backdrop-blur-sm"
          style={{ display: "none" }}
        >
          <ul ref={panelRef} className="flex flex-row flex-wrap items-center justify-center gap-6 md:gap-8">
            {links.map((link, i) => (
              <li
                key={link.label}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
              >
                <Link
                  to={link.href}
                  onClick={closeMenu}
                  className="text-sm md:text-base font-semibold text-neutral-800 hover:text-[#792CA2] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li
              ref={(el) => {
                linkRefs.current[links.length] = el;
              }}
            >
              <a
                href="mailto:maria.arssiely.delmundo@gmail.com"
                onClick={closeMenu}
                className="bg-[#443199] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#792CA2] transition-colors"
              >
                Let's Talk
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <header className="max-w-5xl mx-auto mb-12">
        <p className="text-sm uppercase tracking-[0.22em] text-[#792CA2] mb-3">Selected work</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900">
          Projects that blend strategy, design, and product thinking.
        </h1>
      </header>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const isOpen = openProject === project.id;

          return (
            <article
              key={project.id}
              className="group rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_20px_50px_rgba(68,49,153,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(68,49,153,0.1)]"
            >
              <div className="mb-5 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-neutral-500">
                <span>{project.type}</span>
                <span className="rounded-full bg-[#f2ecff] px-2 py-1 text-[#443199]">Case study</span>
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-3">{project.title}</h2>
              <p className="text-neutral-600 leading-relaxed mb-6">{project.description}</p>

              <button
                type="button"
                onClick={() => setOpenProject(isOpen ? null : project.id)}
                aria-expanded={isOpen}
                className="inline-flex items-center justify-center rounded-full bg-[#443199] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#792CA2]"
              >
                {isOpen ? "Hide project link" : "View project"}
              </button>

              {isOpen && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#443199]/30 bg-[#f5f1ff] px-4 py-2 text-sm font-semibold text-[#443199] transition-colors hover:border-[#443199] hover:bg-[#ede5ff]"
                >
                  Open project
                </a>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}