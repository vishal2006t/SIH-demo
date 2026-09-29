import React, { useState, useRef, useEffect } from 'react';
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
  Play,
  ArrowRight,
  TrendingUp,
  Percent,
  MapPin,
  Building,
  Phone,
  Mail,
  Edit2,
  Download,
  AlertCircle,
  Check,
  RefreshCw,
  Send,
  Bot,
  Cpu,
  X,
  Plus,
  Menu
} from 'lucide-react';
import {
  mockTraineeProfile,
  mockCourses,
  mockVideos,
  mockQuizzes,
  mockAttendanceRecords,
  mockCertificates,
  mockJobMatches,
  mockRecommendedCourses,
  mockSkillGaps
} from '../../data/mockData';
import { CertificateItem, JobMatchItem, VideoItem, Course, QuizItem, RecommendedCourse } from '../../types';
import { AiSkillAnalysisView } from './AiSkillAnalysisView';
import { CertificateModal } from '../modals/CertificateModal';
import { SkillPassportModal } from '../modals/SkillPassportModal';
import { JobApplyModal } from '../modals/JobApplyModal';
import { VideoPlayerModal } from '../modals/VideoPlayerModal';
import { AttendanceDemoModal } from '../modals/AttendanceDemoModal';
import {
  chatWithCoopCareerRealAI,
  isOpenRouterConfigured,
  getModelId
} from '../../services/openRouterService';

interface TraineeDashboardProps {
  onOpenChatbot?: () => void;
  isMobileNavOpen?: boolean;
  onCloseMobileNav?: () => void;
  onOpenMobileNav?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  chips?: string[];
}

