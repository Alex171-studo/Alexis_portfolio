import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Button } from "../components/ui/Button";
// SkillsMatrix removed as Radar Chart is replaced
import { CyberHexGrid } from "../components/ui/CyberHexGrid";
import { Terminal, Award, ExternalLink } from "lucide-react";
import { Card } from "../components/ui/Card";
import { PageTransition } from "../components/layout/PageTransition";
// Duplicate import removed

export const Skills = () => {
    return (
        <PageTransition>
            <div className="pt-8">
                <SectionWrapper>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold font-mono mb-4 text-white">
                            Compétences <span className="text-primary-base">Techniques</span>
                        </h1>
                        <p className="text-neutral-light max-w-2xl mx-auto">
                            Mon expertise technique en détail.
                        </p>
                    </div>

                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-6 justify-center">
                            <div className="p-2 rounded-lg bg-primary-base/20 text-primary-base">
                                <Terminal size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white font-mono">Cyber Knowledge Grid</h2>
                        </div>
                        <p className="text-center text-neutral-gray mb-8 max-w-2xl mx-auto">
                            Mapped competencies across offensive security, network infrastructure, and secure development.
                        </p>
                        <CyberHexGrid />
                    </div>

                    {/* Keeping SkillsMatrix as fallback or detailed list if needed, strictly speaking user asked to REPLACE the graph, so let's keep the list but remove the radar chart from SkillsMatrix or just use the interactive graph here primarily. 
            The user said "pour le graphes des compétences globales fais pas ce graphe trouve autre chose beaucoup mieux".
            So InteractiveForceGraph replaces the main visualization. 
            The old SkillsMatrix component had both Radar and List. I should probably refactor SkillsMatrix or just use the List part here.
            For now, let's keep the ForceGraph as the main hero of this page.
        */}

                    <div className="mt-20 grid md:grid-cols-2 gap-8">
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Award className="text-primary-base" />
                                <h2 className="text-xl font-bold text-white">Certifications & Diplômes</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-neutral-gray/20 pb-2 group cursor-pointer hover:bg-neutral-gray/10 p-2 rounded transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium group-hover:text-primary-base transition-colors">eJPTv2</span>
                                        <span className="text-xs text-neutral-gray">eLearnSecurity Junior Penetration Tester</span>
                                    </div>
                                    <Button size="sm" variant="ghost" rightIcon={<ExternalLink size={14} />}>Voir</Button>
                                </div>
                                <div className="flex justify-between items-center border-b border-neutral-gray/20 pb-2 group cursor-pointer hover:bg-neutral-gray/10 p-2 rounded transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium group-hover:text-primary-base transition-colors">CompTIA Security+</span>
                                        <span className="text-xs text-neutral-gray">SY0-601</span>
                                    </div>
                                    <Button size="sm" variant="ghost" rightIcon={<ExternalLink size={14} />}>Voir</Button>
                                </div>
                                <div className="flex justify-between items-center group cursor-pointer hover:bg-neutral-gray/10 p-2 rounded transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium group-hover:text-primary-base transition-colors">Google Cybersecurity</span>
                                        <span className="text-xs text-neutral-gray">Professional Certificate</span>
                                    </div>
                                    <Button size="sm" variant="ghost" rightIcon={<ExternalLink size={14} />}>Voir</Button>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-neutral-gray/30 text-center">
                                <Button variant="outline" className="w-full">Voir toutes les certifications</Button>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Terminal className="text-secondary-base" />
                                <h2 className="text-xl font-bold text-white">Environnement de Travail</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-neutral-black/50 p-3 rounded text-center">
                                    <span className="block text-white font-medium">Kali Linux</span>
                                    <span className="text-xs text-neutral-gray">Daily Driver</span>
                                </div>
                                <div className="bg-neutral-black/50 p-3 rounded text-center">
                                    <span className="block text-white font-medium">VS Code</span>
                                    <span className="text-xs text-neutral-gray">IDE Principal</span>
                                </div>
                                <div className="bg-neutral-black/50 p-3 rounded text-center">
                                    <span className="block text-white font-medium">Burp Suite</span>
                                    <span className="text-xs text-neutral-gray">Pro Edition</span>
                                </div>
                                <div className="bg-neutral-black/50 p-3 rounded text-center">
                                    <span className="block text-white font-medium">Docker</span>
                                    <span className="text-xs text-neutral-gray">Containerization</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </SectionWrapper>
            </div>
        </PageTransition>
    );
};
