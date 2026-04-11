---
sidebar_position: 12
description: Every page on this site is also available as raw Markdown — copy, quote, or feed any page straight into an AI tool via its GitHub source.
---

# View as Markdown

Every page on this site is also available as raw Markdown. The rendered pages live at `ivanwalsh.com`, and the Markdown source for each one lives in the public GitHub repo that builds the site. That means you can read, copy, or hand any page directly to an AI tool without scraping HTML or stripping navigation and styles.

## Why this matters

Documentation is increasingly read by machines as well as humans. Pasting a rendered web page into an LLM forces it to work around menus, footers, and layout markup. Raw Markdown removes that noise. The model sees exactly the structure the author wrote — headings, lists, code blocks, and links — and nothing else.

For readers, it is also handy when you want to:

- Quote a section accurately in another document
- Feed a page into a RAG pipeline or a personal knowledge base
- Read the source while writing a translation or adaptation
- Check how a piece of content was actually structured

## Where the source lives

The site is built from the [`ivanwalsh/techdocs`](https://github.com/ivanwalsh/techdocs) repository on GitHub. Tutorials live under `docs/tutorial-basics/` and blog posts live under `blog/`. Every Markdown file in those folders can be fetched directly from GitHub's raw content host:

```
https://raw.githubusercontent.com/ivanwalsh/techdocs/main/<path-to-file>.md
```

The URL is the branch (`main`), followed by the same folder layout you see in the repo.

## How to find a page as Markdown

Map the rendered URL to the matching file in the repo:

- A tutorial at `ivanwalsh.com/tutorial-basics/<name>` is at `docs/tutorial-basics/<name>.md` in the repo
- A blog post at `ivanwalsh.com/blog/<slug>` is at `blog/<filename>.md` in the repo (the filename usually matches the slug, but not always — blog filenames sometimes include a date prefix)

Then prepend the raw GitHub URL.

## Examples

A few pages shown first as the rendered URL and then as the Markdown source on GitHub:

- Agile tutorial
  - Page: `https://ivanwalsh.com/tutorial-basics/agile`
  - Markdown: `https://raw.githubusercontent.com/ivanwalsh/techdocs/main/docs/tutorial-basics/agile.md`
- LLM Optimization
  - Page: `https://ivanwalsh.com/tutorial-basics/llm-optimization`
  - Markdown: `https://raw.githubusercontent.com/ivanwalsh/techdocs/main/docs/tutorial-basics/llm-optimization.md`
- AI-Assisted API Documentation
  - Page: `https://ivanwalsh.com/tutorial-basics/ai-assisted-api-documentation`
  - Markdown: `https://raw.githubusercontent.com/ivanwalsh/techdocs/main/docs/tutorial-basics/ai-assisted-api-documentation.md`
- Documentation Metrics
  - Page: `https://ivanwalsh.com/tutorial-basics/documentation-metrics`
  - Markdown: `https://raw.githubusercontent.com/ivanwalsh/techdocs/main/docs/tutorial-basics/documentation-metrics.md`

Blog posts follow the same pattern, pointing at the `blog/` folder instead:

- Post: `https://ivanwalsh.com/blog/what-is-an-mcp-server`
- Markdown: `https://raw.githubusercontent.com/ivanwalsh/techdocs/main/blog/2026-04-05-mcp-server-documentation.md`

If you are not sure of the exact filename for a blog post, browse the [`blog/`](https://github.com/ivanwalsh/techdocs/tree/main/blog) folder on GitHub and click the file you want — the **Raw** button on GitHub gives you the same URL.

## Fetching from the command line

Once you have the raw URL, `curl` works directly against it:

```bash
curl https://raw.githubusercontent.com/ivanwalsh/techdocs/main/docs/tutorial-basics/llm-optimization.md
```

Pipe the output into a file, a diff, or an LLM client of your choice:

```bash
curl -s https://raw.githubusercontent.com/ivanwalsh/techdocs/main/docs/tutorial-basics/llm-optimization.md > llm-optimization.md
```

## A note on what you get

The Markdown on GitHub is the source the page was written from. It includes the frontmatter, headings, and links exactly as authored. It does not include the site navigation, footer, or any JavaScript-rendered components — which is usually what you want when you are feeding content to another system. Because it is served straight from the `main` branch, it stays in sync with the live site.

If you only want a discovery index rather than the full content, see [llms.txt](/llms.txt) for a lightweight list of the main pages on the site.
