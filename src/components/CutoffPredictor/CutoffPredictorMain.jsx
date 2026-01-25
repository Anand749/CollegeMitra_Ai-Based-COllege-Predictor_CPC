import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { Loader2, ArrowLeft } from 'lucide-react';
import InputForm from './InputForm';
import PredictionResults from './PredictionResults';
import TrendGraph from './TrendGraph';
import RoundComparison from './RoundComparison';
import CandidateCountChart from './CandidateCountChart';
import IntakeChart from './IntakeChart';
import Footer from '../Footer';

const CutoffPredictorMain = () => {
    const navigate = useNavigate();
    const [predictionData, setPredictionData] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        college: null,
        branch: null,
        category: null,
        gender: null,
    });
    const [results, setResults] = useState(null);
    const [showScrollHint, setShowScrollHint] = useState(true);
    const resultsRef = useRef(null);
    const mainRef = useRef(null);

    useEffect(() => {
        const loadPredictionData = async () => {
            try {
                const response = await fetch('/data.js');
                const scriptText = await response.text();
                const jsonMatch = scriptText.match(/window\.PREDICTION_DATA\s*=\s*(\[.*\]);/s);
                if (jsonMatch) {
                    const data = JSON.parse(jsonMatch[1]);
                    setPredictionData(data);
                }
            } catch (error) {
                console.error('Error loading prediction data:', error);
            }
        };
        loadPredictionData();
    }, []);

    useEffect(() => {
        const loadHistoricalData = async () => {
            try {
                const response = await fetch('/MHT_CET DATASET.csv');
                const csvText = await response.text();
                Papa.parse(csvText, {
                    header: true,
                    complete: (results) => {
                        setHistoricalData(results.data);
                    },
                    error: (error) => {
                        console.error('Error parsing CSV:', error);
                    }
                });
            } catch (error) {
                console.error('Error loading CSV data:', error);
            }
        };
        loadHistoricalData();
    }, []);

    const handlePrediction = (filters) => {
        console.log('=== Prediction Request ===');
        console.log('Filters:', filters);

        setSelectedFilters(filters);
        const prediction = predictionData.find(
            (p) =>
                p.college_code === filters.college.college_code &&
                p.branch_code === filters.branch.branch_code &&
                p.category === filters.category &&
                p.gender === filters.gender
        );

        console.log('Found Prediction:', prediction);

        if (prediction) {
            const resultsObj = { prediction, filters };
            console.log('Setting Results:', resultsObj);
            setResults(resultsObj);
        } else {
            console.log('No prediction found - showing alert');
            setResults(null);
            alert('No prediction data found for the selected combination');
        }
    };


    // Auto-scroll to results effect
    useEffect(() => {
        if (results && resultsRef.current) {
            // Add a small delay to ensure DOM is fully rendered before scrolling
            setTimeout(() => {
                resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
            setShowScrollHint(true);

            // Hide hint after some time or on manual scroll
            const timer = setTimeout(() => setShowScrollHint(false), 8000);
            return () => clearTimeout(timer);
        }
    }, [results]);

    return (
        <div className="min-h-screen bg-[#FFFBF2] relative overflow-x-hidden">
            {/* Background Decoration - Premium Gold/Champagne Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            {/* Golden Glows */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply pointer-events-none"></div>
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply pointer-events-none" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10 max-w-[95rem] mx-auto px-4 py-8 sm:py-12">
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

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter Section - Sticky Card */}
                    <div className="w-full lg:w-[320px] flex-shrink-0 relative z-50">
                        <div className="rounded-2xl shadow-xl border lg:sticky lg:top-24 transition-colors duration-300 bg-white border-orange-100 overflow-hidden">
                            <InputForm
                                predictionData={predictionData}
                                onPredict={handlePrediction}
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <main ref={mainRef} className="flex-1 min-w-0">
                        {/* Welcome Screen */}
                        {!results && (
                            <div className="min-h-[60vh] flex items-center justify-center p-6">
                                <div className="max-w-3xl w-full animate-fadeIn">
                                    {/* Logo Section with Glow */}
                                    <div className="text-center mb-10 relative">
                                        <div className="relative">
                                            <img
                                                src="/college_pe_charcha_logo.png"
                                                alt="College Pe Charcha"
                                                className="h-20 md:h-24 mx-auto mb-6 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                            />
                                            <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
                                                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent animate-gradient">MHT-CET 2026</span>
                                            </h1>
                                            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">Cutoff Predictor</h2>
                                            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
                                                Advanced <span className="font-bold text-orange-600">AI-powered analysis</span> based on 5 years of historical data.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Feature Cards Compact */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {[
                                            { title: 'AI Engine', desc: '', color: 'from-orange-500 to-red-500' },
                                            { title: '22k+ Combos', desc: 'Full Database', color: 'from-orange-500 to-amber-500' },
                                            { title: 'Instant', desc: 'Real-time', color: 'from-amber-500 to-yellow-500' }
                                        ].map((card, i) => (
                                            <div key={i} className="bg-white rounded-2xl p-4 shadow-lg border border-orange-50 text-center hover:-translate-y-1 transition-transform">
                                                <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-md`}>
                                                    <Loader2 className="h-5 w-5" />
                                                </div>
                                                <h3 className="font-bold text-gray-900 text-sm">{card.title}</h3>
                                                <p className="text-xs text-gray-500">{card.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Results Layout */}
                        {results && (
                            <div className="space-y-6 relative">
                                {/* Scroll Hint - Mouse Animation */}
                                {showScrollHint && (
                                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" onClick={() => setShowScrollHint(false)}>
                                        <div className="mouse-container">
                                            <div className="mouse">
                                                <div className="wheel"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}


                                {/* Results Content (Captured for Download) */}
                                <div ref={resultsRef} className="w-full space-y-6 bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                                    {/* Prediction Header */}
                                    <PredictionResults results={results} />

                                    {/* Main Content Grid - Ultimate Layout */}
                                    <div className="space-y-6">
                                        {/* Row 1: Trend Graph (60%) + Historical Cutoffs (40%) */}
                                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:h-[500px]">
                                            <div className="lg:col-span-3 h-full">
                                                <TrendGraph results={results} />
                                            </div>
                                            <div className="lg:col-span-2 h-full">
                                                <RoundComparison results={results} historicalData={historicalData} />
                                            </div>
                                        </div>

                                        {/* Row 2: Seat Intake (50%) + Students Appeared (50%) */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[350px]">
                                            <div className="w-full h-full">
                                                <IntakeChart
                                                    branchCode={results.prediction.branch_code}
                                                    branchName={results.prediction.branch_name}
                                                    category={results.prediction.category}
                                                    gender={results.prediction.gender}
                                                />
                                            </div>
                                            <div className="w-full h-full">
                                                <CandidateCountChart />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }

        /* Mouse Scroll Animation */
        .mouse-container {
            width: 26px;
            height: 42px;
        }
        .mouse {
            width: 26px;
            height: 42px;
            border: 2px solid #f97316;
            border-radius: 14px;
            position: relative;
        }
        .wheel {
            width: 4px;
            height: 8px;
            background: #f97316;
            border-radius: 2px;
            position: absolute;
            top: 6px;
            left: 50%;
            transform: translateX(-50%);
            animation: scroll 1.5s infinite;
        }
        @keyframes scroll {
            0% { opacity: 0; transform: translate(-50%, 0); }
            30% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, 15px); }
        }
      `}</style>
            <Footer />
        </div>
    );
};

export default CutoffPredictorMain;
