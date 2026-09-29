import React, { useState } from 'react';
import { X, Briefcase, CheckCircle2, Sparkles, Building, MapPin, IndianRupee, ShieldCheck } from 'lucide-react';
import { JobMatchItem } from '../../types';

interface JobApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobMatchItem | null;
  onApplySuccess: (jobId: string) => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({
  isOpen,
  onClose,
  job,
  onApplySuccess
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      onApplySuccess(job.id);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Apply with Digital Skill Passport
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct NCCT Verified Submission
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Application Submitted Successfully!
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              Your verified Skill Passport and NCCT certificate hash were transmitted to <strong>{job.company}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Job Summary Banner */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{job.title}</h4>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    {job.company}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location} • <IndianRupee className="w-3.5 h-3.5 text-slate-400" /> {job.salary}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    {job.matchPercentage}% AI Match
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{job.openings} Openings</p>
                </div>
              </div>
            </div>

            {/* Trainee Credentials Verified Badge */}
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-blue-900 dark:text-blue-200">
                  Verified Candidate Credentials Attached
                </span>
                <p className="text-blue-700 dark:text-blue-300 mt-0.5">
                  Aarav Sharma • DCBM-2026-B1 • NCCT Certificate #84920
                </p>
              </div>
            </div>

            {/* Matched Skills */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Matched Skills for this Role
              </label>
              <div className="flex flex-wrap gap-1.5">
                {job.requiredSkills.map((sk, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                {submitting ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Transmitting Passport...
                  </>
                ) : (
                  'Confirm & Submit Application'
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
