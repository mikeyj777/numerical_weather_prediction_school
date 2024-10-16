/**
 * Solves the primitive equations using the Runge-Kutta 4th-order method (RK4).
 *
 * @param {Array} pressure - 2D array representing the pressure field
 * @param {Array} temperature - 2D array representing the temperature field
 * @param {Array} windU - 2D array representing the zonal wind component
 * @param {Array} windV - 2D array representing the meridional wind component
 * @param {number} timeStep - Time step for the numerical integration
 * @returns {Array} - Updated state [pressure, temperature, windU, windV]
 *
 * The function uses the RK4 method to solve the primitive equations and update
 * the state of the atmosphere. It calculates the tendencies (rates of change)
 * of the prognostic variables (pressure, temperature, wind components) based on
 * the governing equations and performs four intermediate steps to obtain the
 * final updated state.
 *
 * The RK4 method provides a higher-order approximation compared to the basic
 * finite difference scheme, resulting in more accurate solutions. It evaluates
 * the tendencies at four different points within each time step and combines
 * them using specific weights to update the state variables.
 *
 * The RK4 method involves four intermediate steps (k1, k2, k3, k4) that evaluate
 * the tendencies (rates of change) of the prognostic variables at different points
 * within each time step. The tendencies are calculated based on the governing
 * equations (continuity, thermodynamic, and momentum equations) using the
 * corresponding tendency functions (pressureTendency, temperatureTendency,
 * windUTendency, windVTendency).
 *
 * The RK4 method combines the tendencies using specific weights to update the
 * state variables (pressure, temperature, wind components) at the end of each
 * time step. This higher-order approximation provides improved accuracy compared
 * to the basic finite difference scheme.
 *
 * Note: This implementation assumes periodic boundary conditions for simplicity.
 * Additional boundary conditions, physical parameterizations, and optimizations
 * can be incorporated based on specific requirements and model complexity.
 */

import { logMatrixStats  } from "./statsAndSampling";

const gridParams = {
  nx: 100,
  ny: 100,
  dx: 1000,
  dy: 1000,
};

const { nx, ny, dx, dy } = gridParams;

export const equationSolver = (pressure, temperature, windU, windV, timeStep) => {
  
  const R = 287.05; // Gas constant for dry air (J/kg/K)
  const Cp = 1004.0; // Specific heat capacity at constant pressure (J/kg/K)
  const g = 9.81; // Acceleration due to gravity (m/s^2)

  // Define the tendency functions for each prognostic variable
  const pressureTendency = (p, u, v) => {
    const dPdt = Array(nx).fill().map(() => Array(ny).fill(0));

    for (let i = 1; i < nx - 1; i++) {
      for (let j = 1; j < ny - 1; j++) {
        try {
          const dPdx = (p[i + 1][j] - p[i - 1][j]) / (2 * dx);
          const dPdy = (p[i][j + 1] - p[i][j - 1]) / (2 * dy);
          const dUdx = (u[i + 1][j] - u[i - 1][j]) / (2 * dx);
          const dVdy = (v[i][j + 1] - v[i][j - 1]) / (2 * dy);

          dPdt[i][j] = -(dUdx + dVdy);
          // console.log("i: ", i, "j: ", j, "windU = ", u[i][j]);
          // console.log("i: ", i, "j: ", j, "windV = ", v[i][j]);
          // console.log("i: ", i, "j: ", j, "u[i + 1][j] - u[i - 1][j] :  ", u[i + 1][j] - u[i - 1][j]);
          // console.log("i: ", i, "j: ", j, "v[i][j + 1] - v[i][j - 1] :  ", (v[i][j + 1] - v[i][j - 1]));
          // console.log("i: ", i, "j: ", j, "dPdt = ", dPdt[i][j]);
          // console.log("i: ", i, "j: ", j, "dPdx = ", (p[i + 1][j] - p[i - 1][j]) / (2 * dx));
          // console.log("i: ", i, "j: ", j, "dPdy = ", (p[i][j + 1] - p[i][j - 1]) / (2 * dy));
          // console.log("i: ", i, "j: ", j, "dUdx = ", (u[i + 1][j] - u[i - 1][j]) / (2 * dx));
          // console.log("i: ", i, "j: ", j, "dVdy = ", (v[i][j + 1] - v[i][j - 1]) / (2 * dy));
        } catch (error) {
          console.log("Error: ", error);
          console.log("i: ", i, "j: ", j, "dPdx = ", (p[i + 1][j] - p[i - 1][j]) / (2 * dx));
          console.log("i: ", i, "j: ", j, "dPdy = ", (p[i][j + 1] - p[i][j - 1]) / (2 * dy));
          console.log("i: ", i, "j: ", j, "dUdx = ", (u[i + 1][j] - u[i - 1][j]) / (2 * dx));
          console.log("i: ", i, "j: ", j, "dVdy = ", (v[i][j + 1] - v[i][j - 1]) / (2 * dy));
        
        }

      }
    }

    return dPdt;
  };

  const temperatureTendency = (T, u, v, p) => {
    const dTdt = Array(nx).fill().map(() => Array(ny).fill(0));

    for (let i = 1; i < nx - 1; i++) {
      for (let j = 1; j < ny - 1; j++) {
        const dTdx = (T[i + 1][j] - T[i - 1][j]) / (2 * dx);
        const dTdy = (T[i][j + 1] - T[i][j - 1]) / (2 * dy);
        const dTdt_advection = -u[i][j] * dTdx - v[i][j] * dTdy;
        const dTdt_diabatic = 0; // Placeholder for diabatic heating term

        dTdt[i][j] = dTdt_advection + dTdt_diabatic;
        // console.log("i: ", i, "j: ", j, "dTdt = ", dTdt[i][j]);
      }
    }

    return dTdt;
  };

  const windUTendency = (u, v, p) => {
    const dUdt = Array(nx).fill().map(() => Array(ny).fill(0));

    for (let i = 1; i < nx - 1; i++) {
      for (let j = 1; j < ny - 1; j++) {
        const dPdx = (p[i + 1][j] - p[i - 1][j]) / (2 * dx);
        const dUdx = (u[i + 1][j] - u[i - 1][j]) / (2 * dx);
        const dUdy = (u[i][j + 1] - u[i][j - 1]) / (2 * dy);
        const dUdt_advection = -u[i][j] * dUdx - v[i][j] * dUdy;
        const dUdt_pressure = -(1 / p[i][j]) * dPdx;

        dUdt[i][j] = dUdt_advection + dUdt_pressure;
        // console.log("i: ", i, "j: ", j, "dUdt = ", dUdt[i][j]);
      }
    }

    return dUdt;
  };

  const windVTendency = (u, v, p) => {
    const dVdt = Array(nx).fill().map(() => Array(ny).fill(0));

    for (let i = 1; i < nx - 1; i++) {
      for (let j = 1; j < ny - 1; j++) {
        const dPdy = (p[i][j + 1] - p[i][j - 1]) / (2 * dy);
        const dVdx = (v[i + 1][j] - v[i - 1][j]) / (2 * dx);
        const dVdy = (v[i][j + 1] - v[i][j - 1]) / (2 * dy);
        const dVdt_advection = -u[i][j] * dVdx - v[i][j] * dVdy;
        const dVdt_pressure = -(1 / p[i][j]) * dPdy;

        dVdt[i][j] = dVdt_advection + dVdt_pressure;
        // console.log("i: ", i, "j: ", j, "dVdt = ", dVdt[i][j]);
      }
    }

    return dVdt;
  };

  // RK4 step 1
  const k1_p = pressureTendency(pressure, windU, windV);
  const k1_T = temperatureTendency(temperature, windU, windV, pressure);
  const k1_u = windUTendency(windU, windV, pressure);
  const k1_v = windVTendency(windU, windV, pressure);

  // console.log("k1_p = ", k1_p[40][40]);
  // console.log("k1_T = ", k1_T[40][40]);
  // console.log("k1_u = ", k1_u[40][40]);
  // console.log("k1_v = ", k1_v[40][40]);

  // console.log("Random samples from k1_p:", getRandomSamples(k1_p));
  // console.log("Random samples from k1_T:", getRandomSamples(k1_T));
  // console.log("Random samples from k1_u:", getRandomSamples(k1_u));
  // console.log("Random samples from k1_v:", getRandomSamples(k1_v));

  // RK4 step 2
  const p2 = pressure.map((row, i) => row.map((_, j) => pressure[i][j] + k1_p[i][j] * timeStep / 2));
  const T2 = temperature.map((row, i) => row.map((_, j) => temperature[i][j] + k1_T[i][j] * timeStep / 2));
  const u2 = windU.map((row, i) => row.map((_, j) => windU[i][j] + k1_u[i][j] * timeStep / 2));
  const v2 = windV.map((row, i) => row.map((_, j) => windV[i][j] + k1_v[i][j] * timeStep / 2));

  // console.log("p2 = ", p2[40][40]);
  // console.log("T2 = ", T2[40][40]);
  // console.log("u2 = ", u2[40][40]);
  // console.log("v2 = ", v2[40][40]);

  // console.log("Random samples from p2:", getRandomSamples(p2));
  // console.log("Random samples from T2:", getRandomSamples(T2));
  // console.log("Random samples from u2:", getRandomSamples(u2));
  // console.log("Random samples from v2:", getRandomSamples(v2));

  const k2_p = pressureTendency(p2, u2, v2);
  const k2_T = temperatureTendency(T2, u2, v2, p2);
  const k2_u = windUTendency(u2, v2, p2);
  const k2_v = windVTendency(u2, v2, p2);

  // console.log("k2_p = ", k2_p[40][40]);
  // console.log("k2_T = ", k2_T[40][40]);
  // console.log("k2_u = ", k2_u[40][40]);
  // console.log("k2_v = ", k2_v[40][40]);

  // console.log("Random samples from k2_p:", getRandomSamples(k2_p));
  // console.log("Random samples from k2_T:", getRandomSamples(k2_T));
  // console.log("Random samples from k2_u:", getRandomSamples(k2_u));
  // console.log("Random samples from k2_v:", getRandomSamples(k2_v));

  // RK4 step 3
  const p3 = pressure.map((row, i) => row.map((_, j) => pressure[i][j] + k2_p[i][j] * timeStep / 2));
  const T3 = temperature.map((row, i) => row.map((_, j) => temperature[i][j] + k2_T[i][j] * timeStep / 2));
  const u3 = windU.map((row, i) => row.map((_, j) => windU[i][j] + k2_u[i][j] * timeStep / 2));
  const v3 = windV.map((row, i) => row.map((_, j) => windV[i][j] + k2_v[i][j] * timeStep / 2));

  // console.log("Random samples from p3:", getRandomSamples(p3));
  // console.log("Random samples from T3:", getRandomSamples(T3));
  // console.log("Random samples from u3:", getRandomSamples(u3));
  // console.log("Random samples from v3:", getRandomSamples(v3));

  const k3_p = pressureTendency(p3, u3, v3);
  const k3_T = temperatureTendency(T3, u3, v3, p3);
  const k3_u = windUTendency(u3, v3, p3);
  const k3_v = windVTendency(u3, v3, p3);

  // console.log("k3_p:", k3_p[40][40]);
  // console.log("k3_T:", k3_T[40][40]);
  // console.log("k3_u:", k3_u[40][40]);
  // console.log("k3_v:", k3_v[40][40]);


  // console.log("Random samples from k3_p:", getRandomSamples(k3_p));
  // console.log("Random samples from k3_T:", getRandomSamples(k3_T));
  // console.log("Random samples from k3_u:", getRandomSamples(k3_u));
  // console.log("Random samples from k3_v:", getRandomSamples(k3_v));

  // RK4 step 4
  const p4 = pressure.map((row, i) => row.map((_, j) => pressure[i][j] + k3_p[i][j] * timeStep));
  const T4 = temperature.map((row, i) => row.map((_, j) => temperature[i][j] + k3_T[i][j] * timeStep));
  const u4 = windU.map((row, i) => row.map((_, j) => windU[i][j] + k3_u[i][j] * timeStep));
  const v4 = windV.map((row, i) => row.map((_, j) => windV[i][j] + k3_v[i][j] * timeStep));

  // console.log("p4:", p4[40][40]);
  // console.log("T4:", T4[40][40]);
  // console.log("u4:", u4[40][40]);
  // console.log("v4:", v4[40][40]);

  // console.log("Random samples from p4:", getRandomSamples(p4));
  // console.log("Random samples from T4:", getRandomSamples(T4));
  // console.log("Random samples from u4:", getRandomSamples(u4));
  // console.log("Random samples from v4:", getRandomSamples(v4));

  const k4_p = pressureTendency(p4, u4, v4);
  const k4_T = temperatureTendency(T4, u4, v4, p4);
  const k4_u = windUTendency(u4, v4, p4);
  const k4_v = windVTendency(u4, v4, p4);

  // console.log("k4_p:", k4_p[40][40]);
  // console.log("k4_T:", k4_T[40][40]);
  // console.log("k4_u:", k4_u[40][40]);
  // console.log("k4_v:", k4_v[40][40]);

  // console.log("Random samples from k4_p:", getRandomSamples(k4_p));
  // console.log("Random samples from k4_T:", getRandomSamples(k4_T));
  // console.log("Random samples from k4_u:", getRandomSamples(k4_u));
  // console.log("Random samples from k4_v:", getRandomSamples(k4_v));

  // Update the state variables using the RK4 formula
  const newPressure = pressure.map((row, i) =>
    row.map((_, j) => pressure[i][j] + (timeStep / 6) * (k1_p[i][j] + 2 * k2_p[i][j] + 2 * k3_p[i][j] + k4_p[i][j]))
  );
  const newTemperature = temperature.map((row, i) =>
    row.map((_, j) => temperature[i][j] + (timeStep / 6) * (k1_T[i][j] + 2 * k2_T[i][j] + 2 * k3_T[i][j] + k4_T[i][j]))
  );
  const newWindU = windU.map((row, i) =>
    row.map((_, j) => windU[i][j] + (timeStep / 6) * (k1_u[i][j] + 2 * k2_u[i][j] + 2 * k3_u[i][j] + k4_u[i][j]))
  );
  const newWindV = windV.map((row, i) =>
    row.map((_, j) => windV[i][j] + (timeStep / 6) * (k1_v[i][j] + 2 * k2_v[i][j] + 2 * k3_v[i][j] + k4_v[i][j]))
  );

  console.log("newPressure", newPressure[40][40]);
  // console.log("newTemperature", newTemperature[40][40]);
  // console.log("newWindU", newWindU[40][40]);
  // console.log("newWindV", newWindV[40][40]);

  // console.log("Random samples from newPressure:", getRandomSamples(newPressure));
  // console.log("Random samples from newTemperature:", getRandomSamples(newTemperature));
  // console.log("Random samples from newWindU:", getRandomSamples(newWindU));
  // console.log("Random samples from newWindV:", getRandomSamples(newWindV));

  // Apply boundary conditions (assuming periodic boundaries for simplicity)
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
  
  // console.log("newPressure", newPressure[4][4]);
  // console.log("newTemperature", newTemperature[newTemperature.length - 1][newTemperature[0].length - 1]);
  // console.log("newWindU", newWindU[newWindU.length - 1][newWindU[0].length - 1]);
  // console.log("newWindV", newWindV[newWindV.length - 1][newWindV[0].length - 1]);

  return [newPressure, newTemperature, newWindU, newWindV];
};
