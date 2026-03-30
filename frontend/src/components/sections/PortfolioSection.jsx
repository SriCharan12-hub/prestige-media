import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-scale e-commerce solution with dynamic product routing, cart management, and secure stripe payments.',
    image: 'https://images.unsplash.com/photo-1557821552-17105153ce67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: 'Fintech Dashboard',
    description: 'Real-time financial analytics dashboard with complex data visualization and secure WebSocket connections.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 3,
    title: 'HealthCare App',
    description: 'Patient management portal featuring appointment scheduling, secure messaging, and tele-health integration.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['React Native', 'Firebase', 'Express'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 4,
    title: 'Real Estate Portal',
    description: 'Interactive map-based real estate directory featuring 3D virtual tours and agent management dashboards.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Next.js', 'Mapbox', 'GraphQL'],
    demoUrl: '#',
    githubUrl: '#'
  }
];

export default function PortfolioSection() {
  // Kudanil-style Horizontal Scroll
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // The animation happens while the container's top reaches start of window
    // and ends when container's bottom reaches end of window.
    offset: ["start start", "end end"] 
  });

  // Since we have 4 items, mapping translation from 0 to -75% allows scrolling exactly to the last item.
  // The wrapper width is visually wide to accommodate the cards.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    // The h-[300vh] gives us 3 screens worth of scroll distance to drive the horizontal animation
    <section ref={targetRef} id="portfolio" className="relative h-[300vh] bg-slate-50 dark:bg-zinc-900/50">
      
      {/* The sticky container stays in viewport while user scrolls down the 300vh */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="container mx-auto px-4 md:px-6 mb-12 shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4"
              >
                Our Portfolio
              </motion.div>
              
              <div className="overflow-hidden pb-2">
                <motion.h2
                  initial={{ opacity: 0, y: "100%" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                  className="text-3xl md:text-5xl font-bold mb-4"
                >
                  Featured Work
                </motion.h2>
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                className="text-lg text-slate-600 dark:text-zinc-400"
              >
                 Scroll down to horizontally explore our expansive library of premium client solutions.
              </motion.p>
            </div>
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300 }}
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-slate-900 dark:text-white bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors shrink-0"
            >
              View All Projects
            </motion.a>
          </div>
        </div>

        {/* The horizontally panning track */}
        <motion.div style={{ x }} className="flex gap-8 px-4 md:px-6 md:pl-32 pb-12 w-max">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -15 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group flex flex-col w-[85vw] max-w-[500px] shrink-0 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                  <div className="flex gap-3">
                    <a href={project.demoUrl} className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a href={project.githubUrl} className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-lg">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-slate-600 dark:text-zinc-400 mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
