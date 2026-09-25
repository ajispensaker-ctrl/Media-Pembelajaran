import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
const htmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(htmlPath)) {
  console.error("dist/index.html not found, please run vite build first.");
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');

// Temukan tag <link rel="stylesheet" href="..."> dan inline isinya
html = html.replace(/<link rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g, (match, href) => {
  const cssPath = path.join(distDir, href.startsWith('/') ? href.slice(1) : href);
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    return `<style>\n${cssContent}\n</style>`;
  }
  return match;
});

// Temukan tag <script type="module" crossorigin src="..."> dan inline isinya
html = html.replace(/<script type="module"[^>]+src="([^"]+)"[^>]*><\/script>/g, (match, src) => {
  const jsPath = path.join(distDir, src.startsWith('/') ? src.slice(1) : src);
  if (fs.existsSync(jsPath)) {
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    return `<script type="module">\n${jsContent}\n</script>`;
  }
  return match;
});

// Tulis berkas tunggal mandiri
const singleHtmlPath = path.join(distDir, 'index_mandiri_flashdisk.html');
fs.writeFileSync(singleHtmlPath, html, 'utf8');
console.log(` Berhasil membungkus berkas tunggal mandiri (Single-File Offline HTML): ${singleHtmlPath}`);
