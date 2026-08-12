import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Distortion wrapper  ---
interface DistortTextProps {
  children: ReactNode;
  className?: string;
  triggerOnHover?: boolean;
}

function DistortText({
  children,
  className = "",
  triggerOnHover = true,
}: DistortTextProps) {
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const filterId = useRef(`distort-${Math.random().toString(36).slice(2, 9)}`);

  useGSAP(() => {
    if (!turbRef.current) return;
    gsap.to(turbRef.current, {
      attr: { baseFrequency: "0.015 0.03" },
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const handleEnter = () => {
    if (!triggerOnHover || !dispRef.current) return;
    gsap.to(dispRef.current, { attr: { scale: 40 }, duration: 0.6, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (!triggerOnHover || !dispRef.current) return;
    gsap.to(dispRef.current, { attr: { scale: 0 }, duration: 0.8, ease: "power2.out" });
  };

  return (
    <div
      className={className}
      style={{ filter: `url(#${filterId.current})` }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id={filterId.current}>
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            ref={dispRef}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-line", { opacity: 0, y: 60, stagger: 0.12, duration: 0.9 })
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".hero-box", { opacity: 0, scale: 0.9, duration: 0.6 }, "-=0.3");

      gsap.utils.toArray<HTMLElement>(".role-box").forEach((box, i) => {
        gsap.from(box, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: 0.1 * i,
          scrollTrigger: { trigger: box, start: "top 85%" },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} id="home" className="text-neutral-900">
      {/* Hero: centered column with open gutters left/right for moving images */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 md:px-16">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <p className="hero-sub text-[#792CA2] font-medium tracking-wide mb-4">
            Portfolio — Maria Arssiely Del Mundo
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
            <span className="hero-line block">Digital made</span>
            <span className="hero-line block text-[#443199]">thoughtful.</span>
            <span className="hero-line block">Products made</span>
            <span className="hero-line block text-[#C13383]">refreshingly good.</span>
          </h1>

          <DistortText className="hero-sub mt-6 max-w-xl mx-auto text-neutral-600 text-lg">
            IT graduate crafting user-centered products as a Product Owner,
            UI/UX Designer, and Frontend Developer — from Cavite, Philippines.
          </DistortText>

          <div className="hero-box mt-10 flex justify-center gap-4">
            <Link
              to="/projects"
              className="bg-[#443199] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#792CA2] transition-colors"
            >
              See My Work
            </Link>
            <a
              href="mailto:maria.arssiely.delmundo@gmail.com"
              className="border border-neutral-300 text-neutral-800 px-6 py-3 rounded-full hover:border-[#E05454] hover:text-[#E05454] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="px-8 md:px-16 py-24 border-t border-neutral-200">
        <h2 className="text-sm uppercase tracking-widest text-[#792CA2] mb-10 text-center">
          What I bring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="role-box bg-white/70 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#443199]/30 transition-all">
            <h3 className="text-2xl font-bold mb-3 text-[#443199]">Product Owner</h3>
            <p className="text-neutral-600">
              User stories, backlog planning, and coordinating development
              to ship products that solve real problems.
            </p>
          </div>
          <div className="role-box bg-white/70 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#C13383]/30 transition-all">
            <h3 className="text-2xl font-bold mb-3 text-[#C13383]">UI/UX Designer</h3>
            <p className="text-neutral-600">
              Wireframes, prototypes, and user-centered interfaces built in
              Figma — designed to be usable, not just pretty.
            </p>
          </div>
          <div className="role-box bg-white/70 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#E05454]/30 transition-all">
            <h3 className="text-2xl font-bold mb-3 text-[#E05454]">Frontend Developer</h3>
            <p className="text-neutral-600">
              React, TypeScript, and responsive builds that turn designs
              into fast, functioning products.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}