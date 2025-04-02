import React, { useState } from 'react';
import { Envelope, ChatCircleDots, Users, FilmSlate, GameController, DiscordLogo, GoogleDriveLogo } from '@phosphor-icons/react';

const CommunicationPanel = () => {
  const [activeTab, setActiveTab] = useState<'admin' | 'hobbies' | 'critic'>('admin');
  const [formData, setFormData] = useState({
    email: '',
    privateKey: '',
    folderId: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<{status: 'idle' | 'success' | 'error', message: string}>({
    status: 'idle',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus({status: 'idle', message: ''});
    
    if (!formData.email || !formData.privateKey || !formData.folderId) {
      setSubmitStatus({
        status: 'error',
        message: 'Email, Private Key, and Folder ID are required'
      });
      return;
    }

    // Validate Google Client Email format
    if (!formData.email.endsWith('.iam.gserviceaccount.com')) {
      setSubmitStatus({
        status: 'error',
        message: 'Invalid Google service account email format'
      });
      return;
    }

    // Validate Private Key format
    if (!formData.privateKey.includes('-----BEGIN PRIVATE KEY-----') || 
        !formData.privateKey.includes('-----END PRIVATE KEY-----')) {
      setSubmitStatus({
        status: 'error',
        message: 'Private key must include BEGIN/END PRIVATE KEY markers'
      });
      return;
    }

    // Validate Folder ID format (basic check for alphanumeric)
    if (!/^[a-zA-Z0-9_-]+$/.test(formData.folderId)) {
      setSubmitStatus({
        status: 'error',
        message: 'Folder ID must be alphanumeric'
      });
      return;
    }

    const inputValue: {[key:string]:string} = {
      'Email': formData.email,
      'PrivateKey': formData.privateKey.replace(/\n/g, '\\n'), // Ensure newlines are escaped
      'FolderId': formData.folderId,
      'Message': formData.message || '',
    };

    try {
      const APP_ID = process.env.REACT_APP_GOOGLE_SCRIPT_ID || 'AKfycbzUVmFydAgvLKgF2jxa8Qfbg_zthlH_nYZSXYN1XcEM8AcjnS-LLzBmQXBNQlmClW9Tdg';
      const baseURL = `https://script.google.com/macros/s/${APP_ID}/exec`;
      
      const formDataToSend = new URLSearchParams();
      Object.keys(inputValue).forEach((key) => {
        formDataToSend.append(key, inputValue[key]);
      });
      
      const res = await fetch(baseURL, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const jsonResponse = await res.json();

      if(jsonResponse.result === 'success'){
        setSubmitStatus({
          status: 'success',
          message: `Your request has been submitted successfully! Row: ${jsonResponse.row}`
        });
        setFormData({
          email: '',
          privateKey: '',
          folderId: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          status: 'error',
          message: `Failed to submit your request: ${jsonResponse.error || 'Unknown error'}`
        });
      }
    } catch(e) {
      setSubmitStatus({
        status: 'error',
        message: 'An error occurred. Please try again later.'
      });
      console.error('Error during fetch:', e);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-[#EEF1DA] shadow-lg">
      <h1 className="text-3xl font-bold text-[#5a5f7c] mb-6 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        Connect With Us
      </h1>

      {/* Tab Navigation */}
      <div className="flex mb-6 border-b border-[#C7D9DD]">
        <button
          onClick={() => setActiveTab('admin')}
          className={`px-4 py-2 font-medium ${activeTab === 'admin' ? 'text-[#F6B93B] border-b-2 border-[#F6B93B]' : 'text-[#ADB2D4]'}`}
        >
          <div className="flex items-center gap-2">
            <GoogleDriveLogo size={20} weight="fill" />
            Drive Admin Access
          </div>
        </button>
        <button
          onClick={() => setActiveTab('hobbies')}
          className={`px-4 py-2 font-medium ${activeTab === 'hobbies' ? 'text-[#F6B93B] border-b-2 border-[#F6B93B]' : 'text-[#ADB2D4]'}`}
        >
          <div className="flex items-center gap-2">
            <Users size={20} weight="fill" />
            Find Friends
          </div>
        </button>
        <button
          onClick={() => setActiveTab('critic')}
          className={`px-4 py-2 font-medium ${activeTab === 'critic' ? 'text-[#F6B93B] border-b-2 border-[#F6B93B]' : 'text-[#ADB2D4]'}`}
        >
          <div className="flex items-center gap-2">
            <ChatCircleDots size={20} weight="fill" />
            Critic
          </div>
        </button>
      </div>

      {/* Admin Access Panel */}
      {activeTab === 'admin' && (
        <div className="space-y-6">
          <div className="bg-[#D5E5D5] p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-[#5a5f7c] mb-2 flex items-center gap-2">
              <Envelope size={24} weight="fill" className="text-[#F6B93B]" />
              Email Admin
            </h2>
            <p className="text-[#5a5f7c] mb-4">
              Need admin access? Email us at <span className="font-semibold text-[#F1A7A1]">{process.env.REACT_APP_ADMIN_EMAIL}</span> with your request.
            </p>
            <a 
              href={`mailto:${process.env.REACT_APP_ADMIN_EMAIL}`}
              className="inline-flex items-center px-4 py-2 bg-[#F6B93B] hover:bg-[#FAD7A1] text-white rounded-lg transition-colors"
            >
              <Envelope size={16} weight="fill" className="mr-2" />
              Open Email
            </a>
          </div>

          <div className="bg-[#F9E4B7] p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-[#5a5f7c] mb-2 flex items-center gap-2">
              <ChatCircleDots size={24} weight="fill" className="text-[#F1A7A1]" />
              Request New Drive
            </h2>
            
            {submitStatus.status === 'success' && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                {submitStatus.message}
              </div>
            )}
            
            {submitStatus.status === 'error' && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5a5f7c] mb-1">Google Client Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={process.env.REACT_APP_GOOGLE_CLIENT_EMAIL}
                    className="w-full px-3 py-2 rounded-lg border border-[#C7D9DD] focus:ring-2 focus:ring-[#F6B93B] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5a5f7c] mb-1">Google Private Key</label>
                  <input
                    type="password"
                    name="privateKey"
                    value={formData.privateKey}
                    onChange={handleInputChange}
                    placeholder="Enter your private key"
                    className="w-full px-3 py-2 rounded-lg border border-[#C7D9DD] focus:ring-2 focus:ring-[#F6B93B] focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a5f7c] mb-1">Default Folder ID</label>
                <input
                  type="text"
                  name="folderId"
                  value={formData.folderId}
                  onChange={handleInputChange}
                  placeholder="Enter your Google Drive folder ID"
                  className="w-full px-3 py-2 rounded-lg border border-[#C7D9DD] focus:ring-2 focus:ring-[#F6B93B] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a5f7c] mb-1">Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-[#C7D9DD] focus:ring-2 focus:ring-[#F6B93B] focus:border-transparent"
                  placeholder="Tell us about your use case..."
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-[#F1A7A1] hover:bg-[#F1C6D4] text-white rounded-lg transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hobbies Panel */}
      {activeTab === 'hobbies' && (
        <div className="space-y-6">
          <div className="bg-[#F1C6D4] p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-[#5a5f7c] mb-2 flex items-center gap-2">
              <DiscordLogo size={24} weight="fill" className="text-[#ADB2D4]" />
              Gaming & Anime Discord
            </h2>
            <p className="text-[#5a5f7c] mb-4">
              Join our community of gaming and anime enthusiasts! Multiplayer sessions, watch parties, and more.
            </p>
            <a 
              href={process.env.REACT_APP_DISCORD}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-[#ADB2D4] hover:bg-[#C7D9DD] text-white rounded-lg transition-colors"
            >
              <DiscordLogo size={16} weight="fill" className="mr-2" />
              Join Discord
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FAD7A1] p-4 rounded-lg">
              <h3 className="font-medium text-[#5a5f7c] mb-2 flex items-center gap-2">
                <GameController size={20} weight="fill" className="text-[#F6B93B]" />
              Gaming
              </h3>
              <p className="text-sm text-[#5a5f7c] mb-3">
                Join our Discord community to enjoy multiplayer gaming sessions featuring popular titles like Lethal Company, Valorant, co-op games through Parsec (including Ryujinx and Yuzu emulators), Nintendo Switch games, Codenames, and many more exciting options!
              </p>              <span className="text-xs text-[#ADB2D4]">Friend username: {process.env.REACT_APP_DISCORD_USERNAME}</span>
            </div>
            <div className="bg-[#C7D9DD] p-4 rounded-lg">
              <h3 className="font-medium text-[#5a5f7c] mb-2 flex items-center gap-2">
                <FilmSlate size={20} weight="fill" className="text-[#F1A7A1]" />
                Movie Nights
              </h3>
              <p className="text-sm text-[#5a5f7c] mb-3">
                Weekly anime and movie watch parties with live chat.
              </p>
              <span className="text-xs text-[#ADB2D4]">{process.env.REACT_APP_MOVIE_NIGHT_TIME}</span>
            </div>
          </div>
        </div>
      )}

      {/* Critic Panel */}
      {activeTab === 'critic' && (
        <div className="space-y-6">
          <div className="bg-[#F1C6D4] p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-[#5a5f7c] mb-2 flex items-center gap-2">
              <ChatCircleDots size={24} weight="fill" className="text-[#ADB2D4]" />
              Share Your Feedback
            </h2>
            <p className="text-[#5a5f7c] mb-4">
              Help us improve by sharing your thoughts and suggestions about our services.
            </p>
            <textarea
              className="w-full px-3 py-2 rounded-lg border border-[#C7D9DD] focus:ring-2 focus:ring-[#F6B93B] focus:border-transparent"
              rows={4}
              placeholder="Your feedback here..."
            />
            <button
              className="mt-4 px-6 py-2 bg-[#F1A7A1] hover:bg-[#F1C6D4] text-white rounded-lg transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationPanel;