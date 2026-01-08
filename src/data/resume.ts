export const resumeData = {
    personalInfo: {
        name: "Meghana Alaparthy",
        email: "meghanaalaparthy1@gmail.com",
        phone: "+1 484 597 6349",
        location: "Dallas, TX",
        linkedin: "https://www.linkedin.com/in/meghanaalaparthy/",
        github: "https://github.com/meghana-alaparthy",
        role: "Software Developer III (SDE III / IV)"
    },
    summary: "As a Software Developer III at Paycom, I architect and scale distributed backend systems that manage mission-critical payroll and HR operations for millions of users. My expertise lies in high-performance microservices, event-driven architectures with Kafka, and building resilient, self-healing platforms. I focus on technical leadership, system observability, and driving architectural decisions that balance speed with long-term reliability.",
    skills: {
        languages: ["C#", "Python", "Java", "JavaScript", "TypeScript", "SQL", "PHP"],
        frameworks: ["React", "HTML/CSS", "RESTful APIs", "Spring Boot"],
        cloudAndDevOps: ["Azure", "AWS", "Docker", "Kubernetes", "CI/CD Pipelines"],
        dataAndML: ["Kafka", "Redis", "Machine Learning", "Data Structures"],
        other: ["Distributed Systems", "Microservices Architecture", "Performance Tuning"]
    },
    experience: [
        {
            company: "Paycom",
            location: "Dallas, TX",
            roles: [
                {
                    title: "Software Developer III",
                    period: "Jan ‘25 – Present"
                },
                {
                    title: "Software Developer II",
                    period: "Jan ‘24 – Dec ‘24"
                },
                {
                    title: "Software Developer Intern",
                    period: "May ‘23 – Aug ‘23"
                }
            ],
            highlights: [
                "Spearheaded the architectural migration of our legacy monolithic payroll engine into a suite of 12 decoupled microservices, implementing Domain-Driven Design (DDD) to achieve a throughput of 2M+ transactions daily.",
                "Orchestrated distributed transaction management using the Saga pattern, ensuring eventual consistency across payroll and benefits modules while maintaining a 99.99% system availability.",
                "Engineered cross-system performance optimizations, reducing critical API latency by 60% (500ms to 200ms) through the implementation of async event-streaming and high-availability Redis caching layers.",
                "Designed and implemented a modular resilience framework utilizing advanced circuit breakers and intelligent retry policies, effectively eliminating cascading failures during high-traffic payroll cycles.",
                "Standardized our containerization strategy using Docker/Kubernetes and architected an automated CI/CD pipeline that streamlined deployments, reducing lead time from hours to 15 minutes."
            ]
        },
        {
            company: "The University of Oklahoma",
            location: "Norman, OK",
            roles: [
                {
                    title: "Graduate Teaching Assistant",
                    period: "Aug’22 – May’23 and Aug’23 – Dec ‘23"
                }
            ],
            highlights: [
                "Assisted in teaching undergraduate courses: “Introduction to Programming for Non-Programmers” and “Introduction to Programming for Programmers.”",
                "Conducted lab sessions, graded assignments, and provided one-on-one support to over 100 students each semester."
            ]
        },
        {
            company: "Intellect Design Arena Ltd.",
            location: "Hyderabad, India",
            roles: [
                {
                    title: "Fabric Platform Intern",
                    period: "May’19 – July’19"
                }
            ],
            highlights: [
                "Worked on Service Fabric using Azure Services Platform to manage microservice applications."
            ]
        }
    ],
    projects: [
        {
            name: "High-Performance Search Engine",
            period: "Jan ‘25 - March ‘25",
            description: "Architected a full-text search engine utilizing a multi-threaded indexing pipeline to handle large-scale document retrieval with sub-millisecond precision.",
            problem: "Scaling full-text search requires moving beyond naive string matching. The challenge was maintaining a low memory profile while handling an ever-growing corpus of semi-structured data without hitting O(n) performance cliffs.",
            approach: "Engineered a custom Inverted Index and optimized Vector Space Model (TF-IDF). I leveraged Java NIO for high-throughput, non-blocking disk access and specialized hash maps to reduce garbage collection pressure—a decision driven by the need for deterministic latency in search-critical applications.",
            outcome: "Achieved sub-10ms search latency across 250k+ documents, demonstrating a deep mastery of data structures and memory-efficient algorithm design.",
            techStack: ["Java", "NIO", "Information Retrieval", "Algorithm Design"]
        },
        {
            name: "Distributed Log Aggregator",
            period: "Jan ‘25 - Present",
            description: "Designed an enterprise-grade observability platform to unify telemetry across heterogeneous microservice environments, focusing on real-time incident diagnostics.",
            problem: "In a world of ephemeral microservices, fragmented logging is the primary bottleneck for reliability. I initiated this project to eliminate the 'blind spots' during production outages where logs are scattered across dozens of nodes.",
            approach: "Built a resilient ingestion pipeline using Kafka as a high-durability message backbone. I architected asynchronous C# workers to perform real-time stream enrichment before persistent storage in ElasticSearch, balancing write-heavy throughput with read-heavy search requirements.",
            outcome: "Capable of processing 50,000+ events per second, effectively reducing Mean Time to Resolution (MTTR) by providing a single, searchable source of truth for the entire engineering organization.",
            techStack: ["Kafka", "C#", "ElasticSearch", "Redis", "Distributed Systems"]
        },
        {
            name: "PII Redaction Engine",
            period: "Jan ‘25 – Apr ‘25",
            description: "Developed an automated PII (Personally Identifiable Information) sanitization pipeline to enforce global data privacy compliance and prevent high-stakes data leaks.",
            problem: "Standard regex-based redaction is a fragile 'check-box' solution that misses contextual leaks. I wanted to build a system that *understands* data, reducing the liability of accidental exposure in unstructured feedback streams.",
            approach: "Fused NLP-based entity recognition with a high-performance Deterministic Finite Automaton (DFA) scanner. This hybrid approach allowed for the capture of complex PII (like addresses or custom IDs) while maintaining the sub-20ms latency required for real-time traffic interception.",
            outcome: "Successfully reduced sensitive data exposure by 40%, proving that security and performance can coexist through smart architectural choices.",
            techStack: ["Python", "NLTK", "DFA Optimization", "Security Engineering"]
        },
        {
            name: "Low-Latency Market Protocol",
            period: "Jan ‘25 – Feb ‘25",
            description: "Engineered a specialized multicast protocol for real-time financial data dissemination, optimizing for the ultra-low latency requirements of high-frequency systems.",
            problem: "Generic protocols like TCP introduce retransmission delays (jitter) that are unacceptable in high-stakes trading. The goal was to eliminate 'Head-of-Line' blocking and minimize the jitter variance that plagues financial networks.",
            approach: "Designed a custom UDP-based protocol with a lightweight, NACK-based reliability layer. I optimized for zero-copy memory transfers and prioritized packet throughput to ensure that all 100+ concurrent clients receive price-sensitive data within microseconds of each other.",
            outcome: "Reduced one-way latency to <50 microseconds per hop, achieving a performance tier normally reserved for specialized hardware-software co-design.",
            techStack: ["C", "UDP Multicast", "Socket Programming", "Financial Systems"]
        },
        {
            name: "Predictive Content Analytics",
            period: "Jan ‘25 - May ‘25",
            description: "Built a predictive inference engine to forecast content engagement metrics, transforming raw data into directional business intelligence.",
            problem: "Content strategy is often driven by intuition. I saw an opportunity to replace 'gut feeling' with 'data-backed' forecasts to optimize production spend and maximize audience engagement.",
            approach: "Developed a robust Random Forest regression model with a custom feature engineering pipeline. I focused on extracting non-linear correlations between audio-visual metadata and historical virality patterns, ensuring the model's high generalizability across diverse media types.",
            outcome: "Achieved 91% prediction accuracy, providing a strategic tool that allowed content producers to iterate on scripts and visual style with statistical confidence.",
            techStack: ["Python", "Scikit-learn", "Statistical Modeling", "Feature Engineering"]
        },
        {
            name: "Enterprise Case Management",
            period: "Jan ‘25 – June ‘25",
            description: "Architected a zero-trust document security platform for high-sensitivity legal data, focusing on granular privacy and forensic auditability.",
            problem: "Legal environments demand more than just 'access control'; they require mathematical proof of data integrity and air-tight privacy for attorney-client privileged communications.",
            approach: "Implemented a multi-tenant architecture with column-level encryption (AES-256) and a dynamic Policy Enforcement Point (PEP). I built a non-repudiable audit log to track every access attempt, ensuring a complete forensic trail for every sensitive file.",
            outcome: "Secured 10,000+ files and passed rigorous third-party security audits with zero findings, demonstrating a 'security-first' mindset in enterprise software design.",
            techStack: ["SQL", "RBAC", "Zero Trust Architecture", "Security Auditing"]
        }
    ],
    education: [
        {
            institution: "The University of Oklahoma (OU)",
            degree: "Masters of Science in Computer Science",
            location: "Norman, Oklahoma",
            date: "Dec ‘23",
            gpa: "4.0"
        },
        {
            institution: "Shiv Nadar University (SNU)",
            degree: "Bachelor of Technology in Computer Science Engineering",
            location: "Noida, India",
            date: "July’21",
            gpa: ""
        }
    ],
    achievements: [
        "Logical and analytical Thinking: Completed all the puzzles at puzzle day by Harvard CS50 in a group.",
        "Yoga: Women National Yogasanas Championship, Winner in several district and state yoga competitions.",
        "Leadership: Hostel Representative, Shiv Nadar University. (2017-2019)"
    ]
};