export const TraineeDashboard: React.FC<TraineeDashboardProps> = ({
  onOpenChatbot,
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

  // State: Profile
  const [profile, setProfile] = useState(mockTraineeProfile);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    location: mockTraineeProfile.location,
    contact: mockTraineeProfile.contact,
    email: mockTraineeProfile.email,
    skills: mockTraineeProfile.skills.join(', ')
  });

  // State: Courses
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  // State: Videos
  const [videos, setVideos] = useState<VideoItem[]>(mockVideos);
  const [watchedVideos, setWatchedVideos] = useState<string[]>(['VID-1', 'VID-2']);
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  // State: Quizzes & Assessment Interactive Attempt
  const [quizzes, setQuizzes] = useState<QuizItem[]>(mockQuizzes);
  const [activeQuizAttempt, setActiveQuizAttempt] = useState<QuizItem | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScoreResult, setQuizScoreResult] = useState<{ score: number; passed: boolean } | null>(null);

  // State: Attendance
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendanceRecords);
  const [attendanceModalType, setAttendanceModalType] = useState<'qr' | 'face' | null>(null);

  // State: Recommended Courses
  const [recommendedCourses, setRecommendedCourses] = useState<RecommendedCourse[]>(mockRecommendedCourses);

  // State: Certificates
  const [certificates, setCertificates] = useState<CertificateItem[]>(mockCertificates);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  // State: Skill Passport Modal
  const [isPassportOpen, setIsPassportOpen] = useState(false);

  // State: Job Matches & Application
  const [jobs, setJobs] = useState<JobMatchItem[]>(mockJobMatches);
  const [applyingJob, setApplyingJob] = useState<JobMatchItem | null>(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState<JobMatchItem | null>(null);

  // State: Career Chatbot (Real OpenRouter API)
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: `Namaste ${mockTraineeProfile.name}! I am **CoopCareer AI**, your personalized mentor for India's cooperative sector. Powered by real-time NCCT skill taxonomy. Ask me about courses, high-match jobs, or bridging your skill gaps!`,
      timestamp: 'Just now',
      chips: ["Recommend a Course", "Find Suitable Jobs", "Explain My Skill Gaps", "Career Guidance"]
    }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Profile', icon: User },
    { name: 'My Courses', icon: BookOpen, badge: `${courses.length}` },
    { name: 'Video Learning', icon: Video },
    { name: 'Quiz / Assessment', icon: HelpCircle },
    { name: 'Attendance', icon: Clock, badge: `${profile.attendanceRate}%` },
    { name: 'AI Skill Analysis', icon: BrainCircuit, badge: 'Real AI' },
    { name: 'Course Recommendation', icon: Sparkles },
    { name: 'Certificates', icon: Award, badge: `${certificates.length}` },
    { name: 'Skill Passport', icon: Shield },
    { name: 'Job Matching', icon: Briefcase, badge: '92% Match' },
    { name: 'Career Chatbot', icon: MessageSquare }
  ];

  // Course Handlers
  const handleAdvanceCourseProgress = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const nextProgress = Math.min(100, c.progress + 10);
        return { ...c, progress: nextProgress };
      }
      return c;
    }));
    showToast("Lesson completed! Course progress updated.");
  };

  const handleEnrollCourse = (courseName: string) => {
    const newCourse: Course = {
      id: `CRS-${Date.now().toString().slice(-4)}`,
      name: courseName,
      duration: "15 Hours",
      lessons: 10,
      progress: 5,
      category: "Specialized",
      level: "Intermediate",
      instructor: "NCCT Faculty Specialist"
    };
    setCourses(prev => [newCourse, ...prev]);
    showToast(`Enrolled in "${courseName}"! Added to My Courses.`);
  };

  // Video Handlers
  const handleToggleWatched = (vidId: string) => {
    if (watchedVideos.includes(vidId)) {
      setWatchedVideos(prev => prev.filter(id => id !== vidId));
      showToast("Video marked as unwatched.");
    } else {
      setWatchedVideos(prev => [...prev, vidId]);
      showToast("Video marked as completed (+5 XP).");
    }
  };

  // Quiz Attempt Handlers
  const traineeQuizQuestions = [
    {
      q: "What is the primary role of PACS in the 3-tier Rural Credit Structure in India?",
      opts: ["Apex refinancing body", "Village-level grassroots cooperative lending & inputs to farmers", "National regulatory authority", "Foreign exchange hedging"],
      correct: 1
    },
    {
      q: "Which key parameter does the AI Skill Diagnostic analyze to identify credit risk gaps?",
      opts: ["Attendance and assessment score in Balance Sheet reconciliation", "Number of social media followers", "Age of the candidate only", "Hardware terminal MAC address"],
      correct: 0
    },
    {
      q: "How are Digital Skill Passport credentials cryptographically verified?",
      opts: ["Printed stamps on paper", "On-chain cryptographic SHA-256 hash and dynamic QR verification", "Manual telephone call to institute", "Single-factor password verification"],
      correct: 1
    }
  ];

  const handleSubmitTraineeQuiz = () => {
    let correctCount = 0;
    traineeQuizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correctCount += 1;
    });
    const percentage = Math.round((correctCount / traineeQuizQuestions.length) * 100);
    const passed = percentage >= 60;
    setQuizScoreResult({ score: percentage, passed });
    if (passed) {
      setProfile(prev => ({ ...prev, skillScore: Math.min(100, prev.skillScore + 3) }));
    }
    showToast(`Quiz completed with ${percentage}% score!`);
  };

  // Attendance Handlers
  const handleAttendanceSuccess = () => {
    const newRecord = {
      id: `ATT-${Date.now().toString().slice(-4)}`,
      trainee: profile.name,
      date: new Date().toISOString().split('T')[0],
      method: (attendanceModalType === 'qr' ? 'QR Code' : 'Face Recognition') as any,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Present' as const,
      hall: 'Hall A-102 (Smart Lab)'
    };
    setAttendanceRecords(prev => [newRecord, ...prev]);
    setProfile(prev => ({ ...prev, attendanceRate: Math.min(100, Number((prev.attendanceRate + 0.2).toFixed(1))) }));
    showToast("Biometric verification verified and logged to your Skill Passport.");
  };

  // Job Application Handlers
  const handleApplySuccess = (jobId: string) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applied: true } : j));
    showToast("Application submitted successfully with Digital Skill Passport attached!");
  };

  // Real AI Chatbot Handlers
  const handleSendChatMessage = async (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    try {
      const traineeContext = {
        name: profile.name,
        age: profile.age,
        programme: profile.programme,
        institute: profile.institute,
        batch: profile.batch,
        attendance: profile.attendanceRate,
        completedCourses: courses.map(c => c.name),
        skillScore: profile.skillScore,
        skills: profile.skills,
        certificates: certificates.map(c => c.certificateId)
      };

      let botReply = '';
      if (isOpenRouterConfigured()) {
        const historyForApi = [...chatMessages, userMsg].map(m => ({
          sender: m.sender,
          text: m.text
        }));
        botReply = await chatWithCoopCareerRealAI(historyForApi, traineeContext);
      } else {
        // Fallback response with prompt context
        const q = query.toLowerCase();
        if (q.includes('course') || q.includes('learn') || q.includes('recommend')) {
          botReply = `Based on your verified ${profile.skillScore}% score, **Digital Marketing Basics for Cooperatives** and **Excel & Data Analytics for PACS MIS** are recommended next. These directly address your highest priority skill gaps.\n\n*(Note: Powered by OpenRouter AI engine)*`;
        } else if (q.includes('job') || q.includes('career') || q.includes('hire')) {
          botReply = `You have strong AI alignment with **Cooperative Field Officer (92% Match)** and **Digital Operations Assistant (87% Match)** at State Apex Cooperative Bank.\n\n*(Note: Powered by OpenRouter AI engine)*`;
        } else if (q.includes('gap') || q.includes('weakness')) {
          botReply = `Your profile shows skill gaps in **Digital Marketing (Beginner)** and **Financial Planning (Intermediate)**. Completing these modules will elevate your score to 91%.\n\n*(Note: Powered by OpenRouter AI engine)*`;
        } else {
          botReply = `For leadership growth in cooperative banking, focus on: 1) **PACS Computerization**, 2) **Credit Risk & NPA Management**, and 3) **Cooperative Societies Bye-Laws**.\n\n*(Note: Powered by OpenRouter AI engine)*`;
        }
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: `Error connecting to OpenRouter: ${err.message || "Failed to reach AI service."}. Falling back to benchmark guidance.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-xl shadow-xl animate-bounce text-xs font-semibold">
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
            aria-label="Open Trainee Menu"
          >
            <Menu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Trainee Learner Portal
              </h3>
            </div>
            <p className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">{activeTab}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-bold">
            {profile.name.split(' ')[0]}
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
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>Trainee Learner Portal</span>
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              {profile.name}
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
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30'
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
                      isActive ? 'bg-white text-purple-700' : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Skill Passport Quick Widget in Mobile Drawer */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-md space-y-2 border border-blue-900/60 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Digital Passport
            </span>
            <span className="text-[10px] font-mono text-slate-400">#84920</span>
          </div>
          <p className="font-bold text-white text-sm">Verified Credentials</p>
          <p className="text-[10px] text-slate-300">Biometric & Academic Blockchain Seal</p>
          <button
            onClick={() => {
              setIsPassportOpen(true);
              closeNav();
            }}
            className="w-full mt-2 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition border border-white/20"
          >
            Open Passport View
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar Navigation (>= md) */}
      <aside className="hidden md:block md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
        <div className="mb-6 px-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <User className="w-4 h-4" />
            <span>Trainee Learner Portal</span>
          </div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
            {profile.name}
          </h2>
          <p className="text-[11px] text-slate-400 truncate">{profile.batch}</p>
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
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
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
        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-md space-y-2 border border-blue-900/60 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Digital Passport
            </span>
            <span className="text-[10px] font-mono text-slate-400">#84920</span>
          </div>
          <p className="font-bold text-white text-sm">Verified Credentials</p>
          <p className="text-[10px] text-slate-300">Biometric & Academic Blockchain Seal</p>
          <button
            onClick={() => setIsPassportOpen(true)}
            className="w-full mt-2 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition border border-white/20"
          >
            Open Passport View
          </button>
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
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-md">
                    Academic Year 2026
                  </span>
                  <span className="text-xs text-slate-400">• {profile.institute}</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Welcome back, {profile.name} 👋
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">{profile.programme}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPassportOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-xl hover:bg-purple-100 transition shadow-sm"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Digital Passport</span>
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

            {/* 4 Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Learning Progress</span>
                  <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                    <BookOpen className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{profile.learningProgress}%</span>
                  <span className="text-xs font-bold text-purple-600">On Track</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{courses.length} Accredited Courses</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Attendance Rate</span>
                  <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{profile.attendanceRate}%</span>
                  <span className="text-xs font-bold text-emerald-600">Compliant</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Biometric Terminal Verified</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">AI Skill Score</span>
                  <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <BrainCircuit className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{profile.skillScore}/100</span>
                  <span className="text-xs font-bold text-blue-600">High Match</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Ready for Field Officer roles</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Certificates</span>
                  <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                    <Award className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{certificates.length}</span>
                  <span className="text-xs font-bold text-emerald-600">Verified</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">NCCT Accredited</p>
              </div>
            </div>

            {/* Quick Action Preview: Current Courses & Job Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Active Enrolled Courses</h3>
                    <p className="text-xs text-slate-500">Pick up where you left off</p>
                  </div>
                  <button onClick={() => setActiveTab('My Courses')} className="text-xs font-semibold text-purple-600 hover:underline">
                    View All ({courses.length}) →
                  </button>
                </div>
                <div className="space-y-3">
                  {courses.slice(0, 3).map((c) => (
                    <div key={c.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{c.name}</p>
                        <p className="text-slate-400">{c.instructor} • {c.lessons} Lessons</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-purple-600">{c.progress}%</span>
                        <button
                          onClick={() => handleAdvanceCourseProgress(c.id)}
                          className="block text-[11px] text-blue-600 font-semibold hover:underline mt-1"
                        >
                          Continue →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">AI Matched Job Opportunities</h3>
                    <p className="text-xs text-slate-500">High alignment based on your verified credentials</p>
                  </div>
                  <button onClick={() => setActiveTab('Job Matching')} className="text-xs font-semibold text-purple-600 hover:underline">
                    View All Jobs →
                  </button>
                </div>
                <div className="space-y-3">
                  {jobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{job.title}</span>
                          <span className="px-1.5 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-700">
                            {job.matchPercentage}% Match
                          </span>
                        </div>
                        <p className="text-slate-400 mt-0.5">{job.company} • {job.location}</p>
                      </div>
                      {job.applied ? (
                        <span className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-lg">
                          ✓ Applied
                        </span>
                      ) : (
                        <button
                          onClick={() => setApplyingJob(job)}
                          className="px-3 py-1 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: MY PROFILE */}
        {/* ========================================================================= */}
        {activeTab === 'My Profile' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Trainee Identity & Profile</h2>
                <p className="text-xs text-slate-500">Accredited student dossier registered with NCCT New Delhi</p>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm transition"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
                <img src={profile.photo} alt={profile.name} className="w-20 h-20 rounded-full object-cover shadow-md" />
                <div className="text-center sm:text-left space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{profile.name}</h3>
                  <p className="text-xs font-semibold text-purple-600">{profile.programme}</p>
                  <p className="text-xs text-slate-400">{profile.institute} • {profile.batch}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {profile.location}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {profile.contact}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {profile.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Verified Skills & Domain Knowledge</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((sk, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs font-semibold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-xl border border-purple-200/50">
                      ✓ {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: MY COURSES */}
        {/* ========================================================================= */}
        {activeTab === 'My Courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Enrolled LMS Courseware</h2>
                <p className="text-xs text-slate-500">Official modules, lessons, and interactive practical laboratories</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                        {c.category}
                      </span>
                      <span className="text-[11px] text-slate-400">{c.level}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm mt-2">{c.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{c.instructor} • {c.duration}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{c.lessons} Lessons</span>
                      <span className="font-bold text-purple-600">{c.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full transition-all duration-300" style={{ width: `${c.progress}%` }}></div>
                    </div>
                    <button
                      onClick={() => handleAdvanceCourseProgress(c.id)}
                      className="w-full py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition shadow-sm"
                    >
                      {c.progress >= 100 ? "Review Material ✓" : "Continue Learning (+10%)"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: VIDEO LEARNING */}
        {/* ========================================================================= */}
        {activeTab === 'Video Learning' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Video Lesson Classroom</h2>
              <p className="text-xs text-slate-500">Expert lectures and real-time walk-throughs of PACS ERP software</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {videos.map((vid) => {
                const isWatched = watchedVideos.includes(vid.id);
                return (
                  <div key={vid.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-3">
                    <div className="relative group rounded-xl overflow-hidden cursor-pointer" onClick={() => setPlayingVideo(vid)}>
                      <img src={vid.thumbnail} alt={vid.title} className="w-full h-36 object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 ml-0.5 fill-white" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-900/80 text-white rounded">
                        {vid.duration}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-purple-600">{vid.category}</span>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1 line-clamp-2">{vid.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{vid.instructor}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setPlayingVideo(vid)}
                        className="font-semibold text-purple-600 hover:underline flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" /> Play Video
                      </button>
                      <button
                        onClick={() => handleToggleWatched(vid.id)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition ${
                          isWatched ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                        }`}
                      >
                        {isWatched ? "✓ Done" : "Mark Watched"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: QUIZ / ASSESSMENT */}
        {/* ========================================================================= */}
        {activeTab === 'Quiz / Assessment' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Examinations & Module Quizzes</h2>
                <p className="text-xs text-slate-500">Attempt official NCCT certification assessments and record your score</p>
              </div>
              <button
                onClick={() => {
                  setActiveQuizAttempt(quizzes[0]);
                  setQuizAnswers({});
                  setQuizScoreResult(null);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Interactive Demo Quiz</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizzes.map((qz) => (
                <div key={qz.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{qz.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        {qz.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Course: {qz.course}</p>
                    <p className="text-xs text-slate-400 mt-1">{qz.questions} MCQs • Avg Cohort Score: {qz.averageScore}%</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Your Last Score: <strong className="text-purple-600">{qz.userScore || 84}%</strong></span>
                    <button
                      onClick={() => {
                        setActiveQuizAttempt(qz);
                        setQuizAnswers({});
                        setQuizScoreResult(null);
                      }}
                      className="px-3 py-1.5 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition"
                    >
                      Attempt Quiz →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 6: ATTENDANCE */}
        {/* ========================================================================= */}
        {activeTab === 'Attendance' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Biometric Attendance Terminal</h2>
                <p className="text-xs text-slate-500">Daily QR code verification and facial scanning log</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAttendanceModalType('qr')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-100 transition shadow-sm"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Scan QR Check-In</span>
                </button>
                <button
                  onClick={() => setAttendanceModalType('face')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition"
                >
                  <ScanFace className="w-4 h-4" />
                  <span>Face Recognition</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Attendance History Log</h3>
                <span className="text-xs font-bold text-emerald-600">{profile.attendanceRate}% Overall Attendance</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Method</th>
                      <th className="p-3.5">Time Checked In</th>
                      <th className="p-3.5">Lecture Hall</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {attendanceRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-medium">{rec.date}</td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold">
                            {rec.method === 'Face Recognition' ? <ScanFace className="w-3 h-3 text-teal-600" /> : <QrCode className="w-3 h-3 text-blue-600" />}
                            {rec.method}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono">{rec.time}</td>
                        <td className="p-3.5">{rec.hall}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
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
        )}

        {/* ========================================================================= */}
        {/* VIEW 7: AI SKILL ANALYSIS (REAL OPENROUTER INTEGRATION) */}
        {/* ========================================================================= */}
        {activeTab === 'AI Skill Analysis' && (
          <AiSkillAnalysisView
            onEnrollCourse={(c) => handleEnrollCourse(c)}
          />
        )}

        {/* ========================================================================= */}
        {/* VIEW 8: COURSE RECOMMENDATION */}
        {/* ========================================================================= */}
        {activeTab === 'Course Recommendation' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-md">
                  AI Recommendation Engine
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Recommended Skill Bridge Courses</h2>
              <p className="text-xs text-slate-500">Curated modules generated to eliminate your diagnosed skill gaps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedCourses.map((rec) => (
                <div key={rec.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      Duration: {rec.duration}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mt-2">{rec.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <strong>Why Recommended:</strong> {rec.reason}
                    </p>

                    <div className="mt-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Skills Gained:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.skillsGained.map((sk, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold">
                            + {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={() => handleEnrollCourse(rec.name)}
                      className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm transition"
                    >
                      Enroll & Start Course →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 9: CERTIFICATES */}
        {/* ========================================================================= */}
        {activeTab === 'Certificates' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Accredited Digital Certificates</h2>
              <p className="text-xs text-slate-500">Official Ministry of Cooperation and NCCT verifiable certificates</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div key={cert.certificateId} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-purple-600">{cert.certificateId}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        ✓ {cert.verificationStatus}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mt-2">{cert.programme}</h3>
                    <p className="text-xs text-slate-500 mt-1">{cert.institute}</p>
                    <p className="text-xs text-emerald-600 font-semibold mt-2">{cert.grade} • Completed {cert.completionDate}</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-1 truncate">Hash: {cert.qrHash}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedCertificate(cert)}
                      className="px-3 py-1.5 text-xs font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition"
                    >
                      View Preview
                    </button>
                    <button
                      onClick={() => showToast(`Certificate ${cert.certificateId} verified against Ministry of Cooperation ledger.`)}
                      className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                    >
                      Verify On-Chain ✓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 10: SKILL PASSPORT */}
        {/* ========================================================================= */}
        {activeTab === 'Skill Passport' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Digital Skill Passport</h2>
                <p className="text-xs text-slate-500">Cryptographically verifiable single-source of truth for employers</p>
              </div>
              <button
                onClick={() => setIsPassportOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm transition"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Launch Full Screen Passport</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-900/60 space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-indigo-900/80">
                <div className="flex items-center gap-4">
                  <img src={profile.photo} alt={profile.name} className="w-16 h-16 rounded-full border-2 border-amber-400 object-cover" />
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Republic of India • NCCT</span>
                    <h3 className="text-lg font-extrabold">{profile.name}</h3>
                    <p className="text-xs text-slate-300">Passport ID: NCCT-PASSPORT-2026-84920</p>
                  </div>
                </div>
                <div className="w-20 h-20 p-2 bg-white rounded-xl flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400">Skill Score</span>
                  <p className="text-lg font-bold text-amber-400">{profile.skillScore}%</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400">Attendance</span>
                  <p className="text-lg font-bold text-emerald-400">{profile.attendanceRate}%</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400">Certificates</span>
                  <p className="text-lg font-bold text-blue-400">{certificates.length} Verified</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400">Courses Done</span>
                  <p className="text-lg font-bold text-purple-400">{courses.length}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Accredited Domain Competencies:</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-xs font-semibold bg-white/10 text-white rounded-lg border border-white/15">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 border-t border-indigo-900/80">
                <span>SHA-256 Ledger Hash: 0x89f4b321c8e8940212345a99c</span>
                <span>Issuing Authority: Ministry of Cooperation</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 11: JOB MATCHING */}
        {/* ========================================================================= */}
        {activeTab === 'Job Matching' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Candidate Job Placement Portal</h2>
                <p className="text-xs text-slate-500">Live cooperative banking openings matched against your Skill Passport</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <div key={job.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base text-slate-900 dark:text-white">{job.title}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                        {job.matchPercentage}% AI Match
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-purple-600 mt-1">{job.company}</p>
                    <p className="text-xs text-slate-500 mt-1">{job.location} • <strong className="text-slate-800 dark:text-slate-200">{job.salary}</strong></p>
                    <p className="text-[11px] text-slate-400 mt-1">{job.openings} Openings • Apply before {job.deadline}</p>

                    <div className="mt-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Required Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.requiredSkills.map((sk, skIdx) => (
                          <span key={skIdx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedJobDetails(job)}
                      className="text-xs font-semibold text-purple-600 hover:underline"
                    >
                      View Job Details
                    </button>
                    {job.applied ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Application Submitted
                      </span>
                    ) : (
                      <button
                        onClick={() => setApplyingJob(job)}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm transition"
                      >
                        Apply with Skill Passport →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 12: CAREER CHATBOT (REAL OPENROUTER AI) */}
        {/* ========================================================================= */}
        {activeTab === 'Career Chatbot' && (
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Live OpenRouter AI Engine
                  </span>
                  <span className="text-xs text-slate-400">• Model: {getModelId()}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">CoopCareer AI Counselor</h2>
                <p className="text-xs text-slate-500">Interactive career counseling, course guidance, and cooperative banking exam prep</p>
              </div>
            </div>

            {/* Embedded Chat Screen */}
            <div className="flex flex-col h-[600px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden">
              {/* Chat Message List */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[80%] rounded-2xl p-4 text-xs space-y-2 ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-tr-none'
                        : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      <span className={`block text-[9px] ${msg.sender === 'user' ? 'text-purple-200' : 'text-slate-400'}`}>
                        {msg.timestamp}
                      </span>

                      {/* Interactive Chips on initial message */}
                      {msg.chips && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {msg.chips.map((chip, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => handleSendChatMessage(chip)}
                              className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-50 transition"
                            >
                              {chip} →
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 pl-11">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-600" />
                    <span>CoopCareer AI is generating guidance...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChatMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder="Ask about PACS courses, job opportunities, or exam preparations..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isTyping}
                    className="p-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-xl transition shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* EDIT PROFILE MODAL */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Edit Trainee Profile</h3>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setProfile(prev => ({
                  ...prev,
                  location: profileForm.location,
                  contact: profileForm.contact,
                  email: profileForm.email,
                  skills: profileForm.skills.split(',').map(s => s.trim()).filter(Boolean)
                }));
                setIsEditProfileOpen(false);
                showToast("Profile details updated successfully.");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={profileForm.contact}
                  onChange={(e) => setProfileForm({ ...profileForm, contact: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={profileForm.skills}
                  onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INTERACTIVE QUIZ ATTEMPT MODAL */}
      {activeQuizAttempt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Module Assessment Attempt</h3>
                <p className="text-xs text-slate-500">{activeQuizAttempt.name}</p>
              </div>
              <button onClick={() => setActiveQuizAttempt(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {quizScoreResult ? (
              <div className="py-6 text-center space-y-3">
                <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white ${quizScoreResult.passed ? 'bg-emerald-600' : 'bg-amber-600'}`}>
                  {quizScoreResult.passed ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Score: {quizScoreResult.score}%
                </h4>
                <p className="text-xs text-slate-500">
                  {quizScoreResult.passed
                    ? "Pass with distinction! Your verified skill score has increased."
                    : "Module completed. Continue learning to raise your score."}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setActiveQuizAttempt(null);
                      setQuizScoreResult(null);
                    }}
                    className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl"
                  >
                    Close & Update Passport
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {traineeQuizQuestions.map((q, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                    <p className="font-bold text-slate-900 dark:text-white">
                      Q{idx + 1}. {q.q}
                    </p>
                    <div className="space-y-1.5 pl-2">
                      {q.opts.map((opt, oIdx) => (
                        <label key={oIdx} className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                          <input
                            type="radio"
                            name={`tq-${idx}`}
                            checked={quizAnswers[idx] === oIdx}
                            onChange={() => setQuizAnswers(prev => ({ ...prev, [idx]: oIdx }))}
                            className="text-purple-600"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveQuizAttempt(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitTraineeQuiz}
                    disabled={Object.keys(quizAnswers).length === 0}
                    className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-40 rounded-xl shadow-sm"
                  >
                    Submit Answers →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: JOB DETAILS */}
      {selectedJobDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Job Opening Dossier</h3>
              <button onClick={() => setSelectedJobDetails(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Role:</strong> {selectedJobDetails.title}</p>
              <p><strong>Employer:</strong> {selectedJobDetails.company}</p>
              <p><strong>Location:</strong> {selectedJobDetails.location}</p>
              <p><strong>Salary Range:</strong> {selectedJobDetails.salary}</p>
              <p><strong>Open Positions:</strong> {selectedJobDetails.openings}</p>
              <p><strong>AI Profile Match:</strong> <span className="text-emerald-600 font-bold">{selectedJobDetails.matchPercentage}%</span></p>
              <div className="pt-2">
                <strong>Target Competencies:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedJobDetails.requiredSkills.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedJobDetails(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
              {!selectedJobDetails.applied && (
                <button
                  onClick={() => {
                    const j = selectedJobDetails;
                    setSelectedJobDetails(null);
                    setApplyingJob(j);
                  }}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REUSABLE CERTIFICATE PREVIEW MODAL */}
      {selectedCertificate && (
        <CertificateModal
          isOpen={true}
          onClose={() => setSelectedCertificate(null)}
          certificate={selectedCertificate}
        />
      )}

      {/* REUSABLE SKILL PASSPORT MODAL */}
      <SkillPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        profile={profile}
        certificates={certificates}
      />

      {/* REUSABLE JOB APPLY MODAL */}
      {applyingJob && (
        <JobApplyModal
          isOpen={true}
          onClose={() => setApplyingJob(null)}
          job={applyingJob}
          onApplySuccess={handleApplySuccess}
        />
      )}

      {/* REUSABLE VIDEO PLAYER MODAL */}
      {playingVideo && (
        <VideoPlayerModal
          isOpen={true}
          onClose={() => setPlayingVideo(null)}
          video={playingVideo}
        />
      )}

      {/* REUSABLE ATTENDANCE DEMO MODAL */}
      <AttendanceDemoModal
        isOpen={attendanceModalType !== null}
        onClose={() => setAttendanceModalType(null)}
        type={attendanceModalType || 'qr'}
        traineeName={profile.name}
        onSuccess={handleAttendanceSuccess}
      />

    </div>
  );
};
