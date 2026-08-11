import { useCallback, useRef } from "react";

export function useMechanicalSound() {
  const audioRef = useRef(null);

  const playMechanicalSound = useCallback(() => {
    // Create audio only after the visitor clicks the button
    if (!audioRef.current) {
      const audio = new Audio("/assets/audio/contract-load.mp3");

      audio.preload = "auto";
      audio.volume = 0.9;

      // IMPORTANT: never loop this sound
      audio.loop = false;

      audioRef.current = audio;
    }

    // Restart from the beginning if FOR HIRE is clicked again
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    // Play once
    audioRef.current.play().catch((error) => {
      console.warn(
        "ChrisWick contract sound could not play:",
        error
      );
    });
  }, []);

  return playMechanicalSound;
}