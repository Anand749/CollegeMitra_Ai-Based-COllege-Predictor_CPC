import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useState, useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CandidateCountChart = () => {
    const [candidateData, setCandidateData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/candidate_counts.js');
                const scriptText = await response.text();
                const match = scriptText.match(/window\.CANDIDATE_COUNTS\s*=\s*({.*});/s);
                if (match) {
                    const data = JSON.parse(match[1]);
                    setCandidateData(data);
                }
            } catch (error) {
                console.error('Error loading candidate counts:', error);
            }
        };
        loadData();
    }, []);

    if (!candidateData) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-orange-200 rounded w-3/4"></div>
                        <div className="h-32 bg-orange-100 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    const years = [...Object.keys(candidateData.historical), '2026'];
    const counts = [...Object.values(candidateData.historical), candidateData.projected_2026];

    const data = {
        labels: years,
        datasets: [{
            label: 'Candidates',
            data: counts,
            backgroundColor: years.map((_, i) =>
                i === years.length - 1
                    ? 'rgba(34, 197, 94, 0.8)'  // Green for 2026 projection
                    : 'rgba(249, 115, 22, 0.8)' // Orange for historical
            ),
            borderColor: years.map((_, i) =>
                i === years.length - 1 ? '#16a34a' : '#ea580c'
            ),
            borderWidth: 2,
            borderRadius: 8,
            hoverBackgroundColor: years.map((_, i) =>
                i === years.length - 1 ? 'rgba(34, 197, 94, 1)' : 'rgba(249, 115, 22, 1)'
            ),
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: 'rgba(249, 115, 22, 0.2)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 12,
                callbacks: {
                    title: (items) => {
                        return items[0].label === '2026' ? '✨ 2026 Projected' : `📅 Year ${items[0].label}`;
                    },
                    label: (context) => {
                        return `Students: ${context.parsed.y.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: { size: 11, weight: '600' },
                    color: '#9ca3af',
                    callback: (value) => (value / 1000).toFixed(0) + 'K'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.03)',
                    drawBorder: false
                },
                border: { display: false }
            },
            x: {
                ticks: {
                    font: { size: 12, weight: '600' },
                    color: '#6b7280'
                },
                grid: { display: false },
                border: { display: false }
            }
        }
    };

    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 via-amber-300 to-green-300 rounded-[1.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/50 h-full">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Students Appeared</h3>
                        <p className="text-xs text-gray-500">MHT-CET PCM Candidates per Year</p>
                    </div>
                </div>
                <div className="h-[240px]">
                    <Bar data={data} options={options} />
                </div>
                <div className="mt-3 flex justify-center gap-6 text-xs">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                        <span className="text-gray-600">Historical</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        <span className="text-gray-600">2026 Projected</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateCountChart;
