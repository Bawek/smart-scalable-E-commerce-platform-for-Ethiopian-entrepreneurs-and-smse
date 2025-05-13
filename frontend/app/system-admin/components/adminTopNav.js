'use client'
import { useState } from 'react';
import { BellIcon, SunIcon, MoonIcon, Search } from 'lucide-react';
import { NavUser } from '@/components/ui/my-components/nav-user';
import { useSelector } from 'react-redux';
import { useLogout } from '@/util/userLogout';

export default function MerchantNavBar() {
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const user = useSelector((state) => state.account)
      const logout = useLogout()
    
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
                        <NavUser
                            user={user}
                            logout={logout}
                        />
                        {/* <button
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
                        )} */}
                    </div>
                </div>
            </div>
        </nav>
    );
}



// 'use client'
// import { SidebarTrigger } from '@/components/ui/sidebar'
// import React from 'react'
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem
// } from "@/components/ui/form";
// import { useForm } from 'react-hook-form';
// import { Input } from '@/components/ui/input';
// import { useState } from 'react';
// import { NotificationAdd } from '@mui/icons-material';
// import NotificationTest from '@/app/components/systemAdmin/test';
// import axios from 'axios';
// const AdminTopNav = () => {
//     const form = useForm();
//     const [isOpened, setIsOpened] = useState(false)
//     const handleSearch = () => {
//         // Handle search functionality
//     }
//     const sendTestNotification = async () => {
//         const testData = {
//             message: 'Test merchant needs approval',
//             merchantId: 'test-' + Math.random().toString(36).slice(2, 8),
//             businessName: 'Test Business',
//             timestamp: new Date().toISOString()
//         };

//         try {
//             await axios.post('http://localhost:8000/iopost', testData, {
//                 headers: { 'Content-Type': 'application/json' },
//                 withCredentials: true
//             });

//         } catch (error) {
//             console.error('Error:', error)
//             alert(`Error: ${error.response?.data?.error || error.message}`)
//         }
//     };
//     return (
//         <div className="py-2">
//             <div className="max-w-screen-xl mx-auto flex items-center gap-10 lg:justify-between">
//                 {/* Sidebar Trigger */}
//                 <SidebarTrigger />

//                 {/* Search Form */}
//                 <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 mr-5">
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-4 flex items-center gap-3">
//                             <FormField
//                                 control={form.control}
//                                 name="search"
//                                 render={({ field }) => (
//                                     <FormItem className="w-full">
//                                         <FormControl>
//                                             <Input
//                                                 type="text"
//                                                 placeholder="Search..."
//                                                 {...field}
//                                                 className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black bg-gray-700"
//                                             />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />
//                         </form>
//                     </Form>
//                 </div>
//                 <div>

//                     <NotificationAdd onClick={() => setIsOpened(true)} />
//                     <button onClick={sendTestNotification}>toast</button>
//                 </div>
              
//             </div>
//         </div>
//     )
// }

// export default AdminTopNav;
