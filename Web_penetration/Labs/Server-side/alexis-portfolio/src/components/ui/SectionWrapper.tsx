import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
    id?: string;
    className?: string;
    delay?: number;
}

const SectionWrapper = ({
    children,
    className,
    id,
    delay = 0,
    ...props
}: SectionWrapperProps) => {
    return (
        <section id={id} className={cn("py-16 md:py-24 relative", className)} {...props}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: delay * 0.1 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
                {children}
            </motion.div>
        </section>
    );
};

export { SectionWrapper };
