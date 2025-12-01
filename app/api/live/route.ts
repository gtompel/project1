import { NextResponse } from 'next/server';
import pkg from '@/package.json';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const isDevOrPreview =
    process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === 'preview';

  // В проде скрываем эндпоинт, если не передан корректный токен
  if (!isDevOrPreview) {
    const token = request.headers.get('x-live-token');
    if (!token || token !== process.env.LIVE_DEV_TOKEN) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  }
  // Gather environment/build info (best-effort)
  const nextVersion =
    (pkg as any).dependencies?.next || (pkg as any).devDependencies?.next || 'unknown';
  const reactVersion = (pkg as any).dependencies?.react || 'unknown';
  const vercelEnv = process.env.VERCEL_ENV || null;
  const vercel = !!process.env.VERCEL;
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || null;

  const deps = (pkg as any).dependencies || {};
  const usedAPIs = {
    vercelAnalytics: Boolean(deps['@vercel/analytics']),
    stripe: Boolean(deps['@stripe/stripe-js']) || Boolean(deps['@stripe/react-stripe-js']),
    nextThemes: Boolean(deps['next-themes']),
    shadcnUI: Boolean(deps['class-variance-authority']),
    tailwind: Boolean(deps['tailwindcss']),
  };

  return NextResponse.json({
    nextVersion,
    reactVersion,
    environment: {
      vercel,
      vercelEnv,
    },
    time: new Date().toISOString(),
    features: usedAPIs,
    commitSha: isDevOrPreview ? commitSha : null,
  });
}
