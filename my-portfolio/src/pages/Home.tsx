import { useRef, useState, useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FlowGradientBackground from "../components/FlowGradientBackground";

import capstoneImg from "../assets/capstone.png";
import i7Img from "../assets/i7.png";
import loginImg from "../assets/login.svg";

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

// --- "What I bring" carousel ---
const roleSlides = [
  {
    label: "PRODUCT OWNER",
    title: "User stories, backlog planning, and coordinating development.",
    color: "#443199",
  },
  {
    label: "UI/UX DESIGNER",
    title: "Wireframes, prototypes, and user-centered interfaces in Figma.",
    color: "#C13383",
  },
  {
    label: "FRONTEND DEVELOPER",
    title: "React, TypeScript, and responsive builds that ship fast.",
    color: "#E05454",
  },
];

function WhatIBring() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % roleSlides.length);
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [paused]);

  useGSAP(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, {
      xPercent: -active * 100,
      duration: 0.9,
      ease: "power3.inOut",
    });
  }, [active]);

  return (
    <section
      id="about"
      className="relative px-8 md:px-16 py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #0a0a0f 0%, #1a0f2e 35%, #2b1240 65%, #170a26 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: intro */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white leading-snug">
            I am Maria Arssiely,
            <br />I build{" "}
            <span className="italic text-[#E893C4]">thoughtful</span>
            <br />
            yet functional & refreshing
            <br />
            products for the web
          </h2>
          <p className="mt-6 text-xs tracking-widest uppercase text-neutral-400">
            Product Owner / UI-UX / Frontend
          </p>
        </div>

        {/* Right: glass carousel card */}
        <div
          className="relative rounded-3xl overflow-hidden h-[380px] md:h-[420px] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none z-20" />

          <div ref={trackRef} className="flex h-full relative z-10 w-full">
            {roleSlides.map((slide) => (
              <div
                key={slide.label}
                className="h-full w-full shrink-0 flex flex-col justify-between p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                    {slide.label}
                  </h3>
                  <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0 hover:bg-white/10 hover:border-white/60 transition-colors cursor-pointer"
                  >
                    →
                  </button>
                </div>
                <p className="text-white/80 text-base max-w-sm">{slide.title}</p>
              </div>
            ))}
          </div>

          <div
            className="absolute -inset-10 -z-0 opacity-50 blur-3xl transition-colors duration-700"
            style={{ backgroundColor: roleSlides[active].color }}
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {roleSlides.map((slide, i) => (
              <button
                key={slide.label}
                onClick={() => setActive(i)}
                aria-label={`Go to ${slide.label}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Project data ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  offset?: boolean;
  image?: string;
}

const projects: Project[] = [
  {
    title: "Infirmary Management System",
    description: "Product Owner & Frontend — built for Tagaytay City Science National High School.",
    tags: ["React", "Product Owner"],
    image: loginImg,
  },
  {
    title: "Appointment Scheduling App",
    description: "UI/UX design, prototyping, and ReactJS frontend for web & mobile.",
    tags: ["Figma", "ReactJS"],
    offset: true,
    image: capstoneImg,
  },
  {
    title: "Shopping Website",
    description: "PHP web app with product listing, cart, and CRUD operations.",
    tags: ["PHP", "MySQL"],
  },
  {
    title: "Intelliseven OJT",
    description: "Designed and developed responsive web interfaces during internship.",
    tags: ["React", "UI/UX"],
    offset: true,
    image: i7Img,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const rotations = ["-rotate-6", "rotate-2", "-rotate-3", "rotate-5"];
  const verticalOffsets = ["translate-y-6", "-translate-y-4", "-translate-y-2", "translate-y-2"];
  const rotation = rotations[index % rotations.length];
  const offset = verticalOffsets[index % verticalOffsets.length];

  return (
    <div
      className={`project-card group relative shrink-0 w-55 md:w-85 h-[420px] md:h-[480px] rounded-3xl p-5 shadow-xl transition-transform duration-700 ease-out flex flex-col overflow-hidden ${rotation} ${offset} hover:rotate-0 hover:translate-y-0 hover:scale-105 hover:z-20`}
      style={{ marginLeft: index === 0 ? 0 : "-2rem" }}
    >
      <FlowGradientBackground className="rounded-3xl -z-10" />

      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="relative z-10 w-full h-48 md:h-56 rounded-2xl object-cover mb-4"
        />
      ) : (
        <div className="relative z-10 w-full h-48 md:h-56 rounded-2xl bg-neutral-100/90 mb-4" />
      )}
      <h3 className="relative z-10 text-white font-semibold text-base mb-1">{project.title}</h3>
      <p className="relative z-10 text-white/70 text-xs line-clamp-2">{project.description}</p>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-line", { opacity: 0, y: 60, stagger: 0.12, duration: 0.9 })
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".hero-box", { opacity: 0, scale: 0.9, duration: 0.6 }, "-=0.3");

      // --- Projects section: PIN in place, cards pop out while pinned ---
      if (projectsSectionRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");

        gsap.set(cards, { opacity: 0, scale: 0.3, rotation: 0, y: 0 });

        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        cards.forEach((card, i) => {
          const finalRotation = [-6, 2, -3, 5][i % 4];
          pinTl.to(
            card,
            {
              opacity: 1,
              scale: 1,
              rotation: finalRotation,
              ease: "back.out(1.7)",
              duration: 0.6,
            },
            i * 0.25
          );
        });

        // --- Floating idle animation once cards have settled ---
        let floatTweens: gsap.core.Tween[] = [];

        const startFloating = () => {
          floatTweens = cards.map((card, i) =>
            gsap.to(card, {
              y: "+=12",
              duration: 2 + i * 0.3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * 0.2,
            })
          );
        };

        const stopFloating = () => {
          floatTweens.forEach((tween) => tween.kill());
          floatTweens = [];
          gsap.set(cards, { y: 0 });
        };

        ScrollTrigger.create({
          trigger: projectsSectionRef.current,
          start: "top top",
          end: "+=100%",
          onLeave: startFloating,
          onEnterBack: stopFloating,
        });
      }
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
            
              <a href="mailto:maria.arssiely.delmundo@gmail.com"
              className="border border-neutral-300 text-neutral-800 px-6 py-3 rounded-full hover:border-[#E05454] hover:text-[#E05454] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* WHAT I BRING — dark carousel */}
      <WhatIBring />

      {/* PROJECTS PREVIEW — pinned pop-out, then floats */}
      <section
        ref={projectsSectionRef}
        id="work"
        className="px-8 md:px-16 py-24 border-t border-neutral-200 min-h-screen flex items-center overflow-hidden"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <h2 className="text-sm uppercase tracking-widest text-[#792CA2]">
              Selected Work
            </h2>
            <Link
              to="/projects"
              className="text-sm font-medium text-[#443199] hover:text-[#792CA2] transition-colors"
            >
              View all projects →
            </Link>
          </div>

          <div className="flex justify-center items-center flex-wrap md:flex-nowrap px-4">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}