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
  <div class="words-section-container">
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
  </div>
</template>

<style scoped>
.words-section-container {
  display: grid;
  gap: 1rem;
}

.words-header {
  font-size: 1.125rem;
  font-weight: 650;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin: 0;
  font-family: var(--font-sans);
  color: var(--color-text-muted);
}

.words-section {
  display: grid;
}

.words {
  padding: 0;
}
</style>
