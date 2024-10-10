import React from 'react';

const Models = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">NWP Models</h2>
      <p className="mb-4">
        Numerical Weather Prediction (NWP) models are complex computer programs that simulate 
        atmospheric processes to forecast future weather conditions. This page explores various 
        types of NWP models and their characteristics.
      </p>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Global Models</h3>
        <p className="mb-4">
          Global models cover the entire Earth and are used for medium-range and long-range forecasting.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Global Forecast System (GFS) - NOAA, USA</li>
          <li>Integrated Forecast System (IFS) - ECMWF, Europe</li>
          <li>Unified Model - Met Office, UK</li>
        </ul>
        {/* Add a visualization component for global models here */}
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Regional Models</h3>
        <p className="mb-4">
          Regional models cover smaller areas with higher resolution, providing more detailed short-range forecasts.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Weather Research and Forecasting (WRF) Model</li>
          <li>North American Mesoscale Forecast System (NAM)</li>
          <li>High-Resolution Rapid Refresh (HRRR)</li>
        </ul>
        {/* Add a visualization component for regional models here */}
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Model Parameterizations</h3>
        <p className="mb-4">
          Parameterizations are used to represent sub-grid scale processes that cannot be directly resolved by the model.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Convection parameterization</li>
          <li>Boundary layer parameterization</li>
          <li>Radiation schemes</li>
          <li>Microphysics schemes</li>
        </ul>
        {/* Add a visualization component for parameterizations here */}
      </section>
    </div>
  );
};

export default Models;