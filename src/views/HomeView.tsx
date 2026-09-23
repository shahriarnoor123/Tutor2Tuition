import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { TutorCard } from '../components/cards/TutorCard';
import { TuitionCard } from '../components/cards/TuitionCard';
import { SubjectCard } from '../components/cards/SubjectCard';
import { BrandAssets } from '../assets/images';
import { SUBJECT_CATEGORIES, POPULAR_CLASSES, BANGLADESH_LOCATIONS } from '../data/mockData';
import { TutorProfile, TuitionPost } from '../types';
import {
  Search,
  CheckCircle2,
  Shield,
  Send,
  SlidersHorizontal,
  ArrowRight,
  Star,
  Users,
  BookOpen,
  Award,
  Sparkles,
  MapPin,
  GraduationCap,
  CalendarCheck,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: string, param?: string) => void;
  onRequestTutor: (tutor: TutorProfile) => void;
  onApplyTuition: (tuition: TuitionPost) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onRequestTutor,
  onApplyTuition,
}) => {
  const { tutors, tuitions } = useAppStore();

  // Quick Search Tab & Filters
  const [searchTab, setSearchTab] = useState<'tutor' | 'tuition'>('tutor');
  const [searchSubject, setSearchSubject] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchMode, setSearchMode] = useState('');

  const featuredTutors = tutors.slice(0, 4);
  const latestTuitions = tuitions.slice(0, 4);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTab === 'tutor') {
      onNavigate('tutors', JSON.stringify({
        subject: searchSubject,
        studentClass: searchClass,
        location: searchLocation,
        teachingMode: searchMode,
      }));
    } else {
      onNavigate('tuitions', JSON.stringify({
        subject: searchSubject,
        studentClass: searchClass,
        location: searchLocation,
        teachingMode: searchMode,
      }));
    }
  };

  const handleSubjectClick = (subjectName: string) => {
    onNavigate('tutors', JSON.stringify({ subject: subjectName }));
  };

  const handleClassClick = (className: string) => {
    onNavigate('tuitions', JSON.stringify({ studentClass: className }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* =========================================================================
          C. HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/70 bg-gradient-to-b from-blue-50/40 via-white to-[#F8FAFC]">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-blue-200/20 via-sky-100/30 to-amber-100/20 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Region Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1769E0] text-xs font-bold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-[#1769E0] animate-pulse" />
                <span>BANGLADESH'S SMART TUITION PLATFORM</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102A43] tracking-tight leading-[1.12] text-balance">
                Find the <span className="text-[#1769E0] underline decoration-[#FFD43B] decoration-4 underline-offset-4">Right Tutor.</span><br />
                Find the <span className="text-[#102A43] bg-gradient-to-r from-[#1769E0] to-[#102A43] bg-clip-text text-transparent">Right Tuition.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Connect students and parents with qualified university tutors, while helping passionate tutors discover tuition opportunities that perfectly match their subjects, preferred location, and schedule.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('tutors')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Find a Tutor</span>
                </button>

                <button
                  onClick={() => onNavigate('tuitions')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#1769E0] hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Find Tuition</span>
                </button>
              </div>

              {/* Trust Checkmarks */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Tutor Profiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Flexible Tuition Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Easy Application Process</span>
                </div>
              </div>
            </div>

            {/* Right Side: Modern Photography Collage (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background shape */}
                <div className="absolute -top-4 -right-4 w-64 h-64 bg-[#EAF3FF] rounded-3xl -z-10 transform rotate-3" />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#FFD43B]/20 rounded-3xl -z-10 transform -rotate-6" />

                {/* Overlapping grid collage */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-3.5">
                    <div className="overflow-hidden rounded-2xl shadow-soft border-2 border-white">
                      <img
                        src={BrandAssets.heroTutor}
                        alt="Verified Tutor in Bangladesh"
                        className="w-full h-48 sm:h-52 object-cover hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="overflow-hidden rounded-2xl shadow-soft border-2 border-white">
                      <img
                        src={BrandAssets.onlineTeaching}
                        alt="Online Tuition Class"
                        className="w-full h-36 sm:h-40 object-cover hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-6">
                    <div className="overflow-hidden rounded-2xl shadow-soft border-2 border-white">
                      <img
                        src={BrandAssets.heroStudent}
                        alt="High School Student Studying"
                        className="w-full h-36 sm:h-40 object-cover hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="overflow-hidden rounded-2xl shadow-soft border-2 border-white">
                      <img
                        src={BrandAssets.tutorGuidance}
                        alt="One-on-One Tutoring Session"
                        className="w-full h-48 sm:h-52 object-cover hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Social Proof Badges */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">4.9 / 5.0 Rating</p>
                    <p className="text-[11px] text-slate-500">From 10,000+ Bangladeshi parents</p>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#1769E0]" />
                  <span className="text-xs font-bold text-slate-900">BUET, DU & Medical Tutors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          D. QUICK SEARCH SECTION
          ========================================================================= */}
      <section className="relative -mt-6 sm:-mt-8 z-30 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                What are you looking for?
              </h2>
              <p className="text-xs text-slate-500">
                Quickly discover qualified tutors or available tuition posts across Bangladesh.
              </p>
            </div>

            {/* Two interactive tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setSearchTab('tutor')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  searchTab === 'tutor'
                    ? 'bg-[#1769E0] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Find a Tutor
              </button>
              <button
                onClick={() => setSearchTab('tuition')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  searchTab === 'tuition'
                    ? 'bg-[#102A43] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Find a Tuition
              </button>
            </div>
          </div>

          {/* Quick Search Form */}
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Subject */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={searchSubject}
                onChange={(e) => setSearchSubject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
              >
                <option value="">All Subjects</option>
                {SUBJECT_CATEGORIES.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class / Grade */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Class / Grade
              </label>
              <select
                value={searchClass}
                onChange={(e) => setSearchClass(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
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
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Location Area
              </label>
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
              >
                <option value="">All Locations</option>
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

            {/* Teaching Mode */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Teaching Mode
              </label>
              <select
                value={searchMode}
                onChange={(e) => setSearchMode(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
              >
                <option value="">Any Mode</option>
                <option value="offline">In-Person (Home Tutor)</option>
                <option value="online">Online Tutoring</option>
                <option value="both">Both Available</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  searchTab === 'tutor'
                    ? 'bg-[#FFD43B] text-[#102A43] hover:bg-[#f6cb2c]'
                    : 'bg-[#1769E0] text-white hover:bg-blue-700'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>{searchTab === 'tutor' ? 'Search Tutors' : 'Find Tuition'}</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================================
          E. FULL-WIDTH BLUE STATISTICS SECTION
          ========================================================================= */}
      <section className="bg-[#1769E0] text-white py-14 mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-400/40">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFD43B] tracking-tight tabular-nums">
                1,500+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-blue-100 uppercase tracking-wider mt-1">
                Registered Tutors
              </p>
            </div>

            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight tabular-nums">
                3,000+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-blue-100 uppercase tracking-wider mt-1">
                Tuition Opportunities
              </p>
            </div>

            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFD43B] tracking-tight tabular-nums">
                50+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-blue-100 uppercase tracking-wider mt-1">
                Academic Subjects
              </p>
            </div>

            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight tabular-nums">
                10,000+
              </p>
              <p className="text-xs sm:text-sm font-semibold text-blue-100 uppercase tracking-wider mt-1">
                Students & Parents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          F. WHY CHOOSE US (4 Feature Cards)
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
            Why Choose Tutor2Tuition?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Everything you need to make finding tuition simple, transparent, and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Verified Tutor Profiles</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discover tutor profiles verified by academic transcripts, university credentials, teaching experience, and real guardian reviews.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Easy Tuition Search</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instantly find tuition opportunities filtered by subject, student class, salary budget, area, and teaching mode.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Simple Application Process</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tutors can apply directly for matching tuition requirements with custom fee expectations and timetable availability in seconds.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Safe & Organized</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No middleman commission scams. Manage tuition posts, candidate shortlists, and direct communication in one structured portal.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          G. HOW IT WORKS (Two Paths: Student/Parent & Tutor)
          ========================================================================= */}
      <section className="py-16 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
              How Tutor2Tuition Works
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              A transparent, two-sided workflow designed for students, parents, and tutors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Path 1: For Student / Parent */}
            <div className="bg-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-blue-200/60">
                <div>
                  <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider">
                    For Guardians
                  </span>
                  <h3 className="text-xl font-black text-[#102A43]">Student & Parent Workflow</h3>
                </div>
                <button
                  onClick={() => onNavigate('post-tuition')}
                  className="px-3.5 py-1.5 text-xs font-bold bg-[#FFD43B] text-[#102A43] rounded-lg shadow-xs"
                >
                  Post Tuition Free
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#1769E0] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Post Your Tuition</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Submit class, subject requirements, area, days per week, and monthly budget.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white border border-blue-200 text-[#1769E0] flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Find Suitable Tutors</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Browse verified profiles from BUET, DU, Medical, and other top institutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white border border-blue-200 text-[#1769E0] flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Review Tutor Profiles</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Check academic credentials, GPA, past parent reviews, and cover notes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    04
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Choose Your Tutor</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Shortlist candidates, arrange demo classes, and confirm your preferred tutor.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Path 2: For Tutor */}
            <div className="bg-amber-50/40 rounded-3xl p-6 sm:p-8 border border-amber-200/70">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-200/60">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    For Educators
                  </span>
                  <h3 className="text-xl font-black text-[#102A43]">Tutor Career Workflow</h3>
                </div>
                <button
                  onClick={() => onNavigate('tutor-profile-edit')}
                  className="px-3.5 py-1.5 text-xs font-bold bg-[#1769E0] text-white rounded-lg shadow-xs"
                >
                  Create Profile
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#102A43] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Create Your Profile</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Add university, department, target subjects, teaching experience, and fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white border border-amber-200 text-[#102A43] flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Find Tuition</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Filter new tuition opportunities near your residence or university campus.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white border border-amber-200 text-[#102A43] flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Apply for Tuition</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Submit expected fees, teaching timeline, and tailored cover message.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#FFD43B] text-[#102A43] flex items-center justify-center font-bold text-sm shrink-0">
                    04
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Get Connected</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Get accepted by the guardian and start your tutoring sessions right away.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          H. PERSONALIZED TUITION SECTION (Image/Text Split 1)
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-soft border-4 border-white">
              <img
                src={BrandAssets.heroStudent}
                alt="Student studying with dedication"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="bg-[#FFD43B] text-[#102A43] text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Personalized Guidance
                  </span>
                  <p className="text-sm font-bold mt-1">94% of our students improved their GPA in 3 months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider">
              Targeted Academic Success
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
              Find a Tutor That Fits Your Needs
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every student learns differently. Search by subject, class, location, budget, experience, and teaching mode to find tutors who match your student’s exact learning requirements.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1769E0]" />
                <span>One-on-one attention tailored to student pacing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1769E0]" />
                <span>Specialized board question solving (SSC, HSC, O/A Level)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1769E0]" />
                <span>Flexible timings around school and prayer schedules</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('tutors')}
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#1769E0] hover:bg-blue-700 shadow-sm transition-all"
              >
                Explore Tutors
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          I. FIND TUITION SECTION (Reverse Layout)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-blue-50/40 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
              <span className="text-xs font-bold text-[#FFD43B] bg-[#102A43] px-2.5 py-1 rounded text-white uppercase tracking-wider inline-block">
                For University Tutors
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
                Find Tuition That Matches You
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Explore tuition opportunities based on your preferred subjects, classes, location, and teaching preferences. Apply directly without paying exorbitant registration fees to informal media agents.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified guardian phone numbers and addresses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Choose between in-person home visits or remote online classes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Direct salary negotiations without commission cut</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('tuitions')}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] shadow-sm transition-all"
                >
                  Browse Tuition Opportunities
                </button>
              </div>
            </div>

            {/* Right: Image */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-soft border-4 border-white">
                <img
                  src={BrandAssets.onlineTeaching}
                  alt="Tutor conducting interactive session"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs font-semibold text-[#FFD43B]">Direct Application</span>
                    <p className="text-sm font-bold mt-1">Average tutor monthly earnings: ৳18,000–৳35,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          J. SUBJECT CATEGORIES
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
              Find Tutors by Subject
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select any academic discipline to see all registered tutors and open requirements.
            </p>
          </div>
          <button
            onClick={() => onNavigate('tutors')}
            className="text-xs font-bold text-[#1769E0] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Subjects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SUBJECT_CATEGORIES.map((cat) => (
            <SubjectCard
              key={cat.name}
              name={cat.name}
              icon={cat.icon}
              tutorCount={cat.tutorCount}
              tuitionCount={cat.tuitionCount}
              onClick={() => handleSubjectClick(cat.name)}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          K. POPULAR TUITION CATEGORIES (Classes / Segments)
          ========================================================================= */}
      <section className="py-14 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
              Popular Tuition Categories
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              From foundation primary schooling to competitive university admission tests.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {POPULAR_CLASSES.map((cls) => (
              <div
                key={cls.name}
                onClick={() => handleClassClick(cls.name)}
                className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#1769E0] hover:bg-blue-50/40 transition-all cursor-pointer group text-left"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1769E0] bg-blue-100/60 px-2 py-0.5 rounded-sm">
                  {cls.badge}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1769E0] transition-colors mt-2">
                  {cls.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{cls.desc}</p>
                <p className="text-[11px] font-bold text-slate-700 mt-2">{cls.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          L. FEATURED TUTORS
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769E0] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Top Rated Tutors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
              Featured Tutors
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Experienced and verified educators ready for both in-person and online tutoring.
            </p>
          </div>
          <button
            onClick={() => onNavigate('tutors')}
            className="text-xs font-bold text-[#1769E0] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>See All Tutors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onViewProfile={(id) => onNavigate('tutor-profile', id)}
              onRequestTutor={onRequestTutor}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          M. LATEST TUITION POSTS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                New Opportunities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
                Latest Tuition Opportunities
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Recently published tuition requirements from parents in Dhaka, Chittagong and other districts.
              </p>
            </div>
            <button
              onClick={() => onNavigate('tuitions')}
              className="text-xs font-bold text-[#1769E0] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View All Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestTuitions.map((tuition) => (
              <TuitionCard
                key={tuition.id}
                tuition={tuition}
                onViewDetails={(id) => onNavigate('tuition-details', id)}
                onApply={onApplyTuition}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          N. TESTIMONIALS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
              What Our Students & Tutors Say
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Read real stories from guardians, candidates, and verified university educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  "Finding a reliable BUET tutor for my son in Dhanmondi was always stressful through unorganized social media. With Tutor2Tuition, we verified the credentials in minutes, interviewed Tanvir Sir, and my son achieved Golden A+ in both Physics and Math!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                  alt="Begum Laila"
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Begum Laila Arjumand</p>
                  <p className="text-slate-500">Parent of Notre Dame College Student · Dhanmondi</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  "Tutor2Tuition completely eliminates middleman brokerage fees that informal tuition media charge. The tuition notifications match my exact travel route along Mirpur and Dhanmondi. I have built a steady monthly tutoring income with verified parents."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Engr. Tanvir"
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Engr. Tanvir Ahmed</p>
                  <p className="text-slate-500">BUET Mechanical Engineering Graduate · Mirpur</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  "I was struggling with Economics and Statistics questions 4 months before my A-Levels. I posted my requirement on Tutor2Tuition and received 3 applications from top IBA graduates within 24 hours. The organized lesson plans saved my grades."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Fariha"
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Fariha Tasnim</p>
                  <p className="text-slate-500">Mastermind English Medium Student · Uttara</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          O. LARGE BLUE CTA SECTION
          ========================================================================= */}
      <section className="bg-gradient-to-r from-[#1769E0] to-[#102A43] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FFD43B] bg-white/10 px-3 py-1 rounded-full">
            Start Your Journey Today
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Whether you're looking for a qualified tutor for your child or searching for your next high-paying tuition, Tutor2Tuition connects you faster.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('tutors')}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] shadow-lg transition-all active:scale-95"
            >
              Find a Tutor
            </button>
            <button
              onClick={() => onNavigate('tuitions')}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl transition-all active:scale-95"
            >
              Find Tuition
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
