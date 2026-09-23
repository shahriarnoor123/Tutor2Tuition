import React, { useState } from 'react';
import { TuitionPost } from '../../types';
import { useAppStore } from '../../services/store';
import { X, Send, AlertCircle, DollarSign, Calendar, FileText } from 'lucide-react';

interface ApplyModalProps {
  tuition: TuitionPost | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ tuition, onClose, onSuccess }) => {
  const { applyForTuition, currentUser, tutors } = useAppStore();

  const currentTutor = tutors.find((t) => t.userId === currentUser?.id) || tutors[0];

  const [expectedSalary, setExpectedSalary] = useState<number>(tuition?.salary || 6000);
  const [availability, setAvailability] = useState<string>(
    'Sat, Mon, Wed (5:30 PM - 8:00 PM)'
  );
  const [coverLetter, setCoverLetter] = useState<string>(
    `Assalamu Alaikum. I am a student/graduate of ${currentTutor.university} (${currentTutor.department}). I have ${currentTutor.experienceYears} years of teaching experience in ${tuition?.subjects.join(', ')}. I will conduct weekly evaluations and ensure complete conceptual clarity.`
  );
  const [error, setError] = useState<string>('');

  if (!tuition) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expectedSalary || expectedSalary < 1000) {
      setError('Please provide a realistic expected salary (minimum ৳1,000)');
      return;
    }
    if (!coverLetter.trim() || coverLetter.length < 20) {
      setError('Please write at least a brief cover message for the guardian (minimum 20 characters).');
      return;
    }

    const success = applyForTuition(tuition.id, Number(expectedSalary), availability, coverLetter);
    if (success) {
      if (onSuccess) onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-[#1769E0] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-100 uppercase tracking-wider mb-1">
            <span>Apply for Tuition Opportunity</span>
            <span>·</span>
            <span>{tuition.code}</span>
          </div>
          <h3 className="text-xl font-bold text-white line-clamp-1">{tuition.title}</h3>
          <p className="text-xs text-blue-100 mt-1">
            {tuition.studentClass} · {tuition.area}, {tuition.district} · Offered Salary: ৳{tuition.salary.toLocaleString()}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Current Tutor summary */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center gap-3">
            <img
              src={currentTutor.avatar}
              alt={currentTutor.name}
              className="w-10 h-10 rounded-xl object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="text-xs">
              <p className="font-bold text-slate-900">{currentTutor.name}</p>
              <p className="text-slate-500">{currentTutor.university} · {currentTutor.department}</p>
            </div>
          </div>

          {/* Expected Salary */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Expected Monthly Salary (৳ BDT) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">৳</span>
              <input
                type="number"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                placeholder="e.g. 7000"
                required
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Availability & Schedule *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                placeholder="e.g. 3 days/week in the evening after 5 PM"
                required
              />
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Cover Note for Guardian / Student *
            </label>
            <textarea
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
              placeholder="Highlight your educational qualifications, past teaching experience, and methodology..."
              required
            />
          </div>

          {/* Actions */}
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
              <span>Submit Application</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
