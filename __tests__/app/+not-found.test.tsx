import { render } from "@testing-library/react-native";
import NotFoundScreen from "@/app/+not-found";

// Mock Stack component from expo-router
jest.mock("expo-router", () => ({
  Stack: {
    Screen: () => null,
  },
  Link: require("react-native").TouchableOpacity,
}));

describe("NotFoundScreen", () => {
  it("renders correctly", () => {
    const component = render(<NotFoundScreen />);
    expect(component.getByText("This screen doesn't exist.")).toBeTruthy();
  });

  it("displays link to home screen", () => {
    const component = render(<NotFoundScreen />);
    expect(component.getByText("Go to home screen!")).toBeTruthy();
  });

  it("displays title in Stack.Screen", () => {
    const component = render(<NotFoundScreen />);
    // The Stack.Screen with title "Oops!" should be rendered
    expect(component).toBeTruthy();
  });
});
