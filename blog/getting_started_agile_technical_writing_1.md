---
slug: agile-tech-writing-getting-started
title: Getting Started with Agile for Technical Writers
authors: [ivanwalsh]
tags: [AI]
description: How to get started with Agile for Technical Writers

---

# Getting Started with Agile for Technical Writers #1

## How can technical writers use Agile in software development projects?

As this question, and variations of it, have popped up on Reddit and LinkedIn, I thought I'd share a few observations about my experience of working with Agile/Scrum as a tech writer. 

One thing to say before we start, is that just became a company says it's Agile, doesn't mean it's applying all of the framework. Rather, they may be selectively picking pieces of it, such as using Daily Stand Ups, but not fully embracing the spirit of Agile development. In many cases, they're probably 'Agilefall' (Agile + Waterfall).

## What is Agile technical documentation?

Agile technical documentation is a framework that applies Agile principles to the documentation process itself. Instead of creating monolithic documentation sets that may become outdated before the product is released, Agile documentation provides incremental deliverables per sprint that support current needs while remaining flexible enough to adapt with the project.

## Agile Documentation Principles

"I want thin documents, and fast." The CEO of a leasing company told me this when I presented him with our Documentation Plan for the next release. This was more than 15 years ago before Agile became mainstream. He was encouraging us to write only what was needed (cut the fluff) and get docs out to review/customers asap. 

So, if you're new to writing in an Agile environment, here are some things to consider: 

**Iterative content development** – create units of documentation that can be written, reviewed and signed off per sprint. Then, if the software changes, update accordingly. The aim is to get pieces of the docs delivered per 2- or 3-week sprints, rather than one single document at the very end. 

**Collaboration** – develop a collaborative approach with developers, testers and product managers, so docs are worked on during each sprint. Before you adopt this approach, talk to the team and explain how/why you plan to deliver the docs in increments.

**Responding to change** – prepare your documents in such a way that it's easy to update, review, and republish. Flexibility is a key part of Agile. Make sure your document process is aligned accordingly

## Agile Documentation Strategies

In terms of setting up Agile documents, you have several options. Here's a few to consider:

### User story-driven content

Learn how to write user story for the features you plan to document. Of course, you can write user stories for other document tasks as well. The point is to learn how to craft user stories so you're in sync with your company's Agile mindset, and also that each increment you deliver meets the Definition of Done. That is, it meets the problem statement and acceptance criteria for each ticket. 

### Tech Documentation user story example

The following is a simple example of a documentation user story:

- **As a** new API developer integrating with our ecommerce system
- **I want** step-by-step authentication setup instructions with working code examples
- **So that** I can authenticate API calls within 15 minutes without contacting support

**Acceptance Criteria:**
- Include prerequisite requirements (API key, development environment)
- Provide code samples in at least 3 programming languages (Python, JavaScript, cURL)
- Show expected request/response format with real examples
- Include common error codes and troubleshooting steps
- Include rate limiting information

**Definition of Done:**
- Content reviewed by Developer who hasn't worked on the API
- Verified code examples 
- Tested by Product team

### Sprint-based documentation cycles

You have several options here. One suggestion is to add a Tech Document ticket to the Dev sprint board per sprint. For me, this creates noise and I'd suggest to avoid it. Instead, create your own board and cut a ticket for each product feature. Then, in the last sprint, you can add a formal tech document ticket the sprint board to ensure it gets prioritized and delivered in time with the release. 

### Living documentation approaches

In this context, 'living' means that the docs develop naturally with the product rather than you having to make manual updates. For instance, if you're using Swagger/OpenAPI specs to generate interactive API documentation, setup your document publishing system so that the correct documents are automatically generated. The same applies if you're integrating content from Git or database schemas generated from databases.

### Continuous feedback loops

Setup your docs process so that you can identify gaps, errors, and omissions in the docs. In sprint retrospectives ask product/developers if there's anything that can be improved. Likewise, arrange stakeholder check-ins to assess whether docs meet their needs. Ask Product to help understand customer pain points. Again, I feel a mindset change is often required here. Instead of writing in isolation, look for ways to proactively get feedback so your docs provide maximum value. 

## First Steps

Instead of 'boiling the ocean', I'd suggest to start small and by degrees move your tech document team to an Agile mindset. Creating a simple Agile board either in Jira, Trello, or another tool is enough to get started. I'd highly recommend to print out the Scrum Guide and become familiar with the framework.

In the coming weeks, I'll go into more depth about tool usage, metrics and some of the common pitfalls to avoid.

As always, drop me a line if you'd like to know more. My inbox is always open.