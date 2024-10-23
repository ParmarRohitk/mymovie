"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const validUsername = "addmovie";
        const validPassword = "Umang$Rohit01";

        if (username === validUsername && password === validPassword) {
            localStorage.setItem('auth', 'true');
            router.push('/add-movie/secure-page');
        } else {
            setError('Invalid username or password');
        }
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('auth');
        if (isAuthenticated) {
            // Redirect to secure page if already logged in
            router.push('/add-movie/secure-page');
        }
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg animate-fade-in-down">
                <h1 className="text-3xl font-bold text-center text-gray-900">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="w-full p-3 text-lg text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full p-3 text-lg text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
