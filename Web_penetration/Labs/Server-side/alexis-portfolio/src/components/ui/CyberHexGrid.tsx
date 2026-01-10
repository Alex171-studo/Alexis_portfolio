import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../lib/utils";

interface SkillHexProps {
    skill: string;
    level: number; // 0-100
    icon?: React.ReactNode;
    delay?: number;
}

const Hexagon = ({ skill, level, delay = 0 }: SkillHexProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay * 0.1 }}
            className="relative w-32 h-36 m-2 group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Hexagon Shape SVG */}
            <svg
                viewBox="0 0 100 115"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(0,255,136,0.3)] filter"
            >
                <path
                    d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z"
                    className={cn(
                        "fill-neutral-black/80 stroke-2 transition-all duration-300",
                        isHovered ? "stroke-primary-base fill-primary-base/20" : "stroke-neutral-gray/50"
                    )}
                />

                {/* Progress Fill (simulated by stroke dasharray or separate path, kept simple here for visual) */}
                <path
                    d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 Z"
                    className={cn(
                        "fill-none stroke-[3px] transition-all duration-500",
                        isHovered ? "stroke-secondary-base" : "stroke-transparent"
                    )}
                    strokeDasharray={`${level} 100`}
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
                <span className={cn(
                    "text-xs font-mono font-bold transition-colors duration-300",
                    isHovered ? "text-white" : "text-neutral-gray"
                )}>
                    {skill}
                </span>
                <span className={cn(
                    "text-[10px] mt-1 transition-opacity duration-300",
                    isHovered ? "opacity-100 text-primary-base" : "opacity-0"
                )}>
                    {level}%
                </span>
            </div>
        </motion.div>
    );
};

export const CyberHexGrid = () => {
    const skills = [
        { skill: "Pentest", level: 90 },
        { skill: "Network", level: 85 },
        { skill: "Python", level: 95 },
        { skill: "React", level: 80 },
        { skill: "Linux", level: 90 },
        { skill: "Docker", level: 75 },
        { skill: "Bash", level: 85 },
        { skill: "SQL", level: 70 },
        { skill: "Burp", level: 92 },
        { skill: "Metasploit", level: 88 },
        { skill: "Rust", level: 60 },
        { skill: "C++", level: 50 },
    ];

    return (
        <div className="flex flex-wrap justify-center items-center max-w-4xl mx-auto p-10 perspective-1000">
            {/* Creating a honeycomb-like layout requires strictly controlling margins/flex or using CSS Grid with offset. 
                 For simplicity and responsiveness, flex wrap with negative margins often works well for hex grids. */}
            {skills.map((s, i) => (
                <div key={i} className={cn("relative", i % 2 === 0 ? "mt-16" : "")}>
                    <Hexagon {...s} delay={i} />
                </div>
            ))}
        </div>
    );
};
