'use client'
import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu on click
    };

    return (
        <header className="fixed top-0 left-0 w-full p-5 z-50 bg-transparent">
            <div className="container mx-auto flex justify-between items-center">

                {/* Logo with black background for white logo */}
                <a href="/" className="bg-black rounded-full p-2">
                    <div className=" flex items-center justify-center">
                        {<img alt="Moviestreamtv" src="/logo.png" height={80} width={80} />}
                        {/* <span className="ml-2 text-xl font-bold">Moviestreamtv</span> */}
                    </div>
                </a>


                {/* Dropdown Navigation */}
                <nav className={`absolute lg:static top-16 right-0 lg:right-auto bg-transparent w-full lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 p-6 lg:p-0 text-center lg:text-left">
                        <li>
                            <a href="/in/hindi" className="text-white hover:text-gray-300">
                                Hindi Movies
                            </a>
                        </li>
                        <li>
                            <a href="/in/english" className="text-white hover:text-gray-300">
                                English Movies
                            </a>
                        </li>
                        <li>
                            <a href="/in/gujarati" className="text-white hover:text-gray-300">
                                Gujarati Movies
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
