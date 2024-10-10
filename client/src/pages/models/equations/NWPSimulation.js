// pages/models/equations/NWPSimulation.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import { Card, CardHeader, CardContent, CardActions, Button } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'leaflet/dist/leaflet.css';
import { initialConditions } from '../utils/initialConditions';
import { equationSolver } from '../utils/equationSolver';
import { generatePressureOverlay, generateTemperatureOverlay } from '../utils/parameterRendering';

const NWPSimulation = () => {
  // State variables
  const [pressure, setPressure] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [windU, setWindU] = useState(null);
  const [windV, setWindV] = useState(null);
  const [gridParams, setGridParams] = useState(null);
  const [timeStep, setTimeStep] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [pressureData, setPressureData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);

  // Function to initialize the simulation with default initial conditions
  const initializeSimulation = () => {
    const { pressure, temperature, windU, windV, gridParams } = initialConditions;
    setPressure(pressure);
    setTemperature(temperature);
    setWindU(windU);
    setWindV(windV);
    setGridParams(gridParams);
    setPressureData([]);
    setTemperatureData([]);
  };

  // Use effect hook to initialize the simulation and start the simulation loop
  useEffect(() => {
    initializeSimulation();
    simulationLoop();
  }, []);

  // Simulation loop function
  const simulationLoop = () => {
    if (isRunning) {
      const [newPressure, newTemperature, newWindU, newWindV] = equationSolver(
        pressure,
        temperature,
        windU,
        windV,
        gridParams,
        timeStep
      );

      // Update state variables with new values
      setPressure(newPressure);
      setTemperature(newTemperature);
      setWindU(newWindU);
      setWindV(newWindV);

      // Store historical data for pressure and temperature
      setPressureData((prevData) => [...prevData, { time: prevData.length, pressure: newPressure[50][50] }]);
      setTemperatureData((prevData) => [...prevData, { time: prevData.length, temperature: newTemperature[50][50] }]);
    }

    // Request the next animation frame for the simulation loop
    requestAnimationFrame(simulationLoop);
  };

  // Event handler for starting the simulation
  const handleStartSimulation = () => {
    setIsRunning(true);
  };

  // Event handler for stopping the simulation
  const handleStopSimulation = () => {
    setIsRunning(false);
  };

  // Event handler for resetting the simulation
  const handleResetSimulation = () => {
    initializeSimulation();
  };

  // Event handler for changing the time step
  const handleTimeStepChange = (value) => {
    setTimeStep(value);
  };

  return (
    <div>
      {/* Simulation Map */}
      <Card>
        <CardHeader>
          <h2>NWP Simulation</h2>
        </CardHeader>
        <CardContent>
          {/* Map container */}
          <MapContainer center={[0, 0]} zoom={3} style={{ height: '400px' }}>
            {/* Base map layer */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {pressure && temperature && (
              <>
                {/* Pressure overlay */}
                <ImageOverlay
                  url={generatePressureOverlay(pressure)}
                  bounds={[[-90, -180], [90, 180]]}
                  opacity={0.7}
                />
                {/* Temperature overlay */}
                <ImageOverlay
                  url={generateTemperatureOverlay(temperature)}
                  bounds={[[-90, -180], [90, 180]]}
                  opacity={0.7}
                />
              </>
            )}
          </MapContainer>
        </CardContent>
        <CardActions>
          {/* Simulation control buttons */}
          {isRunning ? (
            <Button onClick={handleStopSimulation}>Stop</Button>
          ) : (
            <Button onClick={handleStartSimulation}>Start</Button>
          )}
          <Button onClick={handleResetSimulation}>Reset</Button>
        </CardActions>
      </Card>

      {/* Simulation Settings */}
      <Card>
        <CardHeader>
          <h3>Settings</h3>
        </CardHeader>
        <CardContent>
          <div>
            {/* Time step slider */}
            <label>Time Step (seconds):</label>
            <Slider value={timeStep} min={1} max={3600} step={1} onChange={handleTimeStepChange} />
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <Card>
        <CardHeader>
          <h3>Charts</h3>
        </CardHeader>
        <CardContent>
          {/* Pressure chart */}
          <BarChart width={600} height={300} data={pressureData}>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Bar dataKey="pressure" fill="#8884d8" />
          </BarChart>

          {/* Temperature chart */}
          <BarChart width={600} height={300} data={temperatureData}>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Bar dataKey="temperature" fill="#82ca9d" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default NWPSimulation;