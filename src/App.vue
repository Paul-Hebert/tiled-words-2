<script setup lang="ts">
import MuteToggleButton from './components/MuteToggleButton.vue'
</script>

<template>
  <div class="app-container">
    <MuteToggleButton />
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
