import type { ProjectType } from "../components/ui/ProjectCard";

export const projectsData: ProjectType[] = [
    {
        id: "1",
        title: "Advanced Port Scanner",
        description: "Multi-threaded port scanner in Python with service detection.",
        longDescription: "A high-performance port scanner designed for rapid network reconnaissance.", // Added missing field
        tags: ["Python", "Network", "Pentest"],
        image: "https://images.unsplash.com/photo-1558494949-efc5e60dc62f?q=80&w=2070&auto=format&fit=crop",
        githubUrl: "#",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        details: {
            context: "Project for network security module. The goal was to build a tool capable of quickly enumerating open ports in a highly restricted network environment.",
            challenges: "Speed optimization and IDS evasion. The scanner needed to effectively balance scan speed with stealth techniques to avoid triggering IDS alerts.",
            solution: "Implemented thread pool and delay randomization. Used raw sockets for custom packet construction.",
            architecture: "Python Multithreading + Scapy Framework",
            results: "Scanned 1000 ports in under 15 seconds with 99% accuracy while bypassing basic Snort rules.",
            difficulties: "Managing thread synchronization and handling packet loss on unreliable networks.",
            future: "Implement standard Nmap-style OS fingerprinting and a GUI."
        }
    },
    {
        id: "2",
        title: "Log Analyzer SIEM",
        description: "Log analysis tool for detecting attack patterns via Regex.",
        longDescription: "Automated threat detection system processing server logs in real-time.",
        tags: ["Rust", "SecOps", "Regex", "Data"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        githubUrl: "#",
        details: {
            context: "Need for fast parsing of large logs.",
            challenges: "Performant regex matching on GBs of data.",
            solution: "Used Rust's regex engine."
        }
    },
    {
        id: "3",
        title: "C2 Implant Mock",
        description: "Basic C2 implant simulation with encrypted comms.",
        longDescription: "Simulation of post-exploitation command and control infrastructure.",
        tags: ["C++", "Red Team", "Windows"],
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1974&auto=format&fit=crop",
        githubUrl: "#",
        details: {
            context: "Understanding malware behavior.",
            challenges: "Basic evasion and persistence.",
            solution: "DLL Injection and Registry keys."
        }
    },
    {
        id: "4",
        title: "Web Vulnerability Scanner",
        description: "Automated scanner for XSS and SQLi vulnerabilities.",
        longDescription: "Tool for automating OWASP Top 10 vulnerability checks.",
        tags: ["Python", "Web", "OWASP", "Cybersécurité"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
        githubUrl: "#",
        details: {
            context: "Automating web audits.",
            challenges: "False positive reduction.",
            solution: "Heuristic analysis of responses."
        }
    }
];
