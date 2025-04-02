<template>
    <div class="search-container">
      <div 
        class="search-bar"
        @click="focusSearch"
      >
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          @input="handleSearchChange"
          placeholder="Straßennamen suchen..."
        />
        <div class="search-icon">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>
      <div class="gaspump">
        <Gaspump></Gaspump>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, defineProps } from 'vue'
import Gaspump from '../svg/Gaspump.vue'

const props = defineProps(['filter'])

const searchQuery = ref('')
const searchInput = ref(null)

function focusSearch(){
  searchInput.value.focus()
}

function handleSearchChange(){
    props.filter(searchQuery.value)
}
</script>
  
<style scoped>

.search-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.search-bar {
  position: relative;
  z-index: 10;
  width: 0;
  opacity: 0;
  height: 40px;
  background: transparent;
  border-radius: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  background-color: white;
  animation: expandSearch 0.8s ease-in forwards;
}

@keyframes expandSearch {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 600px;
    opacity: 1;
  }
}
  
.search-bar input {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 40px);
  height: 100%;
  padding: 0 15px;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: #333;
}
  
.search-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
  
.search-icon svg {
  fill: #333;
  transition: transform 0.3s;
}

.search-bar:hover{
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.search-bar:hover ~ .gaspump {
  opacity: 1;
  transform: translateY(-100%) translateX(650%);
  transition: transform .5s ease ;
}

.gaspump {
  opacity: 0;
  position: absolute;
  transform: translateY(0) translateX(650%);
  transition: transform .5s ease ;
  height: 40px;
  width: 40px;
  z-index: 0;
}


@media only screen and (max-width: 600px){
  .search-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  width: 300px;
  }

  .gaspump {
    display: none;
  }
}
</style>