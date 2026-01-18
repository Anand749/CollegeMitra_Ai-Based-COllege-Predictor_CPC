import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import InputForm from './InputForm';
import PredictionResults from './PredictionResults';
import TrendGraph from './TrendGraph';
import RoundComparison from './RoundComparison';

const CutoffPredictorMain = () => {
    const [predictionData, setPredictionData] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        college: null,
        branch: null,
        category: null,
        gender: null,
    });
    const [results, setResults] = useState(null);

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

    return (
        <div className="bg-orange-50">
            {/* Responsive Layout */}
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar - Bold Standout Design */}
                <aside className="w-full lg:w-80 bg-white lg:min-h-screen border-b-4 lg:border-r-4 lg:border-b-0 border-orange-500 shadow-[10px_0_40px_rgba(249,115,22,0.1)] relative z-20">
                    <InputForm
                        predictionData={predictionData}
                        onPredict={handlePrediction}
                    />
                </aside>

                {/* Main Content - Single Page Layout */}
                <main className="flex-1 h-screen overflow-hidden bg-orange-50 flex flex-col">
                    {/* Welcome Screen */}
                    {!results && (
                        <div className="h-full overflow-y-auto">
                            <div className="flex items-center justify-center min-h-full p-6 md:p-12">
                                <div className="max-w-5xl w-full animate-fadeIn">

                                    {/* Logo Section with Glow */}
                                    <div className="text-center mb-16 relative">
                                        {/* Glow Effect */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

                                        <div className="relative">
                                            <img
                                                src="/college_pe_charcha_logo.png"
                                                alt="College Pe Charcha"
                                                className="h-20 md:h-28 mx-auto mb-8 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                            />
                                            <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tight">
                                                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent animate-gradient">MHT-CET 2026</span>
                                            </h1>
                                            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">Cutoff Predictor</h2>
                                            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-6">
                                                Advanced <span className="font-bold text-orange-600">AI-powered analysis</span> based on 5 years of historical data to help you find your dream college.
                                            </p>

                                            {/* Promotion Badge */}
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-orange-100 animate-slideIn">
                                                <span className="text-xs font-bold text-gray-400 text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700 uppercase tracking-wider">Hosted & Owned by</span>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm font-black text-gray-800">College Pe Charcha</span>
                                                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3 Feature Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Card 1 */}
                                        <div className="group relative hover:-translate-y-2 transition-all duration-300">
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-orange-50">
                                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">AI Prediction Engine</h3>
                                                <p className="text-sm text-gray-500 text-center">Machine learning model trained on 2021-2025 trends</p>
                                            </div>
                                        </div>

                                        {/* Card 2 */}
                                        <div className="group relative hover:-translate-y-2 transition-all duration-300 delay-100">
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-orange-50">
                                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                </div>
                                                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">22,500+ Combinations</h3>
                                                <p className="text-sm text-gray-500 text-center">Comprehensive database of Colleges, Branches & Categories</p>
                                            </div>
                                        </div>

                                        {/* Card 3 */}
                                        <div className="group relative hover:-translate-y-2 transition-all duration-300 delay-200">
                                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-orange-50">
                                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">Real-time Analysis</h3>
                                                <p className="text-sm text-gray-500 text-center">Instant processing & advanced visualization</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Results - Compact Single Page Layout */}
                    {results && (
                        <div className="flex-1 overflow-hidden p-4 md:p-6 flex flex-col min-h-0">
                            <div className="max-w-7xl w-full mx-auto flex flex-col h-full gap-4 md:gap-6">
                                {/* Prediction Header - Reduce margin */}
                                <div className="flex-shrink-0">
                                    <PredictionResults results={results} />
                                </div>

                                {/* Graph and Sidebar - Flex to fill remaining height */}
                                <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                                    {/* Graph - 2/3 width */}
                                    <div className="lg:col-span-2 h-full min-h-0">
                                        <TrendGraph results={results} />
                                    </div>

                                    {/* Details Sidebar - 1/3 width */}
                                    <div className="lg:col-span-1 h-full min-h-0 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
                                        <RoundComparison results={results} historicalData={historicalData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
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
        @keyframes gradient-bg {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        .animate-gradient-bg {
          background-size: 400% 400%;
          animation: gradient-bg 15s ease infinite;
        }
      `}</style>
        </div >
    );
};

export default CutoffPredictorMain;
