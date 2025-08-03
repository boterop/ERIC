import { Answer } from "@/domain/Answer";

const answers: Answer[] = [];

jest.mock("@/services/answerService", () => ({
  get: jest.fn((id, _token) =>
    Promise.resolve(answers.find((a) => a.id === id)),
  ),
  create: jest.fn((answer, _token) => Promise.resolve(answers.push(answer))),
  update: jest.fn((answer, _token) => Promise.resolve(answers.push(answer))),
  listByDimension: jest.fn((dimension, _token) =>
    Promise.resolve(answers.filter((a) => a.dimension === dimension)),
  ),
}));
