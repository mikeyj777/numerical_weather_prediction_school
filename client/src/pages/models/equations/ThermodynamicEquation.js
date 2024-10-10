import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

const ThermodynamicEquation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Thermodynamic Equation in NWP</h1>
      <p className="mb-4">
        The thermodynamic equation in Numerical Weather Prediction (NWP) models describes the 
        conservation of energy in the atmosphere. It accounts for temperature changes due to 
        adiabatic processes, diabatic heating, and other energy sources or sinks.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Equation</h2>
      <p className="mb-4">
        The thermodynamic equation in its simplest form can be expressed as:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <BlockMath math="\frac{D\theta}{Dt} = \frac{\dot{Q}}{c_p\Pi}" />
      </div>
      <p className="mb-4">Where:</p>
      <ul className="list-disc pl-6 mb-6">
        <li><InlineMath math="\theta" /> is the potential temperature</li>
        <li><InlineMath math="\frac{D}{Dt}" /> is the total (material) derivative</li>
        <li><InlineMath math="\dot{Q}" /> is the diabatic heating rate per unit mass</li>
        <li><InlineMath math="c_p" /> is the specific heat capacity at constant pressure</li>
        <li><InlineMath math="\Pi" /> is the Exner function (<InlineMath math="\Pi = (p/p_0)^{R/c_p}" />)</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Use in NWP Models</h2>
      <p className="mb-4">
        In NWP models, the thermodynamic equation is crucial for:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Predicting temperature changes in the atmosphere</li>
        <li>Accounting for heat transfer processes</li>
        <li>Coupling with other equations (e.g., moisture equations) to represent cloud formation and precipitation</li>
        <li>Incorporating the effects of radiation, latent heat release, and surface heat fluxes</li>
      </ul>
      <p className="mb-4">
        The equation is often modified to include additional terms representing various physical processes. 
        For example, a more comprehensive form might include:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <BlockMath math="\frac{D\theta}{Dt} = \frac{1}{c_p\Pi}(Q_r + Q_l + Q_f + Q_d)" />
      </div>
      <p className="mb-4">Where:</p>
      <ul className="list-disc pl-6 mb-6">
        <li><InlineMath math="Q_r" /> is radiative heating/cooling</li>
        <li><InlineMath math="Q_l" /> is latent heat release</li>
        <li><InlineMath math="Q_f" /> is surface heat flux</li>
        <li><InlineMath math="Q_d" /> is diffusive heating</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Implementation Example</h2>
      <p className="mb-4">
        Here's a simplified Python example of how the thermodynamic equation might be implemented 
        in a basic NWP model:
      </p>
      <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
        <code className="language-python">
{`import numpy as np

def thermodynamic_equation(theta, u, v, w, Q, cp, Pi, dx, dy, dz, dt):
    """
    Solve the thermodynamic equation using finite differences.
    
    Parameters:
    - theta: 3D array of potential temperature
    - u, v, w: 3D arrays of wind components
    - Q: 3D array of diabatic heating rate
    - cp: Specific heat capacity at constant pressure
    - Pi: 3D array of Exner function
    - dx, dy, dz: Grid spacing in x, y, z directions
    - dt: Time step
    
    Returns:
    - Updated potential temperature field
    """
    # Calculate spatial gradients
    dtheta_dx = np.gradient(theta, dx, axis=0)
    dtheta_dy = np.gradient(theta, dy, axis=1)
    dtheta_dz = np.gradient(theta, dz, axis=2)
    
    # Calculate advection term
    advection = -(u * dtheta_dx + v * dtheta_dy + w * dtheta_dz)
    
    # Calculate diabatic heating term
    diabatic_heating = Q / (cp * Pi)
    
    # Update potential temperature
    theta_new = theta + dt * (advection + diabatic_heating)
    
    return theta_new

# Example usage
nx, ny, nz = 100, 100, 50  # Grid dimensions
dx = dy = dz = 1000  # Grid spacing (m)
dt = 60  # Time step (s)

# Initialize arrays (simplified example)
theta = np.ones((nx, ny, nz)) * 300  # Potential temperature (K)
u = v = w = np.zeros((nx, ny, nz))  # Wind components (m/s)
Q = np.zeros((nx, ny, nz))  # Diabatic heating rate (K/s)
cp = 1004  # Specific heat capacity (J/kg/K)
Pi = np.ones((nx, ny, nz))  # Exner function (simplified)

# Perform one time step
theta_updated = thermodynamic_equation(theta, u, v, w, Q, cp, Pi, dx, dy, dz, dt)
`}
        </code>
      </pre>
      <p className="mb-4">
        This example demonstrates a basic implementation of the thermodynamic equation using 
        finite differences. In a real NWP model, this would be part of a larger system of 
        equations and would include more sophisticated numerical methods and parameterizations 
        for various physical processes.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Further Reading</h2>
        <ul className="list-disc pl-6">
          <li><a href="https://www.ecmwf.int/en/elibrary/16951-part-iii-dynamics-and-numerical-procedures" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ECMWF - Dynamics and Numerical Procedures</a></li>
          <li><a href="https://www.weather.gov/media/jetstream/models/nwp_models.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">NOAA - Numerical Weather Prediction</a></li>
        </ul>
      </div>
    </div>
  );
};

export default ThermodynamicEquation;