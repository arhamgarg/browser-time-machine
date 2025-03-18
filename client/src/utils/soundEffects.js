/**
 * Sound effects utility for Browser Time Machine
 */

// Define sound paths
export const SOUNDS = {
  DIALUP: '/sounds/dialup.mp3',
  ERROR: '/sounds/error.mp3',
  SUCCESS: '/sounds/success.mp3',
  CLICK: '/sounds/click.mp3',
  STARTUP: '/sounds/startup.mp3',
  SHUTDOWN: '/sounds/shutdown.mp3'
};

/**
 * Play a sound effect with volume control
 * @param {string} soundPath - Path to the sound file
 * @param {number} volume - Volume level (0.0 to 1.0)
 * @param {boolean} loop - Whether the sound should loop
 * @returns {HTMLAudioElement} - The audio element
 */
export const playSound = (soundPath, volume = 0.5, loop = false) => {
  if (!soundPath) return null;
  
  try {
    const audio = new Audio(soundPath);
    audio.volume = volume;
    audio.loop = loop;
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Audio play failed:', error);
      });
    }
    
    return audio;
  } catch (error) {
    console.error('Error playing sound:', error);
    return null;
  }
};

/**
 * Stop a currently playing sound
 * @param {HTMLAudioElement} audioElement - The audio element to stop
 */
export const stopSound = (audioElement) => {
  if (!audioElement) return;
  
  try {
    audioElement.pause();
    audioElement.currentTime = 0;
  } catch (error) {
    console.error('Error stopping sound:', error);
  }
};

/**
 * Play connection sound based on connection speed
 * @param {string} connectionSpeed - Connection speed identifier
 * @param {boolean} soundEnabled - Whether sound is enabled
 * @returns {HTMLAudioElement|null} - The audio element or null
 */
export const playConnectionSound = (connectionSpeed, soundEnabled) => {
  if (!soundEnabled) return null;
  
  // Old connections get dialup sound
  if (['14.4k', '28.8k', '56k'].includes(connectionSpeed)) {
    return playSound(SOUNDS.DIALUP, 0.4);
  }
  
  // Medium connections get a faster sound
  if (['ISDN', 'DSL', 'Cable'].includes(connectionSpeed)) {
    return playSound(SOUNDS.STARTUP, 0.3);
  }
  
  // Fast connections just get a quick success sound
  return playSound(SOUNDS.SUCCESS, 0.2);
};

export default {
  SOUNDS,
  playSound,
  stopSound,
  playConnectionSound
};
