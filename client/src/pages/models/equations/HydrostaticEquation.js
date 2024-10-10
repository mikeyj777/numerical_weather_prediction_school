import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

const HydrostaticEquation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hydrostatic Equation in NWP</h1>
      <p className="mb-4">
        The Hydrostatic Equation in Numerical Weather Prediction (NWP) represents the balance 
        between the vertical pressure gradient force and the force of gravity. It is a fundamental 
        assumption in many weather prediction models, especially those covering large scales.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Equation</h2>
      <p className="mb-4">
        The Hydrostatic Equation in its simplest form is:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <BlockMath math="\frac{\partial p}{\partial z} = -\rho g" />
      </div>
      <p className="mb-4">Where:</p>
      <ul className="list-disc pl-6 mb-6">
        <li><InlineMath math="p" /> is pressure</li>
        <li><InlineMath math="z" /> is height</li>
        <li><InlineMath math="\rho" /> is density</li>
        <li><InlineMath math="g" /> is the acceleration due to gravity</li>
      </ul>

      <p className="mb-4">
        The equation can also be expressed in terms of geopotential <InlineMath math="\Phi" />:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <BlockMath math="\frac{\partial \Phi}{\partial p} = -\frac{1}{\rho} = -RT_v" />
      </div>
      <p className="mb-4">Where:</p>
      <ul className="list-disc pl-6 mb-6">
        <li><InlineMath math="\Phi = gz" /> is the geopotential</li>
        <li><InlineMath math="R" /> is the gas constant for dry air</li>
        <li><InlineMath math="T_v" /> is the virtual temperature</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Use in NWP Models</h2>
      <p className="mb-4">
        In NWP models, the Hydrostatic Equation plays several crucial roles:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Simplifies the vertical momentum equation in large-scale models</li>
        <li>Allows for the calculation of pressure or geopotential height given the temperature profile</li>
        <li>Provides a basis for vertical coordinate transformations (e.g., pressure or sigma coordinates)</li>
        <li>Helps in diagnosing vertical motion in hydrostatic models</li>
        <li>Forms the basis for the concept of geostrophic balance in synoptic meteorology</li>
      </ul>
      <p className="mb-4">
        The hydrostatic approximation is widely used, but it has limitations:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>It assumes vertical accelerations are negligible compared to gravity</li>
        <li>It becomes less accurate for small-scale phenomena (e.g., thunderstorms, mountain waves)</li>
        <li>Non-hydrostatic models are increasingly used for high-resolution forecasting</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Implementation Example</h2>
      <p className="mb-4">
        Here's a simplified Python example demonstrating how the Hydrostatic Equation might be used 
        in a basic NWP model to calculate pressure and geopotential height profiles:
      </p>
      <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
        <code className="language-python">
{`import numpy as np

def hydrostatic_balance(T, p_surface, z_levels):
    """
    Calculate pressure and geopotential height profiles assuming hydrostatic balance.
    
    Parameters:
    - T: 1D array of temperature (K) at each level
    - p_surface: Surface pressure (Pa)
    - z_levels: 1D array of height levels (m)
    
    Returns:
    - p: 1D array of pressure at each level
    - z: 1D array of geopotential height at each level
    """
    g = 9.81  # acceleration due to gravity (m/s^2)
    R = 287.05  # gas constant for dry air (J/kg/K)
    
    n_levels = len(z_levels)
    p = np.zeros(n_levels)
    z = np.zeros(n_levels)
    
    # Set surface values
    p[0] = p_surface
    z[0] = z_levels[0]
    
    # Integrate upwards
    for k in range(1, n_levels):
        dz = z_levels[k] - z_levels[k-1]
        Tbar = 0.5 * (T[k] + T[k-1])  # Average temperature in the layer
        p[k] = p[k-1] * np.exp(-g * dz / (R * Tbar))
        z[k] = z[k-1] + R * Tbar * np.log(p[k-1] / p[k]) / g
    
    return p, z

# Example usage
n_levels = 50
z_levels = np.linspace(0, 15000, n_levels)  # Height levels from 0 to 15 km
T = 288.15 - 6.5e-3 * z_levels  # Simple temperature profile (linear decrease with height)
p_surface = 101325  # Surface pressure (Pa)

p, z = hydrostatic_balance(T, p_surface, z_levels)

# Print results
for k in range(0, n_levels, 5):
    print(f"Level {k}: z = {z[k]:.0f} m, p = {p[k]:.0f} Pa, T = {T[k]:.1f} K")
`}
        </code>
      </pre>
      <p className="mb-4">
        This example demonstrates how the Hydrostatic Equation can be used to calculate pressure 
        and geopotential height profiles given a temperature profile. In a full NWP model, this would 
        be part of a larger system of equations and would include more sophisticated thermodynamics 
        and boundary conditions.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Key Considerations in NWP</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Vertical coordinate choice: Many models use pressure-based or sigma coordinates, which simplify the hydrostatic equation</li>
        <li>Non-hydrostatic effects: High-resolution models often need to account for non-hydrostatic effects</li>
        <li>Consistency with other equations: The hydrostatic equation must be consistent with the thermodynamic equation in the model</li>
        <li>Topography: Proper treatment of the lower boundary condition is crucial, especially in regions of complex terrain</li>
        <li>Numerical stability: The discretization of the hydrostatic equation can affect the stability of vertical sound waves in the model</li>
      </ul>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Further Reading</h2>
        <ul className="list-disc pl-6">
          <li><a href="https://www.ecmwf.int/en/elibrary/16951-part-iii-dynamics-and-numerical-procedures" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ECMWF - Dynamics and Numerical Procedures</a></li>
          <li><a href="https://www.weather.gov/media/jetstream/models/nwp_models.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">NOAA - Numerical Weather Prediction</a></li>
          <li><a href="https://www.meteo.physik.uni-muenchen.de/lehre/vorlesungen/advanced_numerical_modeling/ss2015/vertical_coordinates.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">University of Munich - Vertical Coordinates in NWP Models (PDF)</a></li>
        </ul>
      </div>
    </div>
  );
};

export default HydrostaticEquation;