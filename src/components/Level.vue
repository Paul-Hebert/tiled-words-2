<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { Point, Tile as TileType, Word } from '../types'
import BackgroundGrid from './BackgroundGrid.vue'
import Tile from './Tile.vue'
import { getBoardScaledDelta } from '../../helpers/get-board-scaled-delta'
import { getMousePositionOnBoard } from '../../helpers/get-mouse-position-on-board'
import { getShadowPosition } from '../../helpers/get-shadow-position'
import { rotateGrid } from '../../helpers/rotate-grid'
import { computeGridState } from '../../helpers/compute-grid-state'
import { canPlaceTile } from '../../helpers/can-place-tile'
import WordDisplay from './WordDisplay.vue'
import { findWords } from '../../helpers/find-words'

const props = defineProps<{
  startingTiles: TileType[]
  boardGridSize: number
  theme: string
  words: Word[]
}>()

const boardGridScale = 10
const boardViewboxSize = props.boardGridSize * boardGridScale

const tiles = ref(props.startingTiles)

const selectedTile = computed(() => {
  return tiles.value.find((tile) => tile.id === currentTileId.value)
})

const otherTiles = computed(() => {
  return tiles.value.filter((tile) => tile.id !== currentTileId.value)
})

const currentTileId = ref<string | null>(null)
const justDroppedTileId = ref<string | null>(null)
const startingDragPoint = ref<Point | null>(null)
const startingDragOffset = ref<Point | null>(null)
const dragAdjustment = ref<Point | null>(null)
const boardElement = ref<SVGSVGElement | null>(null)
const shadowPosition = ref<Point | null>(null)

const gridState = computed(() =>
  computeGridState(
    tiles.value.filter((tile) => tile.id !== currentTileId.value),
    props.boardGridSize,
  ),
)
const placementIsValid = computed(() => {
  if (!selectedTile.value || !shadowPosition.value) {
    return false
  }
  return canPlaceTile(selectedTile.value.grid, shadowPosition.value, gridState.value)
})
const foundWords = computed(() => findWords(gridState.value))
const countOfFoundWords = computed(
  () => props.words.filter((word) => foundWords.value.includes(word.text)).length,
)

const emit = defineEmits<{
  (e: 'next-level'): void
}>()

const startDrag = (tileId: string, startDragPoint: Point, startDragOffset: Point) => {
  currentTileId.value = tileId
  startingDragPoint.value = startDragPoint
  startingDragOffset.value = startDragOffset
}

const handleMove = (position: Point) => {
  if (currentTileId.value === null || startingDragPoint?.value === null) {
    return
  }

  if (!boardElement.value) {
    return
  }

  // Calculate drag adjustment using helper function
  const scaledDelta = getBoardScaledDelta(
    position,
    startingDragPoint.value,
    boardElement.value,
    boardViewboxSize,
  )

  dragAdjustment.value = scaledDelta

  if (!startingDragOffset.value) {
    return
  }

  // Get mouse position on board using helper function
  const boardPosition = getMousePositionOnBoard(
    position,
    startingDragOffset.value,
    boardElement.value,
  )

  const currentTile = tiles.value.find((tile) => tile.id === currentTileId.value)

  // Calculate shadow position using helper function
  shadowPosition.value = getShadowPosition(boardPosition, boardElement.value, boardGridScale)
}

const endDrag = async () => {
  const tile = tiles.value.find((tile) => tile.id === currentTileId.value)

  if (!tile || !shadowPosition.value) {
    return
  }

  if (placementIsValid.value) {
    tile.position = shadowPosition.value
  }

  currentTileId.value = null
  startingDragPoint.value = null
  startingDragOffset.value = null
  dragAdjustment.value = null
  shadowPosition.value = null
  justDroppedTileId.value = tile.id

  await nextTick()

  if (countOfFoundWords.value === props.words.length) {
    emit('next-level')
  }

  console.log(tiles.value)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.code === 'Space' && currentTileId.value) {
    event.preventDefault()

    const tile = tiles.value.find((tile) => tile.id === currentTileId.value)
    if (tile) {
      // Rotate the tile's grid clockwise
      tile.grid = rotateGrid(tile.grid, 'cw')
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div
    class="container"
    @pointermove="(e: PointerEvent) => handleMove({ x: e.clientX, y: e.clientY })"
    @pointerup="endDrag"
  >
    <h1 class="theme">{{ theme }} ({{ countOfFoundWords }}/{{ words.length }} found)</h1>

    <ul class="words">
      <li v-for="word in words" :key="word.text">
        <WordDisplay :word="word" :is-found="foundWords.includes(word.text)" />
      </li>
    </ul>

    <svg class="board" :viewBox="`0 0 ${boardViewboxSize} ${boardViewboxSize}`" ref="boardElement">
      <BackgroundGrid :size="boardGridSize" :scale="boardGridScale" />

      <g>
        <Tile
          v-for="tile in otherTiles"
          :key="tile.id"
          :position="tile.position"
          :grid="tile.grid"
          :scale="10"
          :was-just-dropped="tile.id === justDroppedTileId"
          @tile-pointerdown="
            (data) => startDrag(tile.id, data.startingDragPoint, data.startingDragOffset)
          "
        />

        <Tile
          v-if="selectedTile && shadowPosition"
          :key="`${selectedTile.id}-shadow`"
          :position="shadowPosition"
          :grid="selectedTile.grid"
          :scale="10"
          :drag-adjustment="null"
          :is-shadow="true"
          :is-invalid="!placementIsValid"
        />

        <Tile
          v-if="selectedTile"
          :key="selectedTile.id"
          :position="selectedTile.position"
          :grid="selectedTile.grid"
          :scale="10"
          :drag-adjustment="selectedTile.id === currentTileId ? dragAdjustment : null"
          @tile-pointerdown="
            (data) => {
              if (!selectedTile) {
                return
              }

              startDrag(selectedTile.id, data.startingDragPoint, data.startingDragOffset)
            }
          "
          :is-selected="true"
        />
      </g>
    </svg>

    <p v-if="currentTileId" style="text-align: center">Press <kbd>Space</kbd> to rotate the tile</p>
  </div>
</template>

<style scoped>
.theme {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.container {
  display: grid;
  gap: 1em;
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: grid;
  max-width: 500px;
  margin: 0 auto;
}

.board {
  aspect-ratio: 1 / 1;
  background-color: #000;
  width: 100%;
  margin: 0 auto;
  overflow: visible;
  /* TODO: refine... */
  touch-action: none;
}

.words {
  list-style: none;
  display: grid;
  gap: 1em;
  padding: 0;
}
</style>
