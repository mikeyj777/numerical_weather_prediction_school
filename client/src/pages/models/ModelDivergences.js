import React from 'react';
import { Link } from 'react-router-dom';

const ModelDivergences = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Divergences in NWP Model Approaches</h2>
      <p className="mb-4">
        While Numerical Weather Prediction (NWP) models share many common methods, they can also 
        differ significantly in their approaches to solving various aspects of weather prediction. 
        These divergences can result from different scientific philosophies, computational constraints, 
        or specific forecast goals.
      </p>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">1. Grid Structure and Resolution</h3>
        <p className="mb-4">
          Models can differ in their choice of grid structure and resolution:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Some use uniform global grids, while others use variable resolution</li>
          <li>Choices between spectral methods and grid-point methods</li>
          <li>Vertical coordinate systems (pressure-based, height-based, hybrid)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">2. Parameterization Schemes</h3>
        <p className="mb-4">
          Different models often use different parameterization schemes for sub-grid processes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Varied approaches to convection parameterization</li>
          <li>Different cloud microphysics schemes</li>
          <li>Diverse methods for representing boundary layer processes</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">3. Data Assimilation Techniques</h3>
        <p className="mb-4">
          Models can use different data assimilation methods:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>3D-Var vs. 4D-Var vs. Ensemble Kalman Filter</li>
          <li>Different approaches to bias correction</li>
          <li>Varied methods for assimilating satellite data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">4. Dynamical Core</h3>
        <p className="mb-4">
          The dynamical core, which solves the fluid dynamics equations, can vary between models:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Hydrostatic vs. non-hydrostatic formulations</li>
          <li>Different numerical schemes for time integration</li>
          <li>Varied approaches to handling sound waves and gravity waves</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">5. Coupling with Other Earth System Components</h3>
        <p className="mb-4">
          Models can differ in how they couple with other Earth system components:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Some models are fully coupled with ocean and sea ice models</li>
          <li>Varied approaches to land surface modeling</li>
          <li>Different levels of integration with atmospheric chemistry</li>
        </ul>
      </section>

      <p className="mt-8">
        Understanding these divergences is crucial for interpreting and comparing outputs from different 
        NWP models. For a deeper dive into specific models and their unique characteristics, explore our 
        pages on <Link to="/models/global-comparison" className="text-blue-600 hover:underline">Global Models</Link> and 
        <Link to="/models/regional-comparison" className="text-blue-600 hover:underline"> Regional Models</Link>.
      </p>
    </div>
  );
};

export default ModelDivergences;