import { Answer, Dimension } from "@/domain/Answer";

export interface AnswerApi {
  listByDimension(dimension: Dimension, token: string): Promise<Answer[]>;
  get: (id: string, token: string) => Promise<Answer>;
  create(answer: Answer, token: string): Promise<Answer>;
  update(answer: Answer, token: string): Promise<Answer>;
}
