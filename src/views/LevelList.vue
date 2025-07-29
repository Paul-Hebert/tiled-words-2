<script setup lang="ts">
import { levels } from '@/levels'
import { ArrowLeftIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="home-container">
    <div class="content">
      <h1 class="title">Levels</h1>

      <ol class="level-list">
        <li v-for="(level, index) in levels" :key="level.theme" class="level-item">
          <router-link :to="`/level/${index + 1}`" class="level-link">
            {{ level.theme }}
          </router-link>
        </li>
      </ol>

      <router-link to="/">
        <ArrowLeftIcon aria-hidden="true" width="16" height="16" />
        Go Back
      </router-link>
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

.level-list {
  padding-left: 1em;
}

.level-item {
  margin-bottom: 0.5em;
  font-size: var(--fluid-sizing-xl);
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 600;
}

.level-link {
  color: inherit;
  font-weight: inherit;
}
</style>
