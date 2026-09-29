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
  UserCheck
} from 'lucide-react';
import {
  initialTimetable,
  mockHostelRooms,
  mockLogistics,
  mockAttendanceRecords,
  mockCourses,
  mockVideos,
  mockQuizzes,
  mockTraineeProfile
} from '../../data/mockData';
import { TimetableItem, HostelRoom, QuizItem, VideoItem } from '../../types';
import { AttendanceDemoModal } from '../modals/AttendanceDemoModal';
import { TimetableModal } from '../modals/TimetableModal';
import { RoomAllocationModal } from '../modals/RoomAllocationModal';
import { VideoPlayerModal } from '../modals/VideoPlayerModal';
import { CreateQuizModal } from '../modals/CreateQuizModal';
import { ReportPreviewModal } from '../modals/ReportPreviewModal';

export const TrainerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  // State for Timetable with Add, Edit, Delete
  const [timetable, setTimetable] = useState<TimetableItem[]>(initialTimetable);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
  const [editingTimetable, setEditingTimetable] = useState<TimetableItem | null>(null);

  // State for Hostel
  const [hostelRooms, setHostelRooms] = useState<HostelRoom[]>(mockHostelRooms);
  const [allocatingRoom, setAllocatingRoom] = useState<HostelRoom | null>(null);

  // State for Attendance Demo Modal
  const [attendanceModalType, setAttendanceModalType] = useState<'qr' | 'face' | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendanceRecords);

  // State for Videos
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  // State for Quizzes
  const [quizzes, setQuizzes] = useState<QuizItem[]>(mockQuizzes);
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);

  // State for Reports
  const [viewingReport, setViewingReport] = useState<string | null>(null);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Batches', icon: Calendar },
    { name: 'Trainees', icon: Users },
    { name: 'Timetable', icon: Clock },
    { name: 'Hostel Monitoring', icon: BedDouble },
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
    } else {
      setTimetable(prev => [item, ...prev]);
    }
  };

  const handleDeleteTimetable = (id: string) => {
    if (confirm("Are you sure you want to remove this session from the timetable?")) {
      setTimetable(prev => prev.filter(t => t.id !== id));
    }
  };

  // Hostel Allocation Handler
  const handleAllocateRoom = (roomNo: string, traineeName: string) => {
    setHostelRooms(prev => prev.map(room => {
      if (room.roomNo === roomNo) {
        const nextOccupied = Math.min(room.capacity, room.occupied + 1);
        const nextAvailable = room.capacity - nextOccupied;
        return {
          ...room,
          occupied: nextOccupied,
          available: nextAvailable,
          status: nextAvailable === 0 ? 'Full' : 'Available',
          occupants: [...(room.occupants || []), traineeName]
        };
      }
      return room;
    }));
  };

  // Attendance Check-in Success
  const handleAttendanceSuccess = () => {
    const newRecord = {
      id: `ATT-${Date.now()}`,
      trainee: "Aarav Sharma",
      date: new Date().toISOString().split('T')[0],
      method: (attendanceModalType === 'qr' ? 'QR Code' : 'Face Recognition') as any,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Present' as const,
      hall: 'Hall A-102'
    };
    setAttendanceRecords(prev => [newRecord, ...prev]);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
        <div className="mb-6 px-3">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            <Building className="w-4 h-4" />
            <span>ICM Madurai Portal</span>
          </div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
            Trainer & Faculty Console
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
                    ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.name === 'Hostel Monitoring' && (
                  <span className="text-[10px] text-teal-200 bg-teal-800/40 px-1.5 py-0.5 rounded">
                    80%
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-x-hidden">
        
        {/* Top Header */}
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
              Manage cohort timetables, hostel allocations, biometric attendance, and LMS assessments.
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
              <span>+ Add Timetable</span>
            </button>
          </div>
        </div>

        {/* 4 Dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Batches</span>
              <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                <Calendar className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">8</span>
              <span className="text-[11px] font-bold text-teal-600">Cohorts Live</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">DCBM, PACS & FPO streams</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Trainees</span>
              <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">340</span>
              <span className="text-[11px] font-bold text-blue-600">On Campus</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">168 Hostelled Trainees</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Today's Attendance</span>
              <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <ScanFace className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">96.4%</span>
              <span className="text-[11px] font-bold text-emerald-600">+1.2% vs yesterday</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">QR Scan & Facial Terminals</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Assessments</span>
              <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                <HelpCircle className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">3</span>
              <span className="text-[11px] font-bold text-purple-600">Scheduled</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Evaluation closing Friday</p>
          </div>

        </div>

        {/* Section: TIMETABLE MANAGEMENT */}
        <div id="timetable-section" className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-600" />
                Training Timetable Schedule
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage lecture halls, faculty allocations, and batch timings (Interactive Add, Edit, Delete)
              </p>
            </div>

            <button
              onClick={() => {
                setEditingTimetable(null);
                setIsTimetableModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Timetable</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
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
                    <td className="p-3.5 font-mono text-teal-600 dark:text-teal-400">{session.time}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{session.subject}</td>
                    <td className="p-3.5">{session.trainer}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {session.trainingHall}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-blue-600">{session.batch}</td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => {
                          setEditingTimetable(session);
                          setIsTimetableModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Edit Session"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTimetable(session.id)}
                        className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Delete Session"
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

        {/* Section: MY BATCHES */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                My Batches
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cohorts assigned to your faculty department
              </p>
            </div>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2.5 py-1 rounded-full">
              4 Primary Batches
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "DCBM-2026-B1", prog: "Diploma in Coop Business Mgmt", count: 60, start: "15 Jan 2026", end: "30 Jun 2026", status: "Active" },
              { name: "PACS-ERP-2026", prog: "PACS Computerization & ERP", count: 45, start: "02 Feb 2026", end: "02 Mar 2026", status: "Active" },
              { name: "FPO-2026-A", prog: "FPO Leadership & Marketing", count: 52, start: "20 Jan 2026", end: "20 Mar 2026", status: "Active" },
              { name: "DCCB-AUDIT-26", prog: "Statutory Audit for DCCBs", count: 40, start: "01 Mar 2026", end: "22 Mar 2026", status: "Upcoming" }
            ].map((batch, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{batch.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    batch.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {batch.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{batch.prog}</p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                  <span>Trainees: <strong className="text-slate-900 dark:text-white">{batch.count}</strong></span>
                  <span>{batch.start}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: HOSTEL MONITORING */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-teal-600" />
                Hostel Monitoring
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Residential hostel wing occupancy and bed allocation
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-500">Total Rooms: <strong className="text-slate-900 dark:text-white">60</strong></span>
              <span className="text-emerald-600 font-bold">Occupied: 48</span>
              <span className="text-blue-600 font-bold">Available: 10</span>
              <span className="text-slate-500">Trainees in Hostel: <strong className="text-slate-900 dark:text-white">168</strong></span>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Room No</th>
                  <th className="p-3">Block</th>
                  <th className="p-3">Capacity</th>
                  <th className="p-3">Occupied</th>
                  <th className="p-3">Available</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {hostelRooms.map((room) => (
                  <tr key={room.roomNo} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Room {room.roomNo}</td>
                    <td className="p-3">{room.block}</td>
                    <td className="p-3">{room.capacity} Beds</td>
                    <td className="p-3 font-semibold text-emerald-600">{room.occupied}</td>
                    <td className="p-3 font-semibold text-blue-600">{room.available}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        room.status === 'Available'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : room.status === 'Full'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {room.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {room.available > 0 ? (
                        <button
                          onClick={() => setAllocatingRoom(room)}
                          className="px-2.5 py-1 text-xs font-semibold text-teal-600 bg-teal-50 dark:bg-teal-950 hover:bg-teal-100 rounded-lg transition"
                        >
                          Allocate Bed
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Fully Allocated</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section: LOGISTICS READINESS */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Boxes className="w-5 h-5 text-teal-600" />
              Logistics & Infrastructure Inventory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Training Halls, Projectors, Computer Terminals, Learning Kits, and Transportation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockLogistics.map((log) => (
              <div key={log.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{log.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    In Use: <strong className="text-slate-800 dark:text-slate-200">{log.inUse}</strong> / Total: {log.total}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600">{log.available} Available</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: ATTENDANCE TERMINAL (QR & FACE RECOGNITION DEMO) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <ScanFace className="w-5 h-5 text-teal-600" />
                Attendance Terminal Management
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Two verified check-in methods for classroom & hostel presence
              </p>
            </div>

            {/* Attendance Launch Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAttendanceModalType('qr')}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-100 transition shadow-sm"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Scan QR Code</span>
              </button>

              <button
                onClick={() => setAttendanceModalType('face')}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 rounded-xl hover:bg-teal-100 transition shadow-sm"
              >
                <ScanFace className="w-3.5 h-3.5" />
                <span>Start Face Recognition</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Trainee Name</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Check-In Time</th>
                  <th className="p-3">Training Hall</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {attendanceRecords.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{att.trainee}</td>
                    <td className="p-3">{att.date}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                        {att.method === 'QR Code' ? <QrCode className="w-3 h-3 text-blue-500" /> : <ScanFace className="w-3 h-3 text-teal-500" />}
                        {att.method}
                      </span>
                    </td>
                    <td className="p-3 font-mono">{att.time}</td>
                    <td className="p-3">{att.hall}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        att.status === 'Present'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
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

        {/* Section: COURSES & VIDEOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Courses */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  Courses & Curriculum
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Accredited NCCT Diploma & Certification Modules
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {mockCourses.map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{c.name}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {c.duration} • {c.lessons} Lessons • {c.level}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-teal-600">{c.progress}%</span>
                    <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: `${c.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <Video className="w-5 h-5 text-teal-600" />
                  Video Learning Modules
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click play to launch the interactive demo video modal
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {mockVideos.slice(0, 4).map((v) => (
                <div
                  key={v.id}
                  onClick={() => setPlayingVideo(v)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-3 hover:border-teal-400 cursor-pointer group transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-900">
                      <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white group-hover:scale-125 transition-transform" />
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition truncate max-w-xs">
                        {v.title}
                      </h5>
                      <span className="text-[10px] text-slate-400">{v.duration} • {v.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                    Play
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Section: QUIZ / ASSESSMENT */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-600" />
                Quiz / Assessment Administration
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Evaluation results and question bank configurations
              </p>
            </div>

            <button
              onClick={() => setIsCreateQuizOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Quiz</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Quiz Name</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Questions</th>
                  <th className="p-3">Attempts</th>
                  <th className="p-3">Average Score</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {quizzes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{q.name}</td>
                    <td className="p-3">{q.course}</td>
                    <td className="p-3">{q.questions} MCQs</td>
                    <td className="p-3 font-mono">{q.attempts}</td>
                    <td className="p-3 font-bold text-teal-600">{q.averageScore}%</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section: TRAINEE PERFORMANCE CARDS */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              Trainee Performance Index
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated metrics evaluated across Attendance, Learning, Assessment, and Skill
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <span className="text-xs text-slate-500">Attendance Index</span>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">94.6%</p>
              <span className="text-[10px] text-emerald-600 font-semibold">+3.2% above benchmark</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <span className="text-xs text-slate-500">Learning Progress</span>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">82.0%</p>
              <span className="text-[10px] text-blue-600 font-semibold">18/22 Modules Passed</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <span className="text-xs text-slate-500">Assessment Score</span>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">85.6%</p>
              <span className="text-[10px] text-teal-600 font-semibold">Distinction Grade</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <span className="text-xs text-slate-500">Skill Score</span>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">78.0%</p>
              <span className="text-[10px] text-purple-600 font-semibold">AI Diagnostic Matched</span>
            </div>
          </div>
        </div>

        {/* Section: REPORTS */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-teal-600" />
              Institutional Reports & Audits
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generate official NCCT compliance reports and view instantaneous audit snapshots
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Attendance Report",
              "Assessment Report",
              "Training Report",
              "Hostel Report",
              "Performance Report"
            ].map((rep, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{rep}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Updated: March 2026</p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setViewingReport(rep)}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 rounded-lg transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setViewingReport(rep)}
                    className="px-2.5 py-1 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 rounded-lg transition"
                  >
                    Export
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Modals */}
      <TimetableModal
        isOpen={isTimetableModalOpen}
        onClose={() => setIsTimetableModalOpen(false)}
        onSave={handleSaveTimetable}
        initialData={editingTimetable}
      />

      <RoomAllocationModal
        isOpen={allocatingRoom !== null}
        onClose={() => setAllocatingRoom(null)}
        room={allocatingRoom}
        onAllocate={handleAllocateRoom}
      />

      <AttendanceDemoModal
        isOpen={attendanceModalType !== null}
        onClose={() => setAttendanceModalType(null)}
        type={attendanceModalType || 'qr'}
        onSuccess={handleAttendanceSuccess}
      />

      <VideoPlayerModal
        isOpen={playingVideo !== null}
        onClose={() => setPlayingVideo(null)}
        video={playingVideo}
      />

      <CreateQuizModal
        isOpen={isCreateQuizOpen}
        onClose={() => setIsCreateQuizOpen(false)}
        onSave={(newQ) => setQuizzes(prev => [newQ, ...prev])}
      />

      <ReportPreviewModal
        isOpen={viewingReport !== null}
        onClose={() => setViewingReport(null)}
        reportTitle={viewingReport || 'Attendance Report'}
      />

    </div>
  );
};
