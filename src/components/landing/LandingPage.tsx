import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Shield,
  GraduationCap,
  User,
  Briefcase,
  Layers,
  QrCode,
  ScanFace,
  BrainCircuit,
  Award,
  FileCheck2,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  Building2,
  Users2,
  Compass,
  ArrowDown
} from 'lucide-react';
import { Role, Language } from '../../types';
import { translations } from '../../utils/translations';

interface LandingPageProps {
  onSelectRole: (role: Role) => void;
  language: Language;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole, language }) => {
  const t = translations[language];

  const ecosystemFlowSteps = [
    { num: '01', title: 'Registration', desc: 'Aadhaar / NCCT Institute Enrolment', icon: User, color: 'from-blue-600 to-indigo-600' },
    { num: '02', title: 'Learning', desc: 'Multilingual LMS & Video Modules', icon: GraduationCap, color: 'from-indigo-600 to-purple-600' },
    { num: '03', title: 'Attendance', desc: 'AI Face & Geo-tagged QR Terminal', icon: ScanFace, color: 'from-purple-600 to-pink-600' },
    { num: '04', title: 'Assessment', desc: 'Periodic Quizzes & Practical Labs', icon: FileCheck2, color: 'from-teal-600 to-emerald-600' },
    { num: '05', title: 'AI Skill Analysis', desc: 'ML Diagnostic & Gap Engine', icon: BrainCircuit, color: 'from-blue-600 to-cyan-600', highlight: true },
    { num: '06', title: 'Certification', desc: 'Tamper-Proof National Credential', icon: Award, color: 'from-amber-500 to-orange-600' },
    { num: '07', title: 'Skill Passport', desc: 'Verifiable Digital Identity Card', icon: Shield, color: 'from-emerald-600 to-teal-700' },
    { num: '08', title: 'Job Matching', desc: 'Automated AI Recruiter Scoring', icon: TrendingUp, color: 'from-blue-700 to-indigo-800' },
    { num: '09', title: 'Employment', desc: 'Direct Placement in Apex Coops', icon: Briefcase, color: 'from-purple-700 to-slate-900' },
  ];

  const featureCards = [
    {
      title: "Training ERP",
      desc: "End-to-end management of training programmes, faculty allocation, hostel occupancy, and logistics.",
      icon: Building2,
      badge: "ERP Suite",
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/60"
    },
    {
      title: "Multilingual LMS",
      desc: "Localized course delivery across English, Tamil, Hindi, Telugu, and Malayalam with video lectures.",
      icon: GraduationCap,
      badge: "5 Languages",
      color: "text-teal-600 bg-teal-50 dark:bg-teal-950/60"
    },
    {
      title: "QR / Face Attendance",
      desc: "Cryptographically stamped attendance tracking via smart QR scan or facial recognition terminal.",
      icon: ScanFace,
      badge: "Biometric AI",
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/60"
    },
    {
      title: "AI Skill Analysis",
      desc: "Automated diagnostic engine analyzing exam scores and attendance velocity to detect skill gaps.",
      icon: BrainCircuit,
      badge: "Interactive Demo",
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60"
    },
    {
      title: "Digital Certification",
      desc: "Tamper-proof certificates with digital signatures and instant online verification hashes.",
      icon: Award,
      badge: "Verifiable",
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/60"
    },
    {
      title: "Skill Passport",
      desc: "A lifelong portable digital passport showcasing verified competencies, hours, and grades.",
      icon: Shield,
      badge: "Portable ID",
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60"
    },
    {
      title: "AI Job Matching",
      desc: "Smart semantic matching aligning cooperative candidates directly with cooperative bank vacancies.",
      icon: TrendingUp,
      badge: "Match Engine",
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/60"
    },
    {
      title: "Career Chatbot",
      desc: "Conversational AI assistant answering career questions, recommending courses, and clarifying gaps.",
      icon: MessageSquare,
      badge: "CoopCareer AI",
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/60"
    }
  ];

  const roleCards = [
    {
      role: 'admin' as Role,
      title: "1. NCCT Admin Portal",
      subtitle: "National Council for Cooperative Training",
      desc: "Pan-India governance, programme monitoring, national analytics charts, and institute oversight.",
      icon: Shield,
      accent: "from-blue-600 to-indigo-600",
      stats: "28 Institutes • 142 Active Programmes"
    },
    {
      role: 'trainer' as Role,
      title: "2. Trainer / Institute Portal",
      subtitle: "RICMs & State Training Institutes",
      desc: "Timetable builder, hostel monitoring, logistics inventory, QR/Face attendance terminal & quizzes.",
      icon: GraduationCap,
      accent: "from-teal-600 to-emerald-600",
      stats: "8 Batches • 340 Trainees Enrolled"
    },
    {
      role: 'trainee' as Role,
      title: "3. Trainee Portal",
      subtitle: "Learners & Cooperative Staff",
      desc: "Course LMS, video streams, AI Skill Analysis radar, digital certificates, passport & job matching.",
      icon: User,
      accent: "from-purple-600 to-indigo-600",
      stats: "78% Skill Index • 6 Certified Courses"
    },
    {
      role: 'employer' as Role,
      title: "4. Employer / Recruiter Portal",
      subtitle: "Apex & District Cooperative Banks",
      desc: "Job posting dashboard, candidate passport verification, and AI compatibility score matching.",
      icon: Briefcase,
      accent: "from-amber-600 to-orange-600",
      stats: "14 Open Jobs • 92% Match Candidates"
    }
  ];

  return (
    <div className="space-y-16 py-6 animate-fadeIn">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-8 md:p-16 shadow-2xl border border-blue-800/40 text-center">
        
        {/* Subtle decorative glow elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-teal-500/10 blur-[90px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Institutional Emblem pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold text-blue-200 max-w-full">
            <span className="text-sm">🇮🇳</span>
            <span>SIH 2026 Prototype</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-300">Ministry of Cooperation</span>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-teal-200">
            {t.heroTitle || "SMART TRAINING SYSTEM"}
          </h1>

          <p className="text-sm sm:text-lg md:text-2xl font-medium text-blue-200 max-w-3xl mx-auto leading-relaxed">
            {t.heroSubtitle || "AI-Powered Cooperative Training, Skill Development & Employment Ecosystem"}
          </p>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.heroDesc || "An integrated digital platform connecting training, learning, assessment, certification, skill verification and employment across India's cooperative sector."}
          </p>

          {/* Hero CTAs */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
            <button
              onClick={() => onSelectRole('trainee')}
              className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-glow-blue transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>{t.explorePlatform || "Explore Platform"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('role-selection-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-teal-300" />
              <span>{t.viewDemo || "View Demo Roles"}</span>
            </button>
          </div>

          {/* Quick Stats Strip */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold text-white">28</span>
              <span className="text-xs text-blue-200">RICM / ICM Institutes</span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold text-teal-400">24,850+</span>
              <span className="text-xs text-blue-200">Trainees Enrolled</span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold text-amber-300">18,420+</span>
              <span className="text-xs text-blue-200">Passports Issued</span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold text-purple-400">92%</span>
              <span className="text-xs text-blue-200">Placement Accuracy</span>
            </div>
          </div>

        </div>

      </section>

      {/* Main Ecosystem Flow Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            End-To-End System Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Integrated Cooperative Ecosystem Flow
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A seamless digital pipeline tracking candidate progress from enrolment to verified employment.
          </p>
        </div>

        {/* 9-Step Visual Flow Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-2.5">
          {ecosystemFlowSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                step.highlight
                  ? 'bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-950/60 dark:to-indigo-950/60 border-blue-400 shadow-glow-blue'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {step.num}
                  </span>
                  <div className={`p-1.5 rounded-xl bg-gradient-to-br ${step.color} text-white shadow-sm`}>
                    {React.createElement(step.icon, { className: 'w-3.5 h-3.5' })}
                  </div>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                  {step.desc}
                </p>
              </div>

              {idx < ecosystemFlowSteps.length - 1 && (
                <div className="hidden lg:block text-right text-slate-300 dark:text-slate-700 mt-2 font-black text-xs">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Role Selection Cards Section */}
      <section id="role-selection-section" className="space-y-6 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
            Interactive Presentation Portals
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.selectRole || "Select Portal to Access Demo"}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Click any stakeholder role below to launch its customized dashboard with live demo data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleCards.map((roleItem) => (
            <div
              key={roleItem.role}
              onClick={() => onSelectRole(roleItem.role)}
              className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${roleItem.accent}`}></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${roleItem.accent} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    {React.createElement(roleItem.icon, { className: 'w-6 h-6' })}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    Launch →
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {roleItem.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  {roleItem.subtitle}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  {roleItem.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 truncate">
                  {roleItem.stats}
                </span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 group-hover:bg-blue-600 group-hover:text-white transition">
                  Open
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards Grid Section */}
      <section className="space-y-6 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            Core Modules
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Comprehensive Platform Features
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Engineered specifically to solve capacity building challenges across Indian cooperatives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featureCards.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-md transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${feat.color}`}>
                  {React.createElement(feat.icon, { className: 'w-5 h-5' })}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {feat.badge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive AI Preview Banner */}
      <section className="rounded-3xl p-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-800/40">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Two Working Demo Highlights
          </div>
          <h3 className="text-2xl font-bold text-white">
            Experience AI Skill Analysis & Career Chatbot
          </h3>
          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
            Test the live Recharts diagnostic model and interact directly with CoopCareer AI to see personalized job matching and course suggestions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onSelectRole('trainee')}
            className="px-5 py-2.5 rounded-xl bg-white text-purple-900 hover:bg-purple-50 text-xs font-bold shadow-md transition flex items-center gap-2"
          >
            <span>Try AI Skill Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
