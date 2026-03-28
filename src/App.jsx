import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import CutoffPredictor from './components/CutoffPredictor/CutoffPredictorMain.jsx';
import Navbar from './components/Navbar.jsx';
import './index.css';
import useAnalytics from './hooks/useAnalytics.js';
import { Analytics } from "@vercel/analytics/react";

import CollegePredictorPage from './components/College Predictor/CollegePredictorPage.jsx';
import CollegeComparison from './components/CollegeComparison/Collegecomparison.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import ResourceHub from './components/ResourceHub.jsx';

function AppContent() {
  // Track page views across all routes
  useAnalytics();

  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mhtcet-cutoff-analyzer" element={<CutoffPredictor />} />
        <Route path="/mhtcet-college-predictor" element={<CollegePredictorPage />} />
        <Route path="/mhtcet-college-comparison" element={<CollegeComparison />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resources" element={<ResourceHub />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Analytics />
    </Router>
  );
}

export default App;
