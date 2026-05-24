const fs = require('fs');

let readme = fs.readFileSync('README.md', 'utf8');

// Helper: wrap img in <picture> with dark/light sources
function pic(darkSrc, lightSrc, imgAttrs) {
  return `<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="${darkSrc}" />\n  <source media="(prefers-color-scheme: light)" srcset="${lightSrc}" />\n  <img src="${darkSrc}"${imgAttrs} />\n</picture>`;
}

// ============================================================
// 1. Banner
// ============================================================
readme = readme.replace(
  `<img src="assets/banner-v3.svg" width="100%" alt="dev-lou — Full Stack Architect & AI-Native Developer" />`,
  pic(`assets/banner-v3.svg`, `assets/banner-v3-light.svg`, ` width="100%" alt="dev-lou — Full Stack Architect & AI-Native Developer"`)
);

// ============================================================
// 2. Social buttons — match on <img> inside <a>
// ============================================================
// LinkedIn (alt="LinkedIn")
readme = readme.replace(
  /<a href="(https:\/\/www\.linkedin\.com\/[^"]+)"><img src="assets\/social-linkedin\.svg" alt="LinkedIn" \/><\/a>/,
  (m, href) => `<a href="${href}">\n  ${pic(`assets/social-linkedin.svg`, `assets/social-linkedin-light.svg`, ` alt="LinkedIn"`)}\n</a>`
);
// Facebook
readme = readme.replace(
  /<a href="(https:\/\/www\.facebook\.com\/[^"]+)"><img src="assets\/social-facebook\.svg" alt="Facebook" \/><\/a>/,
  (m, href) => `<a href="${href}">\n  ${pic(`assets/social-facebook.svg`, `assets/social-facebook-light.svg`, ` alt="Facebook"`)}\n</a>`
);
// Gmail
readme = readme.replace(
  /<a href="(mailto:[^"]+)"><img src="assets\/social-gmail\.svg" alt="Gmail" \/><\/a>/,
  (m, href) => `<a href="${href}">\n  ${pic(`assets/social-gmail.svg`, `assets/social-gmail-light.svg`, ` alt="Gmail"`)}\n</a>`
);

// ============================================================
// 3. Section header images (simple <img> tags with width=100%)
// ============================================================
const headers = [
  ['header-techstack', 'Tech Stack'],
  ['header-projects', 'Featured Projects'],
  ['header-analytics', 'GitHub Analytics'],
  ['header-achievements', 'Achievements'],
  ['header-pacman', 'Pac-Man Contributions'],
];
for (const [file, alt] of headers) {
  const re = new RegExp(
    `<img src="assets/${file}\\.svg(\\?v=\\d+)?" width="100%" alt="${alt}" \\/>`
  );
  readme = readme.replace(re, (match, ver) => {
    const v = ver || '';
    return pic(`assets/${file}.svg${v}`, `assets/${file}-light.svg${v}`, ` width="100%" alt="${alt}"`);
  });
}

// ============================================================
// 4. Skill icons
// ============================================================
readme = readme.replace(
  /<img src="https:\/\/skillicons\.dev\/icons\?([^"]+)&theme=dark" \/>/g,
  (match, params) => {
    const dark = `https://skillicons.dev/icons?${params}&theme=dark`;
    const light = `https://skillicons.dev/icons?${params}&theme=light`;
    return pic(dark, light, ` alt=""`);
  }
);

// ============================================================
// 5. Project cards (link + img, width=48%)
// ============================================================
const projects = [
  ['SpatialSync', 'project-spatialsync-v2.svg', 'https://github.com/dev-lou/SpatialSync'],
  ['Cict-Store', 'project-cictstore-v2.svg', 'https://github.com/dev-lou/Cict-Store'],
  ['clinic', 'project-clinic-v2.svg', 'https://github.com/dev-lou/clinic'],
  ['OJT-Qr-Pass', 'project-ojt-v2.svg', 'https://github.com/dev-lou/OJT-Qr-Pass'],
];
for (const [name, file, href] of projects) {
  const escaped = href.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
  const re = new RegExp(
    `<a href="${escaped}"><img src="assets\\/${file}" width="48%" alt="${name}" \\/><\\/a>`
  );
  readme = readme.replace(re, () =>
    `<a href="${href}">\n  ${pic(`assets/${file}`, `assets/${file.replace('.svg', '-light.svg')}`, ` width="48%" alt="${name}"`)}\n</a>`
  );
}

// ============================================================
// 6. Dropdown summary headers
// ============================================================
const summaries = [
  ['summary-archive', 'View all projects'],
  ['summary-cloudflare', 'Cloudflare &amp; Edge Infrastructure'],
  ['summary-ai', 'AI-Native Development Workflow'],
  ['summary-devops', 'DevOps &amp; Supply-Chain Automation'],
];
for (const [file, alt] of summaries) {
  // Match both bare <img> and <picture><img></picture> variants
  const re = new RegExp(
    `(?:<picture>)?<img src="assets/${file}\\.svg\\?v=(\\d+)" width="100%" alt="${alt}" \\/>(?:<\\/picture>)?`
  );
  readme = readme.replace(re, (match, v) =>
    pic(`assets/${file}.svg?v=${v}`, `assets/${file}-light.svg?v=${v}`, ` width="100%" alt="${alt}"`)
  );
}

