import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ is3D, onToggle }) => {
  return (
    <img 
      /* Logic: If is3D is true, show 3d.png. If false, show 2d.png */
      src={is3D ? "images/3d.png" : "images/2d.png"} 
      alt="Toggle View"
      className="toggle-image"
      onClick={onToggle}
    />
  );
};

export default ToggleSwitch;