<template>
  <div class="main ibm-plex-sans-font">

    <Titlebar></Titlebar>
    <Searchbar :filter="filter"></Searchbar>


    <div class="gascontainer">
      <GasStation></GasStation>
    </div>

    <div class="sortcontainer">
      <div>Alphabetisch Sortieren: </div>
      <Button2 
      :isActive="activeButton === 'aufsteigend'" 
      @toggle="setActive('aufsteigend')" 
      :onClick="aufsteigend"
      label="aufsteigend"
    />
    <Button2 
      :isActive="activeButton === 'absteigend'" 
      @toggle="setActive('absteigend')" 
      :onClick="absteigend"
      label="absteigend"
    />
    </div>
    <button @click="isModalOpen = true">Open Modal</button>

    <TransitionGroup name="fade" tag="div" class="container">
      <div v-for="(item, index) in filteredData" :key="item.attributes.objectid">
          <TankstellenCard @click="openModal(item)" :x="item.geometry.x" :y="item.geometry.y" :adresse="item.attributes.adresse" :id="item.attributes.objectid"></TankstellenCard>
      </div>
    </TransitionGroup>

    <Teleport to="#modal">
      <Transition name="modal">
        <div class="modal-bg" v-if="isModalOpen">
          <div class="modal" ref="modal">
            <button @click="isModalOpen=false">x</button>
            Click outside this modal to close it
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import TankstellenCard from "./components/TankstellenCard.vue";
import Searchbar from "./components/Searchbar.vue";
import Titlebar from "./components/Titlebar.vue";
import Button2 from "./components/ToggleButton.vue";
import { onClickOutside } from "@vueuse/core";
import GasBlender from "./GasBlender.vue";
import GasStation from "./GasStation.vue";

const data = ref([]);
const filteredData = ref([]);
const activeButton = ref('aufsteigend');
const isModalOpen = ref(false)
const modal = ref(null)

onClickOutside(modal, () => (isModalOpen.value = false))

const setActive = (button) => {
  console.log("toggling...");
  
  activeButton.value = button;
};

const fetchData = async () => {
  try {
    console.log("hello");
    const response = await fetch("https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid+is+not+null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson");
    const json = await response.json();
    console.log(json);
    data.value = json.features || [];
    filteredData.value = json.features || []
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData()
})

function filter(adress){
  filteredData.value = data.value.filter(t => t.attributes.adresse.toLowerCase().includes(adress.toLowerCase()))
}

function aufsteigend(){
  filteredData.value = [...filteredData.value].sort((a, b) => {
         return a.attributes.adresse.localeCompare(b.attributes.adresse); 
       });
}

function absteigend(){
  aufsteigend()
  filteredData.value.reverse()
}


//modal
const selectedItem = ref(null);

// Open modal
function openModal(item) {
  selectedItem.value = item;
  isModalOpen.value = true;
}

// Close modal
function closeModal() {
  isModalOpen.value = false;
  selectedItem.value = null;
}

</script>



<style scoped>


main, body, html{
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgb(250, 250, 250);
}

h2{
  color: black;
  font-size: 5em;
  font-weight: 800;
}

.main{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.container {
  padding-top: 30px;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 50px;
  width: 100%;
  max-width: 800px;
  justify-items: center;
}

@media (max-width: 1000px) {
  .container {
    grid-template-columns: 1fr; 
  }
}

.sortcontainer{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}


/* Modal Overlay */
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
  padding: 50px 100px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
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

.gascontainer{
  width: 100px;
  height: 100px;
}

</style>
