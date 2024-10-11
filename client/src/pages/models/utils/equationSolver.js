
import { logMatrixStats  } from "./statsAndSampling";

const equationSolver = (pressure, temperature, windU, windV, timeStep) => {
  const nx = pressure.length;
  const ny = pressure[0].length;
  const dx = 10000;
  const dy = 10000;

  const R = 287.05; // Gas constant for dry air (J/kg/K)
  const Cp = 1004.0; // Specific heat capacity at constant pressure (J/kg/K)
  const g = 9.81; // Acceleration due to gravity (m/s^2)

  // Create arrays to store the updated state variables
  const newPressure = Array(nx).fill().map(() => Array(ny).fill(0));
  const newTemperature = Array(nx).fill().map(() => Array(ny).fill(0));
  const newWindU = Array(nx).fill().map(() => Array(ny).fill(0));
  const newWindV = Array(nx).fill().map(() => Array(ny).fill(0));

  // Solve the equations using central differencing
  for (let i = 1; i < nx - 1; i++) {
    for (let j = 1; j < ny - 1; j++) {
      // Pressure equation
      const dPdx = (pressure[i + 1][j] - pressure[i - 1][j]) / (2 * dx);
      const dPdy = (pressure[i][j + 1] - pressure[i][j - 1]) / (2 * dy);
      const dUdx = (windU[i + 1][j] - windU[i - 1][j]) / (2 * dx);
      const dVdy = (windV[i][j + 1] - windV[i][j - 1]) / (2 * dy);
      const dPdt = -(dUdx + dVdy);
      newPressure[i][j] = pressure[i][j] + dPdt * timeStep;

      // Temperature equation
      const dTdx = (temperature[i + 1][j] - temperature[i - 1][j]) / (2 * dx);
      const dTdy = (temperature[i][j + 1] - temperature[i][j - 1]) / (2 * dy);
      const dTdt_advection = -windU[i][j] * dTdx - windV[i][j] * dTdy;
      const dTdt_diabatic = 0; // Placeholder for diabatic heating term
      const dTdt = dTdt_advection + dTdt_diabatic;
      newTemperature[i][j] = temperature[i][j] + dTdt * timeStep;

      // Wind U equation
      const dWindUdx = (windU[i + 1][j] - windU[i - 1][j]) / (2 * dx);
      const dWindUdy = (windU[i][j + 1] - windU[i][j - 1]) / (2 * dy);
      const dWindUdt_advection = -windU[i][j] * dWindUdx - windV[i][j] * dWindUdy;
      const dWindUdt_pressure = -(1 / pressure[i][j]) * dPdx;
      const dWindUdt = dWindUdt_advection + dWindUdt_pressure;
      newWindU[i][j] = windU[i][j] + dWindUdt * timeStep;

      // Wind V equation
      const dWindVdx = (windV[i + 1][j] - windV[i - 1][j]) / (2 * dx);
      const dWindVdy = (windV[i][j + 1] - windV[i][j - 1]) / (2 * dy);
      const dWindVdt_advection = -windU[i][j] * dWindVdx - windV[i][j] * dWindVdy;
      const dWindVdt_pressure = -(1 / pressure[i][j]) * dPdy;
      const dWindVdt = dWindVdt_advection + dWindVdt_pressure;
      newWindV[i][j] = windV[i][j] + dWindVdt * timeStep;
    }
  }

  // Apply boundary conditions (assuming periodic boundaries)
  for (let i = 0; i < nx; i++) {
    newPressure[i][0] = newPressure[i][ny - 2];
    newPressure[i][ny - 1] = newPressure[i][1];
    newTemperature[i][0] = newTemperature[i][ny - 2];
    newTemperature[i][ny - 1] = newTemperature[i][1];
    newWindU[i][0] = newWindU[i][ny - 2];
    newWindU[i][ny - 1] = newWindU[i][1];
    newWindV[i][0] = newWindV[i][ny - 2];
    newWindV[i][ny - 1] = newWindV[i][1];
  }

  for (let j = 0; j < ny; j++) {
    newPressure[0][j] = newPressure[nx - 2][j];
    newPressure[nx - 1][j] = newPressure[1][j];
    newTemperature[0][j] = newTemperature[nx - 2][j];
    newTemperature[nx - 1][j] = newTemperature[1][j];
    newWindU[0][j] = newWindU[nx - 2][j];
    newWindU[nx - 1][j] = newWindU[1][j];
    newWindV[0][j] = newWindV[nx - 2][j];
    newWindV[nx - 1][j] = newWindV[1][j];
  }

  return [newPressure, newTemperature, newWindU, newWindV];
};