<script setup lang="ts">
import { CheckIcon, CircleIcon } from 'lucide-vue-next'
import type { Word } from '../types'

const props = defineProps<{
  word: Word
  isFound: boolean
}>()
</script>

<template>
  <li class="hint" :class="{ found: isFound }">
    <span class="list-marker" aria-hidden="true">
      <CircleIcon class="circle-icon" />
      <CheckIcon class="check-icon" pathLength="100" />
    </span>
    <span class="hint-text">{{ word.hint }} ({{ word.text.length }} letters)</span>
  </li>
</template>

<style scoped>
.hint {
  display: flex;
  align-items: baseline;
  gap: 0.5ch;
  font-size: 1.25rem;
  font-family: var(--font-serif);
  transition-property: color, font-weight;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
}

.found {
  /* text-decoration: line-through; */
  color: var(--color-success);
  font-weight: 600;
}

li {
  list-style: none;
}

.list-marker {
  display: inline-grid;
  grid-template-areas: icon;
  transform: translateY(0.25em);

  > * {
    grid-area: icon;
  }
}

.circle-icon {
  fill: currentColor;
  scale: 0.25;
  transition-property: scale, fill;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
}

.check-icon {
  opacity: 0;
  transition-property: opacity, stroke-dashoffset;
  transition-duration: 0.2s, 0.4s;
  transition-timing-function: ease-out;
  stroke: var(--color-background);
  z-index: 1;
  scale: 0.65;
  stroke-width: 4;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}

.found .circle-icon {
  scale: 1.1;
}

.found .check-icon {
  opacity: 1;
  stroke-dashoffset: 200;
  transition-delay: 0s, 0.1s;
}
</style>
