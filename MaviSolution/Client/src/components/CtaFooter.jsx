import { useScrollReveal } from '../hooks/useScrollReveal';

export function CTA() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="contact" className="relative text-center py-32 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div ref={ref} className={`relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-4">// Ready to Scale?</p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
          Let's engineer<br />something exceptional.
        </h2>
        <p className="text-muted text-base mb-10 max-w-md mx-auto leading-relaxed">
          Whether you're scaling past 10× traffic or rebuilding your platform from scratch — we've been here before.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="mailto:hello@mavisolution.com"
            className="px-8 py-3.5 bg-accent text-bg font-semibold text-sm rounded-sm hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,212,255,0.3)] transition-all duration-200"
          >
            Start a Conversation
          </a>
          <a
            href="#services"
            className="px-8 py-3.5 bg-transparent text-[#e8f4ff] text-sm border border-white/15 rounded-sm hover:border-accent hover:text-accent transition-all duration-200"
          >
            View Services
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-accent/10 px-8 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <a href="#hero" className="font-mono text-base font-medium text-accent tracking-wide">
        MaVi<span className="text-[#e8f4ff]">Solution</span>
      </a>
      <ul className="flex flex-wrap gap-8 justify-center">
        {['Services', 'Stack', 'Process', 'Contact'].map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} className="text-sm text-muted hover:text-accent transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
      <span className="font-mono text-xs text-muted">© 2025 MaViSolution. All rights reserved.</span>
    </footer>
  );
}
