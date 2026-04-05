---
title: What is an MCP server and why does it need documentation?
slug: what-is-an-mcp-server
description: Most teams shipping AI products are not documenting the MCP layer that connects the model to everything else. Here is why that matters and what to do about it.
tags: [mcp, documentation, ai, fintech, product-management, technical-writing]
authors: [ivanwalsh]
date: 2026-04-04
---

Most teams shipping AI products in 2026 are focused on the model. Which one to use, how to fine-tune it, how to evaluate its outputs. What they are not focused on, almost universally, is the layer that connects the model to everything else.

That layer is the MCP server. And almost nobody is documenting it.

This is a problem. Not an inconvenience but a genuine technical risk, and in regulated industries, a compliance risk too. A developer joining a project finds an MCP server in the codebase with no tool reference, no input schema, no error documentation. The model is using it. Nobody knows exactly how. The person who built it left six months ago.

<!-- truncate -->

## Where technical writers fit in

Here is what makes this problem different from every other documentation gap in software development: by the time a technical writer is typically brought in, it is too late.

In most software projects, documentation happens after the build. A writer gets access to a finished product, interviews the developers, and works backwards to produce something useful. This approach is imperfect but workable for conventional software. The product does not change its behaviour based on what the writer produces.

MCP servers break this model entirely. The documentation is not a description of how the system works. It is an input to how the system works. The tool descriptions, the input schemas, the parameter constraints are all read by the AI model at runtime and directly shape its behaviour. If a technical writer reviews a finished MCP server and finds the descriptions vague, rewriting them is not a documentation task. It is a product change.

This means technical writers need to be involved during development, not after it. Specifically, they need to be in the room when tool schemas are being defined, asking the questions the AI model will implicitly need answered. What does this tool do in plain terms? What happens when this parameter is missing? What does a valid response look like when the upstream system is unavailable?

These are documentation questions. They are also product design questions. A technical writer who understands MCP is doing both simultaneously.

## A note for Product Managers

If you are a Product Manager delivering AI products, the Definition of Done for any user story that involves an MCP server should include documentation sign-off. Not as a checkbox, but as a quality gate.

Specifically, the DoD should require:

- Every tool exposed by the MCP server has a description precise enough for the AI model to select it correctly
- Every input parameter has a documented type, requirement status, valid range, and null behaviour
- Every error code has a documented meaning and expected handling path
- A worked example exists for every tool, showing a realistic input and expected output
- Authentication and permission requirements are documented explicitly, not assumed

The rationale is simple. A user story that ships an undocumented MCP tool is not done. The model's behaviour with that tool is undefined. In regulated industries, that unpredictability carries a compliance cost that typically exceeds the cost of writing the documentation in the first place.

Treat MCP documentation the same way you treat automated tests. Not something that happens after the sprint, but something that gates the story closing.

## What an MCP server actually is

MCP stands for Model Context Protocol, an open standard developed by Anthropic that defines how AI models communicate with external tools, data sources, and services.

An MCP server is a program that implements this protocol. It exposes a set of capabilities that an AI model can discover and use at runtime. Think of it as the bridge between an AI system and the outside world, the thing that lets a model check a database, call an API, read a file, or trigger an action in another system.

If a REST API is a waiter who takes your order and brings food, an MCP server is a waiter who also reads the menu aloud, tells the AI which dishes are available today, and describes each one in enough detail for the AI to decide what to order.

An MCP server exposes three types of primitives:

- Tools: actions the AI can take, such as calling an API, running a calculation, or submitting a form
- Resources: data the AI can read, such as files, database records, or live feeds
- Prompts: reusable templates the AI can invoke for structured tasks

Each of these needs to be documented. But the way they need to be documented is different from anything most technical writers have encountered before.

## Why MCP documentation is harder than API documentation

When you document a REST API, your primary reader is a developer. A developer can read the docs, ask a question on Slack, experiment in Postman, and iterate until something works. The documentation is a starting point, not the final word.

