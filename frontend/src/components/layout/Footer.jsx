import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-50 dark:bg-zinc-950 border-t border-black/5 dark:border-white/5 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-xl font-bold tracking-tight">PrestigeWaveMedia</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-xs">
              Transforming ambitious ideas into stunning digital experiences. We build web applications that perform and convert.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#home" className="text-sm text-slate-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-sm text-slate-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-sm text-slate-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#portfolio" className="text-sm text-slate-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">Portfolio</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-slate-500 dark:text-zinc-400">prestigewavemedia@gmail.com</li>
              <li className="text-sm text-slate-500 dark:text-zinc-400">+91 81250 74369</li>
              <li className="text-sm text-slate-500 dark:text-zinc-400 mt-2">Hyderabad, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-slate-500 dark:text-zinc-500">
            &copy; {currentYear} PrestigeWaveMedia. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-500">
            Made with <span className="text-red-500">♥</span> globally
          </div>
        </div>
      </div>
    </footer>
  );
}
