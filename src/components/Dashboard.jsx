import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { X, MessageCircle, Users, GraduationCap, Sparkles, Award, CheckCircle, ArrowRight, TrendingUp, GitCompare, FileText, Briefcase, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const Dashboard = () => {
    const [showPopup, setShowPopup] = useState(false);

    // Typing animation for greeting
    const fullText = "I am College Mitra, your AI-based college predictor. I will help you with selecting colleges, comparing them, and predicting cutoffs for next year!";
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Typing effect
    useEffect(() => {
        const startDelay = setTimeout(() => {
            setIsTyping(true);
        }, 2500);

        return () => clearTimeout(startDelay);
    }, []);

    useEffect(() => {
        if (!isTyping) return;

        if (typedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [typedText, isTyping, fullText]);

    return (
        <div className="min-h-screen bg-orange-50">
            {/* Community Popup */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 max-w-sm w-full p-3 sm:p-4 md:bottom-8 md:right-8"
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

            {/* Hero Section - Enhanced with gradients */}
            <section className="relative overflow-hidden min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen flex items-center bg-gradient-to-br from-white via-orange-50/20 to-white">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 relative w-full z-10">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-5 sm:space-y-6 z-10 text-center lg:text-left"
                        >
                            {/* Trust Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-orange-50 px-4 py-2 rounded-full border border-orange-200 shadow-sm"
                            >
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-semibold text-gray-700">Trusted by 15,000+ Aspirants</span>
                            </motion.div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                                Find the Right<br />
                                College <span className="text-[#f68014]">with Confidence</span>
                            </h1>

                            <p className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed mx-auto lg:mx-0">
                                Not sure which college you'll get? Enter your percentile and see your options instantly. We've analyzed 5 years of MHT-CET cutoff data so you don't have to.
                            </p>

                            {/* CTA Buttons - Optimized for Touch */}
                            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-3 justify-center lg:justify-start">
                                <Link to="/college-predictor" className="w-full sm:w-auto">
                                    <button className="w-full min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 bg-[#f68014] text-white font-semibold rounded-lg hover:bg-orange-600 active:scale-98 transition-all shadow-lg shadow-orange-500/25 text-base sm:text-base">
                                        Predict College →
                                    </button>
                                </Link>
                                <Link to="/cutoff-predictor" className="w-full sm:w-auto">
                                    <button className="w-full min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 active:scale-98 transition-all bg-white text-base sm:text-base">
                                        Predict Cutoff for 2026 →
                                    </button>
                                </Link>
                            </div>

                            {/* Simple Stats */}
                            <div className="flex justify-center lg:justify-start gap-6 sm:gap-8 lg:gap-10 pt-4 sm:pt-6 text-sm">
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900">19,500+</div>
                                    <div className="text-gray-500 text-xs sm:text-sm">records</div>
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900">2021-25</div>
                                    <div className="text-gray-500 text-xs sm:text-sm">data</div>
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-[#f68014]">Free</div>
                                    <div className="text-gray-500 text-xs sm:text-sm">always</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right - 3D AI Assistant - NOW VISIBLE ON ALL DEVICES! */}
                        <div className="relative flex items-center justify-center lg:justify-end overflow-visible order-first lg:order-last mb-8 lg:mb-0">
                            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
                                {/* 3D Spline Robot - Visible everywhere */}
                                <div className="relative h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full">
                                    <Spline
                                        scene="https://prod.spline.design/GnHmmYaecwIV0ptE/scene.splinecode"
                                        className="w-full h-full"
                                    />
                                </div>

                                {/* College Mitra Greeting Bubble - Mobile Responsive */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50, y: -20 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        y: 0,
                                        y: [0, -10, 0]
                                    }}
                                    transition={{
                                        opacity: { delay: 1, duration: 0.6 },
                                        x: { delay: 1, duration: 0.6, ease: "easeOut" },
                                        y: { delay: 2, duration: 3, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:-top-8 sm:-right-12 md:-right-20 lg:-right-32 xl:-right-44 max-w-[280px] sm:max-w-xs md:max-w-sm z-20"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-gradient-to-br from-white/90 via-white/85 to-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 px-4 py-4 sm:px-6 sm:py-6 relative group cursor-pointer"
                                    >
                                        {/* Animated glow effect */}
                                        <motion.div
                                            animate={{
                                                opacity: [0.3, 0.6, 0.3],
                                                scale: [1, 1.05, 1]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute -inset-1 bg-gradient-to-r from-orange-400/30 via-orange-500/30 to-orange-600/30 rounded-3xl blur-xl -z-10"
                                        />

                                        {/* College Mitra Badge */}
                                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                            <motion.div
                                                animate={{ rotate: [0, 5, -5, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg shadow-orange-500/40 group-hover:shadow-orange-500/60 transition-shadow"
                                            >
                                                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                            </motion.div>
                                            <div className="flex-1">
                                                <motion.span
                                                    className="font-bold text-gray-900 text-sm sm:text-base block"
                                                    animate={{ opacity: [1, 0.8, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    College Mitra
                                                </motion.span>
                                                <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.3, 1],
                                                            opacity: [1, 0.7, 1]
                                                        }}
                                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full shadow-md shadow-green-500/60"
                                                    />
                                                    <span className="text-[10px] sm:text-xs text-gray-600 font-medium">Online & Ready</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Greeting Message */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1.5, duration: 0.5 }}
                                            className="text-gray-800 text-xs sm:text-sm leading-relaxed space-y-2"
                                        >
                                            <motion.p
                                                animate={{ scale: [1, 1.05, 1] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="font-bold text-orange-600 text-sm sm:text-base flex items-center gap-2"
                                            >
                                                Hello Aspirants!!
                                            </motion.p>
                                            <p className="font-medium min-h-[70px] sm:min-h-[80px] text-xs sm:text-sm">
                                                {typedText}
                                                {isTyping && typedText.length < fullText.length && (
                                                    <span className="inline-block w-0.5 h-3 sm:h-4 bg-orange-600 ml-1 animate-pulse"></span>
                                                )}
                                            </p>
                                        </motion.div>

                                        {/* Quick Action Hint with Pulse */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 2, duration: 0.5 }}
                                            className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-300/50 flex items-center gap-2 sm:gap-2.5 text-[10px] sm:text-xs"
                                        >
                                            <div className="flex gap-1 sm:gap-1.5">
                                                <motion.div
                                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                    className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                                                    className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                                                    className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                                                />
                                            </div>
                                            <span className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
                                                Try the tools below to get started! ✨
                                            </span>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
            </section >

            {/* Tools Section - Premium & Colorful */}
            <section className="py-16 sm:py-24 bg-white relative z-20 -mt-8 sm:-mt-12" id="tools">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-orange-100/80 text-orange-700 px-5 py-2 rounded-full mb-4 shadow-sm border border-orange-200"
                        >
                            <Sparkles size={16} className="text-orange-500" />
                            <span className="font-bold text-sm tracking-wide uppercase">100% Free for Everyone</span>
                        </motion.div>
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Tools For Cap-Rounds</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Premium quality prediction tools at zero cost. No hidden fees.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 1. College Predictor - Warm Orange */}
                        <Link to="/college-predictor" className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100 hover:border-orange-300 transition-all duration-300 h-full flex flex-col relative overflow-hidden group-hover:-translate-y-2">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <GraduationCap size={120} className="text-orange-600" />
                                </div>

                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <GraduationCap size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">College Predictor</h3>
                                <p className="text-gray-500 mb-6 leading-relaxed flex-grow">
                                    Input your MHT-CET percentile and category to get a <span className="font-semibold text-orange-600">tailored list of colleges</span> you have high chances of getting into.
                                </p>

                                <div className="flex items-center text-orange-600 font-bold group-hover:gap-3 transition-all">
                                    Predict Now <ArrowRight size={20} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                        {/* 2. Cutoff Analyzer - THE STAR (Dark/Gold) */}
                        <Link to="/cutoff-predictor" className="group relative md:-mt-8 md:mb-8 z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl border border-orange-500/30 hover:border-orange-400 transition-all duration-300 h-full flex flex-col relative overflow-hidden transform group-hover:-translate-y-2">
                                {/* Badge */}
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                    <Sparkles size={12} /> MOST POPULAR
                                </div>

                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <TrendingUp size={120} className="text-orange-500" />
                                </div>

                                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-orange-500/30 shadow-xl transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                                    <TrendingUp size={40} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">Cutoff Analyzer</h3>
                                <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                                    Deep dive into <span className="text-orange-400 font-bold">5 years of historical data</span>. Visualize trends and see what cutoffs might be in 2026.
                                </p>

                                <div className="flex items-center text-orange-400 font-bold group-hover:gap-3 transition-all bg-white/5 p-3 rounded-xl border border-white/10 group-hover:bg-white/10">
                                    Start Analysis <ArrowRight size={20} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                        {/* 3. Comparison Tool - Vibrant Gold/Yellow */}
                        <Link to="/college-comparison" className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-yellow-100 hover:border-yellow-300 transition-all duration-300 h-full flex flex-col relative overflow-hidden group-hover:-translate-y-2">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <GitCompare size={120} className="text-yellow-600" />
                                </div>

                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <GitCompare size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">College Comparison</h3>
                                <p className="text-gray-500 mb-6 leading-relaxed flex-grow">
                                    Confused between two options? <span className="font-semibold text-yellow-600">Compare side-by-side</span> based on placements, fees, and cutoffs.
                                </p>

                                <div className="flex items-center text-yellow-600 font-bold group-hover:gap-3 transition-all">
                                    Compare Colleges <ArrowRight size={20} className="ml-2" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mentorship / Community Section - Refined Spacing */}
            <section className="py-16 sm:py-24 bg-gradient-to-r from-orange-600 to-orange-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-16">
                        <div className="text-white space-y-4 sm:space-y-6 max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm border border-white/20">
                                <GraduationCap size={18} className="text-orange-200" />
                                <span className="text-orange-100 font-medium text-xs sm:text-sm">Mentorship Program</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                Confused about College Life? <br className="hidden sm:block" />
                                <span className="text-orange-200">Talk to Seniors Directly.</span>
                            </h2>
                            <p className="text-orange-100 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Get honest reviews, placement reality checks, and campus insights from students already studying in your dream colleges (COEP, VJTI, SPIT, PICT & more).
                            </p>
                            <div className="pt-2 sm:pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                                <a
                                    href="https://chat.whatsapp.com/HbLY6umdG2G5jKfeRIfbxf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-xl transition-all shadow-lg transform hover:-translate-y-1 text-sm sm:text-base"
                                >
                                    Join Community For Free
                                </a>
                                <a
                                    href="https://www.collegepecharcha.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 text-white border border-orange-400/30 hover:bg-orange-800/40 font-bold rounded-xl transition-all shadow-lg transform hover:-translate-y-1 text-sm sm:text-base backdrop-blur-sm"
                                >
                                    Visit Main Website
                                </a>
                            </div>
                        </div>
                        <div className="relative w-full md:w-3/5 lg:w-2/3 xl:w-2/3 min-w-[300px] -mr-8 lg:-mr-12">
                            {/* Video Container */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group transform hover:scale-105 transition-transform duration-300 bg-black">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/y459gWKoaEw"
                                    title="Mentorship Guidance"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-3 text-orange-100/80 text-sm font-medium">
                                <span className="animate-pulse">🔴</span> Watch how we help you
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Offer Section - Reordered */}
            <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 sm:mb-16">
                        <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">Features</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">What We Offer</h2>
                        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Your complete toolkit for engineering admission success.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {/* 1. Tools Suite */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group hover:-translate-y-2 overflow-hidden flex flex-col h-full min-h-[450px]"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                                    <FileText className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Tools for <br /><span className="text-blue-600">Cap-Rounds</span></h3>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {[
                                        "College Predictor",
                                        "Cutoff Predictor",
                                        "Comparison Tool",
                                        "College List Generator",
                                        "Historical Data Analyzer"
                                    ].map((tool, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-700 text-[15px] font-semibold">
                                            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            </div>
                                            {tool}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* 2. Senior Mentorship */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 group hover:-translate-y-2 overflow-hidden flex flex-col h-full min-h-[450px]"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                                    <Users className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Talk to <br /><span className="text-orange-600">Seniors</span></h3>
                                <p className="text-gray-600 leading-relaxed mb-8 flex-1 text-[15px]">
                                    Get the <span className="font-bold text-gray-900 bg-orange-50 px-1 rounded">authentic reality</span> of your dream college. Connect directly with current students to know about:
                                    <span className="block mt-4 text-sm font-medium text-gray-500 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> Campus Life & Culture</span>
                                    <span className="block mt-2 text-sm font-medium text-gray-500 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> Real Placement Stats</span>
                                    <span className="block mt-2 text-sm font-medium text-gray-500 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> Hidden Truths</span>
                                </p>
                                <a href="https://www.collegepecharcha.in" target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-100 group-hover/btn:bg-orange-500 group-hover/btn:border-orange-500 transition-all duration-300 group/btn">
                                    <span className="font-bold text-orange-700 group-hover/btn:text-orange-600 transition-colors">Connect Now</span>
                                    <div className="bg-orange-200 p-2 rounded-lg group-hover/btn:bg-white/20 transition-colors">
                                        <ArrowRight className="w-4 h-4 text-orange-700 group-hover/btn:text-orange-600" />
                                    </div>
                                </a>
                            </div>
                        </motion.div>

                        {/* 3. Vision to Visionaries */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 group hover:-translate-y-2 overflow-hidden flex flex-col h-full min-h-[450px]"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                                    <Briefcase className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Vision to <br /><span className="text-green-600">Visionaries</span></h3>
                                <p className="text-gray-600 leading-relaxed mb-8 flex-1 text-[15px]">
                                    Campus to Corporate roadmap. Connect with alumni placed in top companies and get a <span className="font-bold text-gray-900 bg-green-50 px-1 rounded">career roadmap</span> from Day 1.
                                </p>
                                <a href="https://www.collegepecharcha.in/events" target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-100 group-hover/btn:bg-green-500 group-hover/btn:border-green-500 transition-all duration-300 group/btn">
                                    <span className="font-bold text-green-700 group-hover/btn:text-green-600 transition-colors">View Events</span>
                                    <div className="bg-green-200 p-2 rounded-lg group-hover/btn:bg-white/20 transition-colors">
                                        <ArrowRight className="w-4 h-4 text-green-700 group-hover/btn:text-green-600" />
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats & Timeline Section - Moved to Bottom (Above Footer) */}
            <section className="py-16 sm:py-24 lg:py-32 bg-gray-900 relative overflow-hidden text-white">
                {/* Checkbox/Grid Pattern Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 mb-6">
                                <Sparkles className="w-4 h-4 text-orange-400" />
                                <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">Unmatched Accuracy</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                                Data that drives <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Real Results.</span>
                            </h2>
                            <p className="text-gray-400 text-lg sm:text-xl mb-8 leading-relaxed max-w-lg">
                                We don't just aggregate data; we analyze it. Our timeline shows exactly how deeply we track admission rounds year over year to ensure precision.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                                    <div className="text-3xl font-black text-white mb-1 group-hover:scale-105 transition-transform origin-left">350+</div>
                                    <div className="text-sm text-gray-400">Top Colleges</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                                    <div className="text-3xl font-black text-orange-400 mb-1 group-hover:scale-105 transition-transform origin-left">99.8%</div>
                                    <div className="text-sm text-gray-400">Prediction Accuracy</div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Visualization */}
                        <div className="bg-gray-800/50 rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 backdrop-blur-xl shadow-2xl">
                            <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                                <TrendingUp className="text-orange-400 w-5 h-5" /> Analysis Depth (Cap Rounds)
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { year: 2021, rounds: 2, color: "bg-green-500", label: "R1" },
                                    { year: 2022, rounds: 3, color: "bg-blue-500", label: "R1-R3" },
                                    { year: 2023, rounds: 3, color: "bg-purple-500", label: "R1-R3" },
                                    { year: 2024, rounds: 3, color: "bg-pink-500", label: "R1-R3" },
                                    { year: 2025, rounds: 4, color: "bg-orange-500", label: "R1-R4" }
                                ].map((item) => (
                                    <div key={item.year} className="flex items-center gap-4">
                                        <div className="w-16 font-bold text-gray-400 font-mono text-sm sm:text-base">{item.year}</div>
                                        <div className="flex-1 relative h-6 flex items-center">
                                            {/* Track Line */}
                                            <div className="absolute inset-0 top-1/2 h-0.5 bg-white/10 -translate-y-1/2 rounded-full w-full"></div>

                                            {/* Round Indicators */}
                                            <div className="relative z-10 flex gap-6 w-full px-2">
                                                {Array.from({ length: item.rounds }).map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ scale: 0 }}
                                                        whileInView={{ scale: 1 }}
                                                        transition={{ delay: i * 0.15 }}
                                                        className={`w-3 h-3 rounded-full ${item.color} shadow-[0_0_8px_rgba(255,255,255,0.3)] ring-2 ring-gray-800`}
                                                        title={`Round ${i + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-xs font-bold text-gray-500 uppercase w-16 text-right">{item.rounds} Round</div>
                                    </div>
                                ))}
                                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10 opacity-70">
                                    <div className="w-16 font-bold text-orange-400 font-mono animate-pulse">2026</div>
                                    <div className="flex-1 text-xs text-orange-400/80 font-medium tracking-wide">
                                        PREDICTING LIVE TRENDS...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Extended Footer */}
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
                                <li><a href="https://www.collegepecharcha.in/colleges" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Colleges</a></li>
                                <li><a href="https://www.collegepecharcha.in/resources" className="hover:text-orange-400 transition-colors">Resources</a></li>
                                <li><a href="https://www.collegepecharcha.in/events" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Events</a></li>
                                <li><a href="https://www.collegepecharcha.in/team" className="hover:text-orange-400 transition-colors">Team</a></li>
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
        </div>
    );
};

export default Dashboard;

// Add this style section at the end for mobile animations
const style = document.createElement('style');
style.textContent = `
    .active\\:scale-98:active {
        transform: scale(0.98);
    }
`;
document.head.appendChild(style);
