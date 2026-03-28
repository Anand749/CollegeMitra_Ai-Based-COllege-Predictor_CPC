import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Download, Star, Clock, Lock, ArrowLeft,
    BookOpen, Search, Filter, AlertCircle, RefreshCw,
    FileText, Users
} from 'lucide-react';
import Footer from './Footer';
import './ResourceHub.css';

const API_BASE = 'https://cpc-admin-page-backend.vercel.app/api';
const BACKEND_BASE = 'https://cpc-admin-page-backend.vercel.app';

/* ────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────── */

// Resolve URLs: local paths like "/uploads/..." → full backend URL, Cloudinary URLs stay as-is
const resolveUrl = (url) => {
    if (!url) return '';
    // Already a full URL (Cloudinary or other)
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    // Local server path like "/uploads/img-123.png"
    return `${BACKEND_BASE}${url}`;
};

const formatDownloads = (count) => {
    if (!count || count === 0) return '0';
    if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K+`;
    return `${count}+`;
};

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

/* ────────────────────────────────────────────
   Skeleton Card (loading state)
   ──────────────────────────────────────────── */
const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton skeleton-img" />
        <div className="p-5 space-y-3">
            <div className="skeleton skeleton-text-lg" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text-sm" />
            <div className="flex items-center justify-between pt-3">
                <div className="skeleton skeleton-text-sm" style={{ width: '30%' }} />
                <div className="skeleton skeleton-btn" />
            </div>
        </div>
    </div>
);

/* ────────────────────────────────────────────
   Resource Card
   ──────────────────────────────────────────── */
const ResourceCard = ({ resource, index }) => {
    const isPremium = resource.isPremium === 'yes';
    const price = resource.price ?? 0;
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (isPremium) {
            alert('This is a premium resource. Payment integration coming soon!');
            return;
        }

        if (!resource.fileUrl) {
            alert('Download file is not available yet.');
            return;
        }

        setDownloading(true);

        // Increment download count
        try {
            await fetch(`${API_BASE}/resources/${resource._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dowloadscnt: (resource.dowloadscnt || 0) + 1 })
            });
        } catch { /* silent fail */ }

        // Resolve the URL (handles both local /uploads/ paths and Cloudinary URLs)
        const downloadUrl = resolveUrl(resource.fileUrl);
        window.open(downloadUrl, '_blank');

        setTimeout(() => setDownloading(false), 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
            className="resource-card bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm"
            id={`resource-card-${resource._id}`}
        >
            {/* Image Section */}
            <div className="card-img-wrapper relative h-48 sm:h-52 overflow-hidden bg-orange-50">
                {resource.img ? (
                    <img
                        src={resolveUrl(resource.img)}
                        alt={resource.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out"
                        style={{ transform: 'scale(1)' }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                        <FileText className="w-16 h-16 text-orange-300" />
                    </div>
                )}

                {/* Type Badge */}
                {resource.type && (
                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                        {resource.type}
                    </span>
                )}

                {/* Premium Badge */}
                {isPremium && (
                    <span className="premium-badge absolute top-3 left-3 flex items-center gap-1.5 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        <Lock className="w-3 h-3" />
                        Premium
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 flex flex-col gap-3">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">
                    {resource.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {resource.description}
                </p>

                {/* Meta Row */}
                <div className="flex items-center gap-4 text-sm text-gray-400 pt-1">
                    {/* Downloads */}
                    <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{formatDownloads(resource.dowloadscnt)} downloads</span>
                    </span>

                    {/* Rating */}
                    {resource.rating > 0 && (
                        <span className="flex items-center gap-1 ml-auto">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold text-gray-700">{resource.rating.toFixed(1)}</span>
                        </span>
                    )}
                </div>

                {/* Last Updated */}
                {resource.last_updated && (
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        Last updated: {formatDate(resource.last_updated)}
                    </p>
                )}

                {/* Divider */}
                <div className="border-t border-gray-100 my-1" />

                {/* Price + Download Row */}
                <div className="flex items-center justify-between">
                    {/* Price */}
                    {isPremium ? (
                        <span className="text-xl font-extrabold text-[#f68014]">
                            ₹{price}
                        </span>
                    ) : (
                        <span className="text-base font-bold text-emerald-600">
                            Free
                        </span>
                    )}

                    {/* Download Button */}
                    <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className={`download-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md ${isPremium
                                ? 'bg-gradient-to-r from-[#f68014] to-orange-600 hover:shadow-orange-200'
                                : 'bg-gradient-to-r from-[#f68014] to-orange-600 hover:shadow-orange-200'
                            } ${downloading ? 'opacity-60 cursor-wait' : ''}`}
                        id={`download-btn-${resource._id}`}
                    >
                        <Download className="w-4 h-4" />
                        {downloading ? 'Opening...' : 'Download'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

/* ────────────────────────────────────────────
   Main Page
   ──────────────────────────────────────────── */
const ResourceHub = () => {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch resources
    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/resources`);
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            const json = await res.json();
            setResources(json.data || []);
        } catch (err) {
            console.error('Failed to fetch resources:', err);
            setError(err.message || 'Failed to load resources');
        } finally {
            setLoading(false);
        }
    };

    // Extract unique types for filter pills
    const categories = useMemo(() => {
        const types = [...new Set(resources.map((r) => r.type).filter(Boolean))];
        return ['All', ...types];
    }, [resources]);

    // Filter + search
    const filteredResources = useMemo(() => {
        let filtered = resources.filter((r) => r.isActive !== false);

        if (activeFilter !== 'All') {
            filtered = filtered.filter((r) => r.type === activeFilter);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (r) =>
                    r.name?.toLowerCase().includes(q) ||
                    r.description?.toLowerCase().includes(q) ||
                    r.type?.toLowerCase().includes(q)
            );
        }

        return filtered;
    }, [resources, activeFilter, searchQuery]);

    return (
        <div className="min-h-screen bg-[#FFFBF2] relative overflow-x-hidden">
            {/* Background Decoration */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="fixed top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply pointer-events-none" />
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply pointer-events-none" style={{ animationDelay: '1s' }} />

            <div className="relative z-10">
                {/* ── Hero Section ── */}
                <section className="pt-10 pb-6 sm:pt-14 sm:pb-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            transition={{ duration: 0.5 }}
                            className="text-center mb-8"
                        >
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <BookOpen className="w-7 h-7 text-white" />
                                </div>
                            </div>
                            <h1 className="resource-hero-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
                                Resource Hub
                            </h1>
                            <p className="resource-hero-subtitle text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                                Access curated guides, rankings, and insights to make informed
                                decisions about your engineering career. All resources are created by
                                our expert team and updated regularly.
                            </p>
                        </motion.div>

                        {/* ── Search Bar ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            className="max-w-xl mx-auto mb-6"
                        >
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search resources..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-orange-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 shadow-sm transition-all"
                                    id="resource-search-input"
                                />
                            </div>
                        </motion.div>

                        {/* ── Filter Pills ── */}
                        {!loading && categories.length > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.25 }}
                                className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
                            >
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveFilter(cat)}
                                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${activeFilter === cat
                                                ? 'bg-gradient-to-r from-[#f68014] to-orange-600 text-white border-transparent filter-pill-active'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600'
                                            }`}
                                        id={`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* ── Resource Grid ── */}
                <section className="pb-16 sm:pb-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Loading State */}
                        {loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {[...Array(4)].map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        )}

                        {/* Error State */}
                        {!loading && error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-16"
                            >
                                <div className="error-icon inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
                                    <AlertCircle className="w-8 h-8 text-red-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Failed to load resources</h3>
                                <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">{error}</p>
                                <button
                                    onClick={fetchResources}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f68014] text-white rounded-xl font-semibold text-sm hover:bg-orange-600 transition-colors shadow-md"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Retry
                                </button>
                            </motion.div>
                        )}

                        {/* Empty State */}
                        {!loading && !error && filteredResources.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-full mb-4">
                                    <Filter className="w-8 h-8 text-orange-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">No resources found</h3>
                                <p className="text-gray-500 text-sm">
                                    {searchQuery
                                        ? 'Try adjusting your search query'
                                        : 'No resources available in this category yet'}
                                </p>
                            </motion.div>
                        )}

                        {/* Resource Cards */}
                        {!loading && !error && filteredResources.length > 0 && (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFilter + searchQuery}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
                                >
                                    {filteredResources.map((resource, idx) => (
                                        <ResourceCard
                                            key={resource._id}
                                            resource={resource}
                                            index={idx}
                                        />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default ResourceHub;
