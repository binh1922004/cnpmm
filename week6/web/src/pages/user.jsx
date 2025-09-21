import React, { useState, useEffect } from 'react';
import { getAllUsersAPI, deleteUserAPI, createUserAPI, updateUserAPI } from '../components/util/api';
import { useAuth } from '../components/context/auth.context';
import FuzzySearch from 'fuzzy-search';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { user: currentUser, isAuthenticated } = useAuth();
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetchUsers();
    }, [pagination.page, pagination.limit]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllUsersAPI({
                page: pagination.page,
                limit: pagination.limit
            });

            if (response.data.users) {
                setUsers(response.data.users);
                setPagination(prev => ({
                    ...prev,
                    total: response.data.total,
                    totalPages: response.data.totalPages
                }));
            } else {
                setUsers(response.data);
            }
        } catch (error) {
            setError('Failed to fetch users');
            console.error('Fetch users error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            await deleteUserAPI(userId);
            fetchUsers();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to delete user');
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            password: ''
        });
        setShowModal(true);
    };

    const handleCreate = () => {
        setEditingUser(null);
        setFormData({
            username: '',
            email: '',
            password: ''
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await updateUserAPI(editingUser._id, {
                    username: formData.username,
                    email: formData.email
                });
            } else {
                await createUserAPI(formData);
            }
            
            setShowModal(false);
            fetchUsers();
        } catch (error) {
            setError(error.response?.data?.message || 'Operation failed');
        }
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const canEditUser = (user) => {
        return isAuthenticated && currentUser && currentUser._id === user._id;
    };

    const searcher = new FuzzySearch(users, ["username"], { caseSensitive: false });
    const results = query ? searcher.search(query) : users;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header Section */}
            <div className="bg-gradient-to-rx to-cyan-500 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                        <div className="text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl border border-white/30">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight">
                                User Management
                            </h1>
                            <p className="text-xl text-white/90 font-medium max-w-2xl">
                                Efficiently manage your team members and user accounts with our comprehensive dashboard
                            </p>
                            <div className="flex items-center justify-center lg:justify-start mt-6 space-x-6 text-white/80">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium">{pagination.total} Active Users</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                                    <span className="text-sm font-medium">Real-time Updates</span>
                                </div>
                            </div>
                        </div>
                        
                        {isAuthenticated && (
                            <div className="flex justify-center lg:justify-end">
                                <button 
                                    onClick={handleCreate}
                                    className="group relative inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-emerald-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    <svg className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="relative z-10">Add New User</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Decorative bottom wave */}
                <div className="relative">
                    <svg className="w-full h-6 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-1">
                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-1">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search users by username..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <span className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                {pagination.total} total users
                            </span>
                        </div>
                    </div>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6 mb-8">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-red-700 font-medium">{error}</span>
                        </div>
                    </div>
                )}

                {/* Users Grid/List */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600 text-lg">Loading users...</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <div className="grid grid-cols-12 gap-4 items-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <div className="col-span-4">User</div>
                                <div className="col-span-3">Email</div>
                                <div className="col-span-2">Joined</div>
                                <div className="col-span-2">Status</div>
                                {isAuthenticated && <div className="col-span-1 text-right">Actions</div>}
                            </div>
                        </div>

                        {/* User List */}
                        <div className="divide-y divide-gray-100">
                            {results.map(user => (
                                <div key={user._id} className="px-6 py-6 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        {/* User Info */}
                                        <div className="col-span-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                                                        <span className="text-white font-bold text-lg">
                                                            {user.username.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-lg font-semibold text-gray-900 truncate">{user.username}</p>
                                                    <p className="text-sm text-gray-500 truncate">ID: {user._id.slice(-8)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="col-span-3">
                                            <p className="text-gray-900 truncate">{user.email}</p>
                                        </div>

                                        {/* Created Date */}
                                        <div className="col-span-2">
                                            <div>
                                                <p className="text-gray-900 font-medium">
                                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(user.createdAt).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Status */}
                                        <div className="col-span-2">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                                Active
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-1 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button 
                                                    onClick={() => handleEdit(user)}
                                                    className="inline-flex items-center p-2 bg-blue-100 hover:bg-blue-200 text-white rounded-lg transition-colors duration-200"
                                                    title="Edit user"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(user._id)}
                                                    className="inline-flex items-center p-2 bg-red-100 hover:bg-red-200 text-white rounded-lg transition-colors duration-200"
                                                    title="Delete user"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                                    <div className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(pagination.page * pagination.limit, pagination.total)}
                                        </span> of{' '}
                                        <span className="font-medium">{pagination.total}</span> results
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            disabled={pagination.page === 1}
                                            onClick={() => handlePageChange(pagination.page - 1)}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Previous
                                        </button>
                                        
                                        <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg">
                                            Page {pagination.page} of {pagination.totalPages}
                                        </span>
                                        
                                        <button 
                                            disabled={pagination.page === pagination.totalPages}
                                            onClick={() => handlePageChange(pagination.page + 1)}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal for Create/Edit */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {editingUser ? 'Edit User' : 'Create New User'}
                                </h3>
                            </div>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="px-8 py-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="Enter username"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="Enter email address"
                                    />
                                </div>
                                
                                {!editingUser && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="Enter password"
                                        />
                                    </div>
                                )}
                                
                                <div className="flex space-x-4 pt-6">
                                    <button 
                                        type="button" 
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        {editingUser ? 'Update User' : 'Create User'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPage;