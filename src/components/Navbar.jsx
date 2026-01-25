import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Dashboard', icon: '🏠' },
        { path: '/college-predictor', label: 'College Predictor', icon: '🎓' },
        { path: '/college-comparison', label: 'College Comparison', icon: '📊' },
        { path: '/cutoff-predictor', label: 'Cutoff Predictor', icon: '📈' },
        { path: '/about', label: 'About', icon: 'ℹ️' },
        { path: '/contact', label: 'Contact', icon: '📞' },
    ];

    const isActive = (path) => location.pathname === path;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="px-4 md:px-6 py-3 bg-white/95 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Brand Text Only */}
                    <Link to="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
                        <div>
                            <h1 className="text-base sm:text-lg font-black text-gray-800 tracking-tight leading-none group-hover:text-[#f68014] transition-colors flex items-center gap-1">
                                College Pe Charcha <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#f68014] animate-pulse" />
                            </h1>
                            <p className="text-[9px] sm:text-[10px] text-[#f68014] font-bold uppercase tracking-wider">
                                Official Portal
                            </p>
                        </div>
                    </Link>

                    {/* Navigation Links - Desktop */}
                    <nav className="hidden lg:flex items-center gap-1 bg-orange-50 p-1.5 rounded-xl border border-orange-100">
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path}>
                                <button
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${isActive(item.path)
                                        ? 'bg-gradient-to-r from-[#f68014] to-orange-600 text-white shadow-lg shadow-orange-200 transform scale-105'
                                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden p-2.5 rounded-lg bg-orange-50 border border-orange-100 text-gray-600 hover:text-[#f68014] transition-colors active:scale-95"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    {/* Live Badge */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200">
                        <div className="relative">
                            <div className="w-2 h-2 bg-[#f68014] rounded-full animate-ping absolute"></div>
                            <div className="w-2 h-2 bg-[#f68014] rounded-full"></div>
                        </div>
                        <span className="text-xs font-medium text-orange-700">Trusted</span>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay - Full Screen */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
                        onClick={closeMobileMenu}
                    />

                    {/* Mobile Menu Panel */}
                    <div className="fixed top-[65px] left-0 right-0 bottom-0 bg-white z-50 lg:hidden animate-slideDown overflow-y-auto">
                        <nav className="p-4 space-y-2">
                            {navItems.map((item) => (
                                <Link key={item.path} to={item.path} onClick={closeMobileMenu}>
                                    <div
                                        className={`flex items-center gap-3 px-5 py-4 rounded-xl text-base font-semibold transition-all active:scale-98 ${isActive(item.path)
                                            ? 'bg-orange-50 text-[#f68014] shadow-sm border border-orange-200'
                                            : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                                            }`}
                                    >
                                        <span className="text-2xl">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideDown {
                    from { 
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                .active\\:scale-95:active {
                    transform: scale(0.95);
                }
                .active\\:scale-98:active {
                    transform: scale(0.98);
                }
            `}</style>
        </>
    );
};

export default Navbar;
