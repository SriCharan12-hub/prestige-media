import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Rocket } from 'lucide-react';

export default function AboutUsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-slate-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-slate-600 dark:text-zinc-400 mb-6 leading-relaxed">
              We are a collective of passionate designers, developers, and strategists. We believe that exceptional web experiences are built at the intersection of beautiful design and robust engineering.
            </p>
            <p className="text-lg text-slate-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Our small, agile team works closely with startups and enterprises alike to transform complex problems into intuitive, user-centric solutions that drive growth.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-900 bg-slate-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Team Member" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-900 bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">
                  +5
                </div>
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-zinc-400">
                <span className="block text-slate-900 dark:text-white font-bold text-lg">9+</span>
                Dedicated Experts
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            {/* Mission */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-zinc-400">
                To empower businesses by delivering scalable, cutting-edge web infrastructure and breathtaking designs that outpace the competition.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Rocket className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-slate-600 dark:text-zinc-400">
                To be the global benchmark for modern web development, defining the standard for how the next generation of applications are built.
              </p>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
