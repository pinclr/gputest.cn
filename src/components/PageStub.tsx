interface Props {
  title: string;
  desc?: string;
  taskRef?: string;
}

export function PageStub({ title, desc, taskRef }: Props) {
  return (
    <section className="container-x py-22">
      <div className="surface p-10 animate-fade-in">
        <div className="font-mono text-xs uppercase tracking-widest text-ink-dim">
          {taskRef ?? 'GPUTest · 核芯'}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        {desc && <p className="mt-4 max-w-2xl text-ink-muted">{desc}</p>}
        <div className="mt-8 inline-flex items-center gap-2 rounded-md border border-border-strong bg-bg-elevated px-3 py-1.5 text-xs text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-amber"></span>
          <span>页面正在建设中</span>
        </div>
      </div>
    </section>
  );
}
