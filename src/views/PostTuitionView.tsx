import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { SUBJECT_CATEGORIES, POPULAR_CLASSES, BANGLADESH_LOCATIONS } from '../data/mockData';
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  MapPin,
  Calendar,
  DollarSign,
  GraduationCap,
  Sparkles,
  User,
  Phone,
  AlertCircle,
} from 'lucide-react';

interface PostTuitionViewProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const PostTuitionView: React.FC<PostTuitionViewProps> = ({ onNavigate }) => {
  const { postNewTuition, currentUser, showToast } = useAppStore();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [error, setError] = useState<string>('');

  // Step 1: Student Information
  const [studentClass, setStudentClass] = useState<string>('HSC (1st/2nd Year)');
  const [medium, setMedium] = useState<'Bangla Medium' | 'English Version' | 'English Medium' | 'Madrasah'>('Bangla Medium');
  const [studentGender, setStudentGender] = useState<'male' | 'female'>('male');
  const [institute, setInstitute] = useState<string>('Notre Dame College');

  // Step 2: Tuition Requirements
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Physics', 'Higher Math']);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [preferredTime, setPreferredTime] = useState<string>('5:30 PM - 7:30 PM');
  const [preferredTutorGender, setPreferredTutorGender] = useState<'any' | 'male' | 'female'>('any');
  const [preferredUniversity, setPreferredUniversity] = useState<string>('BUET / DU / Medical');

  // Step 3: Location & Mode
  const [division, setDivision] = useState<string>('Dhaka');
  const [district, setDistrict] = useState<string>('Dhaka');
  const [area, setArea] = useState<string>('Dhanmondi');
  const [addressDetails, setAddressDetails] = useState<string>('Near Dhanmondi 27 / Lake, Road 8/A');
  const [teachingMode, setTeachingMode] = useState<'offline' | 'online' | 'both'>('offline');

  // Step 4: Budget
  const [salary, setSalary] = useState<number>(8000);
  const [salaryNegotiable, setSalaryNegotiable] = useState<boolean>(true);
  const [requirementsNote, setRequirementsNote] = useState<string>(
    'Looking for an enthusiastic university tutor with strong conceptual physics and math background to help prepare for upcoming board exams.'
  );

  // Step 5: Guardian Contact
  const [guardianName, setGuardianName] = useState<string>(currentUser?.name || 'Dr. Shahana Yasmin');
  const [guardianPhone, setGuardianPhone] = useState<string>(currentUser?.phone || '+880 1712-345678');

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleNextStep = () => {
    setError('');
    if (currentStep === 1) {
      if (!studentClass) {
        setError('Please select a student class.');
        return;
      }
    }
    if (currentStep === 2) {
      if (selectedSubjects.length === 0) {
        setError('Please choose at least one subject.');
        return;
      }
    }
    if (currentStep === 3) {
      if (!area.trim()) {
        setError('Please specify your area.');
        return;
      }
    }
    if (currentStep === 4) {
      if (!salary || salary < 1000) {
        setError('Please input a valid monthly salary (minimum ৳1,000).');
        return;
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guardianPhone || guardianPhone.length < 8) {
      setError('Please provide a valid contact number.');
      return;
    }

    const title = `${studentClass} Tutor needed for ${selectedSubjects.join(', ')} in ${area}`;

    const newPost = postNewTuition({
      parentId: currentUser?.id || 'usr-parent-1',
      parentName: guardianName,
      parentPhone: guardianPhone,
      guardianName,
      guardianPhone,
      title,
      studentClass,
      medium,
      studentGender,
      subjects: selectedSubjects,
      daysPerWeek,
      preferredTime,
      division,
      district,
      area,
      detailedAddress: addressDetails,
      addressDetails,
      teachingMode,
      salary,
      salaryNegotiable,
      preferredTutorGender,
      preferredUniversity,
      requirements: requirementsNote,
      description: requirementsNote,
      status: 'active',
    });

    onNavigate('tuition-details', newPost.id);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Wizard Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#102A43] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Fast & Free Tuition Posting</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A43]">
            Post Your Tuition Requirement
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Fill in your child's learning goals to receive applications from verified university tutors in hours.
          </p>
        </div>

        {/* 5-Step Progress Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-soft">
          <div className="grid grid-cols-5 gap-2 text-center">
            {[
              { num: 1, label: 'Student' },
              { num: 2, label: 'Subjects' },
              { num: 3, label: 'Location' },
              { num: 4, label: 'Budget' },
              { num: 5, label: 'Publish' },
            ].map((st) => (
              <div
                key={st.num}
                onClick={() => {
                  if (st.num < currentStep) setCurrentStep(st.num);
                }}
                className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                  st.num === currentStep
                    ? 'text-[#1769E0] font-bold'
                    : st.num < currentStep
                    ? 'text-emerald-600 font-semibold'
                    : 'text-slate-400'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    st.num === currentStep
                      ? 'bg-[#1769E0] text-white shadow-xs'
                      : st.num < currentStep
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {st.num < currentStep ? '✓' : st.num}
                </div>
                <span className="text-[11px] truncate hidden sm:inline">{st.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Student Information */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-[#102A43]">Step 1: Student Information</h3>
                <p className="text-xs text-slate-500">Tell us about the student needing guidance.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Student Class / Grade *
                  </label>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#1769E0]"
                  >
                    {POPULAR_CLASSES.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Curriculum / Medium *
                  </label>
                  <select
                    value={medium}
                    onChange={(e) => setMedium(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#1769E0]"
                  >
                    <option value="Bangla Medium">Bangla Medium (National Curriculum)</option>
                    <option value="English Version">English Version (National Curriculum)</option>
                    <option value="English Medium">English Medium (Cambridge / Edexcel)</option>
                    <option value="Madrasah">Madrasah Curriculum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Student Gender *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setStudentGender('male')}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                        studentGender === 'male'
                          ? 'border-[#1769E0] bg-blue-50 text-[#1769E0]'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Male Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudentGender('female')}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                        studentGender === 'female'
                          ? 'border-[#1769E0] bg-blue-50 text-[#1769E0]'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Female Student
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Current Institute / School
                  </label>
                  <input
                    type="text"
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-[#1769E0]"
                    placeholder="e.g. Notre Dame College / Viqarunnisa"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Subjects & Schedule */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-[#102A43]">Step 2: Tuition Requirements & Schedule</h3>
                <p className="text-xs text-slate-500">Pick subjects and schedule preferences.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Subjects (Click to toggle) *
                </label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECT_CATEGORIES.map((cat) => {
                    const selected = selectedSubjects.includes(cat.name);
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => toggleSubject(cat.name)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                          selected
                            ? 'border-[#1769E0] bg-[#1769E0] text-white shadow-xs'
                            : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
                        }`}
                      >
                        {cat.name} {selected ? '✓' : '+'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Days Per Week
                  </label>
                  <select
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#1769E0]"
                  >
                    <option value={2}>2 Days / Week</option>
                    <option value={3}>3 Days / Week (Recommended)</option>
                    <option value={4}>4 Days / Week</option>
                    <option value={5}>5 Days / Week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Time
                  </label>
                  <input
                    type="text"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-[#1769E0]"
                    placeholder="e.g. 5:30 PM - 7:30 PM"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tutor Gender Preference
                  </label>
                  <select
                    value={preferredTutorGender}
                    onChange={(e) => setPreferredTutorGender(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#1769E0]"
                  >
                    <option value="any">Any (Male or Female)</option>
                    <option value="male">Male Tutor Only</option>
                    <option value="female">Female Tutor Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Tutor University
                </label>
                <input
                  type="text"
                  value={preferredUniversity}
                  onChange={(e) => setPreferredUniversity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-[#1769E0]"
                  placeholder="e.g. BUET / DU / Medical / IBA"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Location Details */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-[#102A43]">Step 3: Location & Teaching Mode</h3>
                <p className="text-xs text-slate-500">Where should the tuition take place?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Division
                  </label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    District
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                    placeholder="e.g. Dhaka"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Area / Thana *
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                    placeholder="e.g. Dhanmondi / Mirpur / Uttara"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Detailed Address / Nearby Landmark
                </label>
                <input
                  type="text"
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                  placeholder="e.g. Near Star Kabab / Road 8/A"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Teaching Mode *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTeachingMode('offline')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      teachingMode === 'offline'
                        ? 'border-[#1769E0] bg-blue-50 text-[#1769E0]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    In-Person Home Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeachingMode('online')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      teachingMode === 'online'
                        ? 'border-[#1769E0] bg-blue-50 text-[#1769E0]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Online Tutoring
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeachingMode('both')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      teachingMode === 'both'
                        ? 'border-[#1769E0] bg-blue-50 text-[#1769E0]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Both Acceptable
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Budget & Description */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-[#102A43]">Step 4: Monthly Salary Budget</h3>
                <p className="text-xs text-slate-500">Provide an attractive remuneration to attract qualified tutors.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Offered Monthly Salary (৳ BDT) *
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">৳</span>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-[#1769E0]"
                    placeholder="8000"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="negotiable"
                    checked={salaryNegotiable}
                    onChange={(e) => setSalaryNegotiable(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1769E0] focus:ring-[#1769E0]"
                  />
                  <label htmlFor="negotiable" className="text-xs text-slate-600 font-medium cursor-pointer">
                    Salary is negotiable depending on tutor credentials and experience
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Additional Notes / Specific Requirements
                </label>
                <textarea
                  rows={4}
                  value={requirementsNote}
                  onChange={(e) => setRequirementsNote(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:ring-2 focus:ring-[#1769E0]"
                  placeholder="Mention topics where student faces difficulty, expectation of weekly tests, etc."
                />
              </div>
            </div>
          )}

          {/* STEP 5: Review & Publish */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-[#102A43]">Step 5: Review & Publish</h3>
                <p className="text-xs text-slate-500">Verify your information before publishing live.</p>
              </div>

              {/* Preview Card */}
              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1769E0]">{studentClass} ({medium})</span>
                  <span className="text-base font-black text-[#102A43]">৳{salary.toLocaleString()}/mo</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  {studentClass} Tutor needed for {selectedSubjects.join(', ')} in {area}
                </h4>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>Subjects:</strong> {selectedSubjects.join(', ')}</p>
                  <p><strong>Location:</strong> {area}, {district} ({addressDetails})</p>
                  <p><strong>Schedule:</strong> {daysPerWeek} Days/Week · {preferredTime}</p>
                  <p><strong>Preferred Tutor:</strong> {preferredUniversity} · {preferredTutorGender} tutor</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Guardian / Contact Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Guardian Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  defaultChecked
                  className="w-4 h-4 rounded text-[#1769E0]"
                  required
                />
                <label htmlFor="terms" className="text-xs text-slate-600">
                  I confirm the tuition details are accurate and agree to Tutor2Tuition platform guidelines.
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#1769E0] hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-7 py-2.5 text-xs font-bold text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Publish Tuition Post Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
