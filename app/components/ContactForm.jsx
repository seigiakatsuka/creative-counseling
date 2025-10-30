'use client';
import React, { useState } from 'react';
import Form from 'next/form';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState({
        message: "",
        type: "idle",
    });

    const handleSubmit = async (data) => {
        data.preventDefault();
        console.log('Form submitted with data:', formData);
        setStatus({
            message: "Submitting form...",
            type: "loading",
        });
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            console.log('Response status:', response.status);
            
            const resultUnknown = await response.json().catch(() => ({}));
            const result = resultUnknown && typeof resultUnknown === 'object' ? resultUnknown : {};
            
            console.log('Response data:', result);
            
            if (response.ok) {
                setStatus({
                    message: "Message submitted successfully!",
                    type: "success",
                });
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                setStatus({
                    type: "error",
                    message: result?.error || result?.hint || "An error occurred. Please try again.",
                });
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: "An error occurred. Please try again.",
            });
        }
    };
    
    return (
        <>
        <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">We want to hear it?</h2>
            <p className="my-2 text-gray-800">Whatever <span className="text-orange-500">"it"</span> is, we want to hear it. Whether you need more information on our services, learn more about our providers or any other questions, this is the place to let your voice be heard!</p>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" id="name" name="name" placeholder="First, Last" className="w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" required />
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4 mb-2">Email</label>
                <input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" id="email" name="email" placeholder="youremail@email.com" className="w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" required />
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mt-4 mb-2">Subject</label>
                <select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} id="subject" name="subject" className="w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" required>
                    <option value="">Select One</option>
                    <option value="clinical assessment">Clinical Assessment</option>
                    <option value="clinical supervision">Clinical Supervision</option>
                    <option value="counseling">Counseling</option>
                    <option value="dwi assessments">DWI Assessments</option>
                    <option value="education and training">Education and Training</option>
                    <option value="glp-1 weight loss">GLP-1 Medical Weight Loss</option>
                    <option value="health and nutrition">Health and Nutrition Services</option>
                </select>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mt-4 mb-4">Message</label>
                <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} id="message" placeholder="What can we help with?" name="message" className="w-full px-3 py-2 h-32 mb-2 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" required></textarea>
                <button type="submit" className="rounded-full text-bold text-white bg-linear-to-r from-purple-500 to-orange-500 px-4 py-2 hover:bg-linear-to-r hover:from-purple-600 hover:to-orange-600 transition duration-300" disabled={status.type === "loading"}>
                    {status.type === "loading" ? "Sending..." : "Send Message"}
                </button>
            </Form>
            {status.message && (
                <div
                    className={`mt-4 ${
                        status.type === "success"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : status.type === "error"
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : "bg-blue-100 text-blue-700 border border-blue-200"
                    }`}
                >
                    {status.message}
                </div>
            )}
        </div>
        <div className='w-full md:w-1/2'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.0202457313126!2d-80.2755503!3d36.092994499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8853ae2839b9ce11%3A0x8f4ae2a2aa6cca43!2s163%20Stratford%20Ct%20%23170%2C%20Winston-Salem%2C%20NC%2027103!5e0!3m2!1sen!2sus!4v1750356792517!5m2!1sen!2sus" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-128 mt-4 rounded-lg"></iframe>
        </div>
        </>
    );
}
