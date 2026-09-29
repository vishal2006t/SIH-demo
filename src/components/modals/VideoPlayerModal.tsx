import React, { useState } from 'react';
import { X, Play, Pause, Volume2, Maximize, RotateCcw, CheckCircle, BookOpen, Clock, User } from 'lucide-react';
import { VideoItem } from '../../types';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoItem | null;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  video
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'notes' | 'chapters'>('notes');

  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 px-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {video.category}
            </span>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate max-w-[200px] sm:max-w-md">
              {video.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center group overflow-hidden">
          
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover opacity-80 ${isPlaying ? 'scale-105' : 'scale-100'} transition-transform duration-700`}
          />

          {/* Video Gradient Shade */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none"></div>

          {/* Center Play Button Overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl hover:bg-blue-500 hover:scale-110 transition backdrop-blur-sm"
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 translate-x-0.5" />}
          </button>

          {/* Playing indicator */}
          {isPlaying && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-semibold backdrop-blur-sm shadow-sm animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              STREAMING DEMO • NCCT LMS
            </div>
          )}

          {/* Bottom Player Controls */}
          <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col gap-2">
            
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-700/80 rounded-full overflow-hidden cursor-pointer">
              <div className="w-2/5 h-full bg-blue-500 rounded-full relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-blue-400">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <RotateCcw className="w-4 h-4 hover:text-blue-400 cursor-pointer" />
                <span className="text-slate-300 font-mono text-[11px]">08:42 / {video.duration}</span>
                <Volume2 className="w-4 h-4 text-slate-300 hover:text-white cursor-pointer" />
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">1080p HD</span>
                <Maximize className="w-4 h-4 text-slate-300 hover:text-white cursor-pointer" />
              </div>
            </div>

          </div>

        </div>

        {/* Video Information & Tabs */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{video.title}</h2>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {video.instructor}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Duration: {video.duration}</span>
                <span>{video.views}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${activeTab === 'notes' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
              >
                Key Notes
              </button>
              <button
                onClick={() => setActiveTab('chapters')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${activeTab === 'chapters' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
              >
                Video Chapters
              </button>
            </div>
          </div>

          <div className="pt-4">
            {activeTab === 'notes' ? (
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Core Lesson Objectives:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-400">
                  <li>Understanding the democratic voting structure of primary agricultural credit societies.</li>
                  <li>Compliance guidelines under the Multi-State Cooperative Societies Amendment Act 2023.</li>
                  <li>How digital ledger entry prevents audit discrepancies in village-level societies.</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                {[
                  { time: "00:00", label: "Introduction to Cooperative Principles" },
                  { time: "06:15", label: "National Council Curriculum Framework" },
                  { time: "14:30", label: "Live Demonstration of PACS ERP Ledger Entry" },
                  { time: "22:10", label: "Audit Verification and Q&A Review" }
                ].map((ch, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{ch.label}</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded text-[11px]">
                      {ch.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
