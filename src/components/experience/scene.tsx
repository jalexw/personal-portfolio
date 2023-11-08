"use client";

import { PerspectiveCamera, useAnimations, useGLTF } from "@react-three/drei";
import { useRef, type ReactElement } from "react";
import { Box } from '@react-three/drei'
import { useTime } from "framer-motion";
import { useFrame } from "@react-three/fiber";

export function Scene(): ReactElement {
  // const Penguin = useGLTF('/assets/models/penguin.gltf')
  // const animations = useAnimations(Penguin.animations, Penguin.scene)

  // const model = Penguin.scene.children
  const x = useRef<number>(0)
  const y = useRef<number>(0)
  
  useFrame((time) => {
    const t: number = time.clock.getElapsedTime();
    x.current = Math.sin(t) * 360
    y.current = Math.cos(t) * 360
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[ 0, 0, 0 ]} />
      <Box position={[ 0, 0, -7 ]} rotation={[x.current, y.current, 0]}>
        <meshStandardMaterial color="lightblue" />
      </Box>

      {/* <primitive object={Penguin.scene} /> */}

      <pointLight intensity={75} position={[0, 5, 5]}/>
      <ambientLight intensity={0.4} />
    </>
  )
}