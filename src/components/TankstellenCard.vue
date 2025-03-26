<template>
  <div class="card">
    <div @click="saveCard">
      <svg v-if="saved"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
      </svg>
      <svg v-else  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
      </svg>
    </div>
    <h3>Location</h3>
    <p>Id: {{ id }}</p>
    <p>Adresse: {{ adresse }}</p>
    <p><strong>X:</strong> {{ x }}</p>
    <p><strong>Y:</strong> {{ y }}</p>
    <button @click="openGoogleMaps">Open in Google Maps</button>
    <button @click="copyToClipboard">Copy to Clipboard</button>
    <button @click="shareLocation">Share</button>

    <div class="map-container" ref="mapContainer"></div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, defineProps } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const saved = ref(false)
  
const props = defineProps({
  x: Number,
  y: Number,
  adresse: String,
  id: Number
});

function saveCard(){
  saved.value = !saved.value
}
  
const mapContainer = ref(null);
let map = null;
  
onMounted(() => {
  if (mapContainer.value) {
    map = L.map(mapContainer.value).setView([props.y, props.x], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a>',
    }).addTo(map);

    L.marker([props.y, props.x]).addTo(map);
  }

});
  
onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

const openGoogleMaps = () => {
  const googleMapsUrl = `https://www.google.com/maps?q=${props.y},${props.x}`;
  window.open(googleMapsUrl, "_blank"); // Opens Google Maps in a new tab
};

const copyToClipboard = async () => {
  try {
    let mapsUrl = `https://www.google.com/maps?q=${props.y},${props.x}`
    await navigator.clipboard.writeText(mapsUrl);
    alert("Google Maps link copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const shareLocation = () => {

  let mapsUrl = `https://www.google.com/maps?q=${props.y},${props.x}`
  if (navigator.share) {
    // Web Share API for mobile-friendly sharing
    navigator.share({
      title: "Check out this location!",
      text: `Here's a location on Google Maps:`,
      url: mapsUrl,
    }).catch(error => console.error("Sharing failed:", error));
  } else {
    // Fallback: Open share options in WhatsApp, Telegram, etc.
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mapsUrl)}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(mapsUrl)}&text=Check+out+this+location!`;
    
    // Open a new tab with sharing options
    window.open(whatsappUrl, "_blank");
  }
};

</script>
  
<style scoped>

h3{
  user-select: none;
}
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  width: 300px;
  text-align: center;
  color: black;
  transition: box-shadow transform 0.3s ease;

}

.card:hover{
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transform: scale(1.05)
}

.map-container {
  width: 100%;
  height: 200px;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
}

</style>
  