import React, { useState } from 'react';
import { TutorProfile } from '../../types';
import { useAppStore } from '../../services/store';
import { X, Send, Phone, MapPin, BookOpen, AlertCircle } from 'lucide-react';

interface RequestTutorModalProps {
  tutor: TutorProfile | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RequestTutorModal: React.FC<RequestTutorModalProps> = ({
  tutor,
  onClose,
  onSuccess,
}) => {
  const { requestTutor, currentUser } = useAppStore();

  const [subject, setSubject] = useState<string>(tutor?.subjects[0] || 'Mathematics');
  const [studentClass, setStudentClass] = useState<string>(tutor?.classes[0] || 'HSC');
  const [phone, setPhone] = useState<string>(currentUser?.phone || '+880 1819-876543');
  const [message, setMessage] = useState<string>(
    `Hello ${tutor?.name}, we are looking for a dedicated tutor for my child in ${tutor?.preferredLocations[0] || 'Dhaka'}. Please let us know your availability for a demo class.`
  );
  const [error, setError] = useState<string>('');

  if (!tutor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 8) {
      setError('Please provide a valid Bangladeshi contact phone number.');
      return;
    }
    if (!message.trim()) {
      setError('Please describe your requirements.');
      return;
    }

    requestTutor(tutor.id, subject, studentClass, message, phone);
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-[#102A43] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-[#FFD43B] uppercase tracking-wider block mb-1">
            Direct Tutor Request
          </span>
          <h3 className="text-xl font-bold text-white">Request {tutor.name}</h3>
          <p className="text-xs text-slate-300 mt-1">
            {tutor.university} · Expected: ৳{tutor.minFee.toLocaleString()}–৳{tutor.maxFee.toLocaleString()}/mo
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subject Needed *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
              >
                {tutor.subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Student Class *
              </label>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
              >
                {tutor.classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Contact Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                placeholder="+880 1XXXXXXXXX"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Requirement Details & Schedule *
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
              placeholder="State student learning level, days per week, and preferred time..."
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
