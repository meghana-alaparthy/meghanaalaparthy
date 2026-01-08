---
title: Debugging a Production Message Queue Performance Issue
date: December 10, 2024
readTime: 10 min read
excerpt: A deep dive into how I diagnosed and fixed a consumer lag issue that threatened our 99.99% SLA.
tags: ["Messaging", "Performance", "Debugging", "SRE"]
---

## The Symptoms
Our 'Reporting' service started lagging 2 hours behind real-time. The consumer group was rebalancing constantly.

## Root Cause Analysis
Using **Prometheus and Grafana**, we identified that one partition was receiving 80% of the traffic due to a poor partition key strategy (TenantID).

## The Fix
We implemented a **Custom Partitioner** based on 'EmployeeID' to ensure uniform data distribution. We also tuned the batch size and timeout configurations.

### Results
Consumer lag dropped to near-zero, and throughput increased by **300%**.
