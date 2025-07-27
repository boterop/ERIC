import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import LoginScreen from "@/app/login";
import { router } from "expo-router";
import { Alert } from "react-native";
import userService from "@/services/userService";

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
    const email = "test@example.com";
    const password = "123456";
    userService.register(email, email, password);

    const buttonText = "Iniciar sesión";
    const component = render(<LoginScreen />);
    const emailElement = component.getByPlaceholderText("Correo");
    const passwordElement = component.getByPlaceholderText("Contraseña");
    const element = component.getAllByText(buttonText).pop();

    fireEvent.changeText(emailElement, email);
    fireEvent.changeText(passwordElement, password);
    fireEvent.press(element);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/home");
    });
  });
});
