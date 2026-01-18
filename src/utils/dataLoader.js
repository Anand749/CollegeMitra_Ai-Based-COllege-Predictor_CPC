/**
 * Data Loader Utility for College Predictor
 * Handles loading and parsing of All India (JEE) and Maharashtra CAP cutoff data
 */

/**
 * Parse Maharashtra CAP category code
 * Examples: GOPENS, GSCS, LOBCS, LSEBCH
 * Format: [G/L][Category][Seat Type]
 * G = General (Male), L = Ladies (Female)
 * Seat Type: S = State, H = Home University, O = Other
 */
export const parseCategoryCode = (code) => {
    if (!code || code === 'null') return null;

    const genderPrefix = code.charAt(0);
    const gender = genderPrefix === 'L' ? 'LADIES' : 'GENERAL';

    // Extract category from the middle part
    const seatTypeSuffix = code.charAt(code.length - 1);
    const categoryPart = code.slice(1, -1);

    // Map category codes
    const categoryMap = {
        'OPEN': 'OPEN',
        'SC': 'SC',
        'ST': 'ST',
        'VJ': 'VJ',
        'NT1': 'NT1',
        'NT2': 'NT2',
        'NT3': 'NT3',
        'OBC': 'OBC',
        'SEBC': 'SEBC',
        'EWS': 'EWS',
        'TFWS': 'TFWS',
        'PWD': 'PWD',
        'DEF': 'DEF'
    };

    let category = 'OPEN';
    for (const [key, value] of Object.entries(categoryMap)) {
        if (categoryPart.includes(key)) {
            category = value;
            break;
        }
    }

    // Seat type
    const seatTypeMap = {
        'S': 'State',
        'H': 'Home University',
        'O': 'Other'
    };
    const seatType = seatTypeMap[seatTypeSuffix] || 'State';

    return { gender, category, seatType };
};

/**
 * Parse cutoff string from Maharashtra CAP data
 * Format: "rank\n(percentile)" or "rank (percentile)"
 */
export const parseCutoffString = (cutoffStr) => {
    if (!cutoffStr || cutoffStr === '') return null;

    // Handle both formats: "rank\n(percentile)" and "rank (percentile)"
    const match = cutoffStr.match(/(\d+)\s*[\n\s]*\(([0-9.]+)\)/);
    if (match) {
        return {
            rank: parseInt(match[1], 10),
            percentile: parseFloat(match[2])
        };
    }
    return null;
};

/**
 * Parse All India merit string
 * Format: "15312 (86.6844102)"
 */
export const parseAllIndiaMerit = (meritStr) => {
    if (!meritStr) return null;

    const match = meritStr.match(/(\d+)\s*\(([0-9.]+)\)/);
    if (match) {
        return {
            rank: parseInt(match[1], 10),
            percentile: parseFloat(match[2])
        };
    }
    return null;
};

/**
 * Parse institute code from All India data
 * Format: "01101 - Institute Name"
 */
export const parseInstituteCode = (instituteName) => {
    const match = instituteName.match(/^(\d+)\s*-/);
    return match ? match[1] : '';
};

/**
 * Derive region from institute code
 */
export const getRegionFromCode = (code) => {
    const codeStr = String(code).trim();
    if (codeStr.startsWith('01')) return 'Amravati';
    if (codeStr.startsWith('02')) return 'Ch. Sambhajinagar';
    if (codeStr.startsWith('03')) return 'Mumbai';
    if (codeStr.startsWith('04')) return 'Nagpur';
    if (codeStr.startsWith('05')) return 'Nashik';
    if (codeStr.startsWith('06') || codeStr === '16006') return 'Pune';
    return 'Other';
};

/**
 * Load Maharashtra CAP data and normalize to flat array
 */
export const loadMaharashtraCAPData = async (round = 1) => {
    const fileName = `/Data for College Predictor/cap${round}_2025_formatted.json`;

    try {
        const response = await fetch(fileName);
        const data = await response.json();

        const normalizedData = [];

        for (const [collegeName, collegeData] of Object.entries(data)) {
            const { institute_code, district, level, branches } = collegeData;

            if (!branches) continue;

            for (const branch of branches) {
                const branchName = branch.branch_info;
                const tableData = branch.table_data || [];

                // Collect all category cutoffs from all rounds in table_data
                for (const roundData of tableData) {
                    for (const [categoryCode, cutoffStr] of Object.entries(roundData)) {
                        if (categoryCode === 'null') continue;

                        const parsed = parseCategoryCode(categoryCode);
                        const cutoff = parseCutoffString(cutoffStr);

                        if (parsed && cutoff) {
                            normalizedData.push({
                                college_code: institute_code,
                                college_name: collegeName,
                                branch_name: branchName,
                                district: district,
                                region: getRegionFromCode(institute_code),
                                level: level,
                                category: parsed.category,
                                gender: parsed.gender,
                                seat_type: parsed.seatType,
                                category_code: categoryCode,
                                cutoff_rank: cutoff.rank,
                                cutoff_percentile: cutoff.percentile,
                                exam_type: 'MHT-CET',
                                round: round
                            });
                        }
                    }
                }
            }
        }

        return normalizedData;
    } catch (error) {
        console.error('Error loading Maharashtra CAP data:', error);
        return [];
    }
};

/**
 * Load All India (JEE) data and normalize to flat array
 */
export const loadAllIndiaData = async (round = 1) => {
    const fileName = `/Data for College Predictor/AI_CAP${round}_25-26.json`;

    try {
        const response = await fetch(fileName);
        const data = await response.json();

        const normalizedData = [];

        for (const institute of data) {
            const instituteCode = parseInstituteCode(institute['Institute Name']);
            const collegeName = institute['Institute Name'].replace(/^\d+\s*-\s*/, '');
            const district = institute['District'];
            const courses = institute['Courses'] || [];

            for (const course of courses) {
                const merit = parseAllIndiaMerit(course['All India Merit']);

                if (merit) {
                    normalizedData.push({
                        college_code: instituteCode,
                        college_name: collegeName,
                        branch_name: course['Course Name'],
                        choice_code: course['Choice Code'],
                        district: district,
                        region: getRegionFromCode(instituteCode),
                        category: 'ALL_INDIA',
                        gender: 'GENERAL',
                        cutoff_rank: merit.rank,
                        cutoff_percentile: merit.percentile,
                        exam_type: 'JEE',
                        merit_exam: course['Merit Exam'],
                        round: round
                    });
                }
            }
        }

        return normalizedData;
    } catch (error) {
        console.error('Error loading All India data:', error);
        return [];
    }
};

/**
 * Get unique values from data for filter options
 */
export const extractFilterOptions = (data) => {
    const branches = [...new Set(data.map(item => item.branch_name).filter(Boolean))].sort();
    const districts = [...new Set(data.map(item => item.district).filter(Boolean))].sort();
    const regions = [...new Set(data.map(item => item.region).filter(r => r && r !== 'Other'))].sort();
    const categories = [...new Set(data.map(item => item.category).filter(Boolean))].sort();

    return { branches, districts, regions, categories };
};
