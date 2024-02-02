<script setup lang="ts">
import { useCounter } from '@/composables/useCounter'
import { useSpellingStore } from '@/stores/spellingStore'
import triggerConfetti from '@/utils/confetti'
import playSound from '@/utils/sounds'
import { computed, ref, watch, watchEffect } from 'vue'

const store = useSpellingStore()
const name = ref('')
const newWords = ref('')
const start = ref(false)
const draggableLetters = ref([])
const dragging = ref(null)
const showWord = ref(true)
const currentWord = computed(() => store.currentWord)
const scrambledLettersComputed = computed(() => store.scrambledWord.split(''))
const gameMessage = computed(() => store.message)
const gameCompleted = computed(() => store.gameCompleted)
const { displayValue, animateTo } = useCounter()

// Whenever scrambledLettersComputed changes, update draggableLetters
watchEffect(() => {
  draggableLetters.value = scrambledLettersComputed.value.slice()
  if (gameCompleted.value === true) {
    triggerConfetti()
    playSound('taDa')
  }
})

watch(
  () => store.points,
  (newPoints) => {
    animateTo(newPoints)
  },
  { immediate: true }
)

// The user is dragging a letter.
function dragStart(e, index) {
  e.dataTransfer.setData('text/plain', index.toString())
  dragging.value = index
  e.target.classList.add('dragging')
}

// The user is dragging a letter over another letter.
function dragEnter(e, index) {
  if (index !== dragging.value) {
    e.target.classList.add('wiggle')
  }
}

function dragOver(e, index) {
  e.preventDefault()
}

// The user is dragging a letter out of another letter.
function dragLeave(e, index) {
  e.target.classList.remove('wiggle')
  e.target.classList.remove('dragging')
}

// The user has dropped a letter.
function drop(e, index) {
  if (dragging.value !== null) {
    const draggedItem = draggableLetters.value.splice(dragging.value, 1)[0]
    draggableLetters.value.splice(index, 0, draggedItem)
    dragging.value = null // Reset dragging index
    e.target.classList.remove('dragging')
    e.target.classList.remove('wiggle')
    playSound('click')
  }
}

function addWordsAndStart() {
  const wordsArray = newWords.value.split(',').map((word) => word.trim())
  store.addWords(wordsArray)
  start.value = true
  playSound('start')
}

function checkOrder() {
  if (draggableLetters.value.join('') === store.currentWord) {
    store.nextWord() // Move to the next word if correct
    playSound('yay')
  } else {
    store.setMessage('😭 Try again!')
    playSound('negative')
  }
}

function resetGame() {
  store.resetGame() // Reset the store state
  newWords.value = '' // Clear the input field
  start.value = false // Hide the game interface
  draggableLetters.value = [] // Clear the draggable letters
}
</script>

<template>
  <main class="space-y-8 text-center">
    <div v-if="start" class="points-display">
      <span v-if="name">{{ name }}'s</span> Points: {{ displayValue }}
    </div>

    <form
      v-if="!start"
      @submit.prevent="addWordsAndStart"
      class="flex flex-col items-center justify-center gap-4"
    >
      <label class="sr-only" for="words">Enter words separated by commas</label>
      <label class="sr-only" for="name">Enter your name (optional)</label>
      <input
        v-model="name"
        id="name"
        type="text"
        class="w-full p-4"
        placeholder="Enter your name (optional)"
      />
      <textarea
        id="words"
        class="w-full p-4"
        placeholder="Enter words separated by commas (required)"
        required
        v-model="newWords"
      ></textarea>
      <p v-if="!start">To get started, add some words above and click "Start".</p>
      <button type="submit">Start 🐝</button>
    </form>

    <div
      v-if="start && !gameCompleted"
      class="item-center flex flex-col items-center justify-center space-y-8"
    >
      <h1 v-show="showWord" class="leading-0 m-0 text-8xl">
        {{ currentWord }}
      </h1>

      <div class="relative flex flex-wrap items-center justify-center gap-4">
        <div
          v-for="(letter, index) in draggableLetters"
          :key="index"
          class="draggable rounded border-2 px-5 py-3 text-6xl leading-none shadow-lg"
          draggable="true"
          @dragstart="dragStart($event, index)"
          @dragover.prevent
          @dragover="dragOver($event, index)"
          @dragenter="dragEnter($event, index)"
          @dragleave="dragLeave($event, index)"
          @drop="drop($event, index)"
        >
          {{ letter }}
        </div>
      </div>
      <p v-if="start && !gameCompleted">Drag the letters in the correct order</p>
      <div class="drag-enter flex flex-wrap items-center justify-center gap-4">
        <button @click="checkOrder">Check Spelling 🐝</button>
        <button @click="showWord = !showWord">
          {{ showWord ? 'Hide Word 🙈' : 'Show Word 🐵' }}
        </button>
        <button @click="resetGame">Start Over ♻️</button>
      </div>
    </div>

    <div v-if="gameCompleted" class="message">
      🎉 Congratulations <span v-if="name">{{ name }}</span
      >! You've spelled all the words correctly! <a href="" @click="resetGame">Play Again?</a> 🐝
    </div>

    <div v-if="gameMessage" class="message">{{ gameMessage }}</div>
  </main>
</template>

<style>
.message {
  margin-top: 20px;
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
  padding: 10px;
  border-radius: 4px;
}

.draggable {
  cursor: move;
  user-select: none;
}

.dragging {
  opacity: 0.5;
}

.wiggle {
  animation: wiggleAndScale 0.5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
}

.points-display {
  font-family: 'Lucida Console', Monaco, monospace;
  font-size: 2rem;
}

@keyframes wiggleAndScale {
  0%,
  100% {
    transform: scale(1.2) rotate(-3deg);
  }
  50% {
    transform: scale(1.2) rotate(3deg);
  }
}
</style>
