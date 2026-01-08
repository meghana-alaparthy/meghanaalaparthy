export const resumeData = {
    personalInfo: {
        name: "Meghana Alaparthy",
        email: "meghanaalaparthy1@gmail.com",
        phone: "+1 484 597 6349",
        location: "Dallas, TX",
        linkedin: "https://www.linkedin.com/in/meghanaalaparthy/",
        github: "https://github.com/meghana-alaparthy",
        role: "Software Developer (SDE III)"
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
            period: "Sept ‘24 - Dec ‘24",
            description: "Architected a full-text search engine utilizing a multi-threaded indexing pipeline to handle large-scale document retrieval.",
            problem: "Indexing millions of semi-structured documents requires an efficient memory footprint and optimized ranking algorithms to avoid linear search performance degradation.",
            approach: "Implemented a distributed-ready Inverted Index and the Vector Space Model (TF-IDF), leveraging Java NIO for non-blocking IO and custom data structures to minimize garbage collection overhead.",
            outcome: "Achieved sub-10ms search latency across 250k+ documents with high precision ranking and sub-second full-reindexing capability.",
            techStack: ["Java", "NIO", "Algorithms", "Linear Algebra"]
        },
        {
            name: "Distributed Log Aggregator",
            period: "June ‘24 - Present",
            description: "Designed a centralized observability platform to aggregate and process real-time telemetry from heterogeneous microservice environments.",
            problem: "Distributed debugging in multi-cloud environments is slowed by log fragmentation and lack of real-time searchability during critical production incidents.",
            approach: "Built a high-throughput pipeline utilizing Kafka as a message broker, C# workers for stream processing, and ElasticSearch for indexed, persistent storage.",
            outcome: "Scaled ingestion to handle 50,000+ events per second, reducing MTTR (Mean Time to Resolution) from hours to minutes for the engineering org.",
            techStack: ["Kafka", "C#", "ElasticSearch", "Redis", "Distributed Systems"]
        },
        {
            name: "PII Redaction Engine",
            period: "Feb’23 – Apr’23",
            description: "Developed an automated PII (Personally Identifiable Information) sanitization pipeline to enforce global data privacy compliance (GDRP/CCPA).",
            problem: "Traditional pattern matching fails to capture contextual sensitive data, leading to high false-negative rates and potential data leaks.",
            approach: "Integrated advanced NLP (Natural Language Processing) models with a high-speed Deterministic Finite Automaton (DFA) scanner to identify and redact sensitive entities in real-time streams.",
            outcome: "Reduced sensitive data exposure by 40% while maintaining sub-20ms processing latency per request.",
            techStack: ["Python", "NLTK", "Regex Optimization", "Stream Processing"]
        },
        {
            name: "Low-Latency Market Protocol",
            period: "Oct’22 – Nov’22",
            description: "Engineered a high-frequency multicast protocol for real-time financial data dissemination.",
            problem: "Standard TCP performance is insufficient for HFT (High-Frequency Trading) due to retransmission overhead and head-of-line blocking.",
            approach: "Authored a custom UDP-based protocol with a lightweight reliability layer, optimizing for jitter reduction and maximum packet throughput.",
            outcome: "Minimized one-way latency to <50 microseconds per hop, enabling near-instantaneous data synchronization across 100+ concurrent clients.",
            techStack: ["C", "UDP Multicast", "Socket Programming", "Network Systems"]
        },
        {
            name: "Predictive Content Analytics",
            period: "Jan ‘21 - May ‘21",
            description: "Built a machine learning inference engine to predict virality and engagement metrics for digital content.",
            problem: "Static content analysis lacks the predictive power needed for dynamic content recommendation and trend forecasting.",
            approach: "Developed a Random Forest regression model trained on over 100k data points, incorporating feature engineering for audio-visual engagement indicators.",
            outcome: "Achieved 91% prediction accuracy, providing actionable insights into content production strategies for streaming platforms.",
            techStack: ["Python", "Scikit-learn", "MLOps", "Feature Engineering"]
        },
        {
            name: "Enterprise Case Management",
            period: "July’20 – Dec’20",
            description: "Architected a secure, RBAC-driven document management system for sensitive legal data.",
            problem: "Legal document platforms require granular access control and end-to-end encryption to protect attorney-client privilege and meet stringent audit requirements.",
            approach: "Implemented a zero-trust security model with column-level encryption, dynamic access policies, and a comprehensive audit logging system.",
            outcome: "Successfully secured 10,000+ privileged files, passing all third-party security audits with zero findings.",
            techStack: ["SQL", "RBAC", "Encryption", "Security Architecture"]
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
