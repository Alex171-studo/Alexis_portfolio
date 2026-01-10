import { useState } from "react";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { ProjectCard } from "../components/ui/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/Button";
import { PageTransition } from "../components/layout/PageTransition";
import { projectsData } from "../data/projects";

const allProjects = projectsData;

const filters = ["Tous", "Python", "Web", "Network", "Red Team"];

export const Projects = () => {
    const [activeFilter, setActiveFilter] = useState("Tous");

    const filteredProjects = allProjects.filter((project) => {
        if (activeFilter === "Tous") return true;
        return project.tags.some((tag) => tag.includes(activeFilter) || (activeFilter === "Red Team" && project.tags.includes("C++"))); // Simple mapping for demo
    });

    return (
        <PageTransition>
            <div className="pt-8">
                <SectionWrapper>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold font-mono mb-4 text-white">
                            Mes <span className="text-primary-base">Projets</span>
                        </h1>
                        <p className="text-neutral-light max-w-2xl mx-auto">
                            Une collection de mes travaux techniques, des outils de sécurité aux simulations d'attaques.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {filters.map((filter) => (
                            <Button
                                key={filter}
                                variant={activeFilter === filter ? "primary" : "outline"}
                                onClick={() => setActiveFilter(filter)}
                                size="sm"
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>

                    {/* Grid */}
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </SectionWrapper>
            </div>
        </PageTransition>
    );
};
