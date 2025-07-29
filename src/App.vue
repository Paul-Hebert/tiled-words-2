<script setup lang="ts">
import MuteToggleButton from './components/MuteToggleButton.vue'
import { ArrowLeftIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="app-container" :class="{ 'has-header': $route.path !== '/' }">
    <header v-if="$route.path !== '/'">
      <router-link to="/" class="home-link">
        <ArrowLeftIcon />
        Home
      </router-link>
      <MuteToggleButton />
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  width: 100%;
  display: grid;
  align-items: center;
}

.has-header {
  grid-template-rows: 1fr auto 1fr;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  text-decoration: none;
}
</style>
