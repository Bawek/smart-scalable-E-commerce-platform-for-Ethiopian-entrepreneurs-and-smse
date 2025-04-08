'use client'
import { Button } from "@/components/ui/button";
import { useGetMerchantByIdQuery } from "@/lib/features/merchant/registrationApi";
import { CheckCircle, Trash, Edit, PhoneMissed } from "lucide-react"
import { useParams } from "next/navigation";
import { imageViewer } from "../../lib/imageViewer";
import MerchantCard from "@/components/ui/my-components/imageMagnifier";
const MerchantDetailPage = () => {
    const params = useParams()
    const { merchantId } = params
    const { data, isLoading, isError } = useGetMerchantByIdQuery(merchantId)
    const merchant = data?.merchant
    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>
    }
    if (isError) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">something went wrong please refresh the page</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{`${merchant?.account?.firestName} ${merchant?.account?.lastName}`}</h1>
                    <div className="flex gap-2">
                        {/* <Button className="">
                            Edit Merchant
                        </Button> */}
                        <Button 
                        className="bg-orange-700"
                        onClick={() => window.history.back()}
                        >
                            Back to List
                        </Button>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="mb-8">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${merchant.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {merchant?.status.charAt(0).toUpperCase() + merchant?.status.slice(1)}
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
                                <p className="font-medium">{merchant?.status !== 'ACTIVE' ? "PENDING TILL YET" : merchant.lastLogin}</p>
                            </div>
                            {/* Location Info */}
                            <div className="mt-4">
                                <label className="text-sm text-gray-500">Address Information</label>
                                <div className="font-medium">
                                    <p><strong>Town:</strong> {merchant?.location.town}</p>
                                    <p><strong>Country:</strong> {merchant?.location.country}</p>
                                    <p><strong>Region:</strong> {merchant?.location.region}</p>
                                    <p><strong>Kebele:</strong> {merchant?.location.kebele}</p>
                                    <p><strong>Woreda:</strong> {merchant?.location.woreda}</p>
                                </div>
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
                                    <span className="font-medium">{merchant?.account?.email}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <PhoneMissed className="w-5 h-5 text-gray-400" />
                                    <span className="font-medium">{merchant?.businessPhone}</span>
                                </div>
                            </div>
                        </div>
                        {/* Display the identity card */}
                        <MerchantCard merchant={merchant} />
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