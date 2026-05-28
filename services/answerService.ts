import { answerApi } from "@/adapters/answerApi";
import { testAnswerApi } from "@/adapters/testAnswerApi";
import { Answer, Dimension } from "@/domain/Answer";

const answerService = {
  get: async (id: string, token: string) => {
    const adapter = process.env.USER === "test" ? testAnswerApi : answerApi;
    return adapter.get(id, token);
  },
  create: async (answer: Answer, token: string) => {
    const adapter = process.env.USER === "test" ? testAnswerApi : answerApi;
    return adapter.create(answer, token);
  },
  update: async (answer: Answer, token: string) => {
    const adapter = process.env.USER === "test" ? testAnswerApi : answerApi;
    return adapter.update(answer, token);
  },
  listByDimension: async (
    dimension: Dimension,
    token: string,
    userId?: string,
  ) => {
    const adapter = process.env.USER === "test" ? testAnswerApi : answerApi;
    return adapter.listByDimension(dimension, token, userId);
  },
};

export default answerService;
