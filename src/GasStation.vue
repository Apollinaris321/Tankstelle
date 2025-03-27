<template>
    <div ref="sceneContainer" class="three-container"></div>
  </template>
  
<script setup>
import { ref, onMounted } from "vue";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import * as THREE from "three";
  
const sceneContainer = ref(null);
  
onMounted(() => {
  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000); // Set background to white

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 10);
  
  // Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneContainer.value.appendChild(renderer.domElement);

  // Light
  const light = new THREE.AmbientLight(0xffffff, 3);
  scene.add(light);

  // Load the MTL file into a constant called 'material'
  const mtlLoader = new MTLLoader();
  let material = null;
  mtlLoader.load('/src/models/gas.mtl', (materials) => {
    materials.preload();
    material = materials;
    console.log(material); // Now you have the material loaded
  });

  
  // Load the GLB model
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(
    '/src/models/gasstation.glb', // Path to your GLB model
    (gltf) => {
      // The loaded glTF model is in `gltf.scene`
      scene.add(gltf.scene);
      // Optionally, you can scale or position the model if needed:
      // gltf.scene.scale.set(0.5, 0.5, 0.5);
      // gltf.scene.position.set(0, 0, 0);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('An error occurred while loading the model:', error);
    }
  );


  // Render Loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
});
</script>
  
<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
}
</style>
  