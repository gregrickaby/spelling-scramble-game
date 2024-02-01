import { defineStore } from 'pinia'

export const useSpellingStore = defineStore('spelling', {
  state: () => ({
    words: [] as string[],
    currentIndex: 0,
    gameCompleted: false,
    message: '',
    points: 0,
    name: ''
  }),
  getters: {
    currentWord(state): string {
      return state.words[state.currentIndex] || '' // Return an empty string if undefined
    },
    scrambledWord(): string {
      // Ensure there's a word to scramble
      if (this.currentWord) {
        const shuffled = this.currentWord
          .split('')
          .sort(() => 0.5 - Math.random())
          .join('')
        return shuffled
      }
      return '' // Return an empty string if currentWord is undefined or empty
    }
  },
  actions: {
    addWords(newWords: string[]) {
      this.words.push(...newWords)
    },
    nextWord() {
      if (this.currentIndex < this.words.length - 1) {
        this.currentIndex++
        this.gameCompleted = false // Reset completion state if not the last word
        this.setMessage('🥳 Correct!')
        this.addPoints(this.currentWord.length)
      } else {
        this.gameCompleted = true // Set to true to indicate game completion
        this.addPoints(50)
      }
    },
    resetGame() {
      this.words = []
      this.currentIndex = 0
      this.gameCompleted = false // Reset completion state
      this.message = '' // Clear message
      this.points = 0 // Reset points
    },
    setName(newName: string) {
      this.name = newName
    },
    setMessage(newMessage) {
      this.message = newMessage
      setTimeout(() => this.clearMessage(), 2000)
    },
    clearMessage() {
      this.message = ''
    },
    addPoints(points: number) {
      this.points += points
    }
  }
})
