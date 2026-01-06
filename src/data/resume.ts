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
    summary: "Software Developer (SDE III) with hands-on experience designing and shipping scalable web applications, microservices, and CI/CD automation. Strong background in backend development, DevOps practices, and data-driven problem solving. Proven ability to lead feature delivery, improve system reliability, and mentor peers. Seeking roles in high-scale engineering teams (platform, backend, or infra).",
    skills: {
        languages: ["C", "Python", "Java (core & advanced)", "C#", "JavaScript", "TypeScript", "PHP"],
        frameworks: ["React", "HTML/CSS", "RESTful APIs"],
        cloudAndDevOps: ["CI/CD", "Docker", "Kubernetes concepts", "Azure", "AWS Services"],
        dataAndML: ["Data Structures", "Databases", "Machine Learning", "NLTK"],
        other: ["Cybersecurity fundamentals", "Software Engineering best practices"]
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
                "Designed and implemented modular microservices for employee management (onboarding, role management, reporting), improving maintainability and enabling faster feature rollout.",
                "Engineered and delivered scalable HR and Payroll service modules using C#, React, and SQL, optimizing backend architecture and external integrations to support seamless data flow across Paycom’s enterprise ecosystem.",
                "Streamlined deployment workflows by enhancing CI/CD automation, Dockerized microservices, and partnering with QA and Application Support to ensure 99% production stability across releases.",
                "Collaborated cross-functionally with product managers, client teams, and internal stakeholders to clarify specs, implement client-specific enhancements, and deliver high-quality software aligned with HCM industry standards.",
                "Developed and refined RESTful backend services, improved API reliability and performance, and collaborated cross-functionally to ship features end-to-end.",
                "Built a full‑stack employee directory web app during internship that included hierarchical org-chart visualizations and streamlined UI workflows."
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
            name: "Redactor for Text Data",
            period: "Feb’23 – Apr’23",
            description: "Developed a redactor using NLTK in python that accepts plain text documents, detects sensitive items (names, genders, contact numbers) and redacts them.",
            problem: "Need to automatically protect sensitive PII in large text datasets.",
            approach: "Built a Python-based processing pipeline utilizing NLTK for entity recognition.",
            outcome: "Successfully detected and redacted names, genders, and contact info with high accuracy.",
            techStack: ["Python", "NLTK", "NLP"]
        },
        {
            name: "Multicast Broadcast using UDP",
            period: "Oct’22 – Nov’22",
            description: "Developed a networking application by implementing a multicast server and a client in C language to demonstrate reliable multicasting.",
            problem: "Demonstrate efficient one-to-many communication without TCP overhead.",
            approach: "Implemented raw socket programming in C using UDP multicast groups.",
            outcome: "Functional multicast server-client architecture with minimal latency.",
            techStack: ["C", "UDP", "Socket Programming", "Networking"]
        },
        {
            name: "Predicting Song Popularity (ML)",
            period: "Jan ‘21 - May ‘21",
            description: "Developed a Machine Learning model to predict Spotify song popularity based on artist metrics and audio features.",
            problem: "Identify key factors driving song success on streaming platforms.",
            approach: "Trained a classification model using Spotify's API data features.",
            outcome: "Achieved 91% accuracy; identified artist follower count as the primary predictor.",
            techStack: ["Python", "Scikit-learn", "Pandas", "Spotify API"]
        },
        {
            name: "Online Law System",
            period: "July’20 – Dec’20",
            description: "Web-based application for legal case reporting and lawyer search.",
            problem: "Simplify the process of finding legal representation and filing cases online.",
            approach: "Developed a full-stack web application with user authentication and search capabilities.",
            outcome: "Streamlined the connection between citizens and legal professionals.",
            techStack: ["Web Development", "Database", "SQL"]
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
