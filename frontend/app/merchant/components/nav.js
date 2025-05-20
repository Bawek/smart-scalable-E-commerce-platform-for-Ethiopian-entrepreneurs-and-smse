'use client'
import { useState } from 'react';
import { BellIcon, Menu, Search } from 'lucide-react';
import { NavUser } from '@/components/ui/my-components/nav-user';
import { useSelector } from 'react-redux';
import { useLogout } from '@/util/userLogout';
import { ModeToggle } from '@/app/components/ModeToggle';
import { useRouter } from 'next/navigation';
import { useSidebar } from "@/components/ui/sidebar";
import { selectNotifications } from '@/lib/features/notification/notificationSlice';

export default function MerchantNavBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const notifications = useSelector(selectNotifications)

    const {
        isMobile,
        toggleSidebar,
    } = useSidebar();

    const router = useRouter();
    const user = useSelector((state) => state.account);
    const logout = useLogout();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search:', searchQuery);
    };

    return (
        <nav className="shadow-sm p-4 w-full sticky top-0 bg-white dark:bg-gray-900 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

                <Menu onClick={toggleSidebar} className="w-6 h-6 text-muted-foreground md:hidden cursor-pointer hover:text-primary hover:bg-amber-100" />


                {/* Center: Search Input */}
                <div className="flex-1">
                    <form onSubmit={handleSearch} className="relative w-full max-w-lg mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 dark:text-white" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your search request..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </form>
                </div>

                {/* Right: Icons */}
                <div className="flex items-center space-x-3">
                    <ModeToggle />

                    <button
                        onClick={() => router.push('/merchant/notification')}
                        className="p-2 rounded-full relative hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <BellIcon className="h-6 w-6 dark:text-white" />
                        <span className="absolute top-0 right-0 text-xs font-semibold text-amber-600 rounded-full">

                            {notifications?.length || 0}
                        </span>

                        {/* <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-amber-600 rounded-full">
                        </span> */}
                    </button>

                    <NavUser user={user} logout={logout} />
                </div>
            </div>
        </nav>
    );
}
