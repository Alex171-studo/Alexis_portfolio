import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";

// Lazy load pages for performance
const Home = lazy(() => import("./pages/Home").then(module => ({ default: module.Home })));
const About = lazy(() => import("./pages/About").then(module => ({ default: module.About })));
const Projects = lazy(() => import("./pages/Projects").then(module => ({ default: module.Projects })));
const Skills = lazy(() => import("./pages/Skills").then(module => ({ default: module.Skills })));
const Certifications = lazy(() => import("./pages/Certifications").then(module => ({ default: module.Certifications })));
const Blog = lazy(() => import("./pages/Blog").then(module => ({ default: module.Blog })));
const Contact = lazy(() => import("./pages/Contact").then(module => ({ default: module.Contact })));

// Loading component
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-neutral-black text-primary-base font-mono">
    Loading... <span className="animate-pulse">_</span>
  </div>
);

// Helper component to wrap Routes for AnimatePresence to work correctly with useLocation
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

function App() {
  return (
    <Layout>
      <AnimatedRoutes />
    </Layout>
  );
}

export default App;
