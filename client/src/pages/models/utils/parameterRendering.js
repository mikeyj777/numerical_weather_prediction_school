// utils/parameterRendering.js

const pressureToRGB = (pressure) => {
  const minPressure = 95000;
  const maxPressure = 105000;
  const normalizedPressure = (pressure - minPressure) / (maxPressure - minPressure);

  const hue = (1 - normalizedPressure) * 240;
  const rgb = hslToRGB(hue, 1, 0.5);
  return rgb;
};

const temperatureToRGB = (temperature) => {
  const minTemperature = 250;
  const maxTemperature = 320;
  const normalizedTemperature = (temperature - minTemperature) / (maxTemperature - minTemperature);

  const hue = normalizedTemperature * 240;
  const rgb = hslToRGB(hue, 1, 0.5);
  return rgb;
};

const hslToRGB = (h, s, l) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const generateOverlay = (data, colorMap) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = data[0].length;
  const height = data.length;
  canvas.width = width;
  canvas.height = height;

  const imageData = ctx.createImageData(width, height);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = (i * width + j) * 4;
      const value = data[i][j];
      const rgb = colorMap(value);
      imageData.data[index] = rgb[0];
      imageData.data[index + 1] = rgb[1];
      imageData.data[index + 2] = rgb[2];
      imageData.data[index + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};

export const generatePressureOverlay = (pressure) => {
  return generateOverlay(pressure, pressureToRGB);
};

export const generateTemperatureOverlay = (temperature) => {
  return generateOverlay(temperature, temperatureToRGB);
};