---
sidebar_position: 5
---

# Doc Tools

*Which tools do I actually reach for when I'm writing technical docs for AI and banking projects — and why those, not the hundred alternatives?*

I've been asked this enough times that it's worth writing down. The short version: I pick tools that are trusted inside regulated engineering teams, that fit a docs-as-code pipeline, and that I can defend to a compliance reviewer without flinching. The long version is this page.

Below is the working set. Each one earns its place for a specific reason, and I'll explain where each fits, what it's good at, and what I watch for in the market around it.

## The tools I use, at a glance

| Tool | What I use it for | Why it's in my stack |
|---|---|---|
| **LangChain** | Orchestrating RAG pipelines, chaining LLM calls, connecting models to internal knowledge bases | The de-facto framework for production LLM apps — structures my RAG and agent prototypes in code my engineers already read |
| **Claude** | Drafting, editing, reviewing docs; analysing OpenAPI specs; generating code samples | Long context windows, strong instruction-following, and conservative hallucination profile for regulated content |
| **Markdown** | Source format for all documentation | Plain text, diff-able, reviewable, portable across every toolchain I've ever touched |
| **Git / GitHub / GitHub Actions** | Version control, PR-based review, CI for linting, link-checking, spec validation, publishing | The backbone of docs-as-code — the same pipeline engineers already trust |
| **OpenAPI / Swagger / Postman** | API contract definition, validation, interactive testing, reference doc generation | A single source of truth for the API contract that humans, tools, and LLMs can all consume |
| **Docusaurus** | Static site generator for public docs, internal handbooks, reference pipelines | MDX support, versioning, fast builds, and a sane React-based customisation path. This site is createde with Docusaurus |
| **Confluence / Jira** | Design docs, brainstorming notes, internal wikis; ticket-linked docs work | As this is where non-engineering stakeholders typically live, I track and update docs in here |
| **Adobe RoboHelp** | Legacy help systems, context-sensitive help, regulated enterprise content still published as PDF/HTML5 | Popular in banking and enterprise environments. Madcap Flare is also very good |

## Why these, specifically, for AI and banking work

AI and financial services sit at a strange intersection. AI projects move fast and generate a lot of machine-consumable content (specs, model cards, RAG). Banking projects move carefully and require SOC2 audit trails, traceability, and tools that compliance teams have already blessed. The tools I use have to satisfy both sides.

Here's how each one earns that:

| Tool | AI project fit | Banking project fit |
|---|---|---|
| **LangChain** | Directly used to build the RAG and agent systems I'm documenting | Helps me understand the architecture I'm writing about, so the docs are accurate |
| **Claude** | Drafts model cards, refines tutorials, generates reference material from specs | Strong at following strict prompts for regulated content |
| **Markdown** | Ingestible by every RAG pipeline I've built | Diff-able for audit trails; no proprietary binary formats to lock content away |
| **Git / GitHub Actions** | Every AI-drafted change is a PR with a human reviewer, ie the review gate | Change traceability from commit to reviewer to deployed page for compliance |
| **OpenAPI / Swagger / Postman** | Specs are retrieval-grounded so LLMs describe real endpoints, not invented ones. For instance, you give Claude your actual OpenAPI spec file first, then say: "Describe the /payments endpoint exactly as defined in this spec. Don't add anything that isn't here."
Claude then  writes from the real contract — the real parameters, the real status codes, the real response shape. | Regulators can read the spec; engineers can test it; it's the contract |
| **Docusaurus** | Fast iteration, MDX for embedding live examples, easy to theme | Versioned publishing aligned to service releases; static output for secure hosting |
| **Confluence / Jira** | Where PMs and model owners document decisions | Where compliance, legal, and risk teams read — I can't ignore them |
| **Adobe RoboHelp** | Rarely the right tool for AI work | Still required by some banks for in-application help and CHM output |

## Where the market is heading — and why I'm watching it

| Tool | Market trend (what I'm watching) | What it means for my practice |
|---|---|---|
| **LangChain** | Maturing from prototype glue to production orchestration; competition from LlamaIndex, LangGraph, and native provider SDKs | I treat it as one option, not the default — I'll pick the lightest framework that solves the problem |
| **Claude** | Growing adoption in regulated industries; longer context, stronger tool use, better reasoning | My primary drafting model for fintech work; I re-evaluate the model landscape every quarter |
| **Markdown** | Expanding through MDX, CommonMark, and semantic extensions; remains the lingua franca | Safe long-term bet — whatever comes next will import Markdown |
| **Git / GitHub / GitHub Actions** | Copilot and AI review tools landing directly in the PR flow | My review pipeline is starting to include AI-assisted checks as well as human ones |
| **OpenAPI / Swagger / Postman** | OpenAPI 3.1 consolidation; AsyncAPI for event-driven systems; Postman leaning into AI-generated tests | I keep specs OpenAPI 3.1-clean so downstream tools (and LLMs) don't choke on legacy syntax |
| **Docusaurus** | Strong momentum for public docs; competition from Mintlify, Nextra, Starlight | I stay on Docusaurus because versioning and MDX are mature; I watch the alternatives |
| **Confluence / Jira** | Atlassian leaning hard into AI (Rovo, Atlassian Intelligence) | Useful for stakeholder-facing content; I keep source-of-truth in Git, not Confluence |
| **Adobe RoboHelp** | Declining in new projects; still entrenched in regulated enterprise | I maintain the skill but don't recommend it for greenfield work |

## How these fit together in a pipeline

The tools aren't a shopping list. They compose:

- **OpenAPI / Swagger** defines the contract. **Postman** tests it. A **GitHub Actions** workflow lints the spec in CI.
- **Claude** drafts the reference prose, grounded in the spec via retrieval — often orchestrated through **LangChain** during prototyping.
- The draft lands as **Markdown** in a **GitHub** pull request. A human reviewer approves or rejects it.
- On merge, **GitHub Actions** builds the **Docusaurus** site and publishes it.
- Stakeholder-facing summaries and tickets live in **Confluence / Jira**, linked back to the Git-managed source.
- Where a legacy banking product still requires CHM or context-sensitive help, **Adobe RoboHelp** handles the output format while the source stays in Markdown.

That's the actual working pipeline — not a theoretical one. It's what I build for teams who need AI-assisted throughput without losing the audit trail.

## What I don't use, and why

Briefly, because it comes up:

- **Monolithic CCMS platforms** for greenfield AI work — too heavy, too closed, and poor fit for docs-as-code.
- **Wiki-only workflows** as the system of record — no review gate, no versioning, no CI.
- **Hand-rolled static site generators** when Docusaurus already solves the problem.

The stack above is deliberately conservative. In regulated environments, boring and traceable beats clever and novel every time.

## Tying it back to the pipeline

If you want to see how these tools compose end-to-end — the linting, the CI, the publishing, the model cards — that's what the reference repo is for: [github.com/ivanwalsh/ai-fintech-docs-pipeline](https://github.com/ivanwalsh/ai-fintech-docs-pipeline).
