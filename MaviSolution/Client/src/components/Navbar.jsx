import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Services', 'Stack', 'Process'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-300 ${scrolled ? 'bg-[#050a0f]/90 backdrop-blur-md border-b border-accent/10' : 'bg-transparent'}`}>
      <a href="#hero" className="font-mono text-xl font-medium text-accent tracking-wide">
        MaVi<span className="text-[#e8f4ff]">Solution</span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-10">
        {links.map(l => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className="text-xs text-muted uppercase tracking-widest hover:text-accent transition-colors duration-200"
            >
              {l}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="font-mono text-xs text-accent border border-accent px-5 py-2 rounded-sm tracking-widest uppercase hover:bg-accent hover:text-bg transition-all duration-200"
          >
            Get in Touch
          </a>
        </li>
      </ul>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-muted hover:text-accent transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          {menuOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-bg-2 border-b border-accent/10 px-8 py-6 flex flex-col gap-4 md:hidden">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-muted uppercase tracking-widest hover:text-accent transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            className="font-mono text-xs text-accent border border-accent px-5 py-2 rounded-sm tracking-widest uppercase text-center hover:bg-accent hover:text-bg transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}
