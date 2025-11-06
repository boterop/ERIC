import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import StartScreen from "@/app/start_screen";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "start_screen.1": "Step 1 content",
        "start_screen.2": "Step 2 content",
        authors: "Authors content",
        continue: "Continue",
      };
      return translations[key] || key;
    },
  }),
}));

describe("StartScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with first step", () => {
    const component = render(<StartScreen />);
    expect(component.getByText("Step 1 content")).toBeTruthy();
  });

  it("advances to next step on press", async () => {
    const component = render(<StartScreen />);
    const touchableArea = component.getByText("Continue").parent?.parent;

    fireEvent.press(touchableArea!);

    await waitFor(() => {
      expect(component.getByText("Step 2 content")).toBeTruthy();
    });
  });

  it("navigates to login on last step", async () => {
    const component = render(<StartScreen />);

    // Navigate through all steps
    for (let i = 0; i < 3; i++) {
      const touchableArea = component.getByText("Continue").parent?.parent;
      fireEvent.press(touchableArea!);
      await waitFor(() => {}, { timeout: 100 });
    }

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/login");
    });
  });

  it("displays continue button", () => {
    const component = render(<StartScreen />);
    expect(component.getByText("Continue")).toBeTruthy();
  });
});
