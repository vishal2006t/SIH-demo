import {
  Programme,
  TraineeProfile,
  TimetableItem,
  HostelRoom,
  LogisticsItem,
  AttendanceRecord,
  Course,
  VideoItem,
  QuizItem,
  SkillDistribution,
  SkillGap,
  RecommendedCourse,
  CertificateItem,
  JobMatchItem,
  CandidateItem,
  NotificationItem,
  NominationItem,
  InterviewItem,
  HiredCandidateItem,
  ReportItem,
  JobPostingItem
} from '../types';

export const mockTraineeProfile: TraineeProfile = {
  id: "TR-2026-8942",
  name: "Aarav Sharma",
  photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  age: 24,
  location: "ICM Madurai, Tamil Nadu",
  programme: "Diploma in Cooperative Business Management (DCBM)",
  institute: "Institute of Cooperative Management (ICM), Madurai",
  batch: "DCBM-2026-Cohort-3",
  contact: "+91 98402 12345",
  email: "aarav.sharma@coopnet.gov.in",
  skills: ["PACS Accounting", "Dairy Governance", "Digital Ledger", "Coop Law 2002", "Inventory MIS"],
  learningProgress: 82,
  attendanceRate: 94.6,
  coursesCompleted: 6,
  skillScore: 78
};

export const mockProgrammes: Programme[] = [
  {
    id: "PRG-101",
    name: "PACS Computerization & ERP Masterclass",
    institute: "RICM Bengaluru",
    trainees: 45,
    duration: "4 Weeks",
    status: "Active",
    category: "Technology",
    startDate: "02 Feb 2026"
  },
  {
    id: "PRG-102",
    name: "Diploma in Cooperative Business Management",
    institute: "ICM Madurai",
    trainees: 60,
    duration: "24 Weeks",
    status: "Active",
    category: "Management",
    startDate: "15 Jan 2026"
  },
  {
    id: "PRG-103",
    name: "Multi-State Cooperative Governance & Law",
    institute: "VAMNICOM Pune",
    trainees: 35,
    duration: "6 Weeks",
    status: "Active",
    category: "Legal & Governance",
    startDate: "10 Feb 2026"
  },
  {
    id: "PRG-104",
    name: "Agri-Credit & Risk Assessment for DCCBs",
    institute: "ICM Bhopal",
    trainees: 40,
    duration: "3 Weeks",
    status: "Completed",
    category: "Finance & Credit",
    startDate: "05 Jan 2026"
  },
  {
    id: "PRG-105",
    name: "FPO & Rural Cooperative Entrepreneurship",
    institute: "ICM Dehradun",
    trainees: 52,
    duration: "8 Weeks",
    status: "Upcoming",
    category: "Entrepreneurship",
    startDate: "15 Mar 2026"
  },
  {
    id: "PRG-106",
    name: "Dairy Cooperative Cold Chain Operations",
    institute: "ICM Gandhinagar",
    trainees: 38,
    duration: "5 Weeks",
    status: "Active",
    category: "Agri-Allied",
    startDate: "20 Jan 2026"
  }
];

export const mockAdminStats = {
  totalTrainees: "24,850",
  activeProgrammes: "142",
  trainingInstitutes: "28",
  certificatesIssued: "18,420"
};

export const mockEnrollmentTrend = [
  { month: 'Sep 25', enrolled: 1650, certified: 1420 },
  { month: 'Oct 25', enrolled: 2100, certified: 1850 },
  { month: 'Nov 25', enrolled: 2850, certified: 2400 },
  { month: 'Dec 25', enrolled: 3200, certified: 2900 },
  { month: 'Jan 26', enrolled: 3950, certified: 3300 },
  { month: 'Feb 26', enrolled: 4420, certified: 3820 },
];

export const mockParticipationByCategory = [
  { category: 'PACS ERP', count: 7200, fill: '#2563eb' },
  { category: 'Coop Mgmt', count: 5800, fill: '#0d9488' },
  { category: 'Agri-Credit', count: 4600, fill: '#7c3aed' },
  { category: 'Dairy & FPO', count: 4100, fill: '#f59e0b' },
  { category: 'Legal & Audit', count: 3150, fill: '#06b6d4' }
];

export const mockCompletionRateData = [
  { name: 'Completed', value: 68, fill: '#10b981' },
  { name: 'In Progress', value: 24, fill: '#3b82f6' },
  { name: 'Under Assessment', value: 6, fill: '#f59e0b' },
  { name: 'Remedial', value: 2, fill: '#ef4444' }
];

