import Counter from './Counter';

const PredictionResults = ({ results }) => {
    const { prediction, filters } = results;
    const change = prediction.change || 0;
    const isNegative = change < 0;
    const percentChange = prediction.last_closing_cutoff_2025
        ? ((change / prediction.last_closing_cutoff_2025) * 100).toFixed(2)
        : 0;

    return (
        <div className="animate-slideDown">
            {/* Premium Header Card - Mobile Responsive */}
            <div className="relative group mb-6 md:mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-2xl md:rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl animate-gradient">
                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 md:mb-8 gap-4">
                        <div className="flex-1">
                            <h2 className="text-xl md:text-3xl font-black text-white mb-2 flex flex-wrap items-center gap-2 md:gap-3">
                                <span className="break-words">{filters.college.college_name}</span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs md:text-sm font-medium flex-shrink-0">
                                    {filters.category}
                                </span>
                            </h2>
                            <p className="text-white/90 text-sm md:text-lg font-medium break-words">{filters.branch.branch_name}</p>
                        </div>
                        <div className="px-3 md:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0 self-start">
                            <p className="text-white text-xs md:text-sm font-medium">{filters.gender}</p>
                        </div>
                    </div>

                    {/* Stats Cards - Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        {/* Predicted Cutoff - Green */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-green-200">
                            <div className="flex items-center gap-2 mb-2 md:mb-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                                    <svg className="w-3 h-3 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Predicted 2026</span>
                            </div>
                            <div className="text-3xl md:text-5xl font-black text-green-600 mb-1 md:mb-2">
                                <Counter value={prediction.predicted_cutoff_2026 || 0} decimals={2} suffix="%" />
                            </div>
                            <div className="text-xs text-green-600 font-medium">🤖 AI Prediction</div>
                        </div>

                        {/* Last Year Cutoff */}
                        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center gap-2 mb-2 md:mb-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Last Year Cutoff</span>
                            </div>
                            <div className="text-3xl md:text-5xl font-black text-blue-600 mb-1 md:mb-2">
                                <Counter value={prediction.last_closing_cutoff_2025 || 0} decimals={2} suffix="%" />
                            </div>
                            <div className="text-xs text-gray-500 font-medium">2025 Closing Cutoff</div>
                        </div>

                        {/* Change */}
                        <div className={`rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl transform hover:scale-105 transition-all duration-300 ${isNegative ? 'bg-gradient-to-br from-red-50 to-pink-50' : 'bg-gradient-to-br from-green-50 to-emerald-50'
                            }`}>
                            <div className="flex items-center gap-2 mb-2 md:mb-3">
                                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isNegative ? 'bg-gradient-to-br from-red-500 to-pink-500' : 'bg-gradient-to-br from-green-500 to-emerald-500'
                                    }`}>
                                    <svg className="w-3 h-3 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {isNegative ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                                        )}
                                    </svg>
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wide ${isNegative ? 'text-red-700' : 'text-green-700'
                                    }`}>Change</span>
                            </div>
                            <div className={`text-3xl md:text-5xl font-black mb-1 md:mb-2 ${isNegative ? 'text-red-600' : 'text-green-600'
                                }`}>
                                {change > 0 ? '+' : ''}<Counter value={change} decimals={2} />
                            </div>
                            <div className={`text-xs font-semibold ${isNegative ? 'text-red-600' : 'text-green-600'
                                }`}>
                                {isNegative ? '📉 Easier entry' : '📈 Harder entry'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.75; }
        }
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default PredictionResults;
