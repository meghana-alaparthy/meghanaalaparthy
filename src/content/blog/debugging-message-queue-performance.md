---
date: January 18, 2025
readTime: 10 min read
excerpt: A look at why horizontal scaling fails when you have a database bottleneck.
tags: ["Performance", "Debugging", "Scalability"]
---

We had a 30% jump in latency in our event pipeline, and the immediate reaction was typical: "The queue is lagging, so add more consumers."

We added more consumer instances. The lag didn't drop. In fact, it slightly increased.

## The Rabbit Hole

I dug into the consumer code. We use C#, and I attached a profiler to a production node (during a lull, don't worry). I expected to see high CPU usage from JSON parsing or business logic.

Instead, I saw a whole lot of waiting.

Our consumers were spending the vast majority of their lifespan waiting on database locks. We were processing events that mutated user balances. The code was doing a classic `SELECT ... FOR UPDATE`, making a change, and then committing.

When we added more consumers, we didn't add more throughput. We just added more contenders for the same database rows. We had turned our sophisticated distributed queue into a very expensive, distributed text file line-waiter.

## The Fix: Stop Fighting the Database

We needed to reduce the number of times we hit the database.

### Batching

The first step was obvious: stop writing every single event immediately. I rewrote the consumer hook to buffer messages internally—flushing to the database either when we hit 500 messages or every 500ms, whichever came first.

Replacing 500 individual `UPDATE` statements with a single generic `INSERT ... ON CONFLICT` bulk operation was a massive win. The database overhead dropped significantly.

### Partitioning Strategy

But we still had locking issues if two different consumers picked up events for the same user account.

We re-configured our Kafka partition keys. By using the `AccountID` as the partition key, we guaranteed that all events for a specific user would land on the same partition, and therefore be processed by the same consumer instance.

This effectively removed the need for aggressive row locking, because we knew strictly that only one thread would be touching a given user's balance at a time.

## Results

Lag dropped to near zero. We actually ended up scaling *down* our consumer fleet because the throughput per instance improved so much.

It was a good reminder that often, when a queue backs up, the queue isn't the problem. The queue is just the place where the problem piles up.
