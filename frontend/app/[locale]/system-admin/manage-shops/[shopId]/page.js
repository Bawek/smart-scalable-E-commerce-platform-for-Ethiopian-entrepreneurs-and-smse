'use client'
import { Button } from '@/components/ui/button';
import { Email } from '@mui/icons-material';
import {
    Clock,
    MapPin,
    Users,
    DollarSign,
    Store,
    Phone,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const ShopDetailPage = () => {
    const router = useRouter()
    // Sample shop data (replace with real data)
    const shop = {
        id: 'SHOP-789',
        name: 'City Center Boutique',
        owner: 'John Smith',
        status: 'active',
        address: '456 Downtown Street, New York, NY 10001',
        registered: '2023-03-10',
        lastActivity: '2023-10-25 09:45:00',
        contact: {
            phone: '+1 (555) 987-6543',
            email: 'citycenter@example.com'
        },
        operatingHours: {
            mon_fri: '9:00 AM - 8:00 PM',
            sat: '10:00 AM - 9:00 PM',
            sun: 'Closed'
        },
        staff: [
            { name: 'Alice Johnson', role: 'Manager' },
            { name: 'Bob Wilson', role: 'Sales Associate' }
        ],
        inventoryStatus: {
            totalItems: 245,
            lowStock: 12
        },
        monthlySales: '$45,320'
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <Store className="w-8 h-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">{shop.name}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => router.push('/system-admin/manage-shops')}
                            className="bg-orange-700"
                        >
                            Back to Shops
                        </Button>
                    </div>
                </div>
                {/* Status and Basic Info */}
                <div className="flex flex-wrap gap-4 mb-8 items-center">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${shop.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
                    </span>
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span>{shop.address}</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Basic Information Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Shop Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-500">Shop ID</label>
                                    <p className="font-medium">{shop.id}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Owner</label>
                                    <p className="font-medium">{shop.owner}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Registration Date</label>
                                    <p className="font-medium">{shop.registered}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Last Activity</label>
                                    <p className="font-medium">{shop.lastActivity}</p>
                                </div>
                            </div>
                        </div>

                        {/* Staff Members Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Users className="w-6 h-6" />
                                Staff Members
                            </h2>
                            <div className="space-y-3">
                                {shop.staff.map((member, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium">{member.name}</span>
                                        <span className="text-sm text-gray-500">{member.role}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Operating Hours Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Clock className="w-6 h-6" />
                                Operating Hours
                            </h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Monday - Friday</span>
                                    <span className="font-medium">{shop.operatingHours.mon_fri}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Saturday</span>
                                    <span className="font-medium">{shop.operatingHours.sat}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sunday</span>
                                    <span className="font-medium">{shop.operatingHours.sun}</span>
                                </div>
                            </div>
                        </div>

                        {/* Inventory & Sales Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <DollarSign className="w-6 h-6" />
                                Sales & Inventory
                            </h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <p className="text-2xl font-bold text-green-700">{shop.inventoryStatus.totalItems}</p>
                                    <p className="text-sm text-gray-600">Total Items</p>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                    <p className="text-2xl font-bold text-yellow-700">{shop.inventoryStatus.lowStock}</p>
                                    <p className="text-sm text-gray-600">Low Stock Items</p>
                                </div>
                                <div className="col-span-2 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-2xl font-bold text-blue-700 text-center">{shop.monthlySales}</p>
                                    <p className="text-sm text-gray-600 text-center">30-Day Sales</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Email className="w-5 h-5 text-gray-400" />
                                    <span className="font-medium">{shop.contact.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <span className="font-medium">{shop.contact.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Actions Section */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Activate Shop
                        </button>
                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                            Suspend Shop
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                            Delete Shop
                        </button>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetailPage;