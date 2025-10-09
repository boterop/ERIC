import { Answer, Dimension } from "@/domain/Answer";

// Unmock answerService if it's mocked globally
jest.unmock("@/services/answerService");

jest.mock("@/adapters/answerApi", () => ({
  answerApi: {
    get: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    listByDimension: jest.fn(),
  },
}));

jest.mock("@/adapters/testAnswerApi", () => ({
  testAnswerApi: {
    get: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    listByDimension: jest.fn(),
  },
}));

describe("answerService", () => {
  // Import after mocks are set up
  let answerService: any;
  let answerApi: any;
  let testAnswerApi: any;

  beforeAll(() => {
    answerService = require("@/services/answerService").default;
    answerApi = require("@/adapters/answerApi").answerApi;
    testAnswerApi = require("@/adapters/testAnswerApi").testAnswerApi;
  });
  const testAnswer: Answer = {
    id: "1",
    question: 1,
    value: 4,
    dimension: "cognitive",
  };

  const testToken = "test-token";

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.USER;
  });

  describe("get", () => {
    it("uses answerApi when USER is not test", async () => {
      (answerApi.get as jest.Mock).mockResolvedValue(testAnswer);

      const result = await answerService.get("1", testToken);

      expect(answerApi.get).toHaveBeenCalledWith("1", testToken);
      expect(testAnswerApi.get).not.toHaveBeenCalled();
      expect(result).toEqual(testAnswer);
    });

    it("uses testAnswerApi when USER is test", async () => {
      process.env.USER = "test";
      (testAnswerApi.get as jest.Mock).mockResolvedValue(testAnswer);

      const result = await answerService.get("1", testToken);

      expect(testAnswerApi.get).toHaveBeenCalledWith("1", testToken);
      expect(answerApi.get).not.toHaveBeenCalled();
      expect(result).toEqual(testAnswer);
    });
  });

  describe("create", () => {
    it("uses answerApi when USER is not test", async () => {
      (answerApi.create as jest.Mock).mockResolvedValue(testAnswer);

      const result = await answerService.create(testAnswer, testToken);

      expect(answerApi.create).toHaveBeenCalledWith(testAnswer, testToken);
      expect(testAnswerApi.create).not.toHaveBeenCalled();
      expect(result).toEqual(testAnswer);
    });

    it("uses testAnswerApi when USER is test", async () => {
      process.env.USER = "test";
      (testAnswerApi.create as jest.Mock).mockResolvedValue(testAnswer);

      const result = await answerService.create(testAnswer, testToken);

      expect(testAnswerApi.create).toHaveBeenCalledWith(testAnswer, testToken);
      expect(answerApi.create).not.toHaveBeenCalled();
      expect(result).toEqual(testAnswer);
    });
  });

  describe("update", () => {
    it("uses answerApi when USER is not test", async () => {
      const updatedAnswer = { ...testAnswer, value: 5 };
      (answerApi.update as jest.Mock).mockResolvedValue(updatedAnswer);

      const result = await answerService.update(updatedAnswer, testToken);

      expect(answerApi.update).toHaveBeenCalledWith(updatedAnswer, testToken);
      expect(testAnswerApi.update).not.toHaveBeenCalled();
      expect(result).toEqual(updatedAnswer);
    });

    it("uses testAnswerApi when USER is test", async () => {
      process.env.USER = "test";
      const updatedAnswer = { ...testAnswer, value: 5 };
      (testAnswerApi.update as jest.Mock).mockResolvedValue(updatedAnswer);

      const result = await answerService.update(updatedAnswer, testToken);

      expect(testAnswerApi.update).toHaveBeenCalledWith(
        updatedAnswer,
        testToken,
      );
      expect(answerApi.update).not.toHaveBeenCalled();
      expect(result).toEqual(updatedAnswer);
    });
  });

  describe("listByDimension", () => {
    const dimension: Dimension = "cognitive";
    const answers: Answer[] = [
      { id: "1", question: 1, value: 4, dimension },
      { id: "2", question: 2, value: 5, dimension },
    ];

    it("uses answerApi when USER is not test", async () => {
      (answerApi.listByDimension as jest.Mock).mockResolvedValue(answers);

      const result = await answerService.listByDimension(dimension, testToken);

      expect(answerApi.listByDimension).toHaveBeenCalledWith(
        dimension,
        testToken,
      );
      expect(testAnswerApi.listByDimension).not.toHaveBeenCalled();
      expect(result).toEqual(answers);
    });

    it("uses testAnswerApi when USER is test", async () => {
      process.env.USER = "test";
      (testAnswerApi.listByDimension as jest.Mock).mockResolvedValue(answers);

      const result = await answerService.listByDimension(dimension, testToken);

      expect(testAnswerApi.listByDimension).toHaveBeenCalledWith(
        dimension,
        testToken,
      );
      expect(answerApi.listByDimension).not.toHaveBeenCalled();
      expect(result).toEqual(answers);
    });

    it("handles different dimensions correctly", async () => {
      const dimensions: Dimension[] = [
        "cognitive",
        "emotional",
        "procedural",
        "critical",
      ];

      for (const dim of dimensions) {
        (answerApi.listByDimension as jest.Mock).mockResolvedValue([]);
        await answerService.listByDimension(dim, testToken);
        expect(answerApi.listByDimension).toHaveBeenCalledWith(dim, testToken);
      }
    });
  });
});
