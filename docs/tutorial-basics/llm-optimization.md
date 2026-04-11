---
sidebar_position: 10
description: Making documentation work for machine reading — llms.txt, structure, context quality, and hallucination reduction — without sacrificing human readability.
---

# LLM Optimization

As documentation becomes AI-consumable, how you structure and format information fundamentally changes. LLM optimization is the discipline of making documentation work better for machine reading without sacrificing human readability.

## Why documentation needs AI optimization

Language models retrieve and reason about documentation differently than humans do. A human reads your page top-to-bottom, building context as they go. An LLM retrieval system might grab a snippet from the middle, strip it of context, and ask the model to make sense of it. If your documentation wasn't written with that extraction in mind, the model hallucinates connections or misses nuance.

AI-ready documentation is intentional about structure, context, and clarity in ways that serve both human and machine readers.

## The llms.txt standard

`llms.txt` is a simple format for exposing documentation to LLMs in a structured way. It's like `robots.txt` for language models—a manifest file that tells retrieval systems what your documentation contains, how it's organized, and what context matters.

A well-structured `llms.txt` file includes:
- Clear hierarchical organization of documentation topics
- Priority indicators for what matters most
- Boundaries around what shouldn't be in LLM context (legal disclaimers, outdated content)
- Links to the authoritative source for each section

The format is human-readable and simple to maintain. It's not a replacement for good documentation structure—it's a layer on top that makes that structure explicit to AI systems.

## AI context quality

LLM hallucinations often stem from poor context. The model is asked to reason about something, given insufficient or contradictory information, and fills the gap with plausible-sounding fiction.

Optimize for context quality by:
- Making dependencies explicit: "This API requires authentication (see: Auth Guide)"
- Providing examples alongside explanations
- Using consistent terminology throughout
- Flagging assumptions: "This assumes you've set up the development environment"
- Providing version clarity: "This applies to API v3. For v2, see..."

## Reducing hallucination

Hallucinations decrease when you:
1. Ground documentation in source of truth (specs, actual code)
2. Provide explicit constraints in the context ("Only document endpoints present in the OpenAPI spec")
3. Use structured data where possible (JSON, YAML, tables)
4. Create clear boundaries around what is known vs. what requires inference

The goal: an LLM processing your documentation should have enough context to explain it accurately, with visible gaps if information is missing.
