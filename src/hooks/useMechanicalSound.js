import { useCallback, useEffect, useRef } from "react";

// The FOR HIRE button plays the prerecorded operator voice directly.
// Keep this hook name to avoid changing the existing Landing component.
export function useMechanicalSound() {
  const voiceRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(
      `${import.meta.env.BASE_URL}assets/audio/creative-target-locked.mp3`
    );
    audio.preload = "auto";
    audio.volume = 1;
    voiceRef.current = audio;
    audio.load();

    return () => {
      audio.pause();
      voiceRef.current = null;
    };
  }, []);

  return useCallback(() => {
    const audio = voiceRef.current;
    if (!audio) {
      console.warn("ChrisWick operator voice is not initialized.");
      return;
    }

    // Play directly in the click handler to satisfy browser audio policies.
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.warn("ChrisWick operator voice could not play:", error);
    });
  }, []);
}
