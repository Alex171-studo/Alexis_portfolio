import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Terminal as TerminalIcon, Shield, Code, Cpu } from "lucide-react";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Button } from "../components/ui/Button";
import { Terminal } from "../components/ui/Terminal";
import { ProjectCard, type ProjectType } from "../components/ui/ProjectCard";
import { PageTransition } from "../components/layout/PageTransition";

const featuredProjects: ProjectType[] = [
    {
        id: "1",
        title: "Advanced Port Scanner",
        description: "Scanner de ports multi-threadé en Python avec détection de services et OS fingerprinting.",
        tags: ["Python", "Socket", "Scapy", "Network"],
        image: "https://images.unsplash.com/photo-1558494949-efc5e60dc62f?q=80&w=2070&auto=format&fit=crop",
        githubUrl: "#",
        details: {
            context: "Projet de fin de module réseau pour comprendre les mécanismes de scan.",
            challenges: "Gérer la rapidité sans déclencher les IDS, et gestion des threads.",
            solution: "Implémentation d'un pool de threads et randomization des délais."
        }
    },
    {
        id: "2",
        title: "Log Analyzer SIEM",
        description: "Outil d'analyse de logs Apache/Nginx avec détection d'attaques (SQLi, XSS, Path Traversal).",
        tags: ["Rust", "Regex", "Patterns", "SecOps"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        githubUrl: "#",
        details: {
            context: "Besoin de parser rapidement de gros volumes de logs.",
            challenges: "Performance sur des fichiers de plusieurs Go.",
            solution: "Utilisation de Rust pour la performance et Regex optimisés."
        }
    },
    {
        id: "3",
        title: "C2 Implant Mock",
        description: "Simulation d'un implant Command & Control basique avec communication chiffrée.",
        tags: ["C++", "Crypto", "WinAPI", "Red Team"],
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1974&auto=format&fit=crop",
        githubUrl: "https://github.com/alexis/network-scanner",
        demoUrl: "https://demo.network-scanner.com", // Mock demo
        featured: true,
        details: {
            context: "Développement d'un outil de scan réseau rapide.",
            challenges: "Optimisation de la vitesse de scan et détection d'OS.",
            solution: "Utilisation de Python Scapy et threading."
        }
    }
];

const stats = [
    { label: "Projets Réalisés", value: "15+" },
    { label: "Certifications", value: "3" },
    { label: "CTF Flags", value: "500+" },
    { label: "Années d'XP", value: "2+" },
];

export const Home = () => {
    return (
        <PageTransition>
            <div className="overflow-hidden">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-base/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-base/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-base/10 border border-primary-base/20 text-primary-base text-sm font-medium mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Open to Work - Pentester Junior
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-mono mb-6 leading-tight">
                                Sécuriser <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-base to-secondary-base">
                                    l'Invisible
                                </span>
                            </h1>

                            <p className="text-neutral-light text-lg mb-8 max-w-lg leading-relaxed">
                                Passionné par la cybersécurité offensive et le développement d'outils de sécurité.
                                Je transforme les vulnérabilités en opportunités de renforcement.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link to="/projects">
                                    <Button variant="primary" size="lg" rightIcon={<ArrowRight size={20} />}>
                                        Voir mes projets
                                    </Button>
                                </Link>
                                <Link to="/contact">
                                    <Button variant="outline" size="lg" leftIcon={<TerminalIcon size={20} />}>
                                        Me contacter
                                    </Button>
                                </Link>
                            </div>

                            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
                                {stats.map((stat, index) => (
                                    <div key={index}>
                                        <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-neutral-gray">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <Terminal />
                        </motion.div>
                    </div>
                </section>

                {/* Services / Domains */}
                <SectionWrapper className="bg-neutral-dark/30">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold font-mono mb-4 text-white">Domaines d'Expertise</h2>
                        <p className="text-neutral-light max-w-2xl mx-auto">
                            Une approche globale de la sécurité.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Shield className="w-8 h-8 text-primary-base" />,
                                title: "Pentest Web",
                                desc: "Audit de sécurité d'applications web (OWASP Top 10), recherche de vulnérabilités et exploitation éthique."
                            },
                            {
                                icon: <Code className="w-8 h-8 text-secondary-base" />,
                                title: "Secure Coding",
                                desc: "Développement d'outils de sécurité en Python et C. Revue de code et intégration de la sécurité (DevSecOps)."
                            },
                            {
                                icon: <Cpu className="w-8 h-8 text-status-warning" />,
                                title: "Réseau & Système",
                                desc: "Architecture sécurisée, durcissement de systèmes Linux/Windows et analyse de trafic réseau."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-xl bg-neutral-dark border border-neutral-gray/20 hover:border-primary-base/30 transition-all"
                            >
                                <div className="mb-4 bg-neutral-black/50 w-16 h-16 rounded-lg flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                <p className="text-neutral-gray">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </SectionWrapper>

                {/* Featured Projects */}
                <SectionWrapper>
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold font-mono mb-4 text-white">Projets à la Une</h2>
                            <p className="text-neutral-light">Sélection de mes travaux les plus récents.</p>
                        </div>
                        <Link to="/projects">
                            <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
                                Tous les projets
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </SectionWrapper>
            </div>
        </PageTransition>
    );
};
