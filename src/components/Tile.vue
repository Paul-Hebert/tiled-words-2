<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Point, Tile as TileType } from '../types'
import { pointsToSvgPathData } from '../../helpers/points-to-svg-path-data'
import { outlineShape } from '../../helpers/outline-shape'

interface TileProps extends Omit<TileType, 'id'> {
  dragAdjustment?: Point | null
  isShadow?: boolean
  isInvalid?: boolean
  isSelected?: boolean
  wasJustDropped?: boolean
  scale: number
  id?: string
}

const props = defineProps<TileProps>()

const tileDragBox = ref<SVGSVGElement | null>(null)
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
    :style="`--x: ${position.x}; --y: ${position.y}; --scale: ${scale}px;--drag-x: ${dragAdjustment?.x || 0}px; --drag-y: ${dragAdjustment?.y || 0}px; --rotations: ${rotations};`"
    ref="tileElement"
  >
    <g class="rotation-wrapper">
      <template v-for="(row, rowIndex) in grid" :key="rowIndex">
        <template class="cell" v-for="(cell, cellIndex) in row" :key="cellIndex">
          <g v-if="cell !== null" class="cell" :style="`--x: ${cellIndex}; --y: ${rowIndex}`">
            <rect :x="0" :y="0" :width="scale" :height="scale" class="cell-background" />

            <g v-if="!isShadow" class="cell-text-wrapper">
              <text
                class="cell-text"
                :x="scale / 2"
                :y="scale / 2"
                :font-size="scale * 0.8"
                text-anchor="middle"
                dominant-baseline="central"
              >
                {{ cell }}
              </text>
            </g></g
          >
        </template>
      </template>

      <path v-if="!isShadow" :d="svgOutlinePath" class="outline" />

      <rect
        x="0"
        y="0"
        :width="scale * grid[0].length"
        :height="scale * grid.length"
        class="tile-drag-boxd"
        :data-tile-id="id"
      />
      <rect
        x="-10"
        y="-10"
        :width="scale * grid[0].length + 20"
        :height="scale * grid.length + 20"
        class="rotation-wrapper-background"
      />
    </g>
  </g>
</template>

<style scoped>
.tile {
  transform-origin: 0 0;
  transform: translate(
    calc(var(--x) * var(--scale) + var(--drag-x)),
    calc(var(--y) * var(--scale) + var(--drag-y))
  );
  pointer-events: auto;

  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
}

.rotation-wrapper {
  transform-origin: center;
  transform: rotate(calc(var(--rotations, 0) * 90deg));
  transform-box: fill-box;
  transition: transform 0.2s var(--ease-out-back);
}

.rotation-wrapper-background,
.tile-drag-boxd {
  pointer-events: none;
  opacity: 0;
}

.tile.selected {
  opacity: 0.8;
  /* rotate: 1deg;
  scale: 1.05; */
}

.tile.was-just-dropped {
  transition: transform 0.1s ease-out;
}

.shadow {
  opacity: 0.2;
}

.outline {
  stroke: #999;
  stroke-width: 0.5px;
  fill: none;
}

.cell {
  transform-origin: 0 0;
  transform: translate(calc(var(--x) * var(--scale)), calc(var(--y) * var(--scale)));
  cursor: pointer;
}

.selected .cell {
  cursor: grabbing;
}

.cell-background {
  fill: #fff;
  stroke: #ddd;
  stroke-width: 0.5px;
}

.shadow .cell-background {
  stroke: #000;
  fill: #000;
}

.invalid .cell-background {
  stroke: #f00;
  fill: #f00;
}

.cell-text {
  user-select: none;
  text-transform: uppercase;
  font-weight: 550;
}

.cell-text-wrapper {
  transform: rotate(calc(var(--rotations, 0) * -90deg));
  transform-origin: center;
  transform-box: fill-box;
}
</style>
