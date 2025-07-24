<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import type { Point, Tile as TileType, Word } from '../types'
import BackgroundGrid from './BackgroundGrid.vue'
import Tile from './Tile.vue'
import { getBoardScaledDelta } from '../../helpers/get-board-scaled-delta'
import { getShadowPosition } from '../../helpers/get-shadow-position'
import { rotateGrid } from '../../helpers/rotate-grid'
import { computeGridState } from '../../helpers/compute-grid-state'
import { canPlaceTile } from '../../helpers/can-place-tile'
import WordDisplay from './WordDisplay.vue'
import { findWords } from '../../helpers/find-words'
import { rotateTileInPlace } from '../../helpers/rotate-tile-in-place'
import { findClosestTileCell } from '../../helpers/find-closest-tile-cell'
import { useSound } from '@/composables/use-sound'

const props = defineProps<{
  startingTiles: TileType[]
  boardGridSize: number
  theme: string
  words: {
    vertical: Word[]
    horizontal: Word[]
  }
}>()

const { playSound } = useSound()

const boardGridScale = 10
const boardViewboxSize = props.boardGridSize * boardGridScale
const mouseThreshold = 1 // 1px threshold for precise mouse clicks
const touchThreshold = 15 // 15px threshold for forgiving finger taps

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
const dragAdjustment = ref<Point | null>(null)
const boardElement = ref<SVGSVGElement | null>(null)
const currentTileElement = ref<SVGGElement | null>(null)
const shadowPosition = ref<Point | null>(null)
const tapOrDragStartedTime = ref<number | null>(null)

const gridState = computed(() => computeGridState(otherTiles.value, props.boardGridSize))

const placementIsValid = computed(() => {
  if (!selectedTile.value || !shadowPosition.value) {
    return false
  }
  const result = canPlaceTile(
    rotateGrid(selectedTile.value.grid, selectedTile.value.rotations),
    shadowPosition.value,
    gridState.value,
  )
  return result.canPlace
})

const allWords = computed(() => [...props.words.vertical, ...props.words.horizontal])

const foundWords = computed(() => {
  const foundWords = findWords(gridState.value)

  return foundWords
    .filter((word) => {
      return (
        props.words.vertical.some(
          (verticalWord) => verticalWord.text === word.text && word.direction === 'vertical',
        ) ||
        props.words.horizontal.some(
          (horizontalWord) => horizontalWord.text === word.text && word.direction === 'horizontal',
        )
      )
    })
    .map((word) => word.text)
})

// Watch for new word discoveries and play success sound
watch(foundWords, (newFoundWords, oldFoundWords) => {
  if (oldFoundWords && newFoundWords.length > oldFoundWords.length) {
    playSound('success.mp3')
  }
})

const emit = defineEmits<{
  (e: 'next-level'): void
}>()

const startDrag = (tileElement: SVGGElement, tileId: string, startDragPoint: Point) => {
  currentTileElement.value = tileElement
  currentTileId.value = tileId
  startingDragPoint.value = startDragPoint
  justDroppedTileId.value = null
  tapOrDragStartedTime.value = Date.now()
}

const handlePointerDown = (e: PointerEvent) => {
  if (!boardElement.value) {
    return
  }

  const point = { x: e.clientX, y: e.clientY }

  // Use different thresholds based on input type
  const threshold = e.pointerType === 'mouse' ? mouseThreshold : touchThreshold

  // Find the closest tile cell within the threshold
  const closestCell = findClosestTileCell(
    point,
    tiles.value,
    threshold,
    boardElement.value,
    boardViewboxSize,
    boardGridScale,
  )

  if (closestCell) {
    // Find the tile element for the closest cell
    const tileElement = document.querySelector(
      `[data-tile-id="${closestCell.tile.id}"]`,
    ) as SVGGElement | null
    if (tileElement) {
      startDrag(tileElement, closestCell.tile.id, point)
    }
  }
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

  if (!currentTileElement.value) {
    return
  }

  // Calculate shadow position using helper function
  shadowPosition.value = getShadowPosition(
    boardElement.value,
    currentTileElement.value,
    props.boardGridSize,
    selectedTile.value!,
    gridState.value,
  )
}

const handleTileTap = (tileId: string) => {
  const tile = tiles.value.find((tile) => tile.id === tileId)
  if (tile) {
    const newPosition = rotateTileInPlace(tile, gridState.value)
    if (newPosition) {
      tile.position = newPosition
      tile.rotations++
    } else {
      alert('No valid position found')
    }
  }
}

const endDrag = async () => {
  const tile = tiles.value.find((tile) => tile.id === currentTileId.value)

  if (!tile) {
    return
  }

  const longEnoughForDrag =
    tapOrDragStartedTime.value && Date.now() - tapOrDragStartedTime.value > 300
  const farEnoughForDrag =
    dragAdjustment.value &&
    Math.abs(dragAdjustment.value.x) > 10 &&
    Math.abs(dragAdjustment.value.y) > 10

  if (!longEnoughForDrag && !farEnoughForDrag) {
    handleTileTap(tile.id)

    playSound('whoosh-3.mp3', 0.1)
  } else if (placementIsValid.value && shadowPosition.value) {
    tile.position = shadowPosition.value

    playSound('placed.mp3')
  }

  currentTileId.value = null
  startingDragPoint.value = null
  dragAdjustment.value = null
  shadowPosition.value = null
  justDroppedTileId.value = tile.id

  await nextTick()

  if (foundWords.value.length === allWords.value.length) {
    emit('next-level')
  }
}

// Document event handlers
const handleDocumentPointerMove = (e: PointerEvent) => {
  handleMove({ x: e.clientX, y: e.clientY })
}

const handleDocumentPointerUp = () => {
  endDrag()
}

const handleDocumentPointerLeave = () => {
  if (currentTileId.value !== null) {
    endDrag()
  }
}

const handleVisibilityChange = () => {
  if (currentTileId.value !== null && document.hidden) {
    endDrag()
  }
}

// Add and remove document event listeners
onMounted(() => {
  document.addEventListener('pointermove', handleDocumentPointerMove)
  document.addEventListener('pointerup', handleDocumentPointerUp)
  document.addEventListener('pointerleave', handleDocumentPointerLeave)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('pointermove', handleDocumentPointerMove)
  document.removeEventListener('pointerup', handleDocumentPointerUp)
  document.removeEventListener('pointerleave', handleDocumentPointerLeave)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <div class="container" @pointerdown="handlePointerDown">
    <div class="meta">
      <h1 class="theme">
        {{ theme }}
        <!-- ({{ foundWords.length }}/{{ allWords.length }} found) -->
      </h1>

      <div class="words-section">
        <h2 class="words-header">Across</h2>
        <ul class="words">
          <WordDisplay
            v-for="word in words.horizontal"
            :key="word.text"
            :word="word"
            :is-found="foundWords.includes(word.text)"
          />
        </ul>
      </div>

      <div class="words-section">
        <h2 class="words-header">Down</h2>
        <ul class="words">
          <WordDisplay
            v-for="word in words.vertical"
            :key="word.text"
            :word="word"
            :is-found="foundWords.includes(word.text)"
          />
        </ul>
      </div>
    </div>

    <div class="board-container">
      <svg
        class="board"
        :viewBox="`0 0 ${boardViewboxSize} ${boardViewboxSize}`"
        ref="boardElement"
      >
        <BackgroundGrid :size="boardGridSize" :scale="boardGridScale" />
      </svg>

      <svg
        class="board"
        :class="{ 'selected-container': tile.id === currentTileId }"
        :viewBox="`0 0 ${boardViewboxSize} ${boardViewboxSize}`"
        v-for="tile in tiles"
      >
        <Tile
          :key="tile.id"
          :position="tile.position"
          :grid="tile.grid"
          :scale="10"
          :rotations="tile.rotations"
          :was-just-dropped="tile.id === justDroppedTileId"
          :drag-adjustment="tile.id === currentTileId ? dragAdjustment : null"
          :is-selected="tile.id === currentTileId"
          :id="tile.id"
        />
      </svg>

      <svg class="board shadow-container" :viewBox="`0 0 ${boardViewboxSize} ${boardViewboxSize}`">
        <Tile
          v-if="selectedTile && shadowPosition"
          :key="`${selectedTile.id}-shadow`"
          :position="shadowPosition"
          :grid="selectedTile.grid"
          :scale="10"
          :rotations="selectedTile.rotations"
          :drag-adjustment="null"
          :is-shadow="true"
          :is-invalid="!placementIsValid"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.theme {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  font-family: var(--font-serif);
  line-height: 1.2;
}

.words-header {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin: 0;
}

.words-section {
  display: grid;
}

.container {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: grid;
  max-width: 500px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    max-width: 1000px;
    height: 100svh;
    gap: 2rem;
    place-content: center;

    .board-container {
      order: -1;
    }
  }
}

.meta {
  display: grid;
  gap: 1rem;
  place-content: center;
}

.board-container {
  display: grid;
  grid-template-areas: 'content';
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  touch-action: none;
}

.board {
  aspect-ratio: 1 / 1;
  width: 100%;
  margin: 0 auto;
  overflow: visible;
  /* TODO: refine... */
  grid-area: content;
  position: relative;
  pointer-events: none;
}

.shadow-container {
  z-index: 1;
}

.selected-container {
  z-index: 2;
}

.words {
  padding-inline: 1em;
  padding-block: 0;
}
</style>
