import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

const ContinuityEquation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Continuity Equation in NWP</h1>
      <p className="mb-4">
        The continuity equation in Numerical Weather Prediction (NWP) expresses the conservation 
        of mass in the atmosphere. It relates the rate of change of density to the divergence of 
        mass flux, ensuring that mass is neither created nor destroyed within the system.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Equation</h2>
      <p className="mb-4">
        The general form of the continuity equation is:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <BlockMath math="\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \mathbf{v}) = 0" />
      </div>
      <p className="mb-4">Where:</p>
      <ul className="list-disc pl-6 mb-6">
        <li><InlineMath math="\rho" /> is density</li>
        <li><InlineMath math="t" /> is time</li>
        <li><InlineMath math="\mathbf{v}" /> is the velocity vector</li>
        <li><InlineMath math="\nabla \cdot" /> is the divergence operator</li>
      </ul>

      <p className="mb-4">
        In Cartesian coordinates, this equation can be expanded as:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <BlockMath math="\frac{\partial \rho}{\partial t} + \frac{\partial (\rho u)}{\partial x} + \frac{\partial (\rho v)}{\partial y} + \frac{\partial (\rho w)}{\partial z} = 0" />
      </div>
      <p className="mb-4">Where <InlineMath math="u" />, <InlineMath math="v" />, and <InlineMath math="w" /> are the velocity components in the x, y, and z directions, respectively.</p>

      <h2 className="text-2xl font-semibold mb-4">Use in NWP Models</h2>
      <p className="mb-4">
        In NWP models, the continuity equation plays several crucial roles:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Ensures mass conservation in the model atmosphere</li>
        <li>Couples the density field with the velocity field</li>
        <li>Used to derive the pressure tendency equation in many models</li>
        <li>Helps in determining vertical velocity in hydrostatic models</li>
        <li>Contributes to the calculation of divergence and convergence fields</li>
      </ul>
      <p className="mb-4">
        The equation is often modified or simplified in NWP models:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Many models use the anelastic approximation, which filters out sound waves</li>
        <li>In the Boussinesq approximation, density variations are neglected except in the buoyancy term</li>
        <li>Some models use a mass-based vertical coordinate (e.g., pressure or sigma coordinates), which alters the form of the equation</li>
        <li>In spectral models, the continuity equation may be implicitly satisfied through the choice of basis functions</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Implementation Example</h2>
      <p className="mb-4">
        Here's a simplified Python example of how the continuity equation might be used in a basic 
        NWP model to calculate vertical velocity:
      </p>
      <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
        <code className="language-python">
{`import numpy as np

def calculate_vertical_velocity(u, v, rho, dx, dy, dz, boundary_w):
    """
    Calculate vertical velocity using the continuity equation.
    
    Parameters:
    - u, v: 3D arrays of horizontal wind components
    - rho: 3D array of density
    - dx, dy, dz: Grid spacing in x, y, and z directions
    - boundary_w: 2D array of vertical velocity at the lower boundary
    
    Returns:
    - 3D array of vertical velocity (w)
    """
    nx, ny, nz = u.shape
    w = np.zeros_like(u)
    
    # Set lower boundary condition
    w[:,:,0] = boundary_w
    
    # Calculate horizontal divergence
    du_dx = np.gradient(u * rho, dx, axis=2)
    dv_dy = np.gradient(v * rho, dy, axis=1)
    
    # Integrate upwards to get w
    for k in range(1, nz):
        div_uv = du_dx[:,:,k] + dv_dy[:,:,k]
        w[:,:,k] = w[:,:,k-1] - dz * div_uv / rho[:,:,k]
    
    return w

# Example usage
nx, ny, nz = 50, 50, 20  # Grid dimensions
dx = dy = 10000  # Horizontal grid spacing (m)
dz = 500  # Vertical grid spacing (m)

# Initialize arrays (simplified example)
u = np.random.randn(nx, ny, nz) * 10  # Zonal wind (m/s)
v = np.random.randn(nx, ny, nz) * 10  # Meridional wind (m/s)
rho = 1.225 * np.exp(-np.arange(nz) * dz / 8000)  # Density (kg/m^3)
rho = rho[np.newaxis, np.newaxis, :]  # Broadcast to 3D

# Set lower boundary condition (e.g., orographic lifting)
boundary_w = np.zeros((nx, ny))

# Calculate vertical velocity
w = calculate_vertical_velocity(u, v, rho, dx, dy, dz, boundary_w)

print(f"Maximum vertical velocity: {w.max():.2f} m/s")
print(f"Minimum vertical velocity: {w.min():.2f} m/s")
`}
        </code>
      </pre>
      <p className="mb-4">
        This example demonstrates how the continuity equation can be used to derive vertical velocity 
        in a hydrostatic model. In a full NWP model, this would be part of a larger system of 
        equations and would include more sophisticated numerical methods and boundary conditions.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Key Considerations in NWP</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Numerical stability: The continuity equation can introduce fast-moving sound waves, which may require special treatment</li>
        <li>Conservation properties: Ensuring mass conservation is crucial for long-term model stability</li>
        <li>Boundary conditions: Special care is needed at the surface and model top, especially for vertical velocity calculations</li>
        <li>Coupling with other equations: The continuity equation is tightly coupled with the momentum and thermodynamic equations</li>
        <li>Non-hydrostatic effects: In high-resolution models, non-hydrostatic effects become important, requiring a full 3D continuity equation</li>
      </ul>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Further Reading</h2>
        <ul className="list-disc pl-6">
          <li><a href="https://www.ecmwf.int/en/elibrary/16951-part-iii-dynamics-and-numerical-procedures" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ECMWF - Dynamics and Numerical Procedures</a></li>
          <li><a href="https://www.atmosphere.colostate.edu/~ohallora/AT701/AT701_Ch02.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Colorado State University - Atmospheric Dynamics (PDF)</a></li>
          <li><a href="https://www.weather.gov/media/jetstream/models/nwp_models.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">NOAA - Numerical Weather Prediction</a></li>
        </ul>
      </div>
    </div>
  );
};

export default ContinuityEquation;