<script setup lang="ts">
import BackgroundGrid from './components/BackgroundGrid.vue'
import Tile from './components/Tile.vue'
</script>

<template>
  <div class="container">
    <svg class="board" viewBox="0 0 100 100">
      <BackgroundGrid :size="10" :scale="10" />
      <Tile
        :position="{ x: 1, y: 3 }"
        :grid="{
          rows: [
            ['a', null, 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i'],
          ],
        }"
        :scale="10"
      />
    </svg>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.board {
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  background-color: #000;
  max-width: 90vw;
  max-height: 90vh;
  margin: 0 auto;
  overflow: visible;
}
</style>
