import React from 'react';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, AccumulativeShadows, RandomizedLight, Environment } from '@react-three/drei';
import { Box } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

const BibleModel = ({ colors, yapSize = 'standard', isExploded = false }) => {
  const yapSizeMap = {
    'standard': 0,
    'half': 0.2,
    'full': 0.4
  };
  const yapValue = yapSizeMap[yapSize] || 0;
  const bibleRef = useRef();

  // Define spring animations for exploded view
  const spineSpring = useSpring({
    position: isExploded ? [-1.15 - 1, 0, 0] : [-1.15, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const frontSpring = useSpring({
    position: isExploded ? [0 + yapValue * 0.25, 0, 0.45 + 1] : [0 + yapValue * 0.25, 0, 0.45],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const backSpring = useSpring({
    position: isExploded ? [0 + yapValue * 0.25, 0, -0.45 - 1] : [0 + yapValue * 0.25, 0, -0.45],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const innerSpineSpring = useSpring({
    position: isExploded ? [-1.1 - 0.5, 0, 0] : [-1.1, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const innerFrontSpring = useSpring({
    position: isExploded ? [0.02, 0, 0.4 + 0.5] : [0.02, 0, 0.4],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const innerBackSpring = useSpring({
    position: isExploded ? [0.02, 0, -0.4 - 0.5] : [0.02, 0, -0.4],
    config: { mass: 1, tension: 280, friction: 60 }
  });

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
        {Array.from({ length: 100 }).map((_, index) => {
          const randomHeight = 3.2 + (Math.random() - 0.5) * 0.02;
          const randomWidth = 2.2 + (Math.random() - 0.5) * 0.01;
          const sliceThickness = 0.8 / 100;
          const zOffset = (index - 50) * sliceThickness;

          return (
            <Box 
              key={index}
              args={[randomWidth, randomHeight, sliceThickness]} 
              position={[0, 0, zOffset]} 
              castShadow 
              receiveShadow
            >
              <meshPhysicalMaterial 
                color={colors['guilding']} 
                roughness={0.2} 
                metalness={0.8}
                clearcoat={0.5}
                clearcoatRoughness={0.3}
              />
            </Box>
          );
        })}

        {/* Leather cover outer - spine panel */}
        <animated.mesh position={spineSpring.position} castShadow receiveShadow>
          <boxGeometry args={[0.1, 3.4 + yapValue, 0.8]} />
          <meshPhysicalMaterial 
            color={colors['outer-leather']} 
            roughness={0.7} 
            metalness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.8}
          />
        </animated.mesh>

        {/* Leather cover outer - front panel */}
        <animated.mesh position={frontSpring.position} castShadow receiveShadow>
          <boxGeometry args={[2.4 + yapValue * 0.5, 3.4 + yapValue, 0.1]} />
          <meshPhysicalMaterial 
            color={colors['outer-leather']} 
            roughness={0.7} 
            metalness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.8}
          />
        </animated.mesh>

        {/* Leather cover outer - back panel */}
        <animated.mesh position={backSpring.position} castShadow receiveShadow>
          <boxGeometry args={[2.4 + yapValue * 0.5, 3.4 + yapValue, 0.1]} />
          <meshPhysicalMaterial 
            color={colors['outer-leather']} 
            roughness={0.7} 
            metalness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.8}
          />
        </animated.mesh>

        {/* Leather cover inner - spine panel */}
        <animated.mesh position={innerSpineSpring.position} castShadow receiveShadow>
          <boxGeometry args={[0.025, 3.3, 0.8]} />
          <meshPhysicalMaterial 
            color={colors['inner-leather']} 
            roughness={0.6} 
            metalness={0.1}
            clearcoat={0.2}
            clearcoatRoughness={0.6}
          />
        </animated.mesh>

        {/* Leather cover inner - front panel */}
        <animated.mesh position={innerFrontSpring.position} castShadow receiveShadow>
          <boxGeometry args={[2.25, 3.3, 0.025]} />
          <meshPhysicalMaterial 
            color={colors['inner-leather']} 
            roughness={0.6} 
            metalness={0.1}
            clearcoat={0.2}
            clearcoatRoughness={0.6}
          />
        </animated.mesh>

        {/* Leather cover inner - back panel */}
        <animated.mesh position={innerBackSpring.position} castShadow receiveShadow>
          <boxGeometry args={[2.25, 3.3, 0.025]} />
          <meshPhysicalMaterial 
            color={colors['inner-leather']} 
            roughness={0.6} 
            metalness={0.1}
            clearcoat={0.2}
            clearcoatRoughness={0.6}
          />
        </animated.mesh>

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
