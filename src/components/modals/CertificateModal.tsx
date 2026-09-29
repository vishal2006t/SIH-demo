import React, { useState } from 'react';
import { X, Award, CheckCircle2, ShieldCheck, Printer, Download, Share2, ExternalLink } from 'lucide-react';
import { CertificateItem } from '../../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateItem;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  if (!isOpen) return null;

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl my-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-semibold">National Digital Credential Preview</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-medium">
              Tamper-Proof
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition"
              title="Print Certificate"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 transition"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Sheet Display */}
        <div className="p-6 md:p-10 bg-slate-100/60 dark:bg-slate-950 flex justify-center">
          
          <div className="w-full max-w-2xl bg-amber-50/30 dark:bg-slate-900 border-8 border-double border-amber-600/40 rounded-xl p-8 md:p-10 shadow-lg relative certificate-watermark">
            
            {/* Ornamental Corners */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-600"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-600"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-600"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-600"></div>

            {/* Header / National Emblem Style */}
            <div className="text-center space-y-1 mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-serif font-black text-xl shadow-md border-2 border-white mb-2">
                🇮🇳
              </div>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                Ministry of Cooperation • Government of India
              </p>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-amber-100">
                National Council for Cooperative Training (NCCT)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                New Delhi, India
              </p>
            </div>

            {/* Certificate Title */}
            <div className="text-center my-6">
              <div className="inline-block relative">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-4 py-1 rounded-full border border-amber-300 dark:border-amber-700">
                  Certificate of Competence & Completion
                </span>
              </div>
              <p className="text-sm italic text-slate-600 dark:text-slate-400 mt-4">
                This is to certify that
              </p>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-blue-900 dark:text-blue-300 underline decoration-amber-500/50 underline-offset-8 mt-2">
                {certificate.traineeName}
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-4 max-w-lg mx-auto leading-relaxed">
                has successfully completed all prescribed coursework, practical labs, and qualifying assessments for
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {certificate.programme}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Conducted at {certificate.institute}
              </p>
            </div>

            {/* Performance Grade & ID */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 my-6 border-y border-amber-300/40 dark:border-slate-800 text-left">
              <div>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Certificate ID
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {certificate.certificateId}
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Date of Issue
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {certificate.completionDate}
                </span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Academic Performance
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {certificate.grade}
                </span>
              </div>
            </div>

            {/* Bottom Row: Signatures & QR Seal */}
            <div className="flex items-end justify-between pt-4">
              
              <div className="text-center w-36">
                <div className="font-serif italic text-base text-slate-800 dark:text-slate-300 font-bold border-b border-slate-400 pb-1">
                  K. S. Ramanujam
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase">
                  Director of Institute
                </p>
              </div>

              {/* Central Gold Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-amber-500 bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center p-1 shadow-inner">
                  <div className="w-12 h-12 rounded-full border border-dashed border-amber-600 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <span className="text-[9px] font-bold text-amber-700 dark:text-amber-400 mt-1 tracking-wider uppercase">
                  NCCT Verified
                </span>
              </div>

              <div className="text-center w-36">
                <div className="font-serif italic text-base text-slate-800 dark:text-slate-300 font-bold border-b border-slate-400 pb-1">
                  V. K. Aggarwal
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase">
                  Secretary, NCCT
                </p>
              </div>

            </div>

            {/* Cryptographic hash footnote */}
            <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-mono text-center truncate">
              Blockchain Registry Hash: {certificate.qrHash} • Verifiable on SMART TRAINING SYSTEM Skill Passport
            </div>

          </div>

        </div>

        {/* Verification & Action Bar */}
        <div className="p-4 px-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Verification Status:</span>
            {verificationSuccess ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Cryptographically Validated via National Registry
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                Status: {certificate.verificationStatus}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!verificationSuccess && (
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition"
              >
                {isVerifying ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Querying NCCT Node...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verify Certificate
                  </>
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
