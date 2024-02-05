<script setup lang="ts">
import { useSpellingStore } from '@/stores/spellingStore'
import playSound from '@/utils/sounds'
import { computed, ref, watchEffect } from 'vue'

const store = useSpellingStore()

const draggableLetters = ref([])
const letters = ref([])
const dragging = ref(null)
const scrambledLettersComputed = computed(() => store.scrambledWord.split(''))

watchEffect(() => {
  letters.value = scrambledLettersComputed.value.slice()
})

// The user has started dragging a letter.
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
    dragging.value = null
    e.target.classList.remove('dragging')
    e.target.classList.remove('wiggle')
    playSound('click')
  }
}

function checkOrder() {
  if (letters.value.join('') === store.currentWord) {
    store.nextWord()
    playSound('yay')
  } else {
    store.setMessage('😭 Try again!')
    playSound('negative')
  }
}
</script>

<template>
  <div class="draggable-container">
    <div
      v-for="(letter, index) in letters"
      :key="index"
      @dragenter="dragEnter($event, index)"
      @dragleave="dragLeave($event, index)"
      @dragover.prevent
      @dragover="dragOver($event, index)"
      @dragstart="dragStart($event, index)"
      @drop="drop($event, index)"
      @touchend="drop($event, index)"
      @touchmove="dragOver($event, index)"
      @touchstart="dragStart($event, index)"
      class="letter draggable"
      draggable="true"
    >
      {{ letter }}
    </div>
  </div>
  <p v-if="store.gameStarted && !store.gameCompleted">Drag the letters in the correct order</p>
  <div class="buttons-container">
    <button @click="checkOrder">Check Spelling 🐝</button>
    <button @click="store.resetGame">Start Over ♻️</button>
  </div>
</template>

<style scoped>
.draggable-container {
  @apply relative flex flex-wrap items-center justify-center gap-4;
}

.letter {
  @apply rounded border-2 px-5 py-3 text-6xl leading-none shadow-lg;
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

.buttons-container {
  @apply flex flex-wrap items-center justify-center gap-4;
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
