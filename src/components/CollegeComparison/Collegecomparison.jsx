import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    ArcElement,
    RadialLinearScale,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut, PolarArea, Chart } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
    Search,
    BarChart3,
    BarChart2,
    BarChart,
    X,
    GraduationCap,
    Award,
    MapPin,
    Users,
    CheckCircle,
    RotateCcw,
    Moon,
    Sun,
    TrendingUp,
    TrendingDown,
    Star,
    ChevronDown,
    ChevronUp,
    Plus,
    Minus,
    Target,
    Zap,
    BookOpen,
    Building2,
    Filter,
    Download,
    Loader2
} from 'lucide-react';
import Footer from '../Footer';


// Import CAP data files
import CAP01 from '../College Predictor/Data for College Predictor/cap1_2025_formatted.json';
import CAP02 from '../College Predictor/Data for College Predictor/cap2_2025_formatted.json';
import CAP03 from '../College Predictor/Data for College Predictor/cap3_2025_formatted.json';
import CAP04 from '../College Predictor/Data for College Predictor/cap4_2025_formatted.json';
import AI_CAP1 from '../College Predictor/Data for College Predictor/AI_CAP1_25-26.json';
import AI_CAP2 from '../College Predictor/Data for College Predictor/AI_CAP2_25-26.json';
import AI_CAP3 from '../College Predictor/Data for College Predictor/AI_CAP3_25-26.json';
import AI_CAP4 from '../College Predictor/Data for College Predictor/AI_CAP4_25-26.json';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
);

// Chart data structure is handled dynamically in JavaScript

const CollegeComparison = () => {
    const comparisonRef = React.useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);

    // Category system
    const [selectedCategory, setSelectedCategory] = useState('GOPENS'); // Default to General Open
    const [selectedExamType, setSelectedExamType] = useState('MHT-CET');
    const [selectedCapRound, setSelectedCapRound] = useState('all'); // 'all', '01', '02', '03'
    const [availableColleges, setAvailableColleges] = useState([]);
    const [availableBranches, setAvailableBranches] = useState([]);

    // State for college panels
    const [leftCollege, setLeftCollege] = useState({
        college: '',
        branches: [],
        data: null
    });
    const [rightCollege, setRightCollege] = useState({
        college: '',
        branches: [],
        data: null
    });

    // UI State
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showBranchDropdown, setShowBranchDropdown] = useState({ left: false, right: false });
    const [chartType, setChartType] = useState('bar'); // 'bar', 'line', 'pie', 'doughnut', 'polar'
    const [showAllRounds, setShowAllRounds] = useState(true); // Show all 3 rounds by default
    const [chartDataRange, setChartDataRange] = useState({ min: 0, max: 100 }); // Dynamic Y-axis scaling
    const [customPairs, setCustomPairs] = useState([]); // Store manually paired branches

    // Category mapping for MHT-CET
    const categoryMapping = {
        'GOPENS': { label: 'General Open', prefix: 'G', suffix: 'S', color: 'bg-blue-100 text-blue-800' },
        'GOBCS': { label: 'General OBC', prefix: 'G', suffix: 'S', color: 'bg-green-100 text-green-800' },
        'GSCS': { label: 'General SC', prefix: 'G', suffix: 'S', color: 'bg-purple-100 text-purple-800' },
        'GSTS': { label: 'General ST', prefix: 'G', suffix: 'S', color: 'bg-indigo-100 text-indigo-800' },
        'GVJS': { label: 'General VJ', prefix: 'G', suffix: 'S', color: 'bg-orange-100 text-orange-800' },
        'GNT1S': { label: 'General NT1', prefix: 'G', suffix: 'S', color: 'bg-yellow-100 text-yellow-800' },
        'GNT2S': { label: 'General NT2', prefix: 'G', suffix: 'S', color: 'bg-pink-100 text-pink-800' },
        'GNT3S': { label: 'General NT3', prefix: 'G', suffix: 'S', color: 'bg-red-100 text-red-800' },
        'GSEBCS': { label: 'General SEBC', prefix: 'G', suffix: 'S', color: 'bg-teal-100 text-teal-800' },
        'LOPENS': { label: 'Ladies Open', prefix: 'L', suffix: 'S', color: 'bg-rose-100 text-rose-800' },
        'LOBCS': { label: 'Ladies OBC', prefix: 'L', suffix: 'S', color: 'bg-emerald-100 text-emerald-800' },
        'LSCS': { label: 'Ladies SC', prefix: 'L', suffix: 'S', color: 'bg-violet-100 text-violet-800' },
        'LSTS': { label: 'Ladies ST', prefix: 'L', suffix: 'S', color: 'bg-cyan-100 text-cyan-800' },
        'LVJS': { label: 'Ladies VJ', prefix: 'L', suffix: 'S', color: 'bg-amber-100 text-amber-800' },
        'LNT1S': { label: 'Ladies NT1', prefix: 'L', suffix: 'S', color: 'bg-lime-100 text-lime-800' },
        'LNT2S': { label: 'Ladies NT2', prefix: 'L', suffix: 'S', color: 'bg-fuchsia-100 text-fuchsia-800' },
        'LNT3S': { label: 'Ladies NT3', prefix: 'L', suffix: 'S', color: 'bg-sky-100 text-sky-800' },
        'LSEBCS': { label: 'Ladies SEBC', prefix: 'L', suffix: 'S', color: 'bg-stone-100 text-stone-800' },
        'EWS': { label: 'EWS', prefix: 'G', suffix: 'S', color: 'bg-slate-100 text-slate-800' },
        'TFWS': { label: 'TFWS', prefix: 'G', suffix: 'S', color: 'bg-gray-100 text-gray-800' }
    };

    // Load college data from CAP files
    useEffect(() => {
        const loadCollegeData = () => {
            try {
                console.log('Loading college data...');
                setIsLoading(true);

                // Get all data for multi-round support
                let allData = {};
                if (selectedExamType === "MHT-CET") {
                    console.log('Loading MHT-CET data...');
                    allData = { '01': CAP01, '02': CAP02, '03': CAP03, '04': CAP04 };
                } else {
                    console.log('Loading JEE data...');
                    allData = { '01': AI_CAP1, '02': AI_CAP2, '03': AI_CAP3, '04': AI_CAP4 };
                }
                console.log('Data loaded:', Object.keys(allData));

                if (selectedExamType === "MHT-CET") {
                    // Extract colleges and branches from MHT-CET data
                    const collegeNames = Object.keys(allData['01']); // Use CAP01 as base

                    const colleges = collegeNames.map(collegeName => ({
                        value: collegeName,
                        label: collegeName,
                        district: allData['01'][collegeName].district || 'Unknown',
                        status: allData['01'][collegeName].status || 'Unknown',
                        level: allData['01'][collegeName].level || 'Unknown',
                        branches: allData['01'][collegeName].branches || []
                    }));

                    setAvailableColleges(colleges);

                    // Extract all unique branches
                    const allBranches = new Set();
                    Object.values(allData['01']).forEach(college => {
                        if (college.branches) {
                            college.branches.forEach(branch => {
                                allBranches.add(branch.branch_info);
                            });
                        }
                    });
                    setAvailableBranches(Array.from(allBranches).sort());
                } else {
                    // Extract colleges and branches from JEE data
                    const colleges = allData['01'].map(college => ({
                        value: college["Institute Name"],
                        label: college["Institute Name"],
                        district: college.District || 'Unknown',
                        status: college.Courses[0]?.["Merit Exam"] || 'JEE',
                        level: "All India",
                        branches: college.Courses || []
                    }));

                    setAvailableColleges(colleges);

                    // Extract all unique branches
                    const allBranches = new Set();
                    allData['01'].forEach(college => {
                        college.Courses.forEach(course => {
                            allBranches.add(course["Course Name"]);
                        });
                    });
                    setAvailableBranches(Array.from(allBranches).sort());
                }

                setError(''); // Clear any previous errors
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading college data:', error);
                setError('Failed to load college data: ' + error.message);
                setIsLoading(false);
            }
        };

        loadCollegeData();
    }, [selectedExamType]);

    // Get college branches
    const getCollegeBranches = (collegeName) => {
        const college = availableColleges.find(c => c.value === collegeName);
        if (!college) return [];

        if (selectedExamType === "MHT-CET") {
            return college.branches.map(branch => branch.branch_info);
        } else {
            return college.branches.map(course => course["Course Name"]);
        }
    };

    // Get cutoff data for a specific college and branch with category filtering
    const getCutoffData = (collegeName, branchName, round = null) => {
        try {
            let allData = {};
            if (selectedExamType === "MHT-CET") {
                allData = { '01': CAP01, '02': CAP02, '03': CAP03, '04': CAP04 };
            } else {
                allData = { '01': AI_CAP1, '02': AI_CAP2, '03': AI_CAP3, '04': AI_CAP4 };
            }

            if (selectedExamType === "MHT-CET") {
                const roundsToCheck = round ? [round] : (selectedCapRound === 'all' ? ['01', '02', '03', '04'] : [selectedCapRound]);
                const results = {};

                roundsToCheck.forEach(roundKey => {
                    const collegeInfo = allData[roundKey][collegeName];
                    if (collegeInfo) {
                        const branchData = collegeInfo.branches.find(b => b.branch_info === branchName);
                        if (branchData && branchData.table_data && branchData.table_data.length > 0) {
                            const tableRow = branchData.table_data[0];
                            const categoryData = tableRow[selectedCategory];
                            if (categoryData) {
                                const percentile = parseFloat(categoryData.split('\n')[1]?.replace(/[()]/g, '') || '0');
                                const rank = parseInt(categoryData.split('\n')[0] || '0');
                                results[roundKey] = { percentile, rank, seatCode: selectedCategory };
                            }
                        }
                    }
                });

                if (round) {
                    return results[round] || { percentile: 0, rank: 0, seatCode: 'N/A' };
                }

                return results;
            } else {
                // JEE data handling
                const roundsToCheck = round ? [round] : (selectedCapRound === 'all' ? ['01', '02', '03', '04'] : [selectedCapRound]);
                const results = {};

                roundsToCheck.forEach(roundKey => {
                    const collegeInfo = allData[roundKey].find(c => c["Institute Name"] === collegeName);
                    if (collegeInfo) {
                        const courseData = collegeInfo.Courses.find(c => c["Course Name"] === branchName);
                        if (courseData) {
                            const meritData = courseData["All India Merit"].split(" ");
                            const percentile = parseFloat(meritData[1]?.replace(/[()]/g, "") || '0');
                            const rank = parseInt(meritData[0] || '0');
                            results[roundKey] = { percentile, rank, seatCode: 'JEE-AI' };
                        }
                    }
                });

                if (round) {
                    return results[round] || { percentile: 0, rank: 0, seatCode: 'N/A' };
                }

                return results;
            }
        } catch (error) {
            console.error('Error getting cutoff data:', error);
            return round ? { percentile: 0, rank: 0, seatCode: 'N/A' } : {};
        }
    };

    // Handle college selection
    const handleCollegeSelect = (side, collegeName) => {
        if (side === 'left') {
            setLeftCollege({
                college: collegeName,
                branches: [],
                data: null
            });
            // setShowBranchDropdown(prev => ({ ...prev, left: true })); // Removed as branch dropdown is gone
        } else {
            setRightCollege({
                college: collegeName,
                branches: [],
                data: null
            });
            // setShowBranchDropdown(prev => ({ ...prev, right: true })); // Removed as branch dropdown is gone
        }
    };

    // Handle branch selection (no longer directly used for chart, but for builder)
    const handleBranchToggle = (side, branchName) => {
        if (side === 'left') {
            setLeftCollege(prev => {
                const newBranches = prev.branches.includes(branchName)
                    ? prev.branches.filter(b => b !== branchName)
                    : [...prev.branches, branchName];
                return { ...prev, branches: newBranches };
            });
        } else {
            setRightCollege(prev => {
                const newBranches = prev.branches.includes(branchName)
                    ? prev.branches.filter(b => b !== branchName)
                    : [...prev.branches, branchName];
                return { ...prev, branches: newBranches };
            });
        }
    };

    // Remove branch (no longer directly used for chart, but for builder)
    const removeBranch = (side, branchName) => {
        if (side === 'left') {
            setLeftCollege(prev => ({
                ...prev,
                branches: prev.branches.filter(b => b !== branchName)
            }));
            // Remove any custom pairs involving this branch
            setCustomPairs(prev => prev.filter(p => p.left !== branchName));
        } else {
            setRightCollege(prev => ({
                ...prev,
                branches: prev.branches.filter(b => b !== branchName)
            }));
            // Remove any custom pairs involving this branch
            setCustomPairs(prev => prev.filter(p => p.right !== branchName));
        }
    };

    // Custom Comparison Logic
    const [builderLeft, setBuilderLeft] = useState('');
    const [builderRight, setBuilderRight] = useState('');

    const addCustomPair = (e) => {
        if (e) e.preventDefault();

        if (builderLeft && builderRight) {
            // Check for duplicates
            const exists = customPairs.some(p => p.left === builderLeft && p.right === builderRight);
            if (!exists) {
                setCustomPairs(prev => [...prev, { left: builderLeft, right: builderRight, id: Date.now() }]);
            }
            // Reset builder
            setBuilderLeft('');
            setBuilderRight('');
        }
    };

    const removeCustomPair = (id) => {
        setCustomPairs(prev => prev.filter(p => p.id !== id));
    };

    // Reset comparison
    const resetComparison = () => {
        setLeftCollege({ college: '', branches: [], data: null });
        setRightCollege({ college: '', branches: [], data: null });
        setCustomPairs([]);
        setError('');
    };

    // College Panel Component
    const CollegePanel = ({ side, college, onCollegeSelect }) => {
        const collegeInfo = availableColleges.find(c => c.value === college);
        const [searchTerm, setSearchTerm] = useState('');
        const [showDropdown, setShowDropdown] = useState(false);

        const filteredColleges = availableColleges.filter(c =>
            c.label.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className={`rounded-3xl shadow-xl border-t-4 transition-all duration-300 hover:shadow-2xl bg-white ${side === 'left' ? 'border-[#f68014]' : 'border-blue-500'}`}>
                {/* Header */}
                <div className="p-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black flex items-center space-x-3 text-gray-800">
                            <div className={`p-3 rounded-2xl ${side === 'left' ? 'bg-orange-100 text-[#f68014]' : 'bg-blue-100 text-blue-600'}`}>
                                <Building2 className="h-6 w-6" />
                            </div>
                            <span>{side === 'left' ? getShortName(college) || 'College A' : getShortName(college) || 'College B'}</span>
                        </h3>
                        {/* Remove Branch button - unnecessary in new flow */}
                        {/* {onRemoveBranch && <button onClick={onRemoveBranch} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"><X className="h-5 w-5"/></button>} */}
                    </div>
                </div>

                {/* College Selection Searchable Dropdown */}
                <div className="space-y-3 relative p-8 pt-0">
                    <label className="text-xs font-extrabold text-gray-400 uppercase tracking-wider ml-1">
                        Select Institute
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm || (college && !showDropdown ? availableColleges.find(c => c.value === college)?.label : '')}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowDropdown(true);
                                if (e.target.value === '') onCollegeSelect(side, '');
                            }}
                            onFocus={() => {
                                setShowDropdown(true);
                                setSearchTerm(''); // Clear to show all options on focus if needed or keep existing logic
                            }}
                            placeholder="Search college name..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-[#f68014] outline-none font-bold text-gray-700 bg-gray-50 hover:bg-white transition-all duration-300 pr-10"
                        />
                        <div
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <ChevronDown className="h-5 w-5" />
                        </div>
                    </div>

                    {showDropdown && (
                        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar">
                            {filteredColleges.length > 0 ? (
                                filteredColleges.map(collegeOption => (
                                    <div
                                        key={collegeOption.value}
                                        onClick={() => {
                                            onCollegeSelect(side, collegeOption.value);
                                            setSearchTerm('');
                                            setShowDropdown(false);
                                        }}
                                        className="px-4 py-3 hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                                    >
                                        <div className="font-bold text-gray-700 text-base">{collegeOption.label}</div>
                                        <div className="text-xs text-gray-400 mt-1 font-medium">{collegeOption.district} | {collegeOption.status}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500 font-medium">No colleges found</div>
                            )}
                        </div>
                    )}
                    {/* Overlay to close dropdown when clicking outside */}
                    {showDropdown && (
                        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowDropdown(false)} />
                    )}
                </div>

                {/* College Info */}
                {college && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-medium">
                                    {collegeInfo?.district}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Award className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-medium">
                                    {collegeInfo?.status}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-medium">
                                    {collegeInfo?.level}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Chart Data Generation
    const generateChartData = () => {
        // Smart Chart Logic:
        // Case 1: Single Custom Pair -> Line Chart of Rounds (Trend)
        if (customPairs.length === 1) {
            const pair = customPairs[0];
            const leftData = [];
            const rightData = [];
            const labels = ['Round 1', 'Round 2', 'Round 3', 'Round 4'];

            // Quick fix: loop rounds manually relative to context
            const rounds = ['01', '02', '03', '04'];

            // Fetch left
            rounds.forEach(r => {
                const d = getCutoffData(leftCollege.college, pair.left, r);
                leftData.push(d.percentile || null);
            });

            // Fetch right
            rounds.forEach(r => {
                const d = getCutoffData(rightCollege.college, pair.right, r);
                rightData.push(d.percentile || null);
            });

            return {
                labels,
                datasets: [
                    {
                        label: `${getShortName(leftCollege.college)} - ${pair.left}`,
                        data: leftData,
                        backgroundColor: 'rgba(246, 128, 20, 0.9)', // Orange
                        sidebarBackgroundColor: '#f68014',
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    },
                    {
                        label: `${getShortName(rightCollege.college)} - ${pair.right}`,
                        data: rightData,
                        backgroundColor: 'rgba(59, 130, 246, 0.9)', // Blue
                        sidebarBackgroundColor: '#3b82f6',
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    }
                ]
            };
        }

        // Case 2: Multiple Pairs -> Bar Chart (Snapshot)
        if (customPairs.length > 0) {
            const labels = customPairs.map(p => `${p.left.split(' ')[0]} vs ${p.right.split(' ')[0]}`); // Short labels
            const leftData = [];
            const rightData = [];

            customPairs.forEach(pair => {
                // Use selected round or max
                const dl = getCutoffData(leftCollege.college, pair.left, selectedCapRound === 'all' ? '01' : selectedCapRound);
                const dr = getCutoffData(rightCollege.college, pair.right, selectedCapRound === 'all' ? '01' : selectedCapRound);
                leftData.push(dl.percentile || 0);
                rightData.push(dr.percentile || 0);
            });

            return {
                labels,
                datasets: [
                    {
                        label: getShortName(leftCollege.college),
                        data: leftData,
                        backgroundColor: 'rgba(246, 128, 20, 0.9)',
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    },
                    {
                        label: getShortName(rightCollege.college),
                        data: rightData,
                        backgroundColor: 'rgba(59, 130, 246, 0.9)',
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    }
                ]
            };
        }

        return { labels: [], datasets: [] };
    };

    // Calculate dynamic range in useEffect to avoid render loops
    useEffect(() => {
        let minVal = 100;
        let maxVal = 0;
        let hasData = false;

        const processData = (college, branch, round) => {
            if (!college || !branch) return;

            const val = getCutoffData(college, branch, round).percentile;
            if (val > 0) {
                minVal = Math.min(minVal, val);
                maxVal = Math.max(maxVal, val);
                hasData = true;
            }
        };

        customPairs.forEach(pair => {
            if (customPairs.length === 1) { // For single pair, consider all rounds for range
                ['01', '02', '03', '04'].forEach(round => {
                    processData(leftCollege.college, pair.left, round);
                    processData(rightCollege.college, pair.right, round);
                });
            } else { // For multiple pairs, consider only the selected round
                const roundToUse = selectedCapRound === 'all' ? '01' : selectedCapRound;
                processData(leftCollege.college, pair.left, roundToUse);
                processData(rightCollege.college, pair.right, roundToUse);
            }
        });

        if (hasData) {
            // Add padding
            const padding = (maxVal - minVal) * 0.05; // 5% padding for tighter zoom
            const cleanMin = Math.max(0, Math.floor(minVal - padding));
            const cleanMax = Math.min(100, Math.ceil(maxVal + padding));

            // Only update if different to prevent infinite loops (though usually safe with primitives)
            if (cleanMin !== chartDataRange.min || cleanMax !== chartDataRange.max) {
                setChartDataRange({ min: cleanMin, max: cleanMax });
            }
        } else {
            // Reset to default
            if (chartDataRange.min !== 0 || chartDataRange.max !== 100) {
                setChartDataRange({ min: 0, max: 100 });
            }
        }
    }, [customPairs, leftCollege.college, rightCollege.college, selectedCapRound, selectedExamType]);


    // Generate pie/doughnut chart data (no longer used in new flow, but kept for completeness if needed)
    const generatePieChartData = () => {
        const allBranches = [...new Set([...leftCollege.branches, ...rightCollege.branches])];
        const data = [];
        const labels = [];
        const backgroundColors = [];

        allBranches.forEach((branch, index) => {
            const leftData = leftCollege.branches.includes(branch) ?
                getCutoffData(leftCollege.college, branch, selectedCapRound === 'all' ? '01' : selectedCapRound) :
                { percentile: 0 };
            const rightData = rightCollege.branches.includes(branch) ?
                getCutoffData(rightCollege.college, branch, selectedCapRound === 'all' ? '01' : selectedCapRound) :
                { percentile: 0 };

            const avgPercentile = (leftData.percentile + rightData.percentile) / 2;
            if (avgPercentile > 0) {
                data.push(avgPercentile);
                labels.push(branch);
                backgroundColors.push(`hsl(${index * 60}, 70%, 60%)`);
            }
        });

        return {
            labels,
            datasets: [{
                data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
                borderWidth: 2,
            }]
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#374151',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'rectRounded'
                }
            },
            title: {
                display: true,
                text: customPairs.length === 1
                    ? `Cutoff Trend for ${customPairs[0].left} vs ${customPairs[0].right} - ${categoryMapping[selectedCategory]?.label || selectedCategory}`
                    : `Branch-wise Cutoff Comparison - ${categoryMapping[selectedCategory]?.label || selectedCategory}`,
                color: '#374151',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#374151',
                bodyColor: '#374151',
                borderColor: '#e5e7eb',
                borderWidth: 2,
                cornerRadius: 8,
                displayColors: true,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                callbacks: {
                    title: function (context) {
                        return `${context[0].dataset.label}`;
                    },
                    label: function (context) {
                        return `${context.label}: ${context.parsed.y.toFixed(2)}%`;
                    },
                    afterLabel: function (context) {
                        return `${selectedExamType} - CAP Round ${selectedCapRound}`;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 11,
                        weight: 'bold'
                    },
                    maxRotation: 45,
                    minRotation: 45
                },
                grid: {
                    color: '#e5e7eb',
                    drawBorder: false
                },
                title: {
                    display: true,
                    text: customPairs.length === 1 ? 'CAP Rounds' : 'Branches',
                    color: '#6b7280',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            y: {
                beginAtZero: false,
                min: chartDataRange.min,
                max: chartDataRange.max,
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    callback: function (value) {
                        return value + '%';
                    },
                    stepSize: 2
                },
                grid: {
                    color: '#e5e7eb',
                    drawBorder: false
                },
                title: {
                    display: true,
                    text: 'Cutoff Percentile (%)',
                    color: '#6b7280',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
        }
    };

    // Helper to shorten college names
    const getShortName = (name) => {
        if (!name) return '';
        // Common abbreviations
        const abbreviations = {
            'Pune Institute of Computer Technology': 'PICT',
            'Vishwakarma Institute of Technology': 'VIT',
            'College of Engineering': 'COEP',
            'Pimpri Chinchwad College of Engineering': 'PCCOE',
            'Maharashtra Institute of Technology': 'MIT',
            'Veermata Jijabai Technological Institute': 'VJTI',
            'Sardar Patel Institute of Technology': 'SPIT',
            'Walchand College of Engineering': 'Walchand',
            'Government College of Engineering': 'GCOE',
            'Vidyalankar Institute of Technology': 'VIT Mumbai',
            'Thadomal Shahani Engineering College': 'TSEC',
            'Dwarkadas J. Sanghvi College of Engineering': 'DJ Sanghvi'
        };

        // Check if we have a direct abbreviation
        const cleanName = name.split(',')[0].trim(); // Remove district/location part often after comma
        if (abbreviations[cleanName]) return abbreviations[cleanName];

        // Match partials if needed or just truncate
        const keys = Object.keys(abbreviations);
        for (let key of keys) {
            if (cleanName.includes(key)) return abbreviations[key];
        }

        // Fallback: First 3 words if long
        const words = cleanName.split(' ');
        if (words.length > 4) {
            return words.slice(0, 3).join(' ') + '...';
        }
        return cleanName;
    };

    // Generate intelligent suggestions based on cutoff trends
    const generateSuggestions = (r1, r2, r3, collegeName) => {
        if (!r1 || !r2 || !r3) return null;

        const trend = r1 - r3; // Positive means increasing cutoff (harder to get in)
        const stability = Math.abs(r1 - r2) + Math.abs(r2 - r3); // Lower is more stable

        if (trend > 5) {
            return {
                type: 'warning',
                icon: '⚠️',
                message: `Cutoff increased by ${trend.toFixed(1)}% - Getting more competitive`,
                suggestion: 'Consider this as a reach college, have backup options ready'
            };
        } else if (trend < -5) {
            return {
                type: 'success',
                icon: '📈',
                message: `Cutoff decreased by ${Math.abs(trend).toFixed(1)}% - Easier to get in`,
                suggestion: 'Good opportunity! Apply with confidence'
            };
        } else if (stability < 2) {
            return {
                type: 'info',
                icon: '📊',
                message: 'Very stable cutoffs across rounds',
                suggestion: 'Predictable admission chances, reliable choice'
            };
        } else {
            return {
                type: 'neutral',
                icon: '📋',
                message: 'Moderate cutoff fluctuations',
                suggestion: 'Monitor trends, decent admission probability'
            };
        }
    };

    // Branch Comparison Card Component
    const BranchComparisonCard = ({ branchName, leftData, rightData, isCrossComparison = false, leftBranchLabel, rightBranchLabel }) => {
        const leftPercentile = leftData?.percentile || 0;
        const rightPercentile = rightData?.percentile || 0;
        const higherCollege = leftPercentile > rightPercentile ? 'left' : 'right';

        // Get multi-round data if showing all rounds
        const leftMultiRound = getCutoffData(leftCollege.college, leftBranchLabel || branchName);
        const rightMultiRound = getCutoffData(rightCollege.college, rightBranchLabel || branchName);

        // Generate suggestions
        const leftSuggestion = leftMultiRound ?
            generateSuggestions(
                leftMultiRound['01']?.percentile,
                leftMultiRound['02']?.percentile,
                leftMultiRound['03']?.percentile,
                leftCollege.college
            ) : null;

        const rightSuggestion = rightMultiRound ?
            generateSuggestions(
                rightMultiRound['01']?.percentile,
                rightMultiRound['02']?.percentile,
                rightMultiRound['03']?.percentile,
                rightCollege.college
            ) : null;

        return (
            <div className={`rounded-2xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl bg-white group ${isCrossComparison ? 'ring-2 ring-orange-200' : ''}`}>
                <h4 className="font-bold mb-6 text-lg text-gray-800 border-b pb-2 flex items-center justify-between">
                    <span>{branchName}</span>
                    {isCrossComparison && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-lg">Custom Compare</span>}
                </h4>

                <div className="grid grid-cols-2 gap-4">
                    {/* Left College Stat */}
                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 relative overflow-hidden group-hover:border-orange-100 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#f68014]"></div>
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm font-black text-gray-800 uppercase tracking-tight truncate">
                                    {getShortName(leftCollege.college)}
                                </span>
                                {higherCollege === 'left' && <TrendingUp className="h-4 w-4 text-green-500" />}
                            </div>

                            {isCrossComparison && (
                                <div className="text-xs font-bold text-[#f68014] mb-2 leading-tight min-h-[2.5em]">
                                    {leftBranchLabel}
                                </div>
                            )}

                            <div className="text-4xl font-black text-gray-800 tracking-tight my-2">
                                {(leftPercentile > 0 ? leftPercentile : (leftMultiRound?.['01']?.percentile || 0)) > 0
                                    ? `${Number(leftPercentile > 0 ? leftPercentile : leftMultiRound['01'].percentile).toFixed(2)}%`
                                    : 'N/A'}
                            </div>

                            <div className="mt-auto pt-2 border-t border-gray-200/50">
                                <div className="grid grid-cols-4 gap-1">
                                    {['01', '02', '03', '04'].map((round, idx) => (
                                        <div key={round} className="text-center py-2 px-1 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center min-w-[3rem]">
                                            <div className="text-[10px] font-black text-gray-400 uppercase mb-1">R{idx + 1}</div>
                                            <div className="text-sm font-black text-gray-800">
                                                {leftMultiRound && leftMultiRound[round]?.percentile > 0
                                                    ? Number(leftMultiRound[round].percentile).toFixed(2)
                                                    : '-'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right College Stat */}
                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 relative overflow-hidden group-hover:border-blue-100 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm font-black text-gray-800 uppercase tracking-tight truncate">
                                    {getShortName(rightCollege.college)}
                                </span>
                                {higherCollege === 'right' && <TrendingUp className="h-4 w-4 text-green-500" />}
                            </div>

                            {isCrossComparison && (
                                <div className="text-xs font-bold text-blue-600 mb-2 leading-tight min-h-[2.5em]">
                                    {rightBranchLabel}
                                </div>
                            )}

                            <div className="text-4xl font-black text-gray-800 tracking-tight my-2">
                                {(rightPercentile > 0 ? rightPercentile : (rightMultiRound?.['01']?.percentile || 0)) > 0
                                    ? `${Number(rightPercentile > 0 ? rightPercentile : rightMultiRound['01'].percentile).toFixed(2)}%`
                                    : 'N/A'}
                            </div>

                            <div className="mt-auto pt-2 border-t border-gray-200/50">
                                <div className="grid grid-cols-4 gap-1">
                                    {['01', '02', '03', '04'].map((round, idx) => (
                                        <div key={round} className="text-center py-2 px-1 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center min-w-[3rem]">
                                            <div className="text-[10px] font-black text-gray-400 uppercase mb-1">R{idx + 1}</div>
                                            <div className="text-sm font-black text-gray-800">
                                                {rightMultiRound && rightMultiRound[round]?.percentile > 0
                                                    ? Number(rightMultiRound[round].percentile).toFixed(2)
                                                    : '-'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overall Suggestion */}
                {leftSuggestion && rightSuggestion && (
                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100">
                        <div className="flex items-center space-x-2 mb-2">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span className="text-xs font-extrabold text-gray-600 uppercase tracking-wide">
                                Analysis
                            </span>
                        </div>
                        <div className="text-sm text-gray-600 font-medium leading-relaxed">
                            {leftSuggestion.type === 'success' && rightSuggestion.type === 'warning'
                                ? `Option A shows decreasing competition, making it a safer bet.`
                                : rightSuggestion.type === 'success' && leftSuggestion.type === 'warning'
                                    ? `Option B shows decreasing competition, making it a safer bet.`
                                    : `Both colleges show similar admission trends. Compare other factors.`
                            }
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const chartData = generateChartData();

    // Download Image Handler with Watermark
    const handleDownloadImage = async () => {
        if (!comparisonRef.current) return;

        try {
            setIsDownloading(true);
            const element = comparisonRef.current;

            // 1. Capture the UI
            const originalCanvas = await html2canvas(element, {
                scale: 2, // Higher quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            // 2. Create Final Canvas with Extra Space for Footer
            const footerHeight = 140; // Larger footer
            const finalCanvas = document.createElement('canvas');
            finalCanvas.width = originalCanvas.width;
            finalCanvas.height = originalCanvas.height + footerHeight;

            const ctx = finalCanvas.getContext('2d');

            // Fill white background
            ctx.fillStyle = '#ffffff';
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
            ctx.font = 'bold 48px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('College Pe Charcha', width / 2, height - (footerHeight * 0.6));

            // Subtitle / Link
            ctx.font = '24px sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.fillText('For more comparison visit collegepecharcha.in', width / 2, height - (footerHeight * 0.25));

            // Optional: Draw Logo in Main Content Area (Watermark)
            try {
                const logoPath = '/college_pe_charcha_logo.png';
                const logoImg = new Image();
                logoImg.src = logoPath;
                await new Promise((resolve, reject) => {
                    logoImg.onload = resolve;
                    logoImg.onerror = reject;
                });

                // Draw larger branding logo in top right
                const logoSize = 150;
                ctx.globalAlpha = 1.0;
                ctx.drawImage(logoImg, width - logoSize - 40, 40, logoSize, logoSize);
            } catch (err) {
                console.warn("Logo failed:", err);
            }

            // 4. Download Final Image
            const link = document.createElement('a');
            link.download = `Comparison_${getShortName(leftCollege.college)}_vs_${getShortName(rightCollege.college)}.png`;
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
        <div className="min-h-screen bg-[#FFFBF2] relative overflow-x-hidden pb-0">
            {/* Background Decoration - Premium Gold/Champagne Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            {/* Golden Glows */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply pointer-events-none"></div>
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply pointer-events-none" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 mb-6 bg-white rounded-2xl shadow-xl shadow-orange-100/50 ring-1 ring-orange-100">
                        <div className="bg-gradient-to-br from-[#f68014] to-orange-600 p-3 rounded-xl shadow-lg">
                            <BarChart3 className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="ml-4 text-3xl md:text-5xl font-black bg-gradient-to-r from-[#f68014] to-orange-700 bg-clip-text text-transparent tracking-tight">
                            Smart Compare
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
                        Analyze and compare college cutoffs side-by-side with AI-driven insights and multi-round trends.
                    </p>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="rounded-2xl shadow-lg border border-red-100 bg-red-50 p-6 mb-8 flex items-start space-x-4">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <X className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-red-800 mb-1">Error Loading Data</h3>
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="rounded-2xl shadow-xl border border-white bg-white/80 backdrop-blur-sm p-8 mb-8 flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-100 border-t-[#f68014] mb-4"></div>
                        <span className="text-lg font-bold text-gray-700">Analyzing college data...</span>
                    </div>
                )}

                {/* Quick Filters */}
                <div className="rounded-3xl shadow-xl border border-white bg-white/90 backdrop-blur-md p-6 mb-10 ring-1 ring-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-black flex items-center space-x-2 text-gray-800">
                            <div className="p-2 bg-orange-100 rounded-lg text-[#f68014]">
                                <Filter className="h-5 w-5" />
                            </div>
                            <span>Configuration</span>
                        </h2>

                        {/* Selected Context Badge */}
                        {(leftCollege.college || rightCollege.college) && (
                            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Active Context:</span>
                                <span className="text-sm font-bold text-gray-700">{selectedExamType}</span>
                                <span className="h-4 w-px bg-gray-300"></span>
                                <span className="text-sm font-bold text-[#f68014]">Round {selectedCapRound === 'all' ? '1-4' : selectedCapRound}</span>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Category Selection */}
                        <div className="space-y-2">
                            <label className="text-xs font-extrabold text-gray-400 uppercase tracking-wider ml-1">
                                Seat Category
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-[#f68014] appearance-none font-bold text-gray-700 bg-gray-50 hover:bg-white transition-all"
                                >
                                    {Object.entries(categoryMapping).slice(0, 10).map(([key, value]) => (
                                        <option key={key} value={key}>
                                            {value.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Exam Type Selection */}
                        <div className="space-y-2">
                            <label className="text-xs font-extrabold text-gray-400 uppercase tracking-wider ml-1">
                                Exam Source
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedExamType}
                                    onChange={(e) => setSelectedExamType(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-[#f68014] appearance-none font-bold text-gray-700 bg-gray-50 hover:bg-white transition-all"
                                >
                                    <option value="MHT-CET">MHT-CET (State)</option>
                                    <option value="JEE">JEE Mains (All India)</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* CAP Round Selection */}
                        <div className="space-y-2">
                            <label className="text-xs font-extrabold text-gray-400 uppercase tracking-wider ml-1">
                                Admission Round
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedCapRound}
                                    onChange={(e) => setSelectedCapRound(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-[#f68014] appearance-none font-bold text-gray-700 bg-gray-50 hover:bg-white transition-all"
                                >
                                    <option value="all">Compare All Rounds</option>
                                    <option value="01">Round 1 Only</option>
                                    <option value="02">Round 2 Only</option>
                                    <option value="03">Round 3 Only</option>
                                    <option value="04">Round 4 Only</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>


                    </div>
                </div>

                {/* Reset Button (Mobile Only Place) */}
                <div className="flex justify-end mb-8 md:hidden">
                    <button
                        onClick={resetComparison}
                        className="px-6 py-3 rounded-xl font-bold bg-white text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all flex items-center space-x-2 shadow-sm"
                    >
                        <RotateCcw className="h-4 w-4" />
                        <span>Reset</span>
                    </button>
                </div>

                {/* Two Panel Layout */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12 relative">
                    {/* VS Badge (Absolute Center) */}
                    <div className="hidden lg:flex absolute top-12 left-1/2 -translate-x-1/2 z-10">
                        <div className="bg-white p-3 rounded-full shadow-xl border-4 border-orange-50 font-black text-xl text-gray-300 w-16 h-16 flex items-center justify-center">
                            VS
                        </div>
                    </div>

                    {/* Left Panel */}
                    <CollegePanel
                        side="left"
                        college={leftCollege.college}
                        onCollegeSelect={handleCollegeSelect}
                    />

                    {/* Right Panel */}
                    <CollegePanel
                        side="right"
                        college={rightCollege.college}
                        onCollegeSelect={handleCollegeSelect}
                    />
                </div>

                {/* Desktop Reset Button Location */}
                {(leftCollege.college || rightCollege.college) && (
                    <div className="flex justify-center mb-12">
                        <button
                            onClick={resetComparison}
                            className="group px-8 py-3 rounded-full bg-white border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                        >
                            <RotateCcw className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                            <span className="font-bold text-gray-500 group-hover:text-red-600 transition-colors">Start New Comparison</span>
                        </button>
                    </div>
                )}

                {/* Comparison Results */}
                {(leftCollege.college || rightCollege.college) && (
                    <div ref={comparisonRef} className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-orange-50/50 p-4 rounded-3xl">

                        {/* Custom Comparison Builder */}
                        {leftCollege.college && rightCollege.college && (
                            <div className="rounded-3xl shadow-xl border border-white bg-white/60 backdrop-blur-md p-8 relative">
                                <div className="absolute top-8 right-8" data-html2canvas-ignore="true">
                                    <button
                                        onClick={handleDownloadImage}
                                        disabled={isDownloading}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-orange-200 text-orange-600 rounded-xl hover:bg-orange-50 font-bold text-sm shadow-sm transition-all disabled:opacity-50"
                                    >
                                        {isDownloading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Download className="h-4 w-4" />
                                        )}
                                        {isDownloading ? 'Generating...' : 'Download Comparison'}
                                    </button>
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-2xl font-black flex items-center space-x-3 text-gray-800">
                                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                            <Zap className="h-6 w-6" />
                                        </div>
                                        <span>Comparison Builder</span>
                                    </h3>
                                    <p className="text-gray-500 font-medium ml-12 mt-1 text-sm">Manually pair specific branches to analyze differences.</p>
                                </div>

                                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-200" data-html2canvas-ignore="true">
                                    <div className="grid md:grid-cols-[1fr_auto_1fr_auto] gap-4 items-end">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase">From One ({getShortName(leftCollege.college)})</label>
                                            <select
                                                value={builderLeft}
                                                onChange={(e) => setBuilderLeft(e.target.value)}
                                                className="w-full p-3 rounded-xl border border-gray-200 font-bold text-gray-700 bg-white focus:ring-2 focus:ring-[#f68014]"
                                            >
                                                <option value="">Select Branch...</option>
                                                {getCollegeBranches(leftCollege.college).map(b => (
                                                    <option key={b} value={b}>{b}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="pb-3 text-gray-400 font-black">VS</div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase">From Two ({getShortName(rightCollege.college)})</label>
                                            <select
                                                value={builderRight}
                                                onChange={(e) => setBuilderRight(e.target.value)}
                                                className="w-full p-3 rounded-xl border border-gray-200 font-bold text-gray-700 bg-white focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select Branch...</option>
                                                {getCollegeBranches(rightCollege.college).map(b => (
                                                    <option key={b} value={b}>{b}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <button
                                            onClick={addCustomPair}
                                            disabled={!builderLeft || !builderRight}
                                            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-gray-200"
                                        >
                                            Compare
                                        </button>
                                    </div>
                                </div>

                                {/* Custom Pairs Display */}
                                {customPairs.length > 0 && (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
                                        {customPairs.map(pair => (
                                            <div key={pair.id} className="relative group">
                                                <button
                                                    onClick={() => removeCustomPair(pair.id)}
                                                    data-html2canvas-ignore="true"
                                                    className="absolute -top-3 -right-3 bg-red-100 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-red-500 hover:text-white shadow-sm"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                                <BranchComparisonCard
                                                    branchName={`${pair.left} VS ${pair.right}`}
                                                    leftData={getCutoffData(leftCollege.college, pair.left, selectedCapRound === 'all' ? '01' : selectedCapRound)}
                                                    rightData={getCutoffData(rightCollege.college, pair.right, selectedCapRound === 'all' ? '01' : selectedCapRound)}
                                                    isCrossComparison={true}
                                                    leftBranchLabel={pair.left}
                                                    rightBranchLabel={pair.right}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Chart Section - Only if custom pairs exist */}
                        {customPairs.length > 0 && (
                            <div className="rounded-3xl shadow-xl border border-white bg-white/60 backdrop-blur-md p-8" data-html2canvas-ignore="true">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 rounded-lg text-[#f68014]">
                                            <BarChart2 className="h-6 w-6" />
                                        </div>
                                        {customPairs.length === 1 ? 'Cutoff Trends (Round-wise)' : 'Comparison Overview'}
                                    </h3>
                                </div>

                                <div className="h-[400px] w-full">
                                    <Chart
                                        type='bar'
                                        data={generateChartData()}
                                        options={{
                                            ...chartOptions,
                                            plugins: {
                                                ...chartOptions.plugins,
                                                legend: {
                                                    position: 'top',
                                                    labels: {
                                                        font: { family: 'Outfit', weight: 'bold' },
                                                        usePointStyle: true,
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Summary Section */}
                        {leftCollege.college && rightCollege.college && customPairs.length > 0 && (
                            <div className="rounded-3xl shadow-xl border border-white bg-white p-8" data-html2canvas-ignore="true">
                                <h3 className="text-2xl font-black flex items-center space-x-3 mb-8 text-gray-800">
                                    <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                        <Star className="h-6 w-6" />
                                    </div>
                                    <span>Comparison Summary</span>
                                </h3>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Left College Summary */}
                                    <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-lg transition-all">
                                        <h4 className="text-xl font-black mb-6 flex items-center space-x-3 text-gray-800">
                                            <div className="w-8 h-8 rounded-full bg-[#f68014] text-white flex items-center justify-center text-sm font-bold">A</div>
                                            <span className="line-clamp-1">{getShortName(leftCollege.college)}</span>
                                        </h4>
                                        <div className="space-y-4 text-sm font-medium text-gray-600">
                                            <div className="flex justify-between border-b border-orange-100 pb-2">
                                                <span>District</span>
                                                <span className="font-bold text-gray-800">{availableColleges.find(c => c.value === leftCollege.college)?.district}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-orange-100 pb-2">
                                                <span>Status</span>
                                                <span className="font-bold text-gray-800">{availableColleges.find(c => c.value === leftCollege.college)?.status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right College Summary */}
                                    <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg transition-all">
                                        <h4 className="text-xl font-black mb-6 flex items-center space-x-3 text-gray-800">
                                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">B</div>
                                            <span className="line-clamp-1">{getShortName(rightCollege.college)}</span>
                                        </h4>
                                        <div className="space-y-4 text-sm font-medium text-gray-600">
                                            <div className="flex justify-between border-b border-blue-100 pb-2">
                                                <span>District</span>
                                                <span className="font-bold text-gray-800">{availableColleges.find(c => c.value === rightCollege.college)?.district}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-blue-100 pb-2">
                                                <span>Status</span>
                                                <span className="font-bold text-gray-800">{availableColleges.find(c => c.value === rightCollege.college)?.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>




    );
};

export default CollegeComparison;
