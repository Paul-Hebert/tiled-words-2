<script setup lang="ts">
defineProps<{
  round?: boolean
  href?: string
}>()
</script>

<template>
  <component :is="href ? 'router-link' : 'button'" class="button" :class="{ round }" :to="href">
    <span class="button-inner">
      <slot />
    </span>
  </component>
</template>

<style scoped>
.button {
  --translation: 0.25em;
  --border-radius: 0.5em;

  color: hsl(210, 100%, 40%);
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
  --translation: 0.5em;
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
  background: #fff;
  border: 1px solid #ddd;
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
  width: 100%;
  height: 100%;
}

.button::before {
  content: '';
  background: #ddd;
  position: absolute;
  inset: 0;
}

.button:focus-visible .button-inner {
  outline: 3px solid hsl(210, 100%, 40%);
}
</style>
