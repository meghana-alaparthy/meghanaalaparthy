---
title: Designing a Netflix-Scale CDN
date: January 05, 2025
readTime: 16 min read
excerpt: An architectural exploration of how to build a global Content Delivery Network (CDN) capable of handling 200M+ concurrent viewers with sub-second start times.
tags: ["System Design", "Cloud Architecture", "CDN", "Edge Computing"]
---

## The Challenge of Global Scale

How do you deliver 4K video to 200 million people across 190 countries without the dreaded "buffering" wheel? This isn't just a software problem—it's a physics problem. 

The speed of light is a constant (~300,000 km/s). If a user in Sydney tries to stream a movie from a server in New York, the minimum round-trip time (RTT) is roughly 160ms. Add in network congestion, router hops, and TCP handshakes, and you've easily surpassed the "instant-on" threshold of 250ms.

## The Rationale: Moving to the Edge

To solve this, we cannot rely on a centralized data center. We must move the bits closer to the eyeballs. This is the core philosophy of a Content Delivery Network (CDN).

## 1. The Multi-Tier Architecture

A Netflix-scale CDN isn't one flat network. It's a tiered hierarchy designed for both storage efficiency and delivery speed.

### Tier 1: The Origin (The Source of Truth)
Located in AWS, the origin stores the master 4K files and all their thousands of encoded variants (bitrates, resolutions, subtitles). It is the definitive source but is never accessed by users directly.

### Tier 2: The Regional Cache
 Strategically placed in major internet hubs (like Frankfurt, Singapore, or Ashburn). These caches store "popular" content—the top 10% of movies that account for 80% of traffic.

### Tier 3: The Edge (Open Connect)
This is where the magic happens. Netflix places their own custom-built servers (Open Connect Appliances) directly inside the buildings of Internet Service Providers (ISPs) like Comcast or Verizon. 

**Architectural Insight**: By putting the box *inside* the ISP's network, the traffic never even hits the "public internet." It travels from the local ISP switch directly to the user's home.

## 2. Request Routing: The Global Traffic Manager

When you hit "Play," how does the system know which of the thousands of edge boxes to send you to?

I designed a **Geo-Proximity Routing** system that uses three data points:
1. **BGP Anycast IP**: The same IP address is advertised from multiple locations. The internet's own routing protocols find the "shortest" path.
2. **Latent-Heat Mapping**: We use real-time telemetry from users to see which servers are actually fast *right now*, regardless of geographic distance.
3. **Load Balancing**: If the Sydney server is at 90% capacity, we gracefully overflow traffic to Melbourne.

## 3. Predicted Pre-Positioning: Anticipating the Future

A CDN is only useful if it has the content you want *before* you ask for it. Every night, during low-traffic periods (3 AM to 5 AM local time), we perform "Fill Traffic."

We use machine learning models to predict what will be popular tomorrow. If a new season of *Stranger Things* drops tomorrow, the CDN proactively pushes that content to the edge boxes worldwide *tonight*. 


## 4. Adaptive Bitrate Streaming (ABR)

Network conditions are volatile. A user might start on 5G and move into a basement with 3G. To handle this, we use **Dynamic Switching**.

The video is sliced into 4-second "chunks." Each chunk is encoded in 15 different quality levels. Every 4 seconds, the client player measures the available bandwidth and "requests" the best possible version for the next 4 seconds.

## The Outcome: Scaling the Impossible

Building a global CDN results in:
- **99.9% Cache Hit Ratio**: Meaning almost every request is served from the edge, not the origin.
- **Sub-500ms Playback Start Time**: Across the globe, regardless of local infrastructure.
- **Strategic Resilience**: If an entire ISP goes down, the routing system automatically shifts millions of users to the next closest peer with zero interruption.

## Lessons for System Architects

1. **Hardware matters.** At this scale, standard servers aren't enough. Custom-designed ASICs and zero-copy NICs are often required.
2. **State is the enemy of scale.** Keep your edge servers as stateless as possible.
3. **The internet is broken.** External factors (BGP hijacks, undersea cable cuts) are common. Your architecture must be "Anti-fragile"—improving when stressed.

Designing for the world isn't about building one big thing; it's about building thousands of small things that work together in perfect, distributed harmony.
