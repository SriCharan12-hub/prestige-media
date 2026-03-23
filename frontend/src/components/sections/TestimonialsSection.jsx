import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'CEO at ScaleTech',
    content: 'Prestige transformed our vision into reality. The sheer quality of their code and the breathtaking design they produced exceeded all our expectations.',
    avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Founder of Nova Growth',
    content: 'Working with this agency was a breath of fresh air. They communicated clearly, hit every deadline, and delivered a product that our users absolutely love.',
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 5
  },
  {
    name: 'Elena Rodriguez',
    role: 'Marketing Director, Loom',
    content: 'The ROI on the landing pages they built for us has been phenomenal. Their understanding of conversion-centered design is second to none.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-slate-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-4"
          >
            Client Success
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Don't Just Take Our Word For It
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-zinc-400"
          >
            Hear from the leaders and visionaries who have partnered with us to build extraordinary digital products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col"
            >
              <div className="absolute top-8 right-8 text-slate-200 dark:text-zinc-800">
                <Quote className="w-12 h-12 rotate-180" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-lg text-slate-700 dark:text-zinc-300 mb-8 flex-grow relative z-10 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 dark:border-zinc-800" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-500 dark:text-zinc-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
