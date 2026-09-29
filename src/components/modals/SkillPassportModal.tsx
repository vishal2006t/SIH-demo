import React from 'react';
import { X, Award, CheckCircle2, ShieldCheck, QrCode, Sparkles, User, Calendar, BookOpen, Clock, Building } from 'lucide-react';
import { TraineeProfile, CertificateItem } from '../../types';

interface SkillPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TraineeProfile;
  certificates: CertificateItem[];
}

export const SkillPassportModal: React.FC<SkillPassportModalProps> = ({
  isOpen,
  onClose,
  profile,
  certificates
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Passport Header: Navy / Deep Blue with Gold Trim */}
        <div className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 md:p-8 border-b-4 border-amber-500">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white/20 shadow-xl"
              />
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-900">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                NCCT Digital Skill Passport
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {profile.name}
              </h2>
              <p className="text-xs text-blue-200">
                Passport No: <strong className="font-mono text-amber-300">IND-COOP-{profile.id}</strong>
              </p>
              <p className="text-xs text-slate-300">
                {profile.institute}
              </p>
            </div>
          </div>
        </div>

        {/* Passport Body */}
        <div className="p-6 md:p-8 space-y-6">

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-center">
              <span className="block text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                Overall AI Skill Score
              </span>
              <span className="text-xl font-bold text-blue-900 dark:text-blue-100">
                {profile.skillScore}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-center">
              <span className="block text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Verified Attendance
              </span>
              <span className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
                {profile.attendanceRate}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 text-center">
              <span className="block text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                Courses Completed
              </span>
              <span className="text-xl font-bold text-purple-900 dark:text-purple-100">
                {profile.coursesCompleted}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 text-center">
              <span className="block text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                Assessment Average
              </span>
              <span className="text-xl font-bold text-amber-900 dark:text-amber-100">
                85.6%
              </span>
            </div>
          </div>

          {/* Verified Skills Matrix */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Verified Competencies & Skills
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { name: "PACS Accounting", level: "Expert", score: "94%" },
                { name: "Dairy Governance", level: "Advanced", score: "88%" },
                { name: "Digital Ledger MIS", level: "Advanced", score: "86%" },
                { name: "Cooperative Law 2002", level: "Intermediate", score: "82%" },
                { name: "Inventory Management", level: "Advanced", score: "85%" },
                { name: "Member Grievance AI", level: "Intermediate", score: "78%" },
              ].map((skill, index) => (
                <div key={index} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{skill.name}</p>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">{skill.level}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-md shadow-sm">
                    {skill.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Linked Official Credentials */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Linked Digital Certifications ({certificates.length})
            </h4>
            <div className="space-y-2">
              {certificates.map((cert) => (
                <div key={cert.certificateId} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/20 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{cert.programme}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">ID: {cert.certificateId} • {cert.completionDate}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* QR Verification Footnote */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4 shadow-md">
            <div>
              <p className="text-xs font-semibold text-white">Instant QR Verification for Employers</p>
              <p className="text-[11px] text-slate-400">
                Any cooperative bank or recruiter can scan to verify live blockchain credential hash.
              </p>
            </div>
            <div className="w-14 h-14 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center">
              <QrCode className="w-full h-full text-slate-900" />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Powered by NCCT National Skill Registry • SIH 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
          >
            Close Passport
          </button>
        </div>

      </div>
    </div>
  );
};
