<script setup lang="ts">
import { useCounter } from '@/composables/useCounter'
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
    <span v-if="store.userName">{{ store.userName }}'s</span> Points: {{ displayValue }}
  </div>
</template>

<style scoped>
.points-display {
  font-family: 'Lucida Console', Monaco, monospace;
  font-size: 2rem;
}
</style>
