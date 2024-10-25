'use client'
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu
    const [isVisible, setIsVisible] = useState(true); // State to control header visibility

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu on click
    };

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(lastScrollY > currentScrollY || currentScrollY < 10); // Show header if scrolling up or at the top
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full p-3 z-50 bg-transparent transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="container mx-auto flex justify-between items-center">

                {/* Logo with black background for white logo */}
                <a href="/" className="bg-black rounded-full p-2">
                    <div className="flex items-center justify-center">
                        <img alt="Moviestreamtv" src="/logo.png" height={80} width={80} />
                    </div>
                </a>

                {/* Dropdown Navigation */}
                <nav className={`absolute lg:static top-16 right-0 lg:right-auto bg-transparent w-full lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 p-2 lg:p-0 text-center lg:text-left bg-black rounded-full">
                        <li className="flex-1">
                            <a href="/in/hindi" className="block text-white hover:text-gray-300 rounded-full py-2 px-4 text-center">
                                Hindi
                            </a>
                        </li>
                        <li className="flex-1">
                            <a href="/in/english" className="block text-white hover:text-gray-300 rounded-full py-2 px-4 text-center">
                                English
                            </a>
                        </li>
                        <li className="flex-1">
                            <a href="/in/gujarati" className="block text-white hover:text-gray-300 rounded-full py-2 px-4 text-center">
                                Gujarati
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Hamburger Menu Icon */}
                <div>
                    <button onClick={toggleMenu} className="text-white focus:outline-none text-3xl">
                        {isMenuOpen ? '✖' : '☰'} {/* Hamburger and close icons */}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
