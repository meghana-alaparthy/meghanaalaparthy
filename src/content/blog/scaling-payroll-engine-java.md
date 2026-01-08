---
title: Scaling a Java-Based Payroll Engine
date: January 10, 2025
readTime: 14 min read
excerpt: How we optimized a mission-critical Java engine to handle 5 million paychecks in under 4 hours, meeting aggressive same-day delivery SLAs.
tags: ["Java", "Performance Tuning", "JVM", "Enterprise Software"]
---

## The SLA Challenge: The 4-Hour Window

In the world of FinTech and Payroll, deadlines aren't just suggestions—they are legal requirements. Many of our enterprise clients operate on a "Same Day Pay" model. This means we often have a window of just 4 hours to process, validate, and disburse over 5 million paychecks.

When I first joined the project, the core calculation engine was taking 9+ hours for a full cycle. We weren't just missing our SLAs; we were risking the financial stability of thousands of employees.

## Why This Approach? Architectural Tuning Over Brute Force

The easy answer would have been to "throw more RAM at it." But Java is a memory-hungry beast. Simply increasing the heap size would lead to massive **Garbage Collection (GC) pauses**, which actually made the processing *less* predictable.

I chose to focus on **Vertical Efficiency**—making every CPU cycle and every byte of memory count.

## Step 1: Solving the Garbage Collection Nightmare

By profiling the application with **JProfiler**, I discovered that the system was spending 25% of its time in "Stop-the-World" GC pauses. This was caused by the massive allocation of short-lived objects during the tax calculation phase.

### The Fix: G1GC Tuning and Object Pooling
We switched to the **G1 Garbage Collector** and tuned the `MaxGCPauseMillis` to 200ms. More importantly, I implemented **Object Pooling** for the most frequently used data structures (like `TaxContext` and `EmployeeRecord`). 

Instead of creating 5 million new objects, we reused a pool of 50,000, drastically reducing the heap churn.

## Step 2: Parallelizing the Un-Parallelizable

The payroll calculation for a single company is inherently sequential (Line 1 depends on Line 2). However, different companies are completely independent.

I designed a custom **ForkJoinPool** strategy that dynamically balanced the workload across 64 cores.

```java
// Dynamically adjusting parallelism based on company size
int parallelism = (employeeCount > 10000) ? 16 : 4;
ForkJoinPool customPool = new ForkJoinPool(parallelism);

customPool.submit(() -> {
    employees.parallelStream().forEach(this::calculatePaycheck);
}).get();
```

By separating massive "Anchor Clients" into their own dedicated high-priority threads, we prevented them from blocking smaller, faster runs.

## Step 3: Zero-Copy and NIO for Data Ingestion

Reading millions of employee records from a database is a classic I/O bottleneck. I implemented a **Reactive Stream** approach using Java NIO, allowing us to start processing the first 1,000 employees while the next 10,000 were still being fetched from the wire.

This "Pipelining" effect eliminated the "Wait-then-Work" pattern, keeping CPU utilization at a steady 85%.

## Step 4: The "Audit-First" Caching Strategy

Payroll requires frequent lookups of tax laws and benefit rules. Every database hit adds milliseconds. I implemented a tiered caching strategy using **Caffeine**:

1. **L1 Reference Cache**: Static tax rules (Immutable).
2. **L2 Transactional Cache**: Active payroll run state (Short-lived).

This reduced our database read volume by over 80%.

## The Impact: Mission Accomplished

After three months of engineering effort:
- **Processing time dropped from 9 hours to 3.5 hours.**
- **99.9% SLA compliance** achieved for "Same Day Pay" clients.
- **Improved Resource Stability**: The system now runs on 30% less heap memory despite processing more volume.

## Key Takeaways for Senior Java Engineers

1. **Stop-the-World is your enemy.** Tune your GC based on your allocation patterns, not just your heap size.
2. **Reuse, don't just Replace.** In high-throughput systems, `new Object()` is an expensive operation when done millions of times per minute.
3. **Pipelining beats Batching.** Don't wait for all the data to arrive; start working on it as soon as the first packet hits the buffer.

Efficiency is the difference between a system that "works" and a system that "wins." In the enterprise, winning means delivering on your promises, every single time.