export const mockAttendanceTrend = [
  { day: 'Mon', qrRate: 92, faceRate: 96, overall: 94 },
  { day: 'Tue', qrRate: 94, faceRate: 97, overall: 95.5 },
  { day: 'Wed', qrRate: 91, faceRate: 95, overall: 93 },
  { day: 'Thu', qrRate: 95, faceRate: 98, overall: 96.5 },
  { day: 'Fri', qrRate: 93, faceRate: 96, overall: 94.5 },
  { day: 'Sat', qrRate: 89, faceRate: 92, overall: 90.5 }
];

export const mockRecentActivities = [
  {
    id: "act-1",
    action: "Cohort Certified",
    detail: "45 trainees from ICM Madurai received verifiable Digital Passports for PACS ERP",
    time: "12 mins ago",
    badge: "Certification",
    color: "emerald"
  },
  {
    id: "act-2",
    action: "New AI Batch Recommendation",
    detail: "AI Engine auto-recommended 'Cybersecurity in PACS' for 84 DCCB officers",
    time: "48 mins ago",
    badge: "AI Insight",
    color: "purple"
  },
  {
    id: "act-3",
    action: "Hostel Allocation Completed",
    detail: "RICM Bengaluru Block B allocated 32 newly enrolled female candidates",
    time: "2 hours ago",
    badge: "Logistics",
    color: "blue"
  },
  {
    id: "act-4",
    action: "Employer Drive Registered",
    detail: "Tamil Nadu Apex Co-op Bank posted 28 openings for Cooperative Field Officers",
    time: "4 hours ago",
    badge: "Employment",
    color: "amber"
  }
];

export const initialTimetable: TimetableItem[] = [
  {
    id: "TT-1",
    date: "2026-03-02",
    time: "09:30 AM - 11:30 AM",
    subject: "PACS Computerization & Core Banking Arch",
    trainer: "Dr. K. S. Ramanujam",
    trainingHall: "Hall A-102 (Smart Lab)",
    batch: "DCBM-2026-B1"
  },
  {
    id: "TT-2",
    date: "2026-03-02",
    time: "11:45 AM - 01:15 PM",
    subject: "Cooperative Societies Act & Multi-State Bye-laws",
    trainer: "Adv. Meenakshi Sundaram",
    trainingHall: "Seminar Hall 2",
    batch: "DCBM-2026-B1"
  },
  {
    id: "TT-3",
    date: "2026-03-02",
    time: "02:00 PM - 03:30 PM",
    subject: "Financial Analysis of PACS Balance Sheets",
    trainer: "Prof. Arvind Trivedi",
    trainingHall: "Computer Lab 4",
    batch: "DCBM-2026-B2"
  },
  {
    id: "TT-4",
    date: "2026-03-03",
    time: "10:00 AM - 12:00 PM",
    subject: "Dairy Cooperative Supply Chain & Cold Chain ERP",
    trainer: "Dr. Sunita Deshmukh",
    trainingHall: "Hall B-201",
    batch: "FPO-2026-A"
  }
];

export const mockHostelRooms: HostelRoom[] = [
  { roomNo: "101", capacity: 3, occupied: 3, available: 0, status: "Full", block: "Block A (Boys)", occupants: ["Aarav S.", "Rohan V.", "Karan M."] },
  { roomNo: "102", capacity: 3, occupied: 2, available: 1, status: "Available", block: "Block A (Boys)", occupants: ["Vikas J.", "Manoj T."] },
  { roomNo: "103", capacity: 2, occupied: 1, available: 1, status: "Available", block: "Block A (Boys)", occupants: ["Dinesh K."] },
  { roomNo: "104", capacity: 2, occupied: 2, available: 0, status: "Full", block: "Block A (Boys)", occupants: ["Rahul G.", "Sumit B."] },
  { roomNo: "201", capacity: 3, occupied: 3, available: 0, status: "Full", block: "Block B (Girls)", occupants: ["Pooja N.", "Ananya R.", "Divya S."] },
  { roomNo: "202", capacity: 3, occupied: 2, available: 1, status: "Available", block: "Block B (Girls)", occupants: ["Kavita M.", "Ritu D."] },
  { roomNo: "203", capacity: 2, occupied: 0, available: 2, status: "Available", block: "Block B (Girls)", occupants: [] },
  { roomNo: "204", capacity: 2, occupied: 0, available: 0, status: "Maintenance", block: "Block B (Girls)", occupants: [] },
];

