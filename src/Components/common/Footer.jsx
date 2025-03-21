import React from 'react';

import ComplaintBox from "../../assets/Complaintbox.jpg"
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

export const Footer = () => {
    return (
        <div className="w-[100vw] mt-16 h-[50vh] md:mt-24 lg:mt-44 px-4 sm:px-6 md:px-8 lg:px-12  bg-indigo-500 p-5 text-slate-200 rounded-t-md overflow-x-hidden">
            <footer className="flex flex-col md:flex-row
            md:items-center justify-around
            mt-5
              ">
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between flex-wrap md:space-x-6 lg:space-x-12">
                    <div className="flex flex-col mb-6 md:mb-0 ">
                        <ul className="flex flex-col space-y-2 font-thin">
                            <li>
                                <Link to="/" className="hover:text-white hover:font-normal transition-all duration-250 ">Home</Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white hover:font-normal transition-all duration-250 ">About</Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white hover:font-normal transition-all duration-250 ">Contact</Link>
                            </li>
                            <li>
<Link to="/" className="hover:text-white hover:font-normal transition-all duration-250">Privacy</Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white hover:font-normal hover:scale-75 transition-all duration-250 ">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden md:block border-l border-slate-300 mx-4" style={{ height: 'auto' }}></div>
                    <div className="flex flex-col mb-6 md:mb-0">
                        <ul className="flex flex-col space-y-2 font-thin">
                            <li>
                                <a href="mailto:sujitwalunj1589@gmail.com" className="hover:text-white  transition-all duration-250 ">sujitwalunj1589@gmail.com</a>
                            </li>
                            <li>
                                <a href="tel:7058981589" className="hover:text-white hover:font-normal transition-all duration-250 ">7058981589</a>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden md:block border-l border-slate-300 mx-4" style={{ height: 'auto' }}></div>
                    <div className="flex flex-col mb-6 md:mb-0">
                        <ul className="flex flex-col space-y-2 font-thin">
                            <li>
                                <a href="#" className="flex items-center gap-2 hover:text-white hover:font-normal transition-all duration-250 ">
                                    <CiLinkedin />
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-2 hover:text-white hover:font-normal transition-all duration-250 ">
                                    <FaGithub />
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-2 hover:text-white hover:font-normal transition-all duration-250 ">
                                    <FaInstagram />
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-2 hover:text-white hover:font-normal transition-all duration-250 ">
                                    <FaWhatsapp />
                                    WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};
