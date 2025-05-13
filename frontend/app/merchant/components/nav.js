'use client'
import { useState } from 'react';
import { BellIcon, SunIcon, MoonIcon, Search } from 'lucide-react';
import { NavUser } from '@/components/ui/my-components/nav-user';
import { useSelector } from 'react-redux';
import { useLogout } from '@/util/userLogout';
import { ModeToggle } from '@/app/components/ModeToggle';

export default function MerchantNavBar() {
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const user = useSelector((state) => state.account)
    const logout = useLogout()

    // const toggleTheme = () => {
    //     setDarkMode(!darkMode);
    //     // Implement theme switching logic here
    // };

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search logic
        console.log('Search:', searchQuery);
    };

    return (
        <nav className={`shadow-sm p-4`}>
            <div className="max-w-7xl mx-auto flex justify-end items-center">
                {/* Center - Search Input */}
                <div className="flex-1 max-w-2xl mx-8">
                    <form onSubmit={handleSearch} className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className={`h-5 w-5 dark:text-white `} />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your search request..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-lg border dark:bg-gray-900 dark:text-white border-gray-300 focus:outline-none focus:ring-1 `}
                        />
                    </form>
                </div>

                {/* Right side - Icons */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    <ModeToggle />
                    {/* Notifications */}
                    <button
                        className={`p-2 rounded-full relative hover:bg-opacity-20 hover:bg-gray-400`}
                    >
                        <BellIcon className="h-6 w-6 dark:text-white" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <NavUser
                            user={user}
                            logout={logout}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}