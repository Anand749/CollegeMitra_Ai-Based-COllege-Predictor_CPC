import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import CAP01 from './Data for College Predictor/cap1_2025_formatted.json';
import CAP02 from './Data for College Predictor/cap2_2025_formatted.json';
import CAP03 from './Data for College Predictor/cap3_2025_formatted.json';
import CAP04 from './Data for College Predictor/cap4_2025_formatted.json';
import AI_CAP1 from './Data for College Predictor/AI_CAP1_25-26.json';
import AI_CAP2 from './Data for College Predictor/AI_CAP2_25-26.json';
import AI_CAP3 from './Data for College Predictor/AI_CAP3_25-26.json';
import AI_CAP4 from './Data for College Predictor/AI_CAP4_25-26.json';

import {
    GraduationCap,
    Search,
    Filter,
    MapPin,
    Award,
    Users,
    CheckCircle,
    Download,
    RotateCcw,
    X,
    ArrowLeft
} from 'lucide-react';
import Footer from '../Footer';

const casteFallbackOrder = {
    NT3: ["NT3", "NT2", "NT1", "OPEN"],
    NT2: ["NT2", "NT1", "NT3", "OPEN"],
    NT1: ["NT1", "NT2", "NT3", "OPEN"],
    VJ: ["VJ", "NT1", "NT2", "NT3", "OPEN"],
    OBC: ["OBC", "OPEN"],
    SEBC: ["SEBC", "OBC", "OPEN"],
    SC: ["SC", "OPEN"],
    ST: ["ST", "OPEN"],
    OPEN: ["OPEN"],
    EWS: ["EWS", "OPEN"],
};

// Region mapping based on institute_code prefix (more reliable than district names)
// 01 = Amravati, 02 = Chhatrapati Sambhaji Nagar, 03 = Mumbai, 04 = Nagpur, 05 = Nashik, 06/16 = Pune
const getRegionFromInstituteCode = (instituteCode) => {
    if (!instituteCode) return "Other";
    const prefix = instituteCode.toString().substring(0, 2);
    switch (prefix) {
        case "01": return "Amravati";
        case "02": return "Chhatrapati Sambhaji Nagar";
        case "03": return "Mumbai";
        case "04": return "Nagpur";
        case "05": return "Nashik";
        case "06": return "Pune";
        case "16": return "Pune";
        default: return "Other";
    }
};

const availableRegions = [
    "Mumbai",
    "Pune",
    "Nashik",
    "Nagpur",
    "Amravati",
    "Chhatrapati Sambhaji Nagar"
];

const initialFilters = {
    percentile: "",
    rank: "",
    minPercentile: "",
    maxPercentile: "",
    minRank: "",
    maxRank: "",
    caste: "",
    branch: [],
    region: [],
    gender: "general",
    universityType: "any",
    isDefence: false,
    isPWD: false,
};

function CollegePredictorPage() {
    const navigate = useNavigate();
    const [availableBranches, setAvailableBranches] = useState([]);
    const [capRound, setCapRound] = useState('01');
    const [examType, setExamType] = useState('MHT-CET');
    const [filterType, setFilterType] = useState('percentile');
    const [filterMode, setFilterMode] = useState('single'); // 'single' or 'range'

    const casteCategories = [
        { value: "OPEN", label: "Open Category" },
        { value: "SC", label: "Scheduled Caste (SC)" },
        { value: "ST", label: "Scheduled Tribe (ST)" },
        { value: "VJ", label: "Vimukta Jati (VJ)" },
        { value: "NT1", label: "Nomadic Tribe 1 (NT1)" },
        { value: "NT2", label: "Nomadic Tribe 2 (NT2)" },
        { value: "NT3", label: "Nomadic Tribe 3 (NT3)" },
        { value: "OBC", label: "Other Backward Class (OBC)" },
        { value: "SEBC", label: "Socially and Educationally Backward Class (SEBC)" },
        { value: "EWS", label: "Economically Weaker Section (EWS)" },
    ];

    const [filters, setFilters] = useState(initialFilters);
    const [percentileError, setPercentileError] = useState("");
    const [rankError, setRankError] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [noResultsFound, setNoResultsFound] = useState(false);

    useEffect(() => {
        let data;
        if (examType === "MHT-CET") {
            if (capRound === "01") data = CAP01;
            else if (capRound === "02") data = CAP02;
            else if (capRound === "03") data = CAP03;
            else data = CAP04;
        } else {
            if (capRound === "01") data = AI_CAP1;
            else if (capRound === "02") data = AI_CAP2;
            else if (capRound === "03") data = AI_CAP3;
            else data = AI_CAP4;
        }

        const branchesSet = new Set();

        if (examType === "MHT-CET") {
            Object.values(data).forEach((college) => {
                college.branches.forEach((branch) => branchesSet.add(branch.branch_info));
            });
        } else {
            data.forEach((college) => {
                college.Courses.forEach((course) => branchesSet.add(course["Course Name"]));
            });
        }

        setAvailableBranches(Array.from(branchesSet).sort());
    }, [capRound, examType]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "filterType") {
            setFilterType(value);
            setFilters((prev) => ({ ...prev, percentile: "", rank: "", minPercentile: "", maxPercentile: "", minRank: "", maxRank: "" }));
            setPercentileError("");
            setRankError("");
            return;
        }

        if (name === "filterMode") {
            setFilterMode(value);
            setFilters((prev) => ({ ...prev, percentile: "", rank: "", minPercentile: "", maxPercentile: "", minRank: "", maxRank: "" }));
            setPercentileError("");
            setRankError("");
            return;
        }

        if (name === "examType") {
            setExamType(value);
            setFilteredColleges([]);
            setNoResultsFound(false);
            setFilters(initialFilters);
            return;
        }

        if (name === "percentile" || name === "minPercentile" || name === "maxPercentile") {
            setPercentileError("");
            if (value && (parseFloat(value) > 100 || parseFloat(value) < 0)) {
                setPercentileError("Percentile must be between 0 and 100.");
            }
        }

        if (name === "rank" || name === "minRank" || name === "maxRank") {
            setRankError("");
            if (value && parseInt(value) <= 0) setRankError("Rank must be a positive number.");
        }

        if (name === "branch") {
            setSelectedBranch(value);
        } else if (name === "region") {
            setSelectedRegion(value);
        } else {
            setFilters((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const resetFilters = () => {
        setFilters(initialFilters);
        setFilterType('percentile');
        setFilterMode('single');
        setExamType('MHT-CET');
        setCapRound('01');
        setSelectedBranch('');
        setSelectedRegion('');
        setFilteredColleges([]);
        setNoResultsFound(false);
        setPercentileError('');
        setRankError('');
    };

    const addBranch = () => {
        if (selectedBranch && !filters.branch.includes(selectedBranch)) {
            setFilters((prev) => ({ ...prev, branch: [...prev.branch, selectedBranch] }));
            setSelectedBranch("");
        }
    };

    const removeBranch = (branchToRemove) => {
        setFilters((prev) => ({ ...prev, branch: prev.branch.filter((b) => b !== branchToRemove) }));
    };

    const addRegion = () => {
        if (selectedRegion && !filters.region.includes(selectedRegion)) {
            setFilters((prev) => ({ ...prev, region: [...prev.region, selectedRegion] }));
            setSelectedRegion("");
        }
    };

    const removeRegion = (regionToRemove) => {
        setFilters((prev) => ({ ...prev, region: prev.region.filter((r) => r !== regionToRemove) }));
    };

    const getSeatSuffix = (collegeLevel) => {
        if (collegeLevel?.toLowerCase().includes("home university")) return "H";
        if (collegeLevel?.toLowerCase().includes("outside")) return "O";
        return "S";
    };

    const applyFilters = () => {
        setIsSearching(true);
        setFilteredColleges([]);
        setNoResultsFound(false);

        setTimeout(() => {
            const { percentile, rank, minPercentile, maxPercentile, minRank, maxRank, caste, branch, region, gender, universityType, isDefence, isPWD } = filters;

            // Validation based on filter mode
            if (filterMode === 'single') {
                if (filterType === 'percentile' && !percentile) {
                    alert("Please enter your percentile.");
                    setIsSearching(false);
                    return;
                }
                if (filterType === 'rank' && !rank) {
                    alert("Please enter your rank.");
                    setIsSearching(false);
                    return;
                }
            } else {
                // Range mode
                if (filterType === 'percentile' && (!minPercentile || !maxPercentile)) {
                    alert("Please enter both minimum and maximum percentile.");
                    setIsSearching(false);
                    return;
                }
                if (filterType === 'rank' && (!minRank || !maxRank)) {
                    alert("Please enter both minimum and maximum rank.");
                    setIsSearching(false);
                    return;
                }
            }
            if (examType === "MHT-CET" && !caste) {
                alert("Please select a caste category.");
                setIsSearching(false);
                return;
            }

            // Parse values for filtering
            const percentileValue = parseFloat(percentile);
            const rankValue = parseInt(rank, 10);
            const minPercentileValue = parseFloat(minPercentile);
            const maxPercentileValue = parseFloat(maxPercentile);
            const minRankValue = parseInt(minRank, 10);
            const maxRankValue = parseInt(maxRank, 10);

            let data;
            if (examType === "MHT-CET") {
                if (capRound === "01") data = CAP01;
                else if (capRound === "02") data = CAP02;
                else if (capRound === "03") data = CAP03;
                else data = CAP04;
            } else {
                if (capRound === "01") data = AI_CAP1;
                else if (capRound === "02") data = AI_CAP2;
                else if (capRound === "03") data = AI_CAP3;
                else data = AI_CAP4;
            }

            let results = [];

            if (examType === "MHT-CET") {
                let collegesToSearch = Object.entries(data);

                if (region.length > 0) {
                    collegesToSearch = collegesToSearch.filter(([_, info]) => region.includes(getRegionFromInstituteCode(info.institute_code)));
                }
                if (universityType === "HU") {
                    collegesToSearch = collegesToSearch.filter(([_, info]) => info.level?.toLowerCase().includes("home university"));
                } else if (universityType === "OHU") {
                    collegesToSearch = collegesToSearch.filter(([_, info]) => info.level?.toLowerCase().includes("outside"));
                } else if (universityType === "SL") {
                    collegesToSearch = collegesToSearch.filter(([_, info]) => !info.level?.toLowerCase().includes("home university") && !info.level?.toLowerCase().includes("outside"));
                }

                results = collegesToSearch.map(([collegeName, collegeInfo]) => {
                    // --- GENDER FILTER LOGIC FOR CUMMINS COLLEGE ---
                    // Institute code 6276 is Cummins College of Engineering for Women
                    const instituteCodeStr = collegeInfo.institute_code?.toString();
                    if (gender !== 'female' && (instituteCodeStr === "6276" || instituteCodeStr === "06276")) {
                        return null;
                    }
                    const eligibleBranches = collegeInfo.branches.map(currentBranch => {
                        // Collect ALL eligible seats for this branch
                        let allEligibleSeats = [];

                        // Build the list of seat codes to check based on user preferences
                        const genderPrefixes = isPWD ? ['PWD', 'PWDR'] : isDefence ? ['DEF', 'DEFR'] : gender === 'female' ? ['L', 'G'] : ['G', 'L'];

                        // User's primary category (e.g., SC, ST, OBC, etc.)
                        const primaryCategory = caste;
                        // Full fallback order including OPEN
                        const casteFallback = casteFallbackOrder[caste] || [caste];

                        // All possible suffixes
                        const suffixes = ['S', 'O', 'H', ''];  // '' for codes without suffix

                        // Helper function to check eligibility
                        const checkEligibility = (cutoffPercentile, cutoffRank) => {
                            if (filterMode === 'single') {
                                if (filterType === 'percentile') {
                                    return !isNaN(cutoffPercentile) && percentileValue >= cutoffPercentile;
                                } else {
                                    return !isNaN(cutoffRank) && rankValue <= cutoffRank;
                                }
                            } else {
                                if (filterType === 'percentile' && !isNaN(cutoffPercentile)) {
                                    return cutoffPercentile >= minPercentileValue && cutoffPercentile <= maxPercentileValue;
                                } else if (filterType === 'rank' && !isNaN(cutoffRank)) {
                                    return cutoffRank >= minRankValue && cutoffRank <= maxRankValue;
                                }
                            }
                            return false;
                        };

                        // Helper to parse seat data
                        const parseSeatData = (seatValue) => {
                            if (!seatValue || seatValue === "") return null;
                            const parts = seatValue.split("\n");
                            const cutoffRank = parseInt(parts[0], 10);
                            const cutoffPercentile = parseFloat(parts[1]?.replace(/[()]/g, ""));
                            if (isNaN(cutoffRank) || isNaN(cutoffPercentile)) return null;
                            return { cutoffRank, cutoffPercentile };
                        };

                        // Check all rows in table_data for this branch
                        for (const row of currentBranch.table_data) {
                            // Try all combinations of prefix + caste + suffix
                            for (const prefix of genderPrefixes) {
                                for (const casteCode of casteFallback) {
                                    for (const suffix of suffixes) {
                                        const seatCode = suffix ? `${prefix}${casteCode}${suffix}` : `${prefix}${casteCode}`;

                                        if (row[seatCode]) {
                                            const parsed = parseSeatData(row[seatCode]);
                                            if (parsed && checkEligibility(parsed.cutoffPercentile, parsed.cutoffRank)) {
                                                const isPrimaryCat = casteCode === primaryCategory;
                                                allEligibleSeats.push({
                                                    seatCode,
                                                    cutoffPercentile: parsed.cutoffPercentile,
                                                    cutoffRank: parsed.cutoffRank,
                                                    isPrimaryCategory: isPrimaryCat,
                                                    priority: isPrimaryCat ? 0 : 1, // Lower is better
                                                });
                                            }
                                        }
                                    }
                                }
                            }

                            // Also check special category seats like EWS (for EWS category users)
                            if (caste === "EWS" && row["EWS"]) {
                                const parsed = parseSeatData(row["EWS"]);
                                if (parsed && checkEligibility(parsed.cutoffPercentile, parsed.cutoffRank)) {
                                    allEligibleSeats.push({
                                        seatCode: "EWS",
                                        cutoffPercentile: parsed.cutoffPercentile,
                                        cutoffRank: parsed.cutoffRank,
                                        isPrimaryCategory: true,
                                        priority: 0,
                                    });
                                }
                            }
                        }

                        // If no eligible seats found, return null
                        if (allEligibleSeats.length === 0) {
                            return null;
                        }

                        // Sort seats: primary category first, then by higher cutoff percentile
                        allEligibleSeats.sort((a, b) => {
                            if (a.priority !== b.priority) return a.priority - b.priority;
                            return b.cutoffPercentile - a.cutoffPercentile;
                        });

                        // Return the best seat for this branch
                        const bestSeat = allEligibleSeats[0];
                        return {
                            branch_info: currentBranch.branch_info,
                            bestCutoff: bestSeat.cutoffPercentile,
                            bestCutoffRank: bestSeat.cutoffRank,
                            matchedSeatCode: bestSeat.seatCode,
                            isPrimaryCategory: bestSeat.isPrimaryCategory,
                            allSeatsCount: allEligibleSeats.length, // For debugging
                        };
                    }).filter(Boolean);

                    const finalEligibleBranches = branch.length > 0
                        ? eligibleBranches.filter(b => branch.some(sel => sel.trim().toLowerCase() === b.branch_info.trim().toLowerCase()))
                        : eligibleBranches;

                    if (finalEligibleBranches.length > 0) {
                        // Sort branches: primary category matches first, then by cutoff percentile
                        const sortedBranches = finalEligibleBranches.sort((a, b) => {
                            // First priority: Primary category matches come first
                            if (a.isPrimaryCategory && !b.isPrimaryCategory) return -1;
                            if (!a.isPrimaryCategory && b.isPrimaryCategory) return 1;
                            // Second priority: Higher cutoff percentile first
                            return b.bestCutoff - a.bestCutoff;
                        });

                        // Check if this college has any primary category matches
                        const hasPrimaryCategoryMatch = sortedBranches.some(b => b.isPrimaryCategory);

                        return {
                            collegeName,
                            status: collegeInfo.status,
                            level: collegeInfo.level,
                            district: collegeInfo.district,
                            branches: sortedBranches,
                            closingPercentile: Math.max(...finalEligibleBranches.map(b => b.bestCutoff)),
                            closingRank: Math.min(...finalEligibleBranches.map(b => b.bestCutoffRank)),
                            hasPrimaryCategoryMatch: hasPrimaryCategoryMatch, // For overall sorting
                        };
                    }
                    return null;
                }).filter(Boolean);

            } else {
                results = data.filter((college) => {
                    // --- GENDER FILTER LOGIC FOR CUMMINS COLLEGE ---
                    const instCode = college["Institute Code"]?.toString();
                    if (gender !== 'female' && (instCode === "6276" || instCode === "06276")) {
                        return false;
                    }
                    const regionMatch = region.length === 0 || region.some(r => r === getRegionFromInstituteCode(college["Institute Code"]));
                    if (!regionMatch) return false;
                    return college.Courses.some(course => {
                        const branchMatch = branch.length === 0 || branch.some(b => b.trim().toLowerCase() === course["Course Name"].trim().toLowerCase());
                        if (!branchMatch) return false;
                        const meritData = course["All India Merit"].split(" ");
                        const cutoffRank = parseInt(meritData[0], 10);
                        const cutoffPercentile = parseFloat(meritData[1]?.replace(/[()]/g, ""));

                        if (filterMode === 'single') {
                            if (filterType === 'percentile') return !isNaN(cutoffPercentile) && percentileValue >= cutoffPercentile;
                            else return !isNaN(cutoffRank) && rankValue <= cutoffRank;
                        } else {
                            // Range mode
                            if (filterType === 'percentile') return !isNaN(cutoffPercentile) && cutoffPercentile >= minPercentileValue && cutoffPercentile <= maxPercentileValue;
                            else return !isNaN(cutoffRank) && cutoffRank >= minRankValue && cutoffRank <= maxRankValue;
                        }
                    });
                }).map((college) => {
                    const matchingCourses = college.Courses.filter(course => {
                        const branchMatch = branch.length === 0 || branch.some(b => b.trim().toLowerCase() === course["Course Name"].trim().toLowerCase());
                        if (!branchMatch) return false;
                        const meritData = course["All India Merit"].split(" ");
                        const cutoffRank = parseInt(meritData[0], 10);
                        const cutoffPercentile = parseFloat(meritData[1]?.replace(/[()]/g, ""));

                        if (filterMode === 'single') {
                            if (filterType === 'percentile') return !isNaN(cutoffPercentile) && percentileValue >= cutoffPercentile;
                            else return !isNaN(cutoffRank) && rankValue <= cutoffRank;
                        } else {
                            if (filterType === 'percentile') return !isNaN(cutoffPercentile) && cutoffPercentile >= minPercentileValue && cutoffPercentile <= maxPercentileValue;
                            else return !isNaN(cutoffRank) && cutoffRank >= minRankValue && cutoffRank <= maxRankValue;
                        }
                    });
                    const getRank = c => parseInt(c["All India Merit"].split(" ")[0], 10);
                    const getPercentile = c => parseFloat(c["All India Merit"].split(" ")[1]?.replace(/[()]/g, ""));

                    const collegeCode = college["Institute Code"] || 'JEE-AI';
                    const collegeName = `${collegeCode} - ${college["Institute Name"]}`;

                    return {
                        collegeName: collegeName,
                        status: matchingCourses[0]["Merit Exam"],
                        level: "All India",
                        district: college.District,
                        branches: matchingCourses.map(c => ({
                            branch_info: c["Course Name"],
                            bestCutoff: getPercentile(c),
                            bestCutoffRank: getRank(c),
                            matchedSeatCode: "JEE-AI"
                        })).sort((a, b) => b.bestCutoff - a.bestCutoff),
                        closingPercentile: Math.max(...matchingCourses.map(getPercentile)),
                        closingRank: Math.min(...matchingCourses.map(getRank)),
                    };
                });
            }

            // Sort results: 
            // 1. First priority: Colleges with primary category matches come first
            // 2. Second priority: By percentile (desc) or rank (asc)
            results.sort((a, b) => {
                // For MHT-CET results, prioritize colleges with primary category matches
                if (examType === "MHT-CET") {
                    if (a.hasPrimaryCategoryMatch && !b.hasPrimaryCategoryMatch) return -1;
                    if (!a.hasPrimaryCategoryMatch && b.hasPrimaryCategoryMatch) return 1;
                }
                // Then sort by percentile or rank
                if (filterType === 'percentile') {
                    return b.closingPercentile - a.closingPercentile;
                } else {
                    return a.closingRank - b.closingRank;
                }
            });

            setFilteredColleges(results.slice(0, 30));

            if (results.length === 0) {
                setNoResultsFound(true);
            }
            setIsSearching(false);
        }, 100);
    };

    const downloadPDFList = () => {
        if (filteredColleges.length === 0) {
            alert("No college data to download!");
            return;
        }

        const filteredPreferences = filteredColleges.flatMap(college => {
            const nameParts = college.collegeName.split(' - ');
            const collegeCode = nameParts[0] || 'N/A';
            const collegeNameOnly = nameParts.length > 1 ? nameParts.slice(1).join(' - ') : college.collegeName;

            return college.branches.map(b => ({
                collegeCode: collegeCode,
                collegeName: collegeNameOnly,
                branch_info: b.branch_info,
                matchedSeatCode: b.matchedSeatCode,
                bestCutoff: b.bestCutoff,
                bestCutoffRank: b.bestCutoffRank,
                district: college.district,
                status: college.status,
                level: college.level,
                isPrimaryCategory: b.isPrimaryCategory, // Include category priority
            }));
        });

        // Sort: Primary category matches first, then by percentile/rank
        filteredPreferences.sort((a, b) => {
            // First priority: Primary category matches come first
            if (a.isPrimaryCategory && !b.isPrimaryCategory) return -1;
            if (!a.isPrimaryCategory && b.isPrimaryCategory) return 1;
            // Then sort by percentile or rank
            if (filterType === 'percentile') {
                return b.bestCutoff - a.bestCutoff;
            } else {
                return a.bestCutoffRank - b.bestCutoffRank;
            }
        });

        try {
            const doc = new jsPDF();
            let startY = 20;

            doc.setFontSize(18);
            doc.text("Your Predicted Preference List", 14, startY);
            doc.setFontSize(12);
            doc.setTextColor(80);
            doc.text(`College Pe Charcha - ${examType} (CAP Round ${capRound})`, 14, startY + 7);
            startY += 15;
            doc.setFontSize(11);
            doc.setTextColor(40);
            doc.text("Filters Applied:", 14, startY);
            startY += 7;
            doc.setFontSize(9);
            doc.setTextColor(60);
            const scoreText = filterType === "rank" ? `Your Rank: ${filters.rank}` : `Your Percentile: ${filters.percentile}`;
            doc.text(scoreText, 14, startY);
            startY += 5;
            if (examType === "MHT-CET") {
                doc.text(`Category: ${filters.caste} (${filters.gender})`, 14, startY);
                startY += 5;
                let special = [];
                if (filters.isDefence) special.push("Defence");
                if (filters.isPWD) special.push("PWD");
                if (special.length > 0) {
                    doc.text(`Special Category: ${special.join(", ")}`, 14, startY);
                    startY += 5;
                }
            }
            if (filters.branch.length > 0) {
                const branchText = `Preferred Branches: ${filters.branch.join(", ")}`;
                const splitBranchText = doc.splitTextToSize(branchText, 180);
                doc.text(splitBranchText, 14, startY);
                startY += splitBranchText.length * 5;
            }
            if (filters.region.length > 0) {
                const districtText = `Preferred Locations: ${filters.region.join(", ")}`;
                const splitDistrictText = doc.splitTextToSize(districtText, 180);
                doc.text(splitDistrictText, 14, startY);
                startY += splitDistrictText.length * 5;
            }
            startY += 5;

            const tableColumn = [
                "#",
                "College Code",
                "College Name",
                "Branch",
                "Seat Type",
                filterType === "rank" ? "Cutoff Rank" : "Cutoff %ile",
            ];
            const tableRows = [];

            filteredPreferences.forEach((item, index) => {
                const rowData = [
                    index + 1,
                    item.collegeCode,
                    item.collegeName,
                    item.branch_info,
                    item.matchedSeatCode,
                    filterType === "rank"
                        ? (item.bestCutoffRank !== Infinity ? item.bestCutoffRank.toString() : 'N/A')
                        : (item.bestCutoff ? item.bestCutoff.toString() : 'N/A')
                ];
                tableRows.push(rowData);
            });

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: startY,
                theme: "grid",
                headStyles: { fillColor: [246, 128, 20] },
                columnStyles: {
                    0: { cellWidth: 10 },
                    1: { cellWidth: 25 },
                    2: { cellWidth: 65 },
                    3: { cellWidth: 45 },
                    4: { cellWidth: 20 },
                    5: { cellWidth: 20 },
                },
                didDrawPage: (data) => {
                    startY = data.cursor.y;
                },
            });

            doc.save("CollegePeCharcha_Preference_List.pdf");
        } catch (error) {
            console.error("Download Error:", error);
            alert("Sorry, we couldn't download the PDF. Please try again or check the console.");
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFBF2] relative overflow-x-hidden">
            {/* Background Decoration - Premium Gold/Champagne Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            {/* Golden Glows */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply pointer-events-none"></div>
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse mix-blend-multiply pointer-events-none" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 sm:py-6">
                {/* Back Button Header */}
                <div className="mb-4 sm:mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-orange-200 text-gray-700 hover:text-[#f68014] hover:border-[#f68014] rounded-xl font-medium text-sm sm:text-base transition-all shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Back</span>
                    </button>
                </div>

                <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl shadow-xl border sticky top-24 transition-colors duration-300 bg-white border-orange-100">
                            <div className="p-4 sm:p-6 border-b flex justify-between items-center transition-colors duration-300 border-orange-100">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center space-x-2 transition-colors duration-300 text-gray-800">
                                    <Filter className="h-5 w-5 text-[#f68014]" />
                                    <span>Filter Criteria</span>
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <button onClick={resetFilters} title="Reset All Filters" className="transition-colors duration-200 text-gray-400 hover:text-[#f68014]">
                                        <RotateCcw className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">Select Exam Type</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["MHT-CET", "JEE"].map((type) => (
                                            <label key={type} className="relative">
                                                <input type="radio" name="examType" value={type} checked={examType === type} onChange={handleFilterChange} className="peer sr-only" />
                                                <div className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] bg-gray-100 border-orange-200 hover:border-orange-300">
                                                    <span className="text-xs sm:text-sm font-medium">{type === 'JEE' ? 'JEE-AI' : type}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">CAP Round</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {["01", "02", "03", "04"].map((round) => (
                                            <label key={round} className="relative">
                                                <input type="radio" name="capRound" value={round} checked={capRound === round} onChange={() => setCapRound(round)} className="peer sr-only" />
                                                <div className="px-1 sm:px-2 py-1.5 sm:py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] bg-gray-100 border-orange-200 hover:border-orange-300">
                                                    <span className="text-xs sm:text-sm font-medium">CAP{parseInt(round)}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">Filter By</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["percentile", "rank"].map((type) => (
                                            <label key={type} className="relative">
                                                <input type="radio" name="filterType" value={type} checked={filterType === type} onChange={handleFilterChange} className="peer sr-only" />
                                                <div className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] bg-gray-100 border-orange-200 hover:border-orange-300">
                                                    <span className="text-xs sm:text-sm font-medium capitalize">{type}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Filter Mode: Single or Range */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">Input Mode</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[{ v: 'single', l: 'Single Value' }, { v: 'range', l: 'Range' }].map((mode) => (
                                            <label key={mode.v} className="relative">
                                                <input type="radio" name="filterMode" value={mode.v} checked={filterMode === mode.v} onChange={handleFilterChange} className="peer sr-only" />
                                                <div className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] bg-gray-100 border-orange-200 hover:border-orange-300">
                                                    <span className="text-xs sm:text-sm font-medium">{mode.l}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Single Mode Inputs */}
                                {filterMode === 'single' && filterType === 'percentile' && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><Award className="h-4 w-4 text-[#f68014]" /><span>Your Percentile</span></label>
                                        <input type="number" name="percentile" value={filters.percentile} onChange={handleFilterChange} className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] transition-colors duration-300 ${percentileError ? "border-red-300" : "border-orange-200 bg-gray-50"}`} placeholder="e.g., 95.5" step="any" />
                                        {percentileError && <div className="text-xs text-red-600 mt-1">{percentileError}</div>}
                                    </div>
                                )}
                                {filterMode === 'single' && filterType === 'rank' && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><Award className="h-4 w-4 text-[#f68014]" /><span>Your Rank</span></label>
                                        <input type="number" name="rank" value={filters.rank} onChange={handleFilterChange} className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] transition-colors duration-300 ${rankError ? "border-red-300" : "border-orange-200 bg-gray-50"}`} placeholder="e.g., 5000" />
                                        {rankError && <div className="text-xs text-red-600 mt-1">{rankError}</div>}
                                    </div>
                                )}

                                {/* Range Mode Inputs */}
                                {filterMode === 'range' && filterType === 'percentile' && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><Award className="h-4 w-4 text-[#f68014]" /><span>Percentile Range</span></label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="number" name="minPercentile" value={filters.minPercentile} onChange={handleFilterChange} className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] transition-colors duration-300 ${percentileError ? "border-red-300" : "border-orange-200 bg-gray-50"}`} placeholder="Min (e.g., 85)" step="any" />
                                            <input type="number" name="maxPercentile" value={filters.maxPercentile} onChange={handleFilterChange} className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] transition-colors duration-300 ${percentileError ? "border-red-300" : "border-orange-200 bg-gray-50"}`} placeholder="Max (e.g., 95)" step="any" />
                                        </div>
                                        <p className="text-xs text-gray-500">Show colleges with cutoffs between min and max percentile</p>
                                        {percentileError && <div className="text-xs text-red-600 mt-1">{percentileError}</div>}
                                    </div>
                                )}
                                {filterMode === 'range' && filterType === 'rank' && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><Award className="h-4 w-4 text-[#f68014]" /><span>Rank Range</span></label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="number" name="minRank" value={filters.minRank} onChange={handleFilterChange} className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] transition-colors duration-300 ${rankError ? "border-red-300" : "border-orange-200 bg-gray-50"}`} placeholder="Min (e.g., 1000)" />
                                            <input type="number" name="maxRank" value={filters.maxRank} onChange={handleFilterChange} className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] transition-colors duration-300 ${rankError ? "border-red-300" : "border-orange-200 bg-gray-50"}`} placeholder="Max (e.g., 10000)" />
                                        </div>
                                        <p className="text-xs text-gray-500">Show colleges with cutoffs between min and max rank</p>
                                        {rankError && <div className="text-xs text-red-600 mt-1">{rankError}</div>}
                                    </div>
                                )}

                                {examType === "MHT-CET" && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">Gender</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {[{ v: 'general', l: 'General' }, { v: 'female', l: 'Ladies' }].map((g) => (
                                                    <label key={g.v} className="relative">
                                                        <input type="radio" name="gender" value={g.v} checked={filters.gender === g.v} onChange={handleFilterChange} className="peer sr-only" />
                                                        <div className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] bg-gray-100 border-orange-200 hover:border-orange-300">
                                                            <span className="text-xs sm:text-sm font-medium">{g.l}</span>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><Users className="h-4 w-4 text-[#f68014]" /><span>Caste Category</span></label>
                                            <select name="caste" value={filters.caste} onChange={handleFilterChange} className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] appearance-none transition-colors duration-300 border-orange-200 bg-gray-50">
                                                <option value="">-- Select Caste --</option>
                                                {casteCategories.map((cat) => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium transition-colors duration-300 text-gray-700">Special Categories</label>
                                            <div className="space-y-2">
                                                <label className="flex items-center space-x-3 cursor-pointer group">
                                                    <input type="checkbox" name="isDefence" checked={filters.isDefence} onChange={handleFilterChange} className="sr-only peer" />
                                                    <div className="w-5 h-5 border-2 border-orange-300 rounded peer-checked:bg-[#f68014] peer-checked:border-[#f68014] flex items-center justify-center"><CheckCircle className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100" /></div>
                                                    <span className="text-sm transition-colors duration-300 text-gray-700">Defence Category</span>
                                                </label>
                                                <label className="flex items-center space-x-3 cursor-pointer group">
                                                    <input type="checkbox" name="isPWD" checked={filters.isPWD} onChange={handleFilterChange} className="sr-only peer" />
                                                    <div className="w-5 h-5 border-2 border-orange-300 rounded peer-checked:bg-[#f68014] peer-checked:border-[#f68014] flex items-center justify-center"><CheckCircle className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100" /></div>
                                                    <span className="text-sm transition-colors duration-300 text-gray-700">Person with Disability (PWD)</span>
                                                </label>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><GraduationCap className="h-4 w-4 text-[#f68014]" /><span>Branches (Optional)</span></label>
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <select name="branch" value={selectedBranch} onChange={handleFilterChange} className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] appearance-none transition-colors duration-300 border-orange-200 bg-gray-50">
                                                <option value="">Select Branch to add</option>
                                                {availableBranches.filter(b => !filters.branch.includes(b)).map(b => (<option key={b} value={b}>{b}</option>))}
                                            </select>
                                            <button onClick={addBranch} disabled={!selectedBranch} className="px-4 py-2 bg-[#f68014] text-white rounded-xl hover:bg-orange-600 disabled:opacity-50">Add</button>
                                        </div>
                                        {filters.branch.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 pt-2">
                                                {filters.branch.map((b) => (
                                                    <div key={b} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors duration-300 bg-orange-100 text-[#f68014]">
                                                        <span>{b}</span>
                                                        <button onClick={() => removeBranch(b)} className="hover:text-orange-700"><X className="h-3 w-3" /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center space-x-2 transition-colors duration-300 text-gray-700"><MapPin className="h-4 w-4 text-[#f68014]" /><span>Region (Optional)</span></label>
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <select name="region" value={selectedRegion} onChange={handleFilterChange} className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#f68014] appearance-none transition-colors duration-300 border-orange-200 bg-gray-50">
                                                <option value="">Select Region to add</option>
                                                {availableRegions.filter(r => !filters.region.includes(r)).map(r => (<option key={r} value={r}>{r}</option>))}
                                            </select>
                                            <button onClick={addRegion} disabled={!selectedRegion} className="px-4 py-2 bg-[#f68014] text-white rounded-xl hover:bg-orange-600 disabled:opacity-50">Add</button>
                                        </div>
                                        {filters.region.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 pt-2">
                                                {filters.region.map((r) => (
                                                    <div key={r} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors duration-300 bg-orange-100 text-[#f68014]">
                                                        <span>{r}</span>
                                                        <button onClick={() => removeRegion(r)} className="hover:text-orange-700"><X className="h-3 w-3" /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button onClick={applyFilters} className="w-full bg-[#f68014] text-white py-3 px-4 rounded-xl hover:bg-orange-600 transition flex items-center justify-center space-x-2 shadow-lg">
                                    <Search className="h-5 w-5" />
                                    <span className="font-medium">Find Colleges</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="space-y-4 sm:space-y-6">
                            {filteredColleges.length > 0 && (
                                <div className="flex justify-between items-center rounded-2xl shadow-lg border p-4 transition-colors duration-300 bg-white border-orange-100">
                                    <p className="text-sm font-medium transition-colors duration-300 text-gray-700">Showing top <b className="text-[#f68014]">{filteredColleges.length}</b> colleges based on your criteria.</p>
                                    <button onClick={downloadPDFList} className="bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
                                        <Download className="h-4 w-4" />
                                        <span className="font-medium">Download List (PDF)</span>
                                    </button>
                                </div>
                            )}

                            {isSearching ? (
                                <div className="rounded-2xl shadow-lg border p-6 sm:p-8 text-center transition-colors duration-300 bg-white border-orange-100">
                                    <div className="flex justify-center items-center space-x-3">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f68014]"></div>
                                        <h3 className="text-base sm:text-lg font-semibold transition-colors duration-300 text-gray-800">Finding best colleges for you...</h3>
                                    </div>
                                </div>
                            ) : filteredColleges.length > 0 ? (
                                <>
                                    {filteredColleges.map((college, idx) => (
                                        <div key={idx} className="rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden bg-white border-orange-100">
                                            <div className="p-4 sm:p-6">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4">
                                                    <div className="flex-1">
                                                        <h2 className="text-lg sm:text-xl font-bold my-2 leading-tight transition-colors duration-300 text-gray-800">{college.collegeName}</h2>
                                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm mb-3">
                                                            <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full font-medium text-xs sm:text-sm">{college.status}</span>
                                                            <span className="flex items-center space-x-1 text-xs sm:text-sm transition-colors duration-300 text-gray-600"><Award className="h-3 w-3 sm:h-4 sm:w-4" /><span>{college.level}</span></span>
                                                        </div>
                                                        {college.district && (<p className="text-xs sm:text-sm flex items-center space-x-1 mb-2 transition-colors duration-300 text-gray-600"><MapPin className="h-3 w-3 sm:h-4 sm:w-4" /><span>District: {college.district}</span></p>)}
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="bg-[#f68014] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl inline-block">
                                                            <div className="text-xs font-medium opacity-90">{filterType === 'rank' ? 'Best Closing Rank' : 'Best Closing %ile'}</div>
                                                            <div className="text-base sm:text-lg text-left font-bold">{filterType === 'rank' ? (college.closingRank !== Infinity ? college.closingRank : 'N/A') : (college.closingPercentile ? college.closingPercentile.toFixed(2) : 'N/A')}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-t pt-4 transition-colors duration-300 border-orange-100">
                                                    <h3 className="font-semibold mb-3 flex items-center space-x-2 text-sm sm:text-base transition-colors duration-300 text-gray-800"><GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-[#f68014]" /><span>Eligible Branches For You</span></h3>
                                                    <div className="space-y-2">
                                                        {college.branches.map((branch, i) => (
                                                            <div key={i} className="rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-orange-50 transition-colors duration-200 bg-gray-50 text-gray-700">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="flex items-center space-x-2"><div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#f68014] rounded-full"></div><span className="font-medium">{branch.branch_info}</span></span>
                                                                    <span className="font-mono text-right transition-colors duration-300 text-gray-500">{filterType === 'rank' ? `Rank: ${branch.bestCutoffRank}` : `Cutoff: ${branch.bestCutoff}%`}</span>
                                                                </div>
                                                                <div className="pl-4 mt-1"><span className="text-orange-700 font-semibold" style={{ fontSize: '11px' }}>Seat: {branch.matchedSeatCode}</span></div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : noResultsFound ? (
                                <div className="rounded-2xl shadow-lg border p-6 sm:p-8 text-center transition-colors duration-300 bg-white border-orange-100">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><X className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" /></div>
                                    <h3 className="text-base sm:text-lg font-semibold mb-2 transition-colors duration-300 text-gray-800">No Colleges Found</h3>
                                    <p className="text-sm sm:text-base mb-4 transition-colors duration-300 text-gray-600">Unfortunately, no colleges match your specific criteria. Please try adjusting the filters.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="rounded-2xl shadow-lg border p-6 sm:p-8 text-center transition-colors duration-300 bg-white border-orange-100">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 bg-gray-100"><Search className="h-6 w-6 sm:h-8 sm:w-8 transition-colors duration-300 text-gray-400" /></div>
                                        <h3 className="text-base sm:text-lg font-semibold mb-2 transition-colors duration-300 text-gray-800">Find Your College</h3>
                                        <p className="text-sm sm:text-base mb-4 transition-colors duration-300 text-gray-600">Fill in the filters and click "Find Colleges" to see your personalized results.</p>
                                    </div>

                                    {/* How It Works Section */}
                                    <div className="rounded-2xl shadow-lg border p-6 sm:p-8 transition-colors duration-300 bg-white border-orange-100">
                                        <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#f68014] flex items-center gap-2">
                                            <span className="text-2xl"></span> How College Predictor Works
                                        </h3>
                                        <div className="space-y-4 text-sm sm:text-base text-gray-700">
                                            <div className="flex items-start gap-3">
                                                <span className="text-[#f68014] font-bold">📊</span>
                                                <p><strong>Data Source:</strong> This predictor uses official <span className="text-[#f68014] font-semibold">MHT-CET CAP Round 1-4 data from 2025</span> counselling to match colleges based on your percentile/rank.</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-[#f68014] font-bold">🎯</span>
                                                <p><strong>How It Works:</strong> We compare your entered percentile with last year's closing cutoffs to show you colleges where you have a high chance of admission.</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-[#f68014] font-bold">📋</span>
                                                <p><strong>Category Matching:</strong> Results are filtered based on your selected caste category and gender to show relevant seat types.</p>
                                            </div>
                                        </div>

                                        {/* Disclaimer */}
                                        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                                            <p className="text-xs sm:text-sm text-gray-700">
                                                <span className="font-bold text-[#f68014]">⚠️ Disclaimer:</span> This tool is for <strong>reference purposes only</strong> to help MHT-CET aspirants understand their admission chances. Actual cutoffs for 2026 may vary based on various factors like number of applicants, seat availability, and policy changes.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CollegePredictorPage;