import { motion } from "framer-motion";
import { User, Calendar, MapPin, Briefcase } from "lucide-react";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Card } from "../components/ui/Card";
import { PageTransition } from "../components/layout/PageTransition";

const timeline = [
    {
        year: "2024",
        title: "Spécialisation Pentest",
        desc: "Focus intensif sur l'offensive security. Réalisation de labs avancés (Pro Labs HTB).",
        company: "Autodidacte / Certification"
    },
    {
        year: "2023",
        title: "Début Cybersécurité",
        desc: "Apprentissage des bases réseaux (CCNA), Linux et Python. Premiers CTF.",
        company: "Formation en ligne"
    },
    {
        year: "2022",
        title: "Développement Web",
        desc: "Création de sites fullstack. Comprendre comment construire pour mieux casser.",
        company: "Freelance"
    },
    
];

export const About = () => {
    return (
        <PageTransition>
            <div className="pt-8">
                <SectionWrapper>
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Bio Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl font-bold font-mono mb-6 text-white">
                                À Propos de <span className="text-primary-base">Moi</span>
                            </h1>

                            <div className="prose prose-invert text-neutral-light mb-8">
                                <p className="text-lg leading-relaxed mb-4">
                                    Salut ! Je suis Alexis, un passionné de sécurité informatique avec une approche pragmatique :
                                    <span className="text-white font-medium"> on ne sécurise bien que ce que l'on comprend en profondeur.</span>
                                </p>
                                <p className="mb-4">
                                    Mon parcours atypique m'a permis de développer une double compétence en développement logiciel
                                    et en administration système, avant de me spécialiser dans les tests d'intrusion.
                                </p>
                                <p>
                                    Aujourd'hui, je cherche à rejoindre une équipe technique stimulante pour relever de nouveaux
                                    défis en Pentest Web et Infrastructure.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 text-neutral-light">
                                    <MapPin className="text-primary-base" size={20} />
                                    <span>Paris, France (Remote OK)</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-light">
                                    <Briefcase className="text-primary-base" size={20} />
                                    <span>Disponible immédiatement</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-light">
                                    <User className="text-primary-base" size={20} />
                                    <span>24 ans</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-light">
                                    <Calendar className="text-primary-base" size={20} />
                                    <span>Permis B</span>
                                </div>
                            </div>

                            {/* Soft Skills */}
                            <h3 className="text-xl font-bold mb-4 text-white">Soft Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Curiosité", "Persévérance", "Communication Technique", "Esprit d'équipe", "Rigueur"].map((skill) => (
                                    <span key={skill} className="px-3 py-1 rounded-full bg-neutral-gray/20 text-neutral-light text-sm border border-neutral-gray/30">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Timeline Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="p-8">
                                <h2 className="text-2xl font-bold font-mono mb-8 text-white flex items-center gap-3">
                                    <Calendar className="text-primary-base" />
                                    Parcours
                                </h2>

                                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-gray/50 before:to-transparent">
                                    {timeline.map((item, index) => (
                                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-gray/50 bg-neutral-dark group-hover:bg-primary-base/20 transition-colors shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                                <div className="w-3 h-3 bg-primary-base rounded-full" />
                                            </div>

                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-neutral-black/50 border border-neutral-gray/20 hover:border-primary-base/30 transition-all">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                                                    <time className="font-mono text-xs font-medium text-primary-base mb-1 sm:mb-0">
                                                        {item.year}
                                                    </time>
                                                    <span className="text-xs text-neutral-gray">{item.company}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                                <p className="text-neutral-light text-sm">
                                                    {item.desc}
                                                </p>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </SectionWrapper>
            </div>
        </PageTransition>
    );
};
