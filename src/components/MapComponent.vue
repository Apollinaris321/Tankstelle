<template>
    <div class="map-container" ref="mapContainer"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from "vue";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  
  const props = defineProps({
    x: Number,
    y: Number,
  });
  
  const mapContainer = ref(null);
  let map = null;
  let marker = null;
  
  watch([() => props.x, () => props.y], ([newX, newY], [oldX, oldY]) => {
    if (map && marker) {
      map.setView([newY, newX], map.getZoom());
      marker.setLatLng([newY, newX]);
    }
  });
  
  onMounted(() => {
    if (mapContainer.value) {
      map = L.map(mapContainer.value).setView([props.y, props.x], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a>',
      }).addTo(map);
  
      marker = L.marker([props.y, props.x]).addTo(map);
    }
  });
  
  onUnmounted(() => {
    if (map) {
      map.remove();
    }
  });
  </script>
  
  <style scoped>
  .map-container {
    border-radius: 5px;
    overflow: hidden;
    width: 70%;
    height: 70%;
  }
  </style>
  