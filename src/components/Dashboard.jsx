import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { X, MessageCircle, Users, GraduationCap, Sparkles, Award, CheckCircle, ArrowRight, TrendingUp, GitCompare, FileText, Briefcase, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import Footer from './Footer';

const SparkleDivider = () => (
    <div className="relative pt-0 pb-20 md:pb-28 overflow-hidden z-20">
        <div className="w-full flex items-center justify-center">
            {/* Main Gradient Line - Spans more width */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="w-[90%] h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
            />

            {/* Thinner, brighter core for visibility */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                className="absolute inset-x-[10%] h-[0.5px] bg-gradient-to-r from-transparent via-orange-500/80 to-transparent"
            />
        </div>
    </div>
);

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
        <div className="min-h-screen bg-[#FFFBF2]">
            {/* Community Popup */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 max-w-sm w-full p-3 sm:p-4 md:bottom-8 md:right-8"
                    >
                        <div className="bg-[#FFFBF2] rounded-2xl shadow-2xl border border-orange-100 p-6 relative overflow-hidden">
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

            {/* Hero Section */}
            <section className="relative overflow-hidden min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen flex items-center bg-[#FFFBF2]">
                {/* Background Decoration - Premium Gold/Champagne Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,#000_50%,transparent_100%)]"></div>

                {/* Hero Top Logo - Responsive Position */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                        opacity: 1,
                        y: [0, -10, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.8 },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute z-30 top-4 right-4 md:top-12 md:left-1/2 md:-translate-x-1/2 md:right-auto"
                >
                    <div className="relative group">
                        {/* Premium Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 via-amber-400/20 to-orange-500/20 rounded-full blur-2xl group-hover:opacity-100 transition-opacity duration-500 opacity-70"></div>

                        <div className="relative bg-white/20 backdrop-blur-xl p-4 sm:p-6 rounded-[2rem] border border-white/40 shadow-2xl flex items-center justify-center">
                            <img
                                src="/college_pe_charcha_logo.png"
                                alt="Logo"
                                className="h-10 sm:h-16 w-auto object-contain"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Golden Glows */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply" style={{ animationDelay: '1s' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 relative w-full z-10">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, staggerChildren: 0.2 }}
                            className="space-y-6 sm:space-y-8 z-10 text-center lg:text-left"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                                transition={{
                                    opacity: { duration: 0.6 },
                                    scale: { type: "spring", stiffness: 200, damping: 15 },
                                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100/80 to-orange-50/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-orange-200 shadow-sm"
                            >
                                <div className="relative">
                                    <CheckCircle className="w-4 h-4 text-green-600 relative z-10" />
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-green-400 rounded-full -z-0"
                                    />
                                </div>
                                <span className="text-sm font-bold text-gray-700 tracking-tight">Trusted by 15,000+ Students</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight"
                            >
                                Find the Right<br />
                                <span className="relative">
                                    College
                                    <motion.span
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ delay: 1, duration: 0.8 }}
                                        className="absolute bottom-1 left-0 h-3 bg-orange-200/50 -z-10 rounded-full"
                                    />
                                </span>
                                <span className="text-[#f68014] animate-pulse-slow"> with Confidence</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-lg sm:text-xl text-gray-600 max-w-lg leading-relaxed mx-auto lg:mx-0 font-medium"
                            >
                                Not sure which college you'll get? Enter your percentile and see your options instantly. We've <span className="text-orange-600 font-bold">analyzed 5 years</span> of MHT-CET cutoff data.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 justify-center lg:justify-start"
                            >
                                <Link to="/college-predictor" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(246, 128, 20, 0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full min-h-[56px] px-8 py-4 bg-[#f68014] text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 text-lg"
                                    >
                                        Predict College →
                                    </motion.button>
                                </Link>
                                <Link to="/cutoff-predictor" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05, borderColor: "#f68014", color: "#f68014" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full min-h-[56px] px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-orange-50 transition-all bg-white/50 backdrop-blur-sm text-lg"
                                    >
                                        Predict Cutoff for 2026 →
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        <div className="relative flex items-center justify-center lg:justify-end overflow-visible order-first lg:order-last mb-8 lg:mb-0">
                            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
                                <div className="relative h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full">
                                    <Spline
                                        scene="https://prod.spline.design/GnHmmYaecwIV0ptE/scene.splinecode"
                                        className="w-full h-full"
                                    />
                                </div>

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
                                        className="bg-gradient-to-br from-[#FFFBF2]/90 via-[#FFFBF2]/85 to-[#FFFBF2]/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#FFFBF2]/60 px-4 py-4 sm:px-6 sm:py-6 relative group cursor-pointer"
                                    >
                                        <motion.div
                                            animate={{
                                                opacity: [0.3, 0.6, 0.3],
                                                scale: [1, 1.05, 1]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute -inset-1 bg-gradient-to-r from-orange-400/30 via-orange-500/30 to-orange-600/30 rounded-3xl blur-xl -z-10"
                                        />

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
                                                    <span className="text-[10px] sm:text-xs text-gray-600 font-medium">Online</span>
                                                </div>
                                            </div>
                                        </div>

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
            </section >

            <section className="pb-32 sm:pb-48 pt-0 bg-[#FFFBF2] relative z-20" id="tools">
                <SparkleDivider />

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
                        <Link to="/college-predictor" className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="bg-[#FFFBF2] rounded-3xl p-8 shadow-xl border border-orange-100 hover:border-orange-300 transition-all duration-300 h-full flex flex-col relative overflow-hidden group-hover:-translate-y-2">
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

                        <Link to="/cutoff-predictor" className="group relative md:-mt-8 md:mb-8 z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl border border-orange-500/30 hover:border-orange-400 transition-all duration-300 h-full flex flex-col relative overflow-hidden transform group-hover:-translate-y-2">
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

                        <Link to="/college-comparison" className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="bg-[#FFFBF2] rounded-3xl p-8 shadow-xl border border-yellow-100 hover:border-yellow-300 transition-all duration-300 h-full flex flex-col relative overflow-hidden group-hover:-translate-y-2">
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

            <section className="pb-40 sm:pb-52 lg:pb-64 pt-0 bg-gradient-to-b from-[#FFFBF2] to-[#FFFBF2] relative overflow-hidden">
                <SparkleDivider />
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                {/* Golden Glows */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 mb-6">
                                <Sparkles className="w-4 h-4 text-amber-600" />
                                <span className="text-amber-800 font-bold text-xs uppercase tracking-wider">AI Powered</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight text-gray-900">
                                Data that drives <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Real Results.</span>
                            </h2>
                            <p className="text-gray-600 text-lg sm:text-xl mb-8 leading-relaxed max-w-lg">
                                We don't just aggregate data; we analyze it. Our timeline shows exactly how deeply we track admission rounds year over year to ensure precision.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 rounded-2xl bg-[#FFFBF2] border border-amber-100 shadow-xl shadow-amber-100/50 group hover:-translate-y-1 transition-transform duration-300">
                                    <div className="text-3xl font-black text-gray-900 mb-1">350+</div>
                                    <div className="text-sm text-gray-500 font-medium">Top Colleges</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-[#FFFBF2] border border-amber-100 shadow-xl shadow-amber-100/50 group hover:-translate-y-1 transition-transform duration-300">
                                    <div className="text-3xl font-black text-amber-600 mb-1">2021-25</div>
                                    <div className="text-sm text-gray-500 font-medium">Considering Every Round's cutoff</div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Visualization */}
                        <div className="bg-gray-900 rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-800 shadow-2xl relative overflow-hidden">
                            {/* Glass Effect & Glows */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-800/80 backdrop-blur-sm z-0"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl mix-blend-screen opacity-50"></div>

                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-8 flex items-center gap-3 text-white">
                                    <TrendingUp className="text-amber-500 w-5 h-5" /> Analysis Depth (Cap Rounds)
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
                                                <div className="absolute inset-0 top-1/2 h-0.5 bg-gray-800 -translate-y-1/2 rounded-full w-full"></div>

                                                {/* Round Indicators */}
                                                <div className="relative z-10 flex gap-6 w-full px-2">
                                                    {Array.from({ length: item.rounds }).map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ scale: 0 }}
                                                            whileInView={{ scale: 1 }}
                                                            transition={{ delay: i * 0.15 }}
                                                            className={`w-3 h-3 rounded-full ${item.color} shadow-[0_0_8px_rgba(255,255,255,0.3)] ring-2 ring-gray-900`}
                                                            title={`Round ${i + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-xs font-bold text-gray-500 uppercase w-16 text-right">{item.rounds} Round</div>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-800">
                                        <div className="w-16 font-bold text-amber-500 font-mono animate-pulse">2026</div>
                                        <div className="flex-1 text-xs text-amber-500/80 font-medium tracking-wide">
                                            PREDICTING LIVE TRENDS...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-20 sm:pb-32 pt-0 bg-gradient-to-r from-orange-600 to-orange-700 relative overflow-hidden">
                <SparkleDivider />
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
                        <div className="relative w-full md:w-3/4 lg:w-4/5 xl:w-[85%] min-w-[300px] -mr-8 lg:-mr-16">
                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 group transform hover:scale-[1.02] transition-transform duration-500 bg-black">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/y459gWKoaEw"
                                    title="Mentorship Guidance"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-4 text-orange-100 font-bold text-sm sm:text-base tracking-wide">
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="text-red-400"
                                >
                                    🔴
                                </motion.span>
                                Watch how we help you
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Offer Section - Reordered with Full Width Cards */}
            <section className="pb-16 sm:pb-24 pt-0 bg-[#FFFBF2] relative overflow-hidden">
                <SparkleDivider />
                {/* Background Decoration - Premium Gold/Champagne Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,#000_50%,transparent_100%)]"></div>

                {/* Golden Glows */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 sm:mb-16">
                        <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Features</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">What We Offer</h2>
                        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Your complete toolkit for engineering admission success.</p>
                    </div>

                    <div className="space-y-8">
                        {/* 1. Tools Suite - Full Width - Blue Floating Border */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="relative bg-[#FFFBF2] rounded-3xl p-8 md:p-10 shadow-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group hover:-translate-y-1 overflow-visible"
                        >
                            {/* Floating Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 -z-10"></div>

                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm ring-4 ring-blue-50/50">
                                        <FileText className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Tools for <span className="text-blue-600">Cap-Rounds</span></h3>
                                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                        Comprehensive AI-powered tools designed to simplify your admission process. From prediction to comparison, we have everything covered.
                                    </p>
                                    <Link to="/college-predictor" className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                        Explore Tools <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 backdrop-blur-sm">
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            "College Predictor",
                                            "Cutoff Predictor",
                                            "Comparison Tool",
                                            "College List Generator",
                                            "Historical Data Analyzer"
                                        ].map((tool, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-700 text-[15px] font-semibold">
                                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                                </div>
                                                {tool}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. Senior Mentorship - Full Width - Golden/Orange Floating Border */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative bg-[#FFFBF2] rounded-3xl p-8 md:p-10 shadow-xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 group hover:-translate-y-1 overflow-visible"
                        >
                            {/* Floating Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-amber-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 -z-10"></div>

                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                                <div className="order-2 md:order-1 bg-orange-50/50 rounded-2xl p-6 border border-orange-100/50 backdrop-blur-sm">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl shadow-sm border border-orange-100">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">SP</div>
                                            <div>
                                                <div className="font-bold text-gray-900">Student Reviews</div>
                                                <div className="text-xs text-gray-500">Authentic feedback</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl shadow-sm border border-orange-100">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">PL</div>
                                            <div>
                                                <div className="font-bold text-gray-900">Placement Reality</div>
                                                <div className="text-xs text-gray-500">Real packages & stats</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl shadow-sm border border-orange-100">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">CL</div>
                                            <div>
                                                <div className="font-bold text-gray-900">Campus Life</div>
                                                <div className="text-xs text-gray-500">Events & Culture</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-1 md:order-2">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm ring-4 ring-orange-50/50">
                                        <Users className="w-8 h-8 text-orange-600" />
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Talk to <span className="text-orange-600">Seniors</span></h3>
                                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                        Get the <span className="font-bold text-gray-900 bg-orange-50 px-1 rounded">authentic reality</span> of your dream college. Don't rely on brochures; talk to students who are actually living it.
                                    </p>
                                    <a href="https://www.collegepecharcha.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-orange-600 hover:text-orange-700 transition-colors">
                                        Connect Now <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. Vision to Visionaries - Full Width - Green Floating Border */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="relative bg-[#FFFBF2] rounded-3xl p-8 md:p-10 shadow-xl border-2 border-green-200 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 group hover:-translate-y-1 overflow-visible"
                        >
                            {/* Floating Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 -z-10"></div>

                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm ring-4 ring-green-50/50">
                                        <Briefcase className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Vision to <span className="text-green-600">Visionaries</span></h3>
                                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                        Campus to Corporate roadmap. Connect with alumni placed in top companies and get a <span className="font-bold text-gray-900 bg-green-50 px-1 rounded">career roadmap</span> from Day 1.
                                    </p>
                                    <a href="https://www.collegepecharcha.in/events" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-green-600 hover:text-green-700 transition-colors">
                                        View Events <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                                <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100/50 backdrop-blur-sm">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> Expert Sessions
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> Resume Building
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> Mock Interviews
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> Industry Trends
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Extended Footer */}
            <Footer />
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
    @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
    }
    .animate-pulse-slow {
        animation: pulse-slow 3s ease-in-out infinite;
    }
`;
document.head.appendChild(style);
