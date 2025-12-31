import { useState } from 'react'
import RadialMenu from './components/RadialMenu'
import Galaxy from './components/Galaxy'
import ToggleSwitch from './components/ToggleSwitch' // Import the new component
import './App.css'

function App() {
  const [viewMode, setViewMode] = useState('2d');

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* SKEUOMORPHIC SWITCH */}
      <ToggleSwitch 
        is3D={viewMode === '3d'} 
        onToggle={() => setViewMode(viewMode === '2d' ? '3d' : '2d')}
      />

      {/* VIEW LOGIC */}
      {viewMode === '2d' ? (
        <RadialMenu />
      ) : (
        <Galaxy />
      )}
      
    </div>
  )
}

export default App