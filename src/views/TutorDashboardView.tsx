import React from 'react';
import { useAppStore } from '../services/store';
import {
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Award,
  Layers,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  UserCheck,
  Calendar,
} from 'lucide-react';

interface TutorDashboardViewProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const TutorDashboardView: React.FC<TutorDashboardViewProps> = ({ onNavigate }) => {
  const {
    currentUser,
    applications,
    tuitions,
    tutors,
    directRequests,
    respondToDirectRequest,
  } = useAppStore();

  const currentTutor = tutors.find((t) => t.userId === currentUser?.id) || tutors[0];

  // My applications
  const myApplications = applications.filter((a) => a.tutorId === currentTutor.id);

  // My direct requests
  const myDirectRequests = directRequests.filter((r) => r.tutorId === currentTutor.id);

  const pendingApps = myApplications.filter((a) => a.status === 'pending');
  const shortlistedApps = myApplications.filter((a) => a.status === 'shortlisted');
  const acceptedApps = myApplications.filter((a) => a.status === 'accepted');

  const recommendedTuitions = tuitions
    .filter((t) => t.subjects.some((s) => currentTutor.subjects.includes(s)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentTutor.avatar}
              alt={currentTutor.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-50"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#102A43]">
                  {currentTutor.name}
                </h1>
                {currentTutor.isVerified && (
                  <span className="text-[11px] font-bold text-[#1769E0] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    Verified Tutor
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentTutor.university} ({currentTutor.department}) · {currentTutor.experienceYears} Years Experience
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('tutor-profile-edit')}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Edit Tutor Profile
            </button>
            <button
              onClick={() => onNavigate('tuitions')}
              className="py-2.5 px-5 rounded-xl text-xs font-bold text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] shadow-sm transition-all"
            >
              Find More Tuition
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Applied</span>
              <Send className="w-4 h-4 text-[#1769E0]" />
            </div>
            <p className="text-3xl font-black text-slate-900 mt-2">{myApplications.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Applications sent</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Shortlisted</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-3xl font-black text-amber-600 mt-2">{shortlistedApps.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Awaiting guardian interview</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Confirmed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-3xl font-black text-emerald-600 mt-2">{acceptedApps.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Active tuitions secured</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Direct Requests</span>
              <UserCheck className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-3xl font-black text-purple-600 mt-2">{myDirectRequests.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Parents contacted you directly</p>
          </div>
        </div>

        {/* Profile Completion / Verification Status Widget */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider">
                Profile Strength: 85% Completed
              </span>
              <span className="text-xs text-slate-500">· Very Good</span>
            </div>
            <p className="text-xs text-slate-600 max-w-xl">
              Add your university transcript or recent student testimonial to boost your shortlist chances by up to 3x!
            </p>
          </div>
          <button
            onClick={() => onNavigate('tutor-profile-edit')}
            className="px-4 py-2 text-xs font-bold text-[#1769E0] bg-white hover:bg-blue-50 border border-blue-200 rounded-xl shadow-2xs shrink-0"
          >
            Enhance Credentials
          </button>
        </div>

        {/* Direct Inquiries from Guardians */}
        {myDirectRequests.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
            <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#1769E0]" />
              <span>Direct Parent Requests ({myDirectRequests.length})</span>
            </h3>

            <div className="divide-y divide-slate-100">
              {myDirectRequests.map((req) => (
                <div key={req.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{req.parentName}</span>
                      <span className="text-xs text-slate-500 font-medium">({req.phone})</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        req.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                        req.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700">
                      <strong>Subject:</strong> {req.subject} · <strong>Class:</strong> {req.studentClass}
                    </p>
                    <p className="text-xs text-slate-500 italic">"{req.message}"</p>
                  </div>

                  {req.status === 'pending' && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => respondToDirectRequest(req.id, 'accepted')}
                        className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-2xs"
                      >
                        Accept Request
                      </button>
                      <button
                        onClick={() => respondToDirectRequest(req.id, 'rejected')}
                        className="px-3.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Tuition Applications Tracker */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
              <Send className="w-4 h-4 text-[#1769E0]" />
              <span>Applications Tracker ({myApplications.length})</span>
            </h3>
            <button
              onClick={() => onNavigate('tuitions')}
              className="text-xs text-[#1769E0] font-bold hover:underline"
            >
              Browse more tuitions
            </button>
          </div>

          {myApplications.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 space-y-2">
              <p>You haven't submitted any tuition applications yet.</p>
              <button
                onClick={() => onNavigate('tuitions')}
                className="px-4 py-2 bg-[#1769E0] text-white font-bold rounded-xl text-xs"
              >
                Browse Available Tuitions
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Tuition Post</th>
                    <th className="pb-3">Expected Fee</th>
                    <th className="pb-3">Availability</th>
                    <th className="pb-3">Applied Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {myApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/60">
                      <td className="py-3.5 pr-3">
                        <p className="font-bold text-slate-900">{app.tuitionTitle}</p>
                        <p className="text-[11px] text-[#1769E0] font-mono">{app.tuitionCode}</p>
                      </td>
                      <td className="py-3.5 pr-3 font-bold text-slate-800">
                        ৳{app.expectedSalary.toLocaleString()}
                      </td>
                      <td className="py-3.5 pr-3 text-slate-600 max-w-[180px] truncate">
                        {app.availability}
                      </td>
                      <td className="py-3.5 pr-3 text-slate-400">
                        {new Date(app.createdAt || app.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 pr-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          app.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'shortlisted' ? 'bg-amber-100 text-amber-800' :
                          app.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                          'bg-blue-50 text-blue-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => onNavigate('tuition-details', app.tuitionId)}
                          className="text-xs font-semibold text-[#1769E0] hover:underline"
                        >
                          View Post
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recommended Tuitions for Tutor */}
        {recommendedTuitions.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
            <h3 className="text-base font-bold text-[#102A43]">
              Recommended Tuitions Matching Your Subjects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedTuitions.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onNavigate('tuition-details', rec.id)}
                  className="p-4 rounded-2xl border border-slate-200/80 hover:border-[#1769E0] hover:bg-blue-50/20 cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#1769E0] font-bold">{rec.code}</span>
                    <span className="font-black text-[#102A43]">৳{rec.salary.toLocaleString()}/mo</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{rec.title}</h4>
                  <p className="text-[11px] text-slate-500">{rec.studentClass} · {rec.area}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
