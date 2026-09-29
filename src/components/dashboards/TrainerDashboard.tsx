import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  BedDouble,
  Boxes,
  ScanFace,
  BookOpen,
  Video,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  QrCode,
  Play,
  Download,
  Eye,
  Building,
  Sparkles,
  UserCheck,
  X,
  Check,
  Search,
  Filter,
  AlertCircle,
  Menu
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  initialTimetable,
  mockHostelRooms,
  mockLogistics,
  mockAttendanceRecords,
  mockCourses,
  mockVideos,
  mockQuizzes,
  mockTraineesList,
  mockAttendanceTrend
} from '../../data/mockData';
import { TimetableItem, HostelRoom, QuizItem, VideoItem, Course, TraineeProfile, LogisticsItem } from '../../types';
import { AttendanceDemoModal } from '../modals/AttendanceDemoModal';
import { TimetableModal } from '../modals/TimetableModal';
import { RoomAllocationModal } from '../modals/RoomAllocationModal';
import { VideoPlayerModal } from '../modals/VideoPlayerModal';
import { CreateQuizModal } from '../modals/CreateQuizModal';
import { ReportPreviewModal } from '../modals/ReportPreviewModal';

interface TrainerDashboardProps {
  isMobileNavOpen?: boolean;
  onCloseMobileNav?: () => void;
  onOpenMobileNav?: () => void;
}

