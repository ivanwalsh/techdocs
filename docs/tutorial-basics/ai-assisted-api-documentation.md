---
sidebar_position: 11
---

# AI-Assisted API Documentation

AI is a powerful tool for API documentation. It's also a source of hallucinated endpoints, invented parameters, and quietly wrong examples. The difference between these outcomes is process.

## The opportunity

API documentation is repetitive and specification-driven. An LLM, given the right constraints and context, can:
- Draft tutorial content quickly
- Generate code samples across multiple languages
- Refactor prose for consistency and clarity
- Create examples from OpenAPI specs
- Flag inconsistencies between the spec and the documentation

These are multiplier activities. AI handles the mechanical work; humans focus on accuracy and nuance.

## The constraint: guardrails are non-negotiable

AI output on API docs requires guardrails at every step. The OpenAPI spec is your source of truth. The LLM is a drafting tool, not a decision-maker.

**Core rule:** If the LLM is describing an endpoint, it must be given the exact specification of that endpoint from the OpenAPI spec. It should never be allowed to invent endpoints, parameters, or status codes from training data memory.

**Practical implementation:**
1. Lint the OpenAPI spec before the LLM ever sees it (Spectral or similar)
2. Provide the exact spec as context, never abstract descriptions
3. Use strict prompts with explicit "do not invent" constraints
4. Require human review before any AI-generated content ships
5. Execute examples against a sandbox to verify they actually work

## Where AI works best in API docs

- **Tutorials**: AI drafts learning paths. Humans verify the steps work end-to-end.
- **Code samples**: AI generates samples in multiple languages. Humans review, test, and ensure they compile/run.
- **Consistency passes**: AI refactors existing prose for voice and tone consistency.
- **Examples from specs**: AI extracts example request/response pairs from the spec and formats them.

## Where AI is risky

- **Contract documentation**: Reference docs must be exact. AI can draft; humans must review and verify.
- **Undocumented behavior**: If the spec is incomplete, AI will fill gaps with plausible fiction.

## Integration into your workflow

AI is a co-pilot inside a carefully orchestrated pipeline. The human context—the actual behavior of the API, the real users, the trust at stake—never leaves the human reviewer.

Run AI fast, verify everything, ship nothing unreviewed.
