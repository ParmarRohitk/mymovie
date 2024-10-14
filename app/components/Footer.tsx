import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 ">
            <div className="container mx-auto px-4">
                <div className="items-center text-center ">
                    {/* Footer Text */}
                    <p className="text-sm sm:text-base mb-4 sm:mb-0">
                        ©2024 <span className="font-semibold">Movie</span> | All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
