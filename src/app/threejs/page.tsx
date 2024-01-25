"use client"

import * as THREE from 'three';
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    /**
     * Base
     */
    // Canvas
    const canvas = document.querySelector("canvas.webgl");

    // Scene
    const scene = new THREE.Scene();

    // Material
    const material = new THREE.MeshToonMaterial({ color: "#ffeded" });

    // Meshes
    const doughnutMesh = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
    const coneMesh = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);
    const knotMesh = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
      material
    );

    const objectsDistance = 4;
    doughnutMesh.position.y = -objectsDistance * 0;
    coneMesh.position.y = -objectsDistance * 1;
    knotMesh.position.y = -objectsDistance * 2;
    doughnutMesh.position.x = 2;
    coneMesh.position.x = -2;
    knotMesh.position.x = 2;

    scene.add(doughnutMesh, coneMesh, knotMesh);

    /**
     * Lights
     */
    const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
    directionalLight.position.set(1, 1, 0);
    scene.add(directionalLight);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Group
    const cameraGroup = new THREE.Group();
    scene.add(cameraGroup);
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 6;
    cameraGroup.add(camera);

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true, // transparent background
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Scroll
     */
    let scrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;

      camera.position.y = (-scrollY / sizes.height) * objectsDistance;
    });

    /**
     * Cursor
     */
    const cursor = { x: 0, y: 0 };

    window.addEventListener("mousemove", (event) => {
      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = event.clientY / sizes.height - 0.5;
    });

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    let previousTime = 0;

    const sectionMeshes = [doughnutMesh, coneMesh, knotMesh];

    /**
     * Particles
     */
    // Geometry
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] =
        objectsDistance * 0.5 -
        Math.random() * objectsDistance * sectionMeshes.length;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      color: "#ffeded",
      sizeAttenuation: true,
      size: 0.03,
    });

    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;

      // Animate meshes
      for (const mesh of sectionMeshes) {
        mesh.rotation.x = elapsedTime * 0.1;
        mesh.rotation.y = elapsedTime * 0.12;
      }

      // Animate camera
      camera.position.y = (-scrollY / sizes.height) * objectsDistance;

      const parallaxX = cursor.x * 0.5;
      const parallaxY = -cursor.y * 0.5;

      cameraGroup.position.x +=
        (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
      cameraGroup.position.y +=
        (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return (
    <main>
      <canvas className="webgl"></canvas>

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
