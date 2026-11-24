import { RoundedBox } from '@react-three/drei'

const navy = '#142b39', cream = '#fefaf0', gold = '#b79858', red = '#a13a1e'
function Box({ at, size, color, radius = 0.006 }: { at: [number, number, number]; size: [number, number, number]; color: string; radius?: number }) {
  return <RoundedBox args={size} position={at} radius={radius} smoothness={2} castShadow receiveShadow><meshStandardMaterial color={color} roughness={0.5} /></RoundedBox>
}
function Cylinder({ at, radius, height, color, front = false }: { at: [number, number, number]; radius: number; height: number; color: string; front?: boolean }) {
  return <mesh position={at} rotation-x={front ? Math.PI / 2 : 0} castShadow receiveShadow><cylinderGeometry args={[radius, radius, height, 32]} /><meshStandardMaterial color={color} roughness={0.4} metalness={color === gold ? 0.5 : 0.1} /></mesh>
}
function Ball({ at, radius, color }: { at: [number, number, number]; radius: number; color: string }) {
  return <mesh position={at} castShadow><sphereGeometry args={[radius, 24, 16]} /><meshStandardMaterial color={color} roughness={0.8} /></mesh>
}

export function InterestObjects() {
  return <>
    {/* Top shelf: camera with a mounted lens, and three upright lenses. */}
    <group position={[0, 1.0775, 0]}>
      <Box at={[-0.13, 0.068, 0.015]} size={[0.21, 0.125, 0.095]} color={navy} />
      <Box at={[-0.12, 0.139, 0.005]} size={[0.07, 0.03, 0.075]} color={navy} />
      <Box at={[-0.215, 0.067, 0.03]} size={[0.028, 0.12, 0.105]} color="#302c28" />
      <Cylinder at={[-0.12, 0.067, 0.095]} radius={0.046} height={0.08} color={navy} front />
      <Cylinder at={[-0.12, 0.067, 0.138]} radius={0.04} height={0.007} color={gold} front />
      <Cylinder at={[-0.12, 0.067, 0.143]} radius={0.033} height={0.007} color="#24566e" front />
      <Ball at={[-0.058, 0.106, 0.065]} radius={0.008} color={red} />
      {[{x:0.045,h:0.15,r:0.034},{x:0.13,h:0.11,r:0.033},{x:0.213,h:0.18,r:0.03}].map(({x,h,r}) => <group key={x}>
        <Cylinder at={[x,h/2,0.01]} radius={r} height={h} color={navy} />
        {[0.025,h-0.025].map(y => <Cylinder key={y} at={[x,y,0.01]} radius={r+0.002} height={0.009} color={gold} />)}
      </group>)}
    </group>
    {/* Second shelf: a turntable, raised transparent lid, LP sleeves and CDs. */}
    <group position={[0,0.7575,0]}>
      <Box at={[-0.105,0.026,0.025]} size={[0.29,0.045,0.25]} color={red} />
      <Cylinder at={[-0.13,0.053,0.03]} radius={0.104} height={0.012} color={navy} />
      <Cylinder at={[-0.13,0.061,0.03]} radius={0.034} height={0.003} color="#f1c166" />
      <Cylinder at={[-0.13,0.065,0.03]} radius={0.004} height={0.012} color={gold} />
      <group position={[0.015,0.075,-0.04]} rotation-y={-0.35}>
        <Box at={[0,0,0.062]} size={[0.008,0.008,0.13]} color={gold} />
        <Box at={[0,0,0.125]} size={[0.017,0.014,0.027]} color={navy} />
      </group>
      <mesh position={[-0.105,0.15,-0.095]} rotation-x={-0.22}>
        <boxGeometry args={[0.29,0.19,0.006]} /><meshPhysicalMaterial color="#c5dfeb" transparent opacity={0.22} roughness={0.1} depthWrite={false} />
      </mesh>
      {[cream,gold,red,navy,'#88b8ce'].map((color,i) => <group key={i} position={[0.093+i*0.027,0.118,-0.01]} rotation-z={-0.09}>
        <Box at={[0,0,0]} size={[0.02,0.235,0.22]} color={color} radius={0.002} />
        <Box at={[0,0.06,0.112]} size={[0.013,0.008,0.002]} color={gold} radius={0.001} />
      </group>)}
      {[0,1,2].map(i => <Box key={i} at={[-0.11,0.008+i*0.009,0.165]} size={[0.15,0.008,0.08]} color={i===1 ? '#88b8ce' : cream} radius={0.001} />)}
    </group>
    {/* Third shelf: shuttlecock, tennis ball, leaning disc, and a pair of shoes. */}
    <group position={[0,0.4375,0]}>
      <group position={[-0.19,0,0.07]}>
        <Ball at={[0,0.019,0]} radius={0.019} color={gold} />
        <mesh position={[0,0.066,0]} rotation-x={Math.PI}><coneGeometry args={[0.041,0.08,16,1,true]} /><meshStandardMaterial color={cream} side={2} /></mesh>
        {Array.from({length:12},(_,i) => <mesh key={i} position={[Math.cos(i*Math.PI/6)*0.022,0.068,Math.sin(i*Math.PI/6)*0.022]} rotation={[Math.sin(i*Math.PI/6)*0.35,0,-Math.cos(i*Math.PI/6)*0.35]}><cylinderGeometry args={[0.002,0.001,0.075,4]} /><meshStandardMaterial color={cream} /></mesh>)}
      </group>
      <Ball at={[-0.085,0.043,0.09]} radius={0.043} color="#d8dc54" />
      <mesh position={[-0.085,0.043,0.09]} rotation={[0.5,0.3,0.5]}><torusGeometry args={[0.0435,0.0014,5,40]} /><meshStandardMaterial color={cream} /></mesh>
      <mesh position={[0.005,0.115,-0.105]} rotation-x={1.25} castShadow><cylinderGeometry args={[0.11,0.11,0.009,48]} /><meshStandardMaterial color={red} /></mesh>
      <mesh position={[0.005,0.115,-0.105]} rotation-x={1.25 - Math.PI / 2}><torusGeometry args={[0.099,0.006,8,40]} /><meshStandardMaterial color="#f1c166" /></mesh>
      {/* Classic insulated bottle: hammertone green, steel neck and cup lid. */}
      <group position={[0.16,0,0.065]}>
        <Cylinder at={[0,0.092,0]} radius={0.047} height={0.17} color="#687b62" />
        <Cylinder at={[0,0.012,0]} radius={0.048} height={0.02} color="#a9aca7" />
        <Cylinder at={[0,0.185,0]} radius={0.038} height={0.022} color="#a9aca7" />
        <Cylinder at={[0,0.218,0]} radius={0.041} height={0.045} color="#687b62" />
        <Cylinder at={[0,0.242,0]} radius={0.041} height={0.005} color="#a9aca7" />
        <Box at={[0.059,0.105,0]} size={[0.014,0.10,0.023]} color="#384c35" />
        {[0.056,0.154].map(y => <Box key={y} at={[0.044,y,0]} size={[0.04,0.012,0.023]} color="#384c35" />)}
        <Box at={[0,0.10,0.047]} size={[0.041,0.035,0.002]} color="#fefaf0" radius={0.002} />
      </group>
    </group>
    {/* Bottom shelf: pan displayed on edge and a stand mixer with steel bowl. */}
    <group position={[0,0.1175,0]}>
      <group position={[-0.16,0.105,-0.035]} rotation-z={-0.45}>
        <Cylinder at={[0,0,0]} radius={0.091} height={0.025} color={navy} front />
        <Cylinder at={[0,0,0.014]} radius={0.079} height={0.003} color="#42413c" front />
        <Box at={[0,0.136,0]} size={[0.029,0.13,0.022]} color={navy} />
        <Box at={[0,0.085,0]} size={[0.022,0.035,0.018]} color={gold} />
      </group>
      <group position={[0.115,0,0.015]}>
        <Box at={[0,0.018,0.01]} size={[0.20,0.035,0.21]} color={cream} radius={0.014} />
        <Box at={[0,0.115,-0.06]} size={[0.064,0.19,0.068]} color={cream} radius={0.018} />
        <Box at={[0,0.208,0.005]} size={[0.095,0.067,0.19]} color={cream} radius={0.025} />
        <Cylinder at={[0,0.092,0.048]} radius={0.067} height={0.10} color="#a9aca7" />
        <Cylinder at={[0,0.145,0.048]} radius={0.063} height={0.005} color={navy} />
        <Cylinder at={[0,0.163,0.048]} radius={0.007} height={0.027} color={gold} />
        <Box at={[0.05,0.21,0.02]} size={[0.006,0.017,0.062]} color={red} radius={0.002} />
      </group>
    </group>
  </>
}
