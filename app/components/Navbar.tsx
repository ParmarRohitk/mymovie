'use client'
import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu on click
    };

    return (
        <header className="fixed top-0 left-0 w-full p-5  z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/">
                    <h1 className="text-3xl font-bold text-white">Movie</h1>
                </a>

                {/* Hamburger Menu Icon for Small Devices */}
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none text-3xl">
                        {isMenuOpen ? '✖' : '☰'} {/* Use Unicode for hamburger and close icons */}
                    </button>
                </div>

                {/* Nav links (hidden on small screens and shown on larger screens) */}
                <nav className={`lg:block ${isMenuOpen ? 'block' : 'hidden'} absolute lg:static top-16 right-0 bg-black lg:bg-transparent w-full lg:w-auto`}>
                    <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 p-6 lg:p-0 text-center lg:text-left">
                        <li><a href="/hindi" className="text-white hover:text-gray-300">Hindi Movies</a></li>
                        <li><a href="/english" className="text-white hover:text-gray-300">English Movies</a></li>
                        <li><a href="/gujarati" className="text-white hover:text-gray-300">Gujarati Movies</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
