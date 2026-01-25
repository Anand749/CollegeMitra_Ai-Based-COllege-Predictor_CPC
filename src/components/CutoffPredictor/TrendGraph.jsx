import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { useRef, useEffect, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const TrendGraph = ({ results }) => {
    const { prediction } = results;
    // Removed the ref-based gradient logic which was causing visibility issues
    // Reverting to solid colors but keeping premium styling options

    const history = prediction.history || [];

    // Process data
    const yearData = {};
    history.forEach(item => {
        const year = item.year;
        const cutoff = item.cutoff;
        if (!yearData[year]) {
            yearData[year] = cutoff;
        } else {
            yearData[year] = Math.min(yearData[year], cutoff);
        }
    });

    const years = Object.keys(yearData).sort((a, b) => parseInt(a) - parseInt(b));
    const cutoffs = years.map(year => yearData[year]);

    const has2026 = prediction.predicted_cutoff_2026 != null;
    if (has2026) {
        years.push('2026');
        cutoffs.push(prediction.predicted_cutoff_2026);
    }

    if (cutoffs.length === 0) {
        return (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="text-center py-16">
                    <p className="text-gray-500">No historical data available</p>
                </div>
            </div>
        );
    }

    // Y-Axis Range Calculation
    const minCutoff = Math.min(...cutoffs);
    const maxCutoff = Math.max(...cutoffs);
    const padding = Math.max((maxCutoff - minCutoff) * 0.4, 0.5);
    const yMin = Math.max(0, minCutoff - padding);
    const yMax = Math.min(100, maxCutoff + padding / 2);

    // Styling configuration
    const pointColors = cutoffs.map((_, i) =>
        has2026 && i === cutoffs.length - 1 ? '#22c55e' : '#fff'
    );
    const pointBorderColors = cutoffs.map((_, i) =>
        has2026 && i === cutoffs.length - 1 ? '#ffffff' : '#f97316'
    );
    const pointRadii = cutoffs.map((_, i) =>
        has2026 && i === cutoffs.length - 1 ? 8 : 6
    );
    const pointBorderWidths = cutoffs.map((_, i) =>
        has2026 && i === cutoffs.length - 1 ? 4 : 3
    );

    const data = {
        labels: years,
        datasets: [{
            label: 'Minimum Cutoff',
            data: cutoffs,
            // Use function for context-based coloring (gradient simulation) or solid color
            borderColor: '#f97316',
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(249, 115, 22, 0.4)');
                gradient.addColorStop(0.7, 'rgba(249, 115, 22, 0.1)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                return gradient;
            },
            borderWidth: 4,
            pointRadius: pointRadii,
            pointHoverRadius: 10,
            pointBackgroundColor: pointColors,
            pointBorderColor: pointBorderColors,
            pointBorderWidth: pointBorderWidths,
            tension: 0.45,
            fill: true,
            borderCapStyle: 'round'
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1500,
            easing: 'easeOutQuart'
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: 'rgba(249, 115, 22, 0.2)',
                borderWidth: 1,
                padding: 14,
                cornerRadius: 16,
                titleFont: { size: 14, weight: 'bold', family: "'Inter', sans-serif" },
                bodyFont: { size: 13, family: "'Inter', sans-serif" },
                displayColors: false,
                callbacks: {
                    title: (items) => {
                        return items[0].label === '2026' ? '✨ 2026 Prediction' : `📅 Year ${items[0].label}`;
                    },
                    label: (context) => {
                        const val = context.parsed.y.toFixed(2);
                        return context.label === '2026'
                            ? `Predicted: ${val}%`
                            : `Cutoff: ${val}%`;
                    },
                    labelTextColor: (context) => {
                        return context.label === '2026' ? '#16a34a' : '#ea580c';
                    }
                }
            }
        },
        scales: {
            y: {
                min: yMin,
                max: yMax,
                ticks: {
                    font: { size: 11, weight: '600' },
                    color: '#9ca3af',
                    callback: (value) => value.toFixed(1) + '%',
                    stepSize: (yMax - yMin) / 5
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.03)',
                    drawBorder: false,
                },
                border: { display: false }
            },
            x: {
                ticks: {
                    font: { size: 12, weight: '600' },
                    color: '#6b7280',
                    padding: 10
                },
                grid: { display: false },
                border: { display: false }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        elements: {
            point: {
                hitRadius: 20
            }
        }
    };

    const trend = cutoffs.length >= 2
        ? cutoffs[cutoffs.length - 1] - cutoffs[cutoffs.length - 2]
        : 0;
    const trendUp = trend > 0;

    return (
        <div className="relative group h-full">
            {/* Ambient Glow Background */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 via-amber-300 to-green-300 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

            <div className="relative bg-white/90 backdrop-blur-xl rounded-[1.8rem] p-5 md:p-6 shadow-2xl border border-white/50 overflow-hidden h-full flex flex-col justify-between">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white transform group-hover:scale-110 transition-transform duration-500">
                            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Cutoff Trends</h3>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                <span>{years[0]} - 2026</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className={`${trendUp ? 'text-green-600' : 'text-orange-600'}`}>
                                    {trendUp ? '↗ Rising Trend' : '↘ Smoothing Down'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Graph Area - Flexible height */}
                <div className="w-full flex-1 min-h-[220px] relative">
                    <Line data={data} options={options} />
                </div>

                {/* Legend */}
                <div className="mt-8 flex items-center justify-center gap-8">
                    <div className="flex items-center gap-2 group/item cursor-default">
                        <div className="w-3 h-3 rounded-full bg-orange-500 group-hover/item:shadow-lg group-hover/item:shadow-orange-500/50 transition-all"></div>
                        <span className="text-sm font-semibold text-gray-600">Historical</span>
                    </div>
                    <div className="flex items-center gap-2 group/item cursor-default">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                            2026 Prediction
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendGraph;
