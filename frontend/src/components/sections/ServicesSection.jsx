import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, PenTool, Database, ShoppingCart, Layout, Wrench } from 'lucide-react';
import { cn } from '../../utils/cn';

const services = [
  {
    icon: Laptop,
    title: 'Website Development',
    description: 'Custom, high-performance websites built from the ground up to match your brand and business goals.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    icon: PenTool,
    title: 'UI/UX Design',
    description: 'Intuitive, conversion-optimized interfaces that provide exceptional user experiences and beautiful aesthetics.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    icon: Database,
    title: 'Full Stack Applications',
    description: 'Complex web applications with robust backend infrastructure, secure APIs, and dynamic frontends.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Websites',
    description: 'Scalable online stores engineered for high conversion rates, seamless checkout, and easy management.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    icon: Layout,
    title: 'Landing Pages',
    description: 'High-converting landing pages designed specifically for marketing campaigns and product launches.',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10'
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    description: 'Ongoing technical support, performance monitoring, and security updates to keep your site running smoothly.',
    color: 'text-slate-500',
    bg: 'bg-slate-500/10'
  }
];

export default function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4"
          >
            What We Do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-zinc-400"
          >
            End-to-end digital solutions designed to elevate your brand and drive measurable results.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-white/5 shadow-lg shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                
                <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300', service.bg, service.color)}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
