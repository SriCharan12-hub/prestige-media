import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const plans = [
  {
    name: 'Basic',
    description: 'Perfect for small businesses and personal brands looking to establish an online presence.',
    price: '$2,999',
    features: [
      'Custom 5-page website',
      'Mobile Responsive Design',
      'Basic SEO Setup',
      'Contact Form Integration',
      '1 Month Support'
    ],
    popular: false,
    cta: 'Get Started'
  },
  {
    name: 'Standard',
    description: 'Ideal for growing companies needing advanced features and custom integrations.',
    price: '$5,999',
    features: [
      'Up to 15 pages',
      'Premium Custom Design',
      'Advanced SEO & Analytics',
      'CMS Integration (WordPress/Sanity)',
      'E-commerce Capabilities',
      '3 Months Support'
    ],
    popular: true,
    cta: 'Choose Standard'
  },
  {
    name: 'Premium',
    description: 'For large enterprises requiring complex web applications and dedicated infrastructure.',
    price: 'Custom',
    features: [
      'Unlimited Pages',
      'Full Stack Web Application',
      'Custom API Development',
      'Microservices Architecture',
      'Dedicated Server Setup',
      '24/7 Priority Support'
    ],
    popular: false,
    cta: 'Contact Sales'
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4"
          >
            Transparent Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Invest in Your Digital Future
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-zinc-400"
          >
            Clear, value-driven pricing structures designed to deliver maximum ROI for projects of any scale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'relative p-8 rounded-3xl bg-white dark:bg-zinc-900 border flex flex-col h-full',
                plan.popular 
                  ? 'border-blue-500 shadow-2xl shadow-blue-500/20 md:-translate-y-4 md:h-[105%]' 
                  : 'border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-none'
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-bold rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-500 dark:text-zinc-400 text-sm h-10 mb-6">{plan.description}</p>
                <div className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
                  {plan.price}
                </div>
              </div>

              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={cn(
                  'w-full py-4 rounded-xl font-bold text-center transition-colors',
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-700'
                )}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
