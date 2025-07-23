import { ref } from 'vue'

export const audioContext = new AudioContext()

const sounds: Record<string, HTMLAudioElement> = {}
const isMuted = ref(true)

// TODO in the future check muted state, etc.
export function useSound() {
  const toggleMuted = () => {
    console.log('toggleMuted', isMuted.value)
    isMuted.value = !isMuted.value
  }

  const playSound = (name: string, volume: number = 1.0) => {
    console.log('playSound', name, isMuted.value, volume)
    if (isMuted.value) return

    if (!sounds[name]) {
      sounds[name] = new Audio(`/sounds/${name}`)
    }

    sounds[name].volume = Math.max(0, Math.min(1, volume)) // Clamp volume between 0 and 1
    sounds[name].fastSeek(0)
    sounds[name].play()
  }

  return {
    isMuted,
    toggleMuted,
    playSound,
  }
}
