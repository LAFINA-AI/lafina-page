import { build } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  console.log('Running Vite SSR build...');
  
  // Build the SSR bundle programmatically
  await build({
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-server',
      emptyOutDir: true,
    }
  });

  console.log('Importing server render function...');
  const serverBundlePath = path.resolve(__dirname, '../dist-server/entry-server.js');
  const serverBundleUrl = pathToFileURL(serverBundlePath).href;
  
  // Import the render function from the generated SSR bundle
  const { render } = await import(serverBundleUrl);

  console.log('Rendering application to string...');
  const { html: renderedHtml } = render();

  // Read the client build index.html
  const distIndexHtmlPath = path.resolve(__dirname, '../dist/index.html');
  if (!fs.existsSync(distIndexHtmlPath)) {
    throw new Error(`Client build index.html not found at ${distIndexHtmlPath}. Make sure standard "vite build" runs first.`);
  }

  let indexHtml = fs.readFileSync(distIndexHtmlPath, 'utf-8');

  // Inject the pre-rendered HTML into the root div
  console.log('Injecting pre-rendered HTML into index.html...');
  const rootDivSearch = '<div id="root"></div>';
  if (!indexHtml.includes(rootDivSearch)) {
    throw new Error('Could not find <div id="root"></div> in dist/index.html');
  }

  indexHtml = indexHtml.replace(rootDivSearch, `<div id="root">${renderedHtml}</div>`);

  // Save the result back to dist/index.html
  fs.writeFileSync(distIndexHtmlPath, indexHtml, 'utf-8');
  console.log(`Successfully pre-rendered HTML and saved to ${distIndexHtmlPath}`);

  // Clean up the temporary dist-server directory
  console.log('Cleaning up temporary dist-server build files...');
  fs.rmSync(path.resolve(__dirname, '../dist-server'), { recursive: true, force: true });
}

prerender().catch(err => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
