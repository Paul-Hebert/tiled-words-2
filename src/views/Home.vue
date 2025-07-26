<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="home-container">
    <div class="content">
      <h1 class="title">Tiled Words</h1>
      <p class="subtitle">Reconstruct crosswords out of tiles</p>
      <Button href="/instructions">Get Started</Button>

      <router-link to="/levels" style="text-align: center">View Levels</router-link>

      <hr />

      <p><a href="https://paulmakeswebsites.com">Made by Paul Hebert</a></p>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.content {
  display: grid;
  gap: 1rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  font-family: var(--font-serif);
  line-height: 1.2;
  text-align: center;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--color-text-muted);
}

.level-list {
  padding-left: 1em;
}

.level-item {
  margin-bottom: 0.5em;
  font-size: 2rem;
  font-family: var(--font-serif);
  font-weight: 700;
}

.level-link {
  color: inherit;
  font-weight: inherit;
}

hr {
  opacity: 0.2;
}

p {
  text-align: center;
  color: var(--color-text-muted);
}
</style>
