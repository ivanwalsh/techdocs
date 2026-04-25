---
slug: what-is-an-ai-model-card
title: "What Is an AI Model Card? A Plain-Language Guide for Technical Writers"
authors: [ivanwalsh]
date: 2026-04-11
tags: [model-cards, ai-documentation, technical-writing, responsible-ai]
description: "AI model cards are the documentation layer that makes artificial intelligence systems transparent, accountable, and auditable. Here is what they are, why they matter, and how to get started writing one."
---

When your organisation deploys an AI model, who is responsible for explaining what it does, what it should not do, and what happens when it gets something wrong?

If the answer is "nobody," that is a problem. And it is a problem that is landing, increasingly, on the desks of technical writers.

AI models are being built and deployed at a pace that has outrun their documentation. Teams can tell you how a model performs on a benchmark. They are far less prepared to explain its training data, its known failure modes, or whether it has been tested against the populations it will actually affect. That gap is closing, slowly, under pressure from regulators, enterprise procurement teams, and the growing expectation of transparency around AI systems.

The document that closes that gap has a name: a **model card**.

If you have not encountered one yet, you will. This article explains what model cards are, why they matter, and what you need to know to start writing one.

<!-- truncate -->

## What Is a Model Card?

A model card is a short, structured document that describes an AI model. Think of it as the product specification sheet for a machine learning system.

Google DeepMind defines them simply as <q>simple, structured overviews of how an advanced AI model was designed and evaluated.</q> That description is deliberately plain. A model card is not a research paper, a marketing brochure, or a legal disclaimer. It is a transparent, factual summary intended to help anyone who uses or deploys a model understand what it does, how it was built, and where it has known limitations.

The concept was introduced in a 2018 research paper by Margaret Mitchell and colleagues at Google, and it has since become a widely adopted standard across the AI industry. Major organisations including Google DeepMind, Hugging Face, Meta, and Anthropic now publish model cards for their publicly released models.

## What Does a Model Card Contain?

There is no single mandatory template, but most model cards cover a consistent set of topics. Looking at the structure Google DeepMind uses for models like Gemini, a well-formed model card typically includes the following sections.

**Model information** covers the basics: what the model is, what inputs it accepts (text, images, audio, video), what outputs it produces, and how it relates to earlier versions. This section answers the question: what are we actually looking at?

**Training data** explains where the model learned from. This section describes the datasets used, how the data was processed or filtered, and any significant gaps or exclusions. For regulated industries, this is a critical section because data provenance directly affects fairness and compliance.

**Evaluation and benchmarks** presents how the model was tested and how it performed. This section includes benchmark scores, the methodology behind them, and comparisons against other models or baseline standards. Importantly, a good model card does not cherry-pick only positive results.

**Intended use and limitations** is arguably the most important section for practitioners. It specifies what the model was designed for, what it should not be used for, and what known failure modes exist. For example, a model trained on English-language financial text may perform poorly on multilingual queries or informal language.

**Ethics and safety** covers potential harms, bias evaluations, safety testing results, and the mitigations the development team put in place. Google DeepMind's model cards include detailed safety evaluation tables, red-teaming findings, and results from automated content safety tests.

**Distribution information** explains how and where the model is available, under what terms, and through which channels.

Some model cards, particularly for frontier models, also include a **frontier safety** section that addresses risks unique to highly capable systems, such as misuse for cybersecurity attacks or the generation of dangerous content.

## Why Do Model Cards Matter?

Model cards exist because AI systems are not self-explanatory. Unlike traditional software, where you can read the source code to understand what a program does, a machine learning model is a statistical artefact. Its behaviour emerges from patterns in data, not from instructions anyone wrote explicitly. Without documentation, users have no way to evaluate whether a model is appropriate for their use case.

There are three reasons model cards matter, and they become even more important in regulated sectors like financial services.

**Transparency.** A model card makes an organisation's design choices visible. It forces the team to articulate what data they used, what assumptions they made, and what trade-offs they accepted. Transparency builds trust with users and regulators alike.

**Accountability.** When something goes wrong with an AI system, a model card creates a documented record of what was intended and what was known at the time of release. This is not just good practice; in many jurisdictions it is becoming a regulatory expectation. The EU AI Act, for example, requires technical documentation for high-risk AI systems that covers much of what a model card contains.

**Informed deployment.** Many AI failures happen not because a model is bad, but because it is deployed in a context it was never designed for. A model card that clearly states intended use cases and known limitations gives the teams deploying the model the information they need to make responsible choices.

For technical writers specifically, model cards represent an opportunity. They sit at the intersection of technical accuracy, regulatory compliance, and plain-language communication. Getting them right requires exactly the skills that experienced technical writers already have.

## Who Reads a Model Card?

A model card has multiple audiences, and a good one serves all of them.

**Developers and engineers** use model cards to evaluate whether a model is suitable for a specific application, to understand integration constraints, and to anticipate edge cases.

**Product and compliance teams** use them to assess regulatory risk, document due diligence, and respond to audit requests.

**Researchers** use them to compare models, replicate evaluations, and identify gaps in existing work.

**End users and the public** increasingly expect to be able to find out something meaningful about the AI systems affecting their lives, particularly in high-stakes domains like healthcare, finance, and hiring.

Writing for all these audiences simultaneously is a challenge that sits firmly in the technical writer's domain.

## A Brief Look at a Real Model Card

Google DeepMind publishes model cards for its entire Gemini family, as well as for specialist models like Veo, Imagen, and Lyria. You can browse the full index at [deepmind.google/models/model-cards](https://deepmind.google/models/model-cards/).

Looking at the Gemini 3.1 Pro model card, a few things stand out as examples of good practice.

The document is structured with a clear table of contents covering eight named sections. Each section uses consistent, predictable headings. The evaluation section presents benchmark results in a comparative table alongside competitor models, including cases where Gemini does not rank first. The safety section distinguishes between automated evaluations and human red-teaming results, and it explicitly notes where regressions occurred rather than reporting only improvements. The frontier safety section maps each risk domain to a specific critical capability level and states clearly whether that level was or was not reached.

This level of structured honesty is what separates a genuine model card from a marketing document wearing the same name.

## How Model Cards Connect to Broader AI Documentation

A model card does not exist in isolation. It connects to a wider documentation ecosystem that technical writers working in AI need to understand.

A model card is the top-level summary. Underneath it, you might find evaluation methodology documents that explain in detail how benchmarks were designed and run, safety framework reports that describe the overarching approach to harm prevention, and API documentation that covers the technical integration. Above it, you might find plain-language product pages or regulatory submissions that draw on the model card as a source.

Thinking of model cards as part of a documentation hierarchy, rather than a standalone document, helps you plan what level of detail belongs in each layer.

## Getting Started: A Framework for Your First Model Card

If you are new to model cards, the simplest approach is to start with the questions the document needs to answer. Before you write a word, work through the following with the model development team.

What does this model do, and what does it not do? What data was used to train it, and where did that data come from? How was it evaluated, and by whom? What are the known failure modes or edge cases? What populations or use cases were explicitly excluded from testing? What should a deploying team know before going live?

These questions will surface the information you need. Your job as a technical writer is then to translate the answers into clear, precise, auditable prose that serves the full range of readers.

In the next article in this series, we will look at the structure of a model card in detail and work through a practical template you can adapt for your own projects.

**Series: AI Model Cards for Technical Writers**

This is the first article in a series covering model cards from first principles through to production-ready documentation.

- **Part 1:** What Is an AI Model Card? (this article)
- Part 2: The Anatomy of a Model Card: Section by Section
- Part 3: Writing the Intended Use and Limitations Section
- Part 4: Documenting Bias Evaluations and Safety Testing
- Part 5: Model Cards in Regulated Industries: What Compliance Teams Need

*Have questions about model cards or AI documentation? Connect on [LinkedIn](https://www.linkedin.com/in/ivanwalsh/).*
