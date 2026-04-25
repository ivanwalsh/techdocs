---
title: "Why I Added an llms.txt to My Documentation Site — and You Should Too"
description: "A technical writer's guide to the llms.txt standard — what it is, why it matters for AI accuracy, and how to auto-generate it on every build."
date: 2026-04-03
authors: [ivanwalsh]
tags:
  - claude
  - documentation
  - ai-readability
  - technical-writing
category: "Documentation Engineering"
slug: "why-i-added-llms-txt-to-my-docs-site"
draft: false
---

# Why I Added an llms.txt to My Documentation Site — and You Should Too

> **Technical Writing · Documentation · April 2026**

Your docs are already being read by AI. The question is whether they're being read well — or whether a language model is piecing together a garbled summary from whatever it can scrape.

A few months ago I audited how several popular LLMs described our product's API. The results were humbling. Outdated endpoint names. Deprecated parameters presented as current. Hallucinated response shapes. The AI wasn't lying — it was doing its best with fragmented, unstructured context pulled from a dozen cached pages across our docs site.

The fix turned out to be surprisingly small: a single plain-text file called `llms.txt`, placed at the root of our documentation domain. Since adding it, AI-assisted developer support tickets citing our docs have become markedly more accurate. Here's everything I learned building it.

<!-- truncate -->

## What exactly is llms.txt?

The `llms.txt` standard — proposed by Jeremy Howard and the fast.ai team — is an open convention for giving AI models a clean, navigable map of your site's content. It lives at `yourdomain.com/llms.txt` and follows a simple Markdown structure:

- A short description of what the site is and who it's for
- An optional list of blocked or low-quality sections
- An organised set of links to your most important content, each with a one-line description

Think of it as `robots.txt` for AI context — not access control, but a curated index that helps models understand your site's structure and prioritise which content to pull into their context window.

> **Why not just use a sitemap.xml?**
>
> Sitemaps enumerate every URL — they're optimised for crawlers, not comprehension. An `llms.txt` is a semantic map: it tells a model not just what exists, but what matters, how it's organised, and how pages relate to each other. A sitemap with 4,000 URLs gives a model nothing to work with. An `llms.txt` with 40 annotated links gives it a mental model of your product.

## The benefits — from a documentation perspective

### 1. You control the canonical narrative

When a developer asks ChatGPT, Claude, or Gemini how to authenticate with your API, the model will synthesise an answer from whatever it has. Without `llms.txt`, that context is arbitrary — cached HTML, GitHub issues, Stack Overflow posts, maybe a two-year-old blog post. With `llms.txt`, you give models a curated shortlist of authoritative pages to prioritise. You become the source of record.

### 2. Reduced hallucination on your product

The leading cause of AI hallucination about a specific product isn't model capability — it's context quality. A model working from your clearly structured, well-described core pages will produce far more accurate answers than one piecing together fragments. This directly reduces incorrect answers in AI-assisted developer tools, IDE copilots, and chat interfaces.

### 3. Better RAG performance for any downstream system

If you or your users are building RAG pipelines on top of your docs, `llms.txt` gives the retriever a pre-vetted, description-annotated index to work from. Instead of retrieving 12 tangentially relevant chunks, it retrieves the 3 most relevant sections because the index descriptions acted as better matching anchors.

### 4. It forces a documentation audit

Curating your `llms.txt` requires you to ask: what are the 20 pages a developer most needs to succeed with this product? That question is uncomfortable and valuable. It surfaces gaps, dead ends, and content that exists but shouldn't.

## General vs. specific: the two-file approach

The standard supports two complementary files, and understanding the distinction is important:

| File | Purpose |
|---|---|
| `llms.txt` | The primary index. Markdown links with short descriptions. Intended for models operating under tight context constraints — this is what they load first when "grounding" on your docs. |
| `llms-full.txt` | The full content dump. Contains the complete text of your core documentation pages, concatenated. For models with large context windows doing deep research tasks, or for RAG ingestion pipelines. |

For most documentation teams, the right approach is to implement both: `llms.txt` as the fast-loading navigational map, and `llms-full.txt` as the complete content corpus. Link from your `llms.txt` to your `llms-full.txt` so models and pipelines can discover it.

