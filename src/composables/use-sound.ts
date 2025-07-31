import { ref } from 'vue'
import { useSound } from '@vueuse/sound'

const isMuted = ref(true)

const isInitialized = ref(false)

interface Sound {
  name: string
  volume?: number
}

const availableSounds = [
  { name: 'placed.mp3', volume: 0.5 },
  { name: 'success.mp3' },
  { name: 'success-2.mp3' },
  { name: 'whoosh-3.mp3', volume: 0.1 },
]

let soundInstances: Record<string, ReturnType<typeof useSound>> = {}

export function useSoundEffects() {
  if (!isInitialized.value) {
    isInitialized.value = true
    // Create sound instances using @vueuse/sound within the composable
    soundInstances = availableSounds.reduce(
      (acc, sound) => {
        acc[sound.name] = useSound(`/sounds/${sound.name}`, {
          interrupt: true,
          html5: true,
          volume: sound.volume || 1,
        })
        return acc
      },
      {} as Record<string, ReturnType<typeof useSound>>,
    )
  }

  const toggleMuted = () => {
    isMuted.value = !isMuted.value
  }

  const playSound = (name: string) => {
    if (!availableSounds.some((sound) => sound.name === name)) {
      throw new Error(`Sound ${name} not found`)
    }

    if (isMuted.value) return

    const sound = soundInstances[name]
    if (sound && sound.play) {
      sound.play()
    }
  }

  return {
    isMuted,
    toggleMuted,
    playSound,
  }
}
