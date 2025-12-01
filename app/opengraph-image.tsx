import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 64,
        background: 'linear-gradient(135deg, #0B1220 0%, #0E1A33 100%)',
        color: '#E6EDF3',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          padding: '8px 12px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.08)',
          color: '#7FB1FF',
          fontSize: 24,
          marginBottom: 24,
        }}
      >
        Full Stack Web Developer
      </div>
      <h1
        style={{
          fontSize: 72,
          lineHeight: 1.1,
          margin: 0,
          marginBottom: 16,
          letterSpacing: -1.2,
        }}
      >
        Юрий Королёв
      </h1>
      <p style={{ fontSize: 28, opacity: 0.9, margin: 0 }}>
        Современные веб-приложения: Next.js, TypeScript, PostgreSQL, Docker
      </p>
      <div style={{ marginTop: 40, display: 'flex', gap: 16, color: '#9DB7D5' }}>
        <span>youchoice.vercel.app</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
