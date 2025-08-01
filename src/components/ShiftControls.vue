<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRightIcon, ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-vue-next'
import Button from './Button.vue'
import type { ShiftDirection } from '../../helpers/shift-tiles'

const emit = defineEmits<{
  shift: [direction: ShiftDirection]
}>()

const leftButtonRef = ref<InstanceType<typeof Button> | null>(null)
const upButtonRef = ref<InstanceType<typeof Button> | null>(null)
const downButtonRef = ref<InstanceType<typeof Button> | null>(null)
const rightButtonRef = ref<InstanceType<typeof Button> | null>(null)

const triggerShift = (direction: ShiftDirection) => {
  emit('shift', direction)
}

const fakePress = (direction: ShiftDirection) => {
  const buttonRefs = {
    left: leftButtonRef,
    up: upButtonRef,
    down: downButtonRef,
    right: rightButtonRef,
  }

  const buttonRef = buttonRefs[direction]
  if (buttonRef?.value?.fakePress) {
    buttonRef.value.fakePress()
  }
}

// Expose the fakePress method
defineExpose({
  fakePress,
})
</script>

<template>
  <div class="shift-controls">
    <Button
      ref="leftButtonRef"
      @click="() => triggerShift('left')"
      class="shift-button"
      aria-label="Move all tiles left"
    >
      <ArrowLeftIcon class="shift-icon" stroke-width="3" aria-hidden="true" />
    </Button>
    <Button
      ref="upButtonRef"
      @click="() => triggerShift('up')"
      class="shift-button"
      aria-label="Move all tiles up"
    >
      <ArrowUpIcon class="shift-icon" stroke-width="3" aria-hidden="true" />
    </Button>
    <Button
      ref="downButtonRef"
      @click="() => triggerShift('down')"
      class="shift-button"
      aria-label="Move all tiles down"
    >
      <ArrowDownIcon class="shift-icon" stroke-width="3" aria-hidden="true" />
    </Button>
    <Button
      ref="rightButtonRef"
      @click="() => triggerShift('right')"
      class="shift-button"
      aria-label="Move all tiles right"
    >
      <ArrowRightIcon class="shift-icon" stroke-width="3" aria-hidden="true" />
    </Button>
  </div>
</template>

<style scoped>
.shift-controls {
  display: flex;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;

  > * {
    flex-basis: 100%;
  }

  @media (width >= 800px) {
    justify-content: center;

    > * {
      flex-basis: 8rem;
    }
  }
}

.shift-icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
