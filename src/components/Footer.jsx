import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-400 py-16 font-sans relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600"></div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6 lg:col-span-2">
                        <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                            <span className="text-orange-500">College Pe Charcha</span>
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                            Maharashtra's only student-led initiative connecting aspiring students with seniors from top colleges and professionals from dream companies.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="https://www.instagram.com/collegepecharcha" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="https://www.linkedin.com/company/college-pe-charcha" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                            <a href="https://www.youtube.com/@techzdada1103" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/college-predictor" className="hover:text-orange-400 transition-colors">College Predictor</Link></li>
                            <li><Link to="/cutoff-predictor" className="hover:text-orange-400 transition-colors">Cutoff Predictor</Link></li>
                            <li><Link to="/college-comparison" className="hover:text-orange-400 transition-colors">College Comparison</Link></li>
                            <li><a href="https://www.collegepecharcha.in/colleges" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Colleges</a></li>
                            <li><a href="https://www.collegepecharcha.in/resources" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Resources</a></li>
                            <li><a href="https://www.collegepecharcha.in/events" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Events</a></li>
                            <li><a href="https://www.collegepecharcha.in/team" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Team</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3">
                                <span className="text-orange-500 opacity-80">✉</span>
                                <a href="mailto:collegepecharcha11@gmail.com" className="hover:text-white transition-colors">collegepecharcha11@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-orange-500 opacity-80">📞</span>
                                <span>+91 7499957162</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-center md:text-left">
                    <p>© 2024 College Pe Charcha. All rights reserved. Made with <span className="text-red-500 animate-pulse">❤️</span> by students, for students.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
