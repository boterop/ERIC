import { render } from "@testing-library/react-native";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("@/adapters/storageService", () => ({
  storageService: {
    get: jest.fn().mockResolvedValue(null),
  },
}));

jest.mock("react-i18next", () => ({
  I18nextProvider: ({ children }: any) => children,
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/lang", () => ({
  __esModule: true,
  default: {
    changeLanguage: jest.fn(),
  },
}));

describe("IndexPage", () => {
  it("renders loading indicator", () => {
    const IndexPage = require("@/app/index").default;
    const component = render(<IndexPage />);
    const indicator = component.UNSAFE_getByType(require("react-native").ActivityIndicator);
    expect(indicator).toBeTruthy();
  });

  it("renders component correctly", () => {
    const IndexPage = require("@/app/index").default;
    const component = render(<IndexPage />);
    expect(component).toBeTruthy();
  });
});
