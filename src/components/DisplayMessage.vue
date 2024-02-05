<script setup lang="ts">
import { useSpellingStore } from '@/stores/spellingStore'

const store = useSpellingStore()
</script>

<template>
  <div v-if="store.gameCompleted" class="message">
    🎉 Congratulations <span v-if="store.userName">{{ store.userName }}</span
    >! You've spelled all the words correctly!
    <a href="" @click="store.resetGame">Play Again?</a> 🐝
  </div>

  <div v-if="store.message" class="message">{{ store.message }}</div>
</template>

<style scoped>
.message {
  margin-top: 20px;
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
  padding: 10px;
  border-radius: 4px;
}
</style>
