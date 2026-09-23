import React from 'react';
import {
  ShieldCheck,
  Search,
  Send,
  UserCheck,
  CheckCircle,
  HelpCircle,
  Award,
  BookOpen,
} from 'lucide-react';

interface HowItWorksViewProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Transparent Tuition Process
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#102A43]">
            How Tutor2Tuition Works
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            A secure, commission-free marketplace connecting students and parents with qualified university tutors across Bangladesh.
          </p>
        </div>

        {/* Path 1: For Parents / Students */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider">Guide for Guardians</span>
              <h2 className="text-2xl font-bold text-[#102A43]">Hiring a Tutor in 4 Easy Steps</h2>
            </div>
            <button
              onClick={() => onNavigate('post-tuition')}
              className="py-2.5 px-5 bg-[#FFD43B] text-[#102A43] font-bold text-xs rounded-xl shadow-xs"
            >
              Post Tuition Free
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1769E0] font-black text-lg flex items-center justify-center">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900">Post Requirements</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specify your student's class, subjects, location area in Dhaka/BD, and offered monthly budget.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1769E0] font-black text-lg flex items-center justify-center">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900">Receive Proposals</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interested tutors from BUET, DU, and Medical apply with customized fee and schedule proposals.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1769E0] font-black text-lg flex items-center justify-center">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900">Take a Free Demo</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Shortlist your preferred candidates and arrange a trial lesson to test teaching chemistry.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 font-black text-lg flex items-center justify-center">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900">Confirm & Begin</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Finalize your monthly schedule with the selected educator. No mediator fees, ever.
              </p>
            </div>
          </div>
        </div>

        {/* Path 2: For Tutors */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Guide for Educators</span>
              <h2 className="text-2xl font-bold text-[#102A43]">Finding Tuition Opportunities</h2>
            </div>
            <button
              onClick={() => onNavigate('tuitions')}
              className="py-2.5 px-5 bg-[#1769E0] text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Browse Tuitions
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 font-black text-lg flex items-center justify-center">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900">Build Your Profile</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add university details, past exam results, preferred tuition areas, and expected fee rates.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 font-black text-lg flex items-center justify-center">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900">Get Verified</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit student ID card for our free Blue Verification badge to build instant guardian trust.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 font-black text-lg flex items-center justify-center">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900">Apply Directly</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter tuitions near your home and apply with custom timetable and introductory notes.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 font-black text-lg flex items-center justify-center">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900">Get Paid in Full</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive 100% of your agreed tuition honorarium directly from guardians each month.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#102A43] text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
              <h3 className="text-sm font-bold text-slate-900">Is Tutor2Tuition free for parents?</h3>
              <p className="text-xs text-slate-600 mt-1">
                Yes! Posting a tuition requirement and receiving applications from verified tutors is 100% free of charge for students and guardians.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
              <h3 className="text-sm font-bold text-slate-900">Do tutors have to pay 50% commission like media agencies?</h3>
              <p className="text-xs text-slate-600 mt-1">
                No. Tutor2Tuition does not take commission cuts from your hard-earned tuition honorarium.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
              <h3 className="text-sm font-bold text-slate-900">How do you verify tutor credentials?</h3>
              <p className="text-xs text-slate-600 mt-1">
                Tutors submit their official University Student ID, SSC/HSC academic transcripts, and National ID (NID). Our moderation team inspects each document before granting the Verified badge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
