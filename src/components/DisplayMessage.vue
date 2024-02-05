<script setup lang="ts">
import { useSpellingStore } from '@/stores/spellingStore'

const store = useSpellingStore()
</script>

<template>
  <div v-if="store.message" class="message">{{ store.message }}</div>
</template>

<style scoped>
.message {
  @apply mt-2 rounded border border-blue-300 bg-blue-100 p-2;
}
</style>
