const fs = require('fs');

const projects = [
  { name: 'SpatialSync', stack: 'Laravel · Three.js · Supabase', live: 'spatialsync.isufstcict.com', desc: '3D Architect engine, face-biometrics, scrollytelling' },
  { name: 'Cict-Store', stack: 'Laravel · Blade · MySQL · Tailwind', live: '—', desc: 'Department E-Commerce suite with PDF invoices' },
  { name: 'OJT-Qr-Pass', stack: 'JavaScript · Node · Vercel', live: 'ojt-qr.vercel.app', desc: 'QR validation attendance dashboard' },
  { name: 'CICT-QR', stack: 'JavaScript · CSS', live: 'cict-qr.vercel.app', desc: 'Real-time event check-in platform' },
  { name: 'clinic', stack: 'Flask · Socket.IO · Python · Gemini', live: '—', desc: 'Clinic record portal with live AI chatbots' },
  { name: 'PixelPilot', stack: 'JavaScript · Gemini API', live: '—', desc: 'Dynamic layout generator and optimization engine' },
  { name: 'BaroroStudio', stack: 'TypeScript · React', live: 'baroro-studio.vercel.app', desc: 'Fully interactive portfolio canvas' },
  { name: 'Church-QR', stack: 'JavaScript · Web Cryptography', live: '—', desc: 'Safe community registration database' },
  { name: '21+ PHP Portals', stack: 'PHP · MySQL · Bootstrap', live: 'Various Local Intranets', desc: 'Grading systems, faculty archives, student records' }
];

projects.forEach((p, i) => {
  const isLive = p.live !== '—' ? '<text x="750" y="35" class="live">↗ LIVE</text>' : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="60" viewBox="0 0 800 60" fill="none">
  <defs>
    <style>
      .bg { fill: #0d1117; stroke: #1a1b2e; stroke-width: 1; transition: all 0.3s ease; }
      .bg:hover { fill: #1a1b2e; stroke: #70a5fd; cursor: pointer; }
      .title { fill: #70a5fd; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: 700; }
      .stack { fill: #a9b1d6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 500; }
      .desc { fill: #7a88cf; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 400; }
      .live { fill: #9ece6a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: 700; text-anchor: end; }
      .line { stroke: #1a1b2e; stroke-width: 1; }
    </style>
  </defs>

  <rect class="bg" width="798" height="58" x="1" y="1" rx="6" />
  
  <text x="20" y="35" class="title">${p.name}</text>
  <text x="160" y="35" class="stack">${p.stack}</text>
  <text x="450" y="35" class="desc">${p.desc}</text>
  ${isLive}
  
  <line class="line" x1="140" y1="10" x2="140" y2="50" />
  <line class="line" x1="430" y1="10" x2="430" y2="50" />
</svg>`;

  fs.writeFileSync('assets/archive-row-' + (i + 1) + '.svg', svg);
});
console.log('Generated 9 archive SVGs.');
