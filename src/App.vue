<template>
  <div class="main ibm-plex-sans-font">

    <Titlebar></Titlebar>
    <Searchbar :filter="filter"></Searchbar>

    <div class="sortcontainer fade-in">
      <div>Alphabetisch Sortieren: </div>
      <ToggleButton 
      :isActive="activeButton === 'aufsteigend'" 
      @toggle="setActive('aufsteigend')" 
      :onClick="aufsteigend"
      label="aufsteigend"
    />
    <ToggleButton 
      :isActive="activeButton === 'absteigend'" 
      @toggle="setActive('absteigend')" 
      :onClick="absteigend"
      label="absteigend"
    />
    </div>

    <TransitionGroup name="fade" tag="div" class="container">
      <div v-for="(item, index) in filteredData" :key="item.attributes.objectid">
          <TankstellenCard @open="openModal(item)" :x="item.geometry.x" :y="item.geometry.y" :adresse="item.attributes.adresse" :id="item.attributes.objectid"></TankstellenCard>
      </div>
    </TransitionGroup>

    <Teleport to="#modal">
      <Transition name="modal">
        <TankstellenModal v-if="isModalOpen" @close="closeModal" :isModalOpen="isModalOpen" :x="selectedItem.geometry.x" :y="selectedItem.geometry.y" :adresse="selectedItem.attributes.adresse" :id="selectedItem.attributes.objectid"></TankstellenModal>
      </Transition>
    </Teleport>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from "vue";
import TankstellenCard from "./components/TankstellenCard.vue";
import Searchbar from "./components/Searchbar.vue";
import Titlebar from "./components/Titlebar.vue";
import ToggleButton from "./components/ToggleButton.vue";
import { onClickOutside } from "@vueuse/core";
import TankstellenModal from "./components/TankstellenModal.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const data = ref([]);
const filteredData = ref([]);
const activeButton = ref('aufsteigend');
const isModalOpen = ref(false)
const modal = ref(null)
const selectedItem = ref(null);

onMounted(async() => {
  // checken ob schon eine Card gesetzt wurde
  const urlParams = new URLSearchParams(window.location.search); 
  const id = urlParams.get("id"); 
  await fetchData()
  for(let t of data.value){
    if(t.attributes.objectid == id){
      openModal(t)
    }
  }
})

onClickOutside(modal, () => {
  (isModalOpen.value = false);
})

function setActive(button){
  activeButton.value = button;
};

// updated die router url wenn eine Card geöffnet wurde
function updatePos(item){
  router.push({ query: { id: item.attributes.objectid } }); 
};

async function fetchData(){
  try {
    const response = await fetch("https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid+is+not+null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson");
    const json = await response.json();
    data.value = json.features || [];
    filteredData.value = json.features || []
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Cards filtern
function filter(adress){
  filteredData.value = data.value.filter(t => t.attributes.adresse.toLowerCase().includes(adress.toLowerCase()))
}

// sortiert die Cards aufsteigend nach dem Adressnamen
function aufsteigend(){
  filteredData.value = [...filteredData.value].sort((a, b) => {
         return a.attributes.adresse.localeCompare(b.attributes.adresse); 
       });
}

// sortiert erst aufsteigend dann Liste umkehren
function absteigend(){
  aufsteigend()
  filteredData.value.reverse()
}

function openModal(item) {
  updatePos(item)
  selectedItem.value = item;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  selectedItem.value = null;
  router.push({ query: null }); 
}

</script>

<style scoped>

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
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 50px;
  width: 100vw;
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

@media only screen and (max-width: 600px){
  .sortcontainer{
    flex-direction: column;
    gap: 10px;
  }
}

</style>
