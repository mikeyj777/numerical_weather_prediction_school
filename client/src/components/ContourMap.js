import React, { useMemo, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { contours } from 'd3-contour';
import { extent } from 'd3-array';

export const ContourMap = ({ data, type }) => {
  const map = useMap();

  const getRainbowColor = (value, minValue, maxValue) => {
    const range = maxValue - minValue;
    const normalizedValue = (value - minValue) / range;
    const hue = (1 - normalizedValue) * 240;
    return `hsl(${hue}, 100%, 50%)`;
  };

  const contourData = useMemo(() => {
    const flatData = data.flat();
    const [minValue, maxValue] = extent(flatData);
    const contourGenerator = contours()
      .size([data[0].length, data.length])
      .thresholds(10);

    const contourFeatures = contourGenerator(flatData);

    return contourFeatures.map(feature => ({
      ...feature,
      color: type === 'temperature'
        ? getRainbowColor(maxValue - feature.value, minValue, maxValue)
        : getRainbowColor(feature.value, minValue, maxValue)
    }));
  }, [data, type]);

  useEffect(() => {
    const contourLayer = L.layerGroup().addTo(map);

    contourData.forEach(feature => {
      L.geoJSON(feature, {
        style: () => ({
          color: feature.color,
          weight: 2,
          opacity: 0.7
        })
      }).addTo(contourLayer);
    });

    return () => {
      map.removeLayer(contourLayer);
    };
  }, [map, contourData]);

  return null;
};