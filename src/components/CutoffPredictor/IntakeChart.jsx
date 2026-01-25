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
import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const IntakeChart = ({ branchCode, branchName, category, gender }) => {
    const [intakeData, setIntakeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Map prediction categories to intake CSV categories
    const categoryMapping = {
        'OPEN': 'OPEN',
        'OBC': 'OBC',
        'SC': 'SC',
        'ST': 'ST',
        'SEBC': 'SEBC',
        'EWS': 'OPEN',  // EWS might map to OPEN or need separate handling
        'NT': 'NTB',    // NT maps to NTB/NTC/NTD - we'll match all NT*
        'VJ': 'VJ/DT',  // VJ maps to VJ/DT
    };

    // Map prediction gender to intake CSV gender
    const genderMapping = {
        'GENERAL': 'General',
        'LADIES': 'Ladies',
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/INTAKE_DATASET.csv');
                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const csvText = await response.text();

                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const validData = results.data.filter(row =>
                            row && row.Choice_Code && row.Year && row.Seats !== undefined
                        );
                        setIntakeData(validData);
                        setLoading(false);
                    },
                    error: (err) => {
                        setError(err.message);
                        setLoading(false);
                    }
                });
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const chartData = useMemo(() => {
        if (!branchCode || !category || !gender || intakeData.length === 0) {
            return null;
        }

        const branchCodeStr = String(branchCode).trim();
        const mappedCategory = categoryMapping[category] || category;
        const mappedGender = genderMapping[gender] || gender;

        console.log(`[IntakeChart] Matching: branchCode=${branchCodeStr}, category=${category}→${mappedCategory}, gender=${gender}→${mappedGender}`);

        // Filter by Choice_Code + Category + Gender
        const filtered = intakeData.filter(row => {
            const choiceCode = String(row.Choice_Code || '').trim();
            const rowCategory = (row.Category || '').trim();
            const rowGender = (row.Gender || '').trim();

            // Branch must match exactly
            const branchMatch = choiceCode === branchCodeStr;

            // Category matching - handle NT* variants
            let categoryMatch = false;
            if (category === 'NT') {
                categoryMatch = rowCategory.startsWith('NT');  // Match NTB, NTC, NTD
            } else {
                categoryMatch = rowCategory === mappedCategory;
            }

            // Gender matching
            const genderMatch = rowGender === mappedGender;

            return branchMatch && categoryMatch && genderMatch;
        });

        console.log(`[IntakeChart] Matched rows: ${filtered.length}`);

        if (filtered.length === 0) {
            return null;
        }

        // Aggregate seats by year
        const yearlySeats = {};
        filtered.forEach(row => {
            const year = String(row.Year || '').trim();
            const seats = parseInt(row.Seats, 10) || 0;
            if (year && !isNaN(parseInt(year, 10))) {
                yearlySeats[year] = (yearlySeats[year] || 0) + seats;
            }
        });

        console.log('[IntakeChart] Yearly totals:', yearlySeats);

        const years = Object.keys(yearlySeats).sort();
        const seats = years.map(y => yearlySeats[y]);

        return years.length > 0 ? { years, seats } : null;
    }, [branchCode, category, gender, intakeData]);

    if (loading) {
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

    if (error) {
        return (
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                <p className="text-red-600 text-sm">Error: {error}</p>
            </div>
        );
    }

    if (!chartData) {
        return (
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 rounded-[1.5rem] blur opacity-20"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/50 h-full flex flex-col items-center justify-center min-h-[200px]">
                    <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 text-sm text-center">No intake data</p>
                    <p className="text-gray-400 text-xs">{category} • {gender}</p>
                </div>
            </div>
        );
    }

    const maxSeats = Math.max(...chartData.seats);

    const data = {
        labels: chartData.years,
        datasets: [{
            label: `${category} ${gender === 'GENERAL' ? 'General' : 'Ladies'} Seats`,
            data: chartData.seats,
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderColor: '#4f46e5',
            borderWidth: 2,
            borderRadius: 8,
            hoverBackgroundColor: 'rgba(99, 102, 241, 1)',
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
                borderColor: 'rgba(99, 102, 241, 0.2)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 12,
                callbacks: {
                    title: (items) => `📅 Year ${items[0].label}`,
                    label: (context) => `${category} Seats: ${context.parsed.y}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: maxSeats + Math.max(Math.ceil(maxSeats * 0.3), 2),
                ticks: {
                    font: { size: 11, weight: '600' },
                    color: '#9ca3af',
                    stepSize: Math.max(Math.ceil(maxSeats / 4), 1),
                    callback: (value) => Number.isInteger(value) ? value : ''
                },
                grid: { color: 'rgba(0, 0, 0, 0.03)', drawBorder: false },
                border: { display: false }
            },
            x: {
                ticks: { font: { size: 12, weight: '600' }, color: '#6b7280' },
                grid: { display: false },
                border: { display: false }
            }
        }
    };

    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-[1.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/50 h-full">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900">Seat Intake</h3>
                        <p className="text-xs text-gray-500">
                            {category} • {gender === 'GENERAL' ? 'General' : 'Ladies'}
                        </p>
                    </div>
                </div>
                <div className="h-[240px]">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default IntakeChart;
