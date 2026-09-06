import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import logoUrl from '../assets/intro-logo.png';
import logoData from '../assets/intro-logo-shapes.json';

// The sound bars guide the transition into the original brand artwork.
const strokes = [
  [-5.1, 0.8, -5.1, -0.8], [-5.1, -0.8, -4.15, -0.8],
  [-3.75, -0.8, -3.2, 0.8], [-3.2, 0.8, -2.65, -0.8], [-3.55, -0.25, -2.85, -0.25],
  [-2.05, -0.8, -2.05, 0.8], [-2.05, 0.8, -1.05, 0.8], [-2.05, 0.05, -1.25, 0.05],
  [-0.45, 0.8, 0.35, 0.8], [-0.05, 0.8, -0.05, -0.8], [-0.45, -0.8, 0.35, -0.8],
  [1.05, -0.8, 1.05, 0.8], [1.05, 0.8, 2.15, -0.8], [2.15, -0.8, 2.15, 0.8],
  [2.85, -0.8, 3.4, 0.8], [3.4, 0.8, 3.95, -0.8], [3.05, -0.25, 3.75, -0.25],
];
const smooth = (value: number) => { const t = THREE.MathUtils.clamp(value, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); };

export function createIntroScene(canvas: HTMLCanvasElement, root: HTMLDivElement, finish: () => void) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 22);
  const group = new THREE.Group();
  scene.add(group);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x44304f, 3));
  const key = new THREE.DirectionalLight(0xfff3e4, 5);
  key.position.set(-4, 6, 8); scene.add(key);
  const rim = new THREE.DirectionalLight(0xa8b7ff, 4);
  rim.position.set(4, 2, -3); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 2);
  fill.position.set(3, -2, 6); scene.add(fill);
  // Tiny machined edge bevels catch the light without making the bars look inflated.
  const geometry = new RoundedBoxGeometry(0.14, 1.21, 0.14, 2, 0.018);
  const colors = [new THREE.Color('#F4A100'), new THREE.Color('#E6003A'), new THREE.Color('#1E006A')];
  const bars = strokes.map((_, i) => {
    const t = i / (strokes.length - 1) * 2;
    const color = colors[Math.min(1, Math.floor(t))].clone().lerp(colors[Math.min(2, Math.floor(t) + 1)], t % 1);
    if (i === strokes.length - 1) color.copy(colors[2]);
    const material = new THREE.MeshPhysicalMaterial({ color, metalness: 0.12, roughness: 0.52, clearcoat: 0.08, transparent: true, depthWrite: false });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh); return mesh;
  });
  // The front face is the actual brand artwork, not a substitute font or drawing.
  // Its opaque silhouettes are traced from the same source to form real solid sides.
  const logo = new THREE.Group();
  scene.add(logo);
  let disposed = false;
  let textureReady = false;
  const texture = new THREE.TextureLoader().load(logoUrl, loaded => {
    if (disposed) { loaded.dispose(); return; }
    textureReady = true;
  }, undefined, finish);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  const frontMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0, depthWrite: false, toneMapped: false });
  const frontGeometry = new THREE.PlaneGeometry(10, 10 / logoData.aspect);
  const front = new THREE.Mesh(frontGeometry, frontMaterial);
  front.position.z = 0.002;
  front.renderOrder = 2;
  logo.add(front);
  const sides = logoData.shapes.map(data => {
    const shape = new THREE.Shape(data.outline.map(([x, y]) => new THREE.Vector2(x, y)));
    data.holes.forEach(hole => shape.holes.push(new THREE.Path(hole.map(([x, y]) => new THREE.Vector2(x, y)))));
    const solid = new THREE.ExtrudeGeometry(shape, { depth: 0.14, bevelEnabled: false, steps: 1, curveSegments: 1 });
    // Render only the edge walls. A second opaque front cap beneath the artwork
    // creates doubled outlines and fills its intentionally translucent details.
    const wallGroup = solid.groups.find(part => part.materialIndex === 1)!;
    solid.setDrawRange(wallGroup.start, wallGroup.count);
    solid.clearGroups();
    solid.translate(0, 0, -0.14);
    solid.computeBoundingBox();
    const x = solid.boundingBox!.getCenter(new THREE.Vector3()).x;
    const color = new THREE.Color().setHSL(0.15 - (x + 5) / 10 * 0.48, 0.8, 0.24);
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.58, metalness: 0.08, transparent: true, opacity: 0, depthWrite: false });
    const mesh = new THREE.Mesh(solid, material);
    logo.add(mesh);
    return mesh;
  });
  const resize = () => {
    const width = window.innerWidth, height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = Math.max(21, 12 / camera.aspect / (2 * Math.tan(THREE.MathUtils.degToRad(16))));
    camera.updateProjectionMatrix();
  };
  resize(); window.addEventListener('resize', resize);
  let frame = 0;
  let start: number | undefined;
  const render = (now: number) => {
    if (!textureReady) { frame = requestAnimationFrame(render); return; }
    start ??= now;
    const t = (now - start) / 1000;
    const entrance = smooth(t / 0.8);
    const morph = smooth((t - 1.05) / 1.85);
    const exit = smooth((t - 3.65) / 0.85);
    const brandReveal = smooth((t - 1.9) / 0.85);
    logo.rotation.set(0.035 * (1 - morph), -0.12 + 0.08 * morph, 0);
    logo.position.set(0, 0.12, 0);
    logo.scale.set(0.97 + 0.03 * morph, 0.78 + 0.22 * morph, 1);
    frontMaterial.opacity = brandReveal;
    sides.forEach(side => { side.material.opacity = brandReveal; });
    group.rotation.set(0.09 * (1 - morph), -0.2 * (1 - morph), -0.02 * (1 - morph));
    group.position.set(0.575 * morph, 0.15 * entrance, 0);
    group.scale.setScalar((0.88 + 0.12 * entrance) * (1 + exit * 0.06));
    bars.forEach((bar, i) => {
      bar.material.opacity = 1 - smooth((t - 1.45) / 0.75);
      // Zero-alpha meshes must not remain as invisible occluders of the logo.
      bar.visible = bar.material.opacity > 0.001;
      const x = (i - 8) * 0.49;
      const envelope = 0.4 + 1.9 * Math.pow(Math.sin((i + 1) / 18 * Math.PI), 2);
      const height = envelope * (0.78 + 0.22 * Math.sin(t * 4.5 + i * 0.85));
      const target = strokes[i];
      const dx = target[2] - target[0], dy = target[3] - target[1];
      // A bar is symmetric: take the shortest turn instead of flipping endpoints
      // through one another (which collapsed and crossed bars during the morph).
      let angle = Math.atan2(dy, dx) - Math.PI / 2;
      if (angle > Math.PI / 2) angle -= Math.PI;
      if (angle < -Math.PI / 2) angle += Math.PI;
      bar.position.set(
        THREE.MathUtils.lerp(x, (target[0] + target[2]) / 2, morph),
        THREE.MathUtils.lerp(0, (target[1] + target[3]) / 2, morph), 0,
      );
      bar.rotation.z = angle * morph;
      bar.scale.y = THREE.MathUtils.lerp(height, Math.hypot(dx, dy), morph) / 1.21;
    });
    canvas.style.opacity = String(entrance * (1 - smooth((t - 3.5) / 0.5)));
    root.style.opacity = String(1 - exit);
    root.style.setProperty('--intro-entrance', String(entrance));
    renderer.render(scene, camera);
    if (t >= 4.5) finish(); else frame = requestAnimationFrame(render);
  };
  frame = requestAnimationFrame(render);
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    geometry.dispose(); bars.forEach(bar => bar.material.dispose()); renderer.dispose();
    frontGeometry.dispose(); frontMaterial.dispose(); texture.dispose();
    sides.forEach(side => { side.geometry.dispose(); side.material.dispose(); });
  };
}
