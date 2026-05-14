import { useScrollReveal } from '../hooks/useScrollReveal';

const stack = [
  { name: 'Kubernetes', icon: <circle cx="12" cy="12" r="9"/>, extra: <path d="M12 3v18M3 12h18"/> },
  { name: 'Terraform' },
  { name: 'AWS' },
  { name: 'GCP' },
  { name: 'Helm' },
  { name: 'Grafana' },
  { name: 'ArgoCD' },
  { name: 'Vault' },
  { name: 'Istio' },
  { name: 'Cilium' },
  { name: 'Python' },
  { name: 'Go' },
];

// Simple generic icon for each tool
const ToolIcon = ({ name }) => {
  const icons = {
    Kubernetes: <><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></>,
    Terraform: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>,
    AWS: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/>,
    GCP: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918"/>,
    Helm: <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"/>,
    Grafana: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>,
    ArgoCD: <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3"/>,
    Vault: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>,
    Istio: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3"/>,
    Cilium: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 3a8.997 8.997 0 017.843 4.582M12 3C9.515 3 7.5 7.03 7.5 12s2.015 9 4.5 9"/>,
    Python: <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>,
    Go: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>,
  };
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

export default function Stack() {
  const { ref, visible } = useScrollReveal();
  const { ref: gridRef, visible: gridVisible } = useScrollReveal();

  return (
    <section id="stack" className="px-6 md:px-16 py-24 max-w-7xl mx-auto">
      <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-3">// Our Stack</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The Tools We Trust</h2>
        <p className="text-muted max-w-lg leading-relaxed mb-12">
          Battle-tested open-source tooling and cloud-native standards — never vendor lock-in, always best-of-breed.
        </p>
      </div>

      <div
        ref={gridRef}
        className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {stack.map(({ name }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2.5 py-5 px-2 border border-accent/10 rounded-sm bg-bg-2 font-mono text-[11px] text-muted hover:border-accent hover:text-accent transition-all duration-200 cursor-default"
          >
            <ToolIcon name={name} />
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
