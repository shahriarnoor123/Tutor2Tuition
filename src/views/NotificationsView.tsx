import React from 'react';
import { useAppStore } from '../services/store';
import { Bell, CheckCheck, ArrowLeft, Clock, ExternalLink } from 'lucide-react';

interface NotificationsViewProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ onNavigate }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1769E0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h1 className="text-2xl font-extrabold text-[#102A43] flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#1769E0]" />
                <span>Notifications</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Updates on your tuition posts, tutor applications, and messages.
              </p>
            </div>

            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-[#1769E0] hover:underline font-bold flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No notifications right now.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    markNotificationRead(n.id);
                    if (n.link) onNavigate(n.link.replace('/', ''));
                  }}
                  className={`py-4 px-3 rounded-xl cursor-pointer transition-colors flex items-start justify-between gap-4 ${
                    !n.isRead ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#1769E0]" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600">{n.message}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(n.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {n.link && (
                    <span className="text-xs text-[#1769E0] font-semibold flex items-center gap-0.5 shrink-0">
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
