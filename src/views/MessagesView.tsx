import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { Send, MessageSquare, Sparkles, User } from 'lucide-react';

interface MessagesViewProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({ onNavigate }) => {
  const {
    conversations,
    messages,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    currentUser,
  } = useAppStore();

  const [messageText, setMessageText] = useState('');

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const getOtherParticipant = (conv: typeof conversations[0]) => {
    const currentId = currentUser?.id || 'usr-parent-1';
    const otherId = conv.participantIds.find((id) => id !== currentId) || conv.participantIds[0];
    return conv.participants[otherId] || {
      name: 'User',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      role: 'tutor',
      online: true,
    };
  };

  const activeMessages = activeConv
    ? messages.filter((m) => m.conversationId === activeConv.id)
    : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeConv) return;
    sendMessage(activeConv.id, messageText);
    setMessageText('');
  };

  const otherActive = activeConv ? getOtherParticipant(activeConv) : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden h-[750px] flex flex-col md:flex-row">
          {/* Left Sidebar: Conversations List */}
          <div className="w-full md:w-80 border-r border-slate-200/80 flex flex-col shrink-0">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-[#102A43] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#1769E0]" />
                <span>Direct Messages</span>
              </h2>
              <span className="text-[11px] font-bold text-slate-400">
                {conversations.length} Active
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {conversations.map((conv) => {
                const isActive = conv.id === activeConv?.id;
                const other = getOtherParticipant(conv);
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                      isActive ? 'bg-[#EAF3FF]' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={other.avatar}
                        alt={other.name}
                        className="w-11 h-11 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {conv.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1769E0] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {other.name}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {conv.lastTimestamp
                            ? new Date(conv.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : ''}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        {conv.lastMessage}
                      </p>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#1769E0] bg-blue-50/70 px-1.5 py-0.5 rounded mt-1 inline-block">
                        {other.role === 'tutor' ? 'Verified Tutor' : 'Guardian / Parent'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Main Chat Window */}
          {activeConv && otherActive ? (
            <div className="flex-1 flex flex-col bg-slate-50/30">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200/80 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={otherActive.avatar}
                    alt={otherActive.name}
                    className="w-10 h-10 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{otherActive.name}</h3>
                    <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{otherActive.role === 'tutor' ? 'University Tutor' : 'Guardian'} · Online</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (otherActive.role === 'tutor') {
                        onNavigate('tutors');
                      } else {
                        onNavigate('tuitions');
                      }
                    }}
                    className="p-2 text-slate-600 hover:text-[#1769E0] bg-slate-50 rounded-lg border border-slate-200 text-xs font-semibold"
                  >
                    View Info
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                <div className="text-center my-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                    Encrypted Direct Discussion · Safe Tuition Messaging
                  </span>
                </div>

                {activeMessages.map((msg) => {
                  const isMe = msg.senderId === currentUser?.id || msg.senderId === 'usr-parent-1';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                          isMe
                            ? 'bg-[#1769E0] text-white rounded-br-xs'
                            : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {new Date(msg.timestamp || msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-3.5 bg-white border-t border-slate-200/80 flex items-center gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message (e.g. Can we arrange a demo class this Saturday at 5 PM?)..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-[#1769E0] hover:bg-blue-700 text-white shadow-sm transition-all active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 text-xs">
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
