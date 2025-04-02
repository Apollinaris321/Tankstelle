<template>
    <div class="modal-bg" v-if="isModalOpen">
        <div class="modal ibm-plex-sans-font" ref="modal">
          <div class="closing">
            <div class="closingpointer" @click="closeModal">X</div>
          </div>
          <TitleCard :adresse="adresse"></TitleCard>
          <div class="flexmodal">
            <div class="map flexcont">
              <MapComponent :x="x" :y="y" ></MapComponent>
            </div>
            <div class="buttonGroup flexrow">
              <Button :onClick="copyToClipboard" label="Link kopieren"></Button>
              <Button :onClick="openGoogleMaps" label="Öffnen in Google Maps"></Button>
            </div>
          </div>
      </div>
    </div>
</template>
  
<script setup>
import { defineProps, onMounted, ref } from "vue";
import Button from "./Button.vue";
import MapComponent from "./MapComponent.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { onClickOutside } from "@vueuse/core";
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
  id: Number,
  isModalOpen: Boolean
});

const emits = defineEmits(['close'])
const modal = ref(null)

function closeModal(){
  emits('close', false)
}
 
onClickOutside(modal, () => {
  emits('close', false)
})

// google url aufrufen mit den Koordinaten der Tankstelle
function openGoogleMaps(event){
  const googleMapsUrl = `https://www.google.com/maps?q=${props.y},${props.x}`;
  window.open(googleMapsUrl, "_blank"); // Opens Google Maps in a new tab
};

// url der Card kopieren
async function copyToClipboard(){
  try {
    let currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
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
.flexrow{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
}

.gap30{
  gap: 30px;
}

.flexmodal{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.flexcont{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.modal-bg{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background: white;
  width: 550px;
  height: 650px;
  padding: 10px;
  font-size: 1em;
  padding-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}

.map{
  width: 400px;
  height: 400px;
}

.closing{
  display: flex;
  width: 100%;
  justify-content: end;
}

.closingpointer:hover{
  transform: scale(1.1);
}

.closingpointer{
  cursor: pointer;
  font-size: 1.2em;
  transition: transform 0.1s ease;
}

.modal-enter-active,
.modal-leave-active{
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to{
  opacity: 0;
  transform: scale(1.1);
}
</style>
  