import { Answer } from "@/domain/Answer";
import answerService from "@/services/answerService";

const answerFixture = async ({ question, value, dimension }: Partial<Answer>) =>
  answerService.create(
    {
      question: question || 1,
      value: value || 5,
      dimension: dimension || "procedural",
    },
    "",
  );

export default answerFixture;
