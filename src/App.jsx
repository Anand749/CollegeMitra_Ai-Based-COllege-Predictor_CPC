import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import CutoffPredictor from './components/CutoffPredictor/CutoffPredictorMain.jsx';
import Navbar from './components/Navbar.jsx';
import './index.css';

import CollegePredictorPage from './components/College Predictor/CollegePredictorPage.jsx';
import CollegeComparison from './components/CollegeComparison/Collegecomparison.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactPage from './components/ContactPage.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-orange-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cutoff-predictor" element={<CutoffPredictor />} />
          <Route path="/college-predictor" element={<CollegePredictorPage />} />
          <Route path="/college-comparison" element={<CollegeComparison />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
