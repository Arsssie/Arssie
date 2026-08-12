import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", move);

    const hoverables = document.querySelectorAll("a, button");
    const grow = () => gsap.to(cursor, { scale: 2.2, duration: 0.3 });
    const shrink = () => gsap.to(cursor, { scale: 1, duration: 0.3 });
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Same distortion technique as DistortText in Home.tsx, reused for the cursor lens */}
      <svg width="0" height="0" style={{ position: "fixed" }} aria-hidden="true">
        <filter id="cursor-glass">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            seed="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        ref={cursorRef}
        className="hidden md:block"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: "9999px",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          backdropFilter: "url(#cursor-glass) blur(3px) saturate(1.4) contrast(1.05)",
          WebkitBackdropFilter: "blur(6px) saturate(1.4) contrast(1.05)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow:
            "inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.15), 0 2px 10px rgba(0,0,0,0.15)",
        }}
      />
    </>
  );
}