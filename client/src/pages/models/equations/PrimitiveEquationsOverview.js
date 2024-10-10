
import React from 'react';
import { Link } from 'react-router-dom';

const PrimitiveEquationsOverview = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Primitive Equations in NWP</h1>
      <p className="mb-4">
        The primitive equations are a set of nonlinear differential equations that form the 
        foundation of most Numerical Weather Prediction (NWP) models. These equations describe 
        the motion and thermodynamics of the atmosphere, allowing us to predict future 
        weather conditions based on current observations.
      </p>
      <p className="mb-4">
        The primitive equations consist of:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li><Link to="/models/equations/momentum" className="text-blue-600 hover:underline">Momentum Equations</Link></li>
        <li><Link to="/models/equations/thermodynamic" className="text-blue-600 hover:underline">Thermodynamic Equation</Link></li>
        <li><Link to="/models/equations/continuity" className="text-blue-600 hover:underline">Continuity Equation</Link></li>
        <li><Link to="/models/equations/hydrostatic" className="text-blue-600 hover:underline">Hydrostatic Equation</Link></li>
        <li><Link to="/models/nwp-simulation" className="text-blue-600 hover:underline">Primitive Equation Simulation</Link></li>
      </ul>
      <p className="mb-4">
        These equations are derived from fundamental physical principles and are simplified 
        for use in NWP models. The simplifications often include assumptions such as the 
        hydrostatic approximation, which assumes that the vertical pressure gradient force 
        is balanced by gravity.
      </p>
      <p className="mb-4">
        Understanding these equations is crucial for comprehending how NWP models work and 
        for interpreting their results. Each equation plays a specific role in describing 
        atmospheric behavior:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>The momentum equations describe the motion of air parcels.</li>
        <li>The thermodynamic equation relates to the conservation of energy.</li>
        <li>The continuity equation ensures conservation of mass.</li>
        <li>The hydrostatic equation simplifies the vertical motion in many models.</li>
      </ul>
      <p className="mb-4">
        Click on each equation above to learn more about its derivation, interpretation, 
        and role in NWP models.
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Further Reading</h2>
        <ul className="list-disc pl-6">
          <li><a href="https://www.ecmwf.int/en/elibrary/16951-part-iii-dynamics-and-numerical-procedures" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ECMWF - Dynamics and Numerical Procedures</a></li>
          <li><a href="https://www.weather.gov/media/jetstream/models/nwp_models.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">NOAA - Numerical Weather Prediction</a></li>
        </ul>
      </div>
    </div>
  );
};

export default PrimitiveEquationsOverview;