import React, { useState, useMemo } from 'react';
import { useAppStore } from '../services/store';
import { TuitionCard } from '../components/cards/TuitionCard';
import { TuitionPost } from '../types';
import { SUBJECT_CATEGORIES, POPULAR_CLASSES, BANGLADESH_LOCATIONS } from '../data/mockData';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  DollarSign,
  Calendar,
  X,
} from 'lucide-react';

interface FindTuitionViewProps {
  initialFilter?: string;
  onNavigate: (tab: string, param?: string) => void;
  onApplyTuition: (tuition: TuitionPost) => void;
}

export const FindTuitionView: React.FC<FindTuitionViewProps> = ({
  initialFilter,
  onNavigate,
  onApplyTuition,
}) => {
  const { tuitions } = useAppStore();

  const parsedInitial = useMemo(() => {
    if (!initialFilter) return {};
    try {
      return JSON.parse(initialFilter);
    } catch {
      return {};
    }
  }, [initialFilter]);

  const [searchQuery, setSearchQuery] = useState('');
  const [subject, setSubject] = useState<string>(parsedInitial.subject || '');
  const [studentClass, setStudentClass] = useState<string>(parsedInitial.studentClass || '');
  const [location, setLocation] = useState<string>(parsedInitial.location || '');
  const [teachingMode, setTeachingMode] = useState<string>(parsedInitial.teachingMode || '');
  const [tutorGender, setTutorGender] = useState<string>('');
  const [daysPerWeek, setDaysPerWeek] = useState<string>('');
  const [minSalary, setMinSalary] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<'newest' | 'salary_desc' | 'salary_asc' | 'applications'>('newest');

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setSearchQuery('');
    setSubject('');
    setStudentClass('');
    setLocation('');
    setTeachingMode('');
    setTutorGender('');
    setDaysPerWeek('');
    setMinSalary(3000);
    setSortBy('newest');
  };

  const filteredTuitions = useMemo(() => {
    return tuitions.filter((t) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesCode = t.code.toLowerCase().includes(q);
        const matchesArea = t.area.toLowerCase().includes(q);
        const matchesSub = t.subjects.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCode && !matchesArea && !matchesSub) return false;
      }

      if (subject && !t.subjects.some((s) => s.toLowerCase() === subject.toLowerCase())) {
        return false;
      }

      if (studentClass && !t.studentClass.toLowerCase().includes(studentClass.toLowerCase())) {
        return false;
      }

      if (location && !t.area.toLowerCase().includes(location.toLowerCase()) && !t.district.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      if (teachingMode && t.teachingMode !== 'both' && t.teachingMode !== teachingMode) {
        return false;
      }

      if (tutorGender && t.preferredTutorGender !== 'any' && t.preferredTutorGender !== tutorGender) {
        return false;
      }

      if (daysPerWeek && t.daysPerWeek !== Number(daysPerWeek)) {
        return false;
      }

      if (t.salary < minSalary) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'salary_desc') return b.salary - a.salary;
      if (sortBy === 'salary_asc') return a.salary - b.salary;
      if (sortBy === 'applications') return b.applicationsCount - a.applicationsCount;
      // Default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    tuitions,
    searchQuery,
    subject,
    studentClass,
    location,
    teachingMode,
    tutorGender,
    daysPerWeek,
    minSalary,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Tuition Marketplace</span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#102A43]">
                Find Tuition Opportunities
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Explore <strong className="text-slate-800">{filteredTuitions.length}</strong> active tuition requirements from verified parents.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by area, code, or subject..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                />
              </div>

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

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#1769E0]" />
                <span>Filter Tuition</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-slate-500 hover:text-[#1769E0] flex items-center gap-1"
                title="Reset filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Subject */}
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
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Class */}
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
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Location Area
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-800 focus:ring-1 focus:ring-[#1769E0]"
              >
                <option value="">All Areas</option>
                {BANGLADESH_LOCATIONS[0].areas.map((a) => (
                  <option key={a} value={a}>{a}, Dhaka</option>
                ))}
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
              </select>
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
                <option value="offline">In-Person (Home Visit)</option>
                <option value="online">Online Tutoring</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Tutor Gender Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Preferred Tutor Gender
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['', 'male', 'female'].map((g) => (
                  <button
                    key={g || 'any'}
                    type="button"
                    onClick={() => setTutorGender(g)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border capitalize transition-all ${
                      tutorGender === g
                        ? 'border-[#1769E0] bg-blue-50 text-[#1769E0]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {g === '' ? 'Any' : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Days per week */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Days / Week
              </label>
              <select
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-800 focus:ring-1 focus:ring-[#1769E0]"
              >
                <option value="">Any Days</option>
                <option value="2">2 Days / Week</option>
                <option value="3">3 Days / Week</option>
                <option value="4">4 Days / Week</option>
                <option value="5">5 Days / Week</option>
              </select>
            </div>

            {/* Min Salary */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  Min. Monthly Salary
                </label>
                <span className="font-bold text-[#1769E0]">৳{minSalary.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="12000"
                step="1000"
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full accent-[#1769E0] cursor-pointer"
              />
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-9 space-y-4">
            {/* Sorting bar */}
            <div className="bg-white rounded-xl border border-slate-200/80 px-4 py-3 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                Sort opportunities:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-[#1769E0]"
              >
                <option value="newest">Recently Posted</option>
                <option value="salary_desc">Highest Salary</option>
                <option value="salary_asc">Lowest Salary</option>
                <option value="applications">Most Applications</option>
              </select>
            </div>

            {/* Tuition Grid */}
            {filteredTuitions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No tuition opportunities match your search</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing some filters or searching for nearby areas or other class grades.
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
                {filteredTuitions.map((tuition) => (
                  <TuitionCard
                    key={tuition.id}
                    tuition={tuition}
                    onViewDetails={(id) => onNavigate('tuition-details', id)}
                    onApply={onApplyTuition}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Filter Tuition</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

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

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 bg-[#1769E0] text-white text-xs font-bold rounded-xl mt-4"
            >
              Apply Filters ({filteredTuitions.length} Found)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
