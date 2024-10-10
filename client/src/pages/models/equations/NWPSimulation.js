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
  const [timeStep, setTimeStep] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [pressureData, setPressureData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);

  // Ref to store the current value of isRunning
  const isRunningRef = useRef(isRunning);

  // Update ref when isRunning changes
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  // Function to initialize the simulation with default initial conditions
  const initializeSimulation = useCallback(() => {
    console.log("1. Initialization");
    console.log("1.A. Loading initial conditions");
    const { pressure, temperature, windU, windV } = initialConditions;

    console.log("1.A.i. Pressure:", pressure);
    console.log("1.A.ii. Temperature:", temperature);
    console.log("1.A.iii. Wind U:", windU);
    console.log("1.A.iv. Wind V:", windV);
  
    console.log("1.B. Setting initial state");
    setPressure(pressure);
    setTemperature(temperature);
    setWindU(windU);
    setWindV(windV);
    setPressureData([]);
    setTemperatureData([]);
  }, []);

  // Initialize simulation only once when component mounts
  useEffect(() => {
    initializeSimulation();
  }, [initializeSimulation]);

  // Simulation loop function
  const simulationLoop = useCallback(() => {
    if (isRunningRef.current) {
      console.log("3.A. Solving equations");
      const [newPressure, newTemperature, newWindU, newWindV] = equationSolver(
        pressure,
        temperature,
        windU,
        windV,
        timeStep
      );

      // console.log("3.B. Updating state variables");
      setPressure(newPressure);
      setTemperature(newTemperature);
      setWindU(newWindU);
      setWindV(newWindV);

      // console.log("3.B.i. new pressure:", newPressure, "new temperature:", newTemperature, "new windU:", newWindU, "new windV:", newWindV);

      // console.log("3.C. Storing historical data");
      setPressureData((prevData) => [...prevData, { time: prevData.length, pressure: newPressure[50][50] }]);
      setTemperatureData((prevData) => [...prevData, { time: prevData.length, temperature: newTemperature[50][50] }]);
    }

    requestAnimationFrame(simulationLoop);
  }, [pressure, temperature, windU, windV, timeStep]);

  // Use effect hook to initialize the simulation and start the simulation loop
  // Start or stop simulation loop based on isRunning
  useEffect(() => {
    let animationFrameId;
    if (isRunning) {
      console.log("Starting simulation loop");
      animationFrameId = requestAnimationFrame(simulationLoop);
    }
    return () => {
      if (animationFrameId) {
        console.log("Cleaning up simulation loop");
        cancelAnimationFrame(animationFrameId);
      }
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