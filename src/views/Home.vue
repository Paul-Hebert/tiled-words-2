<script setup lang="ts">
import MuteToggleButton from '../components/MuteToggleButton.vue'

const levels = [
  {
    id: 'level-1',
    theme: 'Herbs from a Simon and Garfunkel song',
  },
  {
    id: 'level-2',
    theme: 'Sea animals',
  },
  {
    id: 'level-3',
    theme: 'Fruits and Veggies',
  },
]
</script>

<template>
  <div class="home-container">
    <MuteToggleButton />

    <div class="content">
      <h1 class="title">Tiled Words</h1>
      <p class="subtitle">Reconstruct crosswords out of tiles</p>

      <ol>
        <li v-for="level in levels" :key="level.id">
          <router-link :to="`/level/${level.id}`" class="level-link">
            {{ level.theme }}
          </router-link>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  font-family: var(--font-serif);
  line-height: 1.2;
}

.subtitle {
  font-size: 1.2rem;
  margin: 0 0 3rem 0;
  color: #666;
}
</style>
