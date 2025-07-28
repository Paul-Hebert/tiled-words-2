import { ref } from 'vue'

export const audioContext = new AudioContext()

const sounds: Record<string, HTMLAudioElement> = {}
const isMuted = ref(true)

const availableSounds = ['placed.mp3', 'success.mp3', 'success-2.mp3', 'whoosh-3.mp3']

availableSounds.forEach((sound) => {
  sounds[sound] = new Audio(`/sounds/${sound}`)
})

// TODO in the future check muted state, etc.
export function useSound() {
  const toggleMuted = () => {
    console.log('toggleMuted', isMuted.value)
    isMuted.value = !isMuted.value
  }

  const playSound = (name: string, volume: number = 1.0) => {
    if (!availableSounds.includes(name)) {
      throw new Error(`Sound ${name} not found`)
    }

    if (isMuted.value) return

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
