import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  PieChart as PieIcon,
  BarChart3,
  Check,
  ArrowRight,
  AlertCircle,
  Cpu
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import confetti from 'canvas-confetti';
import {
  mockSkillDistribution,
  mockSkillGaps,
  mockRecommendedCourses,
  mockTraineeProfile
} from '../../data/mockData';
import {
  analyzeSkillsWithRealAI,
  isOpenRouterConfigured,
  getModelId
} from '../../services/openRouterService';

interface AiSkillAnalysisViewProps {
  onEnrollCourse?: (courseName: string) => void;
}

export const AiSkillAnalysisView: React.FC<AiSkillAnalysisViewProps> = ({ onEnrollCourse }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<string | null>(null);
  const [analysisSummary, setAnalysisSummary] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [skillScore, setSkillScore] = useState(78);
  const [lastAnalyzed, setLastAnalyzed] = useState('2 minutes ago');
  const [isLiveAi, setIsLiveAi] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  // State for dynamic skill distribution, gaps, and recommendations
  const [skillDistribution, setSkillDistribution] = useState(mockSkillDistribution);
  const [skillGaps, setSkillGaps] = useState(mockSkillGaps);
  const [recommendedCourses, setRecommendedCourses] = useState(mockRecommendedCourses);

  // Assessment vs Benchmark data
  const assessmentData = [
    { subject: 'PACS Accounting', candidate: 88, benchmark: 76 },
    { subject: 'Coop Bye-laws', candidate: 84, benchmark: 72 },
    { subject: 'Credit Risk', candidate: 72, benchmark: 74 },
    { subject: 'Digital Ledger', candidate: 92, benchmark: 80 },
    { subject: 'FPO Cold Chain', candidate: 76, benchmark: 68 },
  ];

  // Attendance vs Learning Velocity
  const correlationData = [
    { week: 'W1', attendance: 88, learningProgress: 72 },
    { week: 'W2', attendance: 92, learningProgress: 78 },
    { week: 'W3', attendance: 90, learningProgress: 81 },
    { week: 'W4', attendance: 95, learningProgress: 86 },
    { week: 'W5', attendance: 94, learningProgress: 89 },
    { week: 'W6', attendance: 96, learningProgress: 94 },
  ];

  const handleAnalyzeSkills = async () => {
    setIsAnalyzing(true);
    setAnalysisStatus('AI is analyzing your learning data...');
    setErrorMessage(null);

    const learningData = {
      name: mockTraineeProfile.name,
      attendance: 82,
      courseProgress: {
        "Digital Literacy & PACS ERP": 90,
        "Cooperative Management": 75,
        "Financial Awareness": 62,
        "Entrepreneurship": 55,
      },
      assessmentScores: {
        "Digital Literacy": 85,
        "Communication": 72,
        "Financial Skills": 60,
        "Entrepreneurship": 58,
        "Technical Skills": 70,
      }
    };

    try {
      if (isOpenRouterConfigured()) {
        // Real OpenRouter AI Call
        const result = await analyzeSkillsWithRealAI(learningData);

        setSkillScore(result.overallScore);
        setAnalysisSummary(result.summary);
        setIsLiveAi(true);

        // Update skill gaps from AI response
        if (result.skillGaps && result.skillGaps.length > 0) {
          setSkillGaps(result.skillGaps.map((g, idx) => ({
            skill: g.skill,
            currentLevel: (g.level as any) || 'Beginner',
            targetLevel: 'Advanced',
            gapCategory: idx === 0 ? 'High' : 'Medium',
            description: g.reason
          })));
        }

        // Update recommended courses from AI response
        if (result.recommendedCourses && result.recommendedCourses.length > 0) {
          setRecommendedCourses(result.recommendedCourses.map((c, idx) => ({
            id: `AI-REC-${idx + 1}`,
            name: c.course,
            duration: `${10 + idx * 4} Hours`,
            reason: c.reason,
            skillsGained: ["Targeted Competency", "Curriculum Match", "NCCT Verified"]
          })));
        }

        // Update strong skills on radar if returned
        if (result.strongSkills && result.strongSkills.length > 0) {
          setSkillDistribution(prev => prev.map(item => {
            const match = result.strongSkills.find(s => s.skill.toLowerCase().includes(item.skill.toLowerCase()));
            if (match) {
              return { ...item, score: match.score };
            }
            return item;
          }));
        }

        setLastAnalyzed('Just now (via OpenRouter)');
        setAnalysisStatus('AI Skill Analysis completed');
      } else {
        // Fallback simulation if API key is not configured in .env
        await new Promise(r => setTimeout(r, 1500));
        setSkillScore(84);
        setLastAnalyzed('Just now (Simulated)');
        setIsLiveAi(false);
        setAnalysisSummary("Trainee displays strong digital literacy (85%) and cooperative knowledge (92%). Prioritizing Entrepreneurship and Data Analysis will raise placement index to 91%.");
        setAnalysisStatus('AI Skill Analysis completed');
      }

      // Celebratory confetti trigger
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Graceful fallback
      }

      setTimeout(() => {
        setAnalysisStatus(null);
      }, 5000);
    } catch (err: any) {
      console.error("AI Skill Analysis Error:", err);
      setIsAnalyzing(false);
      setAnalysisStatus(null);
      setErrorMessage(
        err?.message || "AI service is temporarily unavailable. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleEnroll = (name: string) => {
    setEnrolledCourses(prev => [...prev, name]);
    if (onEnrollCourse) onEnrollCourse(name);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-blue-100 text-xs font-semibold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Real AI Diagnostic Engine</span>
              {isLiveAi && (
                <span className="flex items-center gap-1 text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-400/30">
                  <Cpu className="w-2.5 h-2.5" /> OpenRouter: {getModelId().split('/')[1] || getModelId()}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              AI Skill Analysis
            </h1>
            <p className="text-sm md:text-base text-blue-100/90 leading-relaxed">
              AI-powered analysis of learning, attendance and assessment performance.
            </p>
            <p className="text-xs text-blue-200">
              Last Diagnostic: <strong className="text-white">{lastAnalyzed}</strong> • Target Institution: <strong>NCCT / ICM Madurai</strong>
            </p>
          </div>

          {/* Overall Skill Score Card */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-md p-4 px-6 rounded-2xl border border-white/20">
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-white/20"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={238.7}
                  strokeDashoffset={238.7 - (238.7 * skillScore) / 100}
                  className="text-emerald-400 transition-all duration-1000 ease-out"
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white">{skillScore}%</span>
                <span className="text-[10px] text-blue-200 font-semibold uppercase">Index</span>
              </div>
            </div>

            <div className="text-center sm:text-left space-y-2">
              <div>
                <span className="text-xs text-blue-200 block">Overall Skill Score</span>
                <span className="text-sm font-bold text-white">
                  {skillScore >= 80 ? 'Proficient (Top 12% Cohort)' : 'Intermediate Competence'}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAnalyzeSkills}
                disabled={isAnalyzing}
                className="w-full px-4 py-2 text-xs font-bold bg-white text-blue-900 hover:bg-blue-50 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-75"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isAnalyzing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`} />
                {isAnalyzing ? 'AI is analyzing...' : 'Analyze My Skills'}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Status Notification Alert */}
        {analysisStatus && (
          <div className="mt-4 p-3.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-3 animate-fadeIn">
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-semibold text-white tracking-wide">
                  AI is analyzing your learning data...
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <div className="text-xs text-emerald-100">
                  <strong className="text-emerald-200 font-bold block">{analysisStatus}</strong>
                  {analysisSummary && <span className="text-[11px] text-white/90 mt-0.5 block">{analysisSummary}</span>}
                </div>
              </>
            )}
          </div>
        )}

        {/* Error Alert if OpenRouter call fails */}
        {errorMessage && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-500/20 backdrop-blur-md border border-red-400/40 text-red-100 flex items-start gap-2.5 text-xs animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-300 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Notice</p>
              <p className="text-[11px] text-red-200 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* 3 Interactive Recharts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
        
        {/* Chart 1: Skill Distribution */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                1. Skill Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Candidate vs National Benchmark
              </p>
            </div>
            <span className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <PieIcon className="w-4 h-4" />
            </span>
          </div>

          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={80} data={skillDistribution}>
                <PolarGrid stroke="#94a3b8" strokeOpacity={0.25} />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#64748b', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                <Radar name="Candidate" dataKey="score" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.45} />
                <Radar name="National Avg" dataKey="benchmark" stroke="#0d9488" fill="#14b8a6" fillOpacity={0.25} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Candidate</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span> National Avg</span>
          </div>
        </div>

        {/* Chart 2: Assessment Performance */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                2. Assessment Performance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Exam marks across modules
              </p>
            </div>
            <span className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
              <BarChart3 className="w-4 h-4" />
            </span>
          </div>

          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assessmentData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                <XAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9 }} angle={-20} textAnchor="end" />
                <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="candidate" name="My Score" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="benchmark" name="Batch Benchmark" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-teal-600"></span> Candidate Score</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-slate-300"></span> Benchmark</span>
          </div>
        </div>

        {/* Chart 3: Attendance vs Learning Progress */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                3. Attendance vs Learning
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Velocity correlation over 6 weeks
              </p>
            </div>
            <span className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>

          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={correlationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis domain={[60, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="attendance" name="Attendance %" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorAtt)" />
                <Area type="monotone" dataKey="learningProgress" name="Learning %" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-purple-500"></span> Attendance Rate</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-500"></span> Learning Progress</span>
          </div>
        </div>

      </div>

      {/* Progress Bars for Core Skills */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
          Detailed Skill Competencies
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Diagnostic breakdown measured against Ministry of Cooperation guidelines
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {skillDistribution.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {item.skill}
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {item.score}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    item.score >= 85
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                      : item.score >= 75
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-600'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Section: Detected Skill Gaps & AI Recommended Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        
        {/* Detected Skill Gaps */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Detected Skill Gaps
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Targeted competencies holding back senior recruitment
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              {skillGaps.length} Gaps Found
            </span>
          </div>

          <div className="space-y-3">
            {skillGaps.map((gap, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2 hover:border-amber-300 dark:hover:border-amber-700 transition"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {gap.skill}
                  </h4>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    gap.gapCategory === 'High'
                      ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {gap.currentLevel} → {gap.targetLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {gap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommended Courses */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  AI Recommended Courses
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Curated modules to close detected gaps immediately
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
              NCCT Certified
            </span>
          </div>

          <div className="space-y-3">
            {recommendedCourses.map((course) => {
              const isEnrolled = enrolledCourses.includes(course.name);
              return (
                <div
                  key={course.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-300 dark:hover:border-blue-700 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {course.name}
                      </h4>
                      <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                        • {course.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {course.reason}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {course.skillsGained.map((sk, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                          +{sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleEnroll(course.name)}
                    disabled={isEnrolled}
                    className={`shrink-0 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 ${
                      isEnrolled
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Enrolled
                      </>
                    ) : (
                      <>
                        Enroll
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
