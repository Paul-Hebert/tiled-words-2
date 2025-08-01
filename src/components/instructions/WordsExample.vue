<script setup lang="ts">
import WordsSection from '@/components/WordsSection.vue'
import { computed } from 'vue'

interface Props {
  interval: number
}

const props = defineProps<Props>()

const words = {
  vertical: [{ text: 'goose', hint: 'Duck, duck, _____' }],
  horizontal: [
    { text: 'lion', hint: 'King of the jungle' },
    { text: 'stuck', hint: 'Stick, stack, _____' },
  ],
}

const foundWords = computed<string[]>(() => {
  const currentIndex = props.interval

  const result: string[] = []

  if (Math.floor((currentIndex + 1) / 2) % 2 === 1) {
    result.push('lion')
  }

  if (Math.floor(currentIndex / 2) % 4 === 1) {
    result.push('goose')
  }

  return result
})
</script>

<template>
  <div class="words-example">
    <WordsSection :words="words" :found-words="foundWords" class="words-example-inner" />
  </div>
</template>

<style scoped>
.words-example {
  border: 3px dashed var(--color-background-secondary);
  background-color: var(--color-background-tertiary);
  padding: 1rem;
  display: grid;
  flex-grow: 1;
  align-items: start;
  gap: 0.5rem;
}

.words-example-inner {
  gap: 0.5em;
}
</style>
