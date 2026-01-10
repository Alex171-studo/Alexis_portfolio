export interface Certification {
    id: number;
    title: string;
    issuer: string;
    date: string;
    description: string;
    skills: string[];
    pdfUrl: string;
    // Enhanced fields
    verificationId?: string;
    image?: string;
    learned?: string[];
}

export const certificationsData: Certification[] = [
    {
        id: 1,
        title: "eJPTv2",
        issuer: "eLearnSecurity",
        date: "2024",
        description: "Junior Penetration Tester certification covering network and web application penetration testing.",
        skills: ["Pentesting", "Networking", "Web Security"],
        pdfUrl: "#",
        verificationId: "EL-123456789",
        image: "https://images.credly.com/images/3a950796-03f4-4a41-8669-7c4d51676d1a/eJPTv2.png", // Placeholder or generic
        learned: [
            "Methodology for black-box penetration testing",
            "Pivoting across network subnets",
            "Web application vulnerability assessment"
        ]
    },
    {
        id: 2,
        title: "CompTIA Security+",
        issuer: "CompTIA",
        date: "2023",
        description: "Foundational cybersecurity certification covering core principles for network security and risk management.",
        skills: ["Risk Management", "Cryptography", "Network Security"],
        pdfUrl: "#",
        verificationId: "COMP0010203040",
        learned: [
            "Implementation of secure network architecture",
            "Risk analysis and mitigation strategies",
            "Identity and Access Management (IAM) principles"
        ]
    },
    {
        id: 3,
        title: "Google Cybersecurity",
        issuer: "Google",
        date: "2023",
        description: "Professional certificate covering Linux, Python, SQL, and security tools.",
        skills: ["Linux", "Python", "SQL", "SIEM"],
        pdfUrl: "#",
        learned: [
            "Python automation for security tasks",
            "SQL query construction for analysis",
            "Linux system administration basics"
        ]
    }
];
