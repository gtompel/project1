'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type LiveData = {
  nextVersion: string;
  reactVersion: string;
  vercel: boolean;
  vercelEnv: string | null;
  commitSha: string | null;
  time: string;
  usedAPIs: Record<string, boolean>;
};

export function LiveDev({
  inline = false,
  buttonClassName,
}: {
  inline?: boolean;
  buttonClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<LiveData | null>(null);
  const [perf, setPerf] = React.useState<{
    ttfb?: number;
    fcp?: number;
    domContentLoaded?: number;
    load?: number;
  }>({});

  React.useEffect(() => {
    if (!open || data) return;
    fetch('/api/live')
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [open, data]);

  React.useEffect(() => {
    if (!open) return;
    try {
      const nav = performance.getEntriesByType('navigation')[0] as
        | PerformanceNavigationTiming
        | undefined;
      const paint = performance.getEntriesByType('paint') as PerformanceEntry[];
      const fcpEntry = paint.find((e) => e.name === 'first-contentful-paint');
      setPerf({
        ttfb: nav ? nav.responseStart : undefined,
        domContentLoaded: nav ? nav.domContentLoadedEventEnd : undefined,
        load: nav ? nav.loadEventEnd : undefined,
        fcp: fcpEntry ? (fcpEntry as any).startTime : undefined,
      });
    } catch {}
  }, [open]);

  return (
    <>
      <div className={inline ? undefined : 'fixed right-4 bottom-4 z-[60]'}>
        <Button
          variant="outline"
          size="icon"
          className={buttonClassName ?? (inline ? 'h-8 w-8' : 'h-10 w-10')}
          aria-label="Live Dev Mode"
          onClick={() => setOpen((v) => !v)}
        >
          {'</>'}
        </Button>
      </div>

      {open && (
        <div
          className={
            inline
              ? 'fixed right-4 top-16 z-[60] w-[340px] max-w-[90vw]'
              : 'fixed right-4 bottom-16 z-[60] w-[340px] max-w-[90vw]'
          }
        >
          <Card className="p-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <strong>Live Dev Mode</strong>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Закрыть
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-muted-foreground">Next.js</span>
              <span>{data?.nextVersion ?? '...'}</span>
              <span className="text-muted-foreground">React</span>
              <span>{data?.reactVersion ?? '...'}</span>
              <span className="text-muted-foreground">Vercel</span>
              <span>{data?.vercel ? `${data.vercelEnv ?? 'on'}` : 'local'}</span>
              <span className="text-muted-foreground">Commit</span>
              <span>{data?.commitSha?.slice(0, 7) ?? 'n/a'}</span>
            </div>
            <div className="pt-2">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Performance
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">TTFB</span>
                <span>{perf.ttfb ? `${Math.round(perf.ttfb)} ms` : '—'}</span>
                <span className="text-muted-foreground">FCP</span>
                <span>{perf.fcp ? `${Math.round(perf.fcp)} ms` : '—'}</span>
                <span className="text-muted-foreground">DCL</span>
                <span>
                  {perf.domContentLoaded ? `${Math.round(perf.domContentLoaded)} ms` : '—'}
                </span>
                <span className="text-muted-foreground">Load</span>
                <span>{perf.load ? `${Math.round(perf.load)} ms` : '—'}</span>
              </div>
            </div>
            <div className="pt-2">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">APIs</div>
              <ul className="list-disc pl-5 space-y-1">
                {data ? (
                  Object.entries(data?.usedAPIs ?? {}).map(([k, v]) => (
                    <li key={k} className={v ? '' : 'opacity-50'}>
                      {k}
                      {v ? '' : ' (нет)'}
                    </li>
                  ))
                ) : (
                  <li>...</li>
                )}
              </ul>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
