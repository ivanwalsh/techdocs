---
slug: half-your-readers-are-bots
title: "Half your readers are now bots. 3 urgent fixes for your docs"
authors: [ivanwalsh]
tags: [ai, documentation, technical-writing]
description: "Half of documentation traffic is now AI agents. Here are three concrete changes I'm making to keep my docs useful for both human and machine readers."
---

Who are you actually writing for anymore? If half your readers are machines, and the open web is quietly shrinking as people move their questions into Claude and ChatGPT, the old instinct to "write for humans" starts to feel incomplete. A recent report from [Mintlify](https://www.mintlify.com/blog/state-of-ai), a documentation platform used by developer-focused companies to host and structure their API references and guides, forces the question into the open. Mintlify sits in a useful vantage point: because it powers so many developer docs sites, it can see exactly who, or what, is hitting those pages. Here are the three points from their report that matter most, and what I'm actually doing about each.

<!-- truncate -->

## 1. Agents are now half your audience

The headline finding, that AI coding agents account for 45.3% of requests, nearly tied with browser traffic at 45.8%, reframes the job. Docs aren't a website anymore. They're a dual-purpose interface, and increasingly the version an agent ingests is the version your user will ever see.

**How I address it:** I stopped treating "machine readability" as a separate track. Every page I ship gets audited against two checklists in one pass. Does a developer land on it and find the answer in ten seconds? Does an agent parsing it get a clean, self-contained chunk with no dangling references like "see above" or "as mentioned earlier"? Those phrases used to be fine. Now they break context retrieval. I write each section so it survives being pulled out on its own.

## 2. Context retrieval has replaced the page view

Han Wang's point that context retrieval is the new page view is the one technical writers need to internalise fastest. When Claude Code hits my API reference, it's not reading. It's grabbing the minimum viable context to generate working code for someone right now.

**How I address it:** I write for the retrieval unit, not the page. Every endpoint gets a complete, runnable example, not a snippet that assumes setup from three pages back. Every parameter gets its type, whether it's required, the valid range, and what happens when you get it wrong. I've also killed clever prose transitions between sections. Agents don't need a narrative arc. They need facts with clear boundaries.

## 3. Error documentation is now a first-class citizen

The article's closing list calls out consistent formatting in API references, complete and accurate code examples, explicit parameter descriptions, and thorough error documentation. Error docs are the one most teams still neglect, and it's the one that hurts agents most. A model that doesn't know what a 422 from your API means will guess, and guess wrong.

**How I address it:** Every error code gets its own entry with the exact message string, the cause, and a fix. No grouping five errors under one vague heading. When a developer's agent hits a failure, it should find the answer in my docs instead of hallucinating one. That's the new bar for good error documentation.

## The bottom line

The shift isn't really about writing for machines versus humans. It's about writing with more discipline. Self-contained sections, complete examples, explicit errors. These were always best practices. Agent traffic just made them non-negotiable.
