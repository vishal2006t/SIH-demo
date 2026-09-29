import React, { useState } from 'react';
import { X, BedDouble, UserPlus, CheckCircle2, Building, ShieldCheck } from 'lucide-react';
import { HostelRoom } from '../../types';

interface RoomAllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: HostelRoom | null;
  onAllocate: (roomNo: string, traineeName: string) => void;
}

export const RoomAllocationModal: React.FC<RoomAllocationModalProps> = ({
  isOpen,
  onClose,
  room,
  onAllocate
}) => {
  const [traineeName, setTraineeName] = useState('');
  const [allocated, setAllocated] = useState(false);

  if (!isOpen || !room) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!traineeName.trim()) return;
    onAllocate(room.roomNo, traineeName);
    setAllocated(true);
    setTimeout(() => {
      setAllocated(false);
      setTraineeName('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400">
              <BedDouble className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Allocate Bed in Room {room.roomNo}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {room.block} • Capacity: {room.capacity} ({room.available} beds left)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {allocated ? (
          <div className="p-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">Bed Allocated!</h4>
            <p className="text-xs text-slate-500">{traineeName} has been assigned to Room {room.roomNo}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Current Occupants
              </label>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                {room.occupants && room.occupants.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {room.occupants.map((occ, idx) => (
                      <li key={idx}>{occ}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-slate-400 italic">No occupants currently in this room.</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5 text-teal-600" />
                Select Trainee Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Gupta (DCBM-2026-B1)"
                value={traineeName}
                onChange={(e) => setTraineeName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white"
              />
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition"
              >
                Confirm Allocation
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