// ============================================================
// 7. Archive rows (link + img, width=100%)
// ============================================================
const archiveHrefs = [
  'https://github.com/dev-lou/SpatialSync',
  'https://github.com/dev-lou/Cict-Store',
  'https://github.com/dev-lou/OJT-Qr-Pass',
  'https://github.com/dev-lou/CICT-QR',
  'https://github.com/dev-lou/clinic',
  'https://github.com/dev-lou/PixelPilot',
  'https://github.com/dev-lou/BaroroStudio',
  '#',
  '#',
];
for (let i = 1; i <= 9; i++) {
  const href = archiveHrefs[i - 1].replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
  const re = new RegExp(
    `<a href="${href}"><img src="assets\\/archive-row-${i}\\.svg\\?v=(\\d+)" width="100%" \\/><\\/a>`
  );
  readme = readme.replace(re, (match, v) =>
    `<a href="${archiveHrefs[i - 1]}">\n  ${pic(`assets/archive-row-${i}.svg?v=${v}`, `assets/archive-row-${i}-light.svg?v=${v}`, ` width="100%"`)}\n</a>`
  );
}

// ============================================================
// 8. Table images (inside details) — match .svg?v= directly
// ============================================================
const tables = [
  'table-cloudflare',
  'table-ai',
  'table-devops',
];
for (const name of tables) {
  const re = new RegExp(
    `<img src="assets/${name}\\.svg\\?v=(\\d+)" width="100%" \\/>`
  );
  readme = readme.replace(re, (match, v) =>
    pic(`assets/${name}.svg?v=${v}`, `assets/${name}-light.svg?v=${v}`, ` width="100%"`)
  );
}

// ============================================================
// 9. Streak stats
// ============================================================
readme = readme.replace(
  /<img src="(https:\/\/streak-stats\.demolab\.com\/\?user=dev-lou[^"]+)" width="48%" alt="GitHub Streak" \/>/,
  (match, darkUrl) => {
    const lightUrl = darkUrl
      .replace('theme=tokyonight', 'theme=github-light')
      .replace('background=0d1117', 'background=ffffff')
      .replace('sideLabels=a9b1d6', 'sideLabels=24292f')
      .replace('currStreakNum=a9b1d6', 'currStreakNum=24292f')
      .replace('sideNums=a9b1d6', 'sideNums=24292f')
      .replace('dates=545d7a', 'dates=8b949e');
    return pic(darkUrl, lightUrl, ` width="48%" alt="GitHub Streak"`);
  }
);

// ============================================================
// 10. Top Languages
// ============================================================
readme = readme.replace(
  /<img src="assets\/top-languages\.svg\?v=(\d+)" width="48%" alt="Top Languages" \/>/,
  (match, v) => pic(`assets/top-languages.svg?v=${v}`, `assets/top-languages-light.svg?v=${v}`, ` width="48%" alt="Top Languages"`)
);

// ============================================================
// 11. Activity graph
// ============================================================
readme = readme.replace(
  /<img src="(https:\/\/github-readme-activity-graph\.vercel\.app\/graph\?username=dev-lou[^"]+)" width="98%" alt="Contribution Graph" \/>/,
  (match, darkUrl) => {
    const lightUrl = darkUrl
      .replace('bg_color=0d1117', 'bg_color=ffffff')
      .replace('area_color=1a1b2e', 'area_color=e8ecf0');
    return pic(darkUrl, lightUrl, ` width="98%" alt="Contribution Graph"`);
  }
);

// ============================================================
// 12. Trophies
// ============================================================
readme = readme.replace(
  /\[!\[Trophies\]\(https:\/\/github-profile-trophy\.vercel\.app\/\?username=dev-lou&theme=tokyonight&no-frame=true&no-bg=true&margin-w=6&row=1&column=7\)\]\(https:\/\/github\.com\/ryo-ma\/github-profile-trophy\)/,
  pic(
    `https://github-profile-trophy.vercel.app/?username=dev-lou&theme=tokyonight&no-frame=true&no-bg=true&margin-w=6&row=1&column=7`,
    `https://github-profile-trophy.vercel.app/?username=dev-lou&theme=flat&no-frame=false&no-bg=false&margin-w=6&row=1&column=7`,
    ` alt="Trophies"`
  )
);

// ============================================================
// 13. Footer quote
// ============================================================
readme = readme.replace(
  /<img src="assets\/footer-quote\.svg\?v=(\d+)" width="100%" alt="AI Developer Quote" \/>/,
  (match, v) => pic(`assets/footer-quote.svg?v=${v}`, `assets/footer-quote-light.svg?v=${v}`, ` width="100%" alt="AI Developer Quote"`)
);

// Bump cache buster on assets
const version = Date.now();
readme = readme.replace(/\?v=\d+/g, `?v=${version}`);

fs.writeFileSync('README.md', readme);
console.log(`README.md updated (v${version}) with dark/light mode support.`);
console.log('Run: node generate-light-svgs.js  to regenerate light SVG variants if assets changed.');
