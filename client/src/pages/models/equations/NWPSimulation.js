// pages/models/equations/NWPSimulation.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'leaflet/dist/leaflet.css';
import { initialConditions } from '../utils/initialConditions';
import { equationSolver } from '../utils/equationSolver';
import { generatePressureOverlay, generateTemperatureOverlay } from '../utils/parameterRendering';
import { Card, CardHeader, CardContent, CardActions, Button } from '../../../components/ui/Card';
import { Slider } from '../../../components/ui/Slider';
import '../../../App.css';

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
    console.log("1. Initialization");
    console.log("1.A. Loading initial conditions");
    const { pressure, temperature, windU, windV, gridParams } = initialConditions;
    console.log("1.A.i. Pressure:", pressure);
    console.log("1.A.ii. Temperature:", temperature);
    console.log("1.A.iii. Wind U:", windU);
    console.log("1.A.iv. Wind V:", windV);
    console.log("1.A.v. Grid Parameters:", gridParams);

    console.log("1.B. Setting initial state");
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
    console.log("2. Component Mount");
    console.log("2.A. Initializing simulation");
    initializeSimulation();
    console.log("2.B. Starting simulation loop");
    simulationLoop();
  }, []);

  // Simulation loop function
  const simulationLoop = () => {
    // console.log("3. Simulation Loop");
    // console.log("is running:", isRunning);
    if (isRunning) {
      console.log("3.A. Solving equations");
      const [newPressure, newTemperature, newWindU, newWindV] = equationSolver(
        pressure,
        temperature,
        windU,
        windV,
        gridParams,
        timeStep
      );
      console.log("3.A.i. New Pressure:", newPressure);
      console.log("3.A.ii. New Temperature:", newTemperature);
      console.log("3.A.iii. New Wind U:", newWindU);
      console.log("3.A.iv. New Wind V:", newWindV);

      console.log("3.B. Updating state variables");
      setPressure(newPressure);
      setTemperature(newTemperature);
      setWindU(newWindU);
      setWindV(newWindV);

      console.log("3.C. Storing historical data");
      setPressureData((prevData) => [...prevData, { time: prevData.length, pressure: newPressure[50][50] }]);
      setTemperatureData((prevData) => [...prevData, { time: prevData.length, temperature: newTemperature[50][50] }]);
      console.log("3.C.i. Pressure Data:", pressureData);
      console.log("3.C.ii. Temperature Data:", temperatureData);
    }

    // console.log("3.D. Requesting next animation frame");
    requestAnimationFrame(simulationLoop);
  };

  // Event handlers
  const handleStartSimulation = () => {
    console.log("4. Start Simulation");
    setIsRunning(true);
    console.log("4.run-check Start Simulation, is running:", isRunning);
  };

  const handleStopSimulation = () => {
    console.log("5. Stop Simulation");
    setIsRunning(false);
    console.log("5.run-check Stop Simulation, is running:", isRunning);
  };

  const handleResetSimulation = () => {
    console.log("6. Reset Simulation");
    initializeSimulation();
  };

  const handleTimeStepChange = (event) => {
    console.log("7. Time Step Change");
    const newTimeStep = Number(event.target.value);
    console.log("7.A. New Time Step:", newTimeStep);
    setTimeStep(newTimeStep);
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
            <Slider
              label="Time Step (seconds)"
              value={timeStep}
              min={1}
              max={3600}
              step={1}
              onChange={handleTimeStepChange}
            />
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