import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, Table, Printer } from 'lucide-react';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  isOpen,
  onClose,
  reportTitle
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {reportTitle}
              </h3>
              <p className="text-xs text-slate-500">Official NCCT Institute Analytics Audit</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
            <div>
              <span className="text-slate-500">Period:</span> <strong>Academic Year 2025-2026</strong>
            </div>
            <div>
              <span className="text-slate-500">Institute:</span> <strong>ICM Madurai</strong>
            </div>
            <div>
              <span className="text-slate-500">Generated:</span> <strong>Today, 10:30 AM</strong>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Cohort / Metric</th>
                  <th className="p-3">Target</th>
                  <th className="p-3">Achieved</th>
                  <th className="p-3">Efficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-medium">PACS ERP Diploma B1</td>
                  <td className="p-3">45 Trainees</td>
                  <td className="p-3">45 Certified</td>
                  <td className="p-3 text-emerald-600 font-bold">100%</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Digital Biometric Attendance</td>
                  <td className="p-3">90.0%</td>
                  <td className="p-3">94.6%</td>
                  <td className="p-3 text-emerald-600 font-bold">+4.6%</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Hostel Bed Occupancy</td>
                  <td className="p-3">60 Beds</td>
                  <td className="p-3">48 Occupied</td>
                  <td className="p-3 text-blue-600 font-bold">80.0%</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Average Quiz Score</td>
                  <td className="p-3">75.0%</td>
                  <td className="p-3">82.4%</td>
                  <td className="p-3 text-emerald-600 font-bold">+7.4%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {downloaded && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Demo Report exported as PDF / Excel spreadsheet successfully.
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            Close
          </button>
          <button
            onClick={handleExport}
            disabled={downloading}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow-sm"
          >
            {downloading ? (
              <>
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Generating Export...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                Export Demo (CSV/PDF)
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
