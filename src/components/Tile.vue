<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Point, Tile as TileType } from '../types'
import { pointsToSvgPathData } from '../../helpers/points-to-svg-path-data'
import { outlineShape } from '../../helpers/outline-shape'

interface TileProps extends Omit<TileType, 'id'> {
  dragAdjustment: Point | null
  isShadow?: boolean
  isInvalid?: boolean
  isSelected?: boolean
  wasJustDropped?: boolean
  scale: number
}

const props = defineProps<TileProps>()

const emit = defineEmits<{
  (e: 'tile-pointerdown', data: { startingDragPoint: Point; startingDragOffset: Point }): void
}>()

const tileElement = ref<SVGSVGElement | null>(null)
const svgOutlinePath = computed(() => {
  return pointsToSvgPathData(outlineShape(props.grid), props.scale)
})
</script>

<template>
  <g
    :class="[
      'tile',
      {
        shadow: isShadow,
        invalid: isInvalid,
        selected: isSelected,
        'was-just-dropped': wasJustDropped,
      },
    ]"
    :style="`--x: ${position.x}; --y: ${position.y}; --scale: ${scale}px;--drag-x: ${dragAdjustment?.x || 0}px; --drag-y: ${dragAdjustment?.y || 0}px;`"
    ref="tileElement"
  >
    <template v-for="(row, rowIndex) in grid" :key="rowIndex">
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

              emit('tile-pointerdown', { startingDragPoint, startingDragOffset })
            }
          "
        >
          <rect :x="0" :y="0" :width="scale" :height="scale" class="cell-background" />

          <text
            v-if="!isShadow"
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

    <path v-if="!isShadow" :d="svgOutlinePath" class="outline" />
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

.tile.selected {
  opacity: 0.8;
}

.tile.was-just-dropped {
  transition: transform 1s ease-in-out;
}

.outline {
  stroke: #000;
  stroke-width: 0.5px;
  fill: none;
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

.shadow .cell-background {
  stroke: #000;
  fill: #000;
  opacity: 0.2;
}

.invalid .cell-background {
  stroke: #f00;
  fill: #f00;
  opacity: 0.2;
}

.cell-text {
  user-select: none;
}
</style>
