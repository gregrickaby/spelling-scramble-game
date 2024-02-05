<script lang="ts">
import { useSpellingStore } from '@/stores/spellingStore'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

/**
 * VueDraggableNext requires defineComponent instead of setup.
 *
 * @see https://github.com/anish2690/vue-draggable-next
 */
export default defineComponent({
  components: {
    VueDraggableNext
  },
  setup() {
    const store = useSpellingStore()
    const scrambledLetters = ref<string[]>([])

    // Scramble the letters of the current word.
    const scramble = (word: string) => word.split('').sort(() => Math.random() - 0.5)

    // When the component is mounted, scramble the letters of the current word.
    onMounted(() => {
      scrambledLetters.value = scramble(store.currentWord)
    })

    // When the current word changes, scramble the letters of the new word.
    watch(
      () => store.currentWord,
      (newWord) => {
        scrambledLetters.value = scramble(newWord)
      }
    )

    // Check the order of the letters against the current word.
    const checkOrder = () => {
      store.checkOrder(scrambledLetters.value)
    }

    return { store, scrambledLetters, checkOrder }
  }
})
</script>

<template>
  <VueDraggableNext
    v-model="scrambledLetters"
    class="draggable-container"
    @end="store.playSound('click')"
  >
    <div v-for="(letter, index) in scrambledLetters" :key="index">
      <div class="letter draggable">
        {{ letter }}
      </div>
    </div>
  </VueDraggableNext>
  <div class="buttons-container">
    <button v-if="!store.gameCompleted" @click="checkOrder">Check Spelling 🐝</button>
    <button v-if="!store.gameCompleted" @click="store.showWord = !store.showWord">
      {{ store.showWord ? 'Hide Word 🙈' : 'Show Word 🐵' }}
    </button>
    <button @click="store.resetGame">
      {{ store.gameCompleted ? 'Play Again? 🐝' : 'Start Over ♻️' }}
    </button>
  </div>
</template>

<style scoped>
.draggable-container {
  @apply relative flex flex-wrap items-center justify-center gap-4;
}

.letter {
  @apply rounded border-2 px-5 py-3 text-6xl leading-none shadow-lg;
}

.sortable-ghost {
  @apply bg-slate-100;

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
    transform: scale(1.1) rotate(-3deg);
  }
  50% {
    transform: scale(1.1) rotate(3deg);
  }
}
</style>
