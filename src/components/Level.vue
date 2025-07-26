<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import type { Point, Tile as TileType, Word } from '../types'
import { getBoardScaledDelta } from '../../helpers/get-board-scaled-delta'
import { getShadowPosition } from '../../helpers/get-shadow-position'
import { rotateGrid } from '../../helpers/rotate-grid'
import { computeGridState } from '../../helpers/compute-grid-state'
import { canPlaceTile } from '../../helpers/can-place-tile'
import { findWords } from '../../helpers/find-words'
import { rotateTileInPlace } from '../../helpers/rotate-tile-in-place'
import { findClosestTileCell } from '../../helpers/find-closest-tile-cell'
import { useSound } from '@/composables/use-sound'
import Button from './Button.vue'
import { ArrowRightIcon } from 'lucide-vue-next'
import Board from './Board.vue'
import WordsSection from './WordsSection.vue'

const props = defineProps<{
  startingTiles: TileType[]
  boardGridSize: number
  theme: string
  words: {
    vertical: Word[]
    horizontal: Word[]
  }
  nextLevelId?: number
}>()

const { playSound } = useSound()

const boardGridScale = 10
const boardViewboxSize = props.boardGridSize * boardGridScale
const mouseThreshold = 1 // 1px threshold for precise mouse clicks
const touchThreshold = 15 // 15px threshold for forgiving finger taps

const tiles = ref(props.startingTiles)

const selectedTile = computed(() => {
  return tiles.value.find((tile) => tile.id === currentTileId.value) || null
})

const otherTiles = computed(() => {
  return tiles.value.filter((tile) => tile.id !== currentTileId.value)
})

const currentTileId = ref<string | null>(null)
const justDroppedTileId = ref<string | null>(null)
const startingDragPoint = ref<Point | null>(null)
const dragAdjustment = ref<Point | null>(null)
const boardComponent = ref<InstanceType<typeof Board> | null>(null)
const currentTileElement = ref<SVGGElement | null>(null)
const shadowPosition = ref<Point | null>(null)
const tapOrDragStartedTime = ref<number | null>(null)

const boardElement = computed(() => boardComponent.value?.backgroundGridElement)

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

  return foundWords.filter((word) => {
    return (
      props.words.vertical.some(
        (verticalWord) => verticalWord.text === word.text && word.direction === 'vertical',
      ) ||
      props.words.horizontal.some(
        (horizontalWord) => horizontalWord.text === word.text && word.direction === 'horizontal',
      )
    )
  })
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
  if (
    currentTileId.value === null ||
    startingDragPoint?.value === null ||
    !boardElement.value ||
    !currentTileElement.value
  ) {
    return
  }

  dragAdjustment.value = getBoardScaledDelta(
    position,
    startingDragPoint.value,
    boardElement.value,
    boardViewboxSize,
  )

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
    Math.abs(dragAdjustment.value.x) > 15 &&
    Math.abs(dragAdjustment.value.y) > 15

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
      </h1>

      <WordsSection :words="words" :found-words="foundWords.map((word) => word.text)" />

      <template v-if="foundWords.length === allWords.length">
        <Button v-if="nextLevelId" :href="`/level/${nextLevelId}`" class="next-level-btn">
          Next Level
          <ArrowRightIcon aria-hidden="true" width="16" height="16" />
        </Button>
        <p v-else class="win-message">🎉 Congratulations! You've completed all levels!</p>
      </template>
    </div>

    <Board
      :board-viewbox-size="boardViewboxSize"
      :board-grid-size="boardGridSize"
      :board-grid-scale="boardGridScale"
      :current-tile-id="currentTileId"
      :tiles="tiles"
      :just-dropped-tile-id="justDroppedTileId"
      :drag-adjustment="dragAdjustment"
      :selected-tile="selectedTile"
      :shadow-position="shadowPosition"
      :placement-is-valid="placementIsValid"
      :found-words="foundWords"
      ref="boardComponent"
    />
  </div>
</template>

<style scoped>
.theme {
  font-size: 2rem;
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
    display: flex;
    max-width: 1200px;
    gap: 2rem;
    align-items: center;

    .board-container {
      order: -1;
      flex-basis: 66%;
    }

    .meta {
      flex-basis: 33%;
    }
  }
}

.meta {
  display: grid;
  gap: 1rem;
  align-content: center;
}
</style>
