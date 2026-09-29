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
  FileCheck2,
  Trash2,
  Edit2,
  Download,
  X,
  Calendar,
  Video,
  FileText,
  Check,
  AlertCircle,
  Plus,
  Menu
} from 'lucide-react';
import {
  mockCandidates,
  mockTraineeProfile,
  mockCertificates,
  mockJobPostings,
  mockInterviews,
  mockHiredCandidates
} from '../../data/mockData';
import { CandidateItem, JobPostingItem, InterviewItem, HiredCandidateItem } from '../../types';
import { SkillPassportModal } from '../modals/SkillPassportModal';
import { ReportPreviewModal } from '../modals/ReportPreviewModal';

interface EmployerDashboardProps {
  isMobileNavOpen?: boolean;
  onCloseMobileNav?: () => void;
  onOpenMobileNav?: () => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  isMobileNavOpen,
  onCloseMobileNav,
  onOpenMobileNav
}) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [localMobileNavOpen, setLocalMobileNavOpen] = useState(false);
  const mobileNavOpen = isMobileNavOpen !== undefined ? isMobileNavOpen : localMobileNavOpen;
  const closeNav = onCloseMobileNav || (() => setLocalMobileNavOpen(false));
  const openNav = onOpenMobileNav || (() => setLocalMobileNavOpen(true));

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // State: Job Postings
  const [jobPostings, setJobPostings] = useState<JobPostingItem[]>(mockJobPostings);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPostingItem | null>(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState<JobPostingItem | null>(null);

  const [jobForm, setJobForm] = useState({
    title: '',
    department: 'Rural Credit & Field Operations',
    location: 'Madurai / Coimbatore, Tamil Nadu',
    openings: 10,
    salary: '₹4.5 - 6.0 LPA',
    type: 'Full-time' as 'Full-time' | 'Contract' | 'Apprenticeship'
  });

  // State: Candidates & Applications
  const [candidates, setCandidates] = useState<CandidateItem[]>(mockCandidates);
  const [candidateSearch, setCandidateSearch] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateItem | null>(null);
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);

  // State: Interviews
  const [interviews, setInterviews] = useState<InterviewItem[]>(mockInterviews);
  const [isScheduleInterviewOpen, setIsScheduleInterviewOpen] = useState(false);
  const [interviewForm, setInterviewForm] = useState({
    candidateName: 'Aarav Sharma',
    jobTitle: 'Cooperative Field Officer',
    date: '2026-03-08',
    time: '11:00 AM',
    interviewer: 'Tmt. Radhika Raman (Head - Rural Credit)',
    mode: 'Online (Video)' as 'Online (Video)' | 'In-Person (HQ)'
  });

  // State: Hired Candidates
  const [hiredCandidates, setHiredCandidates] = useState<HiredCandidateItem[]>(mockHiredCandidates);
  const [viewingOfferLetter, setViewingOfferLetter] = useState<HiredCandidateItem | null>(null);

  // State: Reports
  const [viewingReport, setViewingReport] = useState<string | null>(null);

  // State: Profile
  const [companyProfile, setCompanyProfile] = useState({
    orgName: "Tamil Nadu State Apex Cooperative Bank Ltd. (TNSC Bank)",
    regNo: "COOP-TN-APEX-1968",
    hrHead: "Tmt. Radhika Raman, General Manager (HR)",
    email: "hr.recruitment@apexbank.tn.gov.in",
    phone: "+91 44 2534 8900",
    hq: "NSC Bose Road, Chennai, Tamil Nadu",
    preferredInstitutes: "ICM Madurai, RICM Bengaluru, VAMNICOM Pune",
    annualQuota: 120
  });
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Job Postings', icon: PlusCircle, badge: `${jobPostings.length}` },
    { name: 'Candidates', icon: Users, badge: `${candidates.length}` },
    { name: 'AI Candidate Matching', icon: Sparkles, badge: 'Smart' },
    { name: 'Applications', icon: FileCheck2, badge: '193' },
    { name: 'Interviews', icon: Calendar, badge: `${interviews.length}` },
    { name: 'Hired Candidates', icon: UserCheck, badge: `${hiredCandidates.length}` },
    { name: 'Reports', icon: Briefcase },
    { name: 'Profile', icon: Building }
  ];

  // Job Posting Handlers
  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJob) {
      setJobPostings(prev => prev.map(j => j.id === editingJob.id ? { ...j, ...jobForm } : j));
      showToast(`Job posting "${jobForm.title}" updated.`);
    } else {
      const newJob: JobPostingItem = {
        id: `POST-${Date.now().toString().slice(-4)}`,
        ...jobForm,
        postedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Active',
        applicantsCount: 0
      };
      setJobPostings(prev => [newJob, ...prev]);
      showToast(`New job posting "${jobForm.title}" published!`);
    }
    setIsPostJobOpen(false);
    setEditingJob(null);
  };

  const handleDeleteJob = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete job posting "${title}"?`)) {
      setJobPostings(prev => prev.filter(j => j.id !== id));
      showToast(`Job posting "${title}" deleted.`);
    }
  };

  const openEditJob = (job: JobPostingItem) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      openings: job.openings,
      salary: job.salary,
      type: job.type
    });
    setIsPostJobOpen(true);
  };

  // Candidate Status Handlers
  const handleUpdateCandidateStatus = (candId: string, status: any) => {
    setCandidates(prev => prev.map(c => c.id === candId ? { ...c, status } : c));
    showToast(`Candidate status changed to "${status}".`);
  };

  // Interview Handlers
  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    const newInt: InterviewItem = {
      id: `INT-${Date.now().toString().slice(-4)}`,
      ...interviewForm,
      status: 'Scheduled'
    };
    setInterviews(prev => [newInt, ...prev]);
    setIsScheduleInterviewOpen(false);
    showToast(`Interview scheduled with ${interviewForm.candidateName}.`);
  };

  const handleCancelInterview = (id: string) => {
    if (window.confirm("Cancel this scheduled interview?")) {
      setInterviews(prev => prev.map(i => i.id === id ? { ...i, status: 'Cancelled' as const } : i));
      showToast("Interview cancelled.");
    }
  };

  const filteredCandidates = candidates.filter(c =>
    c.candidate.toLowerCase().includes(candidateSearch.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(candidateSearch.toLowerCase()))
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-amber-600 text-white rounded-xl shadow-xl animate-bounce text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Mobile Dashboard Top Bar (< md) */}
      <div className="md:hidden flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-20 shadow-sm">
        <div className="flex items-center gap-2.5">
          <button
            onClick={openNav}
            className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            aria-label="Open Employer Menu"
          >
            <Menu className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-amber-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Recruiter & HR Portal
              </h3>
            </div>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">{activeTab}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 font-bold">
            Employer / Bank
          </span>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={closeNav}
        />
      )}

      {/* Mobile Sidebar Drawer (< md) */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white dark:bg-slate-900 z-50 p-4 shadow-2xl flex flex-col md:hidden overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 px-1">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Building className="w-4 h-4" />
              <span>State Apex Bank</span>
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              Recruiter & HR Portal
            </h2>
          </div>
          <button
            onClick={closeNav}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  closeNav();
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
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      isActive ? 'bg-white text-amber-700' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Recruiter Quick Status in Mobile Drawer */}
        <div className="mt-6 p-3.5 rounded-xl bg-amber-50/50 dark:bg-slate-800/40 border border-amber-200/50 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between text-amber-800 dark:text-amber-400 text-[11px] font-bold">
            <span>Verified Talent Pool</span>
            <span className="text-emerald-600">✓ On-Chain</span>
          </div>
          <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">Direct NCCT Campus Link</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Instant Skill Passport Verification</p>
        </div>
      </aside>

      {/* Desktop Sidebar Navigation (>= md) */}
      <aside className="hidden md:block md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
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
                onClick={() => setActiveTab(item.name)}
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
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    isActive ? 'bg-white text-amber-700' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Recruiter Quick Status */}
        <div className="mt-8 p-3.5 rounded-xl bg-amber-50/50 dark:bg-slate-800/40 border border-amber-200/50 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between text-amber-800 dark:text-amber-400 text-[11px] font-bold">
            <span>Verified Talent Pool</span>
            <span className="text-emerald-600">✓ On-Chain</span>
          </div>
          <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">Direct NCCT Campus Link</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Instant Skill Passport Verification</p>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-3 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden min-w-0 max-w-full">

        {/* ========================================================================= */}
        {/* VIEW 1: DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md">
                    Corporate Hiring Suite
                  </span>
                  <span className="text-xs text-slate-400">• Tamil Nadu State Apex Cooperative Bank Ltd.</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Recruiter & Employment Portal
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Access accredited graduates from 28 NCCT institutes with tamper-proof Digital Skill Passports.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingJob(null);
                    setJobForm({
                      title: '',
                      department: 'Rural Credit & Field Operations',
                      location: 'Madurai / Coimbatore',
                      openings: 10,
                      salary: '₹4.5 - 6.0 LPA',
                      type: 'Full-time'
                    });
                    setIsPostJobOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Post New Vacancy</span>
                </button>
              </div>
            </div>

            {/* 5 Summary Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Active Jobs</span>
                  <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600">
                    <Briefcase className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{jobPostings.length}</span>
                  <span className="text-xs font-bold text-amber-600">Live</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">84 Total Openings</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Talent Pool</span>
                  <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
                    <Users className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{candidates.length}</span>
                  <span className="text-xs font-bold text-blue-600">Screened</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Accredited by NCCT</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Applications</span>
                  <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600">
                    <FileCheck2 className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">193</span>
                  <span className="text-xs font-bold text-purple-600">+18 Today</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">With Digital Passports</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Interviews</span>
                  <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600">
                    <Calendar className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{interviews.length}</span>
                  <span className="text-xs font-bold text-teal-600">Scheduled</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Video & In-Person</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Hired</span>
                  <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                    <UserCheck className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{hiredCandidates.length}</span>
                  <span className="text-xs font-bold text-emerald-600">Accepted</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Onboarding this month</p>
              </div>
            </div>

            {/* Quick Candidate Match Pipeline */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Top AI-Matched Certified Candidates</h3>
                  <p className="text-xs text-slate-500">Pre-vetted against Field Officer and PACS ERP requirements</p>
                </div>
                <button onClick={() => setActiveTab('AI Candidate Matching')} className="text-xs font-semibold text-amber-600 hover:underline">
                  Launch AI Matching Engine →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidates.map((cand) => (
                  <div key={cand.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={cand.avatar} alt={cand.candidate} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{cand.candidate}</span>
                          <span className="px-1.5 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-700">
                            {cand.aiMatch}% Match
                          </span>
                        </div>
                        <p className="text-slate-400 mt-0.5">{cand.certificate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCandidate(cand);
                          setIsPassportModalOpen(true);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition"
                      >
                        Skill Passport
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: JOB POSTINGS */}
        {/* ========================================================================= */}
        {activeTab === 'Job Postings' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Vacancies & Job Postings</h2>
                <p className="text-xs text-slate-500">Manage hiring requisitions syndicated across 28 NCCT training institutions</p>
              </div>
              <button
                onClick={() => {
                  setEditingJob(null);
                  setJobForm({
                    title: '',
                    department: 'Rural Credit & Field Operations',
                    location: 'Madurai / Coimbatore',
                    openings: 12,
                    salary: '₹4.5 - 6.0 LPA',
                    type: 'Full-time'
                  });
                  setIsPostJobOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Create Job Posting</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobPostings.map((job) => (
                <div key={job.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base text-slate-900 dark:text-white">{job.title}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        {job.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-amber-600 mt-1">{job.department}</p>
                    <div className="mt-2 space-y-1 text-xs text-slate-500">
                      <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</p>
                      <p><strong>Openings:</strong> {job.openings} Positions • <strong>Salary:</strong> {job.salary}</p>
                      <p className="text-[11px] text-slate-400">Posted on: {job.postedDate} • {job.applicantsCount} Applicants</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setSelectedJobDetails(job)}
                      className="font-semibold text-amber-600 hover:underline"
                    >
                      View Requisition
                    </button>
                    <div className="space-x-1">
                      <button
                        onClick={() => openEditJob(job)}
                        className="p-1.5 text-slate-500 hover:text-amber-600 rounded-lg hover:bg-slate-100"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id, job.title)}
                        className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: CANDIDATES */}
        {/* ========================================================================= */}
        {activeTab === 'Candidates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Certified Candidates Talent Pool</h2>
                <p className="text-xs text-slate-500">Graduates holding accredited NCCT certificates and verified digital passports</p>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by candidate or skills..."
                  value={candidateSearch}
                  onChange={(e) => setCandidateSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Candidate Name</th>
                      <th className="p-3.5">Verified Credentials</th>
                      <th className="p-3.5">Domain Skills</th>
                      <th className="p-3.5">Experience</th>
                      <th className="p-3.5">AI Match</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredCandidates.map((cand) => (
                      <tr key={cand.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                          <div className="flex items-center gap-2">
                            <img src={cand.avatar} alt={cand.candidate} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <span>{cand.candidate}</span>
                              <span className="block text-[10px] text-slate-400">{cand.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 font-mono text-emerald-600 font-bold">{cand.certificate}</td>
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1">
                            {cand.skills.map((s, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3.5">{cand.experience}</td>
                        <td className="p-3.5 font-bold text-amber-600">{cand.aiMatch}%</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">
                            {cand.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => setSelectedCandidate(cand)}
                            className="px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition"
                          >
                            Dossier
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCandidate(cand);
                              setIsPassportModalOpen(true);
                            }}
                            className="px-2.5 py-1 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition"
                          >
                            Passport
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: AI CANDIDATE MATCHING */}
        {/* ========================================================================= */}
        {activeTab === 'AI Candidate Matching' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Neural Match Engine
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">AI Talent Compatibility Matrix</h2>
              <p className="text-xs text-slate-500">Cross-analyzing required banking competencies with verified student assessments</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidates.map((cand) => (
                <div key={cand.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={cand.avatar} alt={cand.candidate} className="w-12 h-12 rounded-full object-cover border border-amber-400" />
                        <div>
                          <h3 className="font-bold text-base text-slate-900 dark:text-white">{cand.candidate}</h3>
                          <p className="text-xs text-slate-400">{cand.experience}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-black text-emerald-600">{cand.aiMatch}%</span>
                        <span className="block text-[10px] text-slate-400">Match Score</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1.5 text-xs">
                      <p><strong>Verified Credentials:</strong> <span className="text-emerald-600 font-mono">{cand.certificate}</span></p>
                      <p><strong>Status:</strong> <span className="font-bold text-amber-600">{cand.status}</span></p>
                      <div className="pt-1">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Aligned Skills:</span>
                        <div className="flex flex-wrap gap-1">
                          {cand.skills.map((s, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold">
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedCandidate(cand);
                        setIsPassportModalOpen(true);
                      }}
                      className="text-xs font-semibold text-amber-600 hover:underline"
                    >
                      Audit Passport
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateCandidateStatus(cand.id, 'Shortlisted')}
                        className="px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => {
                          setInterviewForm(prev => ({ ...prev, candidateName: cand.candidate }));
                          setIsScheduleInterviewOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition"
                      >
                        Interview →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: APPLICATIONS */}
        {/* ========================================================================= */}
        {activeTab === 'Applications' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Received Applications Queue</h2>
                <p className="text-xs text-slate-500">Live submissions received from certified cooperative trainees</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Applicant</th>
                      <th className="p-3.5">Applied Position</th>
                      <th className="p-3.5">Application Date</th>
                      <th className="p-3.5">AI Match</th>
                      <th className="p-3.5">Pipeline Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {candidates.map((cand) => (
                      <tr key={cand.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{cand.candidate}</td>
                        <td className="p-3.5 font-semibold text-amber-600">Cooperative Field Officer</td>
                        <td className="p-3.5 text-slate-400">28 Feb 2026</td>
                        <td className="p-3.5 font-bold text-emerald-600">{cand.aiMatch}%</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            cand.status === 'Shortlisted' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {cand.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => handleUpdateCandidateStatus(cand.id, 'Shortlisted')}
                            className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => handleUpdateCandidateStatus(cand.id, 'In Review')}
                            className="px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                          >
                            Hold
                          </button>
                          <button
                            onClick={() => handleUpdateCandidateStatus(cand.id, 'Offered')}
                            className="px-2.5 py-1 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
                          >
                            Offer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 6: INTERVIEWS */}
        {/* ========================================================================= */}
        {activeTab === 'Interviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Scheduled Candidate Interviews</h2>
                <p className="text-xs text-slate-500">Live calendar of video interviews and campus assessment panels</p>
              </div>
              <button
                onClick={() => setIsScheduleInterviewOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Schedule Interview</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Candidate</th>
                      <th className="p-3.5">Target Role</th>
                      <th className="p-3.5">Date & Time</th>
                      <th className="p-3.5">Interviewer</th>
                      <th className="p-3.5">Mode</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {interviews.map((int) => (
                      <tr key={int.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{int.candidateName}</td>
                        <td className="p-3.5">{int.jobTitle}</td>
                        <td className="p-3.5 font-mono text-amber-600 font-bold">{int.date} • {int.time}</td>
                        <td className="p-3.5">{int.interviewer}</td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 font-semibold text-[10px]">
                            {int.mode.includes('Video') ? <Video className="w-3 h-3 text-blue-600" /> : <Building className="w-3 h-3 text-slate-600" />}
                            {int.mode}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            int.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {int.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          {int.status === 'Scheduled' ? (
                            <button
                              onClick={() => handleCancelInterview(int.id)}
                              className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                              Cancel
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400">Archived</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 7: HIRED CANDIDATES */}
        {/* ========================================================================= */}
        {activeTab === 'Hired Candidates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Placed & Hired Candidates</h2>
                <p className="text-xs text-slate-500">Official appointment letters issued to NCCT graduates</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hiredCandidates.map((hired) => (
                <div key={hired.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      ✓ {hired.status}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mt-2">{hired.candidateName}</h3>
                    <p className="text-xs font-semibold text-amber-600 mt-1">{hired.jobTitle}</p>
                    <p className="text-xs text-slate-500 mt-2">Alma Mater: {hired.institute}</p>
                    <p className="text-xs text-slate-500">Joining: <strong>{hired.joiningDate}</strong> • CTC: <strong className="text-slate-900 dark:text-white">{hired.ctc}</strong></p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={() => setViewingOfferLetter(hired)}
                      className="px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition"
                    >
                      View Offer Letter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 8: REPORTS */}
        {/* ========================================================================= */}
        {activeTab === 'Reports' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recruitment & Hiring Reports</h2>
                <p className="text-xs text-slate-500">Talent acquisition audit, institute recruitment velocity, and placement statistics</p>
              </div>
              <button
                onClick={() => showToast("Exporting comprehensive hiring reports as CSV bundle...")}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Reports (CSV)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "2026 Campus Placement Census - NCCT Madurai & Bengaluru", period: "Cohort 2026", count: "120 Offers Audited" },
                { title: "Cooperative Banking Skill Gaps & Retention Audit", period: "FY 2025-26", count: "State-Wide Data" },
                { title: "PACS ERP Certification & Hiring Demand Index", period: "Q1 2026", count: "42 Societies Surveyed" },
                { title: "Equal Opportunity & Affirmative Hiring Compliance Report", period: "Annual 2026", count: "Govt of India Format" }
              ].map((rep, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{rep.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{rep.period} • {rep.count}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                    <button
                      onClick={() => setViewingReport(rep.title)}
                      className="text-xs font-semibold text-amber-600 hover:underline"
                    >
                      Preview Report
                    </button>
                    <button
                      onClick={() => showToast(`Report "${rep.title}" downloaded.`)}
                      className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      <Download className="w-3 h-3" /> Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 9: PROFILE */}
        {/* ========================================================================= */}
        {activeTab === 'Profile' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Employer Organization Dossier</h2>
                <p className="text-xs text-slate-500">Corporate headquarters, authorized recruiting officers, and NCCT MOU</p>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Company Profile</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-black text-xl shadow-md">
                  TNSC
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{companyProfile.orgName}</h3>
                  <p className="text-xs text-amber-600 font-semibold">Registration: {companyProfile.regNo}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{companyProfile.hq}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Head of Human Resources:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">{companyProfile.hrHead}</p>
                </div>
                <div>
                  <span className="text-slate-400">Official HR Email:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">{companyProfile.email}</p>
                </div>
                <div>
                  <span className="text-slate-400">Recruitment Contact Phone:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">{companyProfile.phone}</p>
                </div>
                <div>
                  <span className="text-slate-400">Partnered NCCT Institutes:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">{companyProfile.preferredInstitutes}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* MODAL: POST / EDIT JOB */}
      {isPostJobOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {editingJob ? "Edit Job Vacancy" : "Create New Job Requisition"}
              </h3>
              <button onClick={() => setIsPostJobOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cooperative Field Officer"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Open Positions</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={jobForm.openings}
                    onChange={(e) => setJobForm({ ...jobForm, openings: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPostJobOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm"
                >
                  {editingJob ? "Save Changes" : "Publish Vacancy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CANDIDATE PROFILE */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img src={selectedCandidate.avatar} alt={selectedCandidate.candidate} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{selectedCandidate.candidate}</h3>
                  <p className="text-xs text-amber-600 font-bold">{selectedCandidate.aiMatch}% Match Score</p>
                </div>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>Verified Certificate:</strong> {selectedCandidate.certificate}</p>
              <p><strong>Experience:</strong> {selectedCandidate.experience}</p>
              <p><strong>Official Email:</strong> {selectedCandidate.email}</p>
              <div className="pt-2">
                <strong>Verified Skills:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedCandidate.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsPassportModalOpen(true);
                }}
                className="px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl"
              >
                Open Skill Passport
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SCHEDULE INTERVIEW */}
      {isScheduleInterviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Schedule Candidate Interview</h3>
              <button onClick={() => setIsScheduleInterviewOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleScheduleInterview} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Candidate Name</label>
                <input
                  type="text"
                  required
                  value={interviewForm.candidateName}
                  onChange={(e) => setInterviewForm({ ...interviewForm, candidateName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Target Role</label>
                <input
                  type="text"
                  required
                  value={interviewForm.jobTitle}
                  onChange={(e) => setInterviewForm({ ...interviewForm, jobTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={interviewForm.date}
                    onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={interviewForm.time}
                    onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Interview Mode</label>
                <select
                  value={interviewForm.mode}
                  onChange={(e) => setInterviewForm({ ...interviewForm, mode: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  <option value="Online (Video)">Online (Encrypted Video Terminal)</option>
                  <option value="In-Person (HQ)">In-Person (Chennai Corporate HQ)</option>
                </select>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleInterviewOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm"
                >
                  Confirm Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: OFFER LETTER */}
      {viewingOfferLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Official Appointment Letter</h3>
              <button onClick={() => setViewingOfferLetter(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <p className="font-bold text-sm text-slate-900 dark:text-white">State Apex Cooperative Bank Ltd.</p>
              <p>Reference: TNSC/HR/2026/OFFER-{viewingOfferLetter.id}</p>
              <p className="pt-2">Dear <strong>{viewingOfferLetter.candidateName}</strong>,</p>
              <p>
                We are pleased to offer you the position of <strong>{viewingOfferLetter.jobTitle}</strong>.
                Based on your verified credentials from <strong>{viewingOfferLetter.institute}</strong>, your starting annual compensation will be <strong>{viewingOfferLetter.ctc}</strong>.
              </p>
              <p>Joining Date: <strong>{viewingOfferLetter.joiningDate}</strong></p>
              <p className="text-[10px] text-slate-400 pt-2">Authorized Signatory: Tmt. Radhika Raman, General Manager (HR)</p>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingOfferLetter(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-amber-600 rounded-xl"
              >
                Close Letter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT COMPANY PROFILE */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Edit Recruiter Profile</h3>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditProfileOpen(false);
                showToast("Employer profile updated successfully.");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Organization Name</label>
                <input
                  type="text"
                  value={companyProfile.orgName}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, orgName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">HR Head</label>
                <input
                  type="text"
                  value={companyProfile.hrHead}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, hrHead: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Official Email</label>
                <input
                  type="email"
                  value={companyProfile.email}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REUSABLE SKILL PASSPORT MODAL */}
      <SkillPassportModal
        isOpen={isPassportModalOpen}
        onClose={() => setIsPassportModalOpen(false)}
        profile={mockTraineeProfile}
        certificates={mockCertificates}
      />

      {/* REUSABLE REPORT PREVIEW MODAL */}
      {viewingReport && (
        <ReportPreviewModal
          isOpen={true}
          onClose={() => setViewingReport(null)}
          reportTitle={viewingReport}
        />
      )}

    </div>
  );
};
