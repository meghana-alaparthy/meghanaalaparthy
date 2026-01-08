---
title: "System Design: Designing Netflix's CDN (Open Connect)"
date: November 05, 2024
readTime: 20 min read
excerpt: A theoretical deep dive into designing a global content delivery network handling exabytes of data.
tags: ["System Design", "Architecture", "CDN", "Interview Prep"]
---


## Proposed Architecture
I would leverage a hierarchy of **Open Connect Appliances (OCAs)** embedded directly in ISP networks.

### Traffic Steering
Using a custom DNS steering service to direct clients to the nearest healthy OCA based on BGP routing tables and real-time health checks.
