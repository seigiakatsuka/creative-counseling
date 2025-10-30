import React from 'react'
import ContactForm from '@/app/components/ContactForm'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

export const metadata = {
    title:"Contact",
};

const Page = () => {
    return (
        <>
            <div className="min-h-screen bg-[#FDF7F0] mx-auto px-4 py-8">
                <section id="contact" className="container mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8 px-4 mb-8">
                    {/* Contact Information */}
                    <div className="flex flex-col items-center text-center text-black space-y-2">
                        <HiOutlineMail className="text-4xl"/>
                        <h2 className="text-2xl">Email</h2>
                        <p>srolglesby@creative-counseling.net</p>
                    </div>

                    <div className="flex flex-col items-center text-center text-black space-y-2">
                        <HiOutlinePhone className="text-4xl"/>
                        <h2 className="text-2xl">Call</h2>
                        <p>336-831-4051</p>
                    </div>

                    <div className="flex flex-col items-center text-center text-black space-y-2">
                        <HiOutlineLocationMarker className="text-4xl"/>
                        <h2 className="text-2xl">Location</h2>
                        <p>163 Stratford Court, Suit 170, <br/>  Winston-Salem, NC, United States</p>
                    </div>
                </section>

                {/* Contact Form */}
                <section id="form" className="container mx-auto flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
                    <ContactForm />
                </section>
            </div>
        </>
    )
}
export default Page
