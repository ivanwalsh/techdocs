---
title: "MCP server documentation — the five things most teams get wrong"
slug: mcp-documentation-mistakes
description: Most MCP servers are underdocumented. After working with AI systems in regulated financial environments, I keep seeing the same five mistakes. Here is what they are and how to fix them.
tags: [mcp, documentation, ai, technical-writing, fintech, product-management]
authors: [ivanwalsh]
date: 2026-04-11
---

I have been thinking about this a lot recently.

We are in the middle of a wave of MCP server development. Teams across the industry are building connectors, tools, and integrations at pace, pushing them to GitHub, sharing them in developer communities, and expecting adoption to follow. Some of it does. But a lot of it does not, and when I look at why, the answer is almost always the same.

The documentation is not there.

<!--truncate-->

Not absent entirely — most MCP servers have a README of some kind. But the README explains how to install the server, not how to use it effectively. It tells you how to get it running, not what happens when the model calls a tool with a malformed input. It assumes the reader already understands what the server does and why.

An AI model does not make that assumption. Neither does the developer who inherits the codebase six months from now.

I have seen well-engineered MCP servers get no uptake because nobody could figure out what the tools actually did. I have seen integrations fail in production because error codes were undocumented and the model had no recovery path. And I have seen compliance reviews stall because the permission model existed in the code but not in any document a regulator could read.

The five mistakes below are not the result of teams being careless. They are the result of teams applying the wrong mental model to a new kind of documentation problem. Here is what I see most often, and what to do about it.

## 1. Writing the tool description for a developer rather than a model

This is the mistake with the most immediate consequences, and the one I see most often.

When I document a REST API endpoint, I write for a developer who will read the description, understand the intent, and make a judgement call. A description like "Returns account balance information" is workable because the developer can infer the rest from context.

When you write an MCP tool description, the primary reader is an AI model. The model cannot infer. It cannot ask a follow-up question. It reads the description and decides, based on that description alone, whether this tool matches what it is trying to do.

A description like "Returns account balance information" will cause the model to misuse the tool, skip it when it should use it, or call it with malformed inputs. A description that works for a model looks more like this:

*"Returns the current cleared balance and available balance for a specified account, in GBP. Use this tool when the user asks about their account balance, available funds, or how much they can spend. Do not use this tool for pending transactions or credit limits."*

The difference is specificity: when to use the tool, when not to use it, and what the output actually contains. This is not natural to write if you are thinking about a human reader. It becomes natural when you remember the primary reader has no context beyond what you give it.

## 2. Treating the input schema as self-documenting

Teams publish an input schema that shows field names and types, and consider the job done.

```json
{
  "account_id": "string",
  "currency": "string",
  "date": "string"
}
```

This tells a developer the field names. It tells an AI model almost nothing useful. What format does `date` expect? Is `currency` an ISO 4217 code or a free-text field? What happens if `account_id` does not exist in the system? Is `currency` required or does it default to something?

A model constructing a request from this schema will guess. Sometimes it will guess correctly. Often it will not, and the failure will be silent.

The documentation that actually works looks like this:

```
account_id: string, required
  The internal account identifier. Format: ACC- followed by 8 digits.
  Example: ACC-00123456

currency: string, optional, default: GBP
  ISO 4217 currency code. Supported values: GBP, USD, EUR.

date: string, optional, default: today
  Valuation date in YYYY-MM-DD format.
  Cannot be a future date.
```

Every parameter needs a type, a requirement status, a format, a default value where applicable, valid values where the field is constrained, and what happens at the boundaries. This is the minimum an AI model needs to construct a valid request reliably.

## 3. Leaving error codes undocumented

For a developer, an undocumented error code is an inconvenience. They read the response body, search the codebase, and figure it out.

For an AI model, an undocumented error code is a dead end. The model receives an unexpected response, has no documented recovery path, and either fails silently, retries indefinitely, or surfaces a confusing error to the end user.

Every error code an MCP tool can return needs three things documented: what caused it, what the model should do next, and whether the condition is recoverable.

```
ERROR_ACCOUNT_NOT_FOUND
Cause: The account_id does not exist in the system.
Action: Do not retry. Ask the user to confirm the account number.
Recoverable: No.

ERROR_RATE_LIMIT_EXCEEDED
Cause: More than 10 requests in the last minute.
Action: Wait 60 seconds and retry once.
Recoverable: Yes, automatically after the rate limit window resets.
```

In financial services this section also needs to specify which errors should be surfaced to end users and which should be handled silently. A balance lookup that fails because of a system timeout is handled differently from one that fails because the account is frozen. The model needs to know the difference, which means the documentation needs to state it explicitly.

## 4. Omitting the permission model

Teams document that a Bearer token is required. They do not document which scopes are needed for which tools, what happens when a token has insufficient permissions, or whether certain tools are restricted to specific user roles.

For a developer, this is annoying but solvable. For an AI model operating in an automated workflow, insufficient permissions produce an error the model cannot resolve without human intervention. If the error code is also undocumented, nobody knows why the workflow stopped.

In regulated environments, the permission model is also a compliance document. If an AI tool can initiate a transaction or access sensitive account data, the permission boundaries need to be documented explicitly so that compliance teams can verify the right controls are in place. An implicit permission model is, from a regulatory perspective, no permission model at all.

For each tool, document clearly: which scope or role is required to call it, what is returned when the caller lacks permission, and whether permission is granted at the user level, the application level, or both.

## 5. Publishing no usage examples

This is the simplest mistake and the most widespread. Teams document the schema and consider the job done. Usage examples are treated as a nice-to-have that will be added later.

Later rarely arrives.

A usage example does three things that schema documentation cannot. It shows what a realistic input looks like in practice. It shows what a successful response looks like, so the model knows what to expect. And it anchors the abstract schema to a real-world scenario, which significantly improves the model's ability to match the right tool to the right situation.

For each tool, publish at least one complete worked example: a realistic input with real-looking values, not placeholder strings, and the full expected response including any fields that only appear in certain conditions.

If the tool behaves differently for edge cases — a null field, a boundary value, a conditional response — document those as separate examples. The investment is small. The impact on model reliability is significant.

## The pattern underneath all five mistakes

Every mistake on this list has the same root cause: teams are writing MCP documentation for the wrong reader.

REST API documentation is written for a developer who can read, infer, and experiment. MCP documentation is written for an AI model that can do none of those things. The model reads what is written and acts on it directly. Getting it wrong has the same consequences as getting the code wrong — except the failure is often invisible until something goes wrong in production.

This is why getting MCP documentation right before you ship is not a nice-to-have. It is the difference between a server that gets adopted and one that sits on GitHub with two stars and no integrations.

## MCP server documentation audit checklist

Use this checklist to audit any MCP server README or setup guide. Work through it tool by tool — a server that exposes five tools needs five passes.

**Tool descriptions**

- [ ] Every tool has a plain-language description of what it does
- [ ] The description states when to use this tool
- [ ] The description states when not to use this tool
- [ ] The description specifies what the tool returns in plain terms
- [ ] The description is written for a model reader, not a developer reader

**Input schema**

- [ ] Every parameter has a documented type
- [ ] Every parameter states whether it is required or optional
- [ ] Optional parameters document their default values
- [ ] Constrained fields document their valid values or formats
- [ ] Date and time fields specify the expected format
- [ ] Numeric fields document minimum and maximum values where applicable
- [ ] Null behaviour is documented for every optional parameter
- [ ] At least one realistic example value is provided per parameter

**Output schema**

- [ ] The success response is fully documented with all fields described
- [ ] Conditional fields (those that only appear in some responses) are identified
- [ ] The response format is specified (JSON, plain text, structured object)

**Error codes**

- [ ] Every error code the tool can return is listed
- [ ] Each error code documents its cause
- [ ] Each error code specifies the recommended recovery action
- [ ] Each error code states whether the condition is recoverable
- [ ] Errors that should be surfaced to end users are identified
- [ ] Errors that should be handled silently are identified

**Authentication and permissions**

- [ ] Required authentication method is documented
- [ ] Required scope or role is documented per tool
- [ ] The response when permissions are insufficient is documented
- [ ] How to obtain credentials in development and production environments is explained

**Usage examples**

- [ ] At least one complete worked example exists per tool
- [ ] Example inputs use realistic values, not placeholder strings
- [ ] The full expected response is shown for each example
- [ ] Edge case behaviour is illustrated with separate examples where it differs from the standard case

**Scoring**

Count the ticked boxes as a percentage of the total. A server scoring below 60 percent has documentation gaps significant enough to affect model reliability. A server scoring below 40 percent should be considered undocumented for practical purposes, regardless of what the README contains.

## One last thing

I am genuinely curious about what you are seeing out there.

Are your teams documenting MCP servers as part of the build, or is it something that gets picked up later — if at all? Are product managers including it in the Definition of Done, or is it still treated as optional? And if you have found an approach that works, I would love to hear about it.

Connect with me on [LinkedIn](https://www.linkedin.com/in/ivanwalsh/) and let me know. I read every reply, and the conversations I have had off the back of these articles have been some of the most interesting I have had in years.

If you found the checklist useful, share it with your team. It takes two minutes to run through and tends to start the right conversations.

**About the author**

Ivan Walsh is a Technical Writer based in Dublin, Ireland, specialising in AI-ready documentation for regulated financial platforms. He works with global financial institutions on API documentation, RAG-ready content, and chatbot integration guides for systems where precision and compliance are non-negotiable.

[Connect with Ivan on LinkedIn](https://www.linkedin.com/in/ivanwalsh/)
