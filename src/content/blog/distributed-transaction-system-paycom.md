---
title: Building a Distributed Transaction System at Scale
date: January 15, 2025
readTime: 15 min read
excerpt: How I implemented the Saga pattern to manage distributed consistency across 12 microservices processing $50M in payroll daily.
tags: ["System Design", "Event Driven", "Microservices", "Distributed Systems"]
---

## The Challenge: From Monolith to Distributed Reliability

At Paycom, our legacy payroll engine was a decade-old monolith handling mission-critical financial operations. As the user base grew into the millions, the technical debt became a business liability. A single failure in the retirement contribution module could stall the entire payroll run for a 50,000-employee company.

The objective was clear: **Decouple the monolith into a suite of 12 microservices.** However, distributed systems introduce the "Consistency vs. Availability" nightmare. In payroll, we cannot have "partial success"—if a tax withholding succeeds but the net pay disbursement fails, the system is in a corrupt state.

## Why This Matters: The $50M Daily Stake

When you're processing $50M in payroll every day, "Eventual Consistency" isn't just a technical term—it's a financial risk profile. We needed a system that guaranteed that every dollar was accounted for, even if parts of the network were down.

## The Architectural Choice: The Saga Pattern

We moved away from traditional Two-Phase Commit (2PC) because it is synchronous and creates a "distributed lock" that kills throughput. Instead, I implemented an **Orchestration-based Saga**.

### The Orchestrator
I built a central 'Saga Orchestrator' service. Think of it as the conductor of an orchestra. It doesn't perform the work; it tells others when to start and what to do if they fail.

### The Transaction Lifecycle
1. **Initiation**: The orchestrator receives a "Process Payroll" command and generates a unique Saga-ID.
2. **Execution**: It calls the **Tax Service** to calculate withholdings.
3. **Validation**: Upon success, it calls the **Treasury Service** to reserve the calculated funds.
4. **Conclusion**: If all steps succeed, it broadcasts a "Payroll Finalized" event to the **Benefits Service**.
5. **Recovery**: If any step fails (e.g., insufficient funds), the orchestrator triggers **Compensating Transactions** (e.g., "Cancel Tax Entry") in reverse order.

### Orchestration vs. Choreography
We chose Orchestration for two strategic reasons:
1. **Centralized Logic**: Payroll laws change frequently. It's easier to update one orchestrator than 12 independent services.
2. **Observability**: When a $1M transaction fails, you need to know exactly why and where. An orchestrator provides a single point of truth for the transaction state.

## Handling Failure: Compensating Transactions

In a distributed world, failures aren't an "if," they are a "when." The Saga pattern handles this via **Compensating Transactions**.

If the *Treasury Service* fails to reserve funds, the orchestrator must trigger a "Refund/Undo" action in the *Tax Service*.

### The Idempotency Requirement
One of the hardest lessons learned was that every service MUST be idempotent. If the network stutters and a service receives the same "Tax Calculation" request twice, it must not deduct taxes twice. We implemented a "Transaction-ID" tracking system in a Redis cluster to ensure every operation was executed exactly once.

## Performance Tuning: Reaching 2,000 TPS

Handling peak load during end-of-month cycles required aggressive tuning of our Kafka backbone:

- **Partitioning Strategy**: We partitioned our topics by `CompanyID` to ensure all transactions for a single company were processed in order on the same consumer.
- **Async Enrichment**: We offloaded non-critical tasks (like sending email receipts) to separate "Side-Channel" Sagas to keep the main processing pipeline fast.

## Observability: Seeing Into the Dark

We integrated **OpenTelemetry** for distributed tracing. Every transaction was tagged with a global `Saga-ID`. This allowed us to visualize the entire lifecycle of a payroll run across 12 different service nodes in our Grafana dashboards.

## The Result

In the first six months of production:
- **Zero data inconsistencies** were reported.
- **60% reduction in latency** for the end-to-end payroll cycle.
- **Handles peak loads of 2,000 TPS** without breaking a sweat.

Distributed systems are hard, but with the right architectural patterns, they provide the resilience that modern enterprise software demands.
