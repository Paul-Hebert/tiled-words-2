<script setup lang="ts">
import { computed, ref } from 'vue'
import Level from '../components/Level.vue'
import { levels } from '@/levels'

const props = defineProps<{
  id: string
}>()

const idAsNumber = computed(() => {
  return parseInt(props.id)
})

const currentLevel = computed(() => {
  return levels[idAsNumber.value - 1]
})

const nextLevelId = computed(() => {
  if (idAsNumber.value < levels.length) {
    return idAsNumber.value + 1
  }

  return undefined
})
</script>

<template>
  <div v-if="currentLevel" class="level-view-container">
    <MuteToggleButton />

    <Level
      :theme="currentLevel.theme"
      :words="currentLevel.words"
      :starting-tiles="currentLevel.tiles"
      :board-grid-size="currentLevel.gridSize"
      :key="currentLevel.theme"
      :next-level-id="nextLevelId"
    >
    </Level>
  </div>
</template>

<style scoped>
.level-view-container {
  position: relative;
  width: 100%;
}
</style>
