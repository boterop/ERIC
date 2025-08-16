import { Answer, Dimension } from "@/domain/Answer";

export interface Score {
  calculate(dimension: Dimension, answers: Answer[]): number;
}
