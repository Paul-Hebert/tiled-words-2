<script setup lang="ts">
import Button from '@/components/Button.vue'
import LogoExample from '@/components/instructions/LogoExample.vue'
</script>

<template>
  <div class="home-container">
    <div role="heading" aria-level="1" aria-label="Tiled Words" class="logo">
      <LogoExample />
    </div>
    <div class="content">
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
  min-height: 100svh;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.content {
  display: grid;
  gap: 1rem;
  max-width: 20rem;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--color-text-muted);
}

hr {
  opacity: 0.2;
}

p {
  text-align: center;
  color: var(--color-text-muted);
}

.logo {
  width: min(30rem, 100%);
}
</style>
