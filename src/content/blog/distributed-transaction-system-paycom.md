---
title: The Real-World Complexity of Distributed Sagas
date: January 15, 2025
readTime: 12 min read
excerpt: Lessons learned implementing the Saga pattern for a high-volume financial system.
tags: ["System Design", "Microservices", "Reliability"]
---

Moving from a monolith to microservices is often sold as a way to fix reliability, but in my experience, it mostly just moves the complexity to the network layer. At Paycom, we had to break down a critical payroll engine into smaller services. The original monolith was hard to maintain, but it had one massive advantage: a single database transaction. If something failed, the whole thing rolled back automatically.

When we split that into 12 different services, we lost that ACID guarantee. We suddenly had a system where we could successfully calculate taxes in Service A, but fail to disburse funds in Service B. In the financial world, that kind of partial state is a disaster.

## Why We Chose Sagas (Orchestration)

We looked at Two-Phase Commit (2PC), but locking resources across distributed services is a throughput killer. We needed something that could handle high volume without waiting for every single service to agree synchronously.

We settled on an Orchestration-based Saga pattern. I built a central service—the Orchestrator—that acts as the state machine for the entire transaction.

I preferred orchestration over choreography (where services just listen for events) because payroll logic is complex and changes often. If the tax law changes, I'd rather update the Orchestrator than hunt down logic scattered across five different services. It also makes debugging easier; if a transaction gets stuck, I can just look at the Orchestrator's state to see exactly which step failed.

## The Reality of "Undo" (Compensating Transactions)

The textbook concept of a Saga is simple: if step 3 fails, run the "undo" logic for steps 2 and 1.

In practice, this is messy. You can't always just "undo" a financial transaction cleanly. What if the money has already been moved to an external bank? You can't just delete a database row; you might have to issue a new "refund" transaction.

We spent a lot of time designing these compensating transactions. For every action (e.g., "Reserve Funds"), we had to write a robust counter-action (e.g., "Release Reservation").

## Idempotency is Everything

The biggest headache wasn't the saga logic itself—it was the network. We discovered early on that our services were occasionally receiving duplicate messages. If a "Deduct Tax" message arrived twice, we'd deduct it twice.

To fix this, we implemented strict idempotency checks using Redis. Every request carries a unique ID, and our services check this cache before processing. It sounds basic, but in a distributed environment, it’s the only thing standing between you and a corrupted ledger.

## The Outcome

It took months of testing and tuning, but the system is now stable. Partitioning our Kafka topics by Client ID helped us keep related transactions ordered, and offloading non-critical tasks (like email notifications) to separate queues kept the core pipeline fast.

The biggest win wasn't just performance—it was clarity. When something breaks now, we have a clear trace ID and a state machine that tells us exactly where we left off. It’s significantly easier to reason about than the tangle of stored procedures we used to have.