> **A word of caution:** Don't dump every page into `llms-full.txt`. Changelogs, legal notices, marketing copy, and autogenerated API reference blobs add noise. Be as curated with the full file as with the index. Quality of context beats quantity every time.

## Anatomy of a well-formed llms.txt

Here's a complete, annotated example for a fictional developer tools product:

```markdown
# Acme API Documentation

> Acme is a payments infrastructure API for SaaS companies.
> Docs cover REST endpoints, webhooks, SDKs (Node, Python, Go),
> and integration guides. All code examples target API v3.

## Getting Started

- [Quick Start](https://docs.acme.com/quickstart): Authenticate and make your first charge in under 5 minutes.
- [Authentication](https://docs.acme.com/auth): API keys, OAuth flows, and token scoping.
- [Environments](https://docs.acme.com/environments): Test vs. production modes and sandbox credentials.

## Core Concepts

- [Payment Intents](https://docs.acme.com/payment-intents): The primary object for initiating and tracking payments.
- [Customers](https://docs.acme.com/customers): Storing and managing customer records and payment methods.
- [Webhooks](https://docs.acme.com/webhooks): Event types, payload shapes, and signature verification.

## SDKs & Libraries

- [Node.js SDK](https://docs.acme.com/sdk/node): Full reference for @acme/node v4.x.
- [Python SDK](https://docs.acme.com/sdk/python): Full reference for acme-python v3.x.

## Optional (extended content)

- [llms-full.txt](https://docs.acme.com/llms-full.txt): Complete documentation corpus for large-context models.
```

Key formatting rules to follow: the H1 is your site name, the blockquote is your context description, H2s are section groupings, and each list item is a Markdown link followed by a colon and a one-line description. Keep descriptions under 100 characters — they're hints, not summaries.

## Keeping it fresh: the auto-update script

A static `llms.txt` you write once and forget will drift out of date within weeks. The right solution is a build-time script that regenerates the file every time content changes. Here's how to implement that.

### The core generator

`scripts/generate-llms-txt.js`

```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // npm i gray-matter

// Config — adjust paths to match your docs structure
const CONFIG = {
  baseUrl: 'https://docs.yoursite.com',
  docsDir: './content/docs',
  outputPath: './public/llms.txt',
  fullOutputPath: './public/llms-full.txt',
  siteDescription: `Your product description here. Keep it to 2-3
sentences covering what the product does, who it's for,
and what version the docs target.`,
  // Sections to exclude from llms.txt (but maybe include in full)
  excludeFromIndex: ['changelog', 'legal', 'internal'],
  // Sections to exclude entirely
  excludeAlways: ['drafts', 'archived'],
};

// Recursively find all markdown files
function findMarkdownFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(findMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Convert a file path to a URL slug
function fileToUrl(filePath) {
  const relative = path.relative(CONFIG.docsDir, filePath);
  const slug = relative
    .replace(/\.(md|mdx)$/, '')
    .replace(/\/index$/, '')
    .replace(/\\/g, '/'); // Windows path fix
  return `${CONFIG.baseUrl}/${slug}`;
}

// Group pages by their top-level directory (section)
function groupBySection(pages) {
  const sections = {};
  for (const page of pages) {
    const relative = path.relative(CONFIG.docsDir, page.filePath);
    const section = relative.split(path.sep)[0] || 'General';
    const label = section.replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    if (!sections[label]) sections[label] = [];
    sections[label].push(page);
  }
  return sections;
}

async function generate() {
  const allFiles = findMarkdownFiles(CONFIG.docsDir);
  const pages = [];
  const fullContentParts = [];

  for (const filePath of allFiles) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter.read(filePath);
    const url = fileToUrl(filePath);

    // Skip drafts and always-excluded sections
    if (data.draft) continue;
    const isExcluded = CONFIG.excludeAlways.some(s =>
      filePath.includes(`/${s}/`)
    );
    if (isExcluded) continue;

    const page = {
      filePath,
      url,
      title: data.title || 'Untitled',
      description: data.description || data.excerpt || '',
      order: data.sidebar_position ?? data.order ?? 999,
      content,
    };

    pages.push(page);

    // Collect content for llms-full.txt
    fullContentParts.push(
      `# ${page.title}\n\nSource: ${page.url}\n\n${content}\n\n---\n`
    );
  }

  // Sort each section by sidebar order
  pages.sort((a, b) => a.order - b.order);

  // Build llms.txt index
  const sections = groupBySection(pages);
  const indexLines = [
    `# ${require('../package.json').name || 'Documentation'}`,
    '',
    `> ${CONFIG.siteDescription.trim()}`,
    '',
  ];

  for (const [section, sectionPages] of Object.entries(sections)) {
    const isIndexExcluded = CONFIG.excludeFromIndex.some(s =>
      section.toLowerCase().includes(s)
    );
    if (isIndexExcluded) continue;

    indexLines.push(`## ${section}`, '');
    for (const page of sectionPages) {
      const desc = page.description
        ? `: ${page.description.substring(0, 100)}`
        : '';
      indexLines.push(`- [${page.title}](${page.url})${desc}`);
    }
    indexLines.push('');
  }

  // Add link to full content file
  indexLines.push(
    '## Optional', '',
    `- [llms-full.txt](${CONFIG.baseUrl}/llms-full.txt): Complete documentation corpus for large-context models.`
  );

  fs.writeFileSync(CONFIG.outputPath, indexLines.join('\n'));
  fs.writeFileSync(CONFIG.fullOutputPath, fullContentParts.join('\n'));

  console.log(`Generated llms.txt (${pages.length} pages)`);
}

generate();
```

### Wiring it into your build

Add the script to your `package.json` build step. The exact hook depends on your framework:

```json
{
  "scripts": {
    "build:llms": "node scripts/generate-llms-txt.js",

    // Next.js:
    "build": "npm run build:llms && next build",

    // Docusaurus:
    "build": "npm run build:llms && docusaurus build",

    // VitePress:
    "build": "npm run build:llms && vitepress build docs"
  }
}
```

### Frontmatter your scripts will rely on

The generator reads three frontmatter fields. Make sure every doc page includes them:

```markdown
title: "Webhook Events Reference"
description: "Complete list of event types, payload schemas, and delivery guarantees."
sidebar_position: 3

Your content here...
```

### Validating the output

Add a lightweight CI check to catch regressions — empty descriptions, broken URLs, or a file that's grown too large:

`scripts/validate-llms-txt.js`

```javascript
const fs = require('fs');
const content = fs.readFileSync('./public/llms.txt', 'utf-8');
const lines = content.split('\n');
const linkLines = lines.filter(l => l.startsWith('- ['));
const noDesc = linkLines.filter(l => !l.includes(': '));

if (noDesc.length > 0) {
  console.warn(`Warning: ${noDesc.length} entries missing descriptions`);
  noDesc.forEach(l => console.warn(' ', l));
}

if (linkLines.length < 5) {
  console.error('ERROR: llms.txt has fewer than 5 entries — something went wrong');
  process.exit(1);
}

console.log(`llms.txt valid: ${linkLines.length} entries`);
```


## A few things worth knowing

The `llms.txt` convention is new enough that support is still maturing. As of early 2026, several AI assistants and developer tools explicitly look for it, but it's not yet a W3C standard or anything requiring server-side configuration — it's just a file at a well-known path.

> **On discoverability:** Mention your `llms.txt` in your docs README, in your site's footer, and in your developer changelog. Tool builders working on top of your docs will find and use it. You can also submit your site to the llms.txt directory at `llmstxt.directory`.

The maintenance burden is genuinely low once the generator is in place. The only ongoing work is ensuring every new doc page has a meaningful `description` frontmatter field — which is good practice regardless. If your team is already doing SEO meta descriptions, you likely have this covered.

For teams running their own internal documentation RAG systems — common in larger engineering orgs — the `llms-full.txt` file becomes an extremely convenient ingestion target. One URL, complete content, always fresh. It's worth the five minutes to set up.