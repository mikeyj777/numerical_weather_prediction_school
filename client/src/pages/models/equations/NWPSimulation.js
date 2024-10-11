// pages/models/equations/NWPSimulation.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'leaflet/dist/leaflet.css';
import { initialConditions } from '../utils/initialConditions';
import { equationSolver } from '../utils/equationSolver';
import { generatePressureOverlay, generateTemperatureOverlay } from '../utils/parameterRendering';
import { Card, CardHeader, CardContent, CardActions, Button } from '../../../components/ui/Card';
import { Slider } from '../../../components/ui/Slider';

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

  // Ref to store the current value of isRunning
  const isRunningRef = useRef(isRunning);

  const wasRunning = useRef(false);

  // Update ref when isRunning changes
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  // Function to initialize the simulation with default initial conditions
  const initializeSimulation = useCallback(() => {
    // console.log("Initializing simulation");
    const { pressure, temperature, windU, windV } = initialConditions;
    setPressure(pressure);
    setTemperature(temperature);
    setWindU(windU);
    setWindV(windV);
    setPressureData([]);
    setTemperatureData([]);

    // console.log("Pressure: ", pressure);
    // console.log("Temperature: ", temperature);
    // console.log("WindU: ", windU);
    // console.log("WindV: ", windV);
    
  }, []);

  // Initialize simulation only once when component mounts
  useEffect(() => {
    initializeSimulation();
  }, [initializeSimulation]);

  // Simulation loop function
  const simulationLoop = useCallback(() => {
    if (!isRunningRef.current) {
      return;
    }
    // console.log("Running simulation step");
    const [newPressure, newTemperature, newWindU, newWindV] = equationSolver(
      pressure,
      temperature,
      windU,
      windV,
      gridParams,
      timeStep
    );

    setPressure(newPressure);
    setTemperature(newTemperature);
    setWindU(newWindU);
    setWindV(newWindV);
    // console.log("new Pressure: ", newPressure[50][50]);
    // console.log("new Temperature: ", newTemperature[50][50]);
    setPressureData((prevData) => [...prevData, { time: prevData.length, pressure: newPressure[24][24] }]);
    setTemperatureData((prevData) => [...prevData, { time: prevData.length, temperature: newTemperature[50][50] }]);
  }, [pressure, temperature, windU, windV, gridParams, timeStep]);

  // Use effect hook to control the simulation loop
  useEffect(() => {
    let animationFrameId;

    const runSimulationLoop = () => {
      simulationLoop();
      animationFrameId = requestAnimationFrame(runSimulationLoop);
    };

    if (isRunningRef.current) {
      // console.log("Starting simulation loop");
      runSimulationLoop();
    }

    return () => {
      if (wasRunning.current && !isRunningRef.current) {
        console.log("Cleaning up simulation loop");
        cancelAnimationFrame(animationFrameId);
      }
      wasRunning.current = isRunningRef.current;
    };
  }, [isRunning, simulationLoop]);

  // Event handler for starting the simulation
  const handleStartSimulation = () => {
    console.log("Starting simulation");
    setIsRunning(true);
  };

  // Event handler for stopping the simulation
  const handleStopSimulation = () => {
    console.log("Stopping simulation");
    setIsRunning(false);
  };

  // Event handler for resetting the simulation
  const handleResetSimulation = () => {
    console.log("Resetting simulation");
    setIsRunning(false);
    initializeSimulation();
  };

  // Event handler for changing the time step
  const handleTimeStepChange = (event) => {
    setTimeStep(Number(event.target.value));
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