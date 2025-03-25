<template>
  <div :id="mapId" class="map-container"></div>
  <div>hello xCoord:{{ xCoord }} - yCoord:{{ yCoord }}</div>
  <div>{{mapId}}</div>
</template>
  
<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, onUnmounted, defineProps, ref } from 'vue';

// Props
const props = defineProps({
  xCoord: Number,
  yCoord: Number
});

// Generate a unique ID for each map
const mapId = ref(`map-${Math.random().toString(36).substr(2, 9)}`);
let map = null;

onMounted(() => {
  const mapContainer = document.getElementById(mapId.value);
  if (!mapContainer) {
    console.error("Map container not found:", mapId.value);
    return;
  }

  map = L.map(mapId.value).setView([props.yCoord, props.xCoord], 15);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

  //map = L.map(mapId.value).setView([props.xCoord, props.yCoord], 17);
  //L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //  attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  //}).addTo(map);
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>

<style scoped>
.map-container {
  width: 300px;
  height: 300px;
  border: 1px solid black;
}
</style>
