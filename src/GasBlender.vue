<template>
  <div ref="sceneContainer" class="three-container"></div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
  
const sceneContainer = ref(null);
  
onMounted(() => {
  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  
  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 10);
  
  // Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneContainer.value.appendChild(renderer.domElement);

  
  // Create a white box
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Light
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);
  
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
  height: 400px;
  width: 300px;
}
</style>
  