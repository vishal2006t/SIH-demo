import React, { useState } from 'react';
import { Search, X, BookOpen, Users, Award, Briefcase, FileCode, ArrowRight } from 'lucide-react';
import { mockProgrammes, mockCourses, mockJobMatches, mockCertificates } from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult?: (type: string, id: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const term = searchTerm.toLowerCase();

  const filteredProgrammes = mockProgrammes.filter(p => p.name.toLowerCase().includes(term) || p.institute.toLowerCase().includes(term));
  const filteredCourses = mockCourses.filter(c => c.name.toLowerCase().includes(term) || c.category.toLowerCase().includes(term));
  const filteredJobs = mockJobMatches.filter(j => j.title.toLowerCase().includes(term) || j.company.toLowerCase().includes(term));
  const filteredCerts = mockCertificates.filter(c => c.programme.toLowerCase().includes(term) || c.certificateId.toLowerCase().includes(term));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search Trainees, Courses, Programmes, Certificates, Jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          
          {/* Programmes Section */}
          {filteredProgrammes.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-1.5">
                NCCT Programmes ({filteredProgrammes.length})
              </span>
              <div className="space-y-1">
                {filteredProgrammes.slice(0, 3).map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      if (onSelectResult) onSelectResult('programme', p.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600">{p.name}</p>
                        <p className="text-[11px] text-slate-400">{p.institute} • {p.duration}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses Section */}
          {filteredCourses.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-1.5">
                LMS Courses ({filteredCourses.length})
              </span>
              <div className="space-y-1">
                {filteredCourses.slice(0, 3).map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      if (onSelectResult) onSelectResult('course', c.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-teal-600">{c.name}</p>
                        <p className="text-[11px] text-slate-400">{c.category} • Progress: {c.progress}%</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Section */}
          {filteredJobs.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-1.5">
                AI Matched Jobs ({filteredJobs.length})
              </span>
              <div className="space-y-1">
                {filteredJobs.slice(0, 3).map(j => (
                  <div
                    key={j.id}
                    onClick={() => {
                      if (onSelectResult) onSelectResult('job', j.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600">{j.title}</p>
                        <p className="text-[11px] text-slate-400">{j.company} • Match: {j.matchPercentage}%</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates Section */}
          {filteredCerts.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-1.5">
                Digital Certificates ({filteredCerts.length})
              </span>
              <div className="space-y-1">
                {filteredCerts.slice(0, 2).map(cert => (
                  <div
                    key={cert.certificateId}
                    onClick={() => {
                      if (onSelectResult) onSelectResult('certificate', cert.certificateId);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600">{cert.programme}</p>
                        <p className="text-[11px] text-slate-400">ID: {cert.certificateId}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredProgrammes.length === 0 && filteredCourses.length === 0 && filteredJobs.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-400">
              No matching records found for "{searchTerm}". Try searching "PACS", "Diploma", or "Manager".
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
