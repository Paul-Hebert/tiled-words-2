<script setup lang="ts">
import { computed, ref } from 'vue'
import { Volume2, VolumeOff } from 'lucide-vue-next'
import { padGridToSquare } from '../helpers/pad-grid-to-square'
import { useSound } from './composables/use-sound'
import Level from './components/Level.vue'

const { isMuted, toggleMuted } = useSound()

const levels = [
  {
    id: 'level-1',
    theme: 'Herbs from a Simon and Garfunkel song',
    gridSize: 10,
    words: {
      vertical: [
        { text: 'sage', hint: 'A wise person' },
        { text: 'thyme', hint: 'Tracked with a clock' },
      ],
      horizontal: [
        { text: 'parsley', hint: "Chimichurri's main ingredient" },
        { text: 'rosemary', hint: "A woman's name" },
      ],
    },
    tiles: [
      {
        id: 'tile-1',
        position: {
          x: 2,
          y: 3,
        },
        grid: padGridToSquare([
          [null, 's', null],
          ['p', 'a', 'r'],
        ]),
        rotations: 1,
      },
      {
        id: 'tile-2',
        position: {
          x: 0,
          y: 6,
        },
        grid: padGridToSquare([['r', 'o', 's']]),
        rotations: 2,
      },
      {
        id: 'tile-3',
        position: {
          x: 2,
          y: 8,
        },
        grid: padGridToSquare([
          ['g', null],
          ['e', 'm'],
        ]),
        rotations: 3,
      },
      {
        id: 'tile-4',
        position: {
          x: 5,
          y: 7,
        },
        grid: padGridToSquare([['a', 'r', 'y']]),
        rotations: 0,
      },
      {
        id: 'tile-5',
        position: {
          x: 5,
          y: 0,
        },
        grid: padGridToSquare([['t'], ['h'], ['y']]),
        rotations: 1,
      },
      {
        id: 'tile-6',
        position: {
          x: 6,
          y: 4,
        },
        grid: padGridToSquare([
          [null, null, 'm', null],
          ['s', 'l', 'e', 'y'],
        ]),
        rotations: 1,
      },
    ],
  },
  {
    id: 'level-2',
    theme: 'Fruits and Veggies',
    gridSize: 12,
    words: {
      vertical: [
        { text: 'garlic', hint: 'Vampire protection' },
        { text: 'berries', hint: 'Black and blue...' },
      ],
      horizontal: [
        { text: 'cabbage', hint: 'Sauerkraut ingredient' },
        { text: 'celery', hint: 'Good with peanut butter and raisins' },
        { text: 'zucchini', hint: 'Good for bread and fritters' },
      ],
    },
    tiles: [
      {
        id: 'tile-1',
        position: {
          x: 6,
          y: 2,
        },
        grid: padGridToSquare([
          [null, 'g'],
          ['c', 'a'],
          [null, 'r'],
        ]),
        rotations: 1,
      },
      {
        id: 'tile-2',
        position: {
          x: 5,
          y: 4,
        },
        grid: padGridToSquare([['b', 'b', 'a']]),
        rotations: 2,
      },
      {
        id: 'tile-3',
        position: {
          x: -1,
          y: 7,
        },
        grid: padGridToSquare([['g', 'e']]),
        rotations: 1,
      },
      {
        id: 'tile-4',
        position: {
          x: 0,
          y: 0,
        },
        grid: padGridToSquare([
          ['e', null],
          ['r', 'y'],
          ['r', null],
        ]),
        rotations: 0,
      },
      {
        id: 'tile-5',
        position: {
          x: 2,
          y: 8,
        },
        grid: padGridToSquare([
          ['i', 'e', 's'],
          ['h', null, null],
        ]),
        rotations: 0,
      },
      {
        id: 'tile-6',
        position: {
          x: 6,
          y: 7,
        },
        grid: padGridToSquare([['c', 'e']]),
        rotations: 1,
      },
      {
        id: 'tile-7',
        position: {
          x: 3,
          y: 1,
        },
        grid: padGridToSquare([
          ['l', 'e'],
          ['i', null],
          ['c', null],
        ]),
        rotations: 0,
      },
      {
        id: 'tile-8',
        position: {
          x: 1,
          y: 4,
        },
        grid: padGridToSquare([['z', 'u', 'c']]),
        rotations: 2,
      },
      {
        id: 'tile-9',
        position: {
          x: 8,
          y: 8,
        },
        grid: padGridToSquare([['n', 'i']]),
        rotations: 1,
      },
    ],
  },
]

const currentLevelIndex = ref(0)
const currentLevel = computed(() => levels[currentLevelIndex.value])

const nextLevel = () => {
  if (currentLevelIndex.value === levels.length - 1) {
    setTimeout(() => {
      window?.alert('You win!')
    }, 500)
    return
  }

  currentLevelIndex.value++
}
</script>

<template>
  <div class="app-container">
    <button @click="toggleMuted" class="mute-toggle-btn">
      <Volume2 v-if="!isMuted" class="icon" aria-label="Mute" />
      <VolumeOff v-else class="icon" aria-label="Unmute" />
    </button>

    <Level
      :theme="currentLevel.theme"
      xp
      :words="currentLevel.words"
      :starting-tiles="currentLevel.tiles"
      :board-grid-size="currentLevel.gridSize"
      @next-level="nextLevel"
      :key="currentLevel.id"
    />
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  width: 100%;
}

.mute-toggle-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #333;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mute-toggle-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.mute-toggle-btn:active {
  transform: scale(0.95);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #333;
}
</style>
