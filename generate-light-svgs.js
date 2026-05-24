const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'assets');
const WHITE_PLACEHOLDER = '__WHITE__';
const WHITE_SHORT_PLACEHOLDER = '__WHITE_SHORT__';

const COLOR_MAP = {
  '#0d1117': '#ffffff',
  '#050810': '#f6f8fa',
  '#0a0e1a': '#ffffff',
  '#06080f': '#f0f2f5',
  '#0a0c16': '#f6f8fa',
  '#14172a': '#ffffff',
  '#161b22': '#f0f2f5',
  '#a9b1d6': '#24292f',
  '#7a88cf': '#656d76',
  '#565f89': '#8b949e',
  '#1a1b2e': '#e8ecf0',
  '#0d1f3c': '#d0d7de',
  '#3b4261': '#d0d7de',
};

const SKIP_FILES = ['github-snake.svg', 'github-snake-dark.svg'];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\#]/g, '\\$&');
}

function replaceColors(svgContent) {
  let result = svgContent;

  // Phase 1: Replace all variants of white with placeholders
  // (must match as whole attribute values, not substrings)
  result = result.replace(/"#ffffff"/gi, `"${WHITE_PLACEHOLDER}"`);
  result = result.replace(/"#fff"/gi, `"${WHITE_SHORT_PLACEHOLDER}"`);
  result = result.replace(/="#ffffff"/gi, `="${WHITE_PLACEHOLDER}"`);
  result = result.replace(/="#fff"/gi, `="${WHITE_SHORT_PLACEHOLDER}"`);
  result = result.replace(/fill="#fff"/gi, `fill="${WHITE_SHORT_PLACEHOLDER}"`);
  result = result.replace(/stroke="#fff"/gi, `stroke="${WHITE_SHORT_PLACEHOLDER}"`);
  result = result.replace(/: #ffffff/gi, `: ${WHITE_PLACEHOLDER}`);
  result = result.replace(/: #fff/gi, `: ${WHITE_SHORT_PLACEHOLDER}`);
  // Also handle fill="#FFFFFF" etc (in style blocks)
  result = result.replace(/#ffffff;/gi, `${WHITE_PLACEHOLDER};`);
  result = result.replace(/#fff;/gi, `${WHITE_SHORT_PLACEHOLDER};`);
  // CSS class definitions
  result = result.replace(/stroke: #FFFFFF/gi, `stroke: ${WHITE_PLACEHOLDER}`);
  result = result.replace(/fill: #FFFFFF/gi, `fill: ${WHITE_PLACEHOLDER}`);
  result = result.replace(/stroke: #fff/gi, `stroke: ${WHITE_SHORT_PLACEHOLDER}`);
  result = result.replace(/fill: #fff/gi, `fill: ${WHITE_SHORT_PLACEHOLDER}`);

  // Phase 2: Apply dark→light color mapping
  for (const [dark, light] of Object.entries(COLOR_MAP)) {
    result = result.replace(new RegExp(escapeRegex(dark), 'g'), light);
  }

  // Phase 3: Restore placeholders → dark text for light mode
  result = result.replace(new RegExp(WHITE_PLACEHOLDER, 'g'), '#1f2328');
  result = result.replace(new RegExp(WHITE_SHORT_PLACEHOLDER, 'g'), '#1f2328');

  return result;
}

function shouldSkip(filename) {
  if (SKIP_FILES.includes(filename)) return true;
  if (filename.includes('-light.svg') || filename.includes('-dark.svg')) return true;
  return false;
}

function processFile(filepath, filename) {
  if (shouldSkip(filename)) return;

  const content = fs.readFileSync(filepath, 'utf8');

  const hasDarkColors = Object.keys(COLOR_MAP).some(color =>
    content.includes(color)
  );
  if (!hasDarkColors) return;

  const lightContent = replaceColors(content);

  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);
  const lightFilename = `${basename}-light${ext}`;
  const lightPath = path.join(ASSETS_DIR, lightFilename);

  fs.writeFileSync(lightPath, lightContent);
  const ratio = Math.round((lightContent.length / content.length) * 100);
  console.log(`  ${filename} → ${lightFilename}  (${ratio}%)`);
}

function main() {
  const files = fs.readdirSync(ASSETS_DIR)
    .filter(f => f.endsWith('.svg'))
    .sort();

  console.log('Generating light-mode SVG variants...\n');

  for (const file of files) {
    processFile(path.join(ASSETS_DIR, file), file);
  }

  console.log('\nDone!');
}

main();
