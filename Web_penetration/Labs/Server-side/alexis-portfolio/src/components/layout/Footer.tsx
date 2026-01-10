import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-neutral-dark border-t border-white/5 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold font-mono text-white mb-2">
                            ALEXIS<span className="text-primary-base">.SEC</span>
                        </h3>
                        <p className="text-neutral-gray text-sm">
                            © {new Date().getFullYear()} Alexis - Pentester Portfolio
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-light hover:text-primary-base transition-colors"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-light hover:text-primary-base transition-colors"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:alexis@example.com"
                            className="text-neutral-light hover:text-primary-base transition-colors"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
