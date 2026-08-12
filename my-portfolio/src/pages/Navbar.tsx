import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
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
      // Open: reveal overlay then stagger links in
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
      // Close: collapse links then overlay
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
    <nav className="fixed top-0 left-0 w-full z-50 px-8 md:px-16 py-6 flex items-center justify-between backdrop-blur-sm bg-white/70 border-b border-black/5">
      <a href="#home" className="text-lg font-bold text-[#443199] tracking-tight">
        Arssiely<span className="text-[#E05454]">.</span>
      </a>

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
              <a
                href={link.href}
                onClick={closeMenu}
                className="text-sm md:text-base font-semibold text-neutral-800 hover:text-[#792CA2] transition-colors"
              >
                {link.label}
              </a>
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
  );
}