// File: drive_school_app/src/pages/DrivesPage.tsx
import React, { useState, useEffect } from 'react';
import { getDrives,addDrive } from '../api/driveApi';
import { getAuthToken } from '../utils/auth';
interface DriveConfig {
  _id: string;
  driveName: string;
  folderId: string;
  clientEmail: string;
  privateKey: string;
  isDefault: boolean;
  
}
interface DrivesManagerProps {
  token: string;
}


const DrivesManager: React.FC<DrivesManagerProps> = ({ token }) => {
  const [drives, setDrives] = useState<DriveConfig[]>([]);
  const [formData, setFormData] = useState({
    driveName: '',
    folderId: '',
    clientEmail: '',
    privateKey: '',
    isDefault: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        setLoading(true);
        const token = getAuthToken();
        if (!token) throw new Error('Not authenticated');
        
        const data = await getDrives();
        setDrives(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDrives();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = getAuthToken();
      if (!token) throw new Error('Not authenticated');
      
      const newDrive = await addDrive(formData, token);
      setDrives([...drives, newDrive]);
      setFormData({
        driveName: '',
        folderId: '',
        clientEmail: '',
        privateKey: '',
        isDefault: false,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="drives-page">
      <h1>Manage Drive Configurations</h1>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="drive-form">
        <h2>Add New Drive</h2>
        <div className="form-group">
          <label>Drive Name:</label>
          <input
            type="text"
            name="driveName"
            value={formData.driveName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Folder ID:</label>
          <input
            type="text"
            name="folderId"
            value={formData.folderId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Client Email:</label>
          <input
            type="text"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Private Key:</label>
          <input
            type="text"
            name="privateKey"
            value={formData.privateKey}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            Set as default drive
          </label>
        </div>
        <button type="submit" className="submit-button">
          Add Drive
        </button>
      </form>

      <div className="drives-list">
        <h2>Existing Drives</h2>
        {drives.length === 0 ? (
          <p>No drives configured</p>
        ) : (
          <ul>
            {drives.map((drive) => (
              <li key={drive._id}>
                <h3>{drive.driveName} {drive.isDefault && '(Default)'}</h3>
                <p>Folder ID: {drive.folderId}</p>
                <p>Client Email: {drive.clientEmail}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DrivesManager;