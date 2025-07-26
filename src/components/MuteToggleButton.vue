<script setup lang="ts">
import { Volume2, VolumeOff } from 'lucide-vue-next'
import { useSound } from '../composables/use-sound'
import Button from './Button.vue'

const { isMuted, toggleMuted } = useSound()
</script>

<template>
  <Button round @click="toggleMuted" class="mute-toggle-btn">
    <Volume2 v-if="!isMuted" class="icon" aria-label="Mute" />
    <VolumeOff v-else class="icon" aria-label="Unmute" />
  </Button>
</template>

<style scoped>
.icon {
  width: 1.5rem;
  height: 1.5rem;
  stroke: currentColor;
}
</style>