export const mockLogistics: LogisticsItem[] = [
  { id: "LOG-1", title: "Smart Training Halls", total: 6, inUse: 5, available: 1, status: "Ready" },
  { id: "LOG-2", title: "Interactive Projectors & AV", total: 12, inUse: 10, available: 2, status: "Ready" },
  { id: "LOG-3", title: "Computer Lab Terminals", total: 120, inUse: 98, available: 22, status: "Ready" },
  { id: "LOG-4", title: "NCCT Printed Learning Kits", total: 500, inUse: 340, available: 160, status: "Allocated" },
  { id: "LOG-5", title: "Institute Shuttle Transport", total: 4, inUse: 3, available: 1, status: "Ready" },
  { id: "LOG-6", title: "High-Speed Wi-Fi Nodes", total: 18, inUse: 17, available: 1, status: "Ready" }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: "ATT-1", trainee: "Aarav Sharma", date: "2026-03-02", method: "Face Recognition", time: "09:12 AM", status: "Present", hall: "Hall A-102" },
  { id: "ATT-2", trainee: "Priya Venkatesh", date: "2026-03-02", method: "QR Code", time: "09:14 AM", status: "Present", hall: "Hall A-102" },
  { id: "ATT-3", trainee: "Manoj Kumar", date: "2026-03-02", method: "Face Recognition", time: "09:28 AM", status: "Late", hall: "Hall A-102" },
  { id: "ATT-4", trainee: "Deepa Nambiar", date: "2026-03-02", method: "QR Code", time: "09:05 AM", status: "Present", hall: "Hall A-102" },
  { id: "ATT-5", trainee: "Girish Patel", date: "2026-03-02", method: "Face Recognition", time: "09:18 AM", status: "Present", hall: "Hall A-102" },
  { id: "ATT-6", trainee: "Sunil Verma", date: "2026-03-02", method: "QR Code", time: "--", status: "Absent", hall: "Hall A-102" }
];

export const mockCourses: Course[] = [
  {
    id: "CRS-1",
    name: "Cooperative Management & Governance",
    duration: "30 Hours",
    lessons: 18,
    progress: 90,
    category: "Management",
    level: "Intermediate",
    instructor: "Dr. K. S. Ramanujam"
  },
  {
    id: "CRS-2",
    name: "Digital Literacy & PACS ERP Software",
    duration: "25 Hours",
    lessons: 14,
    progress: 85,
    category: "Information Technology",
    level: "Foundation",
    instructor: "Er. Ramesh Sundar"
  },
  {
    id: "CRS-3",
    name: "Financial Awareness & Credit Appraisal",
    duration: "35 Hours",
    lessons: 22,
    progress: 75,
    category: "Finance",
    level: "Advanced",
    instructor: "CA Sunita Rao"
  },
  {
    id: "CRS-4",
    name: "Rural Cooperative Entrepreneurship",
    duration: "20 Hours",
    lessons: 12,
    progress: 60,
    category: "Business",
    level: "Intermediate",
    instructor: "Prof. Arvind Trivedi"
  },
  {
    id: "CRS-5",
    name: "Communication & Leadership in Cooperatives",
    duration: "15 Hours",
    lessons: 10,
    progress: 95,
    category: "Soft Skills",
    level: "Foundation",
    instructor: "Dr. Meenakshi S."
  }
];

export const mockVideos: VideoItem[] = [
  {
    id: "VID-1",
    title: "Cooperative Management: Democratic Control & Principles",
    duration: "24:18",
    category: "Cooperative Governance",
    instructor: "Dr. K. S. Ramanujam",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    views: "3.2k views"
  },
  {
    id: "VID-2",
    title: "Digital Literacy: Navigating the National PACS ERP Portal",
    duration: "31:45",
    category: "Digital Tools",
    instructor: "Er. Ramesh Sundar",
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    views: "5.4k views"
  },
  {
    id: "VID-3",
    title: "Financial Awareness: Balance Sheet & Profit Audit in DCCB",
    duration: "28:10",
    category: "Finance & Accounts",
    instructor: "CA Sunita Rao",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    views: "4.1k views"
  },
  {
    id: "VID-4",
    title: "Entrepreneurship: Setting up a Viable FPO Cooperative",
    duration: "35:00",
    category: "Rural Business",
    instructor: "Prof. Arvind Trivedi",
    thumbnail: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
    views: "2.8k views"
  },
  {
    id: "VID-5",
    title: "Communication Skills: Resolving Member Grievances",
    duration: "19:50",
    category: "Leadership",
    instructor: "Dr. Meenakshi S.",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    views: "3.9k views"
  }
];

export const mockQuizzes: QuizItem[] = [
  {
    id: "QZ-1",
    name: "PACS Computerization Architecture Test",
    course: "Digital Literacy & PACS ERP",
    questions: 25,
    attempts: 142,
    averageScore: 82.4,
    status: "Active",
    userScore: 88
  },
  {
    id: "QZ-2",
    name: "Cooperative Society Bye-Laws & Legal Audit",
    course: "Cooperative Management & Governance",
    questions: 20,
    attempts: 135,
    averageScore: 78.1,
    status: "Active",
    userScore: 84
  },
  {
    id: "QZ-3",
    name: "KCC Loan Appraisal & NPA Classification",
    course: "Financial Awareness & Credit Appraisal",
    questions: 30,
    attempts: 110,
    averageScore: 74.5,
    status: "Active",
    userScore: 72
  },
  {
    id: "QZ-4",
    name: "FPO Value Chain & Cold Storage Management",
    course: "Rural Cooperative Entrepreneurship",
    questions: 15,
    attempts: 95,
    averageScore: 81.0,
    status: "Active",
    userScore: 76
  }
];

export const mockSkillDistribution: SkillDistribution[] = [
  { skill: "Digital Literacy", score: 85, benchmark: 75, category: "Core" },
  { skill: "Communication", score: 82, benchmark: 70, category: "Soft" },
  { skill: "Cooperative Knowledge", score: 92, benchmark: 80, category: "Domain" },
  { skill: "Financial Skills", score: 68, benchmark: 75, category: "Core" },
  { skill: "Entrepreneurship", score: 72, benchmark: 65, category: "Domain" },
  { skill: "Technical Skills", score: 70, benchmark: 68, category: "Tech" }
];

export const mockSkillGaps: SkillGap[] = [
  {
    skill: "Digital Marketing",
    currentLevel: "Beginner",
    targetLevel: "Intermediate",
    gapCategory: "High",
    description: "Required for expanding market outreach for Cooperative FPO e-commerce products."
  },
  {
    skill: "Data Analysis & MIS",
    currentLevel: "Beginner",
    targetLevel: "Advanced",
    gapCategory: "High",
    description: "Crucial for automated auditing and NPA predictive modeling in rural cooperative banks."
  },
  {
    skill: "Financial Planning",
    currentLevel: "Intermediate",
    targetLevel: "Advanced",
    gapCategory: "Medium",
    description: "Necessary for managing capital adequacy ratio and multi-year credit forecasting."
  }
];

export const mockRecommendedCourses: RecommendedCourse[] = [
  {
    id: "REC-1",
    name: "Digital Marketing Basics for Cooperatives",
    duration: "12 Hours",
    reason: "Fills critical gap in direct-to-consumer rural marketing & GeM portal listing",
    skillsGained: ["Social Media Campaigns", "GeM Listing", "Buyer Outreach"]
  },
  {
    id: "REC-2",
    name: "Excel & Data Analytics for PACS MIS",
    duration: "18 Hours",
    reason: "Directly bridges your data gap for DCCB loan portfolio monitoring",
    skillsGained: ["Pivot Tables", "NPA Tracking", "Automated Ledgers"]
  },
  {
    id: "REC-3",
    name: "Financial Planning & Capital Adequacy",
    duration: "15 Hours",
    reason: "Strengthens financial modeling before the upcoming Nabard inspection audit",
    skillsGained: ["Statutory Liquidity", "CRR Management", "Audit Readiness"]
  },
  {
    id: "REC-4",
    name: "Entrepreneurship Fundamentals & FPO Governance",
    duration: "14 Hours",
    reason: "Prepares you for the Agri-Infrastructure Fund project grant submission",
    skillsGained: ["DPR Creation", "Govt Subsidies", "Shareholder Voting"]
  }
];

export const mockCertificates: CertificateItem[] = [
  {
    certificateId: "NCCT-2026-DCBM-84920",
    traineeName: "Aarav Sharma",
    programme: "Diploma in Cooperative Business Management (DCBM)",
    institute: "Institute of Cooperative Management (ICM), Madurai",
    completionDate: "28 Feb 2026",
    verificationStatus: "Verified",
    qrHash: "0x89f4b321c8e8940212345a99c",
    grade: "Grade A+ (Distinction)",
    issuingAuthority: "National Council for Cooperative Training (NCCT), New Delhi"
  },
  {
    certificateId: "NCCT-2026-PACS-77312",
    traineeName: "Aarav Sharma",
    programme: "National PACS ERP & Core Accounting Specialist",
    institute: "Regional Institute of Cooperative Management (RICM), Bengaluru",
    completionDate: "15 Jan 2026",
    verificationStatus: "Verified",
    qrHash: "0x44a1089bc213894205567b12e",
    grade: "Grade A (92%)",
    issuingAuthority: "NCCT & Ministry of Cooperation, New Delhi"
  }
];

export const mockJobMatches: JobMatchItem[] = [
  {
    id: "JOB-1",
    title: "Cooperative Field Officer",
    company: "State Apex Cooperative Bank Ltd.",
    location: "Madurai / Coimbatore, TN",
    salary: "₹4.5 - 6.0 LPA",
    requiredSkills: ["PACS Accounting", "Credit Risk", "Coop Law 2002", "Field Verification"],
    matchPercentage: 92,
    deadline: "15 Mar 2026",
    openings: 18,
    applied: false
  },
  {
    id: "JOB-2",
    title: "Digital Operations Assistant",
    company: "National PACS ERP Hub (NCCT Partner)",
    location: "Bengaluru, KA / Remote",
    salary: "₹4.2 - 5.5 LPA",
    requiredSkills: ["PACS ERP Software", "Digital Literacy", "Database MIS", "Member Onboarding"],
    matchPercentage: 87,
    deadline: "20 Mar 2026",
    openings: 24,
    applied: false
  },
  {
    id: "JOB-3",
    title: "Rural Entrepreneurship Coordinator",
    company: "IFFCO Kisan Rural Services",
    location: "Trichy, TN / Hyderabad, TG",
    salary: "₹4.0 - 5.2 LPA",
    requiredSkills: ["FPO Management", "Agri-Input Logistics", "Communication", "Farmer Mobilization"],
    matchPercentage: 81,
    deadline: "25 Mar 2026",
    openings: 12,
    applied: false
  },
  {
    id: "JOB-4",
    title: "Data Entry & MIS Assistant",
    company: "District Central Cooperative Bank (DCCB)",
    location: "Dindigul / Madurai, TN",
    salary: "₹3.2 - 4.2 LPA",
    requiredSkills: ["Excel", "Ledger Reconciliation", "Data Accuracy", "Coop Reporting"],
    matchPercentage: 76,
    deadline: "30 Mar 2026",
    openings: 30,
    applied: false
  }
];

export const mockCandidates: CandidateItem[] = [
  {
    id: "CAN-1",
    candidate: "Aarav Sharma",
    skills: ["PACS ERP", "Cooperative Management", "Financial Accounting", "Digital Ledger"],
    certificate: "NCCT-2026-DCBM-84920 (Verified)",
    experience: "1 Year Apprenticeship at District Coop Bank",
    aiMatch: 92,
    status: "Shortlisted",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    email: "aarav.sharma@coopnet.gov.in"
  },
  {
    id: "CAN-2",
    candidate: "Priya Venkatesh",
    skills: ["PACS ERP", "Data Entry MIS", "Member Relations", "Tamil & English Typing"],
    certificate: "NCCT-2026-PACS-78912 (Verified)",
    experience: "8 Months at Taluk Primary Agricultural Credit Society",
    aiMatch: 87,
    status: "Interview Scheduled",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    email: "priya.v@coopnet.gov.in"
  },
  {
    id: "CAN-3",
    candidate: "Karan Mathur",
    skills: ["Computer Accounting", "Tally ERP", "Cooperative Law", "Cash Management"],
    certificate: "NCCT-2025-HDCM-65230 (Verified)",
    experience: "Fresh Graduate (RICM Bengaluru)",
    aiMatch: 81,
    status: "In Review",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    email: "karan.m@coopnet.gov.in"
  },
  {
    id: "CAN-4",
    candidate: "Deepa Nambiar",
    skills: ["Credit Appraisal", "SHG Group Lending", "Audit Documentation", "MIS"],
    certificate: "NCCT-2026-FIN-99014 (Verified)",
    experience: "2 Years at Kerala State Cooperative Bank",
    aiMatch: 79,
    status: "Shortlisted",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    email: "deepa.n@coopnet.gov.in"
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: "NOTIF-1",
    title: "New Assessment Scheduled",
    description: "National PACS ERP Final Practical scheduled for 10th March 2026 at 10:00 AM.",
    time: "25 mins ago",
    type: "assessment",
    unread: true
  },
  {
    id: "NOTIF-2",
    title: "Digital Certificate Issued",
    description: "Your verifiable certificate for Diploma in Cooperative Business Management is ready.",
    time: "2 hours ago",
    type: "certificate",
    unread: true
  },
  {
    id: "NOTIF-3",
    title: "AI Course Recommendation",
    description: "Based on your 78% skill score, 'Digital Marketing Basics' is recommended for you.",
    time: "5 hours ago",
    type: "course",
    unread: false
  },
  {
    id: "NOTIF-4",
    title: "High Match Job Alert: 92%",
    description: "State Apex Cooperative Bank posted 'Cooperative Field Officer' matching your profile.",
    time: "1 day ago",
    type: "job",
    unread: false
  }
];

export const chatBotKnowledgeBase: Record<string, string> = {
  course: "Based on your current demo skill profile (78% overall score), **Digital Marketing Basics for Cooperatives** and **Excel & Data Analytics for PACS MIS** are recommended next. These will bridge your two highest priority skill gaps.",
  jobs: "You currently have strong AI alignment with **Digital Operations Assistant (87% Match)** and **Cooperative Field Officer (92% Match)** at State Apex Cooperative Bank.",
  gaps: "Your current demo profile shows gaps in **Digital Marketing (Beginner)**, **Data Analysis & MIS (Beginner)**, and **Financial Planning (Intermediate)**. Completing the recommended courses will raise your overall skill score to 91%.",
  guidance: "For a career in Indian Cooperative Banking and PACS Administration, we recommend mastering **PACS ERP Software**, followed by certification in **Credit Risk Appraisal** and **Multi-State Cooperative Bye-laws**.",
  pacs: "PACS (Primary Agricultural Credit Societies) computerization is a flagship initiative by the Ministry of Cooperation. Our training modules cover ERP deployment, day-end book reconciliation, and member digital onboarding.",
  score: "To increase your AI Skill Score from 78% to 90%+, complete the pending quizzes in Financial Awareness, maintain above 90% attendance via QR/Face check-in, and finish the recommended 12-hour Digital Marketing course.",
  default: "I am CoopCareer AI, your dedicated Indian Cooperative Sector career counselor. You can ask me for course recommendations, matched jobs, skill gap analysis, or guidance on NCCT/ICM certifications."
};

