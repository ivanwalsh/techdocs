const fs = require('fs');
const path = require('path');

const baseUrl = 'https://ivanwalsh.com';
const blogDir = path.resolve(__dirname, '../blog');
const tutorialsDir = path.resolve(__dirname, '../docs/tutorial-basics');
const outputFile = path.resolve(__dirname, '../static/llms.txt');
const fullOutputFile = path.resolve(__dirname, '../static/llms-full.txt');

const AI_TAG_PATTERNS = new Set([
  'ai',
  'llm',
  'llms',
  'mcp',
  'claude',
  'ai-readability',
  'ai-documentation',
  'responsible-ai',
  'model-cards',
  'artificial-intelligence',
]);

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const lines = match[1].split(/\r?\n/);
  const result = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) { i++; continue; }
    const key = kv[1];
    const rawValue = kv[2];
    if (rawValue === '') {
      const arr = [];
      i++;
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        arr.push(stripQuotes(lines[i].replace(/^\s*-\s+/, '').trim()));
        i++;
      }
      result[key] = arr;
      continue;
    }
    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      result[key] = rawValue
        .slice(1, -1)
        .split(',')
        .map((s) => stripQuotes(s.trim()))
        .filter(Boolean);
    } else {
      result[key] = stripQuotes(rawValue);
    }
    i++;
  }
  return result;
}

function stripQuotes(value) {
  return value.replace(/^["']|["']$/g, '');
}

function stripFrontmatter(content) {
  return content.replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*\r?\n?/, '');
}

function extractH1(content) {
  const match = content.match(/^#\s+(.+?)\s*$/m);
  return match ? match[1].trim() : null;
}

function normalizeTag(tag) {
  return String(tag).toLowerCase().replace(/[_\s]+/g, '-').trim();
}

function isAiPost(tags) {
  return (tags || []).map(normalizeTag).some((t) => AI_TAG_PATTERNS.has(t));
}

function readMarkdownFiles(dir, extensions) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((f) => f.isFile() && extensions.some((ext) => f.name.endsWith(ext)))
    .map((f) => {
      const fullPath = path.join(dir, f.name);
      return {
        name: f.name,
        content: fs.readFileSync(fullPath, 'utf8'),
      };
    });
}

function loadTutorials() {
  return readMarkdownFiles(tutorialsDir, ['.md', '.mdx'])
    .map((file) => {
      const fm = parseFrontmatter(file.content);
      const h1 = extractH1(file.content);
      const baseName = file.name.replace(/\.(md|mdx)$/, '');
      const title = fm.title || h1 || baseName;
      const position = Number(fm.sidebar_position) || 999;
      return {
        title,
        position,
        url: `${baseUrl}/tutorial-basics/${baseName}`,
        body: stripFrontmatter(file.content).trim(),
      };
    })
    .sort((a, b) => a.position - b.position || a.title.localeCompare(b.title));
}

function loadBlogPosts() {
  return readMarkdownFiles(blogDir, ['.md'])
    .map((file) => {
      const fm = parseFrontmatter(file.content);
      const slug = (fm.slug || file.name.replace(/\.md$/, '')).replace(/^\/+/, '');
      const title = fm.title || slug.replace(/-/g, ' ');
      const dateFromName = (file.name.match(/^(\d{4}-\d{2}-\d{2})/) || [])[1] || '';
      const date = fm.date || dateFromName;
      const tags = Array.isArray(fm.tags) ? fm.tags : fm.tags ? [fm.tags] : [];
      return {
        title,
        slug,
        date,
        tags,
        url: `${baseUrl}/blog/${slug}`,
        body: stripFrontmatter(file.content).trim(),
      };
    })
    .sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return a.title.localeCompare(b.title);
    });
}

function formatListItem(text, url) {
  return `- ${text}: ${url}`;
}

function buildText({ tutorials, aiPosts, otherPosts }) {
  const lines = [
    '# Ivan Walsh Technical Documentation',
    '',
    '## About',
    '',
    'This file is a lightweight discovery index for the Ivan Walsh documentation site. It is served from the site root at /llms.txt and follows the llms.txt standard.',
    '',
    '## Main site links',
    '',
    formatListItem('Home', `${baseUrl}/`),
    formatListItem('Docs overview', `${baseUrl}/`),
    formatListItem('Articles', `${baseUrl}/blog`),
    formatListItem('About Ivan', `${baseUrl}/Ivan`),
    formatListItem('Newsletter', `${baseUrl}/newsletter`),
    '',
    '## AI and LLM-related links',
    '',
    ...aiPosts.map((p) => formatListItem(p.title, p.url)),
    formatListItem('AI tag page', `${baseUrl}/blog/tags/ai`),
    formatListItem('MCP tag page', `${baseUrl}/blog/tags/mcp`),
    '',
    '## Tutorial and documentation guides',
    '',
    ...tutorials.map((t) => formatListItem(t.title, t.url)),
    '',
    '## Notable blog posts',
    '',
    ...(otherPosts.length
      ? otherPosts.map((p) => formatListItem(p.title, p.url))
      : ['- No blog posts found.']),
    '',
    '## Notes',
    '',
    'This file is generated by scripts/generate-llms-txt.js. It is intended for LLM-friendly discovery and indexing of the main site sections.',
  ];
  return lines.join('\n') + '\n';
}

function renderPageSection(page) {
  return [
    '---',
    '',
    `# ${page.title}`,
    '',
    `Source: ${page.url}`,
    '',
    page.body,
    '',
  ].join('\n');
}

function buildFullText({ tutorials, blogPosts }) {
  const header = [
    '# Ivan Walsh Technical Documentation — Full Content',
    '',
    '## About',
    '',
    'This file is the full-content companion to /llms.txt. It concatenates every tutorial and blog post on ivanwalsh.com as raw Markdown so AI agents can ingest the whole site in a single fetch. Follows the llms-full.txt convention of the llms.txt standard.',
    '',
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    '',
    '## Contents',
    '',
    '### Tutorials',
    '',
    ...tutorials.map((t) => formatListItem(t.title, t.url)),
    '',
    '### Blog posts',
    '',
    ...(blogPosts.length
      ? blogPosts.map((p) => formatListItem(p.title, p.url))
      : ['- No blog posts found.']),
    '',
  ].join('\n');

  const body = [...tutorials, ...blogPosts].map(renderPageSection).join('\n');

  return `${header}\n${body}`;
}

function main() {
  const tutorials = loadTutorials();
  const allPosts = loadBlogPosts();
  const aiPosts = allPosts.filter((p) => isAiPost(p.tags));
  const otherPosts = allPosts.filter((p) => !isAiPost(p.tags));

  const indexText = buildText({ tutorials, aiPosts, otherPosts });
  fs.writeFileSync(outputFile, indexText, 'utf8');
  console.log(
    `Generated ${path.relative(process.cwd(), outputFile)} — ${tutorials.length} tutorials, ${aiPosts.length} AI posts, ${otherPosts.length} other posts.`,
  );

  const fullText = buildFullText({ tutorials, blogPosts: allPosts });
  fs.writeFileSync(fullOutputFile, fullText, 'utf8');
  const sizeKb = (Buffer.byteLength(fullText, 'utf8') / 1024).toFixed(1);
  console.log(
    `Generated ${path.relative(process.cwd(), fullOutputFile)} — ${tutorials.length + allPosts.length} pages, ${sizeKb} KB.`,
  );
}

main();