export const TrainerDashboard: React.FC<TrainerDashboardProps> = ({
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

  // State: Timetable
  const [timetable, setTimetable] = useState<TimetableItem[]>(initialTimetable);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
  const [editingTimetable, setEditingTimetable] = useState<TimetableItem | null>(null);

  // State: Hostel
  const [hostelRooms, setHostelRooms] = useState<HostelRoom[]>(mockHostelRooms);
  const [allocatingRoom, setAllocatingRoom] = useState<HostelRoom | null>(null);

  // State: Logistics
  const [logistics, setLogistics] = useState<LogisticsItem[]>(mockLogistics);
  const [isRequestLogisticsOpen, setIsRequestLogisticsOpen] = useState(false);
  const [newLogisticsTitle, setNewLogisticsTitle] = useState('');

  // State: Attendance Demo Modal
  const [attendanceModalType, setAttendanceModalType] = useState<'qr' | 'face' | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendanceRecords);

  // State: Videos
  const [videos, setVideos] = useState<VideoItem[]>(mockVideos);
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);
  const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>(['VID-1']);

  // State: Quizzes
  const [quizzes, setQuizzes] = useState<QuizItem[]>(mockQuizzes);
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [activeQuizAttempt, setActiveQuizAttempt] = useState<QuizItem | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScoreResult, setQuizScoreResult] = useState<{ score: number; total: number; passed: boolean } | null>(null);

  // State: Trainees
  const [trainees, setTrainees] = useState<TraineeProfile[]>(mockTraineesList);
  const [traineeSearch, setTraineeSearch] = useState('');
  const [selectedTrainee, setSelectedTrainee] = useState<TraineeProfile | null>(null);

  // State: Courses
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // State: Reports
  const [viewingReport, setViewingReport] = useState<string | null>(null);

  // State: Batches
  const [selectedBatch, setSelectedBatch] = useState<any | null>(null);
  const batchList = [
    {
      name: "DCBM-2026-B1",
      prog: "Diploma in Cooperative Business Management",
      count: 60,
      start: "15 Jan 2026",
      end: "30 Jun 2026",
      status: "Active",
      hall: "Hall A-102",
      faculty: "Dr. K. S. Ramanujam",
      topics: ["PACS Accounting", "Dairy Operations", "Multi-State Act"]
    },
    {
      name: "PACS-ERP-2026",
      prog: "PACS Computerization & Core Banking Arch",
      count: 45,
      start: "02 Feb 2026",
      end: "02 Mar 2026",
      status: "Active",
      hall: "Smart Lab B",
      faculty: "Er. Ramesh Sundar",
      topics: ["Database Reconciliation", "Day-End Closing", "Member MIS"]
    },
    {
      name: "FPO-2026-A",
      prog: "FPO Leadership & Rural Business Modeling",
      count: 52,
      start: "20 Jan 2026",
      end: "20 Mar 2026",
      status: "Active",
      hall: "Seminar Hall 2",
      faculty: "Prof. Arvind Trivedi",
      topics: ["Agri Supply Chain", "Direct Marketing", "GeM Listing"]
    },
    {
      name: "DCCB-AUDIT-26",
      prog: "Statutory Audit & Credit Risk for DCCBs",
      count: 40,
      start: "01 Mar 2026",
      end: "22 Mar 2026",
      status: "Upcoming",
      hall: "Computer Lab 4",
      faculty: "CA Sunita Rao",
      topics: ["Balance Sheet Audit", "NPA Provisions", "RBI Regulations"]
    }
  ];

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Batches', icon: Calendar, badge: '4' },
    { name: 'Trainees', icon: Users, badge: `${trainees.length}` },
    { name: 'Timetable', icon: Clock },
    { name: 'Hostel Monitoring', icon: BedDouble, badge: '80%' },
    { name: 'Logistics', icon: Boxes },
    { name: 'Attendance', icon: ScanFace },
    { name: 'Courses', icon: BookOpen },
    { name: 'Videos', icon: Video },
    { name: 'Quiz / Assessment', icon: HelpCircle },
    { name: 'Performance', icon: TrendingUp },
    { name: 'Reports', icon: FileSpreadsheet }
  ];

  // Timetable Handlers
  const handleSaveTimetable = (item: TimetableItem) => {
    if (editingTimetable) {
      setTimetable(prev => prev.map(t => t.id === item.id ? item : t));
      showToast(`Session "${item.subject}" updated.`);
    } else {
      setTimetable(prev => [item, ...prev]);
      showToast(`New session scheduled for ${item.date}.`);
    }
  };

  const handleDeleteTimetable = (id: string) => {
    if (window.confirm("Are you sure you want to remove this session from the timetable?")) {
      setTimetable(prev => prev.filter(t => t.id !== id));
      showToast("Session removed from timetable.");
    }
  };

  // Attendance Handlers
  const handleAttendanceSuccess = () => {
    const newRecord = {
      id: `ATT-${Date.now().toString().slice(-4)}`,
      trainee: "Aarav Sharma",
      date: new Date().toISOString().split('T')[0],
      method: (attendanceModalType === 'qr' ? 'QR Code' : 'Face Recognition') as any,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Present' as const,
      hall: 'Hall A-102'
    };
    setAttendanceRecords(prev => [newRecord, ...prev]);
    showToast("Biometric verification verified and logged.");
  };

  const handleToggleAttendanceStatus = (id: string, current: string) => {
    const nextStatus = current === 'Present' ? 'Late' : current === 'Late' ? 'Absent' : 'Present';
    setAttendanceRecords(prev => prev.map(r => r.id === id ? { ...r, status: nextStatus as any } : r));
    showToast(`Status updated to ${nextStatus}.`);
  };

  // Hostel Handlers
  const handleCheckInRoom = (roomNo: string) => {
    setHostelRooms(prev => prev.map(r => {
      if (r.roomNo === roomNo && r.available > 0) {
        const newOcc = r.occupied + 1;
        const newAvail = r.capacity - newOcc;
        return {
          ...r,
          occupied: newOcc,
          available: newAvail,
          status: newAvail === 0 ? 'Full' : 'Available',
          occupants: [...(r.occupants || []), "Trainee Check-In"]
        };
      }
      return r;
    }));
    showToast(`Trainee checked in to Room ${roomNo}.`);
  };

  const handleCheckOutRoom = (roomNo: string) => {
    setHostelRooms(prev => prev.map(r => {
      if (r.roomNo === roomNo && r.occupied > 0) {
        const newOcc = r.occupied - 1;
        const newAvail = r.capacity - newOcc;
        const currentOccs = r.occupants || [];
        return {
          ...r,
          occupied: newOcc,
          available: newAvail,
          status: 'Available',
          occupants: currentOccs.slice(0, -1)
        };
      }
      return r;
    }));
    showToast(`Trainee checked out of Room ${roomNo}.`);
  };

  // Logistics Handlers
  const handleToggleLogisticsStatus = (id: string) => {
    setLogistics(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Ready' ? 'Maintenance' : 'Ready';
        return { ...item, status: nextStatus as any };
      }
      return item;
    }));
    showToast("Logistics status updated.");
  };

  // Video Handlers
  const handleToggleWatchVideo = (id: string) => {
    if (watchedVideoIds.includes(id)) {
      setWatchedVideoIds(prev => prev.filter(vId => vId !== id));
      showToast("Video marked as unwatched.");
    } else {
      setWatchedVideoIds(prev => [...prev, id]);
      showToast("Video marked as completed.");
    }
  };

  // Interactive Quiz Attempt Handlers
  const demoQuestions = [
    {
      q: "Under the Multi-State Cooperative Societies Act, what is the minimum member quorum for AGM?",
      opts: ["One-fifth of total voting members", "One-tenth of total voting members", "50 members or 10% whichever is less", "Simple majority of executive board"],
      correct: 1
    },
    {
      q: "In PACS Day-End Ledger reconciliation, which document serves as primary proof for cash balance?",
      opts: ["Day Cash Book counter-signed by Secretary", "Bank Passbook only", "Member Loan Ledger summary", "Audit Notice"],
      correct: 0
    },
    {
      q: "What is the primary role of an FPO (Farmer Producer Organization) board?",
      opts: ["Direct credit disbursement without registration", "Democratic governance, collective bargaining, and marketing", "Fixing MSP rates for government", "Replacing rural post offices"],
      correct: 1
    }
  ];

  const handleSubmitDemoQuiz = () => {
    let scoreCount = 0;
    demoQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        scoreCount += 1;
      }
    });
    const percentage = Math.round((scoreCount / demoQuestions.length) * 100);
    setQuizScoreResult({
      score: percentage,
      total: demoQuestions.length,
      passed: percentage >= 60
    });
    showToast(`Quiz submitted! Result: ${percentage}%`);
  };

  const filteredTrainees = trainees.filter(t =>
    t.name.toLowerCase().includes(traineeSearch.toLowerCase()) ||
    t.batch.toLowerCase().includes(traineeSearch.toLowerCase()) ||
    t.location.toLowerCase().includes(traineeSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-xl shadow-xl animate-bounce text-xs font-semibold">
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
            aria-label="Open Trainer Menu"
          >
            <Menu className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-teal-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Trainer & Faculty Console
              </h3>
            </div>
            <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">{activeTab}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 font-bold">
            Faculty / ICM
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
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              <Building className="w-4 h-4" />
              <span>ICM Madurai Portal</span>
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              Trainer & Faculty Console
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
                    ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/30'
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
                      isActive ? 'bg-white text-teal-700' : 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Room Status Card in Mobile Drawer */}
        <div className="mt-6 p-3.5 rounded-xl bg-teal-50/50 dark:bg-slate-800/40 border border-teal-200/50 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between text-teal-800 dark:text-teal-400 text-[11px] font-bold">
            <span>Hostel Occupancy</span>
            <span>80% Occupied</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-teal-600 h-full rounded-full" style={{ width: '80%' }}></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">16 of 20 beds allocated</p>
        </div>
      </aside>

      {/* Desktop Sidebar Navigation (>= md) */}
      <aside className="hidden md:block md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
        <div className="mb-6 px-3">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            <Building className="w-4 h-4" />
            <span>ICM Madurai Portal</span>
          </div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
            Trainer & Faculty Console
          </h2>
          <p className="text-[11px] text-slate-400">Department of Cooperative Mgmt</p>
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
                    ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    isActive ? 'bg-white text-teal-700' : 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Room Status Card */}
        <div className="mt-8 p-3.5 rounded-xl bg-teal-50/50 dark:bg-slate-800/40 border border-teal-200/50 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between text-teal-800 dark:text-teal-400 text-[11px] font-bold">
            <span>Hostel Occupancy</span>
            <span>80% Occupied</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-teal-600 h-full rounded-full" style={{ width: '80%' }}></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">16 of 20 beds allocated</p>
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
                  <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-md">
                    Faculty Workspace
                  </span>
                  <span className="text-xs text-slate-400">• Institute of Cooperative Management, Madurai</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Trainer & Institute Operations Hub
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage cohorts, daily timetables, biometric attendance check-in, and student assessments.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingTimetable(null);
                    setIsTimetableModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Schedule Timetable</span>
                </button>
              </div>
            </div>

            {/* 4 Dashboard Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Assigned Batches</span>
                  <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                    <Calendar className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">4</span>
                  <span className="text-xs font-bold text-emerald-600">Active</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">DCBM, PACS ERP, FPO, DCCB</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Trainees</span>
                  <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <Users className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">197</span>
                  <span className="text-xs font-bold text-blue-600">Enrolled</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Residential & Day Scholars</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Today's Attendance</span>
                  <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <ScanFace className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">96.2%</span>
                  <span className="text-xs font-bold text-emerald-600">Present</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Biometric Terminal Verified</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Hostel Beds Free</span>
                  <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                    <BedDouble className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">4 / 20</span>
                  <span className="text-xs font-bold text-purple-600">Available</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Block A & Block B</p>
              </div>
            </div>

            {/* Today's Schedule Quick View */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Today's Class Schedule</h3>
                  <p className="text-xs text-slate-500">Upcoming lecture and computer lab practicals</p>
                </div>
                <button onClick={() => setActiveTab('Timetable')} className="text-xs font-semibold text-teal-600 hover:underline">
                  Manage Full Timetable →
                </button>
              </div>

              <div className="space-y-3">
                {timetable.slice(0, 3).map((session) => (
                  <div key={session.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-teal-600">{session.time}</span>
                        <span className="px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold text-[10px]">
                          {session.batch}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">{session.subject}</p>
                      <p className="text-slate-500 mt-0.5">{session.trainer} • {session.trainingHall}</p>
                    </div>
                    <button
                      onClick={() => setAttendanceModalType('qr')}
                      className="px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 dark:bg-teal-950 hover:bg-teal-100 rounded-lg transition"
                    >
                      Take Attendance
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: MY BATCHES */}
        {/* ========================================================================= */}
        {activeTab === 'My Batches' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Assigned Faculty Batches</h2>
                <p className="text-xs text-slate-500">Cohorts undergoing diploma and specialized certificate training</p>
              </div>
              <span className="text-xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-3 py-1.5 rounded-xl">
                4 Active Cohorts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {batchList.map((batch, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base text-slate-900 dark:text-white">{batch.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        batch.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {batch.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-teal-600 mt-1">{batch.prog}</p>
                    <p className="text-xs text-slate-500 mt-2">Faculty In-Charge: <strong>{batch.faculty}</strong> • Hall: {batch.hall}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {batch.topics.map((tp: string, tIdx: number) => (
                        <span key={tIdx} className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                          {tp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Trainees: <strong className="text-slate-900 dark:text-white">{batch.count}</strong> Candidates</span>
                    <button
                      onClick={() => setSelectedBatch(batch)}
                      className="px-3 py-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950 rounded-lg transition"
                    >
                      View Roster Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: TRAINEES */}
        {/* ========================================================================= */}
        {activeTab === 'Trainees' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Department Trainee Registry</h2>
                <p className="text-xs text-slate-500">Student performance tracking, attendance logs, and quiz results</p>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={traineeSearch}
                  onChange={(e) => setTraineeSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Student Name</th>
                      <th className="p-3.5">Batch</th>
                      <th className="p-3.5">Course Progress</th>
                      <th className="p-3.5">Attendance</th>
                      <th className="p-3.5">Skill Score</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredTrainees.map((tr) => (
                      <tr key={tr.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <img src={tr.photo} alt={tr.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{tr.name}</p>
                              <span className="text-[10px] text-slate-400">{tr.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 font-semibold text-teal-600">{tr.batch}</td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-teal-600 h-full rounded-full" style={{ width: `${tr.learningProgress}%` }}></div>
                            </div>
                            <span className="font-mono font-bold">{tr.learningProgress}%</span>
                          </div>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-emerald-600">{tr.attendanceRate}%</td>
                        <td className="p-3.5 font-mono font-bold">{tr.skillScore}/100</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setSelectedTrainee(tr)}
                            className="px-3 py-1 text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 rounded-lg hover:bg-teal-100 transition"
                          >
                            View Record
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
        {/* VIEW 4: TIMETABLE */}
        {/* ========================================================================= */}
        {activeTab === 'Timetable' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Academic Timetable & Session Planner</h2>
                <p className="text-xs text-slate-500">Plan and modify classroom and smart laboratory lecture allocations</p>
              </div>
              <button
                onClick={() => {
                  setEditingTimetable(null);
                  setIsTimetableModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Session</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Time</th>
                      <th className="p-3.5">Subject / Topic</th>
                      <th className="p-3.5">Trainer / Faculty</th>
                      <th className="p-3.5">Training Hall</th>
                      <th className="p-3.5">Batch</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {timetable.map((session) => (
                      <tr key={session.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-medium">{session.date}</td>
                        <td className="p-3.5 font-mono text-teal-600 font-bold">{session.time}</td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{session.subject}</td>
                        <td className="p-3.5">{session.trainer}</td>
                        <td className="p-3.5 font-semibold text-slate-600 dark:text-slate-400">{session.trainingHall}</td>
                        <td className="p-3.5 font-bold text-blue-600">{session.batch}</td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => {
                              setEditingTimetable(session);
                              setIsTimetableModalOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTimetable(session.id)}
                            className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
        {/* VIEW 5: HOSTEL MONITORING */}
        {/* ========================================================================= */}
        {activeTab === 'Hostel Monitoring' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Hostel Occupancy & Bed Allocation</h2>
                <p className="text-xs text-slate-500">Live residential room status, student check-in, and check-out</p>
              </div>
              <button
                onClick={() => setAllocatingRoom(hostelRooms[1])}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Allocate Bed</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hostelRooms.map((room) => (
                <div key={room.roomNo} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Room #{room.roomNo}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      room.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-700'
                        : room.status === 'Full'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {room.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{room.block}</p>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs flex justify-between">
                    <span>Occupied: <strong>{room.occupied}/{room.capacity}</strong></span>
                    <span className="text-emerald-600 font-bold">{room.available} Free</span>
                  </div>

                  <div className="flex items-center gap-1 pt-2">
                    <button
                      onClick={() => handleCheckInRoom(room.roomNo)}
                      disabled={room.available === 0}
                      className="flex-1 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-40 rounded-lg transition"
                    >
                      Check-In
                    </button>
                    <button
                      onClick={() => handleCheckOutRoom(room.roomNo)}
                      disabled={room.occupied === 0}
                      className="flex-1 py-1 text-[11px] font-semibold text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-40 rounded-lg transition"
                    >
                      Check-Out
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 6: LOGISTICS */}
        {/* ========================================================================= */}
        {activeTab === 'Logistics' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Campus Logistics & Infrastructure</h2>
                <p className="text-xs text-slate-500">Classroom smart boards, computer labs, printed learning kits, and transport</p>
              </div>
              <button
                onClick={() => setIsRequestLogisticsOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Request Logistics</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {logistics.map((item) => (
                <div key={item.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Asset ID: {item.id}</p>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                        <span className="text-[10px] text-slate-400">Total</span>
                        <p className="font-bold">{item.total}</p>
                      </div>
                      <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                        <span className="text-[10px] text-slate-400">In Use</span>
                        <p className="font-bold text-blue-600">{item.inUse}</p>
                      </div>
                      <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                        <span className="text-[10px] text-slate-400">Available</span>
                        <p className="font-bold text-emerald-600">{item.available}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={() => handleToggleLogisticsStatus(item.id)}
                      className="px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                    >
                      Toggle Status (Ready / Maint)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 7: ATTENDANCE */}
        {/* ========================================================================= */}
        {activeTab === 'Attendance' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Classroom Biometric Check-In Desk</h2>
                <p className="text-xs text-slate-500">Live hardware simulation for QR scan and AI facial recognition</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAttendanceModalType('qr')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-teal-700 bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl hover:bg-teal-100 transition shadow-sm"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Launch QR Terminal</span>
                </button>
                <button
                  onClick={() => setAttendanceModalType('face')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition"
                >
                  <ScanFace className="w-4 h-4" />
                  <span>Launch Face Scanner</span>
                </button>
              </div>
            </div>

            {/* Attendance Roster Table */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Classroom Check-In Roster (Click status to toggle)</h3>
                <span className="text-xs text-slate-400">Hall A-102 • Today</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Trainee Name</th>
                      <th className="p-3.5">Method</th>
                      <th className="p-3.5">Time Recorded</th>
                      <th className="p-3.5">Training Hall</th>
                      <th className="p-3.5">Status (Clickable)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {attendanceRecords.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{att.trainee}</td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 font-semibold text-[10px]">
                            {att.method === 'Face Recognition' ? <ScanFace className="w-3 h-3 text-teal-600" /> : <QrCode className="w-3 h-3 text-blue-600" />}
                            {att.method}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono">{att.time}</td>
                        <td className="p-3.5">{att.hall}</td>
                        <td className="p-3.5">
                          <button
                            onClick={() => handleToggleAttendanceStatus(att.id, att.status)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition hover:opacity-80 ${
                              att.status === 'Present'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                : att.status === 'Late'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {att.status} ↻
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
        {/* VIEW 8: COURSES */}
        {/* ========================================================================= */}
        {activeTab === 'Courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Department Course Catalog</h2>
                <p className="text-xs text-slate-500">Curriculum syllabus, learning objectives, and batch assignment</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div key={course.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                      {course.category}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm mt-2">{course.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">Instructor: {course.instructor}</p>
                    <p className="text-xs text-slate-400 mt-1">{course.lessons} Lessons • {course.duration}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-3 py-1.5 text-xs font-semibold text-teal-600 hover:bg-teal-50 rounded-lg transition"
                    >
                      View Syllabus
                    </button>
                    <button
                      onClick={() => showToast(`Course "${course.name}" assigned to DCBM Batch 1.`)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition"
                    >
                      Assign to Batch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 9: VIDEOS */}
        {/* ========================================================================= */}
        {activeTab === 'Videos' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Multimedia E-Learning Video Library</h2>
                <p className="text-xs text-slate-500">Interactive lecture videos, PACS computerization tutorials, and case studies</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {videos.map((vid) => {
                const isWatched = watchedVideoIds.includes(vid.id);
                return (
                  <div key={vid.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-3 flex flex-col justify-between">
                    <div className="relative group rounded-xl overflow-hidden cursor-pointer" onClick={() => setPlayingVideo(vid)}>
                      <img src={vid.thumbnail} alt={vid.title} className="w-full h-36 object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 ml-0.5 fill-white" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-900/80 text-white rounded">
                        {vid.duration}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-teal-600">{vid.category}</span>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1 line-clamp-2">{vid.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{vid.instructor} • {vid.views}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => setPlayingVideo(vid)}
                        className="text-xs font-semibold text-teal-600 hover:underline flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" /> Watch Demo
                      </button>
                      <button
                        onClick={() => handleToggleWatchVideo(vid.id)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition ${
                          isWatched ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {isWatched ? "✓ Completed" : "Mark as Watched"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 10: QUIZ / ASSESSMENT */}
        {/* ========================================================================= */}
        {activeTab === 'Quiz / Assessment' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Department Assessments & Quizzes</h2>
                <p className="text-xs text-slate-500">Create quizzes or simulate an interactive student demo attempt</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveQuizAttempt(quizzes[0]);
                    setQuizAnswers({});
                    setQuizScoreResult(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-teal-700 bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl hover:bg-teal-100 transition shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Attempt Demo Quiz (Interactive)</span>
                </button>
                <button
                  onClick={() => setIsCreateQuizOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Create Quiz</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Quiz Name</th>
                      <th className="p-3.5">Course</th>
                      <th className="p-3.5">Questions</th>
                      <th className="p-3.5">Student Attempts</th>
                      <th className="p-3.5">Average Score</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {quizzes.map((qz) => (
                      <tr key={qz.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{qz.name}</td>
                        <td className="p-3.5">{qz.course}</td>
                        <td className="p-3.5 font-mono">{qz.questions} Questions</td>
                        <td className="p-3.5 font-mono">{qz.attempts} Candidates</td>
                        <td className="p-3.5 font-mono font-bold text-teal-600">{qz.averageScore}%</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                            {qz.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              setActiveQuizAttempt(qz);
                              setQuizAnswers({});
                              setQuizScoreResult(null);
                            }}
                            className="px-3 py-1 text-xs font-semibold text-teal-600 bg-teal-50 dark:bg-teal-950 rounded-lg hover:bg-teal-100 transition"
                          >
                            Launch Simulation
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
        {/* VIEW 11: PERFORMANCE */}
        {/* ========================================================================= */}
        {activeTab === 'Performance' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Batch Academic Performance Analytics</h2>
              <p className="text-xs text-slate-500">Statistical distribution of assessment scores, attendance compliance, and skill growth</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Biometric Attendance by Day</h3>
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockAttendanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                      <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <YAxis domain={[80, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                      <Bar dataKey="qrRate" name="QR Check-in %" fill="#0d9488" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="faceRate" name="Face Recog %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Trainee Skill Benchmark Growth</h3>
                <div className="space-y-3 pt-2">
                  {[
                    { skill: "PACS Core Accounting", current: 88, target: 80 },
                    { skill: "Dairy Logistics ERP", current: 84, target: 75 },
                    { skill: "Cooperative Law & Acts", current: 91, target: 85 },
                    { skill: "Digital Banking Security", current: 76, target: 75 }
                  ].map((sk, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="font-bold">{sk.skill}</span>
                        <span className="font-mono text-teal-600 font-bold">{sk.current}% (Target: {sk.target}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-teal-600 h-full rounded-full" style={{ width: `${sk.current}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 12: REPORTS */}
        {/* ========================================================================= */}
        {activeTab === 'Reports' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Institute & Faculty Reports</h2>
                <p className="text-xs text-slate-500">Official marksheet exports, hostel logs, and attendance audits</p>
              </div>
              <button
                onClick={() => showToast("Exporting all institute marksheet CSVs...")}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Marksheets (CSV)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Weekly Cohort Attendance Audit - DCBM Batch 1", count: "60 Trainees Audited", date: "02 Mar 2026", type: "Attendance" },
                { title: "PACS ERP Practical Examination Marksheet", count: "45 Scores Verified", date: "28 Feb 2026", type: "Assessment" },
                { title: "Hostel Block A & B Monthly Occupancy Register", count: "20 Rooms Inspected", date: "01 Mar 2026", type: "Logistics" },
                { title: "Faculty Curriculum Progress & Completion Dossier", count: "5 Modules Delivered", date: "26 Feb 2026", type: "Faculty" }
              ].map((rep, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                      {rep.type}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-2">{rep.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{rep.count} • Generated {rep.date}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                    <button
                      onClick={() => setViewingReport(rep.title)}
                      className="text-xs font-semibold text-teal-600 hover:underline"
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

      </main>

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* INTERACTIVE DEMO QUIZ SIMULATION MODAL */}
      {activeQuizAttempt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Interactive Assessment Demo</h3>
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
                  Assessment Score: {quizScoreResult.score}%
                </h4>
                <p className="text-xs text-slate-500">
                  {quizScoreResult.passed
                    ? "Congratulations! You have passed this accredited module with distinction."
                    : "Good attempt! Review the course material to bridge the identified knowledge gaps."}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setActiveQuizAttempt(null);
                      setQuizScoreResult(null);
                    }}
                    className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl"
                  >
                    Done & Save to Performance
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {demoQuestions.map((q, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                    <p className="font-bold text-slate-900 dark:text-white">
                      Q{idx + 1}. {q.q}
                    </p>
                    <div className="space-y-1.5 pl-2">
                      {q.opts.map((opt, oIdx) => (
                        <label key={oIdx} className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                          <input
                            type="radio"
                            name={`q-${idx}`}
                            checked={quizAnswers[idx] === oIdx}
                            onChange={() => setQuizAnswers(prev => ({ ...prev, [idx]: oIdx }))}
                            className="text-teal-600"
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
                    onClick={handleSubmitDemoQuiz}
                    disabled={Object.keys(quizAnswers).length === 0}
                    className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-40 rounded-xl shadow-sm"
                  >
                    Submit Quiz Answers →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: BATCH ROSTER */}
      {selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Batch Dossier</h3>
              <button onClick={() => setSelectedBatch(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Batch:</strong> {selectedBatch.name}</p>
              <p><strong>Programme:</strong> {selectedBatch.prog}</p>
              <p><strong>Trainee Count:</strong> {selectedBatch.count} Students</p>
              <p><strong>Assigned Lecture Hall:</strong> {selectedBatch.hall}</p>
              <p><strong>Faculty In-Charge:</strong> {selectedBatch.faculty}</p>
              <p><strong>Duration:</strong> {selectedBatch.start} to {selectedBatch.end}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedBatch(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 rounded-xl"
              >
                Close Roster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: TRAINEE RECORD */}
      {selectedTrainee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img src={selectedTrainee.photo} alt={selectedTrainee.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{selectedTrainee.name}</h3>
                  <p className="text-[11px] text-slate-400">{selectedTrainee.batch}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTrainee(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>Institute:</strong> {selectedTrainee.institute}</p>
              <p><strong>Learning Progress:</strong> {selectedTrainee.learningProgress}%</p>
              <p><strong>Biometric Attendance:</strong> {selectedTrainee.attendanceRate}%</p>
              <p><strong>AI Skill Score:</strong> {selectedTrainee.skillScore}/100</p>
              <p><strong>Contact:</strong> {selectedTrainee.contact} • {selectedTrainee.email}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedTrainee(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 rounded-xl"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REQUEST LOGISTICS */}
      {isRequestLogisticsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Request Campus Logistics</h3>
              <button onClick={() => setIsRequestLogisticsOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Equipment / Facility Item</label>
                <input
                  type="text"
                  placeholder="e.g. 20 Additional Wireless Keyboards for Lab B"
                  value={newLogisticsTitle}
                  onChange={(e) => setNewLogisticsTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button
                  onClick={() => setIsRequestLogisticsOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newLogisticsTitle.trim()) {
                      const newLog: LogisticsItem = {
                        id: `LOG-${Date.now().toString().slice(-4)}`,
                        title: newLogisticsTitle,
                        total: 20,
                        inUse: 0,
                        available: 20,
                        status: 'Ready'
                      };
                      setLogistics(prev => [newLog, ...prev]);
                      showToast(`Requested "${newLogisticsTitle}" recorded.`);
                    }
                    setIsRequestLogisticsOpen(false);
                    setNewLogisticsTitle('');
                  }}
                  className="px-5 py-2 font-bold text-white bg-teal-600 rounded-xl"
                >
                  Submit Indent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REUSABLE TIMETABLE MODAL */}
      <TimetableModal
        isOpen={isTimetableModalOpen}
        onClose={() => setIsTimetableModalOpen(false)}
        onSave={handleSaveTimetable}
        initialData={editingTimetable || undefined}
      />

      {/* REUSABLE ROOM ALLOCATION MODAL */}
      {allocatingRoom && (
        <RoomAllocationModal
          isOpen={true}
          onClose={() => setAllocatingRoom(null)}
          room={allocatingRoom}
          onAllocate={(roomNo) => {
            handleCheckInRoom(roomNo);
            setAllocatingRoom(null);
          }}
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

      {/* REUSABLE CREATE QUIZ MODAL */}
      <CreateQuizModal
        isOpen={isCreateQuizOpen}
        onClose={() => setIsCreateQuizOpen(false)}
        onSave={(q) => {
          setQuizzes(prev => [q, ...prev]);
          showToast(`Assessment "${q.name}" published.`);
        }}
      />

      {/* REUSABLE ATTENDANCE DEMO MODAL */}
      <AttendanceDemoModal
        isOpen={attendanceModalType !== null}
        onClose={() => setAttendanceModalType(null)}
        type={attendanceModalType || 'qr'}
        traineeName="Aarav Sharma"
        onSuccess={handleAttendanceSuccess}
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
