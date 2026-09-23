import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Send,
  CheckCircle,
  XCircle,
  AlertTriangle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardViewProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigate }) => {
  const { tutors, tuitions, applications, verifyTutor } = useAppStore();

  const [activeAdminTab, setActiveAdminTab] = useState<'verifications' | 'tuitions' | 'tutors'>('verifications');

  const verifiedCount = tutors.filter((t) => t.isVerified).length;
  const pendingCount = tutors.filter((t) => !t.isVerified).length;
  const activeTuitionsCount = tuitions.filter((t) => t.status === 'active').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="bg-[#102A43] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-[#FFD43B] text-[#102A43] text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Platform Moderator Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Tutor2Tuition System Administration
            </h1>
            <p className="text-xs text-slate-300">
              Oversee tutor verifications, tuition postings, and platform integrity across Bangladesh.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-white/10 text-white px-3 py-1.5 rounded-xl border border-white/20">
              Live Database Active
            </span>
          </div>
        </div>

        {/* 4 Admin Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Tutors</span>
            <p className="text-3xl font-black text-slate-900 mt-2">{tutors.length}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">{verifiedCount} verified badges</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pending Verification</span>
            <p className="text-3xl font-black text-amber-600 mt-2">{pendingCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Awaiting transcript review</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Tuition Posts</span>
            <p className="text-3xl font-black text-[#1769E0] mt-2">{tuitions.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">{activeTuitionsCount} active listings</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Applications Processed</span>
            <p className="text-3xl font-black text-purple-600 mt-2">{applications.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Platform connection requests</p>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveAdminTab('verifications')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeAdminTab === 'verifications'
                ? 'border-[#1769E0] text-[#1769E0]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Tutor Verification Queue ({pendingCount} Pending)
          </button>
          <button
            onClick={() => setActiveAdminTab('tutors')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeAdminTab === 'tutors'
                ? 'border-[#1769E0] text-[#1769E0]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            All Tutors ({tutors.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('tuitions')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeAdminTab === 'tuitions'
                ? 'border-[#1769E0] text-[#1769E0]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Tuition Postings ({tuitions.length})
          </button>
        </div>

        {/* Tab 1: Tutor Verification Queue */}
        {activeAdminTab === 'verifications' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#102A43]">
                  Tutor Credential Verification
                </h3>
                <p className="text-xs text-slate-500">
                  Verify university student ID, degree certificates, and National ID (NID).
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Tutor Profile</th>
                    <th className="pb-3">University & Dept</th>
                    <th className="pb-3">Subjects</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Moderator Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {tutors.map((tutor) => (
                    <tr key={tutor.id} className="hover:bg-slate-50/60">
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={tutor.avatar}
                            alt={tutor.name}
                            className="w-10 h-10 rounded-xl object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p
                              onClick={() => onNavigate('tutor-profile', tutor.id)}
                              className="font-bold text-slate-900 hover:text-[#1769E0] cursor-pointer"
                            >
                              {tutor.name}
                            </p>
                            <p className="text-[11px] text-slate-500">{tutor.district}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-3">
                        <p className="font-semibold text-slate-800">{tutor.university}</p>
                        <p className="text-[11px] text-slate-500">{tutor.department}</p>
                      </td>
                      <td className="py-3.5 pr-3 text-slate-700">
                        {tutor.subjects.slice(0, 2).join(', ')}
                      </td>
                      <td className="py-3.5 pr-3">
                        {tutor.isVerified ? (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Pending Review
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        {tutor.isVerified ? (
                          <button
                            onClick={() => verifyTutor(tutor.id, false)}
                            className="px-3 py-1.5 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                          >
                            Revoke Badge
                          </button>
                        ) : (
                          <button
                            onClick={() => verifyTutor(tutor.id, true)}
                            className="px-3 py-1.5 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors"
                          >
                            Approve Verification
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: All Tutors */}
        {activeAdminTab === 'tutors' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
            <h3 className="text-base font-bold text-[#102A43]">
              Directory of All Registered University Tutors ({tutors.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tutors.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="text-[11px] text-slate-500">{t.university}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>Rating:</strong> {t.rating.toFixed(1)}/5.0 ({t.reviewCount} reviews) · {t.experienceYears} yrs exp
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong>Expected:</strong> ৳{t.minFee}–৳{t.maxFee}/mo
                  </p>
                  <button
                    onClick={() => onNavigate('tutor-profile', t.id)}
                    className="w-full mt-2 py-1.5 text-xs font-semibold text-[#1769E0] bg-white border border-slate-200 rounded-lg hover:bg-blue-50"
                  >
                    Inspect Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Tuition Postings Moderation */}
        {activeAdminTab === 'tuitions' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
            <h3 className="text-base font-bold text-[#102A43]">
              Manage Tuition Postings ({tuitions.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Code</th>
                    <th className="pb-3">Title & Class</th>
                    <th className="pb-3">Area</th>
                    <th className="pb-3">Budget</th>
                    <th className="pb-3">Applicants</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {tuitions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/60">
                      <td className="py-3.5 pr-3 font-mono font-bold text-[#1769E0]">{t.code}</td>
                      <td className="py-3.5 pr-3">
                        <p className="font-bold text-slate-900">{t.title}</p>
                        <p className="text-[11px] text-slate-500">{t.studentClass} ({t.medium})</p>
                      </td>
                      <td className="py-3.5 pr-3 text-slate-700">{t.area}, {t.district}</td>
                      <td className="py-3.5 pr-3 font-bold text-slate-900">৳{t.salary.toLocaleString()}</td>
                      <td className="py-3.5 pr-3 text-[#1769E0] font-bold">{t.applicationsCount}</td>
                      <td className="py-3.5 pr-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => onNavigate('tuition-details', t.id)}
                          className="text-xs font-semibold text-[#1769E0] hover:underline"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
