<script setup>
import { ref, onMounted } from "vue";
import MapComp from "@/components/MapComp.vue";


const data = ref([]);

const fetchData = async () => {
  try {
    console.log("hello");
    
    const response = await fetch("https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid+is+not+null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson");
    const json = await response.json();
    console.log(json);
    data.value = json.features || [];
  } catch (error) {
    console.error("Error fetching data:", error);
  }

};

onMounted(() => {
  console.log("Loading");
})

let yC = 6.960644911005172
let xC = 50.916095041454554
</script>

<template>
  <div>
    <h2>Gefahrgutstrecken</h2>
    <button @click="fetchData"> Press me</button>
    <MapComp :x-coord="yC" :y-coord="xC"></MapComp>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <strong>Object ID:</strong> {{ item.attributes.objectid }} <br />
        <strong>Name:</strong> {{ item.attributes.adresse || "N/A" }}
        <strong>x:</strong> {{ item.geometry.x || "N/A" }}
        <strong>y:</strong> {{ item.geometry.y || "N/A" }}
        <MapComp :x-coord="item.geometry.x" :y-coord="item.geometry.y"></MapComp>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
