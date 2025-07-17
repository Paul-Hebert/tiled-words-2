<script setup lang="ts">
import { ref } from 'vue'
import type { Point, Grid } from '../types'

defineProps<{
  position: Point
  grid: Grid
  scale: number
  dragAdjustment: Point | null
}>()

const emit = defineEmits<{
  (e: 'tile-pointerdown', data: { startingDragPoint: Point; startingDragOffset: Point }): void
}>()

const tileElement = ref<SVGSVGElement | null>(null)
</script>

<template>
  <g
    class="tile"
    :style="`--x: ${position.x}; --y: ${position.y}; --scale: ${scale}px;--drag-x: ${dragAdjustment?.x || 0}px; --drag-y: ${dragAdjustment?.y || 0}px;`"
    ref="tileElement"
  >
    <template v-for="(row, rowIndex) in grid.rows" :key="rowIndex">
      <template class="cell" v-for="(cell, cellIndex) in row" :key="cellIndex">
        <g
          v-if="cell !== null"
          class="cell"
          :style="`--x: ${cellIndex}; --y: ${rowIndex}`"
          @pointerdown="
            (e: PointerEvent) => {
              if (!tileElement) {
                return
              }

              const startingDragPoint = { x: e.clientX, y: e.clientY }

              // Find the offset of the tile top left corner from the starting drag point
              const startingDragOffset = {
                x: startingDragPoint.x - tileElement?.getBoundingClientRect().left,
                y: startingDragPoint.y - tileElement?.getBoundingClientRect().top,
              }

              console.log('startingDragOffset', startingDragOffset)

              emit('tile-pointerdown', { startingDragPoint, startingDragOffset })
            }
          "
        >
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
  transform: translate(
    calc(var(--x) * var(--scale) + var(--drag-x)),
    calc(var(--y) * var(--scale) + var(--drag-y))
  );
}

.cell {
  transform-origin: 0 0;
  transform: translate(calc(var(--x) * var(--scale)), calc(var(--y) * var(--scale)));
}

.cell-background {
  fill: #fff;
  stroke: #ccc;
  stroke-width: 0.5px;
}

.cell-text {
  user-select: none;
}
</style>
