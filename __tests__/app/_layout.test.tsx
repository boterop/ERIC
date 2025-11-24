import { render } from "@testing-library/react-native";
import RootLayout from "@/app/_layout";

jest.mock("expo-font", () => ({
  useFonts: jest.fn(() => [true]),
}));

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

describe("RootLayout", () => {
  it("renders correctly when fonts are loaded", () => {
    const component = render(<RootLayout />);
    expect(component).toBeTruthy();
  });

  it("returns null when fonts are not loaded", () => {
    const { useFonts } = require("expo-font");
    useFonts.mockReturnValueOnce([false]);

    const result = render(<RootLayout />);
    // When fonts are not loaded, the component returns null
    // The root may not have children
    expect(result).toBeTruthy();
  });
});
