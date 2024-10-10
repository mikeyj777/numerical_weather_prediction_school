import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

const MomentumEquations = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Momentum Equations in NWP</h1>
      <p className="mb-4">
        The momentum equations in Numerical Weather Prediction (NWP) describe the motion of air 
        parcels in the atmosphere. They are derived from Newton's Second Law of Motion, applied 
        to a rotating reference frame (the Earth).
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Equations</h2>
      <p className="mb-4">
        The momentum equations for a rotating Earth in vector form are:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <BlockMath math="\frac{D\mathbf{v}}{Dt} + 2\mathbf{\Omega} \times \mathbf{v} = -\frac{1}{\rho}\nabla p + \mathbf{g} + \mathbf{F}" />
      </div>
      <p className="mb-4">Where:</p>
      <ul className="list-disc pl-6 mb-6">
        <li><InlineMath math="\mathbf{v}" /> is the velocity vector</li>
        <li><InlineMath math="\mathbf{\Omega}" /> is the Earth's angular velocity vector</li>
        <li><InlineMath math="\rho" /> is density</li>
        <li><InlineMath math="p" /> is pressure</li>
        <li><InlineMath math="\mathbf{g}" /> is the gravitational acceleration</li>
        <li><InlineMath math="\mathbf{F}" /> represents other forces (e.g., friction)</li>
        <li><InlineMath math="\frac{D}{Dt}" /> is the total (material) derivative</li>
      </ul>

      <p className="mb-4">
        In Cartesian coordinates, these equations can be written as three separate equations:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <BlockMath math="\frac{Du}{Dt} - fv = -\frac{1}{\rho}\frac{\partial p}{\partial x} + F_x" />
        <BlockMath math="\frac{Dv}{Dt} + fu = -\frac{1}{\rho}\frac{\partial p}{\partial y} + F_y" />
        <BlockMath math="\frac{Dw}{Dt} = -\frac{1}{\rho}\frac{\partial p}{\partial z} - g + F_z" />
      </div>
      <p className="mb-4">Where <InlineMath math="f = 2\Omega\sin\phi" /> is the Coriolis parameter, and <InlineMath math="\phi" /> is latitude.</p>

      <h2 className="text-2xl font-semibold mb-4">Use in NWP Models</h2>
      <p className="mb-4">
        In NWP models, the momentum equations are crucial for:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Predicting wind velocities in three dimensions</li>
        <li>Accounting for the effects of Earth's rotation (Coriolis effect)</li>
        <li>Incorporating the impacts of pressure gradients and gravity</li>
        <li>Representing the transfer of momentum due to various forces</li>
        <li>Coupling with other equations (e.g., continuity, thermodynamic) to provide a complete description of atmospheric motion</li>
      </ul>
      <p className="mb-4">
        The equations are often modified or simplified in NWP models:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Many models use the hydrostatic approximation, which simplifies the vertical momentum equation</li>
        <li>Some models use terrain-following coordinate systems, which modify the form of the equations</li>
        <li>The equations may be cast in terms of vorticity and divergence in spectral models</li>
        <li>Additional terms may be added to represent subgrid-scale processes through parameterizations</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Implementation Example</h2>
      <p className="mb-4">
        Here's a simplified Python example of how the horizontal momentum equations might be implemented 
        in a basic NWP model using finite differences:
      </p>
      <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
        <code className="language-python">
{`import numpy as np

def momentum_equations(u, v, f, p, rho, dx, dy, dt):
    """
    Solve the horizontal momentum equations using finite differences.
    
    Parameters:
    - u, v: 2D arrays of horizontal wind components
    - f: Coriolis parameter (can be a 2D array for varying latitude)
    - p: 2D array of pressure
    - rho: 2D array of density
    - dx, dy: Grid spacing in x and y directions
    - dt: Time step
    
    Returns:
    - Updated u and v wind components
    """
    # Calculate pressure gradients
    dp_dx = np.gradient(p, dx, axis=1)
    dp_dy = np.gradient(p, dy, axis=0)
    
    # Calculate advection terms (simplified)
    du_dx = np.gradient(u, dx, axis=1)
    du_dy = np.gradient(u, dy, axis=0)
    dv_dx = np.gradient(v, dx, axis=1)
    dv_dy = np.gradient(v, dy, axis=0)
    
    advection_u = -(u * du_dx + v * du_dy)
    advection_v = -(u * dv_dx + v * dv_dy)
    
    # Update u and v
    u_new = u + dt * (advection_u - f * v - (1 / rho) * dp_dx)
    v_new = v + dt * (advection_v + f * u - (1 / rho) * dp_dy)
    
    return u_new, v_new

# Example usage
nx, ny = 100, 100  # Grid dimensions
dx = dy = 1000  # Grid spacing (m)
dt = 60  # Time step (s)

# Initialize arrays (simplified example)
u = v = np.zeros((ny, nx))  # Wind components (m/s)
f = 1e-4 * np.ones((ny, nx))  # Coriolis parameter (s^-1)
p = 101325 * np.ones((ny, nx))  # Pressure (Pa)
rho = 1.225 * np.ones((ny, nx))  # Density (kg/m^3)

# Perform one time step
u_updated, v_updated = momentum_equations(u, v, f, p, rho, dx, dy, dt)
`}
        </code>
      </pre>
      <p className="mb-4">
        This example demonstrates a basic implementation of the horizontal momentum equations using 
        finite differences. In a real NWP model, this would be part of a larger system of 
        equations and would include more sophisticated numerical methods, boundary conditions, 
        and parameterizations for various physical processes.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Key Considerations in NWP</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Numerical stability: The choice of time step and spatial resolution must satisfy the CFL condition</li>
        <li>Conservation properties: Many NWP models use formulations that conserve energy and enstrophy</li>
        <li>Boundary conditions: Special treatment is needed at the Earth's surface and model top</li>
        <li>Parameterizations: Effects of turbulence, surface drag, and other subgrid processes are often parameterized</li>
        <li>Balanced initialization: Initial conditions must be carefully prepared to avoid spurious gravity waves</li>
      </ul>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Further Reading</h2>
        <ul className="list-disc pl-6">
          <li><a href="https://www.ecmwf.int/en/elibrary/16951-part-iii-dynamics-and-numerical-procedures" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ECMWF - Dynamics and Numerical Procedures</a></li>
          <li><a href="https://www.meteo.physik.uni-muenchen.de/lehre/dameris/skript_ds_kap2.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">University of Munich - Atmospheric Dynamics (PDF)</a></li>
          <li><a href="https://www.weather.gov/media/jetstream/models/nwp_models.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">NOAA - Numerical Weather Prediction</a></li>
        </ul>
      </div>
    </div>
  );
};

export default MomentumEquations;