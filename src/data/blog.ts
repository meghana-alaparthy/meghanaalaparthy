export const blogPosts = [
  {
    slug: "distributed-transaction-system-paycom",
    title: "Building a Distributed Transaction System at Scale",
    date: "January 15, 2025",
    readTime: "15 min read",
    excerpt: "How I implemented the Saga pattern to manage distributed consistency across 12 microservices processing $50M in payroll daily.",
    content: `
            <h2>The Consistency Challenge</h2>
            <p>Moving from a monolith to microservices introduced the classic 'Dual Write' problem. We needed to update the 'Payroll' and 'Benefits' databases atomically.</p>
            
            <h2>Solution: The Saga Pattern</h2>
            <p>I chose an <strong>Orchestration-based Saga</strong> using an asynchronous event bus. A central 'Saga Orchestrator' service managed the state of each transaction.</p>
            
            <h3>Key Trade-offs</h3>
            <ul>
                <li><strong>Choreography vs Orchestration:</strong> Orchestration was chosen for better observability, despite the single point of failure risk (mitigated by HA deployment).</li>
                <li><strong>Consistency Model:</strong> We accepted Eventual Consistency in favor of high availability (AP over CP).</li>
            </ul>

            <h2>Impact</h2>
            <p>Zero data inconsistencies were reported in the first 6 months, and we handled a peak load of <strong>2,000 TPS</strong> during end-of-month processing.</p>
        `,
    tags: ["System Design", "Event Driven", "Microservices", "Distributed Systems"]
  },
  {
    slug: "debugging-message-queue-performance",
    title: "Debugging a Production Message Queue Performance Issue",
    date: "December 10, 2024",
    readTime: "10 min read",
    excerpt: "A deep dive into how I diagnosed and fixed a consumer lag issue that threatened our 99.99% SLA.",
    content: `
            <h2>The Symptoms</h2>
            <p>Our 'Reporting' service started lagging 2 hours behind real-time. The consumer group was rebalancing constantly.</p>

            <h2>Root Cause Analysis</h2>
            <p>Using <strong>Prometheus and Grafana</strong>, we identified that one partition was receiving 80% of the traffic due to a poor partition key strategy (TenantID).</p>

            <h2>The Fix</h2>
            <p>We implemented a <strong>Custom Partitioner</strong> based on 'EmployeeID' to ensure uniform data distribution. We also tuned the batch size and timeout configurations.</p>
            
            <h3>Results</h3>
            <p>Consumer lag dropped to near-zero, and throughput increased by <strong>300%</strong>.</p>
        `,
    tags: ["Messaging", "Performance", "Debugging", "SRE"]
  },
  {
    slug: "scaling-payroll-engine-java",
    title: "Scaling a Payroll Engine to Process 1M+ Records",
    date: "October 15, 2024",
    readTime: "8 min read",
    excerpt: "How we optimized a legacy Java-based payroll system to reduce processing time by 35% using parallel streams and batch processing.",
    content: `
            <h2>The Challenge</h2>
            <p>Our payroll system was struggling to meet SLAs as the user base grew. Processing 1 million records was taking over 6 hours, risking delayed payments.</p>
            
            <h2>Optimization Strategy</h2>
            <p>We identified bottlenecks in database I/O and sequential processing. The solution involved:</p>
            <ul>
                <li><strong>Parallel Streams:</strong> Utilizing Java's parallel stream API to process independent employee records concurrently.</li>
                <li><strong>Batch Processing:</strong> Implementing JDBC batch updates to minimize round-trips to the PostgreSQL database.</li>
                <li><strong>Memory Management:</strong> Tuning the JVM heap size and optimizing object creation to reduce garbage collection pauses.</li>
            </ul>

            <h2>Results</h2>
            <p>This re-architecture reduced the total processing time to just under 4 hours, a <strong>35% improvement</strong> in performance.</p>
        `,
    tags: ["Java", "System Design", "Performance", "Best for Interview Prep"]
  },
  {
    slug: "designing-netflix-cdn",
    title: "System Design: Designing Netflix's CDN (Open Connect)",
    date: "November 05, 2024",
    readTime: "20 min read",
    excerpt: "A theoretical deep dive into designing a global content delivery network handling exabytes of data.",
    content: `
            <h2>Requirements</h2>
            <ul>
                <li><strong>Scale:</strong> 200M+ concurrent streams.</li>
                <li><strong>Latency:</strong> < 50ms start time.</li>
                <li><strong>Fault Tolerance:</strong> Region failure must not stop playback.</li>
            </ul>

            <h2>Proposed Architecture</h2>
            <p>I would leverage a hierarchy of <strong>Open Connect Appliances (OCAs)</strong> embedded directly in ISP networks.</p>
            
            <h3>Traffic Steering</h3>
            <p>Using a custom DNS steering service to direct clients to the nearest healthy OCA based on BGP routing tables and real-time health checks.</p>
        `,
    tags: ["System Design", "Architecture", "CDN", "Interview Prep"]
  }
];
