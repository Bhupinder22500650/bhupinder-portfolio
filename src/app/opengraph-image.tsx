import { ImageResponse } from 'next/og';
import { PERSONAL_INFO } from '@/data/site';

export const alt = 'Bhupinder Singh — Software Testing, IT Support and Full-Stack Development';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', background: '#1B1917', color: '#F4ECE8', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', fontSize: 24, color: '#D29871', marginBottom: 32 }}>Wellington, New Zealand</div>
      <div style={{ display: 'flex', fontSize: 84, fontWeight: 700 }}>{PERSONAL_INFO.name}</div>
      <div style={{ display: 'flex', fontSize: 30, marginTop: 32, color: '#C1B4AE' }}>Software Testing · IT Support · Full-Stack Development</div>
      <div style={{ display: 'flex', width: 120, height: 6, background: '#D29871', marginTop: 48 }} />
    </div>,
    size,
  );
}
