import React from 'react';
import { TutorProfile } from '../../types';
import { useAppStore } from '../../services/store';
import {
  CheckCircle,
  Star,
  MapPin,
  Clock,
  GraduationCap,
  Heart,
  Video,
  Home,
  Layers,
} from 'lucide-react';

interface TutorCardProps {
  tutor: TutorProfile;
  onViewProfile: (tutorId: string) => void;
  onRequestTutor: (tutor: TutorProfile) => void;
}

export const TutorCard: React.FC<TutorCardProps> = ({
  tutor,
  onViewProfile,
  onRequestTutor,
}) => {
  const { savedTutorIds, toggleSaveTutor } = useAppStore();
  const isSaved = savedTutorIds.includes(tutor.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      {/* Top Header: Photo, Name, Verified Badge, Save button */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-blue-100 group-hover:ring-[#1769E0] transition-all"
                referrerPolicy="no-referrer"
              />
              {tutor.isVerified && (
                <div
                  className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs"
                  title="Verified Tutor Credentials"
                >
                  <CheckCircle className="w-4 h-4 text-[#1769E0] fill-blue-50" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3
                  onClick={() => onViewProfile(tutor.id)}
                  className="text-base font-bold text-slate-900 hover:text-[#1769E0] cursor-pointer transition-colors leading-tight line-clamp-1"
                >
                  {tutor.name}
                </h3>
              </div>

              {/* Education institution */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 line-clamp-1 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-[#1769E0] shrink-0" />
                <span className="truncate">{tutor.university}</span>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-1 text-xs text-slate-600 mt-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-900">{tutor.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({tutor.reviewCount} reviews)</span>
                <span className="text-slate-300 font-normal">·</span>
                <span className="text-slate-600 font-medium">{tutor.experienceYears} yrs exp</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => toggleSaveTutor(tutor.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-slate-100'
            }`}
            aria-label="Save tutor"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Subjects & Target Classes (Zero-pill discipline: unboxed clean typography) */}
        <div className="border-t border-slate-100 pt-3 pb-2 space-y-2">
          <div className="text-xs">
            <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider mb-0.5">
              Subjects
            </span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-700 font-medium">
              {tutor.subjects.map((sub, i) => (
                <React.Fragment key={sub}>
                  <span className="hover:text-[#1769E0] transition-colors">{sub}</span>
                  {i < tutor.subjects.length - 1 && <span className="text-slate-300">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="text-xs">
            <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider mb-0.5">
              Classes
            </span>
            <p className="text-slate-600 text-xs truncate">
              {tutor.classes.join(', ')}
            </p>
          </div>
        </div>

        {/* Location & Teaching Mode details */}
        <div className="pt-2 pb-3 border-t border-slate-100 flex flex-col gap-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">
              {tutor.preferredLocations.slice(0, 3).join(', ')}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-1.5 text-slate-600">
              {tutor.teachingMode === 'both' ? (
                <>
                  <Layers className="w-3.5 h-3.5 text-blue-500" />
                  <span>Online & In-Person</span>
                </>
              ) : tutor.teachingMode === 'online' ? (
                <>
                  <Video className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Online Only</span>
                </>
              ) : (
                <>
                  <Home className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Home Tutoring</span>
                </>
              )}
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Expected Fee</span>
              <span className="text-sm font-bold text-[#102A43]">
                ৳{tutor.minFee.toLocaleString()}–৳{tutor.maxFee.toLocaleString()}
                <span className="text-[11px] font-normal text-slate-500">/{tutor.feeType === 'monthly' ? 'mo' : 'hr'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => onViewProfile(tutor.id)}
          className="w-full py-2 px-3 text-xs font-semibold text-slate-700 hover:text-[#1769E0] bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-all text-center"
        >
          View Profile
        </button>

        <button
          onClick={() => onRequestTutor(tutor)}
          className="w-full py-2 px-3 text-xs font-bold text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] rounded-xl shadow-xs transition-all text-center active:scale-95"
        >
          Request Tutor
        </button>
      </div>
    </div>
  );
};
