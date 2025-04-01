import React, { useState } from 'react';


    const QuestionButton = ({ 
      instructorEmail = process.env.REACT_APP_EMAIL,
      googleFormId = process.env.REACT_APP_FORM_ID, // Extract the form ID from your URL
      subjectPrefix = "Question about: ",
      courseName = "React Course"
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [subject, setSubject] = useState(`${subjectPrefix}${courseName}`);
  const [message, setMessage] = useState('');

  // Use the long-form Google Forms URL instead of the short URL
  const fullGoogleFormUrl = `https://docs.google.com/forms/d/e/${googleFormId}/viewform`;

  const handleAddQuestion = () => {
    setShowOptions(!showOptions);
    if (showEmailForm) setShowEmailForm(false);
  };

  const openGoogleForm = () => {
    window.open(fullGoogleFormUrl, '_blank');
    setShowOptions(false);
  };

  const toggleEmailForm = () => {
    setShowEmailForm(!showEmailForm);
  };

  const sendEmail = () => {
    const mailtoLink = `mailto:${instructorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
    setShowEmailForm(false);
    setShowOptions(false);
    setMessage('');
  };

  return (
    <div className="p-4 max-w-md">
      <button 
        onClick={handleAddQuestion}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center"
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        Add a Question
      </button>

      {showOptions && (
        <div className="mt-2 p-3 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="mb-3 text-sm font-medium text-gray-700">How would you like to submit your question?</div>
          <div className="flex flex-col gap-2">
            <button 
              onClick={openGoogleForm}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.5 4.5c-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.45 0-2.5 1.05-2.5 2.5v12.5c0 .65.55 1.2 1.2 1.2h.3c.25 0 .5-.1.7-.29C7.55 19.56 9.4 19 11 19s3.45.56 5.1 1.41c.2.19.45.29.7.29h.3c.65 0 1.2-.55 1.2-1.2V7c0-1.45-1.05-2.5-2.5-2.5zm0 14c-1.1 0-2.2.2-3.2.6-1.1.4-2.2.6-3.3.6s-2.2-.2-3.2-.6c-1-.4-2.1-.6-3.3-.6V7c0-.55.45-1 1-1 1.5 0 3 .4 4.3 1.2.35.22.75.22 1.1 0 1.3-.8 2.8-1.2 4.3-1.2.55 0 1 .45 1 1v11.5c-1.1 0-2.2.2-3.2.6z" />
              </svg>
              Google Forms
            </button>
            <button 
              onClick={toggleEmailForm}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Email Instructor
            </button>
          </div>
        </div>
      )}

      {showEmailForm && (
        <div className="mt-2 p-3 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type your question here..."
            />
          </div>
          <div className="flex justify-end space-x-2">é
            <button 
              onClick={() => setShowEmailForm(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={sendEmail}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm"
            >
              Send Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionButton;