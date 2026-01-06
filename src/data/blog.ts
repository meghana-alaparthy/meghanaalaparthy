export const blogPosts = [
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
    slug: "monolith-to-microservices-migration",
    title: "Decomposing a Monolith: A Domain-Driven Approach",
    date: "September 02, 2024",
    readTime: "12 min read",
    excerpt: "Lessons learned from breaking down a PHP monolithic application into scalable Java & Python microservices.",
    content: `
            <h2>Why Microservices?</h2>
            <p>Our legacy PHP monolith was becoming a nightmare to maintain. Deployments were risky, and scaling specific modules (like the tax calculation engine) was impossible without scaling the entire app.</p>

            <h2>The Strangler Fig Pattern</h2>
            <p>We adopted the Strangler Fig pattern to gradually migrate functionality. We started by identifying bounded contexts:</p>
            <ul>
                <li><strong>User Service:</strong> Handled authentication and profiles (Migrated to Java/Spring Boot).</li>
                <li><strong>Reporting Service:</strong> Handled heavy data aggregation (Migrated to Python).</li>
            </ul>

            <h2>Key Takeaways</h2>
            <p>Migrating to microservices introduced distributed complexity but significantly improved our <strong>deployment frequency</strong> and allowed independent scaling of critical components.</p>
        `,
    tags: ["Microservices", "Architecture", "PHP", "Migration", "Best for Interview Prep"]
  },
  {
    slug: "optimizing-database-throughput",
    title: "High-Throughput Database Strategies for Financial Systems",
    date: "August 20, 2024",
    readTime: "10 min read",
    excerpt: "Techniques for handling high-volume write operations in a financial ledger using Partitioning and Redis caching.",
    content: `
            <h2>The Bottleneck</h2>
            <p>Financial systems require strict ACID compliance, which often becomes a bottleneck for write-heavy workloads.</p>

            <h2>Partitioning Strategy</h2>
            <p>We implemented <strong>Horizontal Partitioning (Sharding)</strong> based on Tenant ID. this ensured that high-volume clients were isolated to specific database shards, preventing resource contention.</p>

            <h2>Caching Layer</h2>
            <p>A <strong>Redis Write-Through Cache</strong> was introduced for frequently accessed ledger balances. This reduced read load on the primary DB by 60%.</p>

            <h3>Outcome</h3>
            <p>The system can now handle <strong>50,000 transactions per second (TPS)</strong> with sub-millisecond latency.</p>
        `,
    tags: ["Database", "SQL", "Redis", "Scalability", "Best for Interview Prep"]
  }
];
