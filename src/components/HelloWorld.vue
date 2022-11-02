<script setup>
import "./HelloWorld.css";
import { matrix } from '../assets/utils/utils';
console.log(matrix);


</script>


<template>
  <div class="firstClass">
    <div v-for="item in matrix" class="twoClass">
      <div v-for="itemTwo in item" class="cell">{{ itemTwo }}</div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
