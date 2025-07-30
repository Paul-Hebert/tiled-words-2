<script setup lang="ts">
defineProps<{
  round?: boolean
  href?: string
  animateIn?: boolean
  big?: boolean
}>()
</script>

<template>
  <component
    :is="href ? 'router-link' : 'button'"
    class="button"
    :class="{ round, 'animate-in': animateIn, big }"
    :to="href"
  >
    <span class="button-inner">
      <slot />
    </span>
  </component>
</template>

<style scoped>
.button {
  --translation-modifier: 1;
  --translation: calc(0.25em * var(--translation-modifier));
  --border-radius: 0.5em;

  color: var(--color-interactive);
  background: none;
  border: none;
  appearance: none;
  border-radius: var(--border-radius);
  height: 3rem;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  position: relative;
  font-size: 1.25rem;
  padding: 0 1px;
  display: block;
  text-decoration: none;
}

.round {
  --border-radius: 50%;
}

.round .button-inner {
  aspect-ratio: 1;
}

.button:hover {
  --translation: calc(0.5em * var(--translation-modifier));
}

.button:active {
  --translation: 0;
}

.button:focus {
  outline: none;
}

.button-inner,
.button::before {
  border-radius: inherit;
}

.button-inner {
  background: var(--color-background);
  border: 1px solid var(--color-interactive-secondary);
  border-radius: inherit;
  translate: 0 calc(var(--translation) * -1);
  transition: translate 0.1s ease-out;
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  user-select: none;
  padding: 0.5em;
  will-change: transform;
  width: calc(100% + 2px);
  margin-inline: -1px;
  height: 100%;
  font-weight: 600;
}

.button.big {
  --translation-modifier: 2.5;

  .button-inner {
    padding: 1.5rem;
  }
}

.button.animate-in .button-inner {
  animation: animateIn 1s var(--ease-out-back) both;
}

.button::before {
  content: '';
  background: var(--color-interactive-secondary);
  position: absolute;
  inset: 0;
}

.button:focus-visible .button-inner {
  outline: 3px solid var(--color-interactive);
}

@keyframes animateIn {
  from {
    transform: translate(0, var(--translation));
  }
}
</style>
