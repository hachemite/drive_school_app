import React, { useEffect, useState } from 'react';
import { Item } from '../../types/item';
import { getSessionId, getDeviceType } from '../../utils/session';
import { trackFileAction, fetchFileStats } from '../../services/drive.service';
import { X, Download, Eye, Users, Clock, FileText, Image, Video, Music, FileArchive } from 'lucide-react';
import './FileViewerModal.css';

interface FileViewerModalProps {
  file: Item | null;
  onClose: () => void;
  addRecentItem: (item: Item, driveName: string) => void;
  driveName?: string;
}

const FileViewerModal: React.FC<FileViewerModalProps> = ({ file, onClose, addRecentItem, driveName = 'default' }) => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const [fileStats, setFileStats] = useState<any>(null);

  const getFileColor = (mimeType: string) => {
    if (mimeType.includes('image/')) return '#F1A7A1';
    if (mimeType.includes('video/')) return '#ADB2D4';
    if (mimeType.includes('audio/')) return '#F1C6D4';
    if (mimeType.includes('pdf')) return '#F6B93B';
    if (mimeType.includes('word') || mimeType.includes('document')) return '#C7D9DD';
    return '#D5E5D5';
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('image/')) return <Image size={24} />;
    if (mimeType.includes('video/')) return <Video size={24} />;
    if (mimeType.includes('audio/')) return <Music size={24} />;
    if (mimeType.includes('pdf')) return <FileText size={24} />;
    return <FileArchive size={24} />;
  };

  const extractFileId = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/[-\w]{25,}/);
    return match ? match[0] : null;
  };

  const handleDownload = async () => {
    if (!file?.id) return;
    
    await trackFileAction(file.id, 'download', {
      sessionId: getSessionId(),
      deviceType: getDeviceType(),
      driveName,
      fileName: file.name
    });

    if (file.webContentLink) {
      window.open(file.webContentLink, '_blank');
    }
  };

  useEffect(() => {
    if (!file) return;

    // Track view action (fire and forget)
    trackFileAction(file.id, 'view', {
      sessionId: getSessionId(),
      deviceType: getDeviceType(),
      driveName,
      fileName: file.name
    }).catch(console.error);

    // Load stats (fire and forget)
    fetchFileStats(file.id)
      .then(setFileStats)
      .catch(console.error);

    const fileId = extractFileId(file.webViewLink || file.webContentLink);

    // Set content based on file type
    if (file.mimeType.includes('image/')) {
      setContent(
        <div className="image-container">
          <img 
            src={`https://drive.google.com/uc?export=view&id=${fileId}`}
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
        <div className="video-container">
          <video 
            src={file.webContentLink} 
            controls 
          />
        </div>
      );
    }
    else if (fileId) {
      setContent(
        <div className="iframe-container">
          <iframe 
            src={`https://docs.google.com/viewer?srcid=${fileId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
            title={file.name}
          />
        </div>
      );
    } else {
      setContent(
        <div className="fallback-content">
          <p>Preview not available</p>
          {file.webContentLink && (
            <button onClick={handleDownload} className="download-btn">
              <Download size={16} /> Download File
            </button>
          )}
        </div>
      );
    }

    addRecentItem(file, driveName);
  }, [file]);

  if (!file) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
      <div className="modal-header" style={{ backgroundColor: getFileColor(file.mimeType) }}>
  <div className="file-info">
    <div className="file-icon">
      {getFileIcon(file.mimeType)}
    </div>
    <div className="file-name-wrapper">
      <h3>{file.name}</h3>
      <p className="file-type">{file.mimeType}</p>
    </div>
  </div>
  <button className="close-btn" onClick={onClose} aria-label="Close">
    <X size={24} />
  </button>
</div>
        <div className="modal-body">
          {content}
        </div>

        <div className="modal-footer">
          <div className="file-stats">
            <div className="stat-item">
              <Eye size={16} />
              <span>{fileStats?.views || 0}</span>
            </div>
            <div className="stat-item">
              <Download size={16} />
              <span>{fileStats?.downloads || 0}</span>
            </div>
            <div className="stat-item">
              <Users size={16} />
              <span>{fileStats?.uniqueSessions || 0}</span>
            </div>
            {fileStats?.lastAccess && (
              <div className="stat-item">
                <Clock size={16} />
                <span>{new Date(fileStats.lastAccess).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="action-buttons">
            {file.webContentLink && (
              <button onClick={handleDownload} className="download-btn">
                <Download size={16} /> Download
              </button>
            )}
            <button onClick={onClose} className="close-btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileViewerModal;