import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Fundamentals from './pages/Fundamentals';
import Models from './pages/Models';
import Verification from './pages/Verification';
import Applications from './pages/Applications';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fundamentals" element={<Fundamentals />} />
          <Route path="/models" element={<Models />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;