export interface Participant {
  id: string;
  name: string;
  color: string;
}

export interface WheelConfig {
  spinDuration: number;
  spinEasing: string;
  soundEnabled: boolean;
}