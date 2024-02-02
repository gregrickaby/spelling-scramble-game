import click from '@/assets/click.mp3'
import negative from '@/assets/negative.mp3'
import start from '@/assets/start.mp3'
import taDa from '@/assets/tada.mp3'
import yay from '@/assets/yay.mp3'

// A map of sound names to their paths.
const sounds: Record<string, string> = {
  click,
  negative,
  start,
  taDa,
  yay
}

/**
 * Play a sound by name.
 */
export default function playSound(name: keyof typeof sounds): void {
  const soundPath = sounds[name]
  if (soundPath) {
    const audio = new Audio(soundPath)
    audio.play()
  }
}