When you document an MCP server, your primary reader is an AI model.

The model cannot ask questions. It cannot experiment. It reads the tool schema at runtime and makes decisions based entirely on what is written there. If the description is vague, the model picks the wrong tool. If the input schema is incomplete, the model formats the request incorrectly. If error codes are undocumented, the model cannot handle failures gracefully.

None of this produces an obvious error. The model does not throw an exception when it misunderstands a tool description. It simply behaves incorrectly, and the root cause is documentation quality, not model capability.

This reframes what documentation means in an AI system. The description field in an MCP tool schema is not metadata. It is a runtime instruction. Writing it poorly has direct consequences for how the product behaves.

In regulated industries, those consequences can extend beyond bad user experience into compliance exposure. A tool that processes a transaction without a clearly documented permission model is not just a documentation gap. It is an audit gap.

## The five things every MCP server document needs

Based on working with AI systems in regulated financial environments, there are five components that every MCP server document needs to contain.

**1. Tool inventory.** A complete list of every tool the server exposes, with a one-line description of what each one does. This is the table of contents for the AI model, the first thing it reads to understand what is available.

**2. Input schema per tool.** Every parameter, its type, whether it is required, and what a valid value looks like. Include edge cases. What happens if a parameter is null? What is the valid range for a numeric field? A schema that says `amount: number` is not sufficient. `amount: number, required, minimum 0, maximum 10,000,000, GBP value` is.

**3. Output schema per tool.** What the tool returns on success, what it returns on failure, and what each error code means. AI models need to interpret responses, not just send requests. Undocumented error codes produce silent failures where the model receives an unexpected response and has no documented path for handling it.

**4. Authentication and permissions.** How the server authenticates requests, and which tools require which permission levels. This section is often omitted from internal MCP servers on the assumption that everyone already knows. In financial services, the permission model for an AI tool frequently has direct regulatory implications, so assuming prior knowledge is not an option.

**5. Usage examples.** At least one worked example per tool: a realistic input and the expected output. This is the section AI models use most heavily during inference. A concrete example anchors the abstract schema to real-world use and significantly reduces the likelihood of malformed requests.

## A note for financial services teams

The five components above apply to any MCP server, but in financial services each one carries additional weight. A tool description that omits a rate-limiting clause can produce behaviour that breaches a trading rule. An undocumented error code can create a gap in an audit trail. Documentation in this context is part of the control framework, not an afterthought.

## Do this today

If your team has built an MCP server, do one thing before the end of the week. Open the server code and count how many tools it exposes. Then open the documentation, whatever exists, and check whether each tool has a description, a complete input schema, a documented output, and at least one worked example.

In most teams, the answer will be that some tools are partially documented and several have nothing at all. That gap is not a documentation backlog. It is an active risk to product quality, to developer onboarding, and in regulated environments, to compliance.

If you are a technical writer, use that audit as the basis for a conversation with your engineering and product leads this week. Bring the list of undocumented tools and a proposed documentation standard. Frame it not as a writing task but as a product quality issue, because that is what it is.

If you are a Product Manager, add MCP documentation to your Definition of Done before the next sprint starts. One line in the DoD now prevents weeks of remediation later.

If you are an engineering lead, block half a day in the next sprint to work through the tool inventory with your technical writer present. The output should be an agreed documentation standard for every MCP tool your team ships, established before anyone writes another line of schema code.

The teams that get this right now will have a significant operational advantage over those who treat documentation as something to sort out later. In AI product development, later rarely arrives.

**About the author**

Ivan Walsh is a Technical Writer based in Dublin, Ireland, specialising in AI-ready documentation for regulated financial platforms. He works with global financial institutions on API documentation, RAG-ready content, and chatbot integration guides for systems where precision and compliance are non-negotiable.

Connect with Ivan on [LinkedIn](https://www.linkedin.com/in/ivanwalsh/)