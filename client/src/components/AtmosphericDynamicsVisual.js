import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AtmosphericDynamicsVisual = () => {
  const [timeStep, setTimeStep] = useState(0);
  
  const generateData = (step) => {
    return Array.from({ length: 10 }, (_, i) => ({
      height: i * 1000,
      temperature: 15 - (i * 6.5) + Math.sin(step / 10 + i) * 2,
      pressure: 1000 - (i * 100) + Math.cos(step / 10 + i) * 10,
    }));
  };

  const data = generateData(timeStep);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Atmospheric Profile Visualization</h3>
      <div className="mb-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setTimeStep(prev => prev + 1)}
        >
          Advance Time Step
        </button>
      </div>
      <LineChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="height" label={{ value: 'Height (m)', position: 'bottom' }} />
        <YAxis yAxisId="left" label={{ value: 'Temperature (°C)', angle: -90, position: 'left' }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: 'Pressure (hPa)', angle: 90, position: 'right' }} />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature" />
        <Line yAxisId="right" type="monotone" dataKey="pressure" stroke="#82ca9d" name="Pressure" />
      </LineChart>
      <p className="mt-4">
        This visualization shows a simplified atmospheric profile. The temperature generally decreases with height (lapse rate), 
        while pressure also decreases. The "Advance Time Step" button simulates small changes over time.
      </p>
    </div>
  );
};

export default AtmosphericDynamicsVisual;