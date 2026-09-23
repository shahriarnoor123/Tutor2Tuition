import React, { useState } from 'react';
import { useAppStore } from '../services/store';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useAppStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('Your message has been received! Our support team will get in touch shortly.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Customer Support & Helpline
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#102A43]">
            We're Here to Help You
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Have questions about finding a tutor, publishing a tuition requirement, or verifying your tutor profile? Reach out to our Dhaka support desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Information (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-[#102A43]">Dhaka Support Office</h2>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1769E0] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Headquarters</p>
                  <p className="text-slate-500">House 42, Road 9/A, Dhanmondi, Dhaka 1209, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#1769E0] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Direct Helpline</p>
                  <p className="text-slate-500">+880 9612-889900</p>
                  <p className="text-slate-500">+880 1700-000000 (WhatsApp available)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#1769E0] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Email Address</p>
                  <p className="text-slate-500">support@tutor2tuition.com</p>
                  <p className="text-slate-500">verification@tutor2tuition.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#1769E0] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Working Hours</p>
                  <p className="text-slate-500">Saturday – Thursday: 9:00 AM – 8:00 PM</p>
                  <p className="text-slate-500">Friday: 2:00 PM – 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Thank You! Message Sent</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Our customer service specialist will review your request and contact you within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold text-[#102A43] mb-2">Send Us a Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number (+880)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                      placeholder="+880 1XXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reason for Contact</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Tutor Verification">Tutor Verification Support</option>
                      <option value="Guardian Support">Guardian / Posting Assistance</option>
                      <option value="Payment or Report">Dispute or Quality Report</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1769E0]"
                    placeholder="How can we assist you today?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs text-[#102A43] bg-[#FFD43B] hover:bg-[#f6cb2c] shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
