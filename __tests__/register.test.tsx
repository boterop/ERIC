import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import RegisterScreen from "@/app/register";

describe("RegisterScreen", () => {
  it("renders correctly", () => {
    const expectedText = "Registro";
    const component = render(<RegisterScreen />);

    expect(component.getByText(expectedText)).toBeTruthy();
  });

  it("navigates to login screen", () => {
    const buttonText = "¿Ya tienes cuenta? Iniciar sesión";
    const component = render(<RegisterScreen />);
    const element = component.getByText(buttonText);

    fireEvent.press(element);

    expect(router.push).toHaveBeenCalledWith("/login");
  });
});
