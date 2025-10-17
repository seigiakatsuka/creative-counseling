import React from 'react'
import { TiSocialFacebook } from "react-icons/ti";

const Footer = () => {
    return (
        <>
            <footer className="bg-gray-900 text-gray-300 py-8">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Creative Counseling</h3>
                        <p>
                            163 Stratford Court, Suit 170,
                            <br/>
                            Winston-Salem, NC, United States
                        </p>
                        <div>
                            <a href="https://facebook.com/creativecounseling.net" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-5 w-5 fill-current hover:text-white"><TiSocialFacebook /></a>
                        </div>
                    </div>
                    <div>
                        <p className="text-center text-gray-600">
                            &copy; {new Date().getFullYear()} Creative Counseling. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer
