import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  LayoutTemplate,
  DollarSign,
  Search,
  Smartphone,
  Code2,
} from "lucide-react";
import { cn } from "../../utils/cn";

const features = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "We adhere to agile methodologies to deliver projects rapidly without compromising on quality or performance.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: LayoutTemplate,
    title: "Modern Design",
    description:
      "Striking, contemporary aesthetics that capture attention and create memorable brand experiences.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description:
      "Transparent, competitive pricing structures tailored to provide maximum ROI for startups and enterprises.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Search,
    title: "SEO Friendly",
    description:
      "Built-in technical SEO best practices ensure your site ranks high and reaches your target audience organically.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Flawless experiences across all devices, ensuring your platform looks perfect on mobile, tablet, and desktop.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Maintainable, scalable, and fully documented code architecture that developers love working with.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-medium mb-4"
            >
              Why Choose Us
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-4xl font-bold mb-6"
            >
              The PrestigeWaveMedia Advantage
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-zinc-400 mb-8"
            >
              We don't just build websites; we engineer digital growth engines.
              Our proven methodology ensures excellence at every stage of the
              lifecycle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg"
              >
                Start Your Project
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                        feature.bg,
                        feature.color,
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
