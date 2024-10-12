// pages/models/utils/initialConditions.js

export const initialConditions = {
  pressure: generatePressureField(),
  temperature: generateTemperatureField(),
  windU: generateWindUField(),
  windV: generateWindVField(),
};

function generatePressureField() {
  // Generate a 2D array representing the initial pressure field
  // You can use mathematical functions or data from a file
  // Example:
  const nx = 100;
  const ny = 100;
  const pressure = Array(nx).fill().map(() => Array(ny).fill(0));
  
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < ny; j++) {
      pressure[i][j] = 101325 + Math.sin(i / 10) * Math.cos(j / 20) * 1000 * Math.random();
    }
  }

  return pressure;
}

function generateTemperatureField() {
  // Generate a 2D array representing the initial temperature field
  // You can use mathematical functions or data from a file
  // Example:
  const nx = 100;
  const ny = 100;
  const temperature = Array(nx).fill().map(() => Array(ny).fill(0));
  
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < ny; j++) {
      temperature[i][j] = 288 - i / 100 * 10 * Math.random();
    }
  }
  
  return temperature;
}

function generateWindUField() {
  // Generate a 2D array representing the initial zonal wind field
  // You can use mathematical functions or data from a file
  // Example:
  const nx = 100;
  const ny = 100;
  const windU = Array(nx).fill().map(() => Array(ny).fill(0));
  
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < ny; j++) {
      windU[i][j] = Math.sin(j / 20) * 5 * Math.random();
    }
  }
  
  return windU;
}

function generateWindVField() {
  // Generate a 2D array representing the initial meridional wind field
  // You can use mathematical functions or data from a file
  // Example:
  const nx = 100;
  const ny = 100;
  const windV = Array(nx).fill().map(() => Array(ny).fill(0));
  
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < ny; j++) {
      windV[i][j] = Math.cos(i / 20) * 5 * Math.random();
    }
  }
  
  return windV;
}