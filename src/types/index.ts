export type Role = 'admin' | 'trainer' | 'trainee' | 'employer' | null;

export type Language = 'en' | 'ta' | 'hi' | 'te' | 'ml';

export interface Programme {
  id: string;
  name: string;
  institute: string;
  trainees: number;
  duration: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  category: string;
  startDate: string;
}

export interface TraineeProfile {
  id: string;
  name: string;
  photo: string;
  age: number;
  location: string;
  programme: string;
  institute: string;
  batch: string;
  contact: string;
  email: string;
  skills: string[];
  learningProgress: number;
  attendanceRate: number;
  coursesCompleted: number;
  skillScore: number;
}

export interface TimetableItem {
  id: string;
  date: string;
  time: string;
  subject: string;
  trainer: string;
  trainingHall: string;
  batch: string;
}

export interface HostelRoom {
  roomNo: string;
  capacity: number;
  occupied: number;
  available: number;
  status: 'Available' | 'Full' | 'Maintenance';
  block: string;
  occupants?: string[];
}

export interface LogisticsItem {
  id: string;
  title: string;
  total: number;
  inUse: number;
  available: number;
  status: 'Ready' | 'Maintenance' | 'Allocated';
}

export interface AttendanceRecord {
  id: string;
  trainee: string;
  date: string;
  method: 'QR Code' | 'Face Recognition';
  time: string;
  status: 'Present' | 'Late' | 'Absent';
  hall: string;
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  lessons: number;
  progress: number;
  category: string;
  level: string;
  instructor: string;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  instructor: string;
  thumbnail: string;
  views: string;
}

export interface QuizItem {
  id: string;
  name: string;
  course: string;
  questions: number;
  attempts: number;
  averageScore: number;
  status: 'Active' | 'Draft' | 'Completed';
  userScore?: number;
}

export interface SkillDistribution {
  skill: string;
  score: number;
  benchmark: number;
  category: string;
}

export interface SkillGap {
  skill: string;
  currentLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  targetLevel: string;
  gapCategory: 'High' | 'Medium' | 'Low';
  description: string;
}

export interface RecommendedCourse {
  id: string;
  name: string;
  duration: string;
  reason: string;
  skillsGained: string[];
}

export interface CertificateItem {
  certificateId: string;
  traineeName: string;
  programme: string;
  institute: string;
  completionDate: string;
  verificationStatus: 'Verified' | 'Pending' | 'Flagged';
  qrHash: string;
  grade: string;
  issuingAuthority: string;
}

export interface JobMatchItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  requiredSkills: string[];
  matchPercentage: number;
  deadline: string;
  openings: number;
  applied?: boolean;
}

export interface CandidateItem {
  id: string;
  candidate: string;
  skills: string[];
  certificate: string;
  experience: string;
  aiMatch: number;
  status: 'Shortlisted' | 'In Review' | 'Interview Scheduled' | 'Offered';
  avatar: string;
  email: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'assessment' | 'certificate' | 'course' | 'job' | 'system';
  unread: boolean;
}
