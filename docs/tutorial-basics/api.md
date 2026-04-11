---
sidebar_position: 3
description: How to orchestrate AI into API documentation as a co-pilot — without hallucinated endpoints, invented parameters, or silently wrong references.
---

# API Documentation in the Age of AI

*Should you be using AI to write your API documentation?*

My honest answer is: yes, but not the way most people are doing it. The teams I see getting value from AI on API docs are the ones who treat it as a co-pilot inside a carefully orchestrated pipeline. The teams getting burned are the ones who hand an LLM a half-finished OpenAPI spec and ask it to "just write the docs." That's the shortcut that produces hallucinated endpoints, invented parameters, and a reference that looks polished and is quietly wrong in ways a developer will only discover at 2am on a Saturday.

So this page isn't really about *whether* to use AI for API docs. It's about **how I use it**, where I put the guardrails, and why I keep a human in the loop at every step.

## What I've learned the hard way

The first time I let an LLM loose on a Swagger / OpenAPI spec without enough guardrails, it confidently documented three endpoints that did not exist. They looked plausible. The paths were sensible. The request bodies had the right shape. A reviewer skimming the PR would have merged it. That was the moment I stopped thinking of AI as a writer and started thinking of it as an *unreliable but fast colleague* — extremely helpful, but one whose output I verify before it goes anywhere near a developer.

Since then, I've built my API documentation process around a handful of rules I don't break.

## The four types of API documentation I care about

Before I talk about AI, it's worth being clear about what I'm actually producing. When I say "API documentation" I mean four distinct deliverables, each with a different audience and a different failure mode:

- **Reference documentation** — the contract. Endpoints, parameters, request and response shapes, error codes, auth. This has to be exact. An error here breaks integrations.
- **Tutorials** — the onboarding path. A new developer should be able to go from zero to a working call in under ten minutes.
- **Examples** — real request/response pairs, in context, against a known state.
- **Code samples** — runnable snippets in the languages your consumers actually use.

Each of these has a different relationship with AI. The reference needs the tightest guardrails. The tutorials benefit most from AI drafting. Examples sit in the middle.

## How I orchestrate AI into the API docs process

This is the workflow I've landed on after a lot of iteration. It's deliberately boring, and that's the point.

### 1. The OpenAPI spec is the source of truth — not the LLM

I never let the LLM invent the contract. The OpenAPI spec is generated from the code, or hand-authored and validated in CI, and it is the single source of truth for what endpoints exist, what parameters they accept, and what they return. Every piece of reference documentation is generated *from* the spec or *grounded in* the spec. If the LLM wants to describe an endpoint, it has to be given the spec's definition of that endpoint and told to describe it — never to invent it.

### 2. Retrieval, not recall

When I use an LLM to draft or refine reference content, I ground it in the actual spec file via retrieval. The model doesn't get to rely on its training data's memory of "what a typical /users endpoint looks like." It gets the exact definition of *this* endpoint, for *this* service, at *this* version, and it writes against that. This one change eliminates most hallucinated endpoints on its own.

### 3. Strict prompting with explicit "do not invent" constraints

My drafting prompts include explicit instructions: *do not describe parameters not present in the spec; do not invent status codes; if information is missing, say so and stop*. I'd rather the model refuse to answer than fill a gap with a plausible-sounding fiction. Saying "I don't know" is a feature, not a failure.

### 4. Linting the spec before the LLM ever sees it

Before AI touches anything, the OpenAPI spec is linted — Spectral rules for naming, required fields, description completeness, example presence. If the spec is malformed, the docs will be malformed. Garbage in, polished garbage out.

### 5. Human-in-the-loop review at every gate

This is the one I won't compromise on. Every LLM-generated or LLM-refined section goes through a human reviewer before it ships. For reference docs, that reviewer is either the engineer who owns the endpoint or a writer who has verified the behaviour against a live call. No AI-generated content reaches production unreviewed. Ever.

### 6. Automated verification where I can get it

For the parts of the process I can automate, I do. Examples are executed against a sandbox and the responses compared to what the docs claim. Code samples are compiled and run in CI. If a sample breaks, the build breaks. This catches a whole class of errors that humans skim over.

### 7. Change traceability

Every docs change is tied to a spec change, a PR, and a reviewer. When a regulator or a partner team asks *why does this endpoint's documentation say X?*, I can answer in thirty seconds.

## What goes wrong when you skip the guardrails

I've seen all of these in the wild, several of them on my own projects before I tightened the process:

- **Invented endpoints** — the LLM generates documentation for a plausible-sounding path that does not exist in the service.
- **Invented parameters** — an endpoint that takes three fields is documented as taking five, because the model "knows" what a typical request of this kind looks like.
- **Drifted status codes** — the docs claim 404 on a condition the service actually returns 409 for.
- **Silent version drift** — the docs describe v2 behaviour but the spec has moved to v3 and no one notices because the prose still reads well.
- **Confident wrong examples** — request/response pairs that look right but would never round-trip against the real service.

Each of these is a trust failure. API documentation is a contract, and a contract that lies is worse than no contract at all. Developers who get burned once stop trusting the docs, and once that trust is gone, the docs are a liability rather than an asset.

## Why the human in the loop isn't optional

I lean on AI heavily in my API docs process. It drafts, it refines, it rewrites tutorials into better prose, it generates code samples across languages, it catches inconsistencies I'd miss. But I never ship AI output unreviewed, and I never let the model be the final authority on what's true about the API.

The human in the loop is the person who says: *I called this endpoint. I saw this response. This documentation matches reality.* No LLM can do that, and pretending otherwise is how trust breaks.

## Tying it back to the pipeline

If you want to see how this fits into a broader docs-as-code workflow — the linting, the CI, the publishing, the model cards — the reference pipeline is over here: [github.com/ivanwalsh/ai-fintech-docs-pipeline](https://github.com/ivanwalsh/ai-fintech-docs-pipeline). It shows how I wire OpenAPI specs, AI-assisted drafting, and human review into a single pipeline that moves at the speed of the engineering team without sacrificing accuracy.

AI is a genuine force multiplier on API documentation. It just isn't a substitute for the process around it.
