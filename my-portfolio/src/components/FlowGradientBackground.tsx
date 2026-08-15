import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface FlowGradientBackgroundProps {
  className?: string;
}

export default function FlowGradientBackground({ className = "" }: FlowGradientBackgroundProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".flow-blob").forEach((blob, i) => {
        gsap.to(blob, {
          x: `+=${20 + i * 15}`,
          y: `+=${15 + i * 10}`,
          scale: 1.15,
          duration: 5 + i * 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="flow-blob absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-[#443199] blur-3xl opacity-70 mix-blend-screen" />
      <div className="flow-blob absolute top-1/3 -right-1/4 w-2/3 h-2/3 rounded-full bg-[#C13383] blur-3xl opacity-70 mix-blend-screen" />
      <div className="flow-blob absolute -bottom-1/4 left-1/4 w-2/3 h-2/3 rounded-full bg-[#792CA2] blur-3xl opacity-60 mix-blend-screen" />
      <div className="flow-blob absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-[#FFC858] blur-3xl opacity-40 mix-blend-screen" />
      <div className="absolute inset-0 bg-[#443199]" />
    </div>
  );
}