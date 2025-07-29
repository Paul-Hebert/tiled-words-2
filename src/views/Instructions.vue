<script setup lang="ts">
import Button from '@/components/Button.vue'
import MoveExample from '@/components/instructions/MoveExample.vue'
import SpinExample from '@/components/instructions/SpinExample.vue'
import WordsExample from '@/components/instructions/WordsExample.vue'
import { ref, onMounted, onUnmounted } from 'vue'

// Interval management for animations
let animationInterval: number | null = null
const currentInterval = ref(0)

const startAnimation = () => {
  animationInterval = setInterval(() => {
    currentInterval.value++
  }, 1250)
}

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<template>
  <div class="instructions-container">
    <div class="content">
      <h1 class="title">How to Play</h1>

      <ol class="instructions-list">
        <li class="instruction-item">
          <span class="instruction-item-title">Drag tiles to move them</span>
          <MoveExample class="example" :interval="currentInterval" />
        </li>
        <li class="instruction-item">
          <span class="instruction-item-title">Tap tiles to spin them</span>
          <SpinExample class="example" :interval="currentInterval" />
        </li>
        <li class="instruction-item">
          <span class="instruction-item-title">Connect tiles to find all the hinted words</span>
          <WordsExample class="example" :interval="currentInterval" />
        </li>
      </ol>

      <Button href="/level/1" class="go-button">Let's Go!</Button>
    </div>
  </div>
</template>

<style scoped>
.instructions-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.content {
  display: grid;
  gap: 2rem;
}

.title {
  @media (width > 450px) {
    text-align: center;
  }
}

.instructions-list {
  font-size: 1.25rem;
  list-style: none;
  padding: 0;
  display: grid;
  gap: 2rem;

  @media (width >= 850px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.instruction-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 270px;

  @media (width > 450px) and (width < 850px) {
    flex-direction: row-reverse;
    align-items: center;
    max-width: none;
    gap: 2rem;

    > * {
      width: 50%;
    }

    .instruction-item-title {
      font-size: 1.75rem;
    }
  }
}

.instruction-item-title {
  font-family: var(--font-sans);
  font-weight: 600;

  @media (width >= 850px) {
    text-align: center;
  }
}

.go-button {
  width: 300px;
  margin-inline: auto;
}
</style>
