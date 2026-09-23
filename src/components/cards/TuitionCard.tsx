import React from 'react';
import { TuitionPost } from '../../types';
import { useAppStore } from '../../services/store';
import {
  MapPin,
  Calendar,
  Clock,
  Bookmark,
  Users,
  Send,
  Video,
  Home,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface TuitionCardProps {
  tuition: TuitionPost;
  onViewDetails: (id: string) => void;
  onApply: (tuition: TuitionPost) => void;
}

export const TuitionCard: React.FC<TuitionCardProps> = ({
  tuition,
  onViewDetails,
  onApply,
}) => {
  const { savedTuitionIds, toggleSaveTuition } = useAppStore();
  const isSaved = savedTuitionIds.includes(tuition.id);

  // Format posted time
  const postedDate = new Date(tuition.createdAt);
  const formattedDate = postedDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top bar: Code, Class, Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#1769E0] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              {tuition.code}
            </span>
            <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-md">
              {tuition.studentClass}
            </span>
            {tuition.teachingMode === 'both' ? (
              <span className="text-[11px] text-slate-500 font-medium">Online/Offline</span>
            ) : tuition.teachingMode === 'online' ? (
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <Video className="w-3 h-3" /> Online
              </span>
            ) : (
              <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1">
                <Home className="w-3 h-3" /> In-Person
              </span>
            )}
          </div>

          <button
            onClick={() => toggleSaveTuition(tuition.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isSaved
                ? 'bg-amber-50 border-amber-200 text-amber-500'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-slate-100'
            }`}
            aria-label="Bookmark tuition"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onViewDetails(tuition.id)}
          className="text-base font-bold text-slate-900 hover:text-[#1769E0] cursor-pointer transition-colors leading-snug line-clamp-2 mb-2"
        >
          {tuition.title}
        </h3>

        {/* Subjects (Zero-pill clean typography) */}
        <div className="text-xs text-slate-700 font-medium mb-3 flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-slate-400 font-semibold text-[11px]">Subjects:</span>
          {tuition.subjects.map((sub, idx) => (
            <React.Fragment key={sub}>
              <span className="text-slate-800">{sub}</span>
              {idx < tuition.subjects.length - 1 && <span className="text-slate-300">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Location & Schedule Specs */}
        <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3 pb-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-800">{tuition.area}</span>
            <span className="text-slate-400">({tuition.district})</span>
          </div>

          <div className="flex items-center justify-between text-slate-500 pt-0.5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{tuition.daysPerWeek} Days/Week</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{tuition.applicationsCount} applied</span>
            </div>
          </div>
        </div>

        {/* Salary highlight */}
        <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between mb-4 border border-slate-100">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
              Monthly Salary
            </span>
            <span className="text-lg font-black text-[#1769E0]">
              ৳{tuition.salary.toLocaleString()}
            </span>
            {tuition.salaryNegotiable && (
              <span className="text-[10px] text-slate-500 ml-1.5 font-medium">(Negotiable)</span>
            )}
          </div>
          <div className="text-right text-[11px] text-slate-400">
            <span>Posted: {formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => onViewDetails(tuition.id)}
          className="w-full py-2 px-3 text-xs font-semibold text-slate-700 hover:text-[#1769E0] bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-all text-center"
        >
          View Details
        </button>

        <button
          onClick={() => onApply(tuition)}
          className="w-full py-2 px-3 text-xs font-bold text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Apply Now</span>
        </button>
      </div>
    </div>
  );
};
