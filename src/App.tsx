import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Pages
import HomePage from './pages/Home';
import InstancesPage from './pages/Instances';
import NewInstancePage from './pages/Instances/NewInstance';
import InstanceDetailPage from './pages/Instances/InstanceDetail';
import HelpPage from './pages/Help';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/instances" element={<InstancesPage />} />
          <Route path="/instances/new" element={<NewInstancePage />} />
          <Route path="/instances/:id" element={<InstanceDetailPage />} />
          <Route path="/help" element={<HelpPage />} />
          
          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
