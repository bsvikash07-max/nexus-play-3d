/**
 * NEXUS // PLAY - WebGL Three.js Particle Constellation & Camera Depth
 * Optimized real-time 3D background with glowing neon particles, floating cyber debris,
 * and mouse-responsive parallax camera movements.
 */

class HeroBackground3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container || typeof THREE === 'undefined') return;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x07090e, 0.0018);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 150;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Create 3D elements
    this.createParticles();
    this.createFloatingCyberDust();
    this.createDynamicLighting();

    // Event listeners
    window.addEventListener('resize', this.onResize.bind(this));
    if (!this.prefersReducedMotion) {
      window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    this.clock = new THREE.Clock();
    this.animate();
  }

  createParticles() {
    // Starfield / cyberspace particles
    const particleCount = window.innerWidth < 768 ? 600 : 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color(0x00f0ff);
    const red = new THREE.Color(0xff0055);
    const purple = new THREE.Color(0x9d4edd);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 450;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;

      // Color distribution: Neon Cyan, Neon Red, Neon Purple
      const rand = Math.random();
      const col = rand > 0.6 ? cyan : (rand > 0.25 ? purple : red);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite
    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  createFloatingCyberDust() {
    // Geometric cyber polygon fragments drifting in space
    this.cyberPolys = new THREE.Group();
    const geom = new THREE.TetrahedronGeometry(1.4, 0);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

    const polyCount = window.innerWidth < 768 ? 15 : 45;
    for (let i = 0; i < polyCount; i++) {
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 350,
        (Math.random() - 0.5) * 250,
        (Math.random() - 0.5) * 200
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.scale.setScalar(Math.random() * 2 + 0.5);
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        floatSpeed: 0.02 + Math.random() * 0.03
      };
      this.cyberPolys.add(mesh);
    }
    this.scene.add(this.cyberPolys);
  }

  createDynamicLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    this.pointLight1 = new THREE.PointLight(0x00f0ff, 2.5, 300);
    this.pointLight1.position.set(60, 50, 40);
    this.scene.add(this.pointLight1);

    this.pointLight2 = new THREE.PointLight(0xff0055, 2.5, 300);
    this.pointLight2.position.set(-60, -50, 40);
    this.scene.add(this.pointLight2);
  }

  onMouseMove(e) {
    this.mouse.targetX = (e.clientX / this.width - 0.5) * 2;
    this.mouse.targetY = (e.clientY / this.height - 0.5) * 2;
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Smooth camera mouse follow
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    this.camera.position.x = this.mouse.x * 20;
    this.camera.position.y = -this.mouse.y * 20;
    this.camera.lookAt(0, 0, 0);

    // Slowly rotate particle field
    if (this.particleSystem) {
      this.particleSystem.rotation.y = time * 0.03;
      this.particleSystem.rotation.x = time * 0.015;
    }

    // Animate cyber polygons
    if (this.cyberPolys) {
      this.cyberPolys.children.forEach(poly => {
        poly.rotation.x += poly.userData.rotSpeedX;
        poly.rotation.y += poly.userData.rotSpeedY;
        poly.position.y += Math.sin(time + poly.position.x) * 0.05;
      });
    }

    // Orbit point lights slightly
    if (this.pointLight1 && this.pointLight2) {
      this.pointLight1.position.x = Math.sin(time * 0.7) * 70;
      this.pointLight1.position.y = Math.cos(time * 0.5) * 50;
      this.pointLight2.position.x = -Math.sin(time * 0.7) * 70;
      this.pointLight2.position.y = -Math.cos(time * 0.5) * 50;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

window.HeroBackground3D = HeroBackground3D;
