import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface DistortTextProps {
  children: ReactNode;
  className?: string;
  triggerOnHover?: boolean;
}

export default function DistortText({
  children,
  className = "",
  triggerOnHover = true,
}: DistortTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const filterId = useRef(`distort-${Math.random().toString(36).slice(2, 9)}`);

  useGSAP(() => {
    if (!turbRef.current || !dispRef.current) return;
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
    gsap.to(dispRef.current, {
      attr: { scale: 40 },
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!triggerOnHover || !dispRef.current) return;
    gsap.to(dispRef.current, {
      attr: { scale: 0 },
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={wrapperRef}
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