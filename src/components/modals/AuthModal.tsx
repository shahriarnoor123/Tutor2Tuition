import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { Role } from '../../types';
import { X, Mail, Lock, User, Phone, Sparkles, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
  onSuccess,
}) => {
  const { login, registerUser, switchDemoRole } = useAppStore();

  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [role, setRole] = useState<Role>('student_parent');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+880 1');
  const [password, setPassword] = useState('');
  const [university, setUniversity] = useState('University of Dhaka');
  const [department, setDepartment] = useState('Computer Science / Science');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password.');
        return;
      }
      const success = login(email, role);
      if (success) {
        if (onSuccess) onSuccess();
        onClose();
      }
    } else {
      if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      registerUser(name, email, phone, role, {
        university,
        department,
        subjects: ['Mathematics', 'Science'],
        classes: ['SSC', 'HSC'],
        preferredLocations: ['Dhanmondi', 'Mirpur'],
      });
      if (onSuccess) onSuccess();
      onClose();
    }
  };

  const handleQuickDemoLogin = (demoRole: Role) => {
    switchDemoRole(demoRole);
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#102A43] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 font-bold text-xl mb-1">
            <span className="text-[#1769E0]">Tutor</span>
            <span className="bg-[#FFD43B] text-[#102A43] px-1 rounded text-xs">2</span>
            <span className="text-white">Tuition</span>
          </div>
          <p className="text-xs text-slate-300">
            {mode === 'login'
              ? 'Sign in to access your tuition dashboard'
              : 'Create an account to hire tutors or find tuition'}
          </p>

          {/* Tab switcher */}
          <div className="flex items-center gap-1 mt-4 p-1 bg-white/10 rounded-xl">
            <button
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login' ? 'bg-[#FFD43B] text-[#102A43]' : 'text-white/80 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('register');
                setError('');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register' ? 'bg-[#FFD43B] text-[#102A43]' : 'text-white/80 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Quick Demo Login Preset Bar */}
        <div className="bg-blue-50/70 border-b border-blue-100 px-6 py-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#1769E0]" />
            <span>Instant 1-Click Demo Login:</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student_parent')}
              className="px-2 py-1 text-[11px] font-semibold bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 rounded-lg shadow-2xs truncate"
            >
              👨‍👩‍👧 Parent
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('tutor')}
              className="px-2 py-1 text-[11px] font-semibold bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 rounded-lg shadow-2xs truncate"
            >
              🎓 BUET Tutor
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="px-2 py-1 text-[11px] font-semibold bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 rounded-lg shadow-2xs truncate"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Role selector (if registering) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student_parent')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    role === 'student_parent'
                      ? 'border-[#1769E0] bg-blue-50 text-[#1769E0]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Hire a Tutor
                </button>
                <button
                  type="button"
                  onClick={() => setRole('tutor')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    role === 'tutor'
                      ? 'border-[#1769E0] bg-blue-50 text-[#1769E0]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Become a Tutor
                </button>
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                  placeholder="e.g. Farhan Mahmud"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                placeholder="your.email@gmail.com"
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (+880)</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                  placeholder="+880 1XXXXXXXXX"
                  required
                />
              </div>
            </div>
          )}

          {mode === 'register' && role === 'tutor' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">University</label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 focus:ring-1 focus:ring-[#1769E0]"
                  placeholder="e.g. BUET / DU"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 focus:ring-1 focus:ring-[#1769E0]"
                  placeholder="e.g. EEE / Physics"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 text-xs font-bold text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] rounded-xl shadow-md transition-all active:scale-95"
            >
              {mode === 'login' ? 'Sign In' : 'Create My Account'}
            </button>
          </div>

          <p className="text-center text-[11px] text-slate-500 pt-1">
            {mode === 'login' ? "Don't have an account yet? " : 'Already registered? '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError('');
              }}
              className="font-bold text-[#1769E0] hover:underline"
            >
              {mode === 'login' ? 'Register Now' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
