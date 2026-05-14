import { useScrollReveal } from '../hooks/useScrollReveal';

const metrics = [
  { val: '99.99%', label: 'Availability across managed platforms' },
  { val: '80%', label: 'Reduction in MTTR after SRE engagement' },
  { val: '10×', label: 'Faster deployment frequency post-automation' },
  { val: '60%', label: 'Average cloud cost reduction via FinOps' },
];

export default function Metrics() {
  const { ref, visible } = useScrollReveal();

  return (
    <div className="bg-bg-2 border-y border-accent/10 py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-3">// Proven at Scale</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Numbers that matter</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map(({ val, label }) => (
              <div key={val} className="relative bg-bg/80 border border-accent/10 rounded-sm p-8 overflow-hidden top-accent-bar">
                <span className="font-mono text-4xl font-medium text-accent block leading-none mb-3">{val}</span>
                <span className="text-sm text-muted leading-relaxed">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
