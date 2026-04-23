"use client"

import { useRef, useMemo } from "react"
import { useFrame, Canvas } from "@react-three/fiber"
import * as THREE from "three"

// Advanced Mesh Gradient Shader
const meshVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const meshFragmentShader = `
  uniform float time;
  uniform vec3 colors[4];
  varying vec2 vUv;

  vec3 mixColors(vec2 uv, float time) {
    float t = time * 0.2;
    
    // Distort UVs
    vec2 distort = uv;
    distort.x += sin(uv.y * 5.0 + t) * 0.1;
    distort.y += cos(uv.x * 5.0 + t) * 0.1;
    
    float w1 = sin(distort.x * 2.0 + t) * 0.5 + 0.5;
    float w2 = cos(distort.y * 3.0 - t * 1.5) * 0.5 + 0.5;
    
    vec3 c1 = mix(colors[0], colors[1], w1);
    vec3 c2 = mix(colors[2], colors[3], w2);
    
    return mix(c1, c2, (w1 + w2) * 0.5);
  }

  void main() {
    vec3 color = mixColors(vUv, time);
    
    // Add subtle grain/noise
    float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.05;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

// Dot Orbit Shader
const dotVertexShader = `
  uniform float time;
  uniform float speed;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const dotFragmentShader = `
  uniform float time;
  uniform vec3 dotColor;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv * 40.0; // Density
    vec2 grid = fract(uv) - 0.5;
    vec2 id = floor(uv);
    
    // Orbit motion
    float t = time * 0.5;
    vec2 offset = vec2(sin(t + id.y * 0.5), cos(t + id.x * 0.5)) * 0.3;
    
    float dist = length(grid - offset);
    float mask = smoothstep(0.1, 0.05, dist);
    
    gl_FragColor = vec4(dotColor, mask * 0.3);
  }
`

export function MeshGradient({ colors = ["#000000", "#1a1a1a", "#333333", "#ffffff"] }: { colors?: string[] }) {
  const mesh = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    colors: { value: colors.map(c => new THREE.Color(c)) }
  }), [colors])

  useFrame((state) => {
    if (mesh.current) {
      uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={meshVertexShader}
        fragmentShader={meshFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export function DotOrbit({ color = "#ffffff" }: { color?: string }) {
  const mesh = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    dotColor: { value: new THREE.Color(color) }
  }), [color])

  useFrame((state) => {
    if (mesh.current) {
      uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0.1]}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={dotVertexShader}
        fragmentShader={dotFragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

export function PaperBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <MeshGradient colors={["#000000", "#0a0a0a", "#111111", "#1a1a1a"]} />
        <DotOrbit color="#333333" />
      </Canvas>
    </div>
  )
}
