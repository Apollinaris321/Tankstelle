<template>
  <div class="main ibm-plex-sans-font">

    <Titlebar></Titlebar>
    <Searchbar :filter="filter"></Searchbar>

    <Button :onClick="aufsteigend" label="aufsteigend"></Button>
    <Button :onClick="absteigend" label="absteigend"></Button>

    <TransitionGroup name="fade" tag="div" class="container">
      <div v-for="(item, index) in filteredData" :key="item.attributes.objectid">
          <TankstellenCard :x="item.geometry.x" :y="item.geometry.y" :adresse="item.attributes.adresse" :id="item.attributes.objectid"></TankstellenCard>
      </div>
    </TransitionGroup>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import TankstellenCard from "./components/TankstellenCard.vue";
import Searchbar from "./components/Searchbar.vue";
import Titlebar from "./components/Titlebar.vue";
import Button from "./components/Button.vue";

const data = ref([]);
const filteredData = ref([]);

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

</script>



<style scoped>


main, body, html{
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}

h2{
  color: black;
  font-size: 5em;
  font-weight: 800;
}

.main{
  background-color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.container {
  background-color: white;
  display: grid;

  grid-template-columns: repeat(2, minmax(200px, 1fr));

  gap: 10px;
  width: 100%;
  max-width: 800px;
  justify-items: center;
}

@media (max-width: 1000px) {
  .container {
    grid-template-columns: 1fr; 
  }
}


</style>
