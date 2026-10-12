"use client";

import { useEffect, useState } from "react";

export default function SoundToggle() {
  const [muted, setMuted] = useState(true);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (oscillator) {
        try {
          oscillator.stop();
        } catch {}
      }
    };
  }, [oscillator]);

  const toggleSound = () => {
    if (muted) {
      // Start ambient sound
      if (!audioCtx) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioCtx(ctx);

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Ambient low hum
        osc.type = "sine";
        osc.frequency.value = 55;

        // Very low volume
        gain.gain.value = 0.03;

        // Add a subtle higher harmonic
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.value = 110;
        gain2.gain.value = 0.01;

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc.start();
        osc2.start();

        setOscillator(osc);
        setGainNode(gain);
      } else {
        if (gainNode) {
          gainNode.gain.value = 0.03;
        }
      }
      setMuted(false);
    } else {
      // Mute
      if (gainNode) {
        gainNode.gain.value = 0;
      }
      setMuted(true);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed top-4 right-4 z-50 pixel-card p-2 cursor-pointer transition-colors duration-200 hover:border-accent-amber/40"
      aria-label={muted ? "Unmute ambient sound" : "Mute ambient sound"}
      title={muted ? "Unmute ambient sound" : "Mute ambient sound"}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-accent-cyan"
        shapeRendering="crispEdges"
      >
        {muted ? (
          <>
            <rect x="3" y="10" width="4" height="4" fill="currentColor" opacity="0.4" />
            <rect x="7" y="8" width="4" height="8" fill="currentColor" opacity="0.4" />
            <rect x="11" y="5" width="4" height="14" fill="currentColor" opacity="0.4" />
            <rect x="16" y="9" width="2" height="2" fill="#e06c75" />
            <rect x="20" y="13" width="2" height="2" fill="#e06c75" />
            <rect x="18" y="11" width="2" height="2" fill="#e06c75" />
          </>
        ) : (
          <>
            <rect x="3" y="10" width="4" height="4" fill="currentColor" />
            <rect x="7" y="8" width="4" height="8" fill="currentColor" />
            <rect x="11" y="5" width="4" height="14" fill="currentColor" />
            <rect x="16" y="9" width="2" height="2" fill="currentColor" opacity="0.7" />
            <rect x="20" y="13" width="2" height="2" fill="currentColor" opacity="0.7" />
            <rect x="18" y="11" width="2" height="2" fill="currentColor" opacity="0.7" />
          </>
        )}
      </svg>
    </button>
  );
}
