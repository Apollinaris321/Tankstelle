<template>
    <button @click="handleClick" class="styled-button">
        {{ label }}
    </button>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['onClick', 'label'])

function handleClick(event){
    props.onClick(event)
}

</script>

<style scoped>

.styled-button {
  background-color: white;
  color: black;
  border: 1px solid black;
  font-size: 1rem;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}

.styled-button:hover {
  background-color: black;
  color: white;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.styled-button:active {
  transform: scale(0.9);
}

.styled-button:focus {
  outline-offset: 4px;
}

</style>