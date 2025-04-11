'use client'
import { useToast } from '@/hooks/use-toast';
import { selectAll } from '@/lib/features/auth/accountSlice';
import { useGetMerchantByIdQuery } from '@/lib/features/merchant/registrationApi';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
    const merchant = useSelector(selectAll)
    const { toast } = useToast()
    const { data, isError } = useGetMerchantByIdQuery(merchant.id)
    console.log(data, 'selector why selected')

    if (isError) {
        return <h1>something go wrong</h1>
    }
    if (data?.merchant?.status === 'ACTIVE') return (
        <div className="fixed top-4 z-50 p-2 right-4 bg-amber-50 text-amber-800 rounded-lg shadow-md flex items-center space-x-3 border border-amber-100">
            <p>
                Congragulation your Registrations is Approved.so You can Create your shop in this link in the shop Tap{" "}
                <Link href="/merchant/business-setting" className="font-medium text-blue-900 underline">
                    Business Settings
                </Link>
                {" "}
                to access all features.
            </p>
        </div>
    );
    // if (data?.merchant?.status === 'PENDING') return (
    //     <div className="fixed top-4 z-50 p-2 right-4 bg-amber-50 text-amber-800 rounded-lg shadow-md flex items-center space-x-3 border border-amber-100">
    //         <p>
    //           please wait while we will see and send notification 
    //         </p>
    //     </div>
    // );
    return (
        <div className="fixed top-4 z-50 p-2 right-4 bg-amber-50 text-amber-800 rounded-lg shadow-md flex items-center space-x-3 border border-amber-100">
            <p>
                We noticed your registration isn't complete. Please take a moment to
                finish setting up your account in {" "}
                <Link href="/merchant/business-setting" className="font-medium text-blue-900 underline">
                    Business Settings
                </Link>
                {" "}
                to access all features.
            </p>
        </div>
    )
}

export default Alert
