import React from 'react';
import RadialMenu from './components/RadialMenu';
// Import the data file you just created
import menuData from './data.json'; 
import './index.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">COMMAND CENTER</h1>
      
      {/* We pass the imported JSON data directly to the menu */}
      <RadialMenu items={menuData} />
    </div>
  );
}

export default App;