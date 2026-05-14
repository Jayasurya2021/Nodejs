import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Site Reliability Engineering',
    desc: 'SLO/SLA design, error budget management, on-call automation, and chaos engineering to harden your systems against real-world failure modes.',
    tags: ['Prometheus', 'PagerDuty', 'Chaos Mesh', 'Runbooks'],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'DevOps Automation',
    desc: 'CI/CD pipelines, GitOps workflows, and developer platform engineering that eliminate toil and compress deploy cycles from days to minutes.',
    tags: ['ArgoCD', 'Tekton', 'GitHub Actions', 'Backstage'],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: 'Cloud Infrastructure',
    desc: 'Multi-cloud architecture, cost optimisation, infrastructure-as-code at enterprise scale with security and compliance built in from day one.',
    tags: ['Terraform', 'Pulumi', 'AWS/GCP', 'FinOps'],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    title: 'Kubernetes at Scale',
    desc: 'Production cluster design, multi-tenancy, service mesh implementation, and policy enforcement for organisations running thousands of workloads.',
    tags: ['Kubernetes', 'Istio', 'Cilium', 'Karpenter'],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: 'Observability Platform',
    desc: 'Full-stack telemetry: metrics, logs, traces unified across your stack with intelligent alerting and capacity planning dashboards.',
    tags: ['OpenTelemetry', 'Grafana', 'Loki', 'Tempo'],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Security & Compliance',
    desc: 'Zero-trust networking, secrets management, SAST/DAST integration, and SOC2 / ISO 27001 compliance automation into your delivery pipeline.',
    tags: ['Vault', 'OPA', 'Falco', 'Trivy'],
  },
];

export default function Services() {
  const { ref, visible } = useScrollReveal();
  const { ref: gridRef, visible: gridVisible } = useScrollReveal();

  return (
    <section id="services" className="px-6 md:px-16 py-24 max-w-7xl mx-auto">
      <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-3">// What We Do</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
          Platform Services<br />Built for Scale
        </h2>
        <p className="text-muted max-w-lg leading-relaxed mb-14">
          From zero-downtime deployments to sub-millisecond observability — we handle the infrastructure complexity so your teams can ship fearlessly.
        </p>
      </div>

      <div
        ref={gridRef}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 divide-accent/10 border border-accent/10 rounded-sm overflow-hidden transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-bg p-10 border-r border-b border-accent/10 hover:bg-bg-3 transition-colors duration-250 group"
          >
            <div className="text-accent mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{s.icon}</div>
            <h3 className="text-base font-semibold mb-3">{s.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {s.tags.map(t => (
                <span key={t} className="font-mono text-[10px] text-accent border border-accent/20 px-2 py-0.5 rounded-sm tracking-wide">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
