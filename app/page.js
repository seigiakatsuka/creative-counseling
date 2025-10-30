import React, { Suspense } from "react";
import Image from "next/image";
import ServicesTable from "@/app/components/ServicesTable";
import EmployeeHeadshots from "@/app/components/EmployeeHeadshots";

export default function Home() {
  return (
    <>
        <main className="main-content min-h-screen text-gray-800 bg-[#FDF7F0]">
                <section className="container mx-auto flex flex-col md:flex-row items-center gap-8 p-8">
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <h1 className="text-4xl font-bold text-purple-500">Solutions Without side effects</h1>
                        <p className="text-base leading-relaxed max-w-md">All of our journeys are unique. It is important that each individual finds a path to wellness that is comfortable for you!</p>
                        <h2 className="text-xl text-gray-500">Safe. Caring. Respect.</h2>
                    </div>
                    <div className="flex-1">
                        <Image src="/imgs/stock_photos/male_counselor.jpg" alt="male counselor" width={1200} height={800} className="w-full rounded-lg shadow"/>
                    </div>
                </section>

                <section className="py-12 bg-[url(/imgs/stock_photos/empty_chair.jpg)] bg-cover bg-center">
                    <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-end px-4 py-12">
                        <div className="bg-black/60 p-6 rounded-lg max-w-2xl text-white space-y-6 md:mr-12">
                            <h2 className="text-4xl text-purple-200">Every Person is unique and important.</h2>
                            <p className="text-xl">Creative Counseling is an outpatient clinic aimed to provide the best in counseling, consulting services, and clinical supervision. We provide care to ages 3 and up and see individuals, families, couples, and small groups.</p>
                            <p className="text-xl">All of our journeys are unique. It is important that each individual finds a path to wellness that is comfortable for them. At times, life brings challenges and roadblocks that require us to seek outside supports. Our staff and counselors strive to provide a safe and caring environment for individuals to explore and unpack life&#39;s difficulties. CCWCC provides effective care and gives individuals the respect they deserve.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-primary item-center bg-purple-300 py-12">
                    <div className="container bg-black/60 rounded-lg max-w-[700px] mx-auto p-6 px-4 text-white text-center space-y-6">
                        <h2 className="text-3xl font-bold text-orange-500 mb-2">Our Services</h2>
                        <p className="text-xl">At Creative Counseling, we offer a range of services designed to support your mental and physical well-being. Each service is tailored to meet your unique needs, ensuring you receive the best possible care.</p>
                    </div>
                    <div className="mt-8 py-12">
                        <div className="container mx-auto flex flex-col md:flex-row items-start gap-8 px-4">
                            <Suspense fallback={<div>Loading...</div>}>
                                    <ServicesTable />
                            </Suspense>
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="bg-black/60 p-6 px-4 rounded-lg max-w-3xl mx-auto text-center space-y-6">
                        <h2 className="text-3xl font-bold text-orange-500 mb-2">Meet Our Dream Team</h2>
                        <p className="text-xl text-white">It takes a team of dedicated providers to make sure our clinic is providing the best care in the community. We&#39;re fortunate to have some of the best dedicating their time, energy, and expertise to your needs.</p>
                    </div>
                    <EmployeeHeadshots/>
                </section>

                <section className="bg-[url(/imgs/stock_photos/beach_mindfulness.jpg)] bg-cover bg-center h-100 flex items-center justify-center text-white">
                    <div className="container mx-auto text-center p-8 space-y-4">
                        <h2 className="text-2xl">Contact us today to get additional information on services or how we can help better you or your families life.</h2>
                        <div className="flex justify-center mt-12">
                            <button className="rounded-full text-bold text-white bg-linear-to-r from-purple-500 to-orange-500 px-4 py-2 hoever:bg-linear-to-r hover:from-purple-600 hover:to-orange-600 transition duration-300">
                            <a href="/contact">Learn More</a>
                            </button>
                        </div>
                    </div>
                </section>
        </main>
    </>
  );
}
