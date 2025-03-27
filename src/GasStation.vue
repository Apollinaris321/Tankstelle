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
  scene.background = new THREE.Color(0xff00ff); // Set background to white

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 10);
  
  // Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  //renderer.setSize(window.innerWidth, window.innerHeight);

  const container = sceneContainer.value;
  const { clientWidth, clientHeight } = container;
  renderer.setSize(clientWidth, clientHeight);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();

  sceneContainer.value.appendChild(renderer.domElement);

  // Light
  // const light = new THREE.AmbientLight(0xffffff, 3);
  // scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(5, 2, 10); // Position the light
  directionalLight.castShadow = true; // Enable shadows

  // Adjust shadow properties for better quality
  directionalLight.shadow.mapSize.width = 2048;  // Higher values improve shadow quality
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.camera.left = -10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.bottom = -10;

  scene.add(directionalLight);

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

      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true; // Allow model to cast shadows
          child.receiveShadow = true; // Allow model to receive shadows
        }
      });

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

  const planeGeometry = new THREE.PlaneGeometry(50, 50);
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 }); // Allows soft shadows
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2; // Rotate to lay flat
  plane.position.y = 0; // Move slightly below model
  plane.receiveShadow = true; // Enable shadow receiving
  scene.add(plane);

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
  width: 300px;
  height: 300px;
  padding-left: 600px;
}
</style>
  