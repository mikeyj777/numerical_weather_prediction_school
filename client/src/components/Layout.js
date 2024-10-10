import React from 'react';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">Numerical Weather Prediction (NWP) Explorer</h1>
        <Navigation />
      </header>
      <main className="container mx-auto p-4 flex-grow">
        {children}
      </main>
      <footer className="bg-gray-200 p-4 mt-8">
        <p>&copy; 2024 NWP Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;