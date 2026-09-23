import React from 'react';
import { useAppStore } from '../services/store';
import { TuitionPost } from '../types';
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Bookmark,
  Share2,
  Users,
  Send,
  ArrowLeft,
  CheckCircle,
  Video,
  Home,
  Layers,
  GraduationCap,
  Shield,
  HelpCircle,
} from 'lucide-react';

interface TuitionDetailsViewProps {
  tuitionId: string;
  onNavigate: (tab: string, param?: string) => void;
  onApplyTuition: (tuition: TuitionPost) => void;
}

export const TuitionDetailsView: React.FC<TuitionDetailsViewProps> = ({
  tuitionId,
  onNavigate,
  onApplyTuition,
}) => {
  const { getTuitionById, savedTuitionIds, toggleSaveTuition, showToast, tuitions } = useAppStore();

  const tuition = getTuitionById(tuitionId) || tuitions[0];
  const isSaved = savedTuitionIds.includes(tuition.id);

  const relatedTuitions = tuitions.filter((t) => t.id !== tuition.id && (t.studentClass === tuition.studentClass || t.district === tuition.district)).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tuition link copied to clipboard!', 'success');
  };

  const formattedDate = new Date(tuition.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('tuitions')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1769E0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tuition Opportunities</span>
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-mono font-bold text-[#1769E0] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                  {tuition.code}
                </span>
                <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">
                  {tuition.studentClass}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{tuition.status.toUpperCase()}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] leading-tight">
                {tuition.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-800">{tuition.area}, {tuition.district}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{tuition.daysPerWeek} Days / Week</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Posted on {formattedDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#1769E0]" />
                  <span className="font-bold text-[#1769E0]">{tuition.applicationsCount} tutors applied</span>
                </div>
              </div>
            </div>

            {/* Salary & Action button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80 w-full lg:w-auto shrink-0">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Offered Monthly Salary
                </span>
                <span className="text-3xl font-black text-[#1769E0]">
                  ৳{tuition.salary.toLocaleString()}
                </span>
                {tuition.salaryNegotiable && (
                  <span className="text-xs text-slate-500 block font-medium">Negotiable</span>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onApplyTuition(tuition)}
                  className="py-3 px-6 rounded-xl font-bold text-xs text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply Now</span>
                </button>
                <button
                  onClick={() => toggleSaveTuition(tuition.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isSaved ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500'
                  }`}
                  aria-label="Bookmark tuition"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-3">
              <h2 className="text-base font-bold text-[#102A43]">
                Tuition Requirements & Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {tuition.description}
              </p>
            </div>

            {/* Subjects Needed */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-3">
              <h2 className="text-base font-bold text-[#102A43]">
                Subjects Required
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-800 font-semibold">
                {tuition.subjects.map((sub, i) => (
                  <React.Fragment key={sub}>
                    <span className="bg-blue-50 text-[#1769E0] px-3 py-1 rounded-lg border border-blue-100">
                      {sub}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Student & Guardian Info */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
              <h2 className="text-base font-bold text-[#102A43]">
                Student & Learning Context
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[11px] mb-0.5">Student Class</span>
                  <span className="font-bold text-slate-900">{tuition.studentClass} ({tuition.medium})</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[11px] mb-0.5">Student Gender</span>
                  <span className="font-bold text-slate-900 capitalize">{tuition.studentGender}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[11px] mb-0.5">Teaching Mode</span>
                  <span className="font-bold text-slate-900 capitalize">
                    {tuition.teachingMode === 'both' ? 'Online or In-Person' : tuition.teachingMode}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[11px] mb-0.5">Preferred Schedule</span>
                  <span className="font-bold text-slate-900">{tuition.preferredTime}</span>
                </div>
              </div>
            </div>

            {/* Tutor Preferences */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
              <h2 className="text-base font-bold text-[#102A43]">
                Guardian's Preferred Tutor Criteria
              </h2>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#1769E0]" />
                  <span>
                    Preferred Institution: <strong>{tuition.preferredUniversity}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1769E0]" />
                  <span>
                    Preferred Gender: <strong className="capitalize">{tuition.preferredTutorGender === 'any' ? 'Male or Female' : tuition.preferredTutorGender}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>
                    Transcripts and university ID card will be verified during introductory session.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Quick Action Box */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Interested in this Tuition?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send your application directly to the guardian with your expected salary and timetable.
              </p>
              <button
                onClick={() => onApplyTuition(tuition)}
                className="w-full py-3 rounded-xl font-bold text-xs text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit My Application</span>
              </button>
            </div>

            {/* Related Tuitions */}
            {relatedTuitions.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Similar Opportunities
                </h3>
                <div className="space-y-3">
                  {relatedTuitions.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onNavigate('tuition-details', rel.id)}
                      className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50 cursor-pointer transition-all space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono text-[#1769E0] font-bold">{rel.code}</span>
                        <span className="font-bold text-slate-900">৳{rel.salary.toLocaleString()}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{rel.title}</p>
                      <p className="text-[11px] text-slate-500">{rel.studentClass} · {rel.area}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
