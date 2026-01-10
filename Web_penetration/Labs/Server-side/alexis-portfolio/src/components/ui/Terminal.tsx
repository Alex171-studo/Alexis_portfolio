import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "./Card";

interface Command {
    cmd: string;
    output: string;
    delay?: number;
}

const commands: Command[] = [
    { cmd: "whoami", output: "alexis_pentester", delay: 500 },
    { cmd: "cat skills.txt", output: "Python, C, Bash, Network Security, Web Pentesting...", delay: 1500 },
    { cmd: "./status.sh", output: "OPEN TO WORK - Ready for missions", delay: 3000 },
];

export const Terminal = () => {
    const [lines, setLines] = useState<{ cmd: string; output: string | null }[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (currentLineIndex >= commands.length) {
            setIsTyping(false);
            return;
        }

        const command = commands[currentLineIndex];

        if (currentText.length < command.cmd.length) {
            const timeout = setTimeout(() => {
                setCurrentText(command.cmd.slice(0, currentText.length + 1));
            }, 50 + Math.random() * 50); // Typing randomization
            return () => clearTimeout(timeout);
        } else {
            // Command finished typing
            const timeout = setTimeout(() => {
                setLines((prev) => [...prev, { cmd: command.cmd, output: command.output }]);
                setCurrentText("");
                setCurrentLineIndex((prev) => prev + 1);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [currentText, currentLineIndex]);

    return (
        <Card className="font-mono text-sm sm:text-base border-neutral-gray bg-neutral-dark/90 p-0 overflow-hidden shadow-2xl shadow-primary-base/10 max-w-2xl mx-auto w-full">
            {/* Terminal Header */}
            <div className="bg-neutral-gray/30 px-4 py-2 flex items-center gap-2 border-b border-neutral-gray/30">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-status-error" />
                    <div className="w-3 h-3 rounded-full bg-status-warning" />
                    <div className="w-3 h-3 rounded-full bg-status-success" />
                </div>
                <div className="ml-4 text-xs text-neutral-light/50">alexis@kali:~</div>
            </div>

            {/* Terminal Content */}
            <div className="p-4 h-64 sm:h-80 overflow-hidden flex flex-col justify-end">
                <div className="flex flex-col gap-2">
                    {lines.map((line, i) => (
                        <div key={i}>
                            <div className="flex gap-2 text-primary-base">
                                <span className="text-secondary-base">➜</span>
                                <span className="text-primary-base">~</span>
                                <span className="text-white">{line.cmd}</span>
                            </div>
                            {line.output && (
                                <div className="text-neutral-light ml-4 animate-in fade-in duration-300">
                                    {line.output}
                                </div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-2 text-primary-base">
                            <span className="text-secondary-base">➜</span>
                            <span className="text-primary-base">~</span>
                            <span className="text-white">
                                {currentText}
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="inline-block w-2.5 h-5 bg-primary-base ml-1 align-middle"
                                />
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};
