import { SectionWrapper } from "../components/ui/SectionWrapper";
import { ContactForm } from "../components/ui/ContactForm";
import { Mail, Linkedin } from "lucide-react";
import { Card } from "../components/ui/Card";
import { PageTransition } from "../components/layout/PageTransition";
// Duplicate import removed

export const Contact = () => {
    return (
        <PageTransition>
            <div className="pt-8">
                <SectionWrapper>
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Info Section */}
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl font-bold font-mono mb-4 text-white">
                                    Me <span className="text-primary-base">Contacter</span>
                                </h1>
                                <p className="text-neutral-light text-lg">
                                    Vous avez un projet en tête ou une opporunité de pentest ?
                                    N'hésitez pas à me contacter via le formulaire ou directement par email.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                <Card className="flex items-center gap-4 p-4 hover:border-primary-base/50 transition-colors cursor-pointer">
                                    <div className="bg-primary-base/20 p-3 rounded-full">
                                        <Mail className="text-primary-base" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">Email</h3>
                                        <p className="text-neutral-gray">alexis@example.com</p>
                                        <p className="text-xs text-status-success mt-1">Réponse {`<`} 24h</p>
                                    </div>
                                </Card>

                                <Card className="flex items-center gap-4 p-4 hover:border-secondary-base/50 transition-colors cursor-pointer">
                                    <div className="bg-secondary-base/20 p-3 rounded-full">
                                        <Linkedin className="text-secondary-base" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">LinkedIn</h3>
                                        <p className="text-neutral-gray">linkedin.com/in/alexis</p>
                                    </div>
                                </Card>
                            </div>

                            <div className="bg-neutral-dark/30 p-6 rounded-lg border border-neutral-gray/20">
                                <h3 className="text-white font-bold mb-2">Status Actuel</h3>
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="text-neutral-light">Disponible pour des missions freelance et CDI.</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="bg-neutral-dark/20 p-6 md:p-8 rounded-2xl border border-neutral-gray/10">
                            <ContactForm />
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </PageTransition>
    );
};
