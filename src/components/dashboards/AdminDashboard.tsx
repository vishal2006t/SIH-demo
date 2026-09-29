import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCheck,
  Clock,
  BookOpen,
  FileCheck2,
  Award,
  BarChart3,
  FileSpreadsheet,
  Settings,
  TrendingUp,
  Building,
  CheckCircle2,
  XCircle,
  Filter,
  Eye,
  Plus,
  Trash2,
  Edit2,
  Search,
  Download,
  ShieldCheck,
  Check,
  Sparkles,
  QrCode,
  ScanFace,
  RefreshCw,
  X,
  ExternalLink,
  Menu
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  mockAdminStats,
  mockProgrammes,
  mockEnrollmentTrend,
  mockParticipationByCategory,
  mockCompletionRateData,
  mockAttendanceTrend,
  mockRecentActivities,
  mockTraineesList,
  mockNominations,
  mockCourses,
  mockQuizzes,
  mockCertificates,
  mockAdminReports,
  mockAttendanceRecords
} from '../../data/mockData';
import { Programme, TraineeProfile, NominationItem, QuizItem, CertificateItem, Course, ReportItem } from '../../types';
import { AttendanceDemoModal } from '../modals/AttendanceDemoModal';
import { CertificateModal } from '../modals/CertificateModal';
import { CreateQuizModal } from '../modals/CreateQuizModal';
import { ReportPreviewModal } from '../modals/ReportPreviewModal';

interface AdminDashboardProps {
  isMobileNavOpen?: boolean;
  onCloseMobileNav?: () => void;
  onOpenMobileNav?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isMobileNavOpen,
  onCloseMobileNav,
  onOpenMobileNav
}) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [localMobileNavOpen, setLocalMobileNavOpen] = useState(false);
  const mobileNavOpen = isMobileNavOpen !== undefined ? isMobileNavOpen : localMobileNavOpen;
  const closeNav = onCloseMobileNav || (() => setLocalMobileNavOpen(false));
  const openNav = onOpenMobileNav || (() => setLocalMobileNavOpen(true));

  const [successToast, setSuccessToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // State: Programmes
  const [programmes, setProgrammes] = useState<Programme[]>(mockProgrammes);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Upcoming' | 'Completed'>('All');
  const [progSearch, setProgSearch] = useState('');
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(null);
  const [isAddProgOpen, setIsAddProgOpen] = useState(false);
  const [editingProgramme, setEditingProgramme] = useState<Programme | null>(null);

  // Form state for add/edit programme
  const [progForm, setProgForm] = useState({
    name: '',
    institute: 'ICM Madurai',
    trainees: 45,
    duration: '6 Weeks',
    category: 'Management',
    status: 'Active' as 'Active' | 'Upcoming' | 'Completed',
    startDate: '10 Mar 2026'
  });

  // State: Trainees
  const [trainees, setTrainees] = useState<TraineeProfile[]>(mockTraineesList);
  const [traineeSearch, setTraineeSearch] = useState('');
  const [traineeInstituteFilter, setTraineeInstituteFilter] = useState('All');
  const [selectedTrainee, setSelectedTrainee] = useState<TraineeProfile | null>(null);

  // State: Nominations
  const [nominations, setNominations] = useState<NominationItem[]>(mockNominations);
  const [selectedNomination, setSelectedNomination] = useState<NominationItem | null>(null);

  // State: Attendance & Biometrics
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendanceRecords);
  const [attendanceModalType, setAttendanceModalType] = useState<'qr' | 'face' | null>(null);

  // State: LMS Courses
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // State: Assessments
  const [quizzes, setQuizzes] = useState<QuizItem[]>(mockQuizzes);
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [viewingQuizResult, setViewingQuizResult] = useState<QuizItem | null>(null);

  // State: Certificates
  const [certificates, setCertificates] = useState<CertificateItem[]>(mockCertificates);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [certSearch, setCertSearch] = useState('');

  // State: Reports
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // State: Settings
  const [adminProfile, setAdminProfile] = useState({
    name: "Dr. Arvind Swaminathan, IAS",
    designation: "Director General, NCCT",
    email: "dg.ncct@coopnet.gov.in",
    phone: "+91 11 2686 1234",
    office: "NCCT Headquarters, New Delhi",
    emailAlerts: true,
    smsAlerts: true,
    language: "English (National Standard)",
    mfaEnabled: true
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Programmes', icon: Calendar, badge: `${programmes.length}` },
    { name: 'Trainees', icon: Users, badge: `${trainees.length}` },
    { name: 'Nomination', icon: UserCheck, badge: `${nominations.filter(n => n.status === 'Pending').length} Pending` },
    { name: 'Attendance', icon: Clock },
    { name: 'LMS', icon: BookOpen },
    { name: 'Assessments', icon: FileCheck2 },
    { name: 'Certificates', icon: Award },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Reports', icon: FileSpreadsheet },
    { name: 'Settings', icon: Settings }
  ];

  // Programme Handlers
  const handleSaveProgramme = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProgramme) {
      setProgrammes(prev => prev.map(p => p.id === editingProgramme.id ? { ...p, ...progForm } : p));
      showToast(`Programme "${progForm.name}" updated successfully.`);
    } else {
      const newProg: Programme = {
        id: `PRG-${Date.now().toString().slice(-4)}`,
        ...progForm
      };
      setProgrammes(prev => [newProg, ...prev]);
      showToast(`New programme "${progForm.name}" published across institutes.`);
    }
    setIsAddProgOpen(false);
    setEditingProgramme(null);
  };

  const handleDeleteProgramme = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove programme "${name}"?`)) {
      setProgrammes(prev => prev.filter(p => p.id !== id));
      showToast(`Programme "${name}" deleted.`);
    }
  };

  const openEditProgramme = (p: Programme) => {
    setEditingProgramme(p);
    setProgForm({
      name: p.name,
      institute: p.institute,
      trainees: p.trainees,
      duration: p.duration,
      category: p.category,
      status: p.status,
      startDate: p.startDate
    });
    setIsAddProgOpen(true);
  };

  // Nomination Handlers
  const handleNominationStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setNominations(prev => prev.map(n => n.id === id ? { ...n, status } : n));
    showToast(`Nomination ${id} has been marked as ${status}.`);
  };

  // Certificate Verification Handler
  const handleVerifyCertificate = (certId: string) => {
    setCertificates(prev => prev.map(c => c.certificateId === certId ? { ...c, verificationStatus: 'Verified' } : c));
    showToast(`Certificate ${certId} verified against Ministry of Cooperation ledger.`);
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
      hall: 'Apex Hall 1'
    };
    setAttendanceRecords(prev => [newRecord, ...prev]);
    showToast(`Biometric attendance verified and recorded into NCCT central registry.`);
  };

  // Filtered lists
  const filteredProgrammes = programmes.filter(p => {
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesSearch = p.name.toLowerCase().includes(progSearch.toLowerCase()) ||
                          p.institute.toLowerCase().includes(progSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredTrainees = trainees.filter(t => {
    const matchesInst = traineeInstituteFilter === 'All' || t.institute.includes(traineeInstituteFilter);
    const matchesSearch = t.name.toLowerCase().includes(traineeSearch.toLowerCase()) ||
                          t.programme.toLowerCase().includes(traineeSearch.toLowerCase()) ||
                          t.location.toLowerCase().includes(traineeSearch.toLowerCase());
    return matchesInst && matchesSearch;
  });

  const filteredCertificates = certificates.filter(c =>
    c.traineeName.toLowerCase().includes(certSearch.toLowerCase()) ||
    c.certificateId.toLowerCase().includes(certSearch.toLowerCase()) ||
    c.programme.toLowerCase().includes(certSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-xl animate-bounce text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Mobile Dashboard Top Bar (< md) */}
      <div className="md:hidden flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-20 shadow-sm">
        <div className="flex items-center gap-2.5">
          <button
            onClick={openNav}
            className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            aria-label="Open Apex Admin Menu"
          >
            <Menu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Apex Admin Console
              </h3>
            </div>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{activeTab}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold">
            NCCT Admin
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
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Building className="w-4 h-4" />
              <span>National Council NCCT</span>
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              Apex Admin Console
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
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Apex Status Card in Mobile Drawer */}
        <div className="mt-6 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
            <span>System Status</span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live
            </span>
          </div>
          <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">28 Institutes Connected</p>
          <p className="text-[10px] text-slate-400 mt-0.5">PACS ERP Synchronization Active</p>
        </div>
      </aside>

      {/* Desktop Sidebar Navigation (>= md) */}
      <aside className="hidden md:block md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
        <div className="mb-6 px-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Building className="w-4 h-4" />
            <span>National Council NCCT</span>
          </div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
            Apex Admin Console
          </h2>
          <p className="text-[11px] text-slate-400">Ministry of Cooperation, GoI</p>
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
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Apex Status Card */}
        <div className="mt-8 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
            <span>System Status</span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live
            </span>
          </div>
          <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">28 Institutes Connected</p>
          <p className="text-[10px] text-slate-400 mt-0.5">PACS ERP Synchronization Active</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-3 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden min-w-0 max-w-full">

        {/* ========================================================================= */}
        {/* VIEW 1: DASHBOARD OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                    National Portal
                  </span>
                  <span className="text-xs text-slate-400">• New Delhi Headquarters</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  National Cooperative Capacity Building & ERP Dashboard
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Apex monitoring of 28 training institutes, PACS computerization, trainee certifications, and placements.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingProgramme(null);
                    setProgForm({
                      name: '',
                      institute: 'ICM Madurai',
                      trainees: 40,
                      duration: '4 Weeks',
                      category: 'Technology',
                      status: 'Active',
                      startDate: '15 Mar 2026'
                    });
                    setIsAddProgOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Create Programme</span>
                </button>
              </div>
            </div>

            {/* 4 Summary Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Trainees</span>
                  <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <Users className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {mockAdminStats.totalTrainees}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> +14.2%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Across 28 training institutes</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Programmes</span>
                  <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                    <Calendar className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {programmes.length}
                  </span>
                  <span className="text-xs font-bold text-teal-600">38 Active Cohorts</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Diploma & PACS ERP Masterclasses</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Biometric Attendance</span>
                  <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">94.8%</span>
                  <span className="text-xs font-bold text-emerald-600">Verified</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">QR Code & AI Facial Terminals</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Issued Certificates</span>
                  <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                    <Award className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {mockAdminStats.certificatesIssued}
                  </span>
                  <span className="text-xs font-bold text-purple-600">Verifiable</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Cryptographic Digital Passports</p>
              </div>
            </div>

            {/* 4 Interactive Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Trainee Enrollment Trend</h3>
                    <p className="text-xs text-slate-500">Monthly enrolled vs certified</p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                    6-Month Trajectory
                  </span>
                </div>
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockEnrollmentTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorEnrolledAdmin" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                      <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                      <Area type="monotone" dataKey="enrolled" name="Enrolled Trainees" stroke="#2563eb" fillOpacity={1} fill="url(#colorEnrolledAdmin)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Sector Theme Breakdown</h3>
                    <p className="text-xs text-slate-500">Enrolment by cooperative sector</p>
                  </div>
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded">
                    5 Sectors
                  </span>
                </div>
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockParticipationByCategory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                      <XAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                      <Bar dataKey="count" name="Trainees" radius={[6, 6, 0, 0]}>
                        {mockParticipationByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Live System Audit Stream</h3>
                    <p className="text-xs text-slate-500">Real-time certifications and nominations</p>
                  </div>
                  <button onClick={() => setActiveTab('Reports')} className="text-xs text-blue-600 font-semibold hover:underline">
                    View All Reports →
                  </button>
                </div>
                <div className="space-y-3">
                  {mockRecentActivities.map((act) => (
                    <div key={act.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{act.action}</p>
                          <p className="text-slate-500 dark:text-slate-400 mt-0.5">{act.detail}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          {act.badge}
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-1">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apex Quick Launch Pad */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-soft flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> SIH 2026 Showcase Mode
                  </span>
                  <h4 className="text-lg font-bold mt-2">National Cooperative Architecture</h4>
                  <p className="text-xs text-blue-200 mt-1">
                    Demonstrate end-to-end capacity building workflow from training nomination to verified hiring.
                  </p>
                </div>
                <div className="space-y-2 mt-6">
                  <button
                    onClick={() => setActiveTab('Programmes')}
                    className="w-full py-2 px-3 text-xs font-semibold bg-white/10 hover:bg-white/20 rounded-xl text-left flex items-center justify-between transition"
                  >
                    <span>1. Manage Programmes</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('Nomination')}
                    className="w-full py-2 px-3 text-xs font-semibold bg-white/10 hover:bg-white/20 rounded-xl text-left flex items-center justify-between transition"
                  >
                    <span>2. Review Trainee Nominations</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('Attendance')}
                    className="w-full py-2 px-3 text-xs font-semibold bg-white/10 hover:bg-white/20 rounded-xl text-left flex items-center justify-between transition"
                  >
                    <span>3. Test Biometric Attendance DEMO</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('Certificates')}
                    className="w-full py-2 px-3 text-xs font-semibold bg-white/10 hover:bg-white/20 rounded-xl text-left flex items-center justify-between transition"
                  >
                    <span>4. Verify Digital Certificates</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: PROGRAMMES (CRUD + VIEW DETAILS) */}
        {/* ========================================================================= */}
        {activeTab === 'Programmes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">National Programme Management</h2>
                <p className="text-xs text-slate-500">Accredited diplomas and specialized executive masterclasses</p>
              </div>
              <button
                onClick={() => {
                  setEditingProgramme(null);
                  setProgForm({
                    name: '',
                    institute: 'ICM Madurai',
                    trainees: 45,
                    duration: '4 Weeks',
                    category: 'Management',
                    status: 'Active',
                    startDate: '10 Mar 2026'
                  });
                  setIsAddProgOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Programme</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search programmes by name or institute..."
                  value={progSearch}
                  onChange={(e) => setProgSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 flex items-center gap-1"><Filter className="w-3 h-3" /> Status:</span>
                {(['All', 'Active', 'Upcoming', 'Completed'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                      statusFilter === st
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Programmes Table */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Programme Name</th>
                      <th className="p-3.5">Training Institute</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Trainees</th>
                      <th className="p-3.5">Duration</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredProgrammes.map((prog) => (
                      <tr key={prog.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                          {prog.name}
                          <span className="block text-[10px] text-slate-400 font-normal">Starts: {prog.startDate}</span>
                        </td>
                        <td className="p-3.5">{prog.institute}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {prog.category}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono font-bold">{prog.trainees} seats</td>
                        <td className="p-3.5">{prog.duration}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            prog.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : prog.status === 'Upcoming'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {prog.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => setSelectedProgramme(prog)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openEditProgramme(prog)}
                            className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 rounded-lg transition"
                            title="Edit Programme"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProgramme(prog.id, prog.name)}
                            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition"
                            title="Delete Programme"
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
        {/* VIEW 3: TRAINEES DIRECTORY */}
        {/* ========================================================================= */}
        {activeTab === 'Trainees' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">National Trainees Directory</h2>
                <p className="text-xs text-slate-500">Centralized records of all candidates enrolled across 28 institutes</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-3 py-1.5 rounded-xl">
                Total Enrolled: {trainees.length} Demo Records
              </span>
            </div>

            {/* Filter and search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by candidate name, location, or programme..."
                  value={traineeSearch}
                  onChange={(e) => setTraineeSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Institute:</span>
                <select
                  value={traineeInstituteFilter}
                  onChange={(e) => setTraineeInstituteFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="All">All Institutes</option>
                  <option value="Madurai">ICM Madurai</option>
                  <option value="Bengaluru">RICM Bengaluru</option>
                  <option value="Pune">VAMNICOM Pune</option>
                  <option value="Gandhinagar">ICM Gandhinagar</option>
                  <option value="Dehradun">ICM Dehradun</option>
                </select>
              </div>
            </div>

            {/* Trainees Table */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Candidate</th>
                      <th className="p-3.5">Institute & Batch</th>
                      <th className="p-3.5">Learning Progress</th>
                      <th className="p-3.5">Biometric Attendance</th>
                      <th className="p-3.5">AI Skill Score</th>
                      <th className="p-3.5 text-right">Profile Action</th>
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
                              <span className="text-[10px] text-slate-400">{tr.location}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{tr.institute}</span>
                          <span className="block text-[10px] text-slate-400">{tr.batch}</span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${tr.learningProgress}%` }}></div>
                            </div>
                            <span className="font-mono text-[11px] font-bold">{tr.learningProgress}%</span>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="font-mono font-bold text-emerald-600">{tr.attendanceRate}%</span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 font-bold rounded bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                            {tr.skillScore}/100
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setSelectedTrainee(tr)}
                            className="px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 rounded-lg hover:bg-blue-100 transition"
                          >
                            View Dossier
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
        {/* VIEW 4: NOMINATION (APPROVE / REJECT) */}
        {/* ========================================================================= */}
        {activeTab === 'Nomination' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">State Federation Nomination Desk</h2>
                <p className="text-xs text-slate-500">Review and approve trainees sponsored by Primary Agricultural Societies and Apex Banks</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-3 py-1 rounded-xl">
                  {nominations.filter(n => n.status === 'Pending').length} Action Required
                </span>
              </div>
            </div>

            {/* Nominations Table */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Candidate Name</th>
                      <th className="p-3.5">Sponsoring Society / Bank</th>
                      <th className="p-3.5">State / District</th>
                      <th className="p-3.5">Applied Programme</th>
                      <th className="p-3.5">Experience</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Approval Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {nominations.map((nom) => (
                      <tr key={nom.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                          {nom.candidateName}
                          <span className="block text-[10px] text-slate-400 font-normal">ID: {nom.id}</span>
                        </td>
                        <td className="p-3.5">{nom.organization}</td>
                        <td className="p-3.5">{nom.district}, {nom.state}</td>
                        <td className="p-3.5 font-semibold text-blue-600 dark:text-blue-400">{nom.programmeApplied}</td>
                        <td className="p-3.5">{nom.experienceYears} Years</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            nom.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : nom.status === 'Rejected'
                              ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            {nom.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          {nom.status === 'Pending' ? (
                            <>
                              <button
                                onClick={() => handleNominationStatus(nom.id, 'Approved')}
                                className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleNominationStatus(nom.id, 'Rejected')}
                                className="px-2.5 py-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-[11px] text-slate-400">Processed</span>
                          )}
                          <button
                            onClick={() => setSelectedNomination(nom)}
                            className="p-1 text-slate-500 hover:text-blue-600 rounded"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
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
        {/* VIEW 5: ATTENDANCE & BIOMETRIC DEMO */}
        {/* ========================================================================= */}
        {activeTab === 'Attendance' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">National Biometric Attendance Terminal</h2>
                <p className="text-xs text-slate-500">Live monitoring of QR code scans and facial recognition checkpoints</p>
              </div>

              {/* DEMO ACTION BUTTONS */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAttendanceModalType('qr')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-100 transition shadow-sm"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Launch QR Scanner DEMO</span>
                </button>
                <button
                  onClick={() => setAttendanceModalType('face')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition"
                >
                  <ScanFace className="w-4 h-4" />
                  <span>Launch Face Recog DEMO</span>
                </button>
              </div>
            </div>

            {/* Attendance Analytics BarChart */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Weekly Check-in Compliance</h3>
                  <p className="text-xs text-slate-500">QR Code vs Face Recognition Terminal Check-in Rate</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                  94.8% Average Rate
                </span>
              </div>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAttendanceTrend} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                    <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <YAxis domain={[80, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar dataKey="qrRate" name="QR Attendance %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="faceRate" name="Face Recog %" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance Records Log */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Live Terminal Check-in Stream</h3>
                <span className="text-xs text-slate-400">Auto-synchronized with cloud biometrics</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Record ID</th>
                      <th className="p-3.5">Trainee Name</th>
                      <th className="p-3.5">Check-in Method</th>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">Training Hall</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {attendanceRecords.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-mono text-[11px] text-slate-400">{att.id}</td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{att.trainee}</td>
                        <td className="p-3.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold text-[10px] ${
                            att.method === 'Face Recognition'
                              ? 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
                              : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          }`}>
                            {att.method === 'Face Recognition' ? <ScanFace className="w-3 h-3" /> : <QrCode className="w-3 h-3" />}
                            {att.method}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono">{att.time}</td>
                        <td className="p-3.5">{att.hall}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            att.status === 'Present'
                              ? 'bg-emerald-100 text-emerald-700'
                              : att.status === 'Late'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {att.status}
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
        {/* VIEW 6: LMS (COURSES, MODULES & VIDEOS) */}
        {/* ========================================================================= */}
        {activeTab === 'LMS' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">National Learning Management System (LMS)</h2>
                <p className="text-xs text-slate-500">Standardized courseware, digital curriculum, and e-learning resources</p>
              </div>
              <button
                onClick={() => {
                  const newC: Course = {
                    id: `CRS-${Date.now().toString().slice(-4)}`,
                    name: "AI & Data Analytics in PACS Operations",
                    duration: "20 Hours",
                    lessons: 12,
                    progress: 0,
                    category: "Technology",
                    level: "Intermediate",
                    instructor: "NCCT AI Faculty Hub"
                  };
                  setCourses(prev => [newC, ...prev]);
                  showToast("New LMS Course 'AI & Data Analytics in PACS' added to curriculum.");
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Publish New Course</span>
              </button>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div key={course.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {course.category}
                      </span>
                      <span className="text-[11px] text-slate-400">{course.level}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm mt-2">{course.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">Instructor: {course.instructor}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                      <span>{course.lessons} Lessons • {course.duration}</span>
                      <span className="font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition"
                    >
                      View Syllabus & Modules →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 7: ASSESSMENTS (CREATE, VIEW RESULTS) */}
        {/* ========================================================================= */}
        {activeTab === 'Assessments' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">National Assessment & Examination Bank</h2>
                <p className="text-xs text-slate-500">Standardized MCQ quizzes, practical ledger assessments, and scoring</p>
              </div>
              <button
                onClick={() => setIsCreateQuizOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Create Assessment</span>
              </button>
            </div>

            {/* Quizzes Table */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Assessment Name</th>
                      <th className="p-3.5">Mapped Course</th>
                      <th className="p-3.5">Questions</th>
                      <th className="p-3.5">Attempts</th>
                      <th className="p-3.5">Average Score</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {quizzes.map((qz) => (
                      <tr key={qz.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                          {qz.name}
                          <span className="block text-[10px] text-slate-400 font-normal">ID: {qz.id}</span>
                        </td>
                        <td className="p-3.5">{qz.course}</td>
                        <td className="p-3.5 font-mono">{qz.questions} MCQs</td>
                        <td className="p-3.5 font-mono">{qz.attempts} Candidates</td>
                        <td className="p-3.5 font-mono font-bold text-purple-600">{qz.averageScore}%</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            {qz.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setViewingQuizResult(qz)}
                            className="px-3 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950 rounded-lg transition"
                          >
                            View Result Analytics
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
        {/* VIEW 8: CERTIFICATES (VIEW & VERIFY) */}
        {/* ========================================================================= */}
        {activeTab === 'Certificates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Verifiable Certificate Ledger</h2>
                <p className="text-xs text-slate-500">Cryptographically signed digital credentials issued by NCCT</p>
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by certificate ID or trainee..."
                  value={certSearch}
                  onChange={(e) => setCertSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Certificates Table */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Certificate ID</th>
                      <th className="p-3.5">Trainee Name</th>
                      <th className="p-3.5">Accredited Programme</th>
                      <th className="p-3.5">Issue Date</th>
                      <th className="p-3.5">Grade</th>
                      <th className="p-3.5">Ledger Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredCertificates.map((cert) => (
                      <tr key={cert.certificateId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">{cert.certificateId}</td>
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">{cert.traineeName}</td>
                        <td className="p-3.5">{cert.programme}</td>
                        <td className="p-3.5">{cert.completionDate}</td>
                        <td className="p-3.5 font-semibold text-emerald-600">{cert.grade}</td>
                        <td className="p-3.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            cert.verificationStatus === 'Verified'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            <ShieldCheck className="w-3 h-3" />
                            {cert.verificationStatus}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => setSelectedCertificate(cert)}
                            className="px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 rounded-lg hover:bg-blue-100 transition"
                          >
                            View Preview
                          </button>
                          <button
                            onClick={() => handleVerifyCertificate(cert.certificateId)}
                            className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                          >
                            Verify Hash
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
        {/* VIEW 9: ANALYTICS (FULL CHARTS) */}
        {/* ========================================================================= */}
        {activeTab === 'Analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Apex Analytics & Intelligence Dashboard</h2>
              <p className="text-xs text-slate-500">Longitudinal analytics across institutes, pass rates, and cooperative placements</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enrollment & Certified Area */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Enrollment vs Certification Rate</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockEnrollmentTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                      <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Area type="monotone" dataKey="enrolled" name="Enrolled Trainees" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
                      <Area type="monotone" dataKey="certified" name="Certified Graduates" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Course Completion Pie */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Cohort Progression Status</h3>
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockCompletionRateData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {mockCompletionRateData.map((entry, index) => (
                          <Cell key={`cell-pie-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weekly Attendance Bar */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Biometric Verification Success Ratio</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockAttendanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                      <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <YAxis domain={[80, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                      <Bar dataKey="qrRate" name="QR %" fill="#2563eb" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="faceRate" name="Face Recog %" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Breakdown Bar */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Capacity Building by Sector Priority</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockParticipationByCategory}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                      <XAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                      <Bar dataKey="count" name="Trainees" radius={[6, 6, 0, 0]}>
                        {mockParticipationByCategory.map((entry, index) => (
                          <Cell key={`bar-entry-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 10: REPORTS (PREVIEW & DOWNLOAD) */}
        {/* ========================================================================= */}
        {activeTab === 'Reports' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Apex Regulatory & Governance Reports</h2>
                <p className="text-xs text-slate-500">Official statutory reports for the Ministry of Cooperation and Parliamentary committees</p>
              </div>
              <button
                onClick={() => showToast("Exporting comprehensive national archive as ZIP bundle...")}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export All Reports (ZIP)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockAdminReports.map((rep) => (
                <div key={rep.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {rep.category} Report
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">Period: {rep.period}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm mt-2">{rep.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">Generated: {rep.generatedDate} • Total Audited: {rep.recordsCount.toLocaleString()} Records</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedReport(rep.title)}
                      className="px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition"
                    >
                      Preview Dossier
                    </button>
                    <button
                      onClick={() => showToast(`Report "${rep.title}" downloaded successfully.`)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 11: SETTINGS */}
        {/* ========================================================================= */}
        {activeTab === 'Settings' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">National Council Apex Settings</h2>
              <p className="text-xs text-slate-500">Configure central portal attributes, biometric endpoints, and security keys</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-6">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                Apex Officer Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Director General Name</label>
                  <input
                    type="text"
                    value={adminProfile.name}
                    onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Email Address</label>
                  <input
                    type="text"
                    value={adminProfile.email}
                    onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Office Location</label>
                  <input
                    type="text"
                    value={adminProfile.office}
                    onChange={(e) => setAdminProfile({ ...adminProfile, office: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Language Localization</label>
                  <select
                    value={adminProfile.language}
                    onChange={(e) => setAdminProfile({ ...adminProfile, language: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="English (National Standard)">English (National Standard)</option>
                    <option value="Hindi (Rajbhasha)">Hindi (Rajbhasha)</option>
                    <option value="Tamil (ICM Regional)">Tamil (ICM Regional)</option>
                  </select>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2 pt-4">
                Biometric & Notification Preferences
              </h3>
              <div className="space-y-3 text-xs">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={adminProfile.emailAlerts}
                    onChange={(e) => setAdminProfile({ ...adminProfile, emailAlerts: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Dispatch automated daily attendance audit logs to Ministry of Cooperation</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={adminProfile.mfaEnabled}
                    onChange={(e) => setAdminProfile({ ...adminProfile, mfaEnabled: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Enforce Multi-Factor Authentication (MFA) for Certificate Issuance Keys</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSettingsSaved(true);
                    showToast("Apex Council Settings saved successfully.");
                    setTimeout(() => setSettingsSaved(false), 2000);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
                >
                  {settingsSaved ? "Settings Saved ✓" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODALS: ADD/EDIT PROGRAMME */}
      {/* ========================================================================= */}
      {isAddProgOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {editingProgramme ? "Edit National Programme" : "Create New National Programme"}
              </h3>
              <button onClick={() => setIsAddProgOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveProgramme} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Programme Name *</label>
                <input
                  type="text"
                  required
                  value={progForm.name}
                  onChange={(e) => setProgForm({ ...progForm, name: e.target.value })}
                  placeholder="e.g. PACS Core Accounting & Micro-Credit Operations"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Host Institute</label>
                  <select
                    value={progForm.institute}
                    onChange={(e) => setProgForm({ ...progForm, institute: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="ICM Madurai">ICM Madurai</option>
                    <option value="RICM Bengaluru">RICM Bengaluru</option>
                    <option value="VAMNICOM Pune">VAMNICOM Pune</option>
                    <option value="ICM Bhopal">ICM Bhopal</option>
                    <option value="ICM Gandhinagar">ICM Gandhinagar</option>
                    <option value="ICM Dehradun">ICM Dehradun</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Target Trainees</label>
                  <input
                    type="number"
                    min="10"
                    max="200"
                    value={progForm.trainees}
                    onChange={(e) => setProgForm({ ...progForm, trainees: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Duration</label>
                  <input
                    type="text"
                    value={progForm.duration}
                    onChange={(e) => setProgForm({ ...progForm, duration: e.target.value })}
                    placeholder="e.g. 6 Weeks"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    value={progForm.category}
                    onChange={(e) => setProgForm({ ...progForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="Technology">Technology (PACS ERP)</option>
                    <option value="Management">Management (DCBM)</option>
                    <option value="Legal & Governance">Legal & Governance</option>
                    <option value="Finance & Credit">Finance & Credit</option>
                    <option value="Agri-Allied">Agri-Allied & Dairy</option>
                    <option value="Entrepreneurship">Entrepreneurship & FPO</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProgOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
                >
                  {editingProgramme ? "Update Programme" : "Publish Programme"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PROGRAMME DETAILS SNAPSHOT */}
      {selectedProgramme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Programme Dossier</h3>
              <button onClick={() => setSelectedProgramme(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Programme:</strong> {selectedProgramme.name}</p>
              <p><strong>Host Institute:</strong> {selectedProgramme.institute}</p>
              <p><strong>Approved Intake:</strong> {selectedProgramme.trainees} Seats</p>
              <p><strong>Duration:</strong> {selectedProgramme.duration}</p>
              <p><strong>Sector Category:</strong> {selectedProgramme.category}</p>
              <p><strong>Batch Commencement:</strong> {selectedProgramme.startDate}</p>
              <p><strong>Status:</strong> {selectedProgramme.status}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedProgramme(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: TRAINEE DOSSIER */}
      {selectedTrainee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img src={selectedTrainee.photo} alt={selectedTrainee.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{selectedTrainee.name}</h3>
                  <p className="text-xs text-slate-500">{selectedTrainee.id} • {selectedTrainee.location}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTrainee(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                <div><strong>Enrolled Programme:</strong><br />{selectedTrainee.programme}</div>
                <div><strong>Institute:</strong><br />{selectedTrainee.institute}</div>
                <div><strong>Assigned Batch:</strong><br />{selectedTrainee.batch}</div>
                <div><strong>Official Email:</strong><br />{selectedTrainee.email}</div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950">
                  <span className="text-[10px] text-slate-400">Progress</span>
                  <p className="font-bold text-blue-600 text-sm">{selectedTrainee.learningProgress}%</p>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950">
                  <span className="text-[10px] text-slate-400">Attendance</span>
                  <p className="font-bold text-emerald-600 text-sm">{selectedTrainee.attendanceRate}%</p>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950">
                  <span className="text-[10px] text-slate-400">AI Score</span>
                  <p className="font-bold text-purple-600 text-sm">{selectedTrainee.skillScore}/100</p>
                </div>
              </div>

              <div>
                <strong className="block mb-1 text-[11px] uppercase tracking-wider text-slate-400">Verified Skills:</strong>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTrainee.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedTrainee(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NOMINATION DETAILS */}
      {selectedNomination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Nomination Dossier</h3>
              <button onClick={() => setSelectedNomination(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <p><strong>Candidate:</strong> {selectedNomination.candidateName}</p>
              <p><strong>Sponsoring Entity:</strong> {selectedNomination.organization}</p>
              <p><strong>District & State:</strong> {selectedNomination.district}, {selectedNomination.state}</p>
              <p><strong>Target Course:</strong> {selectedNomination.programmeApplied}</p>
              <p><strong>Years in Sector:</strong> {selectedNomination.experienceYears} Years</p>
              <p><strong>Submission Date:</strong> {selectedNomination.submissionDate}</p>
              <p><strong>Current Status:</strong> <span className="font-bold text-blue-600">{selectedNomination.status}</span></p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              {selectedNomination.status === 'Pending' && (
                <>
                  <button
                    onClick={() => {
                      handleNominationStatus(selectedNomination.id, 'Approved');
                      setSelectedNomination(null);
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-xl"
                  >
                    Approve Nomination
                  </button>
                  <button
                    onClick={() => {
                      handleNominationStatus(selectedNomination.id, 'Rejected');
                      setSelectedNomination(null);
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 rounded-xl"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedNomination(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: LMS COURSE SYLLABUS */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Course Curriculum</h3>
              <button onClick={() => setSelectedCourse(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-sm text-blue-600">{selectedCourse.name}</h4>
              <p><strong>Faculty:</strong> {selectedCourse.instructor}</p>
              <p><strong>Syllabus Scope:</strong> {selectedCourse.lessons} Modules • {selectedCourse.duration}</p>
              <p><strong>Difficulty:</strong> {selectedCourse.level} • Category: {selectedCourse.category}</p>
              <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                <p className="font-semibold text-slate-700 dark:text-slate-300">Core Learning Modules:</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                  <li>Module 1: Statutory Framework & Democratic Control</li>
                  <li>Module 2: Double-Entry Ledger Book Reconciliation in PACS</li>
                  <li>Module 3: Core Banking Architecture & Cyber Audit</li>
                  <li>Module 4: Final Practical Assessment & Digital Certification</li>
                </ul>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl"
              >
                Close Syllabus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ASSESSMENT RESULT BREAKDOWN */}
      {viewingQuizResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Assessment Results Audit</h3>
              <button onClick={() => setViewingQuizResult(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-sm text-purple-600">{viewingQuizResult.name}</h4>
              <p>Course: {viewingQuizResult.course}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950">
                  <span className="text-[10px] text-slate-400">Total Attempts</span>
                  <p className="font-bold text-purple-600 text-sm">{viewingQuizResult.attempts}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950">
                  <span className="text-[10px] text-slate-400">Average Score</span>
                  <p className="font-bold text-emerald-600 text-sm">{viewingQuizResult.averageScore}%</p>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950">
                  <span className="text-[10px] text-slate-400">Pass Ratio</span>
                  <p className="font-bold text-blue-600 text-sm">92.4%</p>
                </div>
              </div>
              <p className="text-slate-500 text-[11px]">
                Audited against NCCT 2026 Examination By-laws. Trainees with scores above 75% are auto-awarded blockchain certificates.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setViewingQuizResult(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 rounded-xl"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REUSABLE BIOMETRIC ATTENDANCE DEMO MODAL */}
      <AttendanceDemoModal
        isOpen={attendanceModalType !== null}
        onClose={() => setAttendanceModalType(null)}
        type={attendanceModalType || 'qr'}
        traineeName="Aarav Sharma"
        onSuccess={handleAttendanceSuccess}
      />

      {/* REUSABLE CERTIFICATE PREVIEW MODAL */}
      {selectedCertificate && (
        <CertificateModal
          isOpen={true}
          onClose={() => setSelectedCertificate(null)}
          certificate={selectedCertificate}
        />
      )}

      {/* REUSABLE CREATE QUIZ MODAL */}
      <CreateQuizModal
        isOpen={isCreateQuizOpen}
        onClose={() => setIsCreateQuizOpen(false)}
        onSave={(q) => {
          setQuizzes(prev => [q, ...prev]);
          showToast(`Assessment "${q.name}" published successfully.`);
        }}
      />

      {/* REUSABLE REPORT PREVIEW MODAL */}
      {selectedReport && (
        <ReportPreviewModal
          isOpen={true}
          onClose={() => setSelectedReport(null)}
          reportTitle={selectedReport}
        />
      )}

    </div>
  );
};
