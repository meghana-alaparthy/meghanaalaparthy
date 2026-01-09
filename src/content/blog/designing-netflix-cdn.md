---
title: Designing a Global CDN (System Design Exploration)
date: January 05, 2025
readTime: 10 min read
excerpt: An exploration of the constraints and architectural choices required to stream video to millions of concurrent users.
tags: ["System Design", "CDN", "Edge Computing"]
---

I like to use large-scale system design problems to keep my architectural skills sharp. Recently, I've been digging into how services like Netflix deliver content with such low latency. It’s an interesting physics problem as much as a software one.

When you're trying to send a large video file from a server in the US to a user in Australia, the speed of light becomes a legitimate bottleneck. Round trip time (RTT) alone makes the experience feel sluggish. To get around this, you have to move the data physically closer to the user.

## The Tiered Approach

A naive implementation might just replicate a database everywhere, but that's expensive and hard to manage. A better approach is a tiered caching strategy.

1.  **The Origin (Source of Truth):** This is where the master files live, likely in an AWS S3 bucket or similar object storage. It holds every single encoding variant of every video. It's reliable, but slow to access from halfway across the world.
2.  **Regional Caches:** These sit in major internet hubs (like Frankfurt or Singapore). They hold the subset of "active" content. They shield the Origin from the massive read traffic.
3.  **The Edge (ISP Approach):** This is the part I find most fascinating. Netflix actually puts hardware appliances (Open Connect) *inside* the data centers of ISPs. So when you stream a movie, the traffic might never even touch the public internet backbone. It goes from a box in your ISP's building directly to your router.

## Routing Strategies

If you have thousands of edge servers, how do you know which one to send a user to?

**BGP Anycast** is the standard answer. You advertise the same IP address from multiple locations, and the internet's routing protocol automatically sends the user to the "closest" one (in terms of network hops).

But "closest" doesn't always mean "fastest." If the local node is overloaded, you need a mechanism to failover to the next best node. This requires a smarter application-level DNS layer that can look at server health and route traffic dynamically.

## Pre-Positioning Content

The best way to serve a request quickly is to have the data ready before the user even asks for it.

Most traffic follows predictable patterns (the "thundering herd" when a new show drops). A sophisticated CDN doesn't wait for a cache miss to fetch data. It uses predictive models to push content to edge nodes during off-peak hours (like 4 AM). By the time users wake up and start streaming, the files are already sitting on a server a few miles away from them.

## Handling Network Volatility

Even with a perfect server architecture, the user's local network will fluctuate. This is where Adaptive Bitrate Streaming (ABR) comes in.

The video isn't one big file; it's chopped into small chunks, and each chunk is encoded at multiple quality levels. The client's player logic is constantly monitoring bandwidth. If the connection drops, it seamlessly switches to a lower-quality chunk for the next segment.

It's a good example of how "robustness" often means compromising on fidelity to maintain availability. I think that principle applies to a lot of distributed systems—getting *something* to the user is almost always better than failing completely while trying to be perfect.
