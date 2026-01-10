import { useState } from "react";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { PageTransition } from "../components/layout/PageTransition";
import { Award, FileText, X, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { certificationsData } from "../data/certifications";

const certs = certificationsData;

export const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState<typeof certs[0] | null>(null);

    return (
        <PageTransition>
            <div className="pt-8 min-h-screen">
                <SectionWrapper>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold font-mono text-white mb-4">
                            Certifications <span className="text-primary-base">&</span> Diplômes
                        </h1>
                        <p className="text-neutral-gray max-w-2xl mx-auto">
                            Validation officielle de mes compétences techniques et théoriques.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certs.map((cert) => (
                            <Card key={cert.id} className="p-6 hover:border-primary-base/50 transition-colors group cursor-pointer" onClick={() => setSelectedCert(cert)}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-primary-base/10 rounded-lg text-primary-base group-hover:bg-primary-base group-hover:text-black transition-colors">
                                        <Award size={24} />
                                    </div>
                                    <span className="text-sm font-mono text-neutral-gray">{cert.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                                <p className="text-sm text-neutral-gray mb-4">{cert.issuer}</p>
                                <div className="flex flex-wrap gap-2">
                                    {cert.skills.slice(0, 3).map(skill => (
                                        <span key={skill} className="text-xs px-2 py-1 rounded bg-neutral-gray/10 text-neutral-light border border-neutral-gray/20">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-neutral-gray/20 flex justify-end">
                                    <Button variant="ghost" size="sm" rightIcon={<ExternalLink size={14} />}>Détails</Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* PDF/Detail Modal */}
                    <AnimatePresence>
                        {selectedCert && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-neutral-black border border-neutral-gray/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-primary-base/10"
                                >
                                    <div className="flex justify-between items-center p-6 border-b border-neutral-gray/20 bg-neutral-black/50">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">{selectedCert.title}</h2>
                                            <p className="text-primary-base">{selectedCert.issuer} • {selectedCert.date}</p>
                                        </div>
                                        <button onClick={() => setSelectedCert(null)} className="text-neutral-gray hover:text-white transition-colors">
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-auto p-6 grid md:grid-cols-2 gap-8 bg-neutral-black">
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                                <FileText size={20} className="text-primary-base" />
                                                Description
                                            </h3>
                                            <p className="text-neutral-gray mb-6 leading-relaxed">
                                                {selectedCert.description}
                                            </p>

                                            {selectedCert.verificationId && (
                                                <div className="mb-6 p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between">
                                                    <span className="text-sm text-neutral-light">ID de Vérification:</span>
                                                    <span className="font-mono text-primary-base font-bold select-all">{selectedCert.verificationId}</span>
                                                </div>
                                            )}

                                            {selectedCert.learned && selectedCert.learned.length > 0 && (
                                                <div className="mb-6">
                                                    <h3 className="text-lg font-bold text-white mb-3">
                                                        🧠 Ce que j'ai appris
                                                    </h3>
                                                    <ul className="list-disc list-inside space-y-2 text-neutral-gray">
                                                        {selectedCert.learned.map((point, index) => (
                                                            <li key={index} className="text-sm">{point}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-3">Compétences Clés</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedCert.skills.map(skill => (
                                                        <span key={skill} className="px-3 py-1.5 rounded bg-primary-base/10 text-primary-base border border-primary-base/20 text-sm">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-neutral-gray/5 rounded-lg border-2 border-dashed border-neutral-gray/20 flex flex-col items-center justify-center h-64 text-neutral-gray overflow-hidden relative group">
                                                {selectedCert.image ? (
                                                    <img
                                                        src={selectedCert.image}
                                                        alt="Certificat Preview"
                                                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                                                    />
                                                ) : (
                                                    <>
                                                        <FileText size={48} className="mb-4 opacity-50" />
                                                        <p>Aperçu du Certificat (PDF)</p>
                                                        <span className="text-xs opacity-50 mt-2">Document protégé</span>
                                                    </>
                                                )}
                                            </div>

                                            <Button className="w-full" variant="primary" rightIcon={<ExternalLink size={16} />}>
                                                Voir le document officiel
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </SectionWrapper>
            </div>
        </PageTransition>
    );
};
