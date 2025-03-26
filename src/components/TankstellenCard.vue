<template>
  <div class="card flexcont fade-in-scale">
    <h1>Tankstelle</h1>
    <div class="flexcont">
      <div>
        Adresse:
      </div>
      <div>
        {{ adresse }}
      </div>
    </div>

    <div class="map flexcont">
      <MapComponent :x="x" :y="y"></MapComponent>
    </div>
    <div class="buttonGroup flexcont">
      <Button :onClick="copyToClipboard" label="Zwischenablage kopieren"></Button>
      <Button :onClick="openGoogleMaps" label="Öffnen in Google Maps"></Button>
    </div>
  </div>
</template>
  
<script setup>
import { defineProps } from "vue";
import "leaflet/dist/leaflet.css";
import Button from "./Button.vue";
import MapComponent from "./MapComponent.vue";


import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

function opentoast(msg){
  toast(msg, {
  "theme": "dark",
  "type": "default",
  "position": "top-center",
  "pauseOnHover": false,
  "autoClose": 2000,
  "hideProgressBar": true,
  "transition": "flip",
  "dangerouslyHTMLString": true
})
}

const props = defineProps({
  x: Number,
  y: Number,
  adresse: String,
  id: Number
});

 
const openGoogleMaps = (event) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${props.y},${props.x}`;
  window.open(googleMapsUrl, "_blank"); // Opens Google Maps in a new tab
};

const copyToClipboard = async () => {
  try {
    let mapsUrl = `https://www.google.com/maps?q=${props.y},${props.x}`
    await navigator.clipboard.writeText(mapsUrl);
    opentoast("Copied to Clipboard!")

  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

</script>
  
<style scoped>

h1{
  user-select: none;
  margin: 0;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 350px;
  height: 450px;
  color: black;
  font-size: 1em;
  padding: 10px;
  padding-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);

  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover{
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
}

.map{
  width: 100%;
  height: 100%;
}

.flexcont{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

</style>
  