"use client"

import { Canvas, MeshProps, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { BufferAttribute, Group, Mesh as MeshType } from 'three';

const Mesh = (props: MeshProps) => {
  const meshRef = useRef<MeshType | null>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Rotate objects
    meshRef.current!.rotation.x = elapsedTime * 0.1;
    meshRef.current!.rotation.y = elapsedTime * 0.12;
  })

  return (
    <mesh {...props} ref={meshRef} />
  )
}

const objectsDistance = 4;

const Particles = ({ count = 200 }: { count?: number }) => {
  const points = useMemo(() => {
    // const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 20);
    // return new BufferAttribute(new Float32Array(p), 3);
    const positions = new Float32Array(count * 3);
    const amountOfScrollSections = 3;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] =
        objectsDistance * 0.5 -
        Math.random() * objectsDistance * amountOfScrollSections;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return new BufferAttribute(positions, 3);
  }, [count]);
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...points} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffeded"
        sizeAttenuation={true}
      />
    </points>
  )
}

export const ObjectGroup = () => {
  const previousTime = useRef(0);
  const scrollY = useRef(0);
  const sizes = useRef({ width: 0, height: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const groupRef = useRef<Group | null>(null);

  useEffect(() => {
    scrollY.current = window.scrollY;

    window.addEventListener("scroll", () => {
      scrollY.current = window.scrollY;
    })

    window.addEventListener("mousemove", (event) => {
      cursor.current.x = event.clientX / sizes.current.width - 0.5;
      cursor.current.y = event.clientY / sizes.current.height - 0.5;
    });

    return () => {
      window.removeEventListener("scroll", () => {})
      window.removeEventListener("mousemove", () => {})
    }
  }, [])

  useFrame(({ clock, camera, size }) => {
    sizes.current.width = size.width;
    sizes.current.height = size.height;

    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime.current;
    previousTime.current = elapsedTime;

    // move camera so canvas is scrolling with page
    camera.position.y = (-scrollY.current / size.height) * objectsDistance;

    // move camera so canvas is following mouse
    const parallaxX = cursor.current.x * 0.5;
    const parallaxY = -cursor.current.y * 0.5;
    groupRef.current!.position.x += (parallaxX - groupRef.current!.position.x) * 5 * deltaTime;
    groupRef.current!.position.y += (parallaxY - groupRef.current!.position.y) * 5 * deltaTime;
    // groupRef.current!.position.z = scrollY.current * 0.001;
  })

  return (
    <group ref={groupRef}>
      <Mesh position={[2, -objectsDistance * 0, 0]}>
        <torusGeometry args={[1, 0.4, 16, 60]} />
        <meshToonMaterial color='#ffeded' />
      </Mesh>

      <Mesh position={[-2, -objectsDistance * 1, 0]}>
        <coneGeometry args={[1, 2, 32]} />
        <meshToonMaterial color='#ffeded' />
      </Mesh>

      <Mesh position={[2, -objectsDistance * 2, 0]}>
        <torusKnotGeometry args={[0.8, 0.35, 100, 16]} />
        <meshToonMaterial color='#ffeded' />
      </Mesh>
      <Particles />
    </group>
  );
}

export default function Home() {
  return (
    <main>
      <Canvas
        style={{ position: 'fixed', top: 0, left: 0 }}
        // This stops particles from being rendered but removes perspective warp
        // orthographic
        // camera={{ position: [0, 0, 3], left: 0, top: 0, right: 0, bottom: 0, zoom: 200 }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        {/* <perspectiveCamera position={[0, 0, 5]} /> */}
        <directionalLight position={[1, 1, 0]} />
        <ObjectGroup />
      </Canvas>

      <section className="section">
          <h1>My Portfolio</h1>
      </section>
      <section className="section">
          <h2>My projects</h2>
      </section>
      <section className="section">
          <h2>Contact me</h2>
      </section>
    </main>
  );
}
