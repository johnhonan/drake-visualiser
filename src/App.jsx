import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Globe() {
  const meshRef = useRef()
  const earthTex = useTexture('/earth.png', (t) => {
    if (Array.isArray(t)) return
    t.anisotropy = 8
    t.wrapS = t.wrapT = THREE.RepeatWrapping
  })

  useFrame((_, dt) => {
    if (meshRef.current) meshRef.current.rotation.y += dt * 0.05
  })

  const hasTexture = earthTex && earthTex.image

  return (
    <group ref={meshRef}>
      <Sphere args={[1, 128, 128]}>
        {hasTexture ? (
          <meshStandardMaterial map={earthTex} roughness={1} metalness={0} />
        ) : (
          <meshStandardMaterial color="#4f83ff" roughness={1} metalness={0} />
        )}
      </Sphere>
    </group>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Globe />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          zoomSpeed={0.8}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  )
}