export const mockTraineesList: TraineeProfile[] = [
  {
    id: "TR-2026-8942",
    name: "Aarav Sharma",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    age: 24,
    location: "Madurai, Tamil Nadu",
    programme: "Diploma in Cooperative Business Management (DCBM)",
    institute: "Institute of Cooperative Management, Madurai",
    batch: "DCBM-2026-Cohort-3",
    contact: "+91 98402 12345",
    email: "aarav.sharma@coopnet.gov.in",
    skills: ["PACS Accounting", "Dairy Governance", "Digital Ledger", "Coop Law 2002", "Inventory MIS"],
    learningProgress: 82,
    attendanceRate: 94.6,
    coursesCompleted: 6,
    skillScore: 78
  },
  {
    id: "TR-2026-7811",
    name: "Priya Venkatesh",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    age: 23,
    location: "Bengaluru, Karnataka",
    programme: "PACS Computerization & ERP Masterclass",
    institute: "RICM Bengaluru",
    batch: "PACS-ERP-2026",
    contact: "+91 98801 44521",
    email: "priya.v@coopnet.gov.in",
    skills: ["PACS ERP", "Data Entry MIS", "Member Relations", "Excel Analytics"],
    learningProgress: 90,
    attendanceRate: 97.2,
    coursesCompleted: 7,
    skillScore: 86
  },
  {
    id: "TR-2026-6429",
    name: "Karan Mathur",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    age: 25,
    location: "Pune, Maharashtra",
    programme: "Multi-State Cooperative Governance & Law",
    institute: "VAMNICOM Pune",
    batch: "GOV-2026-A",
    contact: "+91 97654 32109",
    email: "karan.m@coopnet.gov.in",
    skills: ["Cooperative Law", "Statutory Audit", "Financial Analysis"],
    learningProgress: 75,
    attendanceRate: 91.0,
    coursesCompleted: 5,
    skillScore: 81
  },
  {
    id: "TR-2026-9051",
    name: "Deepa Nambiar",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    age: 26,
    location: "Kochi, Kerala",
    programme: "Agri-Credit & Risk Assessment for DCCBs",
    institute: "ICM Madurai",
    batch: "DCBM-2026-B1",
    contact: "+91 94471 22334",
    email: "deepa.n@coopnet.gov.in",
    skills: ["Credit Appraisal", "SHG Group Lending", "Audit Documentation"],
    learningProgress: 88,
    attendanceRate: 96.5,
    coursesCompleted: 6,
    skillScore: 84
  },
  {
    id: "TR-2026-5510",
    name: "Girish Patel",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    age: 24,
    location: "Gandhinagar, Gujarat",
    programme: "Dairy Cooperative Cold Chain Operations",
    institute: "ICM Gandhinagar",
    batch: "DAIRY-2026",
    contact: "+91 98250 88991",
    email: "girish.p@coopnet.gov.in",
    skills: ["Cold Chain Logistics", "Quality Testing", "AMUL Pattern Governance"],
    learningProgress: 68,
    attendanceRate: 88.5,
    coursesCompleted: 4,
    skillScore: 73
  },
  {
    id: "TR-2026-3394",
    name: "Ananya Roy",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    age: 22,
    location: "Dehradun, Uttarakhand",
    programme: "FPO & Rural Cooperative Entrepreneurship",
    institute: "ICM Dehradun",
    batch: "FPO-2026-A",
    contact: "+91 97190 55432",
    email: "ananya.r@coopnet.gov.in",
    skills: ["FPO Marketing", "Direct Farmer Linkage", "Govt Subsidies"],
    learningProgress: 79,
    attendanceRate: 93.0,
    coursesCompleted: 5,
    skillScore: 77
  }
];

export const mockNominations: NominationItem[] = [
  {
    id: "NOM-841",
    candidateName: "Suresh Balakrishnan",
    organization: "Erode District Central Cooperative Bank",
    district: "Erode",
    state: "Tamil Nadu",
    programmeApplied: "PACS Computerization & ERP Masterclass",
    status: "Pending",
    submissionDate: "24 Feb 2026",
    experienceYears: 4
  },
  {
    id: "NOM-842",
    candidateName: "Meenakshi Kulkarni",
    organization: "Kolhapur District Milk Producers Union (Gokul)",
    district: "Kolhapur",
    state: "Maharashtra",
    programmeApplied: "Dairy Cooperative Cold Chain Operations",
    status: "Pending",
    submissionDate: "25 Feb 2026",
    experienceYears: 6
  },
  {
    id: "NOM-843",
    candidateName: "Rajeev Singhania",
    organization: "Bareilly Primary Agricultural Credit Society",
    district: "Bareilly",
    state: "Uttar Pradesh",
    programmeApplied: "Diploma in Cooperative Business Management",
    status: "Approved",
    submissionDate: "20 Feb 2026",
    experienceYears: 2
  },
  {
    id: "NOM-844",
    candidateName: "Lakshmi Narayanan",
    organization: "Thanjavur Farmers Service Cooperative Society",
    district: "Thanjavur",
    state: "Tamil Nadu",
    programmeApplied: "Agri-Credit & Risk Assessment for DCCBs",
    status: "Pending",
    submissionDate: "26 Feb 2026",
    experienceYears: 5
  },
  {
    id: "NOM-845",
    candidateName: "Harpreet Singh",
    organization: "Ludhiana Weavers Industrial Cooperative",
    district: "Ludhiana",
    state: "Punjab",
    programmeApplied: "Rural Cooperative Entrepreneurship",
    status: "Rejected",
    submissionDate: "18 Feb 2026",
    experienceYears: 1
  }
];

export const mockJobPostings: JobPostingItem[] = [
  {
    id: "POST-101",
    title: "Cooperative Field Officer",
    department: "Rural Credit & Field Operations",
    location: "Madurai / Coimbatore, Tamil Nadu",
    openings: 18,
    salary: "₹4.5 - 6.0 LPA",
    type: "Full-time",
    postedDate: "20 Feb 2026",
    status: "Active",
    applicantsCount: 42
  },
  {
    id: "POST-102",
    title: "Digital Operations Assistant",
    department: "IT & PACS Computerization",
    location: "Bengaluru, Karnataka / Remote",
    openings: 24,
    salary: "₹4.2 - 5.5 LPA",
    type: "Full-time",
    postedDate: "18 Feb 2026",
    status: "Active",
    applicantsCount: 68
  },
  {
    id: "POST-103",
    title: "PACS Statutory Audit Associate",
    department: "Internal Audit & Compliance",
    location: "Chennai / Tiruchirappalli, Tamil Nadu",
    openings: 12,
    salary: "₹4.0 - 5.2 LPA",
    type: "Full-time",
    postedDate: "22 Feb 2026",
    status: "Active",
    applicantsCount: 29
  },
  {
    id: "POST-104",
    title: "Rural Cooperative Credit Apprentice",
    department: "Priority Sector Lending",
    location: "Dindigul / Theni, Tamil Nadu",
    openings: 30,
    salary: "₹2.8 - 3.6 LPA",
    type: "Apprenticeship",
    postedDate: "25 Feb 2026",
    status: "Active",
    applicantsCount: 54
  }
];

export const mockInterviews: InterviewItem[] = [
  {
    id: "INT-501",
    candidateName: "Priya Venkatesh",
    jobTitle: "Digital Operations Assistant",
    date: "04 Mar 2026",
    time: "10:30 AM",
    interviewer: "Thiru. S. Sundararajan (VP - IT)",
    mode: "Online (Video)",
    status: "Scheduled"
  },
  {
    id: "INT-502",
    candidateName: "Aarav Sharma",
    jobTitle: "Cooperative Field Officer",
    date: "05 Mar 2026",
    time: "02:00 PM",
    interviewer: "Tmt. Radhika Raman (Head - Rural Credit)",
    mode: "In-Person (HQ)",
    status: "Scheduled"
  },
  {
    id: "INT-503",
    candidateName: "Deepa Nambiar",
    jobTitle: "Cooperative Field Officer",
    date: "06 Mar 2026",
    time: "11:15 AM",
    interviewer: "Thiru. K. Murugan (General Manager)",
    mode: "Online (Video)",
    status: "Scheduled"
  }
];

export const mockHiredCandidates: HiredCandidateItem[] = [
  {
    id: "HIRE-1",
    candidateName: "Sanjay Kumar",
    jobTitle: "Cooperative Field Officer",
    institute: "ICM Madurai",
    joiningDate: "15 Mar 2026",
    ctc: "₹5.4 LPA",
    status: "Offer Accepted"
  },
  {
    id: "HIRE-2",
    candidateName: "Divya Balan",
    jobTitle: "Digital Operations Assistant",
    institute: "RICM Bengaluru",
    joiningDate: "10 Mar 2026",
    ctc: "₹5.0 LPA",
    status: "Joined"
  },
  {
    id: "HIRE-3",
    candidateName: "Rohan Varma",
    jobTitle: "PACS Audit Associate",
    institute: "VAMNICOM Pune",
    joiningDate: "20 Mar 2026",
    ctc: "₹4.8 LPA",
    status: "Onboarding"
  }
];

export const mockAdminReports: ReportItem[] = [
  {
    id: "REP-1",
    title: "National Cooperative Training Cohort Completion Report",
    category: "Training",
    period: "FY 2025-26 (Q3 & Q4)",
    recordsCount: 24850,
    generatedDate: "28 Feb 2026"
  },
  {
    id: "REP-2",
    title: "Biometric Attendance & Terminal Compliance Audit",
    category: "Attendance",
    period: "Feb 2026",
    recordsCount: 184500,
    generatedDate: "01 Mar 2026"
  },
  {
    id: "REP-3",
    title: "National PACS ERP Practical Assessment Marksheet",
    category: "Assessment",
    period: "Cohort 2026-Batch 1",
    recordsCount: 4210,
    generatedDate: "27 Feb 2026"
  },
  {
    id: "REP-4",
    title: "Verifiable Digital Certificate & Blockchain Hash Registry",
    category: "Certificate",
    period: "Cumulative to Date",
    recordsCount: 18420,
    generatedDate: "02 Mar 2026"
  },
  {
    id: "REP-5",
    title: "Cooperative Banking & FPO Sector Placement Census",
    category: "Employment",
    period: "2025-2026 Annual Drive",
    recordsCount: 3890,
    generatedDate: "25 Feb 2026"
  }
];
