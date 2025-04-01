<template>
  <div class="title-address-container">
    <h1>Tankstelle</h1>
    <div class="address-details">
      <div>Adresse:</div>
      <div>{{ adresse }}</div>
    </div>
  </div>
</template>
  
<script setup>
import { defineProps } from 'vue';
  
const props = defineProps(['adresse'])
</script>
  
<style scoped>
.title-address-container {
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 5px; 
  width: 100%; 
  padding-bottom: 20px;
}
  
h1 {
  user-select: none;
  margin: 0;
  font-weight: 600; 
}
  
.address-details {
  text-align: center; 
  font-size: 1em; 
  line-height: 1.4; 
}
  
</style>