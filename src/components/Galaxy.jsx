import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import data from '../data.json';

// A "Placeholder" texture in case an image is missing (prevents crash)
const fallbackImg = "https://placehold.co/64x64/orange/white?text=?";

function Planet({ item, index, total, radius }) {
  const meshRef = useRef();
  
  // 1. Calculate Position
  const angle = (index / total) * Math.PI * 2;
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  // 2. SAFETY CHECK: Use the image if it exists, otherwise use fallback
  const imgUrl = item.img ? item.img : fallbackImg;
  
  // 3. Load texture (Safe now)
  const texture = useLoader(THREE.TextureLoader, imgUrl);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group position={[x, 0, z]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
          <meshStandardMaterial 
            map={texture} 
            metalness={0.6} 
            roughness={0.2} 
          />
        </mesh>
        
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {item.label}
        </Text>
      </Float>
    </group>
  );
}

function Sun() {
    return (
        <mesh>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="#ffaa00" emissive="#ff0000" emissiveIntensity={2} />
        </mesh>
    )
}

export default function Galaxy() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas camera={{ position: [0, 15, 20], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <OrbitControls enableZoom={true} minDistance={5} maxDistance={50} />

        <Sun />

        {data.map((item, index) => (
          // WRAP IN SUSPENSE: This handles the async loading without crashing
          <React.Suspense fallback={null} key={item.id || index}>
             <Planet 
                item={item} 
                index={index} 
                total={data.length} 
                radius={8} 
             />
          </React.Suspense>
        ))}
      </Canvas>
    </div>
  );
}