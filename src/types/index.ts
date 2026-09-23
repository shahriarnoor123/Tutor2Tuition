export type Role = 'student_parent' | 'tutor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar: string;
  createdAt: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  department: string;
  year: string;
  result: string;
}

export interface ExperienceItem {
  role: string;
  institutionOrContext: string;
  duration: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  reviewerName: string;
  reviewerRole: string;
  rating: number;
  date: string;
  comment: string;
}

export interface TutorProfile {
  id: string;
  userId: string;
  name: string;
  gender: 'male' | 'female';
  phone: string;
  email: string;
  avatar: string;
  title: string;
  university: string;
  department: string;
  degree: string;
  graduationYear: string;
  cgpa?: string;
  subjects: string[];
  classes: string[];
  preferredLocations: string[];
  division: string;
  district: string;
  teachingMode: 'online' | 'offline' | 'both';
  experienceYears: number;
  minFee: number;
  maxFee: number;
  feeType: 'monthly' | 'hourly';
  availability: string;
  daysPerWeek: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isFeatured: boolean;
  about: string;
  skills: string[];
  educationList: EducationItem[];
  experienceList: ExperienceItem[];
  reviews: ReviewItem[];
  profileCompletion: number;
}

export interface TuitionPost {
  id: string;
  code: string;
  parentId: string;
  userId?: string;
  parentName: string;
  guardianName?: string;
  parentPhone: string;
  guardianPhone?: string;
  title: string;
  studentClass: string;
  medium?: string;
  subjects: string[];
  studentGender: 'male' | 'female';
  preferredTutorGender: 'male' | 'female' | 'any';
  preferredUniversity?: string;
  division: string;
  district: string;
  area: string;
  detailedAddress: string;
  addressDetails?: string;
  teachingMode: 'online' | 'offline' | 'both';
  daysPerWeek: number;
  preferredTime: string;
  salary: number;
  salaryNegotiable: boolean;
  requirements: string;
  description?: string;
  status: 'active' | 'in_review' | 'assigned' | 'closed';
  createdAt: string;
  deadline?: string;
  applicationsCount: number;
}

export type ApplicationStatus = 'pending' | 'viewed' | 'shortlisted' | 'accepted' | 'rejected' | 'withdrawn';

export interface Application {
  id: string;
  tuitionId: string;
  tuitionTitle: string;
  tuitionCode: string;
  tuitionSalary: number;
  tuitionArea: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorUniversity: string;
  tutorRating: number;
  tutorPhone: string;
  expectedSalary: number;
  availability: string;
  coverLetter: string;
  status: ApplicationStatus;
  appliedAt: string;
  createdAt?: string;
  reviewedAt?: string;
}

export interface TutorRequest {
  id: string;
  studentId: string;
  userId?: string;
  studentName: string;
  parentName?: string;
  studentPhone: string;
  phone?: string;
  tutorId: string;
  tutorName: string;
  subject: string;
  studentClass: string;
  area: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined' | 'rejected';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'application' | 'request' | 'status_change' | 'message' | 'system';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  createdAt?: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantIds: [string, string];
  participants: {
    [userId: string]: {
      name: string;
      avatar: string;
      role: Role;
      online?: boolean;
    };
  };
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  participantName?: string;
  participantAvatar?: string;
  participantRole?: Role;
  lastMessageAt?: string;
  messages?: Message[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  roleType: 'student' | 'parent' | 'tutor';
  avatar: string;
  rating: number;
  comment: string;
  location: string;
  institution: string;
}

export interface TutorFilterState {
  subject: string;
  studentClass: string;
  location: string;
  gender: string;
  teachingMode: string;
  minExperience: number;
  maxBudget: number;
  onlyVerified: boolean;
  sortBy: 'relevance' | 'rating' | 'experience' | 'fee_asc' | 'fee_desc';
  searchQuery: string;
}

export interface TuitionFilterState {
  subject: string;
  studentClass: string;
  location: string;
  teachingMode: string;
  tutorGender: string;
  daysPerWeek: string;
  minSalary: number;
  maxSalary: number;
  sortBy: 'newest' | 'salary_desc' | 'salary_asc' | 'applications';
  searchQuery: string;
}
