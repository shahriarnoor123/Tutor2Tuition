import React from 'react';
import { useAppStore } from '../services/store';
import { TutorProfile } from '../types';
import {
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  Clock,
  GraduationCap,
  Briefcase,
  BookOpen,
  MessageSquare,
  Heart,
  Share2,
  ShieldCheck,
  Video,
  Home,
  Layers,
  ArrowLeft,
  Award,
} from 'lucide-react';

interface TutorProfileViewProps {
  tutorId: string;
  onNavigate: (tab: string, param?: string) => void;
  onRequestTutor: (tutor: TutorProfile) => void;
}

export const TutorProfileView: React.FC<TutorProfileViewProps> = ({
  tutorId,
  onNavigate,
  onRequestTutor,
}) => {
  const { getTutorById, savedTutorIds, toggleSaveTutor, startOrGetConversation, currentUser, showToast, tutors } = useAppStore();

  const tutor = getTutorById(tutorId) || tutors[0];
  const isSaved = savedTutorIds.includes(tutor.id);

  const relatedTutors = tutors.filter((t) => t.id !== tutor.id && t.subjects.some((s) => tutor.subjects.includes(s))).slice(0, 3);

  const handleMessage = () => {
    if (!currentUser) {
      showToast('Please sign in to send a direct message.', 'info');
      return;
    }
    startOrGetConversation(tutor.userId, tutor.name, tutor.avatar, 'tutor');
    onNavigate('messages');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tutor profile link copied to clipboard!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Back */}
        <button
          onClick={() => onNavigate('tutors')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1769E0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tutors</span>
        </button>

        {/* Profile Header Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-blue-50 shadow-md"
                  referrerPolicy="no-referrer"
                />
                {tutor.isVerified && (
                  <div
                    className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md"
                    title="Verified Credentials"
                  >
                    <CheckCircle className="w-6 h-6 text-[#1769E0] fill-blue-50" />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
                    {tutor.name}
                  </h1>
                  {tutor.isVerified && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1769E0] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-slate-700 leading-snug max-w-xl">
                  {tutor.title}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4 text-[#1769E0]" />
                    <span className="font-semibold text-slate-800">{tutor.university}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{tutor.division}, {tutor.district}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900">{tutor.rating.toFixed(1)}</span>
                    <span className="text-slate-400">({tutor.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex sm:flex-col items-center sm:items-stretch gap-2.5 w-full md:w-auto shrink-0">
              <button
                onClick={() => onRequestTutor(tutor)}
                className="flex-1 sm:flex-none py-3 px-6 rounded-xl font-bold text-xs text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] shadow-md transition-all text-center active:scale-95"
              >
                Request This Tutor
              </button>
              <div className="flex items-center gap-2 w-full">
                <button
                  onClick={handleMessage}
                  className="flex-1 py-2.5 px-3 rounded-xl font-semibold text-xs text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#1769E0]" />
                  <span>Message</span>
                </button>
                <button
                  onClick={() => toggleSaveTutor(tutor.id)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isSaved ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500'
                  }`}
                  aria-label="Save tutor"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="Share profile"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* About Me */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-3">
              <h2 className="text-base font-bold text-[#102A43] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1769E0]" />
                <span>About Me</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {tutor.about}
              </p>
            </div>

            {/* Educational Background */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
              <h2 className="text-base font-bold text-[#102A43] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#1769E0]" />
                <span>Education</span>
              </h2>

              <div className="space-y-4">
                {tutor.educationList.map((edu, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                      <p className="text-xs text-slate-600 font-medium">{edu.institution} {edu.department ? `· ${edu.department}` : ''}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <span>Year: {edu.year}</span>
                        <span>·</span>
                        <span className="font-semibold text-emerald-600">{edu.result}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Experience */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
              <h2 className="text-base font-bold text-[#102A43] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#1769E0]" />
                <span>Teaching Experience ({tutor.experienceYears} Years)</span>
              </h2>

              <div className="space-y-4">
                {tutor.experienceList.map((exp, idx) => (
                  <div key={idx} className="pb-3 border-b border-slate-100 last:border-b-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{exp.role}</h4>
                      <span className="text-[11px] text-slate-400 font-medium">{exp.duration}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-600">{exp.institutionOrContext}</p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-0.5">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Strengths */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-3">
              <h2 className="text-base font-bold text-[#102A43] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#1769E0]" />
                <span>Skills & Teaching Strengths</span>
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-700 font-medium">
                {tutor.skills.map((skill, i) => (
                  <React.Fragment key={skill}>
                    <span>{skill}</span>
                    {i < tutor.skills.length - 1 && <span className="text-slate-300">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Student & Guardian Reviews */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#102A43] flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>Student & Parent Reviews ({tutor.reviews.length})</span>
                </h2>
                <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                  <span>{tutor.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">/ 5.0</span>
                </div>
              </div>

              <div className="space-y-4">
                {tutor.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{rev.reviewerName}</span>
                        <span className="text-[10px] text-slate-400">· {rev.reviewerRole}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Teaching Specifications & Fees (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Tuition Parameters Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft space-y-5">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Expected Monthly Fee
                </span>
                <div className="text-2xl font-black text-[#1769E0]">
                  ৳{tutor.minFee.toLocaleString()} – ৳{tutor.maxFee.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500"> /month</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Negotiable depending on days per week</p>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3.5 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Subjects Taught
                  </span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-semibold text-slate-800">
                    {tutor.subjects.map((sub, idx) => (
                      <React.Fragment key={sub}>
                        <span>{sub}</span>
                        {idx < tutor.subjects.length - 1 && <span className="text-slate-300">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Target Classes
                  </span>
                  <p className="font-semibold text-slate-800">{tutor.classes.join(', ')}</p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Preferred Locations
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{tutor.preferredLocations.join(', ')}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Teaching Mode
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    {tutor.teachingMode === 'both' ? (
                      <>
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        <span>Online & In-Person Available</span>
                      </>
                    ) : tutor.teachingMode === 'online' ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Online Only</span>
                      </>
                    ) : (
                      <>
                        <Home className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Home Visits Only</span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Availability
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{tutor.availability} ({tutor.daysPerWeek})</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onRequestTutor(tutor)}
                  className="w-full py-3 rounded-xl font-bold text-xs text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] shadow-md transition-all active:scale-95 text-center"
                >
                  Send Direct Request
                </button>
              </div>
            </div>

            {/* Related Tutors */}
            {relatedTutors.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Similar Qualified Tutors
                </h3>
                <div className="space-y-3">
                  {relatedTutors.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onNavigate('tutor-profile', rel.id)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={rel.avatar}
                        alt={rel.name}
                        className="w-10 h-10 rounded-lg object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-xs truncate">
                        <p className="font-bold text-slate-900 truncate">{rel.name}</p>
                        <p className="text-slate-500 truncate">{rel.university}</p>
                        <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{rel.rating.toFixed(1)}</span>
                        </div>
                      </div>
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
