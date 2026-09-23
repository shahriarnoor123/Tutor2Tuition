import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import {
  PlusCircle,
  Users,
  CheckCircle2,
  Clock,
  MessageSquare,
  ShieldCheck,
  Award,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  UserCheck,
} from 'lucide-react';

interface StudentDashboardViewProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ onNavigate }) => {
  const {
    currentUser,
    tuitions,
    applications,
    updateApplicationStatus,
    directRequests,
    startOrGetConversation,
    tutors,
  } = useAppStore();

  const [selectedTuitionId, setSelectedTuitionId] = useState<string>('all');

  // Filter tuition posts posted by user or all active if demo parent
  const myTuitions = tuitions.filter((t) => t.parentId === currentUser?.id || t.userId === currentUser?.id || currentUser?.role === 'student_parent');

  // Applications received on these posts
  const receivedApplications = applications.filter((app) => {
    if (selectedTuitionId !== 'all') return app.tuitionId === selectedTuitionId;
    return myTuitions.some((t) => t.id === app.tuitionId);
  });

  // Direct requests sent
  const myDirectRequests = directRequests.filter((r) => r.studentId === currentUser?.id || r.userId === currentUser?.id || currentUser?.role === 'student_parent');

  const shortlistedCount = receivedApplications.filter((a) => a.status === 'shortlisted').length;
  const acceptedCount = receivedApplications.filter((a) => a.status === 'accepted').length;

  const handleMessageTutor = (tutorId: string, tutorName: string, avatar: string) => {
    const tutorObj = tutors.find((t) => t.id === tutorId);
    startOrGetConversation(tutorObj?.userId || 'usr-tutor-1', tutorName, avatar, 'tutor');
    onNavigate('messages');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'}
              alt={currentUser?.name || 'Parent'}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-50"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-2xl font-extrabold text-[#102A43]">
                {currentUser?.name || 'Dr. Shahana Yasmin'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Guardian / Student Portal · Dhanmondi, Dhaka
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('tutors')}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Search Tutors
            </button>
            <button
              onClick={() => onNavigate('post-tuition')}
              className="py-2.5 px-5 rounded-xl text-xs font-bold text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] shadow-sm transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Tuition</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Posts</span>
              <Clock className="w-4 h-4 text-[#1769E0]" />
            </div>
            <p className="text-3xl font-black text-slate-900 mt-2">{myTuitions.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Live tuition requirements</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Applications</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-3xl font-black text-[#1769E0] mt-2">{receivedApplications.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Tutors seeking to teach</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Shortlisted</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-3xl font-black text-amber-600 mt-2">{shortlistedCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Selected for demo trial</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Hired Tutors</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-3xl font-black text-emerald-600 mt-2">{acceptedCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Currently tutoring</p>
          </div>
        </div>

        {/* Section 1: My Tuition Posts List */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#102A43]">
              My Published Tuition Requirements ({myTuitions.length})
            </h3>
            <button
              onClick={() => onNavigate('post-tuition')}
              className="text-xs text-[#1769E0] font-bold hover:underline"
            >
              + Post another requirement
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myTuitions.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 transition-all space-y-2 bg-slate-50/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1769E0]">{post.code}</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded uppercase">
                    {post.status}
                  </span>
                </div>
                <h4
                  onClick={() => onNavigate('tuition-details', post.id)}
                  className="text-sm font-bold text-slate-900 hover:text-[#1769E0] cursor-pointer line-clamp-1"
                >
                  {post.title}
                </h4>
                <div className="text-xs text-slate-500 space-y-0.5">
                  <p><strong>Subjects:</strong> {post.subjects.join(', ')}</p>
                  <p><strong>Location:</strong> {post.area}, {post.district} · {post.daysPerWeek} Days/Wk</p>
                  <p><strong>Offered Salary:</strong> <span className="font-bold text-slate-800">৳{post.salary.toLocaleString()}/mo</span></p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 text-xs">
                  <span className="text-[#1769E0] font-semibold">{post.applicationsCount} applicants</span>
                  <button
                    onClick={() => {
                      setSelectedTuitionId(post.id);
                      const el = document.getElementById('applicant-panel');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#1769E0] hover:underline"
                  >
                    Review Applicants &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Applicants Review Panel */}
        <div id="applicant-panel" className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1769E0]" />
                <span>Tutors Who Applied For Your Tuitions ({receivedApplications.length})</span>
              </h3>
              <p className="text-xs text-slate-500">
                Review qualifications, shortlist for a demo lesson, or confirm selection.
              </p>
            </div>

            {/* Filter by post dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Filter post:</span>
              <select
                value={selectedTuitionId}
                onChange={(e) => setSelectedTuitionId(e.target.value)}
                className="text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 font-semibold text-slate-800 focus:ring-1 focus:ring-[#1769E0]"
              >
                <option value="all">All Tuition Posts</option>
                {myTuitions.map((t) => (
                  <option key={t.id} value={t.id}>{t.code} - {t.studentClass}</option>
                ))}
              </select>
            </div>
          </div>

          {receivedApplications.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No applications received for this selection yet. Newly submitted applications will appear here.
            </div>
          ) : (
            <div className="space-y-4">
              {receivedApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-[#1769E0]/40 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={app.tutorAvatar}
                        alt={app.tutorName}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-50"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4
                            onClick={() => onNavigate('tutor-profile', app.tutorId)}
                            className="text-sm font-bold text-slate-900 hover:text-[#1769E0] cursor-pointer"
                          >
                            {app.tutorName}
                          </h4>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            app.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                            app.status === 'shortlisted' ? 'bg-amber-100 text-amber-800' :
                            app.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                            'bg-blue-100 text-[#1769E0]'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">
                          {app.tutorUniversity} · For: <span className="font-mono text-[#1769E0]">{app.tuitionCode}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Expected Salary</span>
                      <span className="text-base font-black text-[#1769E0]">
                        ৳{app.expectedSalary.toLocaleString()}
                        <span className="text-xs font-normal text-slate-500">/mo</span>
                      </span>
                    </div>
                  </div>

                  {/* Availability & Cover note */}
                  <div className="bg-slate-50 p-3.5 rounded-xl text-xs space-y-1.5 border border-slate-100">
                    <p className="text-slate-600">
                      <strong>Availability:</strong> {app.availability}
                    </p>
                    <p className="text-slate-700 italic leading-relaxed">
                      "{app.coverLetter}"
                    </p>
                  </div>

                  {/* Actions for Parent */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMessageTutor(app.tutorId, app.tutorName, app.tutorAvatar)}
                        className="py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#1769E0]" />
                        <span>Message Tutor</span>
                      </button>
                      <button
                        onClick={() => onNavigate('tutor-profile', app.tutorId)}
                        className="py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        Full Profile
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {app.status !== 'shortlisted' && app.status !== 'accepted' && (
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                          className="py-1.5 px-3 rounded-lg text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
                        >
                          Shortlist for Trial
                        </button>
                      )}

                      {app.status !== 'accepted' && (
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'accepted')}
                          className="py-1.5 px-4 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-2xs transition-colors"
                        >
                          Accept as Tutor
                        </button>
                      )}

                      {app.status !== 'rejected' && (
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'rejected')}
                          className="py-1.5 px-2.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          Decline
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Direct Requests Sent */}
        {myDirectRequests.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
            <h3 className="text-base font-bold text-[#102A43] flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#1769E0]" />
              <span>Direct Tutor Requests Sent ({myDirectRequests.length})</span>
            </h3>

            <div className="divide-y divide-slate-100">
              {myDirectRequests.map((req) => (
                <div key={req.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{req.tutorName}</p>
                    <p className="text-slate-500">Subject: {req.subject} · Class: {req.studentClass}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    req.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                    req.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
