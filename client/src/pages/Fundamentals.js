import React from 'react';
import AtmosphericDynamicsVisual from '../components/AtmosphericDynamicsVisual';

const Fundamentals = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Fundamentals of NWP</h2>
      <p className="mb-4">
        Explore the core principles and techniques that form the foundation of Numerical Weather Prediction. 
        Understanding these fundamentals is crucial for grasping how modern weather forecasts are generated.
      </p>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Atmospheric Dynamics</h3>
        <p className="mb-4">
          Atmospheric dynamics is the study of motion systems of meteorological importance. These motion 
          systems include diverse phenomena such as thunderstorms, tornadoes, gravity waves, tropical cyclones, 
          extratropical cyclones, jet streams, and global-scale circulations.
        </p>
        <h4 className="text-lg font-semibold mb-2">Key Concepts:</h4>
        <ul className="list-disc pl-6 mb-4">
          <li>Equations of motion (e.g., Navier-Stokes equations)</li>
          <li>Thermodynamics</li>
          <li>Hydrostatics</li>
        </ul>
        <AtmosphericDynamicsVisual />
      </section>

      {/* Add sections for Numerical Methods and Data Assimilation here */}
    </div>
  );
};

export default Fundamentals;