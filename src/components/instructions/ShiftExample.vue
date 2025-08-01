<script setup lang="ts">
import { ref, watch } from 'vue'
import ShiftControls from '../ShiftControls.vue'
import type { Tile } from '@/types'
import Board from '../Board.vue'

interface Props {
  interval: number
}

const props = defineProps<Props>()

const shiftControlsEl = ref<InstanceType<typeof ShiftControls> | null>(null)

watch(
  () => props.interval,
  (newInterval) => {
    if (newInterval % 2 === 1) {
      shiftControlsEl.value?.fakePress('left')
      tiles.value[0].position.x -= 1
      tiles.value[1].position.x -= 1
    } else {
      shiftControlsEl.value?.fakePress('right')
      tiles.value[0].position.x += 1
      tiles.value[1].position.x += 1
    }
  },
)

const tiles = ref<Tile[]>([
  {
    id: 'demo-tile-1',
    position: { x: 2, y: 0 },
    grid: [['s', 't', 'u']],
    rotations: 0,
  },
  {
    id: 'demo-tile-2',
    position: { x: 4, y: 2 },
    grid: [['c', 'k']],
    rotations: 0,
  },
])
</script>

<template>
  <div class="control-wrapper" aria-hidden="true">
    <Board
      :tiles="tiles"
      :board-viewbox-size="60"
      :board-grid-size="6"
      :board-grid-scale="10"
      :drag-adjustment="null"
      :current-tile-id="null"
      :selected-tile="null"
      :shadow-position="null"
      :placement-is-valid="true"
      :found-words="[]"
      :animated-tile-ids="['demo-tile-1', 'demo-tile-2']"
      :not-interactive="true"
    />
    <ShiftControls class="shift-controls" ref="shiftControlsEl" />
  </div>
</template>

<style scoped>
.control-wrapper {
  pointer-events: none;

  position: relative;
}

@media (width >= 850px) {
  .shift-controls {
    position: absolute;
    bottom: 2px;
    left: 2px;
    right: 2px;
    padding: 1em;
    background-color: var(--color-background);
    border: 2px solid var(--color-background-secondary);
    height: calc(100% / 3);
    width: auto;
  }
}
</style>
