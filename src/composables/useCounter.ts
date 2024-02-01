import { ref } from 'vue'

export function useCounter() {
  const displayValue = ref(0)

  function animateTo(newValue) {
    let currentValue = displayValue.value
    const step = () => {
      const stepValue = (newValue - currentValue) / 10
      currentValue += stepValue
      if (Math.abs(newValue - currentValue) < 1) {
        displayValue.value = newValue // Stop the animation when close enough
        return
      }
      displayValue.value = Math.floor(currentValue) // Update the displayed value
      requestAnimationFrame(step) // Schedule the next step
    }
    step()
  }

  return { displayValue, animateTo }
}
