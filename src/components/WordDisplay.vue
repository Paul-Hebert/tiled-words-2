<script setup lang="ts">
import { computed } from 'vue'
import type { Word } from '../types'

const props = defineProps<{
  word: Word
  isFound: boolean
}>()

const letters = computed(() => props.word.text.split(''))
</script>

<template>
  <div class="word-display">
    <p class="hint">{{ word.hint }}</p>

    <div class="word">
      <span v-for="letter in letters" :key="letter" class="letter-wrapper">
        <span class="letter" v-if="isFound">{{ letter }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.word-display {
  display: grid;
  gap: 0.5ch;
  font-size: 1.25rem;
}

.word {
  display: flex;
  gap: 0.5ch;
}

.letter-wrapper {
  display: inline-grid;
  width: 1.5em;
  height: 1.5em;
  place-content: center;
  background: #eee;
}

.letter {
  text-transform: uppercase;
  font-weight: 550;
}
</style>
