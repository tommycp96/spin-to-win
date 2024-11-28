"use client";

import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { WheelConfig } from "@/lib/types";

interface WheelConfigProps {
  config: WheelConfig;
  onChange: (config: WheelConfig) => void;
}

export function WheelConfigPanel({ config, onChange }: WheelConfigProps) {
  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <Label>Spin Duration (seconds)</Label>
        <Slider
          value={[config.spinDuration]}
          onValueChange={([value]) =>
            onChange({ ...config, spinDuration: value })
          }
          min={2}
          max={10}
          step={0.5}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Sound Effects</Label>
        <Switch
          checked={config.soundEnabled}
          onCheckedChange={(checked) =>
            onChange({ ...config, soundEnabled: checked })
          }
        />
      </div>
    </div>
  );
}