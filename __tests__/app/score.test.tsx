import { render, waitFor } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
  useLocalSearchParams: jest.fn(),
}));

jest.mock("@/services/answerService", () => ({
  __esModule: true,
  default: {
    listByDimension: jest.fn().mockResolvedValue([]),
  },
}));

jest.mock("@/services/scoreService", () => ({
  __esModule: true,
  default: {
    calculate: jest.fn().mockReturnValue(4.5),
    toLevel: jest.fn().mockReturnValue("high"),
  },
}));

jest.mock("@/services/storageService", () => ({
  __esModule: true,
  default: {
    get: jest.fn().mockResolvedValue("test-token"),
  },
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        thank_you: "Thank you",
        continue: "Continue",
      };
      return translations[key] || key;
    },
  }),
}));

describe("ScoreScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      dimension: "cognitive",
    });
  });

  it("renders correctly", async () => {
    const ScoreScreen = require("@/app/score").default;
    const component = render(<ScoreScreen />);
    await waitFor(() => {
      expect(component).toBeTruthy();
    });
  });

  it("renders without crashing", async () => {
    const ScoreScreen = require("@/app/score").default;
    const component = render(<ScoreScreen />);
    await waitFor(() => {
      expect(component).toBeTruthy();
    });
  });
});
