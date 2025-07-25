<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { padGridToSquare } from '../../helpers/pad-grid-to-square'
import Level from '../components/Level.vue'
import MuteToggleButton from '../components/MuteToggleButton.vue'

const props = defineProps<{
  id: string
}>()

const router = useRouter()

const levels = [
  {
    id: 'level-1',
    theme: 'Herbs from a Simon and Garfunkel song',
    gridSize: 12,
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
          x: 3,
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
          x: 1,
          y: 6,
        },
        grid: padGridToSquare([['r', 'o', 's']]),
        rotations: 2,
      },
      {
        id: 'tile-3',
        position: {
          x: 3,
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
          x: 6,
          y: 7,
        },
        grid: padGridToSquare([['a', 'r', 'y']]),
        rotations: 0,
      },
      {
        id: 'tile-5',
        position: {
          x: 6,
          y: 0,
        },
        grid: padGridToSquare([['t'], ['h'], ['y']]),
        rotations: 1,
      },
      {
        id: 'tile-6',
        position: {
          x: 7,
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
    theme: 'Sea animals',
    gridSize: 12,
    words: {
      vertical: [
        { text: 'whale', hint: 'A _____ of a time!' },
        { text: 'seal', hint: 'A sea dog' },
        { text: 'ray', hint: 'Sting, Manta...' },
      ],
      horizontal: [
        { text: 'shark', hint: 'Apex predator' },
        { text: 'jellyfish', hint: 'Peanut butter and...' },
        { text: 'crab', hint: 'Sea spider' },
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
          [null, 'w', null],
          ['s', 'h', 'a'],
        ]),
        rotations: 1,
      },
      {
        id: 'tile-2',
        position: {
          x: 1,
          y: 3,
        },
        grid: padGridToSquare([
          ['r', 'k'],
          ['a', null],
        ]),
        rotations: 2,
      },
      {
        id: 'tile-3',
        position: {
          x: 8,
          y: 8,
        },
        grid: padGridToSquare([['j', 'e']]),
        rotations: 0,
      },
      {
        id: 'tile-4',
        position: {
          x: 8,
          y: 0,
        },
        grid: padGridToSquare([
          ['a', null],
          ['l', 'l'],
          ['e', null],
        ]),
        rotations: 0,
      },
      {
        id: 'tile-5',
        position: {
          x: 0,
          y: 8,
        },
        grid: padGridToSquare([['y', 'f', 'i']]),
        rotations: 0,
      },
      {
        id: 'tile-6',
        position: {
          x: 4,
          y: 0,
        },
        grid: padGridToSquare([
          ['s', 'h'],
          ['e', null],
        ]),
        rotations: 1,
      },
      {
        id: 'tile-7',
        position: {
          x: 4,
          y: 3,
        },
        grid: padGridToSquare([['c', 'r']]),
        rotations: 0,
      },
      {
        id: 'tile-8',
        position: {
          x: 4,
          y: 6,
        },
        grid: padGridToSquare([
          ['a', 'b'],
          ['l', null],
        ]),
        rotations: 0,
      },
    ],
  },
  {
    id: 'level-3',
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

const currentLevel = computed(() => {
  return levels.find((level) => level.id === props.id)
})

const currentLevelIndex = computed(() => {
  return levels.findIndex((level) => level.id === props.id)
})
</script>

<template>
  <div v-if="currentLevel" class="level-view-container">
    <MuteToggleButton />

    <Level
      :theme="currentLevel.theme"
      :words="currentLevel.words"
      :starting-tiles="currentLevel.tiles"
      :board-grid-size="currentLevel.gridSize"
      :key="currentLevel.id"
      :next-level-id="levels[currentLevelIndex + 1]?.id"
    >
    </Level>
  </div>
</template>

<style scoped>
.level-view-container {
  position: relative;
  width: 100%;
}
</style>
