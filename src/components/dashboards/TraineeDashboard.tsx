import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  BookOpen,
  Video,
  HelpCircle,
  Clock,
  BrainCircuit,
  Award,
  Shield,
  Briefcase,
  MessageSquare,
  Sparkles,
  QrCode,
  ScanFace,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Building,
  Phone,
  Mail,
  Play,
  ArrowRight,
  TrendingUp,
  Percent
} from 'lucide-react';
import {
  mockTraineeProfile,
  mockCourses,
  mockVideos,
  mockQuizzes,
  mockAttendanceRecords,
  mockCertificates,
  mockJobMatches
} from '../../data/mockData';
import { CertificateItem, JobMatchItem, VideoItem } from '../../types';
import { AiSkillAnalysisView } from './AiSkillAnalysisView';
import { CertificateModal } from '../modals/CertificateModal';
import { SkillPassportModal } from '../modals/SkillPassportModal';
import { JobApplyModal } from '../modals/JobApplyModal';
import { VideoPlayerModal } from '../modals/VideoPlayerModal';
import { AttendanceDemoModal } from '../modals/AttendanceDemoModal';

interface TraineeDashboardProps {
  onOpenChatbot?: () => void;
}

export const TraineeDashboard: React.FC<TraineeDashboardProps> = ({ onOpenChatbot }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [profile, setProfile] = useState(mockTraineeProfile);
  const [jobs, setJobs] = useState(mockJobMatches);

  // Modals state
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [applyingJob, setApplyingJob] = useState<JobMatchItem | null>(null);
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);
  const [attendanceModalType, setAttendanceModalType] = useState<'qr' | 'face' | null>(null);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Profile', icon: User },
    { name: 'My Courses', icon: BookOpen },
    { name: 'Video Learning', icon: Video },
    { name: 'Quiz / Assessment', icon: HelpCircle },
    { name: 'Attendance', icon: Clock },
    { name: 'AI Skill Analysis', icon: BrainCircuit, badge: 'Demo' },
    { name: 'Certificates', icon: Award },
    { name: 'Skill Passport', icon: Shield },
    { name: 'Job Matching', icon: Briefcase, badge: '92%' },
    { name: 'Career Chatbot', icon: MessageSquare }
  ];

  const handleApplySuccess = (jobId: string) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applied: true } : j));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
        <div className="mb-6 px-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <User className="w-4 h-4" />
            <span>Trainee Learner Portal</span>
          </div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
            {profile.name}
          </h2>
          <p className="text-[11px] text-slate-400 truncate">
            {profile.batch}
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  if (item.name === 'Career Chatbot' && onOpenChatbot) {
                    onOpenChatbot();
                  } else {
                    setActiveTab(item.name);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                    isActive ? 'bg-white text-purple-700' : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Skill Passport Quick Widget */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-md space-y-2 border border-blue-900/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Skill Passport
            </span>
            <span className="text-[10px] font-mono text-slate-400">#84920</span>
          </div>
          <p className="text-xs font-bold text-white">Digital Verified Credentials</p>
          <button
            onClick={() => setIsPassportOpen(true)}
            className="w-full mt-2 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition border border-white/20"
          >
            Open Passport View
          </button>
        </div>
      </aside>

      {/* Main Panel Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-x-hidden">
        
        {/* If Active Tab is AI Skill Analysis */}
        {activeTab === 'AI Skill Analysis' ? (
          <AiSkillAnalysisView
            onEnrollCourse={(c) => alert(`Enrolled in ${c} successfully!`)}
          />
        ) : (
          <>
            {/* Top Trainee Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-md">
                    Academic Year 2026
                  </span>
                  <span className="text-xs text-slate-400">• {profile.institute}</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Welcome back, {profile.name} 👋
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {profile.programme}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPassportOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-xl hover:bg-purple-100 transition shadow-sm"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Digital Skill Passport</span>
                </button>
                <button
                  onClick={() => setActiveTab('AI Skill Analysis')}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-sm transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Skill Analysis</span>
                </button>
              </div>
            </div>

            {/* 4 Dashboard Cards: Learning Progress, Attendance, Courses Completed, Skill Score */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Learning Progress</span>
                  <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{profile.learningProgress}%</span>
                  <span className="text-[11px] font-bold text-blue-600">On Track</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${profile.learningProgress}%` }}></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Attendance</span>
                  <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{profile.attendanceRate}%</span>
                  <span className="text-[11px] font-bold text-emerald-600">Compliant</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">42 Days Verified Check-in</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Courses Completed</span>
                  <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                    <Award className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{profile.coursesCompleted}</span>
                  <span className="text-[11px] font-bold text-amber-600">Accredited</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">2 Certifications Issued</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Skill Score</span>
                  <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{profile.skillScore}%</span>
                  <span className="text-[11px] font-bold text-purple-600">Top 15%</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Recruiter Matched</p>
              </div>

            </div>

            {/* Section: MY PROFILE */}
            <div id="profile-section" className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    My Profile
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Institutional enrolment information and verified skills
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-6 pt-2">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-purple-500/40 shadow-md shrink-0"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 text-xs flex-1">
                  <div>
                    <span className="text-slate-400 block">Full Name:</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{profile.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Age:</span>
                    <strong className="text-slate-900 dark:text-white">{profile.age} Years</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Location:</span>
                    <strong className="text-slate-900 dark:text-white">{profile.location}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Programme:</span>
                    <strong className="text-slate-900 dark:text-white">{profile.programme}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Institute:</span>
                    <strong className="text-slate-900 dark:text-white">{profile.institute}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Cohort Batch:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{profile.batch}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Contact Phone:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{profile.contact}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Official Email:</span>
                    <strong className="text-slate-900 dark:text-white">{profile.email}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Verified Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.skills.map((sk, idx) => (
                        <span key={idx} className="bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded text-[10px] font-semibold border border-purple-200 dark:border-purple-800">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: ATTENDANCE (2 VISUAL CARDS & HISTORY) */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Attendance Check-In Terminals
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select your attendance check-in method for today's session
                </p>
              </div>

              {/* 2 Visual Method Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* QR Card */}
                <div
                  onClick={() => setAttendanceModalType('qr')}
                  className="p-5 rounded-2xl border-2 border-dashed border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md group-hover:scale-110 transition-transform">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">QR Code Attendance</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Scan classroom terminal screen QR
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                    Scan QR →
                  </span>
                </div>

                {/* Face Card */}
                <div
                  onClick={() => setAttendanceModalType('face')}
                  className="p-5 rounded-2xl border-2 border-dashed border-teal-200 dark:border-teal-900/60 bg-teal-50/50 dark:bg-teal-950/20 hover:bg-teal-50 dark:hover:bg-teal-950/40 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-teal-600 text-white shadow-md group-hover:scale-110 transition-transform">
                      <ScanFace className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">Face Recognition</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Biometric facial verification
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 text-xs font-bold text-teal-600 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                    Face Recognition →
                  </span>
                </div>

              </div>

              {/* Attendance History Table */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  My Recent Attendance History
                </span>
                <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="p-3">Date</th>
                        <th className="p-3">Check-In Method</th>
                        <th className="p-3">Timestamp</th>
                        <th className="p-3">Training Hall</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {mockAttendanceRecords.slice(0, 4).map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-medium">{rec.date}</td>
                          <td className="p-3">{rec.method}</td>
                          <td className="p-3 font-mono">{rec.time}</td>
                          <td className="p-3">{rec.hall}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                              {rec.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Section: MY COURSES */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    My Courses
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ongoing curriculum modules with completion percentages
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockCourses.slice(0, 3).map((c) => (
                  <div key={c.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                        {c.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">{c.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{c.duration} • {c.lessons} Lessons</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-purple-600 font-bold">{c.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: `${c.progress}%` }}></div>
                      </div>
                      <button
                        onClick={() => alert(`Resuming ${c.name}...`)}
                        className="w-full py-1.5 text-xs font-semibold text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 rounded-lg transition"
                      >
                        Continue Learning →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: VIDEO LEARNING */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <Video className="w-5 h-5 text-purple-600" />
                    Video Learning Library
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Interactive cooperative lectures with chapter notes and quizzes
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {mockVideos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setPlayingVideo(vid)}
                    className="group cursor-pointer rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-slate-900">
                      <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 fill-white translate-x-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[9px] font-mono text-white bg-black/75 rounded">
                        {vid.duration}
                      </span>
                    </div>

                    <div className="p-2.5">
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 transition line-clamp-2">
                        {vid.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 block mt-1">{vid.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: QUIZ / ASSESSMENT */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                    Quiz & Assessments Performance
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Module scores contributing to your AI Skill Diagnostic
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockQuizzes.map((qz) => (
                  <div key={qz.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {qz.course}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1">{qz.name}</h4>
                    </div>

                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-400 block">My Score</span>
                        <span className="text-lg font-black text-purple-600">{qz.userScore}%</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        Attempt 1 • Passed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: DIGITAL CERTIFICATES */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    Digital Certifications
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Official tamper-proof qualifications issued by NCCT & Ministry of Cooperation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockCertificates.map((cert) => (
                  <div
                    key={cert.certificateId}
                    className="p-5 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">
                          {cert.certificateId}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                          {cert.programme}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          {cert.institute}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {cert.verificationStatus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-amber-200/60 dark:border-slate-800">
                      <span>Completed: <strong className="text-slate-800 dark:text-slate-200">{cert.completionDate}</strong></span>
                      <span className="font-bold text-amber-700 dark:text-amber-400">{cert.grade}</span>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setSelectedCertificate(cert)}
                        className="flex-1 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-sm text-center"
                      >
                        View Certificate
                      </button>
                      <button
                        onClick={() => setSelectedCertificate(cert)}
                        className="flex-1 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 hover:bg-amber-200 rounded-xl transition text-center"
                      >
                        Verify Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: AI JOB MATCHING */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    AI Job Matching
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live employment opportunities aligned with your verified Skill Passport
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                  Demo AI Match
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between space-y-4 hover:border-blue-400 transition"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{job.title}</h4>
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">{job.company}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{job.location} • {job.salary}</p>
                        </div>

                        {/* Match Percentage Badge */}
                        <div className="text-right">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black ${
                            job.matchPercentage >= 90
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          }`}>
                            <Sparkles className="w-3 h-3" />
                            {job.matchPercentage}%
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">Demo AI Match</span>
                        </div>
                      </div>

                      {/* Required Skills */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {job.requiredSkills.map((sk, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{job.openings} Openings • Apply by {job.deadline}</span>
                      <button
                        onClick={() => setApplyingJob(job)}
                        disabled={job.applied}
                        className={`px-4 py-1.5 text-xs font-bold rounded-xl transition ${
                          job.applied
                            ? 'bg-emerald-100 text-emerald-700 cursor-default'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                        }`}
                      >
                        {job.applied ? 'Applied ✓' : 'Apply Now →'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </main>

      {/* Modals */}
      {selectedCertificate && (
        <CertificateModal
          isOpen={selectedCertificate !== null}
          onClose={() => setSelectedCertificate(null)}
          certificate={selectedCertificate}
        />
      )}

      <SkillPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        profile={profile}
        certificates={mockCertificates}
      />

      <JobApplyModal
        isOpen={applyingJob !== null}
        onClose={() => setApplyingJob(null)}
        job={applyingJob}
        onApplySuccess={handleApplySuccess}
      />

      <VideoPlayerModal
        isOpen={playingVideo !== null}
        onClose={() => setPlayingVideo(null)}
        video={playingVideo}
      />

      <AttendanceDemoModal
        isOpen={attendanceModalType !== null}
        onClose={() => setAttendanceModalType(null)}
        type={attendanceModalType || 'qr'}
      />

    </div>
  );
};
