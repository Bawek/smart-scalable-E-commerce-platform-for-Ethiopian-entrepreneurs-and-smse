'use client'
import { MedicalInformation } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react'

const Alert = () => {
    const isAdmin = true; 
    const isRegistered = false; 
    if (!isAdmin || isRegistered) return null; 
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
