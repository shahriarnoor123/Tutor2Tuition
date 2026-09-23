import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import {
  Bell,
  MessageSquare,
  Menu,
  X,
  ChevronDown,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Bookmark,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Role } from '../../types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenAuth: (defaultMode?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, onOpenAuth }) => {
  const {
    currentUser,
    currentRole,
    switchDemoRole,
    logout,
    unreadNotifsCount,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
  } = useAppStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'tutors', label: 'Find Tutors' },
    { id: 'tuitions', label: 'Find Tuition' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavLink = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  const getDashboardTab = () => {
    if (currentRole === 'tutor') return 'tutor-dashboard';
    if (currentRole === 'admin') return 'admin-dashboard';
    return 'student-dashboard';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* 1. Yellow Announcement Bar */}
      <div className="bg-[#FFD43B] text-[#102A43] px-4 py-1.5 text-xs font-semibold flex items-center justify-between transition-colors">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-[#102A43] text-white px-2 py-0.5 rounded text-[10px] tracking-wide uppercase font-bold shrink-0">
              Smart Tuition Platform
            </span>
            <span className="truncate">
              Looking for a verified tutor or high-paying tuition? Tutor2Tuition makes it simple across Bangladesh.
            </span>
          </div>
          <button
            onClick={() => onNavigate(currentRole === 'tutor' ? 'tuitions' : 'post-tuition')}
            className="hidden sm:inline-flex items-center gap-1 bg-[#102A43] hover:bg-[#1769E0] text-white text-[11px] font-semibold px-3 py-1 rounded-full transition-all shrink-0 ml-4 shadow-sm"
          >
            <span>{currentRole === 'tutor' ? 'Browse Tuition' : 'Post Tuition Free'}</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>

      {/* 2. Main Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 focus:outline-none group text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-[#1769E0] flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                T
              </div>
              <div className="flex items-baseline font-black tracking-tight text-2xl font-heading">
                <span className="text-[#1769E0]">Tutor</span>
                <span className="inline-flex items-center justify-center bg-[#FFD43B] text-[#102A43] px-1.5 py-0.5 rounded mx-0.5 text-sm font-black shadow-xs">
                  2
                </span>
                <span className="text-[#102A43]">Tuition</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavLink(link.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-[#1769E0] bg-[#EAF3FF] font-semibold'
                        : 'text-slate-600 hover:text-[#1769E0] hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Actions, Demo Switcher, Notifications, Auth */}
          <div className="flex items-center gap-3">
            {/* Quick Demo Role Switcher (Crucial for testing the 2-sided marketplace) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                title="Switch demo persona for testing"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1769E0]" />
                <span className="capitalize">
                  Role: <strong className="text-[#1769E0]">{currentRole === 'student_parent' ? 'Parent' : currentRole}</strong>
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Demo Persona
                  </div>
                  <button
                    onClick={() => {
                      switchDemoRole('student_parent');
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      currentRole === 'student_parent' ? 'text-[#1769E0] font-semibold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">Dr. Shahana Yasmin</p>
                      <p className="text-[10px] text-slate-500">Parent / Student View</p>
                    </div>
                    {currentRole === 'student_parent' && <span className="w-1.5 h-1.5 rounded-full bg-[#1769E0]" />}
                  </button>
                  <button
                    onClick={() => {
                      switchDemoRole('tutor');
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      currentRole === 'tutor' ? 'text-[#1769E0] font-semibold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">Engr. Tanvir Ahmed</p>
                      <p className="text-[10px] text-slate-500">Tutor View (BUET Graduate)</p>
                    </div>
                    {currentRole === 'tutor' && <span className="w-1.5 h-1.5 rounded-full bg-[#1769E0]" />}
                  </button>
                  <button
                    onClick={() => {
                      switchDemoRole('admin');
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      currentRole === 'admin' ? 'text-[#1769E0] font-semibold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">System Moderator</p>
                      <p className="text-[10px] text-slate-500">Admin Control Panel</p>
                    </div>
                    {currentRole === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-[#1769E0]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  setUserDropdownOpen(false);
                }}
                className="relative p-2 text-slate-600 hover:text-[#1769E0] hover:bg-slate-50 rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                      {unreadNotifsCount > 0 && (
                        <span className="text-[10px] font-semibold bg-blue-100 text-[#1769E0] px-2 py-0.5 rounded-full">
                          {unreadNotifsCount} new
                        </span>
                      )}
                    </div>
                    {unreadNotifsCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-[#1769E0] hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">
                        No notifications right now.
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.link) {
                              onNavigate(n.link.replace('/', ''));
                              setNotifDropdownOpen(false);
                            }
                          }}
                          className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                            !n.isRead ? 'bg-blue-50/40' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-slate-600 line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        onNavigate('notifications');
                        setNotifDropdownOpen(false);
                      }}
                      className="text-xs text-[#1769E0] hover:underline font-semibold"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Messages Icon */}
            <button
              onClick={() => onNavigate('messages')}
              className="p-2 text-slate-600 hover:text-[#1769E0] hover:bg-slate-50 rounded-lg transition-colors relative"
              aria-label="Messages"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* Post Tuition CTA Button */}
            <button
              onClick={() => onNavigate('post-tuition')}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#FFD43B] hover:bg-[#f6cb2c] text-[#102A43] font-bold text-xs px-3.5 py-2 rounded-lg transition-all shadow-sm active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Tuition</span>
            </button>

            {/* User Profile / Auth State */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setUserDropdownOpen(!userDropdownOpen);
                    setNotifDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-slate-300 transition-all focus:outline-none"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-[#1769E0]/20"
                    referrerPolicy="no-referrer"
                  />
                  <span className="hidden xl:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 divide-y divide-slate-100">
                    <div className="px-4 py-3">
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-[#1769E0] px-2 py-0.5 rounded">
                        {currentRole === 'student_parent' ? 'Parent / Student' : currentRole}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          onNavigate(getDashboardTab());
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#1769E0]" />
                        <span>My Dashboard</span>
                      </button>

                      {currentRole === 'tutor' && (
                        <button
                          onClick={() => {
                            onNavigate('tutor-profile-edit');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <UserIcon className="w-4 h-4 text-emerald-600" />
                          <span>Edit Tutor Profile</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onNavigate('saved-items');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Bookmark className="w-4 h-4 text-amber-500" />
                        <span>Saved Tutors & Tuition</span>
                      </button>

                      {currentRole === 'admin' && (
                        <button
                          onClick={() => {
                            onNavigate('admin-dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4 text-purple-600" />
                          <span>Admin Control Center</span>
                        </button>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#1769E0] transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#1769E0] hover:bg-blue-700 rounded-lg shadow-sm transition-all"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => handleNavLink('tutors')}
              className="px-3 py-2 text-xs font-semibold text-[#1769E0] bg-blue-50 rounded-lg text-center"
            >
              Find Tutors
            </button>
            <button
              onClick={() => handleNavLink('tuitions')}
              className="px-3 py-2 text-xs font-semibold text-[#102A43] bg-amber-50 rounded-lg text-center"
            >
              Find Tuition
            </button>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavLink(link.id)}
                className={`px-3 py-2.5 text-sm font-medium rounded-lg text-left ${
                  currentTab === link.id ? 'bg-[#EAF3FF] text-[#1769E0] font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => handleNavLink('post-tuition')}
              className="w-full flex items-center justify-center gap-2 bg-[#FFD43B] text-[#102A43] font-bold text-xs py-2.5 rounded-lg shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Tuition Requirement</span>
            </button>

            {currentUser ? (
              <button
                onClick={() => handleNavLink(getDashboardTab())}
                className="w-full flex items-center justify-center gap-2 bg-[#1769E0] text-white font-semibold text-xs py-2.5 rounded-lg shadow-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to Dashboard</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2 text-xs font-semibold border border-slate-300 rounded-lg text-slate-800"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="w-full py-2 text-xs font-semibold bg-[#1769E0] text-white rounded-lg shadow-sm"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
