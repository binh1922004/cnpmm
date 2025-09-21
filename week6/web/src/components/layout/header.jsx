import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setIsUserMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 shadow-2xl border-b border-emerald-400/30 sticky top-0 z-50">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black/5">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-4 group">
                            <div className="relative">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl border border-white/30 transform group-hover:scale-110 transition-all duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-2xl font-extrabold text-white leading-tight">
                                    UserHub
                                </h1>
                                <p className="text-emerald-100 text-sm font-medium">Management Platform</p>
                            </div>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                        <Link 
                            to="/" 
                            className="relative px-5 py-3 text-white/90 hover:text-white font-semibold transition-all duration-300 group"
                        >
                            <span className="relative z-10">Home</span>
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 border border-white/20"></div>
                        </Link>
                        <Link 
                            to="/user" 
                            className="relative px-5 py-3 text-white/90 hover:text-white font-semibold transition-all duration-300 group"
                        >
                            <span className="relative z-10">Users</span>
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 border border-white/20"></div>
                        </Link>
                        
                    </nav>
                        
                    {/* Auth Section */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button 
                                    onClick={toggleUserMenu}
                                    className="flex items-center space-x-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30 transition-all duration-300 group shadow-lg"
                                >
                                    <div className="relative">
                                        <div className="w-11 h-11 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/50">
                                            <span className="text-white font-bold text-lg">
                                                {user?.username?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-sm"></div>
                                    </div>
                                    <div className="hidden lg:block text-left">
                                        <div className="text-sm font-bold text-white">
                                            {user?.username}
                                        </div>
                                        <div className="text-xs text-emerald-100">
                                            {user?.email}
                                        </div>
                                    </div>
                                    <svg className={`w-5 h-5 text-white/80 transform transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {/* User Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 top-full mt-3 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-200 py-2 z-50">
                                        <div className="px-6 py-4 border-b border-emerald-100">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                                                    <span className="text-white font-bold text-xl">
                                                        {user?.username?.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-gray-900 text-lg">{user?.username}</div>
                                                    <div className="text-sm text-emerald-600 font-medium">{user?.email}</div>
                                                    <div className="text-xs text-gray-500 mt-1">Online now</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="py-2">
                                            <Link to="/profile" className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200">
                                                <svg className="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Profile Settings
                                            </Link>
                                            <Link to="/dashboard" className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200">
                                                <svg className="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                Dashboard
                                            </Link>
                                            <Link to="/settings" className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200">
                                                <svg className="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Account Settings
                                            </Link>
                                        </div>
                                        
                                        <div className="border-t border-emerald-100 pt-2">
                                            <button 
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                            >
                                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link 
                                    to="/login"
                                    className="px-5 py-2 text-white/90 hover:text-white font-semibold transition-all duration-300 hover:bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register"
                                    className="bg-white hover:bg-gray-50 text-emerald-600 px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/50"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm border border-white/20"
                        >
                            <svg className={`w-6 h-6 transform transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-6 border-t border-white/20 mt-4">
                        <div className="space-y-3">
                            <Link 
                                to="/" 
                                className="block px-4 py-3 text-white hover:text-emerald-100 hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                🏠 Home
                            </Link>
                            <Link 
                                to="/user" 
                                className="block px-4 py-3 text-white hover:text-emerald-100 hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                👥 Users
                            </Link>
                            <div className="px-4 py-2 text-sm text-emerald-200 font-bold uppercase tracking-wider">Features</div>
                            <a href="#" className="block px-6 py-2 text-sm text-emerald-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">📊 Analytics</a>
                            <a href="#" className="block px-6 py-2 text-sm text-emerald-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">🔒 Security</a>
                            <a href="#" className="block px-6 py-2 text-sm text-emerald-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">🔗 Integrations</a>
                        </div>
                    </div>
                )}
            </div>

            {/* Click outside to close user menu */}
            {isUserMenuOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsUserMenuOpen(false)}
                ></div>
            )}
        </header>
    );
};

export default Header;