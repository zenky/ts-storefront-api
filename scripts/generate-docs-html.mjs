import { promises as fs } from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const rootDir = process.cwd();
const inputPath = path.join(rootDir, 'DOCS.md');
const outputDir = path.join(rootDir, 'docs');
const outputPath = path.join(outputDir, 'index.html');

marked.setOptions({
  gfm: true,
  breaks: false,
  mangle: false,
  headerIds: false,
});

const buildPage = (content) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Zenky Storefront API SDK Docs</title>
  <style>
    :root {
      --bg: #f8f9fb;
      --surface: #ffffff;
      --text: #1f2937;
      --line: #d1d5db;
      --accent: #0f766e;
      --code-bg: #0b1220;
      --code-text: #e5e7eb;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: radial-gradient(circle at top, #eefbf6 0%, var(--bg) 55%);
      color: var(--text);
      font: 16px/1.6 "IBM Plex Sans", "Segoe UI", Roboto, sans-serif;
    }
    main {
      max-width: 980px;
      margin: 32px auto;
      padding: 24px;
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 12px;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.05);
    }
    h1, h2, h3, h4 {
      margin-top: 1.4em;
      line-height: 1.25;
    }
    h1 {
      margin-top: 0;
      font-size: 2rem;
      color: #0b4d48;
    }
    h2 { font-size: 1.5rem; border-bottom: 1px solid var(--line); padding-bottom: 0.3rem; }
    h3 { font-size: 1.25rem; color: #0b4d48; }
    h4 { font-size: 1.05rem; }
    p, li { color: var(--text); }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      background: #eef2ff;
      color: #1f2937;
      border: 1px solid #c7d2fe;
      border-radius: 4px;
      padding: 0.1rem 0.35rem;
      font-size: 0.92em;
    }
    pre {
      background: var(--code-bg);
      color: var(--code-text);
      border-radius: 8px;
      padding: 14px;
      overflow: auto;
      border: 1px solid #1f2937;
    }
    pre code {
      background: transparent;
      color: inherit;
      border: 0;
      padding: 0;
    }
    ul, ol { padding-left: 1.25rem; }
  </style>
</head>
<body>
  <main>
${content}
  </main>
</body>
</html>
`;

const main = async () => {
  const markdown = await fs.readFile(inputPath, 'utf8');
  const htmlBody = marked.parse(markdown);
  const page = buildPage(htmlBody);

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, page, 'utf8');

  console.log(`Generated: ${path.relative(rootDir, outputPath)}`);
};

main().catch((error) => {
  console.error('Failed to build docs HTML.');
  console.error(error);
  process.exitCode = 1;
});
