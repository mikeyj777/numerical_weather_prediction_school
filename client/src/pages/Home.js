import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to the NWP Explorer</h2>
      <p className="mb-4">
        This educational resource is designed for those interested in learning about Numerical Weather Prediction 
        and its importance in modern weather forecasting. NWP uses mathematical models of the atmosphere and 
        oceans to predict the weather based on current weather conditions.
      </p>
      <h3 className="text-xl font-semibold mb-2">Explore the following topics:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li><Link to="/fundamentals" className="text-blue-600 hover:underline">Fundamentals of NWP</Link></li>
        <li><Link to="/models" className="text-blue-600 hover:underline">NWP Models</Link></li>
        <li><Link to="/verification" className="text-blue-600 hover:underline">Forecast Verification</Link></li>
        <li><Link to="/applications" className="text-blue-600 hover:underline">Applications of NWP</Link></li>
      </ul>
      <p>
        Whether you're a student, researcher, or weather enthusiast, this wiki will provide you with 
        a comprehensive overview of the principles and practices of Numerical Weather Prediction.
      </p>
    </div>
  );
};

export default Home;