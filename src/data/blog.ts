export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Scaling Event-Driven Microservices: Lessons from Production",
    excerpt: "A deep dive into handling high-throughput streams using Apache Kafka, Redis consumer groups, and idempotent processing strategies.",
    date: "2025-11-15",
    readTime: "8 min read",
    slug: "scaling-event-driven-microservices",
    tags: ["System Design", "Kafka", "Microservices", "Redis"],
    content: `
## The Challenge: 10k Events Per Second

In a recent project, we faced a scalability bottleneck. Our monolithic queue consumer couldn't keep up with the burst traffic during peak hours (generating ~10k events/sec). The lag caused data inconsistency and user facing delays.

## The Solution Architecture

We decoupled the ingestion logic from processing using **Apache Kafka** for durable buffering and moved to a microservices architecture.

### 1. Partition Strategy
We utilized semantic partitioning (sharding by \`userId\`) to ensure that all events for a specific user were processed in order, while still allowing us to parallelize processing across 50+ partitions.

### 2. Consumer Groups & Auto-Scaling
We deployed consumers in Kubernetes with HPA (Horizontal Pod Autoscaling) based on consumer lag. When lag increased, K8s spun up more pods, and Kafka rebalanced the partitions automatically.

## Handling Failures: Dead Letter Queues (DLQ)

Processing isn't always smooth. We implemented a **Retry-DLQ** pattern:
1.  **Main Topic**: Fast path.
2.  **Retry Topic**: Delayed consumption (exponential backoff).
3.  **DLQ**: Final resting place for poison messages after 3 retries.

## Idempotency is Key
With "at-least-once" delivery, duplicate events are inevitable. We used **Redis** to store a \`processed_event_id:timestamp\` key with a TTL. Before processing any event, we checked this set to ensure exactly-once processing characteristics.

\`\`\`typescript
async function processEvent(event: Event) {
  const isProcessed = await redis.set(
    \`processed:\${event.id}\`, 
    '1', 
    'NX', 
    'EX', 
    86400
  );
  
  if (!isProcessed) return; // Idempotent skip
  
  await executeBusinessLogic(event);
}
\`\`\`

## Results
- **Throughput**: Increased by 400%.
- **Latency**: p99 reduced from 2s to 150ms.
- **Reliability**: 99.99% uptime during peak loads.
        `
  },
  {
    title: "Virtualization & Memoization: Optimizing React for Speed",
    excerpt: "Rendering 10,000+ rows shouldn't freeze your browser. Techniques to maintain 60FPS in data-heavy enterprise dashboards.",
    date: "2025-04-22",
    readTime: "6 min read",
    slug: "optimizing-react-performance",
    tags: ["React", "Performance", "Frontend", "JavaScript"],
    content: `
## The DOM is the Bottleneck

In complex enterprise dashboards, the most common performance killer isn't JavaScript execution—it's layout thrashing and excessive DOM nodes. A recent feature required displaying a table with 10,000+ verified transaction records. Rendering this natively caused the main thread to freeze for 3+ seconds.

## Windowing (Virtualization)

Instead of rendering all 10k rows, we only render what's visible in the viewport (plus a small buffer). I used \`react-window\` to implement this.

**Key Wins:**
- **DOM Nodes**: Reduced from ~50,000 to ~200.
- **Memory Usage**: Dropped by 80%.

## Memoization Strategy

Virtualization is useless if every scroll event triggers a re-render of unrelated components.

### 1. React.memo
We wrapped row components in \`React.memo\`. A custom comparator function ensured rows only re-rendered if their specific data changed, ignoring parent state updates.

### 2. Stable Callbacks
Passing anonymous functions to child components breaks strict equality checks.
\`\`\`tsx
// Bad ❌
<Row onClick={() => handleClick(id)} />

// Good ✅
const handleRowClick = useCallback((id: string) => {
  // logic
}, []);
\`\`\`

## Optimizing Context Providers
We frequently see "Context Hell" causing app-wide re-renders. We split our large \`state\` context into separate providers:
- \`DataDispatcherContext\` (stable dispatch functions)
- \`DataStateContext\` (value that changes)

This prevented components that only *trigger* updates from re-rendering when the *data* changes.

## Outcome
The dashboard now loads instantly, scrolls at a buttery smooth 60fps, and can handle datasets up to 100k rows without degradation.
        `
  },
  {
    title: "Database Sharding: A System Design Deep Dive",
    excerpt: "Horizontal scaling strategies for relational databases. How we utilized consistent hashing to distribute 50TB of data.",
    date: "2024-10-10",
    readTime: "10 min read",
    slug: "database-sharding-strategies",
    tags: ["System Design", "Database", "Backend", "Scalability"],
    content: `
## When Vertical Scaling Hits a Wall

At a certain scale (usually terabytes of data or thousands of write ops/sec), getting a bigger database server isn't cost-effective or possible. This is where **Sharding** (Horizontal Partitioning) comes in.

## Sharding Strategies

### 1. Key-Based Sharding (Hash)
We used a hash function on the primary key (\`user_id\`) to determine the shard.
\`shard_id = hash(user_id) % total_shards\`

*   **Pro**: Even distribution of data.
*   **Con**: Resharding (adding new nodes) is expensive because keys move around.

### consistent Hashing
To solve the resharding problem, we implemented **Consistent Hashing** using a virtual ring topology. This minimized data movement to only $1/n$ (where n is the number of nodes) when a node is added/removed.

## The Routing Layer

We implemented a lightweight application-side routing layer (Smart Proxy) that intercepted SQL queries.
1.  Parser extracts the \`sharding_key\`.
2.  Lookup map finds the active physical connection string.
3.  Query is forwarded to the correct DB instance.

## Handling Cross-Shard Joins
The biggest trade-off with sharding is losing ACID transactions across shards. We handled this by:
1.  **Data Denormalization**: Duplicating essential join data (like user profiles) into the shard where it's needed.
2.  **Application-Level Joins**: Fetching data from Shard A and Shard B in parallel, then stitching it together in the API service.

## Conclusion
Sharding introduced complexity, but it allowed us to scale our write throughput linearly. By combining it with read-replicas for eventual consistency, we achieved a highly available and partition-tolerant system.
        `
  }
];
