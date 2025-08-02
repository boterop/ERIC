import { answerApi } from "@/adapters/answerApi";
import { Answer, Dimension } from "@/domain/Answer";

const answerService = {
  get: async (id: string, token: string) => answerApi.get(id, token),
  create: async (answer: Answer, token: string) =>
    answerApi.create(answer, token),
  update: async (answer: Answer, token: string) =>
    answerApi.update(answer, token),
  listByDimension: async (dimension: Dimension, token: string) =>
    answerApi.listByDimension(dimension, token),
};

export default answerService;
