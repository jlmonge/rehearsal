export interface Step {
  pos: number;
  text: string;
}

export interface Settings {
  frequency: number[];
}

export interface Rehearsal {
  id: string;
  title: string;
  steps: Step[];
  settings: Settings;
}

export interface Day {
  id: number;
  shorthand: string;
  name: string;
}
