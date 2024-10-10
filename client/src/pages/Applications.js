import React from 'react';

const Applications = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Applications of NWP</h2>
      <p className="mb-4">
        Numerical Weather Prediction has a wide range of applications beyond daily weather forecasts. 
        Its outputs are crucial for various sectors and activities.
      </p>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Aviation</h3>
        <p className="mb-4">
          NWP plays a critical role in aviation weather services:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Flight planning and routing</li>
          <li>Turbulence forecasting</li>
          <li>Icing predictions</li>
          <li>Visibility forecasts for airports</li>
        </ul>
        {/* Add a visualization component for aviation applications here */}
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Renewable Energy</h3>
        <p className="mb-4">
          The renewable energy sector heavily relies on NWP for:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Wind power forecasting</li>
          <li>Solar power prediction</li>
          <li>Energy demand forecasting</li>
        </ul>
        {/* Add a visualization component for renewable energy applications here */}
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Agriculture</h3>
        <p className="mb-4">
          NWP aids agricultural planning and management through:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Crop yield modeling</li>
          <li>Frost and drought predictions</li>
          <li>Pest and disease forecasting</li>
          <li>Irrigation scheduling</li>
        </ul>
        {/* Add a visualization component for agricultural applications here */}
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Disaster Management</h3>
        <p className="mb-4">
          NWP is crucial for predicting and managing natural disasters:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Hurricane and tropical cyclone tracking</li>
          <li>Flood forecasting</li>
          <li>Severe thunderstorm prediction</li>
          <li>Wildfire behavior modeling</li>
        </ul>
        {/* Add a visualization component for disaster management applications here */}
      </section>
    </div>
  );
};

export default Applications;