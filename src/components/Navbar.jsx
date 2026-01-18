import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Dashboard', icon: '🏠' },
        { path: '/college-predictor', label: 'College Predictor', icon: '🎓' },
        { path: '/college-comparison', label: 'College Comparison', icon: '📊' },
        { path: '/cutoff-predictor', label: 'Cutoff Predictor', icon: '📈' },
        { path: '/about', label: 'About', icon: 'ℹ️' },
        { path: '/contact', label: 'Contact', icon: '📞' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="px-4 md:px-6 py-3 bg-white/95 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Brand Text Only */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div>
                        <h1 className="text-lg font-black text-gray-800 tracking-tight leading-none group-hover:text-[#f68014] transition-colors">
                            College Pe Charcha
                        </h1>
                        <p className="text-[10px] text-[#f68014] font-bold uppercase tracking-wider">
                            Official Portal
                        </p>
                    </div>
                </Link>

                {/* Navigation Links - Desktop */}
                <nav className="hidden lg:flex items-center gap-1 bg-orange-50 p-1.5 rounded-xl border border-orange-100">
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path}>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive(item.path)
                                    ? 'bg-white text-[#f68014] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                            >
                                {item.label}
                            </button>
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu - Dropdown */}
                <div className="lg:hidden relative group">
                    <button className="p-2 rounded-lg bg-orange-50 border border-orange-100 text-gray-600 hover:text-[#f68014] transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Mobile Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-orange-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path}>
                                <div
                                    className={`px-4 py-3 text-sm font-medium transition-colors first:rounded-t-xl last:rounded-b-xl ${isActive(item.path)
                                        ? 'bg-orange-50 text-[#f68014]'
                                        : 'text-gray-600 hover:bg-orange-50 hover:text-[#f68014]'
                                        }`}
                                >
                                    <span className="mr-2">{item.icon}</span>
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

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
    );
};

export default Navbar;
