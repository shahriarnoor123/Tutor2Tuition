import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Facebook,
  Linkedin,
  Youtube,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#102A43] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-9 h-9 rounded-xl bg-[#1769E0] flex items-center justify-center text-white font-black text-xl shadow-md">
                T
              </div>
              <div className="flex items-baseline font-black tracking-tight text-2xl font-heading text-white">
                <span className="text-[#1769E0]">Tutor</span>
                <span className="inline-flex items-center justify-center bg-[#FFD43B] text-[#102A43] px-1.5 py-0.5 rounded mx-0.5 text-sm font-black shadow-xs">
                  2
                </span>
                <span className="text-white">Tuition</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Bangladesh’s smart, transparent tuition marketplace connecting qualified university tutors with ambitious students and conscious parents.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFD43B] shrink-0" />
                <span>House 42, Road 9/A, Dhanmondi, Dhaka 1209, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFD43B] shrink-0" />
                <span>+880 9612-889900 | +880 1700-000000 (10 AM - 8 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFD43B] shrink-0" />
                <span>support@tutor2tuition.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1769E0] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1769E0] flex items-center justify-center text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-600 flex items-center justify-center text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('tutors')} className="hover:text-white transition-colors">
                  Find Tutors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tuitions')} className="hover:text-white transition-colors">
                  Find Tuition
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutors')} className="hover:text-white transition-colors">
                  Subject Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tuitions')} className="hover:text-white transition-colors">
                  Tuition Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: For Tutors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#FFD43B] uppercase tracking-wider">For Tutors</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('tuitions')} className="hover:text-white transition-colors">
                  Browse Tuition Posts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutor-dashboard')} className="hover:text-white transition-colors">
                  Tutor Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutor-profile-edit')} className="hover:text-white transition-colors">
                  Create Tutor Profile
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutor-dashboard')} className="hover:text-white transition-colors">
                  Track Applications
                </button>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Free Tutor Verification</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: For Students & Parents */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#1769E0] uppercase tracking-wider">For Students & Parents</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('post-tuition')} className="hover:text-white transition-colors font-medium text-white">
                  Post a Tuition Requirement
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutors')} className="hover:text-white transition-colors">
                  Search Qualified Tutors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="hover:text-white transition-colors">
                  Manage Tuition Posts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="hover:text-white transition-colors">
                  Review Applications
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('saved-items')} className="hover:text-white transition-colors">
                  Saved Tutors
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 Tutor2Tuition. All rights reserved.</span>
            <span>·</span>
            <span className="text-slate-300">Empowering education in Bangladesh.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
              About Us
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
              Contact & Support
            </button>
            <span className="text-slate-500">Privacy Policy</span>
            <span className="text-slate-500">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
