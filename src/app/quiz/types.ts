export type FragranceType = "Terra" | "Ignis" | "Aqua";

export type AnswerOption = {
  text: string;
  value: FragranceType;
};

export type Votes = {
  Terra: number;
  Ignis: number;
  Aqua: number;
};

export type Winner = {
  fragranceType: FragranceType;
  title: string;
  uid?: string;
};
