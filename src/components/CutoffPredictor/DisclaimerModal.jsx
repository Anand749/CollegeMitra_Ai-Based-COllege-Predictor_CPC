import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const DisclaimerModal = ({ onClose, onProceed }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleProceed = () => {
        setIsVisible(false);
        setTimeout(onProceed, 300);
    };

    return createPortal(
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            ></div>

            {/* Modal Card */}
            <div className={`relative bg-white w-full max-w-lg rounded-3xl shadow-2xl transform transition-all duration-500 ease-out border border-white/20 overflow-hidden ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>

                {/* Decorative Top Gradient strip */}
                <div className="h-2 w-full bg-gradient-to-r from-orange-400 via-red-500 to-amber-500"></div>

                <div className="p-8">
                    {/* Header Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-75"></div>
                            <div className="relative w-20 h-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                                <span className="text-4xl">⚠️</span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-black text-gray-800 mb-2 tracking-tight">
                            Wait, Read This!
                        </h2>
                        <p className="text-gray-500 font-medium">Important information about AI predictions</p>
                    </div>

                    {/* Content Box */}
                    <div className="bg-orange-50/50 rounded-2xl p-5 mb-8 border border-orange-100">
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600 text-xs font-bold">1</div>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    Predictions are based on <span className="font-bold text-gray-900">2021-2025 trends</span>. Actual results may vary due to seat matrix changes.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600 text-xs font-bold">2</div>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    Our AI predicts the <span className="font-bold text-orange-600">Minimum Cutoff</span>. Aim higher for confirmed admission.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600 text-xs font-bold">3</div>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    This tool is for <span className="font-bold text-gray-900">reference guidance only</span>. Always cross-check with official CET Cell data.
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleProceed}
                            className="group relative w-full overflow-hidden rounded-xl bg-orange-600 p-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/30"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="relative flex items-center justify-center gap-2 font-bold text-white tracking-wide">
                                <span>I UNDERSTAND & AGREE</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </button>

                        <button
                            onClick={handleClose}
                            className="w-full py-3 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            Cancel Prediction
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default DisclaimerModal;
