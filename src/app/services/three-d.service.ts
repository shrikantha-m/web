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
  private fallingLeaves: THREE.Mesh[] = [];
  private particles: THREE.Points[] = [];
  private isBrowser: boolean;
  private mouse: THREE.Vector2 = new THREE.Vector2();
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private targetRotation: THREE.Vector2 = new THREE.Vector2(0, 0);
  private clock: THREE.Clock = new THREE.Clock();

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
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(-1, 2, 4);
    this.scene.add(directionalLight);

    // * Add point light
    const pointLight = new THREE.PointLight(0x00a550, 2.0, 15);
    pointLight.position.set(2, 1, 4);
    this.scene.add(pointLight);

    // * Add second point light
    const orangeLight = new THREE.PointLight(0xff7415, 2.0, 15);
    orangeLight.position.set(-2, -1, 4);
    this.scene.add(orangeLight);

    // * Create 3D elements
    this.createLeaves();
    this.createFallingLeaves();
    this.createParticles();

    // * Setup mouse interaction
    this.setupMouseInteraction(canvas.nativeElement);

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

  // * SETUP MOUSE INTERACTION
  private setupMouseInteraction(canvas: HTMLCanvasElement): void {
    // Track mouse position for interactive effects
    canvas.addEventListener('mousemove', (event) => {
      // Calculate normalized device coordinates (-1 to +1)
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Set target rotation based on mouse position (subtle effect)
      this.targetRotation.x = this.mouse.y * 0.2;
      this.targetRotation.y = this.mouse.x * 0.2;
    });

    // Add touch support for mobile devices
    canvas.addEventListener('touchmove', (event) => {
      if (event.touches.length > 0) {
        // Calculate normalized device coordinates (-1 to +1)
        this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

        // Set target rotation based on touch position (subtle effect)
        this.targetRotation.x = this.mouse.y * 0.2;
        this.targetRotation.y = this.mouse.x * 0.2;

        // Prevent default to avoid scrolling while interacting
        event.preventDefault();
      }
    }, { passive: false });
  }

  // * CREATE 3D LEAVES FOR CROPFRESH LOGO
  private createLeaves(): void {
    // * Create orange leaf with improved materials
    const orangeLeafGeometry = new THREE.TorusGeometry(1, 0.3, 20, 100, Math.PI);
    const orangeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff7415, // CropFresh orange
      roughness: 0.2,
      metalness: 0.7,
      emissive: 0xff7415,
      emissiveIntensity: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0
    });
    const orangeLeaf = new THREE.Mesh(orangeLeafGeometry, orangeMaterial);
    orangeLeaf.rotation.z = Math.PI / 4;
    orangeLeaf.position.x = -0.7;
    orangeLeaf.position.y = -0.2;
    orangeLeaf.position.z = 0.5; // Move forward to be more visible
    orangeLeaf.scale.set(1.2, 1.2, 1.2); // Make it larger
    this.scene.add(orangeLeaf);
    this.leaves.push(orangeLeaf);

    // * Create green leaf with improved materials
    const greenLeafGeometry = new THREE.TorusGeometry(1, 0.3, 20, 100, Math.PI);
    const greenMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00a550, // CropFresh green
      roughness: 0.2,
      metalness: 0.7,
      emissive: 0x00a550,
      emissiveIntensity: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0
    });
    const greenLeaf = new THREE.Mesh(greenLeafGeometry, greenMaterial);
    greenLeaf.rotation.z = -Math.PI / 4;
    greenLeaf.position.x = 0.7;
    greenLeaf.position.y = -0.2;
    greenLeaf.position.z = 0.5; // Move forward to be more visible
    greenLeaf.scale.set(1.2, 1.2, 1.2); // Make it larger
    this.scene.add(greenLeaf);
    this.leaves.push(greenLeaf);

    // * Create top leaf bud with improved materials
    const budGeometry = new THREE.ConeGeometry(0.4, 0.8, 32);
    const budMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00a550,
      roughness: 0.2,
      metalness: 0.7,
      emissive: 0x00a550,
      emissiveIntensity: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0
    });
    const bud = new THREE.Mesh(budGeometry, budMaterial);
    bud.position.y = 1;
    bud.position.z = 0.5; // Move forward to be more visible
    bud.rotation.z = Math.PI;
    bud.scale.set(1.2, 1.2, 1.2); // Make it larger
    this.scene.add(bud);
    this.leaves.push(bud);

    // Create additional decorative elements
    this.createDecorativeLeaves();
  }

  // Create smaller decorative leaves
  private createDecorativeLeaves(): void {
    // Create several small leaves in different positions
    for (let i = 0; i < 8; i++) { // Increased number of leaves
      // Alternate between green and orange
      const color = i % 2 === 0 ? 0x00a550 : 0xff7415;
      const emissive = i % 2 === 0 ? 0x00a550 : 0xff7415;

      const leafGeometry = new THREE.TorusGeometry(0.4, 0.1, 16, 60, Math.PI);
      const leafMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        roughness: 0.3,
        metalness: 0.6,
        emissive: emissive,
        emissiveIntensity: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2
      });

      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);

      // Random position within visible area
      leaf.position.x = (Math.random() - 0.5) * 8;
      leaf.position.y = (Math.random() - 0.5) * 6;
      leaf.position.z = Math.random() * -1 + 0.5; // More visible positioning

      // Random rotation
      leaf.rotation.x = Math.random() * Math.PI;
      leaf.rotation.y = Math.random() * Math.PI;
      leaf.rotation.z = Math.random() * Math.PI;

      // Random scale
      const scale = 0.3 + Math.random() * 0.6; // Larger scale
      leaf.scale.set(scale, scale, scale);

      this.scene.add(leaf);
      this.leaves.push(leaf);
    }
  }

  // Create falling leaves that follow cursor
  private createFallingLeaves(): void {
    // Create leaf shapes
    const leafShapes = [
      new THREE.TorusGeometry(0.3, 0.08, 16, 60, Math.PI), // Half torus leaf
      new THREE.ConeGeometry(0.2, 0.5, 8)                  // Cone-shaped leaf
    ];

    // Create leaf materials
    const leafMaterials = [
      new THREE.MeshPhysicalMaterial({
        color: 0x00a550, // Green
        roughness: 0.3,
        metalness: 0.5,
        emissive: 0x00a550,
        emissiveIntensity: 0.2,
        clearcoat: 0.8,
        side: THREE.DoubleSide
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xff7415, // Orange
        roughness: 0.3,
        metalness: 0.5,
        emissive: 0xff7415,
        emissiveIntensity: 0.2,
        clearcoat: 0.8,
        side: THREE.DoubleSide
      })
    ];

    // Create falling leaves
    for (let i = 0; i < 15; i++) {
      // Randomly select shape and material
      const geometry = leafShapes[Math.floor(Math.random() * leafShapes.length)];
      const material = leafMaterials[Math.floor(Math.random() * leafMaterials.length)];

      const leaf = new THREE.Mesh(geometry, material);

      // Random starting position above the screen
      leaf.position.x = (Math.random() - 0.5) * 10;
      leaf.position.y = Math.random() * 5 + 5; // Start above the viewport
      leaf.position.z = Math.random() * 3 - 1;

      // Random rotation
      leaf.rotation.x = Math.random() * Math.PI;
      leaf.rotation.y = Math.random() * Math.PI;
      leaf.rotation.z = Math.random() * Math.PI;

      // Random scale
      const scale = 0.2 + Math.random() * 0.3;
      leaf.scale.set(scale, scale, scale);

      // Add custom properties for animation
      leaf.userData = {
        speed: 0.01 + Math.random() * 0.03,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        },
        followStrength: 0.01 + Math.random() * 0.03,
        wobbleSpeed: 0.5 + Math.random() * 2,
        wobbleStrength: 0.1 + Math.random() * 0.3
      };

      this.scene.add(leaf);
      this.fallingLeaves.push(leaf);
    }
  }

  // Create particle effects
  private createParticles(): void {
    const particleCount = 800; // Increased particle count
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
      const radius = 12; // Larger radius
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
      size: 0.08, // Larger particles
      vertexColors: true,
      transparent: true,
      opacity: 0.8, // More visible
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

    const deltaTime = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // * Animate main leaves with subtle floating motion and mouse interaction
    this.leaves.forEach((leaf, index) => {
      // Basic animation
      leaf.rotation.z += 0.002 * (index % 2 === 0 ? 1 : -1);
      leaf.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.002;

      // Smooth rotation towards mouse position
      leaf.rotation.x += (this.targetRotation.x - leaf.rotation.x) * 0.05;
      leaf.rotation.y += (this.targetRotation.y - leaf.rotation.y) * 0.05;

      // Additional subtle movements
      leaf.rotation.x += 0.0005 * Math.sin(elapsedTime * 0.3);
      leaf.rotation.y += 0.0003 * Math.cos(elapsedTime * 0.2);
    });

    // * Animate falling leaves
    this.fallingLeaves.forEach((leaf) => {
      // Move leaf downward
      leaf.position.y -= leaf.userData['speed'];

      // Rotate leaf
      leaf.rotation.x += leaf.userData['rotationSpeed'].x;
      leaf.rotation.y += leaf.userData['rotationSpeed'].y;
      leaf.rotation.z += leaf.userData['rotationSpeed'].z;

      // Add wobble effect
      leaf.position.x += Math.sin(elapsedTime * leaf.userData['wobbleSpeed']) * leaf.userData['wobbleStrength'] * 0.01;

      // Follow mouse with delay
      leaf.position.x += (this.mouse.x * 2 - leaf.position.x) * leaf.userData['followStrength'] * 0.1;

      // Reset position if leaf goes below screen
      if (leaf.position.y < -5) {
        leaf.position.y = 5 + Math.random() * 2;
        leaf.position.x = (Math.random() - 0.5) * 10;
      }
    });

    // Animate particle systems with mouse interaction
    this.particles.forEach((particles) => {
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      // Subtle movement towards mouse position
      particles.rotation.x += (this.targetRotation.x - particles.rotation.x) * 0.01;
      particles.rotation.y += (this.targetRotation.y - particles.rotation.y) * 0.01;
    });

    this.renderer.render(this.scene, this.camera);
  }
}
