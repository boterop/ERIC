import { AnswerApi } from "@/ports";
import { storageService } from "@/adapters/storageService";

export const testAnswerApi: AnswerApi = {
  get: async (id, _token) => {
    const response = await storageService.get(`answer-${id}`);

    return JSON.parse(response || "");
  },
  create: async (answer, _token) => {
    await storageService.save(`answer-${answer.id}`, JSON.stringify(answer));
    const dimension = await storageService.get(`answer-${answer.dimension}`);
    const parsed = JSON.parse(dimension || "[]");
    parsed.push(answer);
    await storageService.save(
      `answer-${answer.dimension}`,
      JSON.stringify(parsed),
    );

    return answer;
  },
  update: async (answer, _token) => {
    await storageService.save(
      `answer-${answer.id}`,
      JSON.stringify({ answer }),
    );
    const dimension = await storageService.get(`answer-${answer.dimension}`);
    const newDimension = JSON.parse(dimension || "[]").filter(
      (ans: any) => ans.id !== answer.id,
    );
    newDimension.push(answer);
    await storageService.save(
      `answer-${answer.dimension}`,
      JSON.stringify(answer),
    );
    await storageService.save(
      `answer-${answer.dimension}`,
      JSON.stringify(newDimension),
    );

    return answer;
  },
  listByDimension: async (dimension, _token) => {
    const response = await storageService.get(`answer-${dimension}`);
    return JSON.parse(response || "[]");
  },
};
