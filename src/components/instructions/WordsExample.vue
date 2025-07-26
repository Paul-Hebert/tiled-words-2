<script setup lang="ts">
import WordsSection from '@/components/WordsSection.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const words = {
  vertical: [{ text: 'goose', hint: 'Duck, duck, _____' }],
  horizontal: [{ text: 'lion', hint: 'King of the jungle' }],
}

const foundWords = ref<string[]>([])

let animationInterval: number | null = null

// Animate the first tile position
const animateTiles = () => {
  let currentIndex = 0

  animationInterval = setInterval(() => {
    currentIndex++

    if (currentIndex % 2 === 1) {
      foundWords.value.push('lion')
    } else {
      foundWords.value = foundWords.value.filter((word) => word !== 'lion')
    }

    if (currentIndex % 4 === 1) {
      foundWords.value.push('goose')
    } else {
      foundWords.value = foundWords.value.filter((word) => word !== 'goose')
    }
  }, 1000)
}

onMounted(() => {
  animateTiles()
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<template>
  <div class="words-example">
    <WordsSection :words="words" :found-words="foundWords" class="words-example-inner" />
  </div>
</template>

<style scoped>
.words-example {
  border: 3px dashed #eee;
  background-color: #f9f9f9;
  padding: 1rem;
  display: grid;
  flex-grow: 1;
}

.words-example-inner {
  gap: 1em;
}
</style>
