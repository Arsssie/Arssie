import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function GradientBackground() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".blob").forEach((blob, i) => {
        gsap.to(blob, {
          x: "+=60",
          y: "+=40",
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="fixed inset-0 -z-10 overflow-hidden bg-white">
      <div className="blob absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#443199]/20 rounded-full blur-[120px]" />
      <div className="blob absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-[#792CA2]/15 rounded-full blur-[140px]" />
      <div className="blob absolute top-[30%] right-[15%] w-[350px] h-[350px] bg-[#C13383]/15 rounded-full blur-[110px]" />
      <div className="blob absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-[#E05454]/15 rounded-full blur-[100px]" />
    </div>
  );
}