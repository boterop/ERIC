import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import LoginScreen from "@/app/login";
import { router } from "expo-router";
import { Alert } from "react-native";
import { sessionService } from "@/infrastructure/tokens/SessionService";

jest.mock("@/infrastructure/tokens/SessionService", () => ({
  sessionService: {
    create: jest.fn((email) => Promise.resolve(`session-${email}`)),
  },
}));

describe("LoginScreen", () => {
  it("renders correctly", () => {
    const expectedText = "¿No tienes cuenta? Registrate";
    const component = render(<LoginScreen />);

    expect(component.getByText(expectedText)).toBeTruthy();
  });

  it("navigates to register screen", () => {
    const buttonText = "¿No tienes cuenta? Registrate";
    const component = render(<LoginScreen />);
    const element = component.getByText(buttonText);

    fireEvent.press(element);

    expect(router.push).toHaveBeenCalledWith("/register");
  });

  it("loggin with invalid credentials", async () => {
    const buttonText = "Iniciar sesión";
    const component = render(<LoginScreen />);
    const element = component.getAllByText(buttonText).pop();

    fireEvent.press(element);

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith("", "Credenciales incorrectas"),
    );
  });

  it("loggin with valid credentials", async () => {
    const buttonText = "Iniciar sesión";
    const component = render(<LoginScreen />);
    const emailElement = component.getByPlaceholderText("Correo");
    const passwordElement = component.getByPlaceholderText("Contraseña");
    const element = component.getAllByText(buttonText).pop();

    fireEvent.changeText(emailElement, "test@example.com");
    fireEvent.changeText(passwordElement, "123456");
    fireEvent.press(element);

    await waitFor(() => {
      expect(sessionService.create).toHaveBeenCalledWith("test@example.com");
      expect(router.replace).toHaveBeenCalledWith("/home");
    });
  });
});
