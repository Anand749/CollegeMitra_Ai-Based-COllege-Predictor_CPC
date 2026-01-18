import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { X, MessageCircle, Users, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-orange-50">
            {/* Community Popup */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-4 right-4 z-50 max-w-sm w-full p-4 md:bottom-8 md:right-8"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 p-6 relative overflow-hidden">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 rounded-full p-1"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-start gap-4">
                                <div className="bg-orange-100 p-3 rounded-xl">
                                    <MessageCircle className="w-8 h-8 text-[#f68014]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">
                                        Talk to Seniors from your <span className="text-[#f68014]">Dream College!</span>
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                        Join our community to connect with mentors from COEP, VJTI, SPIT & more.
                                    </p>
                                    <a
                                        href="https://chat.whatsapp.com/HbLY6umdG2G5jKfeRIfbxf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-lg transition-all shadow-md gap-2"
                                    >
                                        <Users size={18} />
                                        Join Community
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section - Full viewport height */}
            <section className="relative overflow-hidden min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative w-full">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Left Content */}
                        <div className="space-y-6 z-10">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                                Find the Right<br />
                                College <span className="text-[#f68014]">with Confidence</span>
                            </h1>

                            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                                Not sure which college you'll get? Enter your percentile and see your options instantly. We've analyzed 5 years of MHT-CET cutoff data so you don't have to.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Link to="/college-predictor">
                                    <button className="px-7 py-3.5 bg-[#f68014] text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                                        Check My Colleges →
                                    </button>
                                </Link>
                                <Link to="/cutoff-predictor">
                                    <button className="px-7 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors bg-white">
                                        View Past Cutoffs
                                    </button>
                                </Link>
                            </div>

                            {/* Simple Stats */}
                            <div className="flex gap-10 pt-6 text-sm">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">19,500+</div>
                                    <div className="text-gray-500">records</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">2021-25</div>
                                    <div className="text-gray-500">data</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#f68014]">Free</div>
                                    <div className="text-gray-500">always</div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Illustration */}
                        <div className="relative flex items-center justify-center lg:justify-end overflow-visible">
                            <img
                                src="/frontend.png"
                                alt="Student exploring colleges"
                                className="w-full max-w-none object-contain pointer-events-none select-none"
                                style={{
                                    filter: 'drop-shadow(0 20px 40px rgba(246, 128, 20, 0.1))',
                                    width: '1000px',
                                    marginRight: '-300px',
                                    marginTop: '80px'
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* Mentorship / Community Section */}
            <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="text-white space-y-4 max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                                <GraduationCap size={20} className="text-orange-200" />
                                <span className="text-orange-100 font-medium text-sm">Mentorship Program</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                Confused about College Life? <br />
                                <span className="text-orange-200">Talk to Seniors Directly.</span>
                            </h2>
                            <p className="text-orange-100 text-lg leading-relaxed">
                                Get honest reviews, placement reality checks, and campus insights from students already studying in your dream colleges (COEP, VJTI, SPIT, PICT & more).
                            </p>
                            <div className="pt-4 flex flex-wrap gap-4">
                                <a
                                    href="https://chat.whatsapp.com/HbLY6umdG2G5jKfeRIfbxf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all shadow-lg transform hover:-translate-y-1"
                                >
                                    Join Community For Free
                                </a>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-white/20 blur-xl rounded-full"></div>
                            <Users size={200} className="text-white/90 relative z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section className="py-20 bg-white" id="tools">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Our Tools</h2>
                        <p className="text-gray-500">Everything you need for MHT-CET Mentorship</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* College Predictor */}
                        <Link to="/college-predictor" className="group block bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:bg-orange-200 transition-colors">
                                🎓
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">College Predictor</h3>
                            <p className="text-gray-600 mb-4">Enter your percentile and see which colleges you're likely to get admission in.</p>
                            <span className="text-[#f68014] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                Try Now <span className="text-lg">→</span>
                            </span>
                        </Link>

                        {/* Cutoff Analyzer */}
                        <Link to="/cutoff-predictor" className="group block bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:bg-blue-200 transition-colors">
                                📊
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Cutoff Analyzer</h3>
                            <p className="text-gray-600 mb-4">View 5 years of cutoff trends and predict what cutoffs might be in 2026.</p>
                            <span className="text-[#f68014] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                Analyze <span className="text-lg">→</span>
                            </span>
                        </Link>

                        {/* College Comparison */}
                        <Link to="/college-comparison" className="group block bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:bg-green-200 transition-colors">
                                ⚖️
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">College Comparison</h3>
                            <p className="text-gray-600 mb-4">Compare two colleges side by side with cutoffs, trends and more.</p>
                            <span className="text-[#f68014] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                Compare <span className="text-lg">→</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-white font-bold text-lg mb-4">College Pe Charcha</h3>
                            <p className="text-sm leading-relaxed">Helping MHT-CET aspirants make informed decisions with data-driven insights.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Tools</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/college-predictor" className="hover:text-white transition">College Predictor</Link></li>
                                <li><Link to="/cutoff-predictor" className="hover:text-white transition">Cutoff Analyzer</Link></li>
                                <li><Link to="/college-comparison" className="hover:text-white transition">College Comparison</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Data Sources</h4>
                            <ul className="space-y-2 text-sm">
                                <li>Cet Cell Maharashtra</li>
                                <li>CAP Rounds 2021-2025</li>
                                <li>Official Cutoff Records</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p>© 2026 College Pe Charcha. Made for MHT-CET Aspirants.</p>
                        <div className="flex gap-6">
                            <Link to="/about" className="hover:text-white transition">About Us</Link>
                            <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
