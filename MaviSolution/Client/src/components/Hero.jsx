const stats = [
  { num: '99.99%', label: 'Uptime SLA' },
  { num: '500+', label: 'Deployments / Day' },
  { num: '<50ms', label: 'P99 Latency' },
  { num: '12+', label: 'Years Engineering' },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 grid-bg">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <span className="relative font-mono text-xs text-accent border border-accent/20 px-4 py-1.5 rounded-sm tracking-[0.2em] uppercase bg-accent/5 mb-10 animate-fadeDown">
        // Next-Gen Platform Engineering
      </span>

      <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 animate-fadeUp">
        Engineering<br />
        <span className="text-gradient">High-Performance</span><br />
        Platforms
      </h1>

      <p className="relative max-w-xl text-muted text-base md:text-lg leading-relaxed mb-10 animate-fadeUp [animation-delay:0.1s]">
        We design, build, and operate mission-critical infrastructure at scale — SRE, DevOps automation, and cloud architecture that never sleeps.
      </p>

      <div className="relative flex flex-wrap gap-4 justify-center animate-fadeUp [animation-delay:0.2s]">
        <a
          href="#services"
          className="px-8 py-3.5 bg-accent text-bg font-semibold text-sm rounded-sm hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,212,255,0.3)] transition-all duration-200"
        >
          Explore Services
        </a>
        <a
          href="#contact"
          className="px-8 py-3.5 bg-transparent text-[#e8f4ff] text-sm border border-white/15 rounded-sm hover:border-accent hover:text-accent transition-all duration-200"
        >
          Talk to Us
        </a>
      </div>

      <div className="relative flex flex-wrap gap-8 md:gap-16 justify-center mt-20 animate-fadeUp [animation-delay:0.3s]">
        {stats.map(({ num, label }) => (
          <div key={label} className="text-center">
            <span className="font-mono text-2xl md:text-3xl font-medium text-accent block">{num}</span>
            <span className="text-xs text-muted uppercase tracking-widest mt-1 block">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
