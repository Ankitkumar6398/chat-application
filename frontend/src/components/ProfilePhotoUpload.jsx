import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiCamera, FiX } from 'react-icons/fi';

const ProfilePhotoUpload = ({ isOpen, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const { authUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const BASE_URL = "http://localhost:8080";

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error('Please select a file first');
            return;
        }

        setIsUploading(true);
        try {
            // For now, we'll use a simple approach with a data URL
            // In a real app, you'd upload to a service like Cloudinary, AWS S3, etc.
            const formData = new FormData();
            formData.append('image', selectedFile);

            // For demo purposes, we'll use the preview URL as the profile photo
            // In production, you'd upload to a service and get back a URL
            const profilePhotoUrl = previewUrl;

            const response = await axios.put(
                `${BASE_URL}/api/v1/user/profile-photo`,
                { profilePhoto: profilePhotoUrl },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                dispatch(setAuthUser(response.data.user));
                toast.success('Profile photo updated successfully!');
                onClose();
                setSelectedFile(null);
                setPreviewUrl('');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile photo');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemovePhoto = async () => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/v1/user/profile-photo`,
                { profilePhoto: '' },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                dispatch(setAuthUser(response.data.user));
                toast.success('Profile photo removed successfully!');
                onClose();
            }
        } catch (error) {
            console.error('Remove error:', error);
            toast.error(error.response?.data?.message || 'Failed to remove profile photo');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Update Profile Photo</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Current Profile Photo */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                                {authUser?.profilePhoto ? (
                                    <img
                                        src={authUser.profilePhoto}
                                        alt="Current profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white font-semibold">
                                        {authUser?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Choose New Photo
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FiCamera className="w-8 h-8 mb-2 text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Preview */}
                    {previewUrl && (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Preview
                            </label>
                            <div className="flex justify-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                        {authUser?.profilePhoto && (
                            <button
                                onClick={handleRemovePhoto}
                                className="flex-1 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                Remove Photo
                            </button>
                        )}
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || isUploading}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isUploading ? 'Uploading...' : 'Upload Photo'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePhotoUpload; 