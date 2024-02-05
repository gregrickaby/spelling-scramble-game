import triggerConfetti from '@/utils/confetti'
import playSound from '@/utils/sounds'
import { defineStore } from 'pinia'

/**
 * This store is used to manage the state of the game.
 *
 * @see https://pinia.vuejs.org/
 * @see https://prazdevs.github.io/pinia-plugin-persistedstate/
 */
export const useSpellingStore = defineStore('spellingScramble', {
  state: () => ({
    currentIndex: 0,
    enablePersistance: true,
    gameCompleted: false,
    gameStarted: false,
    message: '',
    userName: '',
    userPoints: 0,
    words: [] as string[]
  }),
  getters: {
    currentWord(state): string {
      return state.words[state.currentIndex] || ''
    }
  },
  actions: {
    initializeGame(words: string[], name: string) {
      this.userName = name
      this.words = words
      this.gameStarted = true
      playSound('start')
    },
    nextWord() {
      if (this.currentIndex < this.words.length - 1) {
        this.currentIndex++
        this.gameCompleted = false
        this.setMessage('🥳 Correct!')
        this.addPoints(this.currentWord.length)
        playSound('yay')
      } else {
        this.endGame()
      }
    },
    endGame() {
      this.addPoints(50)
      triggerConfetti()
      playSound('tada')
      this.message = '🎉 Congratulations! You completed the game!'
      this.gameCompleted = true
    },
    setMessage(newMessage: string) {
      this.message = newMessage
      setTimeout(() => this.clearMessage(), 2000)
    },
    clearMessage() {
      this.message = ''
    },
    addPoints(points: number) {
      this.userPoints += points
    },
    resetGame() {
      this.currentIndex = 0
      this.gameCompleted = false
      this.gameStarted = false
      this.message = ''
      this.userPoints = 0
    }
  },
  persist: true
})
