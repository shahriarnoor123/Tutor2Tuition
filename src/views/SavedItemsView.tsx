import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { TutorCard } from '../components/cards/TutorCard';
import { TuitionCard } from '../components/cards/TuitionCard';
import { TutorProfile, TuitionPost } from '../types';
import { Heart, Bookmark, ArrowLeft } from 'lucide-react';

interface SavedItemsViewProps {
  onNavigate: (tab: string, param?: string) => void;
  onRequestTutor: (tutor: TutorProfile) => void;
  onApplyTuition: (tuition: TuitionPost) => void;
}

export const SavedItemsView: React.FC<SavedItemsViewProps> = ({
  onNavigate,
  onRequestTutor,
  onApplyTuition,
}) => {
  const { tutors, tuitions, savedTutorIds, savedTuitionIds } = useAppStore();

  const [activeTab, setActiveTab] = useState<'tutors' | 'tuitions'>('tutors');

  const savedTutors = tutors.filter((t) => savedTutorIds.includes(t.id));
  const savedTuitions = tuitions.filter((t) => savedTuitionIds.includes(t.id));

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1769E0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#102A43]">
              Saved Tutors & Tuitions
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Quickly revisit profiles and opportunities you have shortlisted.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
            <button
              onClick={() => setActiveTab('tutors')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'tutors'
                  ? 'bg-[#1769E0] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Saved Tutors ({savedTutors.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('tuitions')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'tuitions'
                  ? 'bg-[#1769E0] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmarked Tuitions ({savedTuitions.length})</span>
            </button>
          </div>
        </div>

        {activeTab === 'tutors' ? (
          savedTutors.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No saved tutors yet</h3>
              <p className="text-xs text-slate-500">
                Click the heart icon on any tutor card to save them to this list.
              </p>
              <button
                onClick={() => onNavigate('tutors')}
                className="px-4 py-2 bg-[#1769E0] text-white text-xs font-bold rounded-xl"
              >
                Browse Tutors
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTutors.map((tutor) => (
                <TutorCard
                  key={tutor.id}
                  tutor={tutor}
                  onViewProfile={(id) => onNavigate('tutor-profile', id)}
                  onRequestTutor={onRequestTutor}
                />
              ))}
            </div>
          )
        ) : savedTuitions.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
            <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No bookmarked tuition posts</h3>
            <p className="text-xs text-slate-500">
              Click the bookmark icon on any tuition card to follow its status here.
            </p>
            <button
              onClick={() => onNavigate('tuitions')}
              className="px-4 py-2 bg-[#1769E0] text-white text-xs font-bold rounded-xl"
            >
              Browse Tuitions
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTuitions.map((tuition) => (
              <TuitionCard
                key={tuition.id}
                tuition={tuition}
                onViewDetails={(id) => onNavigate('tuition-details', id)}
                onApply={onApplyTuition}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
