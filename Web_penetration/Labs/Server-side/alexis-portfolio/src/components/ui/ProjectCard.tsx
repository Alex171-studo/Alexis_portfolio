import { useState } from "react";
// motion unused
import { ExternalLink, Github, Terminal } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Modal } from "./Modal";

export interface ProjectType {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    details: {
        context: string;
        challenges: string;
        solution: string;
        // New fields
        architecture?: string;
        results?: string;
        difficulties?: string;
        future?: string;
    };
    tags: string[];
    image: string;
    githubUrl?: string;
    demoUrl?: string;
    videoUrl?: string;
    featured?: boolean;
}

interface ProjectCardProps {
    project: ProjectType;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Card hoverEffect className="h-full flex flex-col group">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark to-transparent opacity-60" />
                    <div className="absolute top-4 right-4 flex gap-2">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-neutral-dark/80 backdrop-blur rounded-full hover:text-primary-base transition-colors"
                            >
                                <Github size={18} />
                            </a>
                        )}
                        {project.demoUrl && (
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-neutral-dark/80 backdrop-blur rounded-full hover:text-primary-base transition-colors"
                            >
                                <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                </div>

                <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold font-mono mb-2 group-hover:text-primary-base transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-neutral-light text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded bg-primary-base/10 text-primary-base border border-primary-base/20"
                            >
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded bg-neutral-gray/20 text-neutral-light">
                                +{project.tags.length - 3}
                            </span>
                        )}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setIsModalOpen(true)}
                        rightIcon={<Terminal size={14} />}
                    >
                        Détails du projet
                    </Button>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-0">
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark via-transparent to-transparent" />
                        <h2 className="absolute bottom-6 left-6 text-3xl font-bold font-mono text-white">
                            {project.title}
                        </h2>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                        {/* Intro */}
                        <div className="text-neutral-light leading-relaxed text-lg border-l-4 border-primary-base pl-4 italic">
                            {project.longDescription || project.details.context}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-sm rounded-full bg-primary-base/10 text-primary-base border border-primary-base/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Video */}
                        {project.videoUrl && (
                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                                    🎥 Démo Vidéo
                                </h3>
                                <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden border border-neutral-gray/30">
                                    <iframe
                                        src={project.videoUrl}
                                        className="absolute inset-0 w-full h-full"
                                        title="Project Demo"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left Column: Context & Challenges */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                                        <Terminal className="text-primary-base" size={20} />
                                        Contexte & Objectif
                                    </h3>
                                    <p className="text-neutral-light leading-relaxed">
                                        {project.details.context}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                                        ⚠️ Challenges Prioritaires
                                    </h3>
                                    <p className="text-neutral-light leading-relaxed">
                                        {project.details.challenges}
                                    </p>
                                </div>

                                {project.details.difficulties && (
                                    <div>
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                                            📉 Difficultés Rencontrées
                                        </h3>
                                        <p className="text-neutral-light leading-relaxed">
                                            {project.details.difficulties}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Solution & Results */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                                        🛡️ Architecture & Solution
                                    </h3>
                                    <p className="text-neutral-light leading-relaxed">
                                        {project.details.solution}
                                    </p>
                                    {project.details.architecture && (
                                        <p className="text-neutral-light leading-relaxed mt-2 text-sm opacity-90">
                                            <span className="font-bold text-primary-base">Tech:</span> {project.details.architecture}
                                        </p>
                                    )}
                                </div>

                                {project.details.results && (
                                    <div>
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                                            ✅ Résultats Concrets
                                        </h3>
                                        <p className="text-neutral-light leading-relaxed">
                                            {project.details.results}
                                        </p>
                                    </div>
                                )}

                                {project.details.future && (
                                    <div>
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                                            🚀 Améliorations Futures
                                        </h3>
                                        <p className="text-neutral-light leading-relaxed">
                                            {project.details.future}
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    {project.githubUrl && (
                                        <Button
                                            onClick={() => window.open(project.githubUrl, '_blank')}
                                            rightIcon={<Github size={18} />}
                                            className="flex-1"
                                        >
                                            Code Source
                                        </Button>
                                    )}
                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1"
                                        >
                                            <Button variant="primary" className="w-full" leftIcon={<ExternalLink size={18} />}>
                                                Live Demo
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
