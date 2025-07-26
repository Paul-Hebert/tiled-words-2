<script setup lang="ts">
import MuteToggleButton from './components/MuteToggleButton.vue'
import Button from './components/Button.vue'
</script>

<template>
  <div class="app-container">
    <header>
      <Button href="/" class="home-link" v-if="$route.path !== '/'">Home</Button>
      <MuteToggleButton />
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  width: 100%;
  min-height: 100svh;
  display: grid;
  grid-template-rows: auto 1fr;
}

header {
  display: flex;
  justify-content: end;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
}

.home-link {
  margin-right: auto;
}
</style>
