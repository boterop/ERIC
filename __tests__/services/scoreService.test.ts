import { Answer } from "@/domain/Answer";
import scoreService from "@/services/scoreService";

describe("scoreService", () => {
  it("calculates non inverted answers", () => {
    const answers = [];

    for (let i = 1; i <= 10; i++) {
      answers.push({ question: i, value: 5, dimension: "cognitive" } as Answer);
    }

    const expected = 5;

    const result = scoreService.calculate("cognitive", answers);

    expect(result).toBe(expected);
  });

  it("calculates score with inverted answers", () => {
    const answers = [];

    for (let i = 1; i <= 15; i++) {
      answers.push({ question: i, value: 5, dimension: "emotional" } as Answer);
    }

    const expected = 4.2;

    const result = scoreService.calculate("emotional", answers);

    expect(result).toBe(expected);
  });

  it("calculates inverted score with correct answers", () => {
    const answers = [];

    const invertedAnswers = [2, 3, 9];
    for (let i = 1; i <= 15; i++) {
      const value = invertedAnswers.includes(i) ? 1 : 5;
      answers.push({
        question: i,
        value: value,
        dimension: "emotional",
      } as Answer);
    }

    const expected = 5;

    const result = scoreService.calculate("emotional", answers);

    expect(result).toBe(expected);
  });
});
