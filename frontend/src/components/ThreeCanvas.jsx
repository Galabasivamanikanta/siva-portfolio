import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/sound';

export default function ThreeCanvas({ isIntroDone }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, isIntroDone ? 12 : 22);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Create a circular soft glow star texture dynamically
    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(186, 230, 253, 0.8)');
      gradient.addColorStop(0.5, 'rgba(96, 165, 250, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const starTexture = createStarTexture();

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 3, 40);
    blueLight.position.set(10, 10, 10);
    scene.add(blueLight);

    // 3. Natural Astronomical Twinkling Starfield (3000 Stars)
    const starCount = 3000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starPhases = new Float32Array(starCount);

    const colorPalette = [
      new THREE.Color('#ffffff'), // White star
      new THREE.Color('#93c5fd'), // Soft blue star
      new THREE.Color('#c4b5fd'), // Soft purple star
      new THREE.Color('#fef08a'), // Soft warm yellow star
      new THREE.Color('#f472b6')  // Pink star
    ];

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;

      starPhases[i] = Math.random() * Math.PI * 2;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.16,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Dynamic Shooting Stars ("Thoka Chukalu") Engine
    const shootingStarCount = 6;
    const shootingStars = [];

    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = (Math.random() - 0.5) * 45;
        this.y = Math.random() * 20 + 12;
        this.z = (Math.random() - 0.5) * 15;
        this.length = Math.random() * 3 + 2;
        this.speed = Math.random() * 0.4 + 0.25;
        this.opacity = Math.random() * 0.85 + 0.3;

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array([
          this.x, this.y, this.z,
          this.x - this.length, this.y + this.length * 0.6, this.z
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.LineBasicMaterial({
          color: 0x93c5fd,
          transparent: true,
          opacity: this.opacity,
          blending: THREE.AdditiveBlending
        });

        this.line = new THREE.Line(geometry, material);
        scene.add(this.line);
      }

      update() {
        this.x += this.speed * 1.3;
        this.y -= this.speed * 0.75;

        if (this.y < -25 || this.x > 35) {
          scene.remove(this.line);
          this.reset();
        } else {
          const positions = this.line.geometry.attributes.position.array;
          positions[0] = this.x;
          positions[1] = this.y;
          positions[2] = this.z;
          positions[3] = this.x - this.length;
          positions[4] = this.y + this.length * 0.6;
          positions[5] = this.z;
          this.line.geometry.attributes.position.needsUpdate = true;
        }
      }
    }

    for (let i = 0; i < shootingStarCount; i++) {
      shootingStars.push(new ShootingStar());
    }

    // Click Impulse
    const handleClick = () => {
      sound.playClick();
      if (starField) {
        starField.scale.set(1.1, 1.1, 1.1);
        setTimeout(() => starField.scale.set(1, 1, 1), 250);
      }
    };
    window.addEventListener('click', handleClick);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Natural Star Twinkling
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const targetZ = isIntroDone ? 12 : 22;
      camera.position.z += (targetZ - camera.position.z) * 0.03;
      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      // Natural twinkling opacity oscillation
      starMat.opacity = 0.75 + Math.sin(elapsedTime * 2) * 0.15;
      starField.rotation.y += 0.0002;
      starField.rotation.x += 0.0001;

      // Update shooting stars
      shootingStars.forEach((star) => star.update());

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isIntroDone]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}
