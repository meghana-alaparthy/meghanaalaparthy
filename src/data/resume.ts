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
                "Transformed a legacy monolithic payroll engine into 12 separate microservices using Domain-Driven Design, enabling the system to reliably handle over 2 million transactions daily.",
                "Implemented eventual consistency across payroll and benefits modules using the Saga pattern, significantly improving system reliability during high-load periods.",
                "Optimized API performance by introducing async event streaming and Redis caching, cutting critical endpoint latency from ~500ms to under 200ms.",
                "Built a circuit breaker and retry framework that prevents cascading failures during payroll processing spikes.",
                "Standardized Docker and Kubernetes workflows for our team, helping granularize deployments and reducing the lead time for fixes from hours to about 15 minutes."
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
                "Taught introductory programming courses to both CS majors and non-majors.",
                "Managed lab sessions and grading for over 100 students, helping them grasp core concepts like data structures and algorithms."
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
                "Worked with the Azure Services Platform to help manage early microservice deployments."
            ]
        }
    ],
    projects: [
        {
            name: "High-Performance Search Engine",
            period: "Jan ‘25 - March ‘25",
            description: "A custom multi-threaded search engine designed for efficiency.",
            details: "Built a full-text search backend using a custom Inverted Index and Vector Space Model (TF-IDF). I avoided off-the-shelf solutions to better understand the low-level challenges of memory management and disk I/O. By using Java NIO, I was able to achieve sub-10ms query times on a dataset of 250k+ documents without the overhead of a heavy search framework.",
            outcome: "Sub-10ms search latency across 250k+ documents.",
            techStack: ["Java", "NIO", "Algorithms"]
        },
        {
            name: "Distributed Log Aggregator",
            period: "Jan ‘25 - Present",
            description: "A centralized logging system to make debugging microservices easier.",
            details: "Debugging across multiple services was becoming a pain point, so I built a pipeline to consolidate logs. It uses Kafka to buffer incomplete logs and asynchronous C# workers to enrich them before indexing in ElasticSearch. This setup ensures that we don't lose diagnostic data even if the storage layer momentarily slows down.",
            outcome: "Handles 50k+ events/sec and simplified cross-service debugging.",
            techStack: ["Kafka", "C#", "ElasticSearch", "Redis"]
        },
        {
            name: "PII Redaction Engine",
            period: "Jan ‘25 – Apr ‘25",
            description: "Automated privacy filtering for unstructured text streams.",
            details: "We needed a way to strip sensitive user data from our analytics pipelines. I combined NLP entity recognition with a fast DFA scanner to catch patterns like addresses and social security numbers. This hybrid approach catches context-specific PII that simple regex often misses, while keeping processing overhead low enough for real-time streams.",
            outcome: "Reduced accidental data exposure in logs by roughly 40%.",
            techStack: ["Python", "NLTK", "DFA"]
        },
        {
            name: "Low-Latency Market Protocol",
            period: "Jan ‘25 – Feb ‘25",
            description: "A lightweight UDP multicast protocol for financial data.",
            details: "TCP retransmission delays were creating too much jitter for a trading simulation project. I wrote a custom UDP protocol from scratch, implementing a lightweight feedback loop for dropped packets (NACK-based). This removed head-of-line blocking and kept latency variance low for connected clients.",
            outcome: "Consistent <50µs one-way latency on local networks.",
            techStack: ["C", "UDP Multicast", "Socket Programming"]
        },
        {
            name: "Predictive Content Analytics",
            period: "Jan ‘25 - May ‘25",
            description: "Forecasting engagement based on content metadata.",
            details: "I wanted to see if we could predict how well a piece of content would perform before publishing. I built a Random Forest model that looks at historical metadata to forecast engagement. It's not perfect, but it gives our content team a statistical baseline to test their assumptions against.",
            outcome: "Achieved ~91% accuracy on historical test data.",
            techStack: ["Python", "Scikit-learn", "Data Science"]
        },
        {
            name: "Enterprise Case Management",
            period: "Jan ‘25 – June ‘25",
            description: "Secure document handling for legal datasets.",
            details: "Security was the priority here. I architected a system with column-level encryption and a strict audit log for every read activity. The goal was to ensure non-repudiation—meaning there's a cryptographic proof for every file access, which is critical for legal compliance.",
            outcome: "Passed security audits with zero critical findings.",
            techStack: ["SQL", "Security", "Encryption"]
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
        "Completed all puzzles at Harvard CS50's Puzzle Day (Group).",
        "Winner in several district and state-level Yoga championships.",
        "Hostel Representative at Shiv Nadar University (2017-2019)."
    ]
};
