import React from "react";
import { Mail, Instagram, MapPin, Send } from "lucide-react";

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and
                        we'll respond as soon as possible.
                    </p>
                </div>

                {/* Main Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Information Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Contact Information
                        </h2>

                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-start space-x-4">
                                <div className="bg-orange-100 p-3 rounded-lg">
                                    <Mail className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                                    <p className="text-gray-600">collegepecharcha11@gmail.com</p>
                                </div>
                            </div>

                            {/* Instagram */}
                            <div className="flex items-start space-x-4">
                                <div className="bg-orange-100 p-3 rounded-lg">
                                    <Instagram className="h-6 w-6 text-orange-600" />
                                </div>
                                <a
                                    href="https://www.instagram.com/myself_techzdada11"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <h3 className="font-semibold text-gray-900">
                                        DM us on Instagram
                                    </h3>
                                    <p className="text-gray-600">@myself_techzdada11</p>
                                </a>
                            </div>

                            {/* Location */}
                            <div className="flex items-start space-x-4">
                                <div className="bg-orange-100 p-3 rounded-lg">
                                    <MapPin className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Location</h3>
                                    <p className="text-gray-600">Pune, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Send us a Message
                        </h2>

                        {/* Formspree Integration */}
                        <form
                            action="https://formspree.io/f/xpwjlyay"
                            method="POST"
                            className="space-y-6"
                        >
                            {/* Name Field */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Message Field */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none"
                                    placeholder="Enter your message"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                            >
                                <span>Send Message</span>
                                <Send className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
