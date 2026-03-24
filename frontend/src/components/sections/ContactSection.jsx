import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', service: 'web application' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  // OTP flow states
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [contactId, setContactId] = useState(null);
  
  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id || e.target.name]: e.target.value }));
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToastMessage(null);

    try {
      const response = await fetch('http://localhost:8000/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsOtpSent(true);
        setContactId(data.data.contactId);
        setToastMessage({ type: 'success', text: 'Verification code sent to your email!' });
      } else {
        throw new Error(data.message || 'Failed to send OTP');
      }
      
    } catch (error) {
      console.error(error);
      setToastMessage({ type: 'error', text: error.message || 'Failed to connect. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/contact/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp, contactId }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsVerified(true);
        setToastMessage({ type: 'success', text: 'Thank you! Your inquiry has been submitted successfully.' });
        setFormData({ name: '', email: '', message: '', phone: '', service: 'web application' });
      } else {
        throw new Error(data.message || 'Invalid or expired code');
      }
    } catch (error) {
      console.error(error);
      setToastMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'web application',
    'branding',
    'content creation',
    'video editing',
    'automation',
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 md:px-6 relative">
      
        {/* Toast Notification */}
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg border font-medium flex items-center gap-2 ${
              toastMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/80 dark:border-emerald-800 dark:text-emerald-100' : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/80 dark:border-red-800 dark:text-red-100'
            }`}
          >
            {toastMessage.text}
          </motion.div>
        )}

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4"
          >
            Get In Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            {isVerified ? "Success!" : "Let's Build Something Great"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-zinc-400"
          >
            {isVerified 
              ? "We've received your inquiry and will get back to you within 24 hours."
              : "Ready to start your next project? Drop us a line and let's discuss how we can help you achieve your goals."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
              
              {isVerified ? (
                <div className="text-center py-12">
                   <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10" />
                   </div>
                   <h3 className="text-2xl font-bold mb-4">Inquiry Received</h3>
                   <p className="text-slate-600 dark:text-zinc-400 mb-8">
                     Your email has been verified and your inquiry submitted.
                   </p>
                   <button 
                    onClick={() => { setIsVerified(false); setIsOtpSent(false); }}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                   >
                     Send Another Message
                   </button>
                </div>
              ) : !isOtpSent ? (
                <>
                  <h3 className="text-2xl font-bold mb-8">Send us a message</h3>
                  <form onSubmit={handleInitialSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                        placeholder="john@company.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">Service Needed</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white appearance-none"
                      >
                        {services.map(srv => (
                          <option key={srv} value={srv}>{srv.charAt(0).toUpperCase() + srv.slice(1)}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none dark:text-white"
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-bold text-center text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending Code...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Get Verification Code
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-6">
                  <h3 className="text-2xl font-bold mb-4">Verify Email</h3>
                  <p className="text-slate-600 dark:text-zinc-400 mb-8">
                    We've sent a 6-digit verification code to <strong>{formData.email}</strong>. Please enter it below to complete your submission.
                  </p>
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div>
                      <label htmlFor="otp" className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">Verification Code</label>
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                        className="w-full px-4 py-4 text-center text-2xl tracking-[0.5em] font-mono rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                        placeholder="000000"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-bold text-center text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Submit Inquiry
                        </>
                      )}
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => setIsOtpSent(false)}
                      className="w-full text-center text-sm text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Wait, entered wrong details? Go back
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none h-full">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="flex flex-col gap-8">
                
                <div className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5 transition-colors hover:bg-slate-100 dark:hover:bg-zinc-800">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Email</h4>
                    <a href="mailto:prestigewavemedia@gmail.com" className="text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      prestigewavemedia@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5 transition-colors hover:bg-slate-100 dark:hover:bg-zinc-800">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Phone</h4>
                    <a href="tel:+918125074369" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      +91 81250 74369
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-white/5 transition-colors hover:bg-slate-100 dark:hover:bg-zinc-800">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Office</h4>
                    <p className="text-slate-600 dark:text-zinc-400">
                      Hyderabad, India
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
