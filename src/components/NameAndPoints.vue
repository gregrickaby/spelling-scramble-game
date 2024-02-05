<script setup lang="ts">
import useCounter from '@/composables/useCounter'
import { useSpellingStore } from '@/stores/spellingStore'
import { watch } from 'vue'

const store = useSpellingStore()

const { displayValue, animateTo } = useCounter()

watch(
  () => store.userPoints,
  (newPoints) => {
    animateTo(newPoints)
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="store.gameStarted" class="points-display">
    <span v-if="store.userName" class="name">{{ store.userName }}:</span>
    <span class="points">{{ displayValue }} points</span>
  </div>
</template>

<style scoped>
.points-display {
  @apply absolute right-2 top-0;
}

.name {
  @apply mr-4 font-bold;
}

.points {
  @apply font-mono;
}
</style>
