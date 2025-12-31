import { useState } from 'react'
import RadialMenu from './components/RadialMenu'
import Galaxy from './components/Galaxy'
import ToggleSwitch from './components/ToggleSwitch'
import './App.css'

function App() {
  const [viewMode, setViewMode] = useState('2d');

  return (
    // Container handles the full screen background
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#333' }}>
      
      {/* 1. TOGGLE SWITCH: It is OUTSIDE the condition, so it always exists */}
      <ToggleSwitch 
        is3D={viewMode === '3d'} 
        onToggle={() => setViewMode(viewMode === '2d' ? '3d' : '2d')}
      />

      {/* 2. CONDITIONAL VIEWS */}
      {viewMode === '2d' ? (
        <RadialMenu />  /* No props needed now, it imports data internally */
      ) : (
        <Galaxy />
      )}
      
    </div>
  )
}

export default App