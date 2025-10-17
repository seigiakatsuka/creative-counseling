'use client';
import React, { useState } from 'react'
import Image from 'next/image'

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="bg-white w-full shadow sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center py-4 px-4">
                    <a href="/" onClick={closeMenu}>
                        <div className="flex items-center">
                            <Image src="/imgs/logo/logo.jpg" alt="logo" width={40} height={40} className="rounded-full" />
                            <span className="ml-2 text-2xl font-bold text-purple-600 hover:text-purple-800 transition-colors duration-300">Creative</span>
                            <span className="ml-2 text-2xl font-bold text-orange-500 hover:text-orange-700 transition-colors duration-300">Counseling</span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6">
                        <a href="/" className="text-gray-700 hover:text-purple-600 transition-colors duration-300">Home</a>
                        <a href="/contact" className="text-gray-700 hover:text-purple-600 transition-colors duration-300">Contact</a>
                        <a href="https://sonya-oglesby.clientsecure.me" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-600 transition-colors duration-300">Returning Clients</a>
                    </div>

                    {/* Hamburger Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className={`h-6 w-6 fill-current transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path fillRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" clipRule="evenodd" />
                            ) : (
                                <path fillRule="evenodd" d="M4 5h16a1 1 0 110 2H4a1 1 0 110-2zm0 6h16a1 1 0 110 2H4a1 1 0 110-2zm0 6h16a1 1 0 110 2H4a1 1 0 110-2z" clipRule="evenodd" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white shadow-lg`}>
                    <div className="px-4 py-2 space-y-2">
                        <a
                            href="/"
                            className="block px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
                            onClick={closeMenu}
                        >
                            Home
                        </a>
                        <a
                            href="/contact"
                            className="block px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
                            onClick={closeMenu}
                        >
                            Contact
                        </a>
                        <a
                            href="https://sonya-oglesby.clientsecure.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
                            onClick={closeMenu}
                        >
                            Returning Clients
                        </a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar