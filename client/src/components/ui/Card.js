// components/ui/Card.js
import React from 'react';

export const Card = ({ children, className, style }) => {
  return <div className={`card ${className}`} style={style}>{children}</div>;
};

export const CardHeader = ({ title, className, style }) => {
  return <div className={`card-header ${className}`} style={style}>{title}</div>;
};

export const CardContent = ({ children, className, style }) => {
  return <div className={`card-content ${className}`} style={style}>{children}</div>;
};

export const CardActions = ({ children, className, style }) => {
  return <div className={`card-actions ${className}`} style={style}>{children}</div>;
};

export const Button = ({ title, onClick, className, style }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} style={style}>
      {title}
    </button>
  );
};
