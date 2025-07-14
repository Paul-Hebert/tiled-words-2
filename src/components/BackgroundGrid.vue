<script setup lang="ts">
defineProps<{ size: number; scale: number }>();
</script>

<template>
  <g class="board">
    <rect :width="size * scale" :height="size * scale" />
    <template v-for="i in size + 1">
      <line
        :x1="0"
        :x2="scale * size"
        :y1="(i - 1) * scale"
        :y2="(i - 1) * scale"
      />
      <line
        :y1="0"
        :y2="scale * size"
        :x1="(i - 1) * scale"
        :x2="(i - 1) * scale"
      />
    </template>
  </g>
</template>

<style scoped>
line {
  stroke: #fff;
  stroke-width: 0.5;
  stroke-linecap: round;
}

rect {
  fill: #eee;
}
</style>
