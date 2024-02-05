<script setup lang="ts">
import CurrentWord from '@/components/CurrentWord.vue'
import DisplayMessage from '@/components/DisplayMessage.vue'
import DraggableLetters from '@/components/DraggableLetters.vue'
import FormSetupGame from '@/components/FormSetupGame.vue'
import NameAndPoints from '@/components/NameAndPoints.vue'
import { useSpellingStore } from '@/stores/spellingStore'

const store = useSpellingStore()
</script>

<template>
  <NameAndPoints />
  <DisplayMessage />
  <main class="main">
    <FormSetupGame />
    <section class="game" v-if="store.gameStarted">
      <CurrentWord />
      <DraggableLetters />
    </section>
  </main>
</template>

<style scoped>
.main {
  @apply space-y-8 text-center;
}

.game {
  @apply flex flex-col items-center justify-center space-y-8;
}
</style>
