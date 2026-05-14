const tools = ['Kubernetes','Terraform','AWS','GCP','Prometheus','Grafana','Helm','ArgoCD','Istio','Vault','Datadog','Cilium'];

export default function Marquee() {
  const doubled = [...tools, ...tools];
  return (
    <div className="relative overflow-hidden border-y border-accent/10 py-4 bg-bg-2">
      <div className="flex gap-12 whitespace-nowrap animate-marquee font-mono text-xs text-muted tracking-[0.15em]">
        {doubled.map((t, i) => (
          <span key={i} className="flex-shrink-0 flex items-center gap-4">
            {t}
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
