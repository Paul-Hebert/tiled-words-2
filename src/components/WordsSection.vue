<script setup lang="ts">
import type { Word } from '@/types'
import WordDisplay from './WordDisplay.vue'

defineProps<{
  words: {
    horizontal: Word[]
    vertical: Word[]
  }
  foundWords: string[]
}>()
</script>

<template>
  <div class="words-section">
    <h2 class="words-header">Across</h2>
    <ul class="words">
      <WordDisplay
        v-for="word in words.horizontal"
        :key="word.text"
        :word="word"
        :is-found="foundWords.some((foundWord) => foundWord === word.text)"
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
        :is-found="foundWords.some((foundWord) => foundWord === word.text)"
      />
    </ul>
  </div>
</template>

<style scoped>
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

.words {
  padding: 0;
}
</style>
