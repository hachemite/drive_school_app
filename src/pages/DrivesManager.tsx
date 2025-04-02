// File: drive_school_app/src/pages/DrivesPage.tsx
import React, { useState, useEffect } from 'react';
import { getDrives, addDrive } from '../api/driveApi';
import { getAuthToken } from '../utils/auth';
import { 
  HardDrive, 
  Folder, 
  EnvelopeSimple, 
  Key, 
  Star, 
  Plus, 
  Spinner,
  Trash,
  PencilSimple
} from '@phosphor-icons/react';

interface DriveConfig {
  _id: string;
  driveName: string;
  folderId: string;
  clientEmail: string;
  privateKey: string;
  isDefault: boolean;
}

const DrivesManager: React.FC = () => {
  const [drives, setDrives] = useState<DriveConfig[]>([]);
  const [formData, setFormData] = useState({
    driveName: '',
    folderId: '',
    clientEmail: '',
    privateKey: '',
    isDefault: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        setLoading(true);
        const token = getAuthToken();
        if (!token) throw new Error('Not authenticated');
        
        const data = await getDrives();
        setDrives(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load drives');
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
      setError('');
      setSuccess('');
      
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
      setSuccess('Drive added successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to add drive');
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
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <HardDrive size={32} className="text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Drive Configurations</h1>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
          {success}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Drive Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Plus size={24} className="text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-700">Add New Drive</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <div className="flex items-center">
                  <HardDrive size={18} className="mr-2" />
                  Drive Name
                </div>
              </label>
              <input
                type="text"
                name="driveName"
                value={formData.driveName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <div className="flex items-center">
                  <Folder size={18} className="mr-2" />
                  Folder ID
                </div>
              </label>
              <input
                type="text"
                name="folderId"
                value={formData.folderId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <div className="flex items-center">
                  <EnvelopeSimple size={18} className="mr-2" />
                  Client Email
                </div>
              </label>
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                <div className="flex items-center">
                  <Key size={18} className="mr-2" />
                  Private Key
                </div>
              </label>
              <div className="relative">
                <input
                  type={showPrivateKey ? "text" : "password"}
                  name="privateKey"
                  value={formData.privateKey}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showPrivateKey ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 flex items-center text-gray-700">
                <Star size={18} className="mr-1" weight={formData.isDefault ? "fill" : "regular"} />
                Set as default drive
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
            >
              {loading ? (
                <>
                  <Spinner size={20} className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Plus size={20} className="mr-2" />
                  Add Drive
                </>
              )}
            </button>
          </form>
        </div>

        {/* Existing Drives List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <HardDrive size={24} className="text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-700">Existing Drives</h2>
          </div>

          {loading && drives.length === 0 ? (
            <div className="flex justify-center py-8">
              <Spinner size={32} className="animate-spin text-blue-600" />
            </div>
          ) : drives.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No drives configured yet
            </div>
          ) : (
            <div className="space-y-4">
              {drives.map((drive) => (
                <div key={drive._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium flex items-center">
                        {drive.driveName}
                        {drive.isDefault && (
                          <Star size={18} weight="fill" className="text-yellow-500 ml-2" />
                        )}
                      </h3>
                      <div className="text-sm text-gray-600 mt-1 space-y-1">
                        <p className="flex items-center">
                          <Folder size={14} className="mr-1" />
                          {drive.folderId}
                        </p>
                        <p className="flex items-center">
                          <EnvelopeSimple size={14} className="mr-1" />
                          {drive.clientEmail}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <PencilSimple size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrivesManager;