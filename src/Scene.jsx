import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MathUtils } from 'three'

function World({ entered }) {
  const g = useRef(), core = useRef(), r1 = useRef(), r2 = useRef(), pts = useRef()
  const boost = useRef(1)
  const { size } = useThree()
  const N = 1600
  const pos = useMemo(() => {
    const a = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 4 + Math.random() * 11, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1)
      a[i * 3] = r * Math.sin(p) * Math.cos(t)
      a[i * 3 + 1] = r * Math.sin(p) * Math.sin(t)
      a[i * 3 + 2] = r * Math.cos(p)
    }
    return a
  }, [])

  useEffect(() => { if (entered) boost.current = 9 }, [entered])

  useFrame((s, dt) => {
    boost.current = MathUtils.damp(boost.current, 1, 1.4, dt)
    const wide = size.width > 900
    g.current.position.x = MathUtils.damp(g.current.position.x, wide ? 2.7 : 0, 3, dt)
    g.current.rotation.y = MathUtils.damp(g.current.rotation.y, s.pointer.x * 0.5, 3, dt)
    g.current.rotation.x = MathUtils.damp(g.current.rotation.x, -s.pointer.y * 0.3, 3, dt)
    core.current.rotation.y += dt * 0.25 * boost.current
    core.current.rotation.x += dt * 0.1 * boost.current
    r1.current.rotation.z += dt * 0.3 * boost.current
    r2.current.rotation.x += dt * 0.25 * boost.current
    pts.current.rotation.y += dt * 0.02 * boost.current
    s.camera.position.z = MathUtils.damp(s.camera.position.z, entered ? 6.8 : 9.5, 2.2, dt)
  })

  return (
    <>
      <group ref={g}>
        <mesh ref={core}><icosahedronGeometry args={[1.5, 1]} /><meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.55} /></mesh>
        <mesh><icosahedronGeometry args={[1.1, 2]} /><meshBasicMaterial color="#7c3aed" transparent opacity={0.28} /></mesh>
        <mesh ref={r1}><torusGeometry args={[2.6, 0.012, 16, 200]} /><meshBasicMaterial color="#00e5ff" /></mesh>
        <mesh ref={r2} rotation={[1.2, 0, 0]}><torusGeometry args={[3.1, 0.012, 16, 200]} /><meshBasicMaterial color="#a855f7" /></mesh>
      </group>
      <points ref={pts}>
        <bufferGeometry><bufferAttribute attach="attributes-position" count={N} array={pos} itemSize={3} /></bufferGeometry>
        <pointsMaterial size={0.03} color="#9ee7ff" transparent opacity={0.7} />
      </points>
    </>
  )
}

export default function Scene({ entered }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9.5], fov: 55 }} gl={{ alpha: true, antialias: true }}
      style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
      <World entered={entered} />
    </Canvas>
  )
}
