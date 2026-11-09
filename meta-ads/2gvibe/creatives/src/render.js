// Renders an HTML file to PNG at a given size. Usage: node render.js in.html out.png W H [transparent]
const { chromium } = require('playwright');
(async () => {
  const [inp, out, W, H, transp] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +W, height: +H }, deviceScaleFactor: 1 });
  await p.goto('file://' + require('path').resolve(inp));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: out, omitBackground: transp === 't' });
  await b.close();
})();
