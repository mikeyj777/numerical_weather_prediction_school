
export const getRandomSamples = (matrix, numSamples = 5) => {
  const samples = [];
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let i = 0; i < numSamples; i++) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);
    samples.push({
      value: matrix[randomRow][randomCol],
      position: [randomRow, randomCol]
    });
  }

  return samples;
};

// Utility function to calculate the mean of a 2D array
const calculateMean = (matrix) => {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      sum += matrix[i][j];
      count++;
    }
  }
  return sum / count;
};

// Utility function to calculate the standard deviation of a 2D array
const calculateStandardDeviation = (matrix) => {
  const mean = calculateMean(matrix);
  let sumSquaredDiff = 0;
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      sumSquaredDiff += Math.pow(matrix[i][j] - mean, 2);
      count++;
    }
  }
  return Math.sqrt(sumSquaredDiff / count);
};

// Function to log statistics for a named matrix
export const logMatrixStats = (name, matrix) => {
  const mean = calculateMean(matrix);
  const stdDev = calculateStandardDeviation(matrix);
  console.log(`${name} - Mean: ${mean.toFixed(4)}, StdDev: ${stdDev.toFixed(4)}`);
};