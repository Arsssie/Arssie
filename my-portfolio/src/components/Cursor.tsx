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
    const grow = () => gsap.to(cursor, { scale: 2.5, duration: 0.3 });
    const shrink = () => gsap.to(cursor, { scale: 1, duration: 0.3 });
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden md:block fixed top-0 left-0 w-4 h-4 bg-[#443199] rounded-full pointer-events-none z-[9999] opacity-70 -translate-x-1/2 -translate-y-1/2"
    />
  );
}