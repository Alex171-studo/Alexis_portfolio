import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Terminal, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

const navItems = [
    { label: "Accueil", path: "/" },
    { label: "À Propos", path: "/about" },
    { label: "Projets", path: "/projects" },
    { label: "Compétences", path: "/skills" },
    { label: "Certifications", path: "/certifications" },
    { label: "Blog", path: "/blog" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsOpen(false);

    return (
        <nav
            className={cn(
                "fixed w-full z-50 transition-all duration-300 border-b border-transparent",
                scrolled || isOpen
                    ? "bg-neutral-black/80 backdrop-blur-md border-white/5 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary-base/10 group-hover:bg-primary-base/20 transition-colors">
                            <Shield className="w-6 h-6 text-primary-base" />
                        </div>
                        <span className="font-mono font-bold text-lg tracking-tight">
                            ALEXIS<span className="text-primary-base">.SEC</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex gap-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary-base relative group",
                                        location.pathname === item.path
                                            ? "text-primary-base"
                                            : "text-neutral-light"
                                    )}
                                >
                                    {item.label}
                                    {location.pathname === item.path && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-base"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                        <Link to="/contact">
                            <Button variant="primary" size="sm" leftIcon={<Terminal size={14} />}>
                                Contacter
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-neutral-light hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-neutral-black/95 border-b border-white/5 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeMenu}
                                    className={cn(
                                        "text-lg font-medium transition-colors hover:text-primary-base",
                                        location.pathname === item.path
                                            ? "text-primary-base"
                                            : "text-neutral-light"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link to="/contact" onClick={closeMenu}>
                                <Button className="w-full" size="md">
                                    Me Contacter
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
