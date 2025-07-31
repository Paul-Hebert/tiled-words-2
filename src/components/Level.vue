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
    if (newFoundWords.length === allWords.value.length) {
      playSound('success-2.mp3')
    } else {
      playSound('success.mp3')
    }
  }
})

const startDrag = (tileElement: SVGGElement, tileId: string, startDragPoint: Point) => {
  currentTileElement.value = tileElement
  currentTileId.value = tileId
  startingDragPoint.value = startDragPoint
  justDroppedTileId.value = null
  tapOrDragStartedTime.value = Date.now()
}

const handleTouchStart = (e: TouchEvent) => {
  if (!boardElement.value) {
    return
  }

  // TODO: we run this on touch start and pointer down which is redundant.
  // Consolidating could improve performance.
  const closestCell = findClosestTileCell(
    { x: e.touches[0].clientX, y: e.touches[0].clientY },
    tiles.value,
    touchThreshold,
    boardElement.value,
    boardViewboxSize,
    boardGridScale,
  )

  if (closestCell) {
    e.preventDefault()
  }
}

const handlePointerDown = (e: PointerEvent) => {
  // If the pointer target was a link or button (or was inside one) return early
  const target = e.target as Element
  if (target.closest('a, button, [role="button"]')) {
    return
  }

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
      e.preventDefault()
    }
  }
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
}

// Document event handlers
const handleDocumentPointerMove = (e: PointerEvent) => {
  if (
    currentTileId.value === null ||
    startingDragPoint?.value === null ||
    !boardElement.value ||
    !currentTileElement.value
  ) {
    return
  }

  e.preventDefault()

  dragAdjustment.value = getBoardScaledDelta(
    { x: e.clientX, y: e.clientY },
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
  boardComponent.value?.$el.addEventListener('touchstart', handleTouchStart, { passive: false })
  document.addEventListener('pointermove', handleDocumentPointerMove, { passive: false })
  document.addEventListener('pointerup', handleDocumentPointerUp, { passive: false })
  document.addEventListener('pointerleave', handleDocumentPointerLeave, { passive: false })
  document.addEventListener('visibilitychange', handleVisibilityChange, { passive: false })
  document.addEventListener('pointerdown', handlePointerDown, { passive: false })
})

onUnmounted(() => {
  boardComponent.value?.$el.removeEventListener('touchstart', handleTouchStart)
  document.removeEventListener('pointermove', handleDocumentPointerMove)
  document.removeEventListener('pointerup', handleDocumentPointerUp)
  document.removeEventListener('pointerleave', handleDocumentPointerLeave)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  document.removeEventListener('pointerdown', handlePointerDown)
})
</script>

<template>
  <div class="container">
    <h1 class="theme">
      {{ theme }}
    </h1>

    <WordsSection :words="words" :found-words="foundWords.map((word) => word.text)" class="words" />

    <div class="board-wrapper">
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

    <div v-if="foundWords.length === allWords.length" class="success">
      <Button :href="nextLevelId ? `/level/${nextLevelId}` : '/game-completed'" animate-in big>
        Next Level
        <ArrowRightIcon aria-hidden="true" width="16" height="16" stroke-width="3" />
      </Button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  width: 100%;
  margin: 0 auto;
  gap: 1rem;

  @media (width >= 800px) {
    display: grid;
    max-width: 1200px;
    width: 100%;
    column-gap: 2rem;
    row-gap: 1rem;
    grid-template-areas:
      'board .'
      'board theme'
      'board words'
      'board success'
      'board .';
    grid-template-rows: 1rem auto auto 1fr 1rem;
    grid-template-columns: 66% 33%;
  }
}

.board-wrapper {
  grid-area: board;
}

.theme {
  grid-area: theme;
  font-size: var(--fluid-sizing-xl);
}

.words {
  grid-area: words;
}

.success {
  grid-area: success;
  align-self: end;

  @media (width < 800px) {
    position: sticky;
    bottom: 0;
    width: 100%;
    margin-inline: -1rem;
    padding: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
    width: calc(100% + 2rem);
    background: var(--color-background);
    border-top: 1px solid var(--color-background-secondary);
  }
}
</style>
