<script setup lang="ts">
import { useSpellingStore } from '@/stores/spellingStore'
import type { ComputedRef, StyleValue } from 'vue'
import { computed } from 'vue'

const store = useSpellingStore()

const currentWord = computed(() => store.currentWord)

const wordStyle: ComputedRef<StyleValue> = computed(() => ({
  opacity: store.showWord ? '1' : '0',
  visibility: store.showWord ? 'visible' : 'hidden',
  transition: 'opacity 0.5s ease, visibility 0.5s'
}))
</script>

<template>
  <div :style="wordStyle">
    <h1 class="current-word">
      {{ currentWord }}
    </h1>
  </div>
</template>

<style scoped>
.current-word {
  @apply m-0 text-8xl leading-none;
}
</style>
