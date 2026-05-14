import { useScrollReveal } from '../hooks/useScrollReveal';

const steps = [
  { num: '01 // DISCOVER', title: 'Architecture Audit', desc: 'We map your existing stack, identify failure domains, and benchmark against industry SLOs.' },
  { num: '02 // DESIGN', title: 'Platform Blueprint', desc: 'Tailored IaC blueprints, runbook templates, and observability strategy aligned to your roadmap.' },
  { num: '03 // BUILD', title: 'Automated Delivery', desc: 'We implement with zero-downtime migrations, feature flags, and progressive rollout patterns.' },
  { num: '04 // OPERATE', title: 'Continuous Ops', desc: '24/7 SRE coverage, error budget reviews, capacity planning, and knowledge transfer to your team.' },
];

const terminalLines = [
  { type: 'cmd', text: 'kubectl rollout status deployment/api-gateway -n production' },
  { type: 'out', text: 'Waiting for deployment "api-gateway" rollout to finish: 1 out of 3 new replicas...' },
  { type: 'out', text: 'Waiting for deployment "api-gateway" rollout to finish: 2 out of 3 new replicas...' },
  { type: 'success', text: '✓ deployment "api-gateway" successfully rolled out' },
  { type: 'cmd', text: 'argo app sync platform-stack --prune' },
  { type: 'success', text: '✓ Synced  platform-stack  Healthy' },
  { type: 'cmd', text: 'terraform apply -auto-approve' },
  { type: 'out', text: 'Apply complete! Resources: 12 added, 3 changed, 0 destroyed.' },
];

export default function Process() {
  const { ref, visible } = useScrollReveal();
  const { ref: stepsRef, visible: stepsVisible } = useScrollReveal();
  const { ref: termRef, visible: termVisible } = useScrollReveal();

  return (
    <section id="process" className="border-t border-accent/10 py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-3">// How We Work</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Structured.<br />Transparent. Fast.
          </h2>
          <p className="text-muted max-w-lg leading-relaxed mb-14">
            A repeatable engineering process that scales from startup to enterprise.
          </p>
        </div>

        <div
          ref={stepsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 transition-all duration-700 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {steps.map((s, i) => (
            <div key={i} className="p-8 border border-accent/10 border-b-0 md:border-r last:border-r-0">
              <span className="font-mono text-[10px] text-accent tracking-[0.15em] block mb-4">{s.num}</span>
              <h3 className="text-base font-semibold mb-3">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Terminal */}
        <div
          ref={termRef}
          className={`mt-12 border border-accent/10 rounded-sm overflow-hidden bg-[#020d14] font-mono transition-all duration-700 ${termVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-accent/5 border-b border-accent/10">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
            <span className="text-[11px] text-muted ml-2 tracking-wide">mavi@platform-core ~ deploy.sh</span>
          </div>

          <div className="p-6 text-[13px] leading-8">
            {terminalLines.map((line, i) => (
              <div key={i}>
                {line.type === 'cmd' && (
                  <span>
                    <span className="text-accent">$ </span>
                    <span className="text-[#e8f4ff]">{line.text}</span>
                  </span>
                )}
                {line.type === 'out' && <span className="text-muted">{line.text}</span>}
                {line.type === 'success' && <span className="text-accent-3">{line.text}</span>}
              </div>
            ))}
            <div>
              <span className="text-accent">$ </span>
              <span className="inline-block w-1.5 h-4 bg-accent align-middle animate-blink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
