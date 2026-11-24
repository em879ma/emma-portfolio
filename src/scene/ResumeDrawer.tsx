import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Vector3, type Group } from 'three'
import type { Route } from '../route'

export const resumePaper = { element: null as HTMLDivElement | null }
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
export function ResumeDrawer({ route, go }: { route: Route; go: (r: Route) => void }) {
  const group = useRef<Group>(null)
  const point = useRef(new Vector3())
  const open = useRef(0)
  useFrame(({ camera, size }, dt) => {
    open.current = reduced ? (route === 'resume' ? .64 : 0) : MathUtils.damp(open.current, route === 'resume' ? .64 : 0, 3, Math.min(dt, .05))
    if (group.current) group.current.position.z = .389 + open.current
    const el = resumePaper.element
    if (el) {
      const corners = [[.125, .669, .489 + open.current - .60], [.575, .669, .489 + open.current - .02]].map(([x,y,z]) => {
        point.current.set(x,y,z).project(camera)
        return [(point.current.x + 1) * size.width / 2, (1 - point.current.y) * size.height / 2]
      })
      const [a,b] = corners
      el.style.left = `${Math.min(a[0], b[0])}px`; el.style.top = `${Math.min(a[1], b[1])}px`
      el.style.width = `${Math.abs(b[0]-a[0])}px`; el.style.height = `${Math.abs(b[1]-a[1])}px`
    }
  })
  const wood = <meshStandardMaterial color="#673b24" roughness={.55} />
  return <group ref={group} position={[.2,.69,.389]} onClick={(e) => { e.stopPropagation(); go('resume') }}>
    <mesh position={[0,0,0]} castShadow><boxGeometry args={[.56,.058,.018]} />{wood}</mesh>
    <mesh position={[0,.012,.012]}><boxGeometry args={[.16,.008,.005]} /><meshStandardMaterial color="#b79858" metalness={.8} roughness={.3} /></mesh>
    <mesh position={[0,-.03,-.45]} receiveShadow><boxGeometry args={[.55,.014,.90]} /><meshStandardMaterial color="#b79858" roughness={.8} /></mesh>
    {[-.27,.27].map(x => <mesh key={x} position={[x,0,-.45]} castShadow><boxGeometry args={[.014,.065,.90]} />{wood}</mesh>)}
    <mesh position={[0,0,-.90]} castShadow><boxGeometry args={[.55,.065,.014]} />{wood}</mesh>
    <mesh position={[0,-.021,-.31]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.45,.58]} /><meshStandardMaterial color="#fefaf0" /></mesh>
  </group>
}
