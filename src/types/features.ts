export type Step = {
  pos: number;
  text: string;
};

export type Settings = {
  frequency: number[];
};

export type Rehearsal = {
  id: string;
  title: string;
  steps: Step[];
  settings: Settings;
};

export type Day = {
  id: number;
  shorthand: string;
  name: string;
};
