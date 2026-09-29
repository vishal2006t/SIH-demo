import React from 'react';
import { ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-4 sm:px-6 lg:px-8 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            🇮🇳
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              SMART TRAINING SYSTEM – SIH 2026 Prototype
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              National Council for Cooperative Training (NCCT) • Ministry of Cooperation, Government of India
            </p>
          </div>
        </div>

        {/* Ecosystem Flow Micro-Breadcrumb */}
        <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
          <span>Training</span>
          <span>→</span>
          <span>Learning</span>
          <span>→</span>
          <span>Attendance</span>
          <span>→</span>
          <span>Assessment</span>
          <span>→</span>
          <span className="text-blue-600 dark:text-blue-400">AI Skill Analysis</span>
          <span>→</span>
          <span>Certification</span>
          <span>→</span>
          <span>Employment</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-3 h-3 text-blue-500" />
            Hackathon Edition 2026
          </span>
          <span className="text-[11px] text-slate-400">Frontend UI Sandbox</span>
        </div>

      </div>
    </footer>
  );
};
