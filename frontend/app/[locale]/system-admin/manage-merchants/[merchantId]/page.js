'use client'
import { CheckCircle, Trash, Edit, PhoneMissed } from "lucide-react"
const MerchantDetailPage = () => {
    // Sample merchant data (replace with real data from your API)
    const merchant = {
        id: '12345',
        name: 'Example Merchant LLC',
        email: 'contact@example.com',
        phone: '+1 (555) 123-4567',
        status: 'active',
        registrationDate: '2023-01-15',
        lastLogin: '2023-10-20 14:30:00',
        address: '123 Main St, New York, NY 10001',
        services: {
            onlinePayments: true,
            posSystem: true,
            inventoryManagement: false,
            analytics: true,
        },
        documentsVerified: true,
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{merchant.name}</h1>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Edit Merchant
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                            Back to List
                        </button>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="mb-8">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${merchant.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {merchant.status.charAt(0).toUpperCase() + merchant.status.slice(1)}
                    </span>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">General Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">Merchant ID</label>
                                <p className="font-medium">{merchant.id}</p>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">Registration Date</label>
                                <p className="font-medium">{merchant.registrationDate}</p>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">Last Login</label>
                                <p className="font-medium">{merchant.lastLogin}</p>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">Address</label>
                                <p className="font-medium">{merchant.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Contact Information Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Edit className="w-5 h-5 text-gray-400" />
                                    <span className="font-medium">{merchant.email}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <PhoneMissed className="w-5 h-5 text-gray-400" />
                                    <span className="font-medium">{merchant.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Services Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Enabled Services</h2>

                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(merchant.services).map(([service, enabled]) => (
                                    <div key={service} className="flex items-center gap-2">
                                        {enabled ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <Trash className="w-5 h-5 text-red-500" />
                                        )}
                                        <span className="capitalize">
                                            {service.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Actions Section */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>

                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Approve Merchant
                        </button>
                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                            Suspend Merchant
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                            Delete Merchant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MerchantDetailPage;