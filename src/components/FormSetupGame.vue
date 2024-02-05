<script setup lang="ts">
import { useSpellingStore } from '@/stores/spellingStore'
import { ref } from 'vue'

const store = useSpellingStore()

const userNameInput = ref(store.userName)
const wordsInput = ref(store.words.join(' '))

const submitHandler = () => {
  const processedWords = wordsInput.value
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
  store.initializeGame(processedWords, userNameInput.value)
}
</script>

<template>
  <form class="form" v-if="!store.gameStarted" @submit.prevent="submitHandler">
    <p v-if="!store.gameStarted">Add some words below and click "Start".</p>
    <label class="sr-only" for="words">Enter spelling words</label>
    <label class="sr-only" for="name">Enter your name (optional)</label>
    <input
      class="input"
      id="name"
      placeholder="Name (optional)"
      type="text"
      v-model="userNameInput"
    />
    <textarea
      class="input"
      id="words"
      placeholder="cat dog fish"
      required
      v-model="wordsInput"
    ></textarea>

    <button type="submit">Start 🐝</button>
  </form>
</template>

<style scoped>
.form {
  @apply mx-auto flex max-w-4xl flex-col items-center justify-center gap-4;
}
.input {
  @apply w-full p-4;
}
</style>
