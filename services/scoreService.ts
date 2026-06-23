import score from "@/adapters/score";
import { Answer, Dimension } from "@/domain/Answer";
import { Score } from "@/ports/Score";

const adapter = score;

const scoreService: Score = {
  toLevel: (score: number) => adapter.toLevel(score),
  calculate: (dimension: Dimension, answers: Answer[]) =>
    adapter.calculate(dimension, answers),
  generateExcel: (token: string) => adapter.generateExcel(token),
};

export default scoreService;
