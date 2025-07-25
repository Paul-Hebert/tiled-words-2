<script setup lang="ts">
import { Volume2, VolumeOff } from 'lucide-vue-next'
import { useSound } from '../composables/use-sound'

const { isMuted, toggleMuted } = useSound()
</script>

<template>
  <button @click="toggleMuted" class="mute-toggle-btn">
    <Volume2 v-if="!isMuted" class="icon" aria-label="Mute" />
    <VolumeOff v-else class="icon" aria-label="Unmute" />
  </button>
</template>

<style scoped>
.mute-toggle-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #333;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.mute-toggle-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.mute-toggle-btn:active {
  transform: scale(0.95);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #333;
}
</style>
