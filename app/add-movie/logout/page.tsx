// app/logout/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('auth'); // Clear the auth token
        router.push('/login'); // Redirect to login page
    }, [router]);

    return null;
};

export default LogoutPage;
