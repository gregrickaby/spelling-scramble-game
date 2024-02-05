<script setup lang="ts">
import FormSetupGame from '@/components/FormSetupGame.vue'
import NameAndPoints from '@/components/NameAndPoints.vue'
import { useSpellingStore } from '@/stores/spellingStore'
import triggerConfetti from '@/utils/confetti'
import playSound from '@/utils/sounds'
import { computed, ref, watchEffect } from 'vue'

const store = useSpellingStore()

const draggableLetters = ref([])
const dragging = ref(null)
const showWord = ref(true)

const currentWord = computed(() => store.currentWord)
const scrambledLettersComputed = computed(() => store.scrambledWord.split(''))

// Whenever scrambledLettersComputed changes, update draggableLetters
watchEffect(() => {
  draggableLetters.value = scrambledLettersComputed.value.slice()
  if (store.gameCompleted === true) {
    triggerConfetti()
    playSound('taDa')
  }
})

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

function checkOrder() {
  if (draggableLetters.value.join('') === store.currentWord) {
    store.nextWord() // Move to the next word if correct
    playSound('yay')
  } else {
    store.setMessage('😭 Try again!')
    playSound('negative')
  }
}
</script>

<template>
  <main class="space-y-8 text-center">
    <FormSetupGame />

    <div
      v-if="store.gameStarted && !store.gameCompleted"
      class="item-center flex flex-col items-center justify-center space-y-8"
    >
      <NameAndPoints />

      <h1 v-show="showWord" class="leading-0 m-0 text-8xl">
        {{ currentWord }}
      </h1>

      <div class="relative flex flex-wrap items-center justify-center gap-4">
        <div
          v-for="(letter, index) in draggableLetters"
          :key="index"
          class="draggable rounded border-2 px-5 py-3 text-6xl leading-none shadow-lg"
          draggable="true"
          @touchstart="dragStart($event, index)"
          @touchmove="dragOver($event, index)"
          @touchend="drop($event, index)"
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
      <p v-if="store.gameStarted && !store.gameCompleted">Drag the letters in the correct order</p>
      <div class="drag-enter flex flex-wrap items-center justify-center gap-4">
        <button @click="checkOrder">Check Spelling 🐝</button>
        <button @click="showWord = !showWord">
          {{ showWord ? 'Hide Word 🙈' : 'Show Word 🐵' }}
        </button>
        <button @click="store.resetGame">Start Over ♻️</button>
      </div>
    </div>

    <div v-if="store.gameCompleted" class="message">
      🎉 Congratulations <span v-if="store.userName">{{ store.userName }}</span
      >! You've spelled all the words correctly!
      <a href="" @click="store.resetGame">Play Again?</a> 🐝
    </div>

    <div v-if="store.message" class="message">{{ store.message }}</div>
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
