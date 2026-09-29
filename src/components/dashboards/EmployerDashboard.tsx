import React, { useState } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Users,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Briefcase,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Eye,
  Building,
  ArrowRight,
  TrendingUp,
  MapPin,
  IndianRupee,
  FileCheck2
} from 'lucide-react';
import { mockCandidates, mockTraineeProfile, mockCertificates } from '../../data/mockData';
import { CandidateItem } from '../../types';
import { SkillPassportModal } from '../modals/SkillPassportModal';

export const EmployerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [candidates, setCandidates] = useState<CandidateItem[]>(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateItem | null>(null);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [postJobSuccess, setPostJobSuccess] = useState(false);

  // New Job form state
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('Madurai / Coimbatore');
  const [newJobOpenings, setNewJobOpenings] = useState(10);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Post Jobs', icon: PlusCircle },
    { name: 'Candidates', icon: Users },
    { name: 'AI Matching', icon: Sparkles, badge: 'Smart' },
    { name: 'Skill Verification', icon: ShieldCheck },
    { name: 'Recruiter Profile', icon: UserCheck }
  ];

  const handleStatusChange = (candId: string, newStatus: any) => {
    setCandidates(prev => prev.map(c => c.id === candId ? { ...c, status: newStatus } : c));
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    setPostJobSuccess(true);
    setTimeout(() => {
      setPostJobSuccess(false);
      setIsPostJobOpen(false);
      setNewJobTitle('');
    }, 1200);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
        <div className="mb-6 px-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <Building className="w-4 h-4" />
            <span>State Apex Bank</span>
          </div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
            Recruiter & HR Portal
          </h2>
          <p className="text-[11px] text-slate-400">Cooperative Hiring Hub</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  if (item.name === 'Post Jobs') {
                    setIsPostJobOpen(true);
                  } else {
                    setActiveTab(item.name);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Verification guarantee card */}
        <div className="mt-8 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs">
          <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>NCCT Authenticated</span>
          </div>
          <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-1 leading-relaxed">
            All candidate Skill Passports are backed by national institutional training records.
          </p>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-x-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md">
                Verified Recruiter
              </span>
              <span className="text-xs text-slate-400">• Tamil Nadu State Apex Cooperative Bank</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Cooperative Talent Acquisition & AI Matching
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Source verified NCCT diploma graduates and streamline hiring for PACS, DCCB, and Apex institutions.
            </p>
          </div>

          <button
            onClick={() => setIsPostJobOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Opening</span>
          </button>
        </div>

        {/* 4 Dashboard Summary Cards: Active Jobs, Applications, Shortlisted, Verified Candidates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Jobs</span>
              <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <Briefcase className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">14</span>
              <span className="text-[11px] font-bold text-amber-600">82 Openings</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Branch and Head Office</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Applications</span>
              <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">128</span>
              <span className="text-[11px] font-bold text-blue-600">+14 Today</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Direct Skill Passport submissions</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Shortlisted</span>
              <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                <UserCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">32</span>
              <span className="text-[11px] font-bold text-teal-600">Interview stage</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Avg 88% Match score</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Verified Candidates</span>
              <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">94</span>
              <span className="text-[11px] font-bold text-emerald-600">100% Tamper-proof</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Zero background verification latency</p>
          </div>

        </div>

        {/* Section: AI MATCHING SHOWCASE FOR DIGITAL OPERATIONS ASSISTANT */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-4 border border-blue-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Live AI Match Model
              </div>
              <h3 className="text-xl font-bold text-white">
                Job Role: Digital Operations Assistant
              </h3>
              <p className="text-xs text-blue-200">
                Semantic skill matching across PACS Computerization & Accounting credentials
              </p>
            </div>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 self-start sm:self-auto">
              24 Vacancies • Bengaluru / Remote
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              { name: "Candidate A – Aarav Sharma", match: 92, cert: "NCCT-2026-DCBM-84920", skillHighlight: "PACS ERP, Core Banking, Auditing", status: "Top Match" },
              { name: "Candidate B – Priya Venkatesh", match: 87, cert: "NCCT-2026-PACS-78912", skillHighlight: "MIS Data Entry, Member Relations", status: "Strong Match" },
              { name: "Candidate C – Karan Mathur", match: 81, cert: "NCCT-2025-HDCM-65230", skillHighlight: "Computer Accounting, Tally ERP", status: "Qualified" },
            ].map((cand, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{cand.name}</span>
                  <span className="text-xs font-black text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    {cand.match}%
                  </span>
                </div>
                <p className="text-[11px] text-blue-200">
                  Cert: <strong className="font-mono text-white">{cand.cert}</strong>
                </p>
                <p className="text-[11px] text-slate-300">
                  {cand.skillHighlight}
                </p>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-blue-300">{cand.status}</span>
                  <button
                    onClick={() => {
                      setSelectedCandidate(candidates[idx]);
                      setIsPassportModalOpen(true);
                    }}
                    className="text-amber-300 hover:text-white font-semibold underline text-xs"
                  >
                    View Passport →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: CANDIDATE APPLICANTS TABLE */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Candidate Applications & Skill Verification
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verified candidate pool with AI Match percentage and live passport verification
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Search className="w-3.5 h-3.5" /> Filter by Match:
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-700">
                &gt; 75% Score
              </span>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Candidate</th>
                  <th className="p-3.5">Verified Skills</th>
                  <th className="p-3.5">Certificate ID</th>
                  <th className="p-3.5">Experience</th>
                  <th className="p-3.5">AI Match</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {candidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <img src={cand.avatar} alt={cand.candidate} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{cand.candidate}</span>
                          <span className="text-[10px] text-slate-400">{cand.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {cand.skills.slice(0, 2).map((sk, idx) => (
                          <span key={idx} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-blue-600 dark:text-blue-400">
                      {cand.certificate}
                    </td>
                    <td className="p-3.5">{cand.experience}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 font-bold text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        {cand.aiMatch}%
                      </span>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={cand.status}
                        onChange={(e) => handleStatusChange(cand.id, e.target.value)}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="In Review">In Review</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Offered">Offered</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setSelectedCandidate(cand);
                          setIsPassportModalOpen(true);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 hover:bg-amber-100 rounded-lg transition"
                      >
                        Inspect Passport
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Skill Passport Inspector Modal */}
      <SkillPassportModal
        isOpen={isPassportModalOpen}
        onClose={() => setIsPassportModalOpen(false)}
        profile={mockTraineeProfile}
        certificates={mockCertificates}
      />

      {/* Post Job Modal */}
      {isPostJobOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Post Cooperative Opening</h3>
              <button onClick={() => setIsPostJobOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {postJobSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 dark:text-white">Opening Posted Live!</h4>
                <p className="text-xs text-slate-500">Cooperative candidates will receive AI match alerts.</p>
              </div>
            ) : (
              <form onSubmit={handlePostJob} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Job Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PACS Senior Accountant"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Number of Vacancies</label>
                  <input
                    type="number"
                    min="1"
                    value={newJobOpenings}
                    onChange={(e) => setNewJobOpenings(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPostJobOpen(false)}
                    className="px-3.5 py-1.5 rounded-lg hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-amber-600 text-white font-semibold shadow-sm"
                  >
                    Broadcast Opening
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
