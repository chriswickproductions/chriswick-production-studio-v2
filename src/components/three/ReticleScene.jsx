import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { usePerformanceTier } from '../../hooks/usePerformanceTier.js'

function Reticle({ tier }) {
  const group = useRef()
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d43150', emissive: '#5b061b', emissiveIntensity: 1.45, metalness: 0.88, roughness: 0.18,
  }), [])
  const pale = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#f3efe6', emissive: '#29272c', emissiveIntensity: 0.42, metalness: 0.72, roughness: 0.24,
  }), [])

  useFrame((state) => {
    if (!group.current || tier === 'reduced') return
    const t = state.clock.getElapsedTime()
    const pointerStrength = tier === 'high' ? 0.32 : 0.14
    group.current.rotation.z = t * (tier === 'high' ? 0.12 : 0.065)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * pointerStrength, 0.035)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * pointerStrength, 0.035)
    group.current.position.y = Math.sin(t * 0.8) * (tier === 'high' ? 0.085 : 0.035)
  })

  return (
    <group ref={group}>
      <mesh material={material}>
        <torusGeometry args={[1.62, 0.052, 18, tier === 'high' ? 196 : 100]} />
      </mesh>
      <mesh material={pale}>
        <torusGeometry args={[0.72, 0.021, 12, 96]} />
      </mesh>
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((rotation, index) => (
        <group rotation={[0, 0, rotation]} key={index}>
          <mesh position={[0, 1.92, 0]} material={material}>
            <boxGeometry args={[0.085, 0.54, 0.085]} />
          </mesh>
        </group>
      ))}
      <mesh position={[-0.22, 0, 0.05]} rotation={[0, 0, 0.02]} material={pale}>
        <torusGeometry args={[0.49, 0.085, 14, 70, Math.PI * 1.45]} />
      </mesh>
      <group position={[0.34, 0, 0.06]}>
        {[[-0.33, 0.35], [-0.13, -0.38], [0.08, 0.08], [0.29, -0.38], [0.49, 0.35]].slice(0, -1).map((point, i) => {
          const next = [[-0.33, 0.35], [-0.13, -0.38], [0.08, 0.08], [0.29, -0.38], [0.49, 0.35]][i + 1]
          const x = (point[0] + next[0]) / 2
          const y = (point[1] + next[1]) / 2
          const dx = next[0] - point[0]
          const dy = next[1] - point[1]
          const len = Math.hypot(dx, dy)
          return <mesh key={i} position={[x, y, 0]} rotation={[0, 0, Math.atan2(dy, dx) - Math.PI / 2]} material={pale}><boxGeometry args={[0.11, len, 0.09]} /></mesh>
        })}
      </group>
      <mesh position={[0, 0, 0.16]}>
        <sphereGeometry args={[0.085, 22, 22]} />
        <meshStandardMaterial color="#d7b36a" emissive="#8d5e13" emissiveIntensity={2.5} />
      </mesh>
    </group>
  )
}

export default function ReticleScene() {
  const tier = usePerformanceTier()
  if (tier === 'reduced') {
    return <div className="reticle-fallback"><div className="fallback-ring"><span>CW</span></div></div>
  }
  return (
    <Canvas
      dpr={tier === 'high' ? [1, 1.7] : [1, 1.2]}
      camera={{ position: [0, 0, 5.6], fov: 39 }}
      gl={{ antialias: tier === 'high', powerPreference: 'high-performance', alpha: true }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[3.8, 4.5, 5]} intensity={4.1} />
      <pointLight position={[-3, -1, 3]} intensity={tier === 'high' ? 31 : 16} color="#d43150" distance={12} />
      <pointLight position={[2.4, 2.2, 2.8]} intensity={10} color="#d7b36a" distance={8} />
      <Reticle tier={tier} />
    </Canvas>
  )
}
