const RoundComparison = ({ results }) => {
    const { prediction } = results;

    const getAllHistoricalData = () => {
        if (!prediction.history) return [];

        const yearData = {};
        prediction.history.forEach(item => {
            const roundStr = String(item.round);
            const roundNum = roundStr.replace(/Round\s*/i, '').replace(/R/i, '').trim();

            if (!yearData[item.year]) {
                yearData[item.year] = { rounds: {}, minCutoff: Infinity, minRound: '' };
            }
            yearData[item.year].rounds[`R${roundNum}`] = item.cutoff;

            if (item.cutoff < yearData[item.year].minCutoff) {
                yearData[item.year].minCutoff = item.cutoff;
                yearData[item.year].minRound = `R${roundNum}`;
            }
        });

        const years = Object.keys(yearData).sort((a, b) => b - a);
        return years.map(year => ({
            year,
            rounds: yearData[year].rounds,
            minRound: yearData[year].minRound
        }));
    };

    const allHistoricalData = getAllHistoricalData();

    return (
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 rounded-2xl p-4 shadow-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-base font-bold text-gray-800">Historical Cutoffs</h3>
            </div>

            <div className="space-y-2">
                {allHistoricalData.length > 0 ? (
                    allHistoricalData.map((yearData) => (
                        <div
                            key={yearData.year}
                            className="p-2 bg-orange-100/60 rounded-xl"
                        >
                            <div className="flex items-center">
                                <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5 w-14 shrink-0">
                                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></span>
                                    {yearData.year}
                                </div>
                                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                    {['R1', 'R2', 'R3', 'R4'].map(round => {
                                        const isMin = round === yearData.minRound;
                                        const cutoff = yearData.rounds[round];
                                        if (!cutoff) return <div key={round}></div>; // Empty placeholder to keep grid alignment
                                        return (
                                            <div
                                                key={round}
                                                className={`py-1.5 px-1 rounded-lg text-[10px] md:text-xs font-semibold bg-white shadow-sm text-center ${isMin
                                                    ? 'border border-green-500'
                                                    : 'border border-amber-400'
                                                    }`}
                                            >
                                                <span className="text-gray-600 block md:inline">{round}:</span>{' '}
                                                <span className={isMin ? 'text-green-600 font-bold' : 'text-orange-600 font-bold'}>
                                                    {cutoff.toFixed(2)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">No historical data available</div>
                )}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-orange-200">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-4 h-4 bg-white border-2 border-green-500 rounded"></div>
                    <span>Green border = Lowest cutoff for that year (easiest entry)</span>
                </div>
            </div>
        </div >
    );
};

export default RoundComparison;
