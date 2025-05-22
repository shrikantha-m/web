import { Injectable, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThreeDService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private leaves: THREE.Mesh[] = [];
  private particles: THREE.Points[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // * 3D SCENE SETUP
  // ! IMPORTANT: Canvas must be properly sized in the parent component
  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // * Skip creation if not in browser environment
    if (!this.isBrowser) {
      return;
    }

    // * Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = null; // Transparent background

    // * Camera setup
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
    this.camera.position.z = 5;

    // * Initialize renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas.nativeElement,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0); // Transparent

    // * Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    // * Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(-1, 2, 4);
    this.scene.add(directionalLight);

    // * Add point light
    const pointLight = new THREE.PointLight(0x00a550, 1.5, 10);
    pointLight.position.set(2, 1, 4);
    this.scene.add(pointLight);

    // * Add second point light
    const orangeLight = new THREE.PointLight(0xff7415, 1.5, 10);
    orangeLight.position.set(-2, -1, 4);
    this.scene.add(orangeLight);

    // * Create 3D elements
    this.createLeaves();
    this.createParticles();

    // * Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  // * RESIZE HANDLER
  private onWindowResize(): void {
    if (!this.isBrowser) {
      return;
    }

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // * CREATE 3D LEAVES FOR CROPFRESH LOGO
  private createLeaves(): void {
    // * Create orange leaf
    const orangeLeafGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100, Math.PI);
    const orangeMaterial = new THREE.MeshStandardMaterial({
      color: 0xff7415, // CropFresh orange
      roughness: 0.3,
      metalness: 0.5,
      emissive: 0xff7415,
      emissiveIntensity: 0.15
    });
    const orangeLeaf = new THREE.Mesh(orangeLeafGeometry, orangeMaterial);
    orangeLeaf.rotation.z = Math.PI / 4;
    orangeLeaf.position.x = -0.7;
    orangeLeaf.position.y = -0.2;
    this.scene.add(orangeLeaf);
    this.leaves.push(orangeLeaf);

    // * Create green leaf
    const greenLeafGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100, Math.PI);
    const greenMaterial = new THREE.MeshStandardMaterial({
      color: 0x00a550, // CropFresh green
      roughness: 0.3,
      metalness: 0.5,
      emissive: 0x00a550,
      emissiveIntensity: 0.15
    });
    const greenLeaf = new THREE.Mesh(greenLeafGeometry, greenMaterial);
    greenLeaf.rotation.z = -Math.PI / 4;
    greenLeaf.position.x = 0.7;
    greenLeaf.position.y = -0.2;
    this.scene.add(greenLeaf);
    this.leaves.push(greenLeaf);

    // * Create top leaf bud
    const budGeometry = new THREE.ConeGeometry(0.4, 0.8, 32);
    const budMaterial = new THREE.MeshStandardMaterial({
      color: 0x00a550,
      roughness: 0.3,
      metalness: 0.5,
      emissive: 0x00a550,
      emissiveIntensity: 0.2
    });
    const bud = new THREE.Mesh(budGeometry, budMaterial);
    bud.position.y = 1;
    bud.rotation.z = Math.PI;
    this.scene.add(bud);
    this.leaves.push(bud);

    // Create additional decorative elements
    this.createDecorativeLeaves();
  }

  // Create smaller decorative leaves
  private createDecorativeLeaves(): void {
    // Create several small leaves in different positions
    for (let i = 0; i < 5; i++) {
      // Alternate between green and orange
      const color = i % 2 === 0 ? 0x00a550 : 0xff7415;
      const emissive = i % 2 === 0 ? 0x00a550 : 0xff7415;

      const leafGeometry = new THREE.TorusGeometry(0.4, 0.1, 16, 60, Math.PI);
      const leafMaterial = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.4,
        metalness: 0.3,
        emissive: emissive,
        emissiveIntensity: 0.1
      });

      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);

      // Random position within visible area
      leaf.position.x = (Math.random() - 0.5) * 6;
      leaf.position.y = (Math.random() - 0.5) * 6;
      leaf.position.z = Math.random() * -2;

      // Random rotation
      leaf.rotation.x = Math.random() * Math.PI;
      leaf.rotation.y = Math.random() * Math.PI;
      leaf.rotation.z = Math.random() * Math.PI;

      // Random scale
      const scale = 0.2 + Math.random() * 0.4;
      leaf.scale.set(scale, scale, scale);

      this.scene.add(leaf);
      this.leaves.push(leaf);
    }
  }

  // Create particle effects
  private createParticles(): void {
    const particleCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Create color palette from CropFresh colors
    const colorOptions = [
      new THREE.Color(0x00a550), // CropFresh green
      new THREE.Color(0xff7415), // CropFresh orange
      new THREE.Color(0xffffff), // White
    ];

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a sphere
      const radius = 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Assign random color from palette
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    this.scene.add(particleSystem);
    this.particles.push(particleSystem);
  }

  // * ANIMATION LOOP
  animate(): void {
    if (!this.isBrowser) {
      return;
    }

    requestAnimationFrame(() => this.animate());

    // * Animate leaves with subtle floating motion
    this.leaves.forEach((leaf, index) => {
      leaf.rotation.z += 0.002 * (index % 2 === 0 ? 1 : -1);
      leaf.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
      // Add slight rotation on other axes for more dynamic movement
      leaf.rotation.x += 0.0005 * Math.sin(Date.now() * 0.0002);
      leaf.rotation.y += 0.0003 * Math.cos(Date.now() * 0.0003);
    });

    // Animate particle systems
    this.particles.forEach((particles, index) => {
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;
    });

    this.renderer.render(this.scene, this.camera);
  }
}
