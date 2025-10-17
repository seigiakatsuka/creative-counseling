'use client';
import Link from 'next/link';
import { useState } from 'react';
import { services } from '@/app/util/services';

const ServicesTable = () => {
    const [activeService, setActiveService] = useState('Clinical Assessment');

    const serviceKeys = Object.keys(services);

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row min-h-[600px]">
                    {/* Aside Navigation - 1:4 ratio */}
                    <aside className="lg:w-1/4 border-r bg-gray-100 border-gray-300">
                        <div className="p-4">

                            <nav className="space-y-2">
                                {serviceKeys.map((service) => (
                                    <button
                                        key={service}
                                        onClick={() => setActiveService(service)}
                                        className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                                            activeService === service
                                                ? 'bg-purple-600 text-white shadow-md'
                                                : 'text-gray-700 hover:bg-purple-200 hover:text-gray-900'
                                        }`}
                                    >
                                        {service}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Content Area - 3:4 ratio */}
                    <main className="lg:w-3/4 p-6">
                        <div className="h-full">

                            {/* Service Image */}
                            <div className="mb-6">
                                <img
                                    src={services[activeService].image}
                                    alt={services[activeService].title}
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            </div>

                            {/* Service Title */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {services[activeService].title}
                            </h1>

                            {/* Service Description */}
                            <div className="prose max-w-none">
                                {services[activeService].description.map((paragraph, index) => (
                                    <p key={index} className="text-gray-700 text-lg leading-relaxed mb-4 last:mb-0">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Optional Call-to-Action */}
                            <div className="mt-8">
                                <Link className="rounded-full text-bold text-white bg-linear-to-r from-purple-500 to-orange-500 px-4 py-2 hoever:bg-linear-to-r hover:from-purple-600 hover:to-orange-600 transition duration-300"  href="/contact">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ServicesTable;