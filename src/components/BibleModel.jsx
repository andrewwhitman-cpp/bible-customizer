import React from 'react';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Box } from '@react-three/drei';

const BibleModel = ({ colors }) => {
  const bibleRef = useRef();

  return (
    <Canvas shadows={false} dpr={[1, 2]} camera={{ position: [4, 2, 4], fov: 50 }} style={{ background: '#f8f8f8', width: '100%', height: '100%' }}>
      <Stage environment="city" intensity={0.8} preset="rembrandt" shadows={false}>
        <group ref={bibleRef}>
          {/* Book block (pages) */}
          <Box args={[2.2, 3.2, 0.8]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color={colors['guilding']} 
              roughness={0.2} 
              metalness={0.8}
            />
          </Box>

          {/* Leather cover outer - spine panel */}
          <Box args={[0.1, 3.6, 0.8]} position={[-1.15, 0, 0]}>
            <meshStandardMaterial 
              color={colors['outer-leather']} 
              roughness={0.9} 
              metalness={0.1}
            />
          </Box>

          {/* Leather cover inner - spine panel */}
          <Box args={[0.025, 3.5, 0.8]} position={[-1.1, 0, 0]}>
            <meshStandardMaterial 
              color={colors['inner-leather']} 
              roughness={0.9} 
              metalness={0.1}
            />
          </Box>

          {/* Leather cover outer - front panel */}
          <Box args={[2.6, 3.6, 0.1]} position={[0.1, 0, 0.45]}>
            <meshStandardMaterial 
              color={colors['outer-leather']} 
              roughness={0.9} 
              metalness={0.1}
            />
          </Box>

          {/* Leather cover inner - front panel */}
          <Box args={[2.5, 3.5, 0.025]} position={[0.1, 0, 0.4]}>
            <meshStandardMaterial 
              color={colors['inner-leather']} 
              roughness={0.9} 
              metalness={0.1}
            />
          </Box>

          {/* Leather cover outer - back panel */}
          <Box args={[2.6, 3.6, 0.1]} position={[0.1, 0, -0.45]}>
            <meshStandardMaterial 
              color={colors['outer-leather']} 
              roughness={0.9} 
              metalness={0.1}
            />
          </Box>

          {/* Leather cover inner - back panel */}
          <Box args={[2.5, 3.5, 0.025]} position={[0.1, 0, -0.4]}>
            <meshStandardMaterial 
              color={colors['inner-leather']} 
              roughness={0.9} 
              metalness={0.1}
            />
          </Box>

          {/* Ribbon 1 */}
          <Box args={[0.3, 2, 0.01]} position={[-0.4, -2.1, 0]}>
            <meshStandardMaterial
              color={colors['ribbon-1']}
              roughness={0.7}
              metalness={0.1}
            />
          </Box>

          {/* Ribbon 2 */}
          <Box args={[0.3, 2, 0.01]} position={[0, -2.1, 0]}>
            <meshStandardMaterial
              color={colors['ribbon-2']}
              roughness={0.7}
              metalness={0.1}
            />
          </Box>

          {/* Ribbon 3 */}
          <Box args={[0.3, 2, 0.01]} position={[0.4, -2.1, 0]}>
            <meshStandardMaterial
              color={colors['ribbon-3']}
              roughness={0.7}
              metalness={0.1}
            />
          </Box>
        </group>
      </Stage>
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
