import React, { useEffect, useState } from 'react';
import { Item } from '../../types/item';
import './FileViewerModal.css'; // Import the CSS file

interface FileViewerModalProps {
  file: Item | null;
  onClose: () => void;
  addRecentItem: (item: Item, driveName: string) => void;
  driveName?: string;
}

const FileViewerModal: React.FC<FileViewerModalProps> = ({ file, onClose ,  addRecentItem, driveName = 'default' }) => {
  const [content, setContent] = useState<React.ReactElement | null>(null);
  
  // Track file access (can be implemented with your tracking logic)
  const trackFile = (fileId: string) => {
    console.log(`File accessed: ${fileId}`);
    // Implement your tracking logic here
  };

  useEffect(() => {
    if (!file) return;
    
    // Track the file access
    trackFile(file.id);
    if (driveName) {
      addRecentItem(file, driveName);
    }
    // Generate preview content based on file type
    if (file.mimeType.includes('image/')) {
      setContent(
        <img 
          src={file.webContentLink} 
          className="img-fluid preview-container" 
          alt={file.name}
        />
      );
    } 
    else if (file.mimeType.includes('video/')) {
      setContent(
        <video 
          src={file.webContentLink} 
          controls 
          className="preview-container"
        />
      );
    } 
    else if (file.mimeType.includes('audio/')) {
      setContent(
        <audio 
          src={file.webContentLink} 
          controls 
          className="w-100"
        />
      );
    } 
    else if (file.mimeType === 'application/pdf') {
      setContent(
        <iframe 
          src={`https://docs.google.com/gview?url=${encodeURIComponent(file.webContentLink || '')}&embedded=true`} 
          className="preview-iframe"
          title={file.name}
        />
      );
    } 
    else if (file.mimeType.includes('text/') || file.mimeType.includes('application/json')) {
      // For text files, we'll fetch the content
      const fetchTextContent = async () => {
        try {
          const response = await fetch(file.webContentLink || '');
          const text = await response.text();
          setContent(
            <pre className="bg-light p-3" style={{ maxHeight: '60vh', overflow: 'auto' }}>
              {text}
            </pre>
          );
        } catch (error) {
          setContent(
            <div className="alert alert-danger">
              Error loading text content: {error instanceof Error ? error.message : 'Unknown error'}
            </div>
          );
        }
      };
      
      fetchTextContent();
    } 
    else if (file.mimeType.includes('vnd.google-apps.')) {
      setContent(
        <iframe 
          src={`https://docs.google.com/document/d/${file.id}/preview`} 
          className="preview-iframe"
          title={file.name}
        />
      );
    } 
    else {
      setContent(
        <div className="alert alert-info">
          <p>This file type cannot be previewed directly.</p>
          <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
            Open in Drive
          </a>
        </div>
      );
    }
  }, [file]);

  if (!file) return null;

  return (
    <div className={`file-modal-overlay ${file ? 'active' : ''}`} onClick={onClose}>
      <div className="file-modal-container" onClick={e => e.stopPropagation()}>
        <div className="file-modal-header">
          <h3 className="file-modal-title">{file?.name}</h3>
          <button className="file-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="file-modal-body">
          {content}
        </div>
        <div className="file-modal-footer">
          {file?.webContentLink && (
            <a 
              href={file.webContentLink} 
              download={file.name} 
              className="file-modal-download-btn"
            >
              Download
            </a>
          )}
          <button className="file-modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default FileViewerModal;