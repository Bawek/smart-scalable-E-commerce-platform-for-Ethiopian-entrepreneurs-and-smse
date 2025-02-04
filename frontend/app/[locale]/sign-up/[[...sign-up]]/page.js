'use client'
import { SignUp } from '@clerk/nextjs'
import Auth from '../../layouts/Auth'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import initTranslations from '@/app/i18n';

const i18nNamespaces = ["signup"];

export default function SignUpPage() {
    const params = useParams()
    const locale = params.locale
    const [translations, setTranslations] = useState({
        t: () => { }, // Placeholder function until translations are loaded
        resources: {},
    });
    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const { t, resources } = await initTranslations(locale, i18nNamespaces);
                setTranslations({ t, resources });
                console.log("Translations initialized successfully");
            } catch (error) {
                console.error("Error initializing translations:", error);
                // Optionally, handle the error further here
            }
        };

        loadTranslations();
    }, [locale]); // Re-run the effect if the locale changes

    if (!translations.t) {
        return null; // Or a loading indicator
    }
    return (
        <Auth>
            <div className='w-full min-h-screen flex justify-center items-center'>
                <SignUp />
            </div>
        </Auth>
    )
}