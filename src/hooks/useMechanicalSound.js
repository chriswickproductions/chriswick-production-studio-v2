import { useCallback, useEffect, useRef } from "react";

export function useMechanicalSound() {
  const audioContextRef = useRef(null);
  const voiceBufferRef = useRef(null);
  const playingRef = useRef(false);

  useEffect(() => {
    let active = true;

    // Preload the ElevenLabs recording.
    const loadVoice = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}assets/audio/creative-target-locked.mp3`
        );

        if (!response.ok) {
          throw new Error("Voice file not found");
        }

        const data = await response.arrayBuffer();
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;

        if (!active || !AudioContextClass) return;

        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        const buffer = await ctx.decodeAudioData(data);

        if (active) {
          voiceBufferRef.current = buffer;
        }
      } catch (error) {
        console.warn("ChrisWick voice loading failed:", error);
      }
    };

    loadVoice();

    return () => {
      active = false;
      const ctx = audioContextRef.current;
      audioContextRef.current = null;
      voiceBufferRef.current = null;
      ctx?.close().catch(() => {});
    };
  }, []);

  const playMechanicalSound = useCallback(async () => {
    if (playingRef.current) return;
    playingRef.current = true;

    const ctx = audioContextRef.current;
    if (!ctx) {
      playingRef.current = false;
      return;
    }

    try {
      await ctx.resume();

      const now = ctx.currentTime;

      // Master volume
      const master = ctx.createGain();
      master.gain.value = 0.35;
      master.connect(ctx.destination);

      // Precision mechanical click
      const click = (delay, frequency) => {
        const start = now + delay;

        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = "square";

        oscillator.frequency.setValueAtTime(
          frequency,
          start
        );

        oscillator.frequency.exponentialRampToValueAtTime(
          300,
          start + 0.045
        );

        gain.gain.setValueAtTime(0.13, start);

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          start + 0.055
        );

        oscillator.connect(gain);
        gain.connect(master);

        oscillator.start(start);
        oscillator.stop(start + 0.06);
      };

      // Three clicks, no gunshot
      click(0, 1100);
      click(0.11, 850);
      click(0.22, 1250);

      // Subtle communications connection tone
      const tone = ctx.createOscillator();
      const toneGain = ctx.createGain();

      tone.type = "sine";
      tone.frequency.value = 425;

      const lineStart = now + 0.29;

      toneGain.gain.setValueAtTime(
        0.001,
        lineStart
      );

      toneGain.gain.linearRampToValueAtTime(
        0.045,
        lineStart + 0.05
      );

      toneGain.gain.setValueAtTime(
        0.045,
        lineStart + 0.23
      );

      toneGain.gain.exponentialRampToValueAtTime(
        0.001,
        lineStart + 0.39
      );

      tone.connect(toneGain);
      toneGain.connect(master);

      tone.start(lineStart);
      tone.stop(lineStart + 0.4);

      // ElevenLabs female operator voice
      const buffer = voiceBufferRef.current;

      if (buffer) {
        const voice = ctx.createBufferSource();
        const voiceGain = ctx.createGain();

        voice.buffer = buffer;
        voiceGain.gain.value = 0.9;

        voice.connect(voiceGain);
        voiceGain.connect(ctx.destination);

        voice.start(now + 0.75);
      } else {
        console.warn(
          "ChrisWick voice not ready. Check the MP3 file."
        );
      }
    } catch (error) {
      console.warn("ChrisWick audio error:", error);
    } finally {
      window.setTimeout(() => {
        playingRef.current = false;
      }, 3500);
    }
  }, []);

  return playMechanicalSound;
}
