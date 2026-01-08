---
title: Building a Distributed Transaction System at Scale
date: January 15, 2025
readTime: 15 min read
excerpt: How I implemented the Saga pattern to manage distributed consistency across 12 microservices processing $50M in payroll daily.
tags: ["System Design", "Event Driven", "Microservices", "Distributed Systems"]
---


## Solution: The Saga Pattern
I chose an **Orchestration-based Saga** using an asynchronous event bus. A central 'Saga Orchestrator' service managed the state of each transaction.

### Key Trade-offs
* **Orchestration vs Choreography:** Orchestration was chosen for better observability, despite the single point of failure risk (mitigated by HA deployment).
* **Consistency Model:** We accepted Eventual Consistency in favor of high availability (AP over CF).

## Impact
Zero data inconsistencies were reported in the first 6 months, and we handled a peak load of **2,000 TPS** during end-of-month processing. 
