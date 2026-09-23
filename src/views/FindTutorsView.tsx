import React, { useState, useMemo } from 'react';
import { useAppStore } from '../services/store';
import { TutorCard } from '../components/cards/TutorCard';
import { TutorProfile } from '../types';
import { SUBJECT_CATEGORIES, POPULAR_CLASSES, BANGLADESH_LOCATIONS } from '../data/mockData';
import {
  Search,
  SlidersHorizontal,
  X,
  CheckCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface FindTutorsViewProps {
  initialFilter?: string;
  onNavigate: (tab: string, param?: string) => void;
  onRequestTutor: (tutor: TutorProfile) => void;
}

export const FindTutorsView: React.FC<FindTutorsViewProps> = ({
  initialFilter,
  onNavigate,
  onRequestTutor,
}) => {
  const { tutors } = useAppStore();

  const parsedInitial = useMemo(() => {
    if (!initialFilter) return {};
    try {
      return JSON.parse(initialFilter);
    } catch {
      return {};
    }
  }, [initialFilter]);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [subject, setSubject] = useState<string>(parsedInitial.subject || '');
  const [studentClass, setStudentClass] = useState<string>(parsedInitial.studentClass || '');
  const [location, setLocation] = useState<string>(parsedInitial.location || '');
  const [gender, setGender] = useState<string>('');
  const [teachingMode, setTeachingMode] = useState<string>(parsedInitial.teachingMode || '');
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'experience' | 'fee_asc' | 'fee_desc'>('relevance');

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setSearchQuery('');
    setSubject('');
    setStudentClass('');
    setLocation('');
    setGender('');
    setTeachingMode('');
    setOnlyVerified(false);
    setMinExperience(0);
    setMaxBudget(15000);
    setSortBy('relevance');
  };

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      // Search query (name, university, department, subjects)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tutor.name.toLowerCase().includes(q);
        const matchesUni = tutor.university.toLowerCase().includes(q);
        const matchesDept = tutor.department.toLowerCase().includes(q);
        const matchesSub = tutor.subjects.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesUni && !matchesDept && !matchesSub) return false;
      }

      // Subject
      if (subject && !tutor.subjects.some((s) => s.toLowerCase() === subject.toLowerCase())) {
        return false;
      }

      // Class
      if (studentClass && !tutor.classes.some((c) => c.toLowerCase().includes(studentClass.toLowerCase()))) {
        return false;
      }

      // Location
      if (location && !tutor.preferredLocations.some((loc) => loc.toLowerCase().includes(location.toLowerCase())) && !tutor.district.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      // Gender
      if (gender && tutor.gender !== gender) {
        return false;
      }

      // Teaching Mode
      if (teachingMode && tutor.teachingMode !== 'both' && tutor.teachingMode !== teachingMode) {
        return false;
      }

      // Only Verified
      if (onlyVerified && !tutor.isVerified) {
        return false;
      }

      // Experience
      if (tutor.experienceYears < minExperience) {
        return false;
      }

      // Budget
      if (tutor.minFee > maxBudget) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'fee_asc') return a.minFee - b.minFee;
      if (sortBy === 'fee_desc') return b.minFee - a.minFee;
      return 0; // relevance / default
    });
  }, [
    tutors,
    searchQuery,
    subject,
    studentClass,
    location,
    gender,
    teachingMode,
    onlyVerified,
    minExperience,
    maxBudget,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769E0] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Teacher Directory</span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#102A43]">
                Find Your Perfect Tutor
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Showing <strong className="text-slate-800">{filteredTutors.length}</strong> qualified tutors matching your criteria.
              </p>
            </div>

            {/* Quick search input */}
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by tutor, university, or subject..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                />
              </div>

              {/* Mobile Filter toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden p-2 text-slate-700 bg-white border border-slate-200 rounded-xl flex items-center gap-1.5 text-xs font-semibold shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#1769E0]" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filters on Left + Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#1769E0]" />
                <span>Filter Tutors</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-slate-500 hover:text-[#1769E0] flex items-center gap-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Verified Only Toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
              <label htmlFor="verified-toggle" className="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#1769E0]" />
                <span>Verified Profiles Only</span>
              </label>
              <input
                id="verified-toggle"
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="w-4 h-4 rounded text-[#1769E0] focus:ring-[#1769E0] cursor-pointer"
              />
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-800 focus:ring-1 focus:ring-[#1769E0]"
              >
                <option value="">All Subjects</option>
                {SUBJECT_CATEGORIES.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Class / Grade
              </label>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-800 focus:ring-1 focus:ring-[#1769E0]"
              >
                <option value="">All Classes</option>
                {POPULAR_CLASSES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Area / City
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-800 focus:ring-1 focus:ring-[#1769E0]"
              >
                <option value="">All Areas</option>
                {BANGLADESH_LOCATIONS[0].areas.map((a) => (
                  <option key={a} value={a}>
                    {a}, Dhaka
                  </option>
                ))}
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
              </select>
            </div>

            {/* Tutor Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tutor Gender
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['', 'male', 'female'].map((g) => (
                  <button
                    key={g || 'any'}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border capitalize transition-all ${
                      gender === g
                        ? 'border-[#1769E0] bg-blue-50 text-[#1769E0]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {g === '' ? 'Any' : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Teaching Mode */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Teaching Mode
              </label>
              <select
                value={teachingMode}
                onChange={(e) => setTeachingMode(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-800 focus:ring-1 focus:ring-[#1769E0]"
              >
                <option value="">Any Mode</option>
                <option value="offline">In-Person (Home)</option>
                <option value="online">Online Tutoring</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  Min. Experience
                </label>
                <span className="font-bold text-[#1769E0]">{minExperience} Years</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={minExperience}
                onChange={(e) => setMinExperience(Number(e.target.value))}
                className="w-full accent-[#1769E0] cursor-pointer"
              />
            </div>

            {/* Max Budget */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  Max Monthly Budget
                </label>
                <span className="font-bold text-[#1769E0]">৳{maxBudget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="15000"
                step="1000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-[#1769E0] cursor-pointer"
              />
            </div>
          </aside>

          {/* Right Main Content (9 cols) */}
          <main className="lg:col-span-9 space-y-4">
            {/* Sorting bar */}
            <div className="bg-white rounded-xl border border-slate-200/80 px-4 py-3 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                Sort tutors by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-[#1769E0]"
              >
                <option value="relevance">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="fee_asc">Lowest Fee</option>
                <option value="fee_desc">Highest Fee</option>
              </select>
            </div>

            {/* Tutor Grid */}
            {filteredTutors.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1769E0] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No tutors match your current filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing some filters or searching for a broader location or subject.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-xs font-bold text-[#1769E0] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors inline-block"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredTutors.map((tutor) => (
                  <TutorCard
                    key={tutor.id}
                    tutor={tutor}
                    onViewProfile={(id) => onNavigate('tutor-profile', id)}
                    onRequestTutor={onRequestTutor}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Form controls mirroring sidebar */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 text-xs rounded-lg border border-slate-200"
              >
                <option value="">All Subjects</option>
                {SUBJECT_CATEGORIES.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Class</label>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full p-2 text-xs rounded-lg border border-slate-200"
              >
                <option value="">All Classes</option>
                {POPULAR_CLASSES.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Area</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 text-xs rounded-lg border border-slate-200"
              >
                <option value="">All Areas</option>
                {BANGLADESH_LOCATIONS[0].areas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 bg-[#1769E0] text-white text-xs font-bold rounded-xl mt-4"
            >
              Apply Filters ({filteredTutors.length} Found)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
