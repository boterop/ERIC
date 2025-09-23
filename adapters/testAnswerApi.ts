import { Answer } from "@/domain/Answer";
import { AnswerApi } from "@/ports";

const answers: Answer[] = [];

export const testAnswerApi: AnswerApi = {
  get: async (id, _token) => {
    const response = answers.find((a) => a.id === id);

    if (!response) throw new Error("Not found");

    return response;
  },
  create: async (answer, _token) => {
    answers.push(answer);
    return answer;
  },
  update: async (answer, _token) => {
    const index = answers.findIndex((a) => a.id === answer.id);

    if (index === -1) throw new Error("Not found");

    answers[index] = answer;

    return answer;
  },
  listByDimension: async (dimension, _token) =>
    answers.filter((a) => a.dimension === dimension),
};
