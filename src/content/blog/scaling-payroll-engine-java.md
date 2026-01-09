---
title: Why Our Java Payroll Engine Was Too Slow (And How We Fixed It)
date: January 10, 2025
readTime: 12 min read
excerpt: Processing 5 million paychecks in 4 hours required more than just throwing RAM at the JVM.
tags: ["Java", "Performance", "Garbage Collection"]
---

In payroll, deadlines are strict. We often have a 4-hour window to process, validate, and finalize paychecks for our "Same Day Pay" clients.

When I started on this project, our calculation engine was taking about 9 hours to complete a full run. That wasn't just slow; it was broken. We were consistently missing SLAs.

The initial instinct was to just increase the heap size on our JVMs. We threw more RAM at the problem, but it actually made things worse. The application would run faster for a bit, then freeze for 10-15 seconds at a time. We had created a massive Garbage Collection problem.

## The GC Problem

I profiled the application (using JProfiler) and found we were spending about 25% of our execution time in "Stop-the-World" pauses. We were allocating millions of short-lived objects during the tax calculation phase, and the Garbage Collector was struggling to keep up.

To fix this, we did two things:
1.  **Switched to G1GC** and set a strict pause time target (`MaxGCPauseMillis`).
2.  **Object Pooling.** This is old school, but for our heaviest objects (like `TaxContext`), it was necessary. Instead of allocating a new context for every single employee, we reused a pool of them. This drastically reduced the churn on the heap.

## Parallelizing the Workload

Payroll files for a single company usually need to be processed somewhat sequentially, but different companies are completely independent.

I wrote a custom logic using Java's `ForkJoinPool` to better balance the load. We had a problem where a massive client (think 50,000 employees) would block a thread for hours, while smaller clients waited in line.

We split the work so that "Anchor Clients" got dedicated threads, while smaller jobs were batched together. This prevented one large file from gumming up the entire works.

## Streaming Data

We also moved to a streaming model for fetching data. Originally, we would fetch all employee records for a batch, load them into memory, and then start calculating.

I refactored this to use a reactive stream approach. We start calculating for the first employee as soon as the record comes off the wire, while the database driver is still fetching the rest. It keeps the CPU fed with work and prevents those "wait-then-spike" usage patterns.

## The Result

We got the processing time down to about 3.5 hours, well within our 4-hour window. The system is also much more stable; we aren't seeing those massive memory spikes that used to crash the pods in the middle of a run.

It was a good reminder that in high-volume Java applications, you really have to pay attention to your memory allocation rate. You can't just rely on the GC to magically clean up after you forever.
