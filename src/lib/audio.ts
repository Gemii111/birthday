'use client';

import { Howl } from 'howler';

let bgMusic: Howl | null = null;

export function initBackgroundMusic(url?: string) {
  if (typeof window === 'undefined' || !url) return null;

  try {
    bgMusic = new Howl({
      src: [url],
      html5: true,
      volume: 0.4,
      loop: true,
      onloaderror: () => {
        // Silent fail - music is optional
        console.warn('Background music could not be loaded');
      },
    });
  } catch {
    // Howler might not be available in SSR
  }

  return bgMusic;
}

export function playBackgroundMusic() {
  if (bgMusic && !bgMusic.playing()) {
    bgMusic.play();
  }
}

export function pauseBackgroundMusic() {
  if (bgMusic) {
    bgMusic.pause();
  }
}

export function setMusicVolume(vol: number) {
  if (bgMusic) {
    bgMusic.volume(vol);
  }
}
