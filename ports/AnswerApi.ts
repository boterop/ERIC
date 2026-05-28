import { Answer, Dimension } from "@/domain/Answer";

export interface AnswerApi {
  listByDimension(
    _dimension: Dimension,
    _token: string,
    _userId?: string,
  ): Promise<Answer[]>;
  get: (_id: string, _token: string) => Promise<Answer>;
  create(_answer: Answer, _token: string): Promise<Answer>;
  update(_answer: Answer, _token: string): Promise<Answer>;
}
