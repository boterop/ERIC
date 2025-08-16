import { Answer, Dimension } from "@/domain/Answer";
import { Score } from "@/ports/Score";

const scoreInversion = {
  procedural: [1, 2, 9],
  emotional: [2, 3, 9],
};

const invert = (value: number) => 5 - (value - 1);

const calc = (dimension: Dimension, answers: Answer[]): number => {
  const answer = answers.shift();
  if (!answer) return 0;

  const isInvertedAnswer =
    (dimension === "procedural" || dimension === "emotional") &&
    scoreInversion[dimension].includes(answer.question);

  const value = isInvertedAnswer ? invert(answer.value) : answer.value;

  return value + calc(dimension, answers);
};

const score: Score = {
  calculate: (dimension: Dimension, answers: Answer[]): number => {
    const dimensionAnswers = answers.filter(
      (answer) => answer.dimension === dimension,
    );

    const length = dimensionAnswers.length;

    const qualification = calc(dimension, dimensionAnswers) / length;

    return qualification;
  },
};

export default score;
