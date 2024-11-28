"use client";

import { useState } from "react";
import { SpinWheel } from "@/components/SpinWheel";
import { WheelConfigPanel } from "@/components/WheelConfig";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { Participant, WheelConfig } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const INITIAL_CONFIG: WheelConfig = {
  spinDuration: 5,
  spinEasing: "easeInOut",
  soundEnabled: true,
};

const DEMO_PARTICIPANTS: Participant[] = [
  { id: "1", name: "Alice", color: "#FF6B6B" },
  { id: "2", name: "Bob", color: "#4ECDC4" },
  { id: "3", name: "Charlie", color: "#45B7D1" },
  { id: "4", name: "David", color: "#96CEB4" },
  { id: "5", name: "Eve", color: "#FFEEAD" },
];

export default function SpinToWin() {
  const { toast } = useToast();
  const [participants] = useState<Participant[]>(DEMO_PARTICIPANTS);
  const [config, setConfig] = useLocalStorage<WheelConfig>("wheelConfig", INITIAL_CONFIG);
  const [winner, setWinner] = useState<Participant | null>(null);

  const handleSpinComplete = (winner: Participant) => {
    setWinner(winner);
    toast({
      title: "We have a winner! 🎉",
      description: `Congratulations, ${winner.name}!`,
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Spin to Win</h1>
          <p className="text-muted-foreground">
            Spin the wheel to randomly select a winner from the demo participants!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center space-y-6">
            <SpinWheel
              participants={participants}
              config={config}
              onSpinComplete={handleSpinComplete}
            />
            {winner && (
              <Card className="p-4 text-center bg-primary text-primary-foreground">
                <p className="text-lg font-semibold">Winner: {winner.name} 🎉</p>
              </Card>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Demo Participants</h2>
              <div className="space-y-2">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center p-3 bg-card rounded-lg"
                    style={{ borderLeft: `4px solid ${participant.color}` }}
                  >
                    <span className="font-medium">{participant.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Settings</h2>
              <WheelConfigPanel config={config} onChange={setConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}