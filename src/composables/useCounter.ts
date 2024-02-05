import { ref } from 'vue'

/**
 * Use counter composable function to animate a numeric value.
 *
 * @returns An object containing:
 * - `displayValue`: a ref to the current displayed value of the counter.
 * - `animateTo`: a function to animate the counter to a new value.
 */
export default function useCounter() {
  const displayValue = ref<number>(0)

  // Track the requestAnimationFrame ID for cancelation.
  let frameId: number | null = null

  /**
   * Animates the counter value to a new value over a fixed duration.
   *
   * @param newValue - The new value to animate to.
   */
  function animateTo(newValue: number): void {
    // Cancel any ongoing animation to prevent overlaps.
    if (frameId !== null) {
      cancelAnimationFrame(frameId)
    }

    const duration: number = 300
    const startTime: number = performance.now()
    const startValue: number = displayValue.value

    /**
     * The step function to be executed each animation frame.
     *
     * @param currentTime - The current time provided by requestAnimationFrame.
     */
    const step = (currentTime: number) => {
      const elapsedTime: number = currentTime - startTime
      const progress: number = Math.min(elapsedTime / duration, 1) // Ensure progress doesn't exceed 1

      // Linear easing calculation, can be replaced with other easing functions.
      displayValue.value = Math.round(startValue + (newValue - startValue) * progress)

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      } else {
        frameId = null
      }
    }

    frameId = requestAnimationFrame(step)
  }

  return { displayValue, animateTo }
}
