---
sidebar_position: 2
---

# Agile Technical Documentation

I've been running technical documentation teams inside Agile delivery for longer than I've been using AI tools, and if I'm honest, the two go hand in hand now. Agile gave me the cadence. AI gave me the throughput. What I'm going to walk through here is how I actually run a remote tech docs team inside a Scrum setup — the ceremonies I keep, the tools I use, and the metrics I care about.

## Running a remote tech docs team

Most of the teams I've managed in the last few years have been fully remote, often across three or four time zones. That setup breaks quickly if you try to run it with ad-hoc chat and goodwill, so I treat the Agile ceremonies as the scaffolding that holds everything else together. The writers know what they're doing today, what they're doing this sprint, and how their work lines up against the engineering deliverables. Without that, remote docs teams drift.

I've also learned not to over-ceremonialise. My rule of thumb is: if a meeting isn't producing a decision, a hand-off, or a blocker being removed, I kill it. Writers are doing deep work, and deep work and status meetings are natural enemies.

## Daily standups

I keep standups to 15 minutes, hard stop. Each writer answers the same three questions — what I finished yesterday, what I'm working on today, what's blocking me. I run them async on the days where time zones make a live call painful (usually a short thread in Slack or Teams), and live on the days the team is overlapping.

The thing I pay attention to in standups is not the *yesterday/today* — I can see that in Jira. What I'm listening for is the *blocker*. Nine times out of ten, the blocker is that engineering hasn't merged something, or a product manager owes the writer a decision, or an API hasn't stabilised. My job in the standup is to clear that blocker before the end of the day. If I can't, I escalate it.

## Sprint planning sessions

I plan docs sprints on the same cadence as the engineering sprints the docs are supporting — usually two weeks. In planning I walk the team through the engineering backlog for the upcoming sprint, and together we identify which stories have a documentation deliverable attached. Every engineering story that ships customer-visible behaviour gets a linked docs ticket. No exceptions.

I estimate docs work in story points, not hours. I know that's debated, but in my experience points force the team to think about relative complexity — a tricky API reference is a bigger piece of work than a longer but routine how-to guide, and hours hide that. Over time, I build up a velocity baseline for the team and for each writer, and that's what I use to forecast.

## Retrospectives

I run retros every sprint, 45 minutes, and I protect them. I've learned the hard way that the retro is the only ceremony where the team gets to tell me the process is broken, so I don't skip it, even when the sprint has been clean.

The format I use is simple: what worked, what didn't, what we're going to change next sprint. I cap the "change" list at two items per retro. Any more than that and nothing actually changes.

## Kanban and Jira for tracking sprints

I run the docs board in Jira (or whatever the engineering team is already using — I'd rather be in the same tool than in a separate one). The columns I keep are: Backlog, Ready for Draft, Drafting, In Review, Ready to Publish, Published. Every docs ticket is linked to the engineering story or epic it supports, so I can trace a published page back to the feature that triggered it and forward to the release it shipped in.

For pieces of work that don't fit the sprint rhythm — long-form guides, information architecture projects, style guide work — I run a parallel Kanban board with WIP limits. Sprint work and continuous work have different shapes, and pretending they don't just frustrates the writers.

## Keeping docs aligned to software deliverables

This is the part I care about most. The question I ask at every sprint review is: *did the docs ship with the software, or did the docs ship after?* If the docs shipped after, that's a process failure, and I want to know why.

The way I keep them aligned:

- Every engineering story with customer-visible behaviour has a linked docs ticket, created in planning, not after the fact.
- Writers are invited to engineering refinement sessions, not as observers but as participants — if the writer can't explain the feature in plain English in refinement, the story isn't ready.
- Docs tickets follow the same Definition of Done as engineering tickets: reviewed, merged, deployed. A docs ticket is not done when the draft is written. It's done when the content is live.
- Release notes are drafted incrementally across the sprint, not assembled in a panic on release day.

## Monitoring throughput — the part I really care about

This is where the Agile data pays for itself. I use the sprint data — Jira history, cycle times, points completed, review turnaround — to monitor the throughput of the writers and the health of the team. Not to micromanage individuals, but to spot patterns before they become problems.

The metrics I actually look at:

- **Velocity per writer and per team** — trending over the last six sprints, not a single number. I'm looking for drift, not absolutes.
- **Cycle time from Drafting to Published** — if this is creeping up, the bottleneck is almost always in review, and I need to fix the review process.
- **Review turnaround time** — how long a docs PR sits waiting for SME or editorial review. This is usually my single biggest lever.
- **Ratio of planned vs. unplanned work** — if more than 20% of a sprint is unplanned, the intake process is broken.
- **Docs-to-engineering ship alignment** — the percentage of engineering stories in a release that shipped with their docs live on the same day. This is the number I report upward.

I treat this data the way an engineering manager treats DORA metrics: as a conversation starter, not a performance review. When a writer's cycle time spikes, I don't assume they're slow. I assume they're blocked, and I go find the blocker.

## Where Agile, AI, and docs-as-code meet

The reason I combine all of this — Agile ceremonies, Jira data, docs-as-code pipelines, and AI tools — is that each one compensates for the weakness of the others. Agile gives me cadence and visibility. Docs-as-code gives me the same velocity as engineering. AI gives each writer leverage on the draft-edit-review loop. And the throughput data tells me whether any of it is actually working.

If you want to see how I put the technical side of this together — the pipeline, the linting, the CI, the publishing — that's over on the [AI page](./ai.md) and in the reference repo: [github.com/ivanwalsh/ai-fintech-docs-pipeline](https://github.com/ivanwalsh/ai-fintech-docs-pipeline).
