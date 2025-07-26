<script setup lang="ts">
import Button from '@/components/Button.vue'
import LogoExample from '@/components/instructions/LogoExample.vue'
</script>

<template>
  <div class="home-container">
    <div class="content">
      <div role="heading" aria-level="1" aria-label="Tiled Words">
        <LogoExample />
      </div>
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
