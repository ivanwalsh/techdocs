---
slug: truth-tables-technical-documentation
title: How to use Truth Tables for Technical Documentation
authors: [ivanwalsh]
tags: [Technical_Documentation, Agile]
description: How to use Truth Tables for Technical Documentation Part 1

---

# Truth Tables for Technical Documentation

As readers we tend to skim over the 'happy path' in user guides. In general, we reluctantly turn to documentation when lost, confused, and in a hurry. Typically, someone changed a setting and we can't figure out how to fix it. So, we crack open the docs, search, and go hunting for the answer. But where is it?

Last week, I was re-reading Roger Penrose's 'The Emperor's New Mind' and came across a section where he discusses 'truth tables' in the context of classical logic and computation, and also their limitations in terms of understanding 'human' consciousness.

As if often the case when you encounter a novel concept, it sparked a few ideas on how to apply this to technical documentation.

<!-- truncate -->

Truth tables offer systematic approach to move beyond "happy path" documentation that assumes everything works perfectly. 

When users encounter problems, then search online/pdf, most traditional guides fail to address the complex combinations of conditions that have created the unexpected outcomes. 

Instead, if you treat conditions as boolean inputs and map all possible combinations to specific outputs, you can document the edge cases that generate the most support tickets.

However, truth tables aren't universally applicable. They work best for scenarios with 2-3 binary variables affecting clear outcomes, such as API responses, permission matrices, or feature availability. Higher than that and the tables start to overwhelm the reader; hierarchical decision trees provide better user experience in this scenario. In terms of cost benefits, truth tables can potentially reduce support costs if implemented correctly instead of leaving users to figure out unexpected errors and create support tickets in frustration.

In this article, we'll look at when *boolean thinking* adds value to your docs and when it can overcomplicate simpler processes. Let's get started.

## Downside of happy paths

Traditional documents follow a happy path. This frustrates users when they step outside this path: the generic 'one size fits all' instructions offer only limited usefulness.

- Traditional docs assume ideal conditions. Everything must work perfectly, like an AND operation where all inputs must be true
- Real-world scenarios demand resilience. Users need help when ANY condition fails, like an OR operation that provides alternatives
- Truth tables help expose edge cases that are often overlooked

**Note**: If most users can work out the happy path by themselves, it begs the question where you should prioritize your documentation tasks. We'll discuss this in later articles.

## When to use Truth Tables in Tech Docs

Here are some things to keep in mind when determining potential truth table candidates.

Use truth tables in tech docs when:

- Multiple conditions affect the same outcome
- Users frequently meet 'unexpected' results
- Support tickets related to specific feature combinations
- Permissions or config settings interact in non-obvious ways

To give a little more context, consider the following:

**Potential candidate**: "When does the 'Export' button appear on the Sales Report screen?"
- Variables: Admin rights (Y/N), Data exists (Y/N), Feature enabled (Y/N)
- Clear binary outcomes, affects user workflow

**Poor candidate**: "How to write burndown report"
- Too subjective, no clear binary conditions
- Better served by traditional writing guidelines

Here are four potential use cases:

- **API documents** – identify what may occur if the user changes multiple settings and how this will affect the response.
- **Permissions** – rather than listing all permissions, use a matrix to illustrate which set of permissions gives you access to which parts of the product.
- **Troubleshooting and Configuration** – illustrate what happens if/when you change one or more settings. For instance, if the configuration likely to create a non-obvious response or error message that may be hard to troubleshoot without context.
- **FAQs** – most FAQS are atomic answers but often lack context. Increase value by anticipating how the user may have created this issue in the first place. Was it due to a permission, config setting, set of parameter changes, or some non-obvious setting they may have changed

## When NOT use Truth Tables in Tech Docs

To be clear, you don't need to use truth tables for every piece of documentation.

Here are some examples of where they're not required:

- Linear processes with no branching. For example, "Update your password"
- Single-variable outcomes. For instance, if a feature is only available with a specific plan.
- Well-understood happy paths that rarely fail.
- Processes with multiple variables. Instead, develop a set of procedures or work instructions to cover different scenarios.

## How to Manage Complex Truth Tables

When you have multiple inputs, the size of the table can become unwieldly. Here's how to address this.

Imagine access to a premium dashboard depends on three conditions:
- A = Active subscription
- B = Account verified
- C = Admin permissions

### The 8-Row Truth Table

| Subscription | Verified | Admin | Dashboard Access | User Experience |
|--------------|----------|-------|------------------|-----------------|
| Yes | Yes | Yes | Yes | Full access granted |
| Yes | Yes | No | No | "Contact admin for permissions" |
| Yes | No | Yes | No | "Please verify your account" |
| Yes | No | No | No | "Verify account and contact admin" |
| No | Yes | Yes | No | "Subscription required" |
| No | Yes | No | No | "Subscription required" |
| No | No | Yes | No | "Subscription required" |
| No | No | No | No | "Subscription required" |

### Result: Overly Complex Table

This table is difficult to scan. Seven scenarios result in "No access," but with different explanations. This provides little value to users as they'll have to process multiple variables simultaneously to understand their situation.

### Alternative Approach: Hierarchical Decision Tree

Instead of one overwhelming truth table, break it into a logical sequence:

**Step 1: Check Subscription**
```
Has Active Subscription?
├── No → "Upgrade to access premium features" [STOP]
└── Yes → Continue to Step 2
```

**Step 2: Check Verification**
```
Account Verified?
├── No → "Verify your account to continue" [STOP]
└── Yes → Continue to Step 3
```

**Step 3: Check Permissions**
```
Has Admin Permissions?
├── No → "Contact your administrator for dashboard access"
└── Yes → "Dashboard access granted"
```

Using this approach, users only need to process one condition at a time. Each "No" provides specific next steps. This also makes it easier to update individual decision points.

### Avoid Complexity

While 2/3 variables truth tables work well, use decision trees when you have 4+ variables (16+ scenarios).

If you find yourself writing mostly 'No' outcomes with similar error messages, consider restructuring your approach.

## Truth Table Simple Example

Here's a simple example of a truth table for a user getting access to a software product.

The user can access a premium feature only if they:
- A = Have an active subscription
- B = Have completed account verification

| Has Subscription | Verified Account | Can Access Feature |
|------------------|------------------|--------------------|
| Yes | Yes | Yes |
| Yes | No | No |
| No | Yes | No |
| No | No | No |

This shows all possible combinations and their outcomes. Only when both conditions are met (row 1) can the user access the feature.

**Takeaway**: Truth tables help us think systematically about all possible scenarios, not just the "happy path" where everything works perfectly.

## How to Start

If you want to get past the happy path, so to speak, here's how you can setup a simple truth table for your next document set.

The goal is to map all the possible inputs to a specific output.

1. **Define the Scope** – identify all of the variables/conditions that affect the outcome.
2. **Map all possibilities** – create a matrix that captures all potential conditions (yes/no, true/false). For two variables, that's four rows. For three variables, it's eight. Make sure you don't miss any scenarios.
3. **Predict the outcome** – for each row, identify the exact, predictable outcome. Does the user see the 'Add to Cart' button? When is this button greyed out? This forces you to explicitly clarify when and why each user interface control appears, and under which condition features/controls appears in the UI/API/Data feed etc.

### Start with a specific use case

If you're interested in implementing this concept, I'd suggest you identify a high-priority document which provides real customer value. For instance, an Onboarding Guide which will have lots of complex settings.

First, focus on a specific section of the guide, then walk the onboarding team through the revised document and study their feedback. What parts work for them? Where is it too complicated? Does it simplify or complicate the instructions.

By starting with a small proof of concept, you'll get a sense of what works. Following this, you can apply similar updates to the rest of your document set.

## Summary

When technical documentation assumes everything works perfectly (i.e. all conditions are true), it will fail users who encounter partial failures or missing prerequisites.

To resolve this, use truth tables to document what happens when conditions aren't met—the scenarios our users actually face.

## Further reading

- [Review of Roger Penrose, The Emperor's New Mind](https://web-archive.southampton.ac.uk/cogprints.org/432/1/penrose.htm)
- [BBC: Truth Tables](https://www.bbc.co.uk/bitesize/guides/zr33rwx/revision/4)
- [UXPin: What is a Happy Path](https://www.uxpin.com/studio/blog/what-is-happy-path-in-ux-design/)