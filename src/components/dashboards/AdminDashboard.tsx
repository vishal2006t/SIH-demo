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
  ChevronRight,
  Filter,
  Eye,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  MoreVertical
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
  mockRecentActivities
} from '../../data/mockData';
import { Programme } from '../../types';

interface AdminDashboardProps {
  onOpenProgrammeModal?: (prog: Programme) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onOpenProgrammeModal }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(null);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Upcoming' | 'Completed'>('All');

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Programmes', icon: Calendar },
    { name: 'Trainees', icon: Users },
    { name: 'Nomination', icon: UserCheck },
    { name: 'Attendance', icon: Clock },
    { name: 'LMS', icon: BookOpen },
    { name: 'Assessments', icon: FileCheck2 },
    { name: 'Certificates', icon: Award },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Reports', icon: FileSpreadsheet },
    { name: 'Settings', icon: Settings }
  ];

  const filteredProgrammes = statusFilter === 'All'
    ? mockProgrammes
    : mockProgrammes.filter(p => p.status === statusFilter);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
        <div className="mb-6 px-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Building className="w-4 h-4" />
            <span>National Council NCCT</span>
          </div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
            Apex Admin Console
          </h2>
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
                {item.name === 'Assessments' && (
                  <span className="px-1.5 py-0.5 text-[10px] bg-amber-400 text-slate-950 font-bold rounded-full">
                    3
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/60 dark:to-blue-950/40 border border-blue-200 dark:border-slate-700 text-xs">
          <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI Capacity Insights</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            National PACS Computerization target is at <strong>74.2% completion</strong> across 28 institutes.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
        
        {/* Top Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                Governance View
              </span>
              <span className="text-xs text-slate-400">• New Delhi Headquarters</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              National Cooperative Capacity Building Dashboard
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time monitoring across 28 Regional & State Institutes of Cooperative Management (RICM/ICMs)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Synchronized with National Cooperative Database (NCD).")}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
              <span>Sync NCD Data</span>
            </button>
          </div>
        </div>

        {/* 4 Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Trainees</span>
              <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {mockAdminStats.totalTrainees}
              </span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +18.4% YoY
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Across 28 states & UTs</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Programmes</span>
              <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                <Calendar className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {mockAdminStats.activeProgrammes}
              </span>
              <span className="text-[11px] font-bold text-teal-600">89 Offline • 53 Hybrid</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">12 Upcoming next week</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Training Institutes</span>
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                <Building className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {mockAdminStats.trainingInstitutes}
              </span>
              <span className="text-[11px] font-bold text-purple-600">5 RICMs • 23 ICMs</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">100% ERP Connected</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Certificates Issued</span>
              <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <Award className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {mockAdminStats.certificatesIssued}
              </span>
              <span className="text-[11px] font-bold text-emerald-600">99.8% Verified</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Stored on Digital Skill Passport</p>
          </div>

        </div>

        {/* 4 Interactive Recharts Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Trainee Enrollment Trend */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Trainee Enrollment Trend
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Monthly enrolled vs successfully certified
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                6-Month Trajectory
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockEnrollmentTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEnrolled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCert" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="enrolled" name="Enrolled Trainees" stroke="#2563eb" fillOpacity={1} fill="url(#colorEnrolled)" />
                  <Area type="monotone" dataKey="certified" name="Certified Graduates" stroke="#10b981" fillOpacity={1} fill="url(#colorCert)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Programme Participation */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Programme Participation
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enrolment breakdown by sector theme
                </p>
              </div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded">
                Theme Distribution
              </span>
            </div>

            <div className="h-64 w-full">
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

          {/* Chart 3: Course Completion */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Course Completion Ratio
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  National cohort progression status
                </p>
              </div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded">
                68% Completed
              </span>
            </div>

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
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Attendance Overview */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Attendance Overview
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Biometric Terminal Check-in Rate (Weekly)
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                94.8% Average
              </span>
            </div>

            <div className="h-64 w-full">
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

        </div>

        {/* Programme Management Table */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Programme Management
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Active & Upcoming Diploma and Executive batches across institutes
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
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

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Programme Name</th>
                  <th className="p-3.5">Training Institute</th>
                  <th className="p-3.5">Trainees</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
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
                      <span className="font-mono font-bold">{prog.trainees}</span> seats
                    </td>
                    <td className="p-3.5">{prog.duration}</td>
                    <td className="p-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        prog.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : prog.status === 'Upcoming'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {prog.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedProgramme(prog)}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities Timeline Table */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Recent Pan-India Activities
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Real-time audit log of certifications, allocations, and drives
              </p>
            </div>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">
              Export Audit Log
            </span>
          </div>

          <div className="space-y-3">
            {mockRecentActivities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">{act.action}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{act.detail}</p>
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

      </main>

      {/* Demo Modal for Programme Details */}
      {selectedProgramme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Programme Snapshot</h3>
              <button onClick={() => setSelectedProgramme(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>Programme:</strong> {selectedProgramme.name}</p>
              <p><strong>Institute:</strong> {selectedProgramme.institute}</p>
              <p><strong>Enrolled Trainees:</strong> {selectedProgramme.trainees} Candidates</p>
              <p><strong>Duration:</strong> {selectedProgramme.duration}</p>
              <p><strong>Category:</strong> {selectedProgramme.category}</p>
              <p><strong>Start Date:</strong> {selectedProgramme.startDate}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedProgramme(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl"
              >
                Close Snapshot
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
