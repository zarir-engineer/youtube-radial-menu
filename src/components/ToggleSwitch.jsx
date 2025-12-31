import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ is3D, onToggle }) => {
  return (
    <div className="toggle-container">
      <input 
        type="checkbox" 
        id="dimension-toggle" 
        checked={is3D} 
        onChange={onToggle}
      />
      <label htmlFor="dimension-toggle" className="toggle-label">
        <span className="toggle-track">
          <span className="text-2d">2D</span>
          <span className="text-3d">3D</span>
        </span>
        <span className="toggle-thumb"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;