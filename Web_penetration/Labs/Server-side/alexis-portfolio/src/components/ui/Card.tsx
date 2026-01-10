import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
    hoverEffect?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, hoverEffect = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "relative overflow-hidden rounded-xl bg-neutral-dark/50 border border-neutral-gray/30 backdrop-blur-sm p-6",
                    hoverEffect &&
                    "hover:border-primary-base/50 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-colors duration-300",
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
Card.displayName = "Card";

export { Card };
