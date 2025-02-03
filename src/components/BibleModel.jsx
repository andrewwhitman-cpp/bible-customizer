import React from 'react';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, AccumulativeShadows, RandomizedLight, Environment } from '@react-three/drei';
import { Box } from '@react-three/drei';

const BibleModel = ({ colors, yapSize = 'standard' }) => {
  const yapSizeMap = {
    'standard': 0,
    'half': 0.2,
    'full': 0.4
  };
  const yapValue = yapSizeMap[yapSize] || 0;
  const bibleRef = useRef();

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 2, 4], fov: 50 }} style={{ background: '#c0c0c0', width: '100%', height: '100%' }}>
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
        {/* Book block (pages) */}
        <Box args={[2.2, 3.2, 0.8]} position={[0, 0, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color={colors['guilding']} 
            roughness={0.2} 
            metalness={0.8}
            clearcoat={0.5}
            clearcoatRoughness={0.3}
          />
        </Box>

        {/* Leather cover outer - spine panel */}
        <Box args={[0.1, 3.4 + yapValue, 0.8]} position={[-1.15, 0, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color={colors['outer-leather']} 
            roughness={0.7} 
            metalness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.8}
          />
        </Box>

        {/* Leather cover outer - front panel */}
        <Box args={[2.4 + yapValue * 0.5, 3.4 + yapValue, 0.1]} position={[0 + yapValue * 0.25, 0, 0.45]} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color={colors['outer-leather']} 
            roughness={0.7} 
            metalness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.8}
          />
        </Box>

        {/* Leather cover outer - back panel */}
        <Box args={[2.4 + yapValue * 0.5, 3.4 + yapValue, 0.1]} position={[0 + yapValue * 0.25, 0, -0.45]} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color={colors['outer-leather']} 
            roughness={0.7} 
            metalness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.8}
          />
        </Box>

        {/* Leather cover inner - spine panel */}
        <Box args={[0.025, 3.3, 0.8]} position={[-1.1, 0, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color={colors['inner-leather']} 
            roughness={0.6} 
            metalness={0.1}
            clearcoat={0.2}
            clearcoatRoughness={0.6}
          />
        </Box>

        {/* Leather cover inner - front panel */}
        <Box args={[2.25, 3.3, 0.025]} position={[0.02, 0, 0.4]} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color={colors['inner-leather']} 
            roughness={0.6} 
            metalness={0.1}
            clearcoat={0.2}
            clearcoatRoughness={0.6}
          />
        </Box>

        {/* Leather cover inner - back panel */}
        <Box args={[2.25, 3.3, 0.025]} position={[0.02, 0, -0.4]} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color={colors['inner-leather']} 
            roughness={0.6} 
            metalness={0.1}
            clearcoat={0.2}
            clearcoatRoughness={0.6}
          />
        </Box>

        {/* Ribbon 1 */}
        <Box args={[0.3, 2, 0.01]} position={[-0.4, -2.1, 0.1]} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={colors['ribbon-1']}
            roughness={0.5}
            metalness={0.1}
            clearcoat={0.3}
            clearcoatRoughness={0.4}
          />
        </Box>

        {/* Ribbon 2 */}
        <Box args={[0.3, 2, 0.01]} position={[0, -2.1, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={colors['ribbon-2']}
            roughness={0.5}
            metalness={0.1}
            clearcoat={0.3}
            clearcoatRoughness={0.4}
          />
        </Box>

        {/* Ribbon 3 */}
        <Box args={[0.3, 2, 0.01]} position={[0.4, -2.1, -0.1]} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={colors['ribbon-3']}
            roughness={0.5}
            metalness={0.1}
            clearcoat={0.3}
            clearcoatRoughness={0.4}
          />
        </Box>
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

export default BibleModel;
