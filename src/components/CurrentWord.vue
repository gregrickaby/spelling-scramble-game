<script setup lang="ts">
import { useSpellingStore } from '@/stores/spellingStore'
import { computed, ref } from 'vue'

const store = useSpellingStore()

const showWord = ref(true)
const currentWord = computed(() => store.currentWord)
</script>

<template>
  <h1 class="current-word" v-show="showWord">
    {{ currentWord }}
  </h1>
  <button @click="showWord = !showWord">
    {{ showWord ? 'Hide Word 🙈' : 'Show Word 🐵' }}
  </button>
</template>

<style scoped>
.current-word {
  @apply m-0 text-8xl leading-none;
}
</style>
