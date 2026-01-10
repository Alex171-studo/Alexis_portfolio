import { useState } from "react";
import { Button } from "./Button";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export const ContactForm = () => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            // Reset form or handle logic here
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-neutral-light">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="w-full bg-neutral-dark border border-neutral-gray rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-base transition-all placeholder:text-neutral-gray/50"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-light">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full bg-neutral-dark border border-neutral-gray rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-base transition-all placeholder:text-neutral-gray/50"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-neutral-light">
                    Sujet
                </label>
                <select
                    id="subject"
                    className="w-full bg-neutral-dark border border-neutral-gray rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-base transition-all"
                >
                    <option value="recruitment">Recrutement</option>
                    <option value="project">Projet Freelance</option>
                    <option value="question">Question Technique</option>
                    <option value="other">Autre</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-neutral-light">
                    Message
                </label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full bg-neutral-dark border border-neutral-gray rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-base transition-all placeholder:text-neutral-gray/50"
                    placeholder="Votre message..."
                />
            </div>

            <Button
                type="submit"
                variant="primary"
                className="w-full md:w-auto min-w-[150px]"
                isLoading={status === "loading"}
                rightIcon={status === "idle" ? <Send size={16} /> : undefined}
            >
                {status === "idle" && "Envoyer"}
                {status === "loading" && "Envoi..."}
                {status === "success" && (
                    <span className="flex items-center gap-2">
                        Envoyé <CheckCircle size={16} />
                    </span>
                )}
                {status === "error" && (
                    <span className="flex items-center gap-2">
                        Erreur <AlertCircle size={16} />
                    </span>
                )}
            </Button>

            {status === "success" && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-status-success text-sm mt-2 text-center md:text-left"
                >
                    Message envoyé avec succès ! Je vous répondrai sous 24h.
                </motion.p>
            )}
        </form>
    );
};
