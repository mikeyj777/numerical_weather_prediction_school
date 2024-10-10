import React from 'react';
import { Link } from 'react-router-dom';

const Models = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">NWP Models</h2>
      <p className="mb-4">
        Numerical Weather Prediction (NWP) models are complex computer programs that simulate 
        atmospheric processes to forecast future weather conditions. This page provides an overview 
        of various types of NWP models, their characteristics, and the fundamental principles behind them.
      </p>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Background and Fundamentals</h3>
        <p className="mb-4">
          Before diving into specific models, it's crucial to understand the common principles and methods 
          used across NWP models, as well as how they may differ in their approaches.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><Link to="/models/background/history" className="text-blue-600 hover:underline">History of NWP</Link></li>
          <li><Link to="/models/background/common-methods" className="text-blue-600 hover:underline">Common Methods in NWP Models</Link></li>
          <li><Link to="/models/background/divergences" className="text-blue-600 hover:underline">Divergences in Model Approaches</Link></li>
          <li><Link to="/models/background/equations" className="text-blue-600 hover:underline">Fundamental Equations in NWP</Link></li>
          <li><Link to="/models/background/discretization" className="text-blue-600 hover:underline">Discretization Methods</Link></li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Regional Models</h3>
        <p className="mb-4">
          Regional models cover smaller areas with higher resolution, providing more detailed short-range forecasts.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><Link to="/models/wrf" className="text-blue-600 hover:underline">Weather Research and Forecasting (WRF) Model</Link></li>
          <li><Link to="/models/nam" className="text-blue-600 hover:underline">North American Mesoscale Forecast System (NAM)</Link></li>
          <li><Link to="/models/hrrr" className="text-blue-600 hover:underline">High-Resolution Rapid Refresh (HRRR)</Link></li>
        </ul>
        <Link to="/models/regional-comparison" className="text-blue-600 hover:underline">Compare Regional Models</Link>
        {/* Add a visualization component for regional models here */}
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Model Parameterizations</h3>
        <p className="mb-4">
          Parameterizations are used to represent sub-grid scale processes that cannot be directly resolved by the model.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><Link to="/models/parameterizations/convection" className="text-blue-600 hover:underline">Convection parameterization</Link></li>
          <li><Link to="/models/parameterizations/boundary-layer" className="text-blue-600 hover:underline">Boundary layer parameterization</Link></li>
          <li><Link to="/models/parameterizations/radiation" className="text-blue-600 hover:underline">Radiation schemes</Link></li>
          <li><Link to="/models/parameterizations/microphysics" className="text-blue-600 hover:underline">Microphysics schemes</Link></li>
        </ul>
        <Link to="/models/parameterizations-overview" className="text-blue-600 hover:underline">Parameterizations Overview</Link>
        {/* Add a visualization component for parameterizations here */}
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Model Structure and Components</h3>
        <p className="mb-4">
          Understanding the structure and components of NWP models is crucial for their effective use and development.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><Link to="/models/structure/dynamical-core" className="text-blue-600 hover:underline">Dynamical Core</Link></li>
          <li><Link to="/models/structure/physics-packages" className="text-blue-600 hover:underline">Physics Packages</Link></li>
          <li><Link to="/models/structure/data-assimilation" className="text-blue-600 hover:underline">Data Assimilation Systems</Link></li>
          <li><Link to="/models/structure/post-processing" className="text-blue-600 hover:underline">Post-processing and Output</Link></li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Using NWP Models</h3>
        <p className="mb-4">
          Learn how to set up, run, and interpret NWP models for various applications.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><Link to="/models/usage/installation" className="text-blue-600 hover:underline">Model Installation and Setup</Link></li>
          <li><Link to="/models/usage/input-data" className="text-blue-600 hover:underline">Preparing Input Data</Link></li>
          <li><Link to="/models/usage/running" className="text-blue-600 hover:underline">Running NWP Models</Link></li>
          <li><Link to="/models/usage/output-analysis" className="text-blue-600 hover:underline">Analyzing Model Output</Link></li>
          <li><Link to="/models/usage/visualization" className="text-blue-600 hover:underline">Visualizing Results</Link></li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Model Development and Research</h3>
        <p className="mb-4">
          Explore current research areas and future directions in NWP model development.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><Link to="/models/research/ai-ml" className="text-blue-600 hover:underline">AI and Machine Learning in NWP</Link></li>
          <li><Link to="/models/research/ensemble-methods" className="text-blue-600 hover:underline">Ensemble Forecasting Techniques</Link></li>
          <li><Link to="/models/research/high-resolution" className="text-blue-600 hover:underline">High-Resolution Modeling</Link></li>
          <li><Link to="/models/research/coupled-models" className="text-blue-600 hover:underline">Coupled Earth System Models</Link></li>
        </ul>
      </section>
    </div>
  );
};

export default Models;