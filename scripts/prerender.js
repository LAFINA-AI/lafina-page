import { preview } from 'vite';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  console.log('Starting pre-rendering preview server...');
  
  // Start the Vite preview server programmatically
  const previewServer = await preview({
    preview: {
      port: 3000,
      host: 'localhost'
    }
  });

  // Get the address to visit
  const address = previewServer.resolvedUrls.local[0] || 'http://localhost:3000/';
  console.log(`Preview server started at ${address}`);

  console.log('Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();

  // Set the window flag to tell the React app this is a pre-render session
  await page.evaluateOnNewDocument(() => {
    window.isPrerender = true;
  });

  console.log(`Navigating to ${address}...`);
  await page.goto(address, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait a small extra cushion to ensure rendering complete
  await new Promise(resolve => setTimeout(resolve, 1500));

  console.log('Extracting page HTML content...');
  const html = await page.content();

  // Clean up browser and preview server
  await browser.close();
  await previewServer.close();

  // Save the pre-rendered HTML back to dist/index.html
  const distPath = path.resolve(__dirname, '../dist/index.html');
  
  if (!fs.existsSync(distPath)) {
    throw new Error(`Build output file does not exist at ${distPath}. Did you run "vite build" first?`);
  }

  fs.writeFileSync(distPath, html, 'utf-8');
  console.log(`Successfully pre-rendered page and overwrote ${distPath}`);
}

prerender().catch(err => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
