import React from 'react';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Box } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

const OpenBibleModel = ({ colors, yapSize = 'standard' }) => {
  const yapSizeMap = {
    'standard': 0,
    'half': 0.2,
    'full': 0.4
  };
  const yapValue = yapSizeMap[yapSize] || 0;
  const bibleRef = useRef();

  // Define the angle for the open book (120 degrees)
  const openAngle = Math.PI * 2/3;
  const halfAngle = openAngle / 2;

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [-3, 3, 7], fov: 50 }} style={{ background: '#c0c0c0', width: '100%', height: '100%' }}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <group ref={bibleRef}>
        {/* Left Pages */}
        {Array.from({ length: 50 }).map((_, index) => {
          const randomHeight = 3.2 + (Math.random() - 0.5) * 0.02;
          const randomWidth = 2 + (Math.random() - 0.5) * 0.01;
          const sliceThickness = 0.4 / 50;
          const zOffset = -1.5 + index * sliceThickness * 1;
          const rotationY = -openAngle * 1.4;

          return (
            <Box 
              key={`left-${index}`}
              args={[randomWidth, randomHeight, sliceThickness]} 
              position={[-1 + (0.025 / 2) - (index * sliceThickness), 0, -zOffset * Math.sin(openAngle * 1.4)]} 
              rotation={[0, rotationY, 0]}
              castShadow 
              receiveShadow
            >
              <meshPhysicalMaterial 
                color={'555555'} 
                roughness={0} 
                metalness={0}
                clearcoat={0}
                clearcoatRoughness={0}
              />
            </Box>
          );
        })}

        {/* Right Pages */}
        {Array.from({ length: 50 }).map((_, index) => {
          const randomHeight = 3.2 + (Math.random() - 0.5) * 0.02;
          const randomWidth = 2 + (Math.random() - 0.5) * 0.01;
          const sliceThickness = 0.4 / 50;
          const zOffset = -1.5 + index * sliceThickness * 1;
          const rotationY = openAngle * 1.4;

          return (
            <Box 
              key={`right-${index}`}
              args={[randomWidth, randomHeight, sliceThickness]} 
              position={[1 - (0.025 / 2) + (index * sliceThickness), 0, -zOffset * Math.sin(openAngle * 1.4)]} 
              rotation={[0, rotationY, 0]}
              castShadow 
              receiveShadow
            >
              <meshPhysicalMaterial 
                color={'555555'} 
                roughness={0} 
                metalness={0}
                clearcoat={0}
                clearcoatRoughness={0}
              />
            </Box>
          );
        })}

        {/* Leather cover outer - left panel */}
        <animated.mesh position={[-1.3 - yapValue * 0.2, 0, 0.15]} rotation={[0, -openAngle * 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.45 + yapValue * 0.5, 3.45 + yapValue, 0.1]} />
          <meshPhysicalMaterial 
            color={colors['outer-leather']} 
            roughness={0.7} 
            metalness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.8}
          />
        </animated.mesh>

        {/* Leather cover outer - right panel */}
        <animated.mesh position={[1.3 + yapValue * 0.2, 0, 0.15]} rotation={[0, openAngle * 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.45 + yapValue * 0.5, 3.45 + yapValue, 0.1]} />
          <meshPhysicalMaterial 
            color={colors['outer-leather']} 
            roughness={0.7} 
            metalness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.8}
          />
        </animated.mesh>

        {/* Leather cover inner - left panel */}
        <animated.mesh position={[-1.3, 0, 0.2]} rotation={[0, -openAngle * 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.3, 3.35, 0.025]} />
          <meshPhysicalMaterial 
            color={colors['inner-leather']} 
            roughness={0.6} 
            metalness={0.1}
            clearcoat={0.2}
            clearcoatRoughness={0.6}
          />
        </animated.mesh>

        {/* Leather cover inner - right panel */}
        <animated.mesh position={[1.3, 0, 0.2]} rotation={[0, openAngle * 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.3, 3.35, 0.025]} />
          <meshPhysicalMaterial 
            color={colors['inner-leather']} 
            roughness={0.6} 
            metalness={0.1}
            clearcoat={0.2}
            clearcoatRoughness={0.6}
          />
        </animated.mesh>

        {/* Spine (curved when open) */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 3.45 + yapValue, 32, 1, true, openAngle, openAngle]} />
          <meshPhysicalMaterial 
            color={colors['outer-leather']} 
            roughness={0.7} 
            metalness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.8}
            side={2}
          />
        </mesh>

        {/* Ribbons */}
        <group rotation={[0, -openAngle * 1.4, 0]}>
          <Box args={[0.3, 2, 0.01]} position={[0.5, -2.1, 0]} castShadow receiveShadow>
            <meshPhysicalMaterial
              color={colors['ribbon-1']}
              roughness={0.5}
              metalness={0.1}
              clearcoat={0.3}
              clearcoatRoughness={0.4}
            />
          </Box>
        </group>

        <group rotation={[0, openAngle * 1.4, 0]}>
          <Box args={[0.3, 2, 0.01]} position={[-0.5, -2.1, 0]} castShadow receiveShadow>
            <meshPhysicalMaterial
              color={colors['ribbon-2']}
              roughness={0.5}
              metalness={0.1}
              clearcoat={0.3}
              clearcoatRoughness={0.4}
            />
          </Box>
        </group>

        <group rotation={[0, openAngle * 1.4, 0]}>
          <Box args={[0.3, 2, 0.01]} position={[-0.75, -2.1, 0.05]} castShadow receiveShadow>
            <meshPhysicalMaterial
              color={colors['ribbon-3']}
              roughness={0.5}
              metalness={0.1}
              clearcoat={0.3}
              clearcoatRoughness={0.4}
            />
          </Box>
        </group>
      </group>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI - Math.PI / 4}
      />
    </Canvas>
  );
};

export default OpenBibleModel;