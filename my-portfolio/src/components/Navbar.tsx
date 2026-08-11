import { useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 md:px-16 py-6 flex items-center justify-between backdrop-blur-sm bg-white/70 border-b border-black/5">
      <a href="#home" className="text-lg font-bold text-[#443199] tracking-tight">
        Arssiely<span className="text-[#E05454]">.</span>
      </a>

      <ul className="hidden md:flex gap-8 text-sm text-neutral-700">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="hover:text-[#792CA2] transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="mailto:maria.arssiely.delmundo@gmail.com"
        className="hidden md:inline-block bg-[#443199] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#792CA2] transition-colors"
      >
        Let's Talk
      </a>
      <button
        className="md:hidden text-[#443199]"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <ul className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm flex flex-col items-center gap-6 py-8 md:hidden border-b border-black/5">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-neutral-700 hover:text-[#792CA2] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}