import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { SUBJECT_CATEGORIES, POPULAR_CLASSES, BANGLADESH_LOCATIONS } from '../data/mockData';
import {
  Save,
  ArrowLeft,
  GraduationCap,
  BookOpen,
  DollarSign,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface TutorProfileEditViewProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const TutorProfileEditView: React.FC<TutorProfileEditViewProps> = ({ onNavigate }) => {
  const { tutors, updateTutorProfile, currentUser, showToast } = useAppStore();

  const currentTutor = tutors.find((t) => t.userId === currentUser?.id) || tutors[0];

  const [name, setName] = useState(currentTutor.name);
  const [title, setTitle] = useState(currentTutor.title);
  const [university, setUniversity] = useState(currentTutor.university);
  const [department, setDepartment] = useState(currentTutor.department);
  const [experienceYears, setExperienceYears] = useState(currentTutor.experienceYears);
  const [about, setAbout] = useState(currentTutor.about);
  const [minFee, setMinFee] = useState(currentTutor.minFee);
  const [maxFee, setMaxFee] = useState(currentTutor.maxFee);
  const [teachingMode, setTeachingMode] = useState(currentTutor.teachingMode);
  const [availability, setAvailability] = useState(currentTutor.availability);
  const [daysPerWeek, setDaysPerWeek] = useState(currentTutor.daysPerWeek);
  const [preferredLocations, setPreferredLocations] = useState(currentTutor.preferredLocations.join(', '));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateTutorProfile(currentTutor.id, {
      name,
      title,
      university,
      department,
      experienceYears: Number(experienceYears),
      about,
      minFee: Number(minFee),
      maxFee: Number(maxFee),
      teachingMode,
      availability,
      daysPerWeek,
      preferredLocations: preferredLocations.split(',').map((s) => s.trim()).filter(Boolean),
    });

    onNavigate('tutor-profile', currentTutor.id);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <button
          onClick={() => onNavigate('tutor-dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1769E0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-[#1769E0] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Profile Settings</span>
              </div>
              <h1 className="text-2xl font-extrabold text-[#102A43]">
                Edit Your Tutor Profile
              </h1>
              <p className="text-xs text-slate-500">
                Keep your academic credentials and fee parameters up to date to receive relevant tuition offers.
              </p>
            </div>
            {currentTutor.isVerified && (
              <span className="text-xs font-bold text-[#1769E0] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Verified Credentials
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6 pt-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Display Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Professional Headline *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                  placeholder="e.g. BUET Graduate | 5+ Years HSC Math Specialist"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  University / College *
                </label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Department / Subject *
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                  required
                />
              </div>
            </div>

            {/* About bio */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                About Me & Teaching Philosophy *
              </label>
              <textarea
                rows={5}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 leading-relaxed focus:ring-2 focus:ring-[#1769E0]"
                required
              />
            </div>

            {/* Fees & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Min Expected Fee (৳/mo) *
                </label>
                <input
                  type="number"
                  value={minFee}
                  onChange={(e) => setMinFee(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Max Expected Fee (৳/mo) *
                </label>
                <input
                  type="number"
                  value={maxFee}
                  onChange={(e) => setMaxFee(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Teaching Experience (Years)
                </label>
                <input
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                />
              </div>
            </div>

            {/* Mode & Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Teaching Mode
                </label>
                <select
                  value={teachingMode}
                  onChange={(e) => setTeachingMode(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                >
                  <option value="both">Both Online & In-Person</option>
                  <option value="offline">In-Person Only</option>
                  <option value="online">Online Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Days Per Week
                </label>
                <input
                  type="text"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  placeholder="e.g. 3-4 Days / Week"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Daily Timetable
                </label>
                <input
                  type="text"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  placeholder="e.g. Evenings (5:00 PM - 9:00 PM)"
                />
              </div>
            </div>

            {/* Preferred Locations */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Preferred Teaching Areas (Comma-separated)
              </label>
              <input
                type="text"
                value={preferredLocations}
                onChange={(e) => setPreferredLocations(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                placeholder="e.g. Dhanmondi, Mohammadpur, Lalmatia, Farmgate"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onNavigate('tutor-dashboard')}
                className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-7 py-2.5 text-xs font-bold text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
