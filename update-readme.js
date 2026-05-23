const fs = require('fs');
let readme = fs.readFileSync('README.md', 'utf8');

// Bump cache buster
readme = readme.replace(/\?v=3/g, '?v=4');

// 1. Featured Projects
const featuredRegex = /<table width="100%">[\s\S]*?<\/table>/;
const newFeatured = `<div align="center">
  <a href="https://github.com/dev-lou/SpatialSync"><img src="assets/project-spatialsync.svg?v=4" width="48%" alt="SpatialSync" /></a>&nbsp;
  <a href="https://github.com/dev-lou/Cict-Store"><img src="assets/project-cictstore.svg?v=4" width="48%" alt="Cict-Store" /></a><br/><br/>
  <a href="https://github.com/dev-lou/clinic"><img src="assets/project-clinic.svg?v=4" width="48%" alt="clinic" /></a>&nbsp;
  <a href="https://github.com/dev-lou/OJT-Qr-Pass"><img src="assets/project-ojt.svg?v=4" width="48%" alt="OJT-Qr-Pass" /></a>
</div>`;
readme = readme.replace(featuredRegex, newFeatured);

// 2. Archive Projects
const archiveRegex = /\| Project \| Stack \| Live \| Description \|[\s\S]*?\| \*\*21\+ PHP Portals\*\*[\s\S]*?records \|/;
const newArchive = `<a href="https://github.com/dev-lou/SpatialSync"><img src="assets/archive-row-1.svg?v=4" width="100%" /></a><br/>
<a href="https://github.com/dev-lou/Cict-Store"><img src="assets/archive-row-2.svg?v=4" width="100%" /></a><br/>
<a href="https://github.com/dev-lou/OJT-Qr-Pass"><img src="assets/archive-row-3.svg?v=4" width="100%" /></a><br/>
<a href="https://github.com/dev-lou/CICT-QR"><img src="assets/archive-row-4.svg?v=4" width="100%" /></a><br/>
<a href="https://github.com/dev-lou/clinic"><img src="assets/archive-row-5.svg?v=4" width="100%" /></a><br/>
<a href="https://github.com/dev-lou/PixelPilot"><img src="assets/archive-row-6.svg?v=4" width="100%" /></a><br/>
<a href="https://github.com/dev-lou/BaroroStudio"><img src="assets/archive-row-7.svg?v=4" width="100%" /></a><br/>
<a href="#"><img src="assets/archive-row-8.svg?v=4" width="100%" /></a><br/>
<a href="#"><img src="assets/archive-row-9.svg?v=4" width="100%" /></a>`;
readme = readme.replace(archiveRegex, newArchive);

// 3. Cloudflare Table
const cloudflareRegex = /\| Layer \| Tactics \| Performance Impact \| Cost \|[\s\S]*?\| \*\*Auto-Devops\*\*[\s\S]*?\$0 \|/;
const newCloudflare = `<img src="assets/table-cloudflare.svg?v=4" width="100%" />`;
readme = readme.replace(cloudflareRegex, newCloudflare);

// 4. AI Table
const aiRegex = /\| Tool \| Role \| Mode \|[\s\S]*?\| \*\*Zed\*\*[\s\S]*?writing \|/;
const newAi = `<img src="assets/table-ai.svg?v=4" width="100%" />`;
readme = readme.replace(aiRegex, newAi);

// 5. DevOps Table
const devopsRegex = /\| Tool \| Purpose \| Impact \|[\s\S]*?\| \*\*Codium PR Agent\*\*[\s\S]*?suggestions \|/;
const newDevops = `<img src="assets/table-devops.svg?v=4" width="100%" />`;
readme = readme.replace(devopsRegex, newDevops);

fs.writeFileSync('README.md', readme);
console.log('README.md updated completely.');
