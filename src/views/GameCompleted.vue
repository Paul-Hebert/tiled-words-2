<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="game-completed">
    <h1 class="title">You've beaten all of the levels!</h1>

    <p>Congratulations!</p>

    <p>
      This is a demo version and we're working on adding more exciting levels. Stay tuned for
      updates!
    </p>

    <div class="actions">
      <Button href="/" animate-in> Home </Button>
      <Button href="/levels" animate-in> Play Again </Button>
    </div>
  </div>
</template>

<style scoped>
.game-completed {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  gap: 1.5rem;
}

p {
  font-size: 1.5rem;
  color: var(--color-text-muted);
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
