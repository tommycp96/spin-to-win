"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import useSound from "use-sound";
import { Participant, WheelConfig } from "@/lib/types";

interface SpinWheelProps {
  participants: Participant[];
  config: WheelConfig;
  onSpinComplete: (winner: Participant) => void;
}

export function SpinWheel({ participants, config, onSpinComplete }: SpinWheelProps) {
  const controls = useAnimation();
  const [winner, setWinner] = useState<Participant | null>(null);
  const [playSpinSound] = useSound("/sounds/spin.mp3", { volume: 0.5 });
  const [playWinSound] = useSound("/sounds/win.mp3", { volume: 0.5 });

  const spinWheel = async () => {
    if (participants.length < 2) return;
    
    const rotations = Math.floor(Math.random() * 5) + 5; // 5-10 full rotations
    const extraDegrees = Math.random() * 360;
    const totalDegrees = rotations * 360 + extraDegrees;
    
    if (config.soundEnabled) {
      playSpinSound();
    }

    await controls.start({
      rotate: totalDegrees,
      transition: {
        duration: config.spinDuration,
        ease: config.spinEasing,
      },
    });

    const winningIndex = Math.floor((360 - (totalDegrees % 360)) / (360 / participants.length));
    const winner = participants[winningIndex];
    setWinner(winner);
    onSpinComplete(winner);

    if (config.soundEnabled) {
      playWinSound();
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const segmentSize = 360 / participants.length;

  return (
    <div className="relative w-full max-w-xl aspect-square">
      <motion.div
        className="w-full h-full rounded-full relative"
        animate={controls}
        style={{ transformOrigin: "center center" }}
      >
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="absolute w-1/2 h-1/2 origin-bottom-right"
            style={{
              transform: `rotate(${index * segmentSize}deg)`,
              backgroundColor: participant.color,
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          >
            <span
              className="absolute text-white font-semibold transform -rotate-90 whitespace-nowrap"
              style={{
                left: "30%",
                top: "20%",
                transform: `rotate(${-90 + segmentSize / 2}deg)`,
              }}
            >
              {participant.name}
            </span>
          </div>
        ))}
      </motion.div>
      <button
        onClick={spinWheel}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                 bg-white rounded-full p-8 shadow-lg hover:shadow-xl transition-shadow
                 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        SPIN
      </button>
    </div>
  );
}