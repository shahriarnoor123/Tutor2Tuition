import React from 'react';
import { BrandAssets } from '../assets/images';
import { ShieldCheck, Heart, Award, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            About Tutor2Tuition
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#102A43] tracking-tight">
            Empowering Education Across Bangladesh
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We are on a mission to modernize tuition matching in Bangladesh — eliminating dishonest middlemen, bringing verified transparency, and helping university students support their academic journeys.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#102A43]">
              Why We Built Tutor2Tuition
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In Bangladesh, thousands of parents struggle every month to find qualified, trustworthy tutors for their children in SSC, HSC, and English Medium curricula. Meanwhile, hardworking university students often fall victim to informal "tuition media" brokers who demand 50% to 100% upfront registration fees for phantom leads.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tutor2Tuition replaces this broken system with a high-trust digital platform: verified university transcripts, transparent fee expectations, and direct communication between guardian and educator.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onNavigate('tutors')}
                className="px-5 py-2.5 bg-[#1769E0] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Explore Tutors
              </button>
              <button
                onClick={() => onNavigate('tuitions')}
                className="px-5 py-2.5 bg-[#FFD43B] text-[#102A43] text-xs font-bold rounded-xl shadow-xs"
              >
                Browse Tuitions
              </button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-soft border-4 border-white">
            <img
              src={BrandAssets.heroTutor}
              alt="University student tutoring"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 3 Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft">
            <ShieldCheck className="w-8 h-8 text-[#1769E0] mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-2">100% Verified Credentials</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every verified tutor has submitted their student ID card, degree certificates, and background verification.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft">
            <Award className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-2">Commission-Free Transparency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We empower university tutors to keep 100% of their earned tuition fees without broker deductions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft">
            <Heart className="w-8 h-8 text-rose-500 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-2">Student-Centric Chemistry</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Free trial classes enable students and tutors to determine mutual learning alignment before committing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
