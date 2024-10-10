import 'katex/dist/katex.min.css';
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
import PrimitiveEquationsOverview from './pages/models/equations/PrimitiveEquationsOverview';
import MomentumEquations from './pages/models/equations/MomentumEquations';
import ThermodynamicEquation from './pages/models/equations/ThermodynamicEquation';
import ContinuityEquation from './pages/models/equations/ContinuityEquation';
import HydrostaticEquation from './pages/models/equations/HydrostaticEquation';
import NWPSimulation from './pages/models/equations/NWPSimulation';
// Import other equation pages when they're created

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
          <Route path="/models/equations/overview" element={<PrimitiveEquationsOverview />} />
          <Route path="/models/equations/momentum" element={<MomentumEquations />} />
          <Route path="/models/equations/thermodynamic" element={<ThermodynamicEquation />} />
          <Route path="/models/equations/continuity" element={<ContinuityEquation />} />
          <Route path="/models/equations/hydrostatic" element={<HydrostaticEquation />} />
          <Route path="/models/nwp-simulation" element={<NWPSimulation />} />
          {/* Add routes for other equation pages when they're created */}
          <Route path="/verification" element={<Verification />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;