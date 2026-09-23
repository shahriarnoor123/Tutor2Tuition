import React from 'react';
import {
  Calculator,
  Atom,
  FlaskConical,
  BookOpen,
  PenTool,
  Cpu,
  Code,
  Dna,
  Receipt,
  TrendingUp,
  Briefcase,
  Microscope,
  HelpCircle,
} from 'lucide-react';

interface SubjectCardProps {
  name: string;
  icon: string;
  tutorCount: number;
  tuitionCount: number;
  color?: string;
  onClick: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  name,
  icon,
  tutorCount,
  tuitionCount,
  onClick,
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'Calculator': return <Calculator className="w-6 h-6 text-[#1769E0]" />;
      case 'Atom': return <Atom className="w-6 h-6 text-indigo-600" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6 text-emerald-600" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-amber-600" />;
      case 'PenTool': return <PenTool className="w-6 h-6 text-rose-600" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-600" />;
      case 'Code': return <Code className="w-6 h-6 text-purple-600" />;
      case 'Dna': return <Dna className="w-6 h-6 text-teal-600" />;
      case 'Receipt': return <Receipt className="w-6 h-6 text-orange-600" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-lime-600" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-sky-600" />;
      case 'Microscope': return <Microscope className="w-6 h-6 text-violet-600" />;
      default: return <HelpCircle className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:shadow-card-hover hover:border-[#1769E0]/40 transition-all cursor-pointer group flex flex-col items-center text-center"
    >
      <div className="w-13 h-13 rounded-2xl bg-blue-50/80 group-hover:bg-[#EAF3FF] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        {renderIcon()}
      </div>

      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#1769E0] transition-colors mb-1">
        {name}
      </h4>

      <p className="text-xs text-slate-500 font-medium">
        {tutorCount} Tutors <span className="text-slate-300">·</span> {tuitionCount} Tuitions
      </p>
    </div>
  );
};
