'use client';
import { useState, useEffect } from 'react';
import { employees } from '@/app/util/employeeInfo';

const EmployeeSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Get number of items per view based on screen size
    const getItemsPerView = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1024) return 3; // Desktop: 3 items
            if (window.innerWidth >= 768) return 2;  // Tablet: 2 items
            return 1; // Mobile: 1 item
        }
        return 3; // Default for SSR
    };

    const [itemsPerView, setItemsPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerView(getItemsPerView());
            setCurrentSlide(0); // Reset slide on resize
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate maximum slides based on items per view
    const maxSlides = Math.max(0, employees.length - itemsPerView);

    // Auto-scroll functionality with continuous scrolling
    useEffect(() => {
        if (maxSlides === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                if (prev >= maxSlides) {
                    return 0; // Loop back to beginning
                }
                return prev + 1;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [maxSlides]);

    const goToSlide = (index) => {
        setCurrentSlide(Math.min(index, maxSlides));
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => {
            if (prev <= 0) {
                return maxSlides;
            }
            return prev - 1;
        });
    };

    const goToNext = () => {
        setCurrentSlide((prev) => {
            if (prev >= maxSlides) {
                return 0;
            }
            return prev + 1;
        });
    };

    // Calculate the width percentage for each item
    const itemWidth = 100 / itemsPerView;

    return (
        <div className="w-full max-w-6xl mx-auto p-6">

            <div className="relative rounded-2xl overflow-hidden">
                {/* Main Slider Container */}
                <div className="relative h-96 overflow-hidden">
                    <div
                        className="flex transition-transform duration-700 ease-in-out h-full"
                        style={{ transform: `translateX(-${currentSlide * itemWidth}%)` }}
                    >
                        {employees.map((employee, index) => (
                            <div key={employee.id} className="flex-shrink-0 h-96 flex items-center justify-center p-8" style={{ width: `${itemWidth}%` }}>
                                <div className="text-center h-full flex flex-col items-center justify-center">
                                    {/* Employee Photo */}
                                    <div className="relative mb-6">
                                        <img
                                            src={employee.image}
                                            alt={employee.name}
                                            className="w-36 h-36 rounded-full object-cover mx-auto shadow-lg border-2 border-purple-500"
                                        />
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-600/20 to-transparent w-36 h-36 mx-auto"></div>
                                    </div>

                                    {/* Employee Info */}
                                    <h3 className="text-2xl font-bold text-gray-600 mb-2">
                                        {employee.name}
                                    </h3>
                                    <p className="text-lg text-purple-600 font-medium">
                                        {employee.specialty}
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        {employee.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    aria-label="Previous employee"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    aria-label="Next employee"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

            </div>

        </div>
    );
};

export default EmployeeSlider;