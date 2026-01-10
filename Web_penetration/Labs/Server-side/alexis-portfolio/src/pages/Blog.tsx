import { useState } from "react";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { PageTransition } from "../components/layout/PageTransition";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Clock, Calendar, Hash, ArrowRight } from "lucide-react";
import { blogPosts, type BlogPost } from "../data/blog";
import { motion } from "framer-motion";

export const Blog = () => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [activeFilter, setActiveFilter] = useState("Tous");

    const categories = ["Tous", "Cybersecurity", "CTF", "Tutorial", "News"];

    const filteredPosts = blogPosts.filter(post =>
        activeFilter === "Tous" ? true : post.category === activeFilter
    );

    return (
        <PageTransition>
            <div className="pt-8">
                <SectionWrapper>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold font-mono mb-4 text-white">
                            Blog / <span className="text-primary-base">Articles</span>
                        </h1>
                        <p className="text-neutral-light max-w-2xl mx-auto">
                            Partage de connaissances, write-ups de CTF et analyses techniques.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={activeFilter === cat ? "primary" : "outline"}
                                onClick={() => setActiveFilter(cat)}
                                size="sm"
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <Card hoverEffect className="h-full flex flex-col group cursor-pointer" onClick={() => setSelectedPost(post)}>
                                    <div className="h-48 overflow-hidden rounded-t-lg relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 text-xs font-bold bg-neutral-black/80 backdrop-blur text-primary-base rounded-full border border-primary-base/20">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-neutral-light mb-4">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-bold font-mono text-white mb-3 group-hover:text-primary-base transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-neutral-light text-sm line-clamp-3 mb-6 flex-grow">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex gap-2">
                                                {post.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="text-xs text-neutral-light/70 bg-white/5 px-2 py-1 rounded">#{tag}</span>
                                                ))}
                                            </div>
                                            <span className="text-primary-base group-hover:translate-x-1 transition-transform">
                                                <ArrowRight size={20} />
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </SectionWrapper>
            </div>

            {/* Article Modal */}
            <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)}>
                {selectedPost && (
                    <div className="max-w-4xl mx-auto">
                        {/* Header Image */}
                        <div className="relative h-64 md:h-80 w-full overflow-hidden">
                            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                                <div className="mb-4 flex gap-4 text-sm text-neutral-light/80">
                                    <span className="bg-primary-base/20 text-primary-base px-3 py-1 rounded-full backdrop-blur-sm border border-primary-base/20">
                                        {selectedPost.category}
                                    </span>
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {selectedPost.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {selectedPost.readTime}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2 leading-tight">
                                    {selectedPost.title}
                                </h2>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-10">
                            <article className="prose prose-invert prose-lg max-w-none prose-headings:font-mono prose-headings:text-primary-base prose-a:text-primary-base hover:prose-a:text-white">
                                <p className="lead text-xl text-neutral-light mb-8 italic border-l-4 border-primary-base pl-4">
                                    {selectedPost.excerpt}
                                </p>
                                {/* Simple renderer for demo. In real app, use react-markdown */}
                                <div className="space-y-6 text-neutral-light/90 whitespace-pre-wrap font-sans">
                                    {selectedPost.content}
                                </div>
                            </article>

                            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-2">
                                <Hash size={18} className="text-neutral-light" />
                                {selectedPost.tags.map(tag => (
                                    <span key={tag} className="text-sm text-neutral-light bg-white/5 px-3 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </PageTransition>
    );
};
