<script setup lang="ts">
import type { Word } from '../types'

const props = defineProps<{
  word: Word
  isFound: boolean
}>()
</script>

<template>
  <li class="hint" :class="{ found: isFound }">{{ word.hint }}</li>
</template>

<style scoped>
.hint {
  font-size: 1.25rem;
  font-style: italic;
  font-family: var(--font-serif);
}

.found {
  text-decoration: line-through;
  color: #22c55e;
}
</style>
