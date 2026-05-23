const fs = require('fs');

const socials = [
  {
    file: 'assets/social-linkedin.svg',
    name: 'LinkedIn',
    color: '#0A66C2',
    icon: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />`
  },
  {
    file: 'assets/social-facebook.svg',
    name: 'Facebook',
    color: '#0866FF',
    icon: `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />`
  },
  {
    file: 'assets/social-gmail.svg',
    name: 'Gmail',
    color: '#EA4335',
    icon: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />`
  }
];

socials.forEach(s => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="40" viewBox="0 0 140 40" fill="none">
  <defs>
    <style>
      .bg { fill: #0d1117; stroke: ${s.color}; stroke-width: 1.5; transition: all 0.3s ease; }
      .bg:hover { fill: #1a1b2e; stroke-width: 2.5; filter: drop-shadow(0 0 6px ${s.color}80); cursor: pointer; }
      .text { fill: #a9b1d6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 1px; }
      @keyframes pulse { 0% { filter: drop-shadow(0 0 2px ${s.color}40); } 50% { filter: drop-shadow(0 0 6px ${s.color}80); } 100% { filter: drop-shadow(0 0 2px ${s.color}40); } }
      .glow-group { animation: pulse 3s infinite; }
    </style>
  </defs>

  <g class="glow-group">
    <rect class="bg" width="136" height="36" x="2" y="2" rx="18" />
    <g transform="translate(15, 8)" stroke="${s.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
      ${s.icon}
    </g>
    <text x="50" y="24" class="text">${s.name.toUpperCase()}</text>
  </g>
</svg>`;
  fs.writeFileSync(s.file, svg);
});
console.log('Social SVGs generated.');
