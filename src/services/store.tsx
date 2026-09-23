import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Role,
  TutorProfile,
  TuitionPost,
  Application,
  TutorRequest,
  Notification,
  Conversation,
  Message,
  ApplicationStatus,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_TUTORS,
  INITIAL_TUITIONS,
  INITIAL_APPLICATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CONVERSATIONS,
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  currentUser: User | null;
  currentRole: Role;
  setCurrentUser: (user: User | null) => void;
  switchDemoRole: (role: Role) => void;
  login: (email: string, role?: Role) => boolean;
  registerUser: (name: string, email: string, phone: string, role: Role, extra?: Partial<TutorProfile>) => User;
  logout: () => void;

  // Tutors
  tutors: TutorProfile[];
  getTutorById: (id: string) => TutorProfile | undefined;
  updateTutorProfile: (tutorId: string, updates: Partial<TutorProfile>) => void;
  toggleVerifyTutor: (tutorId: string) => void;
  verifyTutor: (tutorId: string, isVerified?: boolean) => void;
  
  // Tuitions
  tuitions: TuitionPost[];
  getTuitionById: (id: string) => TuitionPost | undefined;
  createTuitionPost: (data: Omit<TuitionPost, 'id' | 'code' | 'createdAt' | 'applicationsCount'>) => TuitionPost;
  postNewTuition: (data: Omit<TuitionPost, 'id' | 'code' | 'createdAt' | 'applicationsCount'>) => TuitionPost;
  updateTuitionStatus: (id: string, status: TuitionPost['status']) => void;
  deleteTuitionPost: (id: string) => void;

  // Applications
  applications: Application[];
  applyForTuition: (tuitionId: string, expectedSalary: number, availability: string, coverLetter: string) => boolean;
  updateApplicationStatus: (appId: string, newStatus: ApplicationStatus) => void;
  withdrawApplication: (appId: string) => void;

  // Direct Tutor Requests
  tutorRequests: TutorRequest[];
  directRequests: TutorRequest[];
  requestTutor: (tutorId: string, subject: string, studentClass: string, message: string, phone: string) => void;
  updateTutorRequestStatus: (requestId: string, status: 'accepted' | 'declined') => void;
  respondToDirectRequest: (requestId: string, status: 'accepted' | 'rejected' | 'declined') => void;

  // Saved / Favorites
  savedTutorIds: string[];
  savedTuitionIds: string[];
  toggleSaveTutor: (tutorId: string) => void;
  toggleSaveTuition: (tuitionId: string) => void;

  // Notifications
  notifications: Notification[];
  unreadNotifsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (title: string, message: string, type: Notification['type'], userId?: string, link?: string) => void;

  // Messaging
  conversations: Conversation[];
  messages: Message[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startOrGetConversation: (targetUserId: string, targetName: string, targetAvatar: string, targetRole: Role) => string;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  USERS: 't2t_users_v1',
  CURRENT_USER: 't2t_current_user_v1',
  TUTORS: 't2t_tutors_v1',
  TUITIONS: 't2t_tuitions_v1',
  APPLICATIONS: 't2t_applications_v1',
  REQUESTS: 't2t_requests_v1',
  SAVED_TUTORS: 't2t_saved_tutors_v1',
  SAVED_TUITIONS: 't2t_saved_tuitions_v1',
  NOTIFICATIONS: 't2t_notifications_v1',
  CONVERSATIONS: 't2t_conversations_v1',
  MESSAGES: 't2t_messages_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage with safe mock fallbacks
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USERS[0];
      }
    }
    return INITIAL_USERS[0]; // Default to first user (Engr. Tanvir Ahmed, tutor) for rich dashboard preview
  });

  const [tutors, setTutors] = useState<TutorProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TUTORS);
    return saved ? JSON.parse(saved) : INITIAL_TUTORS;
  });

  const [tuitions, setTuitions] = useState<TuitionPost[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TUITIONS);
    return saved ? JSON.parse(saved) : INITIAL_TUITIONS;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [tutorRequests, setTutorRequests] = useState<TutorRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    return saved ? JSON.parse(saved) : [];
  });

  const [savedTutorIds, setSavedTutorIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_TUTORS);
    return saved ? JSON.parse(saved) : ['tutor-1', 'tutor-2'];
  });

  const [savedTuitionIds, setSavedTuitionIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_TUITIONS);
    return saved ? JSON.parse(saved) : ['tuition-1', 'tuition-3'];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg-1',
        conversationId: 'conv-1',
        senderId: 'user_parent_1',
        receiverId: 'user_tutor_1',
        text: 'Hello Tanvir Sir, we reviewed your BUET credentials and shortlisted your application for our son’s HSC Physics.',
        timestamp: '2026-03-22T16:40:00Z',
        isRead: true,
      },
      {
        id: 'msg-2',
        conversationId: 'conv-1',
        senderId: 'user_tutor_1',
        receiverId: 'user_parent_1',
        text: 'Assalamu Alaikum madam, thank you! Yes I can visit for a demo session this Saturday at 6:30 PM.',
        timestamp: '2026-03-22T16:45:00Z',
        isRead: false,
      }
    ];
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TUTORS, JSON.stringify(tutors));
  }, [tutors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TUITIONS, JSON.stringify(tuitions));
  }, [tuitions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(tutorRequests));
  }, [tutorRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_TUTORS, JSON.stringify(savedTutorIds));
  }, [savedTutorIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_TUITIONS, JSON.stringify(savedTuitionIds));
  }, [savedTuitionIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const currentRole: Role = currentUser?.role || 'student_parent';

  // Demo Role Quick Switcher
  const switchDemoRole = (role: Role) => {
    const target = users.find((u) => u.role === role);
    if (target) {
      setCurrentUser(target);
      showToast(`Switched to ${role === 'student_parent' ? 'Student/Parent' : role === 'tutor' ? 'Tutor' : 'Admin'} view (${target.name})`, 'info');
    }
  };

  const login = (email: string, role?: Role): boolean => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      showToast(`Welcome back, ${found.name}!`, 'success');
      return true;
    }
    // If not found, create a demo user on the fly
    const defaultRole = role || 'student_parent';
    const newUser: User = {
      id: 'user_' + Date.now(),
      name: email.split('@')[0].replace(/[._]/g, ' '),
      email: email,
      phone: '+880 1700-000000',
      role: defaultRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Logged in successfully as ${newUser.name}!`, 'success');
    return true;
  };

  const registerUser = (name: string, email: string, phone: string, role: Role, extra?: Partial<TutorProfile>): User => {
    const newUser: User = {
      id: 'user_' + Date.now(),
      name,
      email,
      phone,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);

    if (role === 'tutor') {
      const newTutor: TutorProfile = {
        id: 'tutor_' + Date.now(),
        userId: newUser.id,
        name: newUser.name,
        gender: extra?.gender || 'male',
        phone: newUser.phone,
        email: newUser.email,
        avatar: newUser.avatar,
        title: extra?.title || `${extra?.university || 'University'} Student | Dedicated Tutor`,
        university: extra?.university || 'University of Dhaka',
        department: extra?.department || 'Department of Science',
        degree: extra?.degree || 'B.Sc (Hons)',
        graduationYear: '2025',
        cgpa: '3.80',
        subjects: extra?.subjects && extra.subjects.length > 0 ? extra.subjects : ['Mathematics', 'General Science'],
        classes: extra?.classes && extra.classes.length > 0 ? extra.classes : ['SSC', 'Class 6–8'],
        preferredLocations: extra?.preferredLocations && extra.preferredLocations.length > 0 ? extra.preferredLocations : ['Dhanmondi', 'Mirpur'],
        division: 'Dhaka',
        district: 'Dhaka',
        teachingMode: extra?.teachingMode || 'both',
        experienceYears: extra?.experienceYears || 2,
        minFee: extra?.minFee || 5000,
        maxFee: extra?.maxFee || 8000,
        feeType: 'monthly',
        availability: 'Sat, Mon, Wed (5:00 PM - 8:30 PM)',
        daysPerWeek: '3 Days/Week',
        rating: 5.0,
        reviewCount: 0,
        isVerified: false,
        isFeatured: false,
        about: extra?.about || 'Dedicated tutor passionate about teaching students with clarity, empathy, and regular evaluations.',
        skills: ['Concept Clarity', 'Punctuality', 'Regular Assessments'],
        educationList: [
          {
            degree: extra?.degree || 'B.Sc (Hons)',
            institution: extra?.university || 'University of Dhaka',
            department: extra?.department || 'Science',
            year: '2021-2025',
            result: '3.80',
          },
        ],
        experienceList: [
          {
            role: 'Private Home Tutor',
            institutionOrContext: 'Dhaka Area',
            duration: '2 Years',
            description: 'Mentored school and college students in science subjects.',
          },
        ],
        reviews: [],
        profileCompletion: 80,
      };
      setTutors((prev) => [newTutor, ...prev]);
    }

    addNotification(
      'Welcome to Tutor2Tuition!',
      `Hello ${name}, your account has been created. Start exploring tutors or tuition opportunities today!`,
      'system',
      newUser.id
    );

    showToast('Registration successful! Welcome to Tutor2Tuition.', 'success');
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully.', 'info');
  };

  const getTutorById = (id: string) => tutors.find((t) => t.id === id);

  const updateTutorProfile = (tutorId: string, updates: Partial<TutorProfile>) => {
    setTutors((prev) =>
      prev.map((t) => {
        if (t.id === tutorId) {
          return { ...t, ...updates, profileCompletion: Math.min(100, (t.profileCompletion || 75) + 5) };
        }
        return t;
      })
    );
    showToast('Profile updated successfully!', 'success');
  };

  const toggleVerifyTutor = (tutorId: string) => {
    setTutors((prev) =>
      prev.map((t) => {
        if (t.id === tutorId) {
          const next = !t.isVerified;
          addNotification(
            next ? 'Profile Verified!' : 'Verification Status Updated',
            next
              ? 'Congratulations! Your tutor profile has been officially verified by Tutor2Tuition team.'
              : 'Your verification badge has been removed.',
            'status_change',
            t.userId
          );
          return { ...t, isVerified: next };
        }
        return t;
      })
    );
    showToast('Tutor verification status toggled.', 'info');
  };

  const verifyTutor = (tutorId: string, isVerified?: boolean) => {
    setTutors((prev) =>
      prev.map((t) => {
        if (t.id === tutorId) {
          const next = isVerified !== undefined ? isVerified : !t.isVerified;
          addNotification(
            next ? 'Profile Verified!' : 'Verification Status Updated',
            next
              ? 'Congratulations! Your tutor profile has been officially verified by Tutor2Tuition team.'
              : 'Your verification badge has been removed.',
            'status_change',
            t.userId
          );
          return { ...t, isVerified: next };
        }
        return t;
      })
    );
    showToast(isVerified !== false ? 'Tutor badge approved!' : 'Tutor verification revoked.', 'info');
  };

  const getTuitionById = (id: string) => tuitions.find((t) => t.id === id);

  const createTuitionPost = (data: Omit<TuitionPost, 'id' | 'code' | 'createdAt' | 'applicationsCount'>): TuitionPost => {
    const randomCode = `T2T-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPost: TuitionPost = {
      ...data,
      id: 'tuition_' + Date.now(),
      code: randomCode,
      createdAt: new Date().toISOString(),
      applicationsCount: 0,
      status: 'active',
    };
    setTuitions((prev) => [newPost, ...prev]);

    // Send notification to author
    addNotification(
      'Tuition Post Published',
      `Your requirement for ${data.studentClass} (${data.subjects.join(', ')}) in ${data.area} is now live with ID ${randomCode}. Tutors can apply now!`,
      'system',
      data.parentId,
      `/tuition/${newPost.id}`
    );

    showToast(`Tuition posted successfully! Ref Code: ${randomCode}`, 'success');
    return newPost;
  };

  const updateTuitionStatus = (id: string, status: TuitionPost['status']) => {
    setTuitions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    showToast(`Tuition status changed to ${status}.`, 'info');
  };

  const deleteTuitionPost = (id: string) => {
    setTuitions((prev) => prev.filter((t) => t.id !== id));
    showToast('Tuition post removed.', 'info');
  };

  const applyForTuition = (
    tuitionId: string,
    expectedSalary: number,
    availability: string,
    coverLetter: string
  ): boolean => {
    const tuition = getTuitionById(tuitionId);
    if (!tuition) return false;

    // Check if user has tutor profile
    const currentTutor = tutors.find((t) => t.userId === currentUser?.id) || tutors[0];

    // Check if already applied
    const existing = applications.find(
      (a) => a.tuitionId === tuitionId && a.tutorId === currentTutor.id && a.status !== 'withdrawn'
    );
    if (existing) {
      showToast('You have already applied for this tuition opportunity.', 'error');
      return false;
    }

    const newApp: Application = {
      id: 'app_' + Date.now(),
      tuitionId,
      tuitionTitle: tuition.title,
      tuitionCode: tuition.code,
      tuitionSalary: tuition.salary,
      tuitionArea: `${tuition.area}, ${tuition.district}`,
      tutorId: currentTutor.id,
      tutorName: currentTutor.name,
      tutorAvatar: currentTutor.avatar,
      tutorUniversity: currentTutor.university,
      tutorRating: currentTutor.rating,
      tutorPhone: currentTutor.phone,
      expectedSalary,
      availability,
      coverLetter,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };

    setApplications((prev) => [newApp, ...prev]);

    // Update applicationsCount on post
    setTuitions((prev) =>
      prev.map((t) => (t.id === tuitionId ? { ...t, applicationsCount: t.applicationsCount + 1 } : t))
    );

    // Notify parent
    addNotification(
      'New Tutor Application!',
      `${currentTutor.name} (${currentTutor.university}) applied for your tuition ${tuition.code} in ${tuition.area}.`,
      'application',
      tuition.parentId,
      '/dashboard'
    );

    showToast('Application submitted successfully! The parent will review your profile.', 'success');
    return true;
  };

  const updateApplicationStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updated = { ...app, status: newStatus, reviewedAt: new Date().toISOString() };
          // Notify tutor
          const tutor = tutors.find((t) => t.id === app.tutorId);
          if (tutor) {
            addNotification(
              `Application ${newStatus.toUpperCase()}`,
              `Your application for tuition ${app.tuitionCode} has been marked as ${newStatus}.`,
              'status_change',
              tutor.userId,
              '/tutor-dashboard'
            );
          }
          return updated;
        }
        return app;
      })
    );
    showToast(`Application marked as ${newStatus}.`, 'info');
  };

  const withdrawApplication = (appId: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'withdrawn' } : a))
    );
    showToast('Application withdrawn.', 'info');
  };

  const requestTutor = (
    tutorId: string,
    subject: string,
    studentClass: string,
    message: string,
    phone: string
  ) => {
    const tutor = getTutorById(tutorId);
    if (!tutor) return;

    const newReq: TutorRequest = {
      id: 'req_' + Date.now(),
      studentId: currentUser?.id || 'guest_student',
      studentName: currentUser?.name || 'Parent / Student',
      studentPhone: phone,
      tutorId,
      tutorName: tutor.name,
      subject,
      studentClass,
      area: tutor.preferredLocations[0] || 'Dhaka',
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setTutorRequests((prev) => [newReq, ...prev]);

    // Notify tutor
    addNotification(
      'New Direct Tutor Request!',
      `${newReq.studentName} has sent you a direct request for ${subject} (${studentClass}).`,
      'request',
      tutor.userId,
      '/tutor-dashboard'
    );

    showToast(`Request sent to ${tutor.name}! They will contact you shortly.`, 'success');
  };

  const updateTutorRequestStatus = (requestId: string, status: 'accepted' | 'declined') => {
    setTutorRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
    showToast(`Request ${status}.`, 'info');
  };

  const respondToDirectRequest = (requestId: string, status: 'accepted' | 'rejected' | 'declined') => {
    setTutorRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: status === 'rejected' ? 'declined' : (status as any) }
          : r
      )
    );
    showToast(`Request ${status}.`, 'info');
  };

  const toggleSaveTutor = (tutorId: string) => {
    setSavedTutorIds((prev) => {
      const exists = prev.includes(tutorId);
      const next = exists ? prev.filter((id) => id !== tutorId) : [...prev, tutorId];
      showToast(exists ? 'Removed tutor from saved list' : 'Tutor saved to your list!', 'info');
      return next;
    });
  };

  const toggleSaveTuition = (tuitionId: string) => {
    setSavedTuitionIds((prev) => {
      const exists = prev.includes(tuitionId);
      const next = exists ? prev.filter((id) => id !== tuitionId) : [...prev, tuitionId];
      showToast(exists ? 'Removed tuition from bookmarks' : 'Tuition bookmarked!', 'info');
      return next;
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read', 'info');
  };

  const addNotification = (
    title: string,
    message: string,
    type: Notification['type'],
    userId?: string,
    link?: string
  ) => {
    const newNotif: Notification = {
      id: 'notif_' + Date.now() + Math.random().toString(36).substr(2, 3),
      userId: userId || currentUser?.id || 'user_all',
      title,
      message,
      type,
      isRead: false,
      link,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const unreadNotifsCount = notifications.filter(
    (n) => (!currentUser || n.userId === currentUser.id || n.userId === 'user_all') && !n.isRead
  ).length;

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim() || !currentUser) return;

    const conv = conversations.find((c) => c.id === conversationId);
    if (!conv) return;

    const receiverId = conv.participantIds.find((id) => id !== currentUser.id) || conv.participantIds[0];

    const newMsg: Message = {
      id: 'msg_' + Date.now(),
      conversationId,
      senderId: currentUser.id,
      receiverId,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setMessages((prev) => [...prev, newMsg]);

    // Update conversation last message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: text.trim(),
              lastTimestamp: new Date().toISOString(),
              unreadCount: c.unreadCount + 1,
            }
          : c
      )
    );
  };

  const startOrGetConversation = (
    targetUserId: string,
    targetName: string,
    targetAvatar: string,
    targetRole: Role
  ): string => {
    if (!currentUser) return '';

    const existing = conversations.find(
      (c) => c.participantIds.includes(currentUser.id) && c.participantIds.includes(targetUserId)
    );

    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const newConvId = 'conv_' + Date.now();
    const newConv: Conversation = {
      id: newConvId,
      participantIds: [currentUser.id, targetUserId],
      participants: {
        [currentUser.id]: {
          name: currentUser.name,
          avatar: currentUser.avatar,
          role: currentUser.role,
          online: true,
        },
        [targetUserId]: {
          name: targetName,
          avatar: targetAvatar,
          role: targetRole,
          online: true,
        },
      },
      lastMessage: 'Started conversation',
      lastTimestamp: new Date().toISOString(),
      unreadCount: 0,
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConvId);
    return newConvId;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        setCurrentUser,
        switchDemoRole,
        login,
        registerUser,
        logout,
        tutors,
        getTutorById,
        updateTutorProfile,
        toggleVerifyTutor,
        verifyTutor,
        tuitions,
        getTuitionById,
        createTuitionPost,
        postNewTuition: createTuitionPost,
        updateTuitionStatus,
        deleteTuitionPost,
        applications,
        applyForTuition,
        updateApplicationStatus,
        withdrawApplication,
        tutorRequests,
        directRequests: tutorRequests,
        requestTutor,
        updateTutorRequestStatus,
        respondToDirectRequest,
        savedTutorIds,
        savedTuitionIds,
        toggleSaveTutor,
        toggleSaveTuition,
        notifications,
        unreadNotifsCount,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        conversations,
        messages,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        startOrGetConversation,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
