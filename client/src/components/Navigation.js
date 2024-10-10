import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="mt-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/fundamentals" className="hover:underline">Fundamentals</Link></li>
        <li><Link to="/models" className="hover:underline">NWP Models</Link></li>
        <li><Link to="/verification" className="hover:underline">Forecast Verification</Link></li>
        <li><Link to="/applications" className="hover:underline">Applications</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;