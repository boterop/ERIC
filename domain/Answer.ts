export type Dimension = "procedural" | "emotional" | "cognitive" | "critical";

export interface Answer {
  id?: string;
  question: number;
  value: number;
  dimension: Dimension;
}
