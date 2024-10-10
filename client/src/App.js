import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Fundamentals from './pages/Fundamentals';
import Models from './pages/Models';
import Verification from './pages/Verification';
import Applications from './pages/Applications';
import CommonMethods from './pages/models/CommonMethods';
import ModelDivergences from './pages/models/ModelDivergences';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fundamentals" element={<Fundamentals />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/background/common-methods" element={<CommonMethods />} />
          <Route path="/models/background/divergences" element={<ModelDivergences />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/applications" element={<Applications />} />
          {/* Add more routes for other model pages as they are created */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;