<script setup>
import { ref, onMounted } from "vue";
import TankstellenCard from "./components/TankstellenCard.vue";
import Searchbar from "./components/Searchbar.vue";


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
  console.log("Loading");
  fetchData()
})

function filter(adress){
  console.log("filtering by adress: ", adress);
  filteredData.value = data.value.filter(t => t.attributes.adresse.toLowerCase().includes(adress.toLowerCase()))
}

function aufsteigend(){
  filteredData.value = [...data.value].sort((a, b) => {
         return a.attributes.adresse.localeCompare(b.attributes.adresse); 
       });
}

function absteigend(){
  aufsteigend()
  filteredData.value.reverse()
}

</script>

<template>
  <div class="main">
    <h2>Tankstellen Köln</h2>
    <Searchbar :filter="filter"></Searchbar>
    <button @click="aufsteigend">aufsteigend</button>
    <button @click="absteigend">absteigend</button>

    <div class="container">
      <div v-for="(item, index) in filteredData" :key="index">
          <TankstellenCard :x="item.geometry.x" :y="item.geometry.y" :adresse="item.attributes.adresse" :id="item.attributes.objectid"></TankstellenCard>
      </div>
    </div>
  </div>
</template>

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
.container{
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
