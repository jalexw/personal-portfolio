"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useRef, type ReactElement } from "react";
import { Box } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";

export function Scene(): ReactElement {
  // const model = Penguin.scene.children
  const cubeRef = useRef<any>()
  
  useFrame(({ clock }) => {
    const t: number = clock.getElapsedTime();
    if (!cubeRef.current) {
      return;
    }
    cubeRef.current.rotation.x = Math.sin(t / 180) * 360
    cubeRef.current.rotation.y = Math.cos(t / 180) * 360
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[ 0, 0, 0 ]} />
      {/* <mesh ref={cubeRef}>
        <boxGeometry  />
        <meshStandardMaterial color="lightblue" />
      </mesh> */}
      <Box
        position={[ 0, 0, -6 ]}
        ref={cubeRef}
      >
        <meshStandardMaterial color="red" />
      </Box>

      {/* <primitive object={Penguin.scene} /> */}

      <pointLight intensity={90} position={[0, 5, 5]}/>
      <ambientLight intensity={0.4} />
    </>
  )
}