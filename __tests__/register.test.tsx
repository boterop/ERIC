import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import RegisterScreen from "@/app/register";
import en from "@/lang/locales/en.json";

describe("RegisterScreen", () => {
  it("renders correctly", () => {
    const expectedText = en.register_login;
    const component = render(<RegisterScreen />);

    expect(component.getByText(expectedText)).toBeTruthy();
  });

  it("navigates to login screen", () => {
    const buttonText = en.register_login;
    const component = render(<RegisterScreen />);
    const element = component.getByText(buttonText);

    fireEvent.press(element);

    expect(router.push).toHaveBeenCalledWith("/login");
  });
});
