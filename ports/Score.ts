import { Answer, Dimension } from "@/domain/Answer";
import { Level } from "@/domain/Level";

export interface Score {
  toLevel(score: number): Level;
  calculate(dimension: Dimension, answers: Answer[]): number;
}
