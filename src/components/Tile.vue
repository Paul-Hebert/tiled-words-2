<script setup lang="ts">
import { reactive } from 'vue'

interface Point {
  x: number
  y: number
}

type GridRow = (string | null)[]

interface Grid {
  rows: GridRow[]
}

defineProps<{
  position: Point
  grid: Grid
  scale: number
}>()
</script>

<template>
  <g class="tile" :style="`--x: ${position.x}; --y: ${position.y}; --scale: ${scale}px;`">
    <template v-for="(row, rowIndex) in grid.rows" :key="rowIndex">
      <template class="cell" v-for="(cell, cellIndex) in row" :key="cellIndex">
        <g v-if="cell !== null" class="cell" :style="`--x: ${cellIndex}; --y: ${rowIndex}`">
          <rect :x="0" :y="0" :width="scale" :height="scale" class="cell-background" />
          <text
            class="cell-text"
            :x="scale / 2"
            :y="scale / 2"
            :font-size="scale * 0.8"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            {{ cell }}
          </text>
        </g>
      </template>
    </template>
  </g>
</template>

<style scoped>
.tile {
  transform-origin: 0 0;
  transform: translate(calc(var(--x) * var(--scale)), calc(var(--y) * var(--scale)));
}

.cell {
  transform-origin: 0 0;
  transform: translate(calc(var(--x) * var(--scale)), calc(var(--y) * var(--scale)));
}

.cell-background {
  fill: #fff;
  stroke: #000;
  stroke-width: 0.5px;
}

.cell-text {
  user-select: none;
}
</style>
