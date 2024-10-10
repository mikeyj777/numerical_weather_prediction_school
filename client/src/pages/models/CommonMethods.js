import React from 'react';
import { Link } from 'react-router-dom';

const CommonMethods = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Common Methods in NWP Models</h2>
      <p className="mb-4">
        While Numerical Weather Prediction (NWP) models can vary in their specific implementations, 
        there are several core methods and approaches that are common across most major models. 
        Understanding these shared elements provides a foundation for comprehending how NWP models work.
      </p>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">1. Primitive Equations</h3>
        <p className="mb-4">
          Most NWP models are based on the primitive equations, which are a set of nonlinear differential 
          equations used to approximate global atmospheric flows. These typically include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Momentum equations (horizontal)</li>
          <li>Thermodynamic equation</li>
          <li>Continuity equation</li>
          <li>Hydrostatic equation</li>
        </ul>
        <Link to="/models/background/equations" className="text-blue-600 hover:underline">Learn more about fundamental equations</Link>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">2. Grid-based Discretization</h3>
        <p className="mb-4">
          NWP models divide the atmosphere into a three-dimensional grid. Common approaches include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Latitude-longitude grids</li>
          <li>Spectral methods</li>
          <li>Icosahedral grids</li>
        </ul>
        <Link to="/models/background/discretization" className="text-blue-600 hover:underline">Explore discretization methods</Link>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">3. Parameterization Schemes</h3>
        <p className="mb-4">
          Processes that occur at scales smaller than the model's grid resolution are represented 
          through parameterization schemes. Common parameterizations include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Convection</li>
          <li>Radiation</li>
          <li>Boundary layer processes</li>
          <li>Cloud microphysics</li>
        </ul>
        <Link to="/models/parameterizations-overview" className="text-blue-600 hover:underline">Learn more about parameterizations</Link>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">4. Data Assimilation</h3>
        <p className="mb-4">
          Most modern NWP models use sophisticated data assimilation techniques to incorporate 
          observational data into the model initial conditions. Common methods include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>3D-Var (Three-dimensional variational analysis)</li>
          <li>4D-Var (Four-dimensional variational analysis)</li>
          <li>Ensemble Kalman Filter (EnKF)</li>
        </ul>
        <Link to="/models/structure/data-assimilation" className="text-blue-600 hover:underline">Explore data assimilation techniques</Link>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">5. Time Integration Schemes</h3>
        <p className="mb-4">
          NWP models use numerical methods to integrate the equations forward in time. Common schemes include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Explicit schemes (e.g., Runge-Kutta methods)</li>
          <li>Semi-implicit schemes</li>
          <li>Semi-Lagrangian methods</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">6. Boundary Conditions</h3>
        <p className="mb-4">
          All NWP models need to specify boundary conditions. These typically include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Surface conditions (topography, land use, sea surface temperature)</li>
          <li>Top of the atmosphere conditions</li>
          <li>Lateral boundary conditions (for regional models)</li>
        </ul>
      </section>

      <p className="mt-8">
        While these methods are common across most NWP models, the specific implementations can vary. 
        To understand how different models may diverge in their approaches, see our page on 
        <Link to="/models/background/divergences" className="text-blue-600 hover:underline"> Divergences in Model Approaches</Link>.
      </p>
    </div>
  );
};

export default CommonMethods;