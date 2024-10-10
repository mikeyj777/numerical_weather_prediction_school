// Slider.js

import React from 'react';

export const Slider = ({ label, value, min, max, step, onChange }) => {
  return (
    <div className="slider-container">
      {label && <label className="slider-label">{label}</label>}
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <span className="slider-value">{value}</span>
    </div>
  );
};