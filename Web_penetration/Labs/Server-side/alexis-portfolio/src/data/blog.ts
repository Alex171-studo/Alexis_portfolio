export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string; // Markdown content
    date: string;
    readTime: string;
    tags: string[];
    image: string;
    category: "Cybersecurity" | "CTF" | "Tutorial" | "News";
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Understanding Buffer Overflows",
        excerpt: "A deep dive into stack-based buffer overflows and how to exploit them.",
        content: `
# Buffer Overflows 101

Memory management is critical. When a program writes more data to a buffer than it can hold, the data overflows to adjacent memory locations.

## The Stack
The stack grows downwards. By overflowing a local buffer, we can overwrite the Return Address (EIP/RIP) to control the execution flow.

### Mitigation
- ASLR
- DEP/NX
- Stack Canaries
        `,
        date: "2025-05-15",
        readTime: "8 min",
        tags: ["Exploit", "Binary", "Low-Level"],
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
        category: "Tutorial"
    },
    {
        id: "2",
        title: "Root Me: CTF Walkthrough",
        excerpt: "Step-by-step solution for the 'Root Me' box on TryHackMe.",
        content: `
# Root Me Writeup

**Difficulty**: Easy

## Enumeration
Started with Nmap:
\`\`\`bash
nmap -sC -sV <IP>
\`\`\`
Found port 80 (HTTP) and 22 (SSH).

## Web Exploitation
Found a hidden directory \`/panel/\` using Gobuster. Uploaded a PHP reverse shell.

## Privilege Escalation
SUID binary \`/usr/bin/python\` found.
Exploit:
\`\`\`bash
/usr/bin/python -c 'import os; os.execl("/bin/sh", "sh", "-p")'
\`\`\`
        `,
        date: "2025-06-02",
        readTime: "12 min",
        tags: ["CTF", "Writeup", "Web"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
        category: "CTF"
    },
    {
        id: "3",
        title: "Zero Trust Architecture",
        excerpt: "Why 'verify, then trust' is the new standard in network security.",
        content: `
# Zero Trust

"Never trust, always verify."

Traditional perimeter defenses are no longer enough. Zero Trust implies that no device or user is trusted by default, even if they are inside the network perimeter.
        `,
        date: "2025-04-20",
        readTime: "5 min",
        tags: ["Architecture", "Network", "Theory"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        category: "Cybersecurity"
    }
];
