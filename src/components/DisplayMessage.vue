<script setup lang="ts">
import { useSpellingStore } from '@/stores/spellingStore'

const store = useSpellingStore()
</script>

<template>
  <transition name="fade">
    <div v-if="store.message" class="message">{{ store.message }}</div>
  </transition>
</template>

<style scoped>
.message {
  @apply absolute left-0 right-0 top-0 rounded bg-blue-100 p-2 text-center;
}

.fade-enter-active,
.fade-leave-active {
  @apply duration-500 ease-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply -translate-y-20 transform opacity-0;
}

.fade-enter-to,
.fade-leave-from {
  @apply translate-y-0 transform opacity-100;
}
</style>
