import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Target, Award, Heart, Sparkles, TrendingUp, BookOpen, ArrowLeft } from 'lucide-react';
import Footer from './Footer';

const AboutPage = () => {
    const navigate = useNavigate();
    const stats = [
        { icon: <Users className="w-8 h-8 text-orange-600" />, number: "15000+", label: "Happy Visitors on website" },
        { icon: <Award className="w-8 h-8 text-orange-600" />, number: "100%", label: " Unbiased" },
        { icon: <Target className="w-8 h-8 text-orange-600" />, number: "4500+", label: "Students Helped" },
        { icon: <Award className="w-8 h-8 text-orange-600" />, number: "120+", label: "Expert Mentors" },

    ];

    const values = [
        {
            icon: <Heart className="w-12 h-12 text-orange-600" />,
            title: "Students Centric",
            description: "Everything we do is centered around helping students make informed decisions about their future."
        },
        {
            icon: <Sparkles className="w-12 h-12 text-orange-600" />,
            title: "Authentic Insights",
            description: "Real experiences from actual students who've been through the same journey you're about to embark on."
        },
        {
            icon: <TrendingUp className="w-12 h-12 text-orange-600" />,
            title: "Continuous Growth",
            description: "We're constantly evolving and improving our platform based on student feedback and needs."
        },
        {
            icon: <BookOpen className="w-12 h-12 text-orange-600" />,
            title: "Knowledge Sharing",
            description: "Building a community where knowledge flows freely from experienced seniors to aspiring juniors."
        }
    ];

    const timeline = [
        {
            year: "2024",
            title: "The Beginning",
            description: "Started as a small group of students helping juniors navigate the complex college admission process, successfully guiding 500+ students on our own."
        },
        {
            year: "March 2025",
            title: "Growing Community",
            description: "Expanded to multiple colleges across Maharashtra, building a trusted network of seniors and mentors to guide thousands of students."
        },
        {
            year: "Sept 2025",
            title: "Great Achievement",
            description: "Became Maharashtra's only Non-Profit student-led initiative with 15000+ visitors,120+ seniors on our website."
        },
        {
            year: "2025",
            title: "Campus to Corporate",
            description: "Started connecting students with employees from their dream companies like Microsoft, Amazon, Barclays, and more, bridging the gap between education and industry."
        }
    ];

    return (

        <div className="min-h-screen bg-[#FFFBF2] relative overflow-x-hidden">
            {/* Background Decoration - Premium Gold/Champagne Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            {/* Golden Glows */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply pointer-events-none"></div>
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply pointer-events-none" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="py-12 sm:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Back Button */}
                        <div className="mb-6">
                            <button
                                onClick={() => navigate(-1)}
                                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-orange-200 text-gray-700 hover:text-[#f68014] hover:border-[#f68014] rounded-xl font-medium text-sm sm:text-base transition-all shadow-sm hover:shadow-md"
                            >
                                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span>Back</span>
                            </button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-16"
                        >
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <GraduationCap className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About College Pe Charcha</h1>
                            </div>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Maharashtra's only student-led initiative connecting aspiring students with seniors from top engineering colleges.
                            </p>
                        </motion.div>

                        {/* Stats Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="bg-white rounded-3xl p-6 text-center shadow-2xl border border-orange-100 hover:shadow-3xl transition-all duration-300"
                                >
                                    <div className="flex justify-center mb-4">{stat.icon}</div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-20 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 shadow-sm hover:shadow-lg hover:shadow-orange-100/30 transition-all duration-300 group"
                                    >
                                        <div className="relative overflow-hidden">
                                            <p className="text-xl text-orange-800 font-semibold mb-2 group-hover:text-orange-700 transition-colors">
                                                Making College Selection Simple & Smart
                                            </p>
                                            <p className="text-lg text-gray-700 leading-relaxed group-hover:text-gray-800">
                                                We connect you directly with seniors who've been through it all. Get real, honest insights about colleges -
                                                from actual placement stats to campus life, just truth from the Seniors of your Dream College!
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg hover:shadow-blue-100/30 transition-all duration-300 group"
                                    >
                                        <p className="font-semibold text-blue-800 mb-2 group-hover:text-blue-700">100% Student-Driven</p>
                                        <p className="text-gray-700 group-hover:text-gray-800">Maharashtra's first non-profit platform run by students, for students.</p>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-green-50 p-6 rounded-xl border border-green-100 hover:shadow-lg hover:shadow-green-100/30 transition-all duration-300 group"
                                    >
                                        <p className="font-semibold text-green-800 mb-2 group-hover:text-green-700">Real Information</p>
                                        <p className="text-gray-700 group-hover:text-gray-800">Direct access to placement data, college life & honest reviews.</p>
                                    </motion.div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-8 shadow-2xl">
                                <div className="text-center">
                                    <GraduationCap className="w-16 h-16 text-orange-600 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Why Choose Us?</h3>
                                    <div className="grid gap-4">
                                        {[
                                            { num: "1", title: "Direct Student Connection", desc: "Chat with current students about real experiences" },
                                            { num: "2", title: "Verified Placement Data", desc: "Access actual placement statistics & packages" },
                                            { num: "3", title: "100% Honest Reviews", desc: "No marketing, just real student experiences" },
                                            { num: "4", title: "Expert Guidance", desc: "Learn from successful seniors' experiences" },
                                        ].map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ scale: 1.02 }}
                                                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:bg-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-100/50 group cursor-pointer"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                                                        <span className="text-orange-600 font-bold text-xl group-hover:scale-110 transition-transform duration-300">{item.num}</span>
                                                    </div>
                                                    <div className="text-left">
                                                        <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{item.title}</h4>
                                                        <p className="text-gray-600 text-sm group-hover:text-gray-700">{item.desc}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                The principles that guide everything we do
                            </p>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-3xl p-8 text-center shadow-2xl border border-orange-100 hover:shadow-3xl transition-all duration-300"
                                >
                                    <div className="flex justify-center mb-6">{value.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="py-20 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                From a small student initiative to a comprehensive platform
                            </p>
                        </motion.div>
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-1/2 transform -translate-x-px h-full w-1 bg-gradient-to-b from-orange-500 to-orange-600 hidden md:block"></div>

                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className={`relative flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-600 rounded-full border-4 border-white shadow-lg"></div>

                                    {/* Content */}
                                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                                        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-100 hover:shadow-3xl transition-all duration-300">
                                            <div className="text-2xl font-bold text-orange-600 mb-2">{item.year}</div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                        >
                            Join Our Community
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto"
                        >
                            Be part of a community that's changing how students approach college admissions
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <a href="https://chat.whatsapp.com/HbLY6umdG2G5jKfeRIfbxf" className="bg-white text-orange-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg transform hover:scale-105">
                                Get Started Today
                            </a>
                        </motion.div>
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    );
};

export default AboutPage;
