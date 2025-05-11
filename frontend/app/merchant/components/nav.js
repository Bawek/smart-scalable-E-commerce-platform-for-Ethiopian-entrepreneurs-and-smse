'use client'
import { useState } from 'react';
import { ChevronDown, BellIcon, SunIcon, MoonIcon, Search } from 'lucide-react';

export default function MerchantNavBar() {
    const [darkMode, setDarkMode] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        // Implement theme switching logic here
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search logic
        console.log('Search:', searchQuery);
    };

    return (
        <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
            <div className="max-w-7xl mx-auto flex justify-end items-center">
                {/* Center - Search Input */}
                <div className="flex-1 max-w-2xl mx-8">
                    <form onSubmit={handleSearch} className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your search request..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                                }`}
                        />
                    </form>
                </div>

                {/* Right side - Icons */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full hover:bg-opacity-20 ${darkMode ? 'hover:bg-white text-white' : 'hover:bg-gray-200 text-gray-600'
                            }`}
                    >
                        {darkMode ? (
                            <SunIcon className="h-6 w-6" />
                        ) : (
                            <MoonIcon className="h-6 w-6" />
                        )}
                    </button>

                    {/* Notifications */}
                    <button
                        className={`p-2 rounded-full relative hover:bg-opacity-20 ${darkMode ? 'hover:bg-white text-white' : 'hover:bg-gray-200 text-gray-600'
                            }`}
                    >
                        <BellIcon className="h-6 w-6" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center space-x-1 focus:outline-none"
                        >
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxi1HkniG6Ozi8UYIsUGKMB81hsl6VcAV13w&s"
                                alt="Profile"
                                className="h-8 w-8 rounded-full"
                            />
                            <ChevronDown
                                className={`h-5 w-5 ${darkMode ? 'text-white' : 'text-gray-600'}`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div
                                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? 'bg-gray-700' : 'bg-white'
                                    }`}
                            >
                                <a
                                    href="#"
                                    className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    Profile
                                </a>
                                <a
                                    href="#"
                                    className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    Settings
                                </a>
                                <a
                                    href="#"
                                    className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    Sign out
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}