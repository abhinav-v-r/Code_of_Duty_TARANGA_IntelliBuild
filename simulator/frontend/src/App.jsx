import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import ScamSelectionPage from './pages/ScamSelectionPage.jsx';
import SimulatorPage from './pages/SimulatorPage.jsx';
import ResultPage from './pages/ResultPage.jsx';
import Layout from './components/Layout.jsx';
import LabListPage from './pages/LabListPage.jsx';
import LabRunnerPage from './pages/LabRunnerPage.jsx';
import LabDebriefPage from './pages/LabDebriefPage.jsx';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scams" element={<ScamSelectionPage />} />
        <Route path="/simulate/:id" element={<SimulatorPage />} />
        <Route path="/results/:id" element={<ResultPage />} />
        {/* Hands-on labs */}
        <Route path="/labs" element={<LabListPage />} />
        <Route path="/labs/:labId" element={<LabRunnerPage />} />
        <Route path="/labs/:labId/debrief/:sessionId" element={<LabDebriefPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
