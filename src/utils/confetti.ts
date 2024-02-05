import confetti from 'canvas-confetti'

/**
 * Triggers a confetti animation.
 */
export default function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  })
}
