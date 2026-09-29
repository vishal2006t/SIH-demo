import React, { useState, useEffect } from 'react';
import { X, QrCode, ScanFace, CheckCircle2, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

interface AttendanceDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'qr' | 'face';
  traineeName?: string;
  onSuccess?: () => void;
}

export const AttendanceDemoModal: React.FC<AttendanceDemoModalProps> = ({
  isOpen,
  onClose,
  type,
  traineeName = "Aarav Sharma",
  onSuccess
}) => {
  const [scanning, setScanning] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      setVerified(false);
      const timer = setTimeout(() => {
        setScanning(false);
        setVerified(true);
        if (onSuccess) onSuccess();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${type === 'qr' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400'}`}>
              {type === 'qr' ? <QrCode className="w-5 h-5" /> : <ScanFace className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {type === 'qr' ? 'QR Code Attendance Terminal' : 'AI Face Recognition Check-In'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ICM Madurai • Smart Classroom A-102
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 text-center overflow-y-auto flex-1">
          
          {/* Scanner Viewport Simulation */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-5 rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-700 shadow-inner flex items-center justify-center">
            
            {/* Background grid texture */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:16px_16px]"></div>

            {type === 'qr' ? (
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-36 h-36 border-2 border-dashed border-blue-400 rounded-xl flex items-center justify-center p-2 bg-white/5 backdrop-blur-sm">
                  <div className="w-28 h-28 bg-white p-2 rounded-lg shadow-md flex items-center justify-center">
                    <QrCode className="w-full h-full text-slate-900" />
                  </div>
                </div>
                {scanning && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bounce"></div>
                )}
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full border-2 border-teal-400/60 p-2 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Facial scan"
                    className="w-32 h-32 rounded-full object-cover grayscale brightness-90 contrast-125"
                  />
                  {scanning && (
                    <div className="absolute inset-0 rounded-full border-4 border-teal-400 border-t-transparent animate-spin"></div>
                  )}
                  {/* Face landmark indicators */}
                  <div className="absolute top-12 left-10 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
                  <div className="absolute top-12 right-10 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-4 h-1 bg-teal-400"></div>
                </div>
              </div>
            )}

            {/* Scanning Overlay text */}
            <div className="absolute bottom-3 inset-x-0 text-center">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                verified ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {scanning ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Analyzing biometric signature...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Biometric Match 99.4%
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Status Message */}
          {verified ? (
            <div className="p-3.5 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-left">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                    Attendance Marked Successfully!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Trainee: <strong>{traineeName}</strong> • Timestamp: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 mb-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-left">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                    Align with Terminal Sensor
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
                    Position within boundary box for instant cryptographic timestamping.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Important SIH Notice Box as specified in prompt */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-left">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
                Demo Mode – Attendance hardware integration can be connected in the next phase.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition"
          >
            Close
          </button>
          {verified && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
            >
              Done
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
