import { useState, useEffect } from 'react';
import DisclaimerModal from './DisclaimerModal';

const InputForm = ({ predictionData, onPredict }) => {
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    college: null,
    branch: null,
    category: '',
    gender: 'GENERAL',
  });
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Load colleges from prediction data
  useEffect(() => {
    if (predictionData && predictionData.length > 0) {
      const collegeMap = new Map();
      predictionData.forEach((item) => {
        if (!collegeMap.has(item.college_code)) {
          collegeMap.set(item.college_code, {
            college_code: item.college_code,
            college_name: item.college_name,
          });
        }
      });
      const sortedColleges = Array.from(collegeMap.values()).sort((a, b) =>
        a.college_name.localeCompare(b.college_name)
      );
      setColleges(sortedColleges);
    }
  }, [predictionData]);

  // Load branches when college changes
  useEffect(() => {
    if (formData.college && predictionData && predictionData.length > 0) {
      const branchMap = new Map();
      predictionData
        .filter((item) => String(item.college_code) === String(formData.college.college_code))
        .forEach((item) => {
          if (!branchMap.has(item.branch_code)) {
            branchMap.set(item.branch_code, {
              branch_code: item.branch_code,
              branch_name: item.branch_name,
            });
          }
        });
      const sortedBranches = Array.from(branchMap.values()).sort((a, b) =>
        a.branch_name.localeCompare(b.branch_name)
      );
      setBranches(sortedBranches);
      setFormData((prev) => ({ ...prev, branch: null, category: '' }));
    } else {
      setBranches([]);
    }
  }, [formData.college, predictionData]);

  // Load categories when branch changes
  useEffect(() => {
    if (formData.college && formData.branch && predictionData && predictionData.length > 0) {
      const uniqueCategories = new Set();
      predictionData
        .filter(
          (item) =>
            String(item.college_code) === String(formData.college.college_code) &&
            String(item.branch_code) === String(formData.branch.branch_code)
        )
        .forEach((item) => {
          uniqueCategories.add(item.category);
        });
      const sortedCategories = Array.from(uniqueCategories).sort();
      setCategories(sortedCategories);
      setFormData((prev) => ({ ...prev, category: '' }));
    } else {
      setCategories([]);
    }
  }, [formData.college, formData.branch, predictionData]);

  // Filter colleges by search
  const filteredColleges = colleges.filter((college) =>
    college.college_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCollegeChange = (e) => {
    const collegeCode = e.target.value;
    const selectedCollege = colleges.find((c) => String(c.college_code) === collegeCode);
    setFormData({ ...formData, college: selectedCollege, branch: null, category: '' });
    setSearchTerm('');
  };

  const handleBranchChange = (e) => {
    const branchCode = e.target.value;
    const selectedBranch = branches.find((b) => String(b.branch_code) === branchCode);
    setFormData({ ...formData, branch: selectedBranch, category: '' });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.college && formData.branch && formData.category && formData.gender) {
      setShowDisclaimer(true);
    } else {
      alert('Please fill all fields');
    }
  };

  const handleProceed = () => {
    setShowDisclaimer(false);
    onPredict(formData);
  };

  const handleReset = () => {
    setFormData({ college: null, branch: null, category: '', gender: 'GENERAL' });
    setSearchTerm('');
    setBranches([]);
    setCategories([]);
  };

  const inputClasses = (isFocused, hasValue) => `
    w-full px-4 py-3.5 text-sm bg-gray-50 border rounded-xl appearance-none cursor-pointer transition-all duration-300 font-bold
    ${isFocused ? 'bg-white border-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.1)]' : 'border-gray-300 hover:border-gray-400'}
    ${hasValue ? 'text-gray-900' : 'text-gray-600'}
  `;

  return (
    <>
      <div className="flex flex-col h-auto lg:h-[calc(100vh-8rem)]">
        {/* Header - Glass Effect */}
        <div className="px-6 py-5 border-b border-orange-100 bg-white/95 sticky top-0 z-10 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 leading-tight">Filters</h2>
              <p className="text-xs text-gray-600 font-bold">Refine your search</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="group p-2 rounded-lg hover:bg-orange-50 transition-colors tooltip tooltip-left"
            data-tip="Reset Filters"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors transform group-hover:rotate-180 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none] relative z-50">

          {/* College Selection */}
          <div className="space-y-3 relative group">
            <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wider ml-1">Institute</label>
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setFocusedField('search')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 mb-2 text-sm rounded-xl border transition-all duration-300 font-bold placeholder-gray-500 ${focusedField === 'search' ? 'border-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.1)]' : 'border-gray-300'}`}
              />

              <div className="relative z-50">
                <select
                  value={formData.college?.college_code || ''}
                  onChange={handleCollegeChange}
                  onFocus={() => setFocusedField('college')}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputClasses(focusedField === 'college', !!formData.college)} z-50`}
                  required
                >
                  <option value="">Select Target College</option>
                  {filteredColleges.map((college) => (
                    <option key={college.college_code} value={college.college_code}>
                      {college.college_name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
            {formData.college && (
              <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_0_2px_white] animate-pulse"></div>
            )}
          </div>

          {/* Branch Selection */}
          <div className="space-y-2 relative">
            <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wider ml-1">Branch</label>
            <div className="relative z-50">
              <select
                value={formData.branch?.branch_code || ''}
                onChange={handleBranchChange}
                onFocus={() => setFocusedField('branch')}
                onBlur={() => setFocusedField(null)}
                className={`${inputClasses(focusedField === 'branch', !!formData.branch)} z-50`}
                disabled={!formData.college}
                required
              >
                <option value="">Select Specialization</option>
                {branches.map((branch) => (
                  <option key={branch.branch_code} value={branch.branch_code}>
                    {branch.branch_name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2 relative">
            <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wider ml-1">Category</label>
            <div className="relative z-50">
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                onFocus={() => setFocusedField('category')}
                onBlur={() => setFocusedField(null)}
                className={`${inputClasses(focusedField === 'category', !!formData.category)} z-50`}
                disabled={!formData.branch}
                required
              >
                <option value="">Select Caste Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wider ml-1">Gender</label>
            <div className="grid grid-cols-2 gap-3 p-1 bg-gray-50 rounded-2xl border border-gray-100">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'GENERAL' })}
                className={`py-3 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden ${formData.gender === 'GENERAL'
                  ? 'text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {formData.gender === 'GENERAL' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                )}
                <span className="relative z-10">General</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'LADIES' })}
                className={`py-3 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden ${formData.gender === 'LADIES'
                  ? 'text-white shadow-lg shadow-pink-500/30'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {formData.gender === 'LADIES' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500"></div>
                )}
                <span className="relative z-10">Ladies</span>
              </button>
            </div>
          </div>

          <div className="pt-4 pb-20">
            {/* Find Button */}
            <button
              type="submit"
              disabled={!formData.college || !formData.branch || !formData.category}
              className="group relative w-full overflow-hidden rounded-2xl bg-orange-500 p-0.5 transition-all shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center justify-center gap-2 bg-orange-500 group-hover:bg-opacity-0 py-4 rounded-[14px] transition-all">
                <span className="font-black text-white text-lg tracking-wide">PREDICT CUTOFF</span>
                <svg className="w-5 h-5 text-white animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>

            {/* Info Box */}
            {/* Info Box */}
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex gap-3 items-start shadow-sm hover:shadow-md transition-shadow">
              <div className="mt-0.5 text-[#f68014] bg-white rounded-full p-1 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed font-bold">
                Our AI predicts the <span className="text-[#f68014] font-black  decoration-orange-400 decoration-2 underline-offset-2">minimum percentile</span> required.
              </p>
            </div>
          </div>

        </form>

        {/* Footer */}

      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <DisclaimerModal
          onClose={() => setShowDisclaimer(false)}
          onProceed={handleProceed}
        />
      )}
    </>
  );
};

export default InputForm;
