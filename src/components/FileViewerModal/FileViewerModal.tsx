import React, { useEffect, useState } from 'react';
import { Item } from '../../types/item';
import { getSessionId,getDeviceType } from '../../utils/session';
import { trackFileAction ,fetchFileStats } from '../../services/drive.service';
import './FileViewerModal.css';
import { getCurrentUser } from '../../api/authApi';
import { logoutUser } from '../../api/authApi';
import { isAuthenticated } from '../../utils/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';



interface FileViewerModalProps {
  file: Item | null;
  onClose: () => void;
  addRecentItem: (item: Item, driveName: string) => void;
  driveName?: string;
}

interface User {
  role: string;
  username: string;
  _id: string;
}

const FileViewerModal: React.FC<FileViewerModalProps> = ({ file, onClose, addRecentItem, driveName = 'default' }) => {
  const [content, setContent] = useState<React.ReactElement | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [fileStats, setFileStats] = useState<{
    views: number;
    downloads: number;
    previews: number;
    lastAccess: string;
    uniqueSessions: number;
  } | null>(null);

  // Extract file ID from webViewLink or webContentLink
  const extractFileId = (url?: string): string | null => {
    if (!url) return null;
    
    // Match Google Drive file ID pattern
    const match = url.match(/[-\w]{25,}/);
    return match ? match[0] : null;
  };

  const handleDownload = async () => {
    if (!file || !file.id) {
      console.error('Cannot track - file or file.id is missing');
      return;
    }    
    trackFileAction(file.id, 'download', {
      sessionId: getSessionId(),
      userId: await getCurrentUser(),
      deviceType: getDeviceType(),
      driveName,
      fileName: file.name
    });

    // Trigger actual download
    if (file.webContentLink) {
      window.location.href = file.webContentLink;
    }
  };


  
  useEffect(() => {

    if (!file) return;

    const trackView = async () => {


      // Track view action
      trackFileAction(file.id, 'view', {
        sessionId: getSessionId(),
        userId: "anonymous" ,
        deviceType: getDeviceType(),
        driveName: driveName || 'default', // Ensure driveName is never undefined
        fileName: file.name || 'unknown' // Ensure fileName is provided
      });
    }

    trackView();

    // Fetch file statistics
    const loadStats = async () => {
      const fileStats = await fetchFileStats(file.id);
      setFileStats(fileStats);
    };

    loadStats();

    if (driveName) {
      addRecentItem(file, driveName);
    }

    const fileId = extractFileId(file.webViewLink || file.webContentLink);
    // For images, still use direct link for better quality
    if (file.mimeType.includes('image/')) {
      setContent(
        <div className="image-preview-container">
          <img 
            src={`https://drive.google.com/uc?export=view&id=${fileId}`}
  
            className="img-fluid preview-image" 
            alt={file.name}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
            }}
          />
        </div>
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
    else if (fileId) {
      // Use Google Drive Viewer for most other file types
      setContent(
        <iframe 
          src={`https://docs.google.com/viewer?srcid=${fileId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
          className="preview-iframe"
          title={file.name}
        />
      );
    }
    else {
      // Fallback for files without ID or special cases
      setContent(
        <div className="alert alert-info">
          <p>This file type cannot be previewed directly.</p>
          {file.webViewLink && (
            <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
              Open in Drive
            </a>
          )}
          {file.webContentLink && (
            <a 
              href={file.webContentLink} 
              download={file.name} 
              className="btn btn-sm btn-success ms-2"
            >
              Download
            </a>
          )}
        </div>
      );
    }
  }, [file]);  if (!file) return null;

  return (
    <div className={`file-modal-overlay ${file ? 'active' : ''}`} onClick={onClose}>
      <div className="file-modal-container" onClick={e => e.stopPropagation()}>
        <div className="file-modal-header">
          <h3 className="file-modal-title">{file.name}</h3>
          <button className="file-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="file-modal-body">
          {content}
        </div>
        <div className="file-modal-footer">
      {file.webContentLink && (
        <a 
          href={file.webContentLink} 
          download={file.name} 
          className="file-modal-download-btn"
          onClick={handleDownload}
        >
          Download {fileStats?.downloads && `(${fileStats.downloads})`}
        </a>
      )}
      {/* Add stats display if available */}
      {fileStats && (
        <div className="file-stats">
          <span>Views: {fileStats.views}</span>
          <span>Downloads: {fileStats.downloads}</span>
          <span>Unique users: {fileStats.uniqueSessions}</span>
        </div>
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