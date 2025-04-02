<template>
  <div class="card flexcont fade-in-scale" @click="openModal" data-testid="card-container">
    <TitleCard :adresse="adresse"></TitleCard>
    <div class="map flexcont">
      <MapComponent :x="x" :y="y" @click.stop></MapComponent>
    </div>
    <div class="buttonGroup flexcont">
      <Button data-testid="copy-button" :onClick="copyToClipboard" label="Link kopieren"></Button>
      <Button data-testid="maps-button" :onClick="openGoogleMaps" label="Öffnen in Google Maps"></Button>
    </div>
  </div>
</template>
  
<script setup>
import { defineProps, defineEmits, ref } from "vue";
import Button from "./Button.vue";
import MapComponent from "./MapComponent.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import TitleCard from "./TitleCard.vue";

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

const emit = defineEmits(["open"]);

function openModal(event){
  const clickedElement = event.target;

  if (clickedElement.closest("button")) {
    return;
  }
  emit("open", props.id)
}
const openGoogleMaps = (event) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${props.y},${props.x}`;
  window.open(googleMapsUrl, "_blank"); // Opens Google Maps in a new tab
};

async function copyToClipboard(){
  try {
    let currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl + "?id=" + props.id);
    opentoast("In die Zwischenablage kopiert!")

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
  background-color: white;
  border-radius: 10px;
  width: 350px;
  height: 450px;
  color: black;
  font-size: 1em;
  padding: 10px;
  padding-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  transition: box-shadow 0.3s ease, transform 0.3s ease !important;
}

.card:hover{
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transform: scale(1.1) !important;
}

.flexcont{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.map{
  width: 250px;
  height: 250px;
}

</style>
  