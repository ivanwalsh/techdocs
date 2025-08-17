---
slug: truth-tables-technical-documentation
title: How to use Truth Tables for Technical Documentation
authors: [ivanwalsh]
tags: [Technical_Documentation, Agile]
description: How to use Truth Tables for Technical Documentation Part 1

---

# Truth Tables for Technical Documentation

When we're in the role of a 'reader' we tend to skim over the 'happy path' in user guides and other types of documentation. Quite often we only turn to documentation when lost, confused, or uncertain. For instance, someone changed a parameter setting and we can't figure out how to fix it. So, we crack open the docs, search, and go hunting for the answer. But where is it? What should I search for? 

I mention this as last week, I started to listen to Roger Penrose's 'The Emperor's New Mind' and came across a section where he discusses 'truth tables' in the context of classical logic and computation, and also their limitations in terms of understanding 'human' consciousness.

On the way home from my walk, I began to think if I could apply this concept to technical documentation.

<!-- truncate -->

Truth tables offer a systematic approach to move beyond "happy path" documentation that assumes everything works perfectly. 

When you encounter a problem (say configuring RoboHelp), then search online for the answer, most traditional doc sets will fail to address the complex combinations of conditions that may have created the unexpected outcome. 

Instead, if you as a tech writer treat conditions as *boolean* inputs and map all possible combinations to specific outputs, you can document the edge cases that generate these issues.

However, truth tables aren't universally applicable. They work best for scenarios with 2-3 binary variables that affect clear outcomes, such as API responses, permission matrices, or feature availability. Once you go higher than that, the tables become increasingly complex and overwhelm the reader; hierarchical decision trees provide better user experience in this scenario. 

In terms of cost benefits, truth tables can potentially reduce support costs if implemented correctly. Instead of leaving users to figure out unexpected errors and creating support tickets in frustration, you can anticipate their concerns and provide the necessary information.

In this article, we'll look at when *boolean thinking* adds value to your docs and when it can overcomplicate simpler processes. Let's get started.

## Downside of happy paths

As mentioned, traditional documents follow a happy path. However, this can frustrate users when they step outside this path: the generic 'one size fits all' instructions offer only limited usefulness.

- Traditional documents assume ideal conditions. Everything must work perfectly, like an AND operation where all inputs must be true
- Real-world scenarios demand resilience. Users need help when ANY condition fails, like an OR operation that provides alternatives
- Truth tables help expose edge cases that are often overlooked

**Note**: If most users can work out the happy path by themselves, focus your documentation efforts on the failure scenarios and edge cases where users actually get stuck
 
## When to use Truth Tables in Tech Docs

Here are some things to keep in mind when determining potential truth table candidates.

Use truth tables in tech docs when:

- Multiple conditions affect the same outcome
- Users frequently meet 'unexpected' results
- Support tickets related to specific feature combinations
- Permissions or config settings interact in non-obvious ways

To give a little more context, consider the following:

**Potential candidate**: "When does the 'Export' button appear on the 'Sales Report' screen?"
- Variables: Admin rights (Y/N), Data exists (Y/N), Feature enabled (Y/N)
- Clear binary outcomes, affects user workflow

**Poor candidate**: "How to write burndown report"
- Too subjective, no clear binary conditions
- Better served by traditional writing guidelines

Here are four potential use cases:

- **API documents** – identify what may occur if the user changes multiple settings and how this will affect the response.
- **Permissions** – rather than listing all permissions, use a matrix to illustrate which set of permissions gives you access to which parts of the product.
- **Troubleshooting and Configuration** – illustrate what happens if/when you change one or more settings. For instance, if the configuration likely to create a non-obvious response or error message that may be hard to troubleshoot without context.
- **FAQs** – most FAQS give atomic answers but often lack context. Increase value by anticipating how the user may have created this issue in the first place. Was it due to a permission, config setting, set of parameter changes, or some non-obvious setting they may have changed

## When NOT use Truth Tables in Tech Docs

To be clear, you don't need to use truth tables for every piece of documentation.

Here are some examples of where they're not required:

- Linear processes with no branching. For example, "Update your password"
- Single-variable outcomes. For instance, if a feature is only available with a specific plan.
- Well-understood happy paths that rarely fail.
- Processes with multiple variables. Instead, develop a set of procedures or work instructions to cover different scenarios.

## How to Manage Complex Truth Tables

When you have multiple inputs, the size of the table can become unwieldy. Here's how to address this.

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

With 2 or 3 variables, truth tables work well; use decision trees when you have 4+ variables (16+ scenarios).

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

To implement this concept effectively, I'd suggest you identify a high-priority document that directly affects user success. For instance, an 'On-boarding Guide' with multiple configuration settings.

Begin with one specific section, rather than trying to boil the ocean. Create your truth table for that section, then walk the on-boarding team through the revised document. Ask specific questions: Does this resolve issue faster? What parts could be refined? Are decision points clear? Does it simplify or complicate the instructions.

This small-scale pilot will give you concrete data on whether truth tables improve your documentation. Once you validate the approach, you can systematically apply it to other complex sections where multiple conditions affect user outcomes.

## Summary

When technical documentation assumes everything works perfectly (i.e. all conditions are true), it will fail users who encounter partial failures or missing prerequisites.

To resolve this, use truth tables to document what happens when conditions aren't met—the scenarios your users actually face.

## Further reading

- [Review of Roger Penrose, The Emperor's New Mind](https://web-archive.southampton.ac.uk/cogprints.org/432/1/penrose.htm)
- [BBC: Truth Tables](https://www.bbc.co.uk/bitesize/guides/zr33rwx/revision/4)
- [UXPin: What is a Happy Path](https://www.uxpin.com/studio/blog/what-is-happy-path-in-ux-design/)