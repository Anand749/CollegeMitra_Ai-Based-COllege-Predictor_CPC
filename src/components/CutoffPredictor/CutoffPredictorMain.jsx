import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import html2canvas from 'html2canvas';
import { Download, Loader2, ArrowLeft } from 'lucide-react';
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
    const [isDownloading, setIsDownloading] = useState(false);
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

    // Download Image Handler with Watermark
    const handleDownloadImage = async () => {
        if (!resultsRef.current) return;

        try {
            setIsDownloading(true);
            const element = resultsRef.current;

            // 1. Capture the UI
            const originalCanvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#fff7ed' // orange-50
            });

            // 2. Create Final Canvas with Extra Space for Footer
            const footerHeight = 120;
            const finalCanvas = document.createElement('canvas');
            finalCanvas.width = originalCanvas.width;
            finalCanvas.height = originalCanvas.height + footerHeight;

            const ctx = finalCanvas.getContext('2d');

            // Fill background
            ctx.fillStyle = '#fff7ed';
            ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

            // Draw Original Content
            ctx.drawImage(originalCanvas, 0, 0);

            // 3. Draw Footer
            const width = finalCanvas.width;
            const height = finalCanvas.height;

            // Footer Background (Orange)
            ctx.fillStyle = '#f68014';
            ctx.fillRect(0, height - footerHeight, width, footerHeight);

            // Footer Text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Main Title
            ctx.font = 'bold 40px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('College Pe Charcha', width / 2, height - (footerHeight * 0.6));

            // Subtitle / Link
            ctx.font = '20px sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.fillText('AI-Powered Cutoff Predictor | collegepecharcha.in', width / 2, height - (footerHeight * 0.25));

            // Try to draw logo
            try {
                const logoImg = new Image();
                logoImg.src = '/college_pe_charcha_logo.png';
                await new Promise((resolve, reject) => {
                    logoImg.onload = resolve;
                    logoImg.onerror = reject;
                });

                const logoSize = 120;
                ctx.globalAlpha = 1.0;
                ctx.drawImage(logoImg, width - logoSize - 40, 40, logoSize, logoSize);
            } catch (err) {
                console.warn("Logo failed to load:", err);
            }

            // 4. Download Final Image
            const link = document.createElement('a');
            const collegeName = results?.prediction?.college_name?.split(',')[0] || 'Prediction';
            const branchName = results?.prediction?.branch_name || 'Branch';
            link.download = `CutoffPrediction_${collegeName}_${branchName}.png`.replace(/\s+/g, '_');
            link.href = finalCanvas.toDataURL('image/png');
            link.click();

        } catch (err) {
            console.error("Image Generation Error:", err);
            alert("Failed to download image. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

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
                    <div className="w-full lg:w-[320px] flex-shrink-0">
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
                                            { title: 'AI Engine', desc: 'ML Model', color: 'from-orange-500 to-red-500' },
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
                                {/* Download Button */}
                                <div className="flex justify-end" data-html2canvas-ignore="true">
                                    <button
                                        onClick={handleDownloadImage}
                                        disabled={isDownloading}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-orange-200 text-orange-600 rounded-xl hover:bg-orange-50 font-bold text-sm shadow-sm transition-all disabled:opacity-50"
                                    >
                                        {isDownloading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Download className="h-4 w-4" />
                                        )}
                                        {isDownloading ? 'Generating...' : 'Download Prediction'}
                                    </button>
                                </div>

                                {/* Results Content (Captured for Download) */}
                                <div ref={resultsRef} className="w-full space-y-6 bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                                    {/* Prediction Header */}
                                    <PredictionResults results={results} />

                                    {/* Main Content Grid - New Layout */}
                                    <div className="space-y-6">
                                        {/* Row 1: Trend Graph (60%) + Seat Intake (40%) */}
                                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                                            <div className="lg:col-span-3">
                                                <TrendGraph results={results} />
                                            </div>
                                            <div className="lg:col-span-2">
                                                <IntakeChart
                                                    branchCode={results.prediction.branch_code}
                                                    branchName={results.prediction.branch_name}
                                                    category={results.prediction.category}
                                                    gender={results.prediction.gender}
                                                />
                                            </div>
                                        </div>

                                        {/* Row 2: Historical Cutoffs (60%) + Students Appeared (40%) */}
                                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                                            <div className="lg:col-span-3">
                                                <RoundComparison results={results} historicalData={historicalData} />
                                            </div>
                                            <div className="lg:col-span-2">
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
      `}</style>
            <Footer />
        </div>
    );
};

export default CutoffPredictorMain;
