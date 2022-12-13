import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Mesh } from "three";

const textLoader = new THREE.TextureLoader();

const textTexture = textLoader.load("/matcaps/8.png");

const canvas = document.querySelector(".webgl");

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("I want to render korean...", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: false,
    bevelThickness: 0.05,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial({
    matcap: textTexture,
  });
  const text = new Mesh(textGeometry, material);
  scene.add(text);

  function getRandomArbitrary(min, max) {
    const result = Math.random() * (max - min) + min;
    return result;
  }

  const torusGeomatery = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i < 200; i++) {
    const torus = new Mesh(torusGeomatery, material);

    torus.position.x = getRandomArbitrary(-10, 10);
    torus.position.y = getRandomArbitrary(-10, 10);
    torus.position.z = getRandomArbitrary(-10, 10);

    torus.rotateX(getRandomArbitrary(1, 3));
    torus.rotateY(getRandomArbitrary(1, 3));

    const scale = Math.random();

    torus.scale.set(scale, scale, scale);

    scene.add(torus);
  }
});

// Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height);
camera.position.z = 10;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

// Animations
function animate() {
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}

animate();
