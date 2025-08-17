import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import LoginScreen from "@/app/login";
import { router } from "expo-router";
import { Alert } from "react-native";
import userService from "@/services/userService";
import en from "@/lang/locales/en.json";

describe("LoginScreen", () => {
  it("renders correctly", () => {
    const expectedText = en.login_register;
    const component = render(<LoginScreen />);

    expect(component.getByText(expectedText)).toBeTruthy();
  });

  it("navigates to register screen", () => {
    const buttonText = en.login_register;
    const component = render(<LoginScreen />);
    const element = component.getByText(buttonText);

    fireEvent.press(element);

    expect(router.push).toHaveBeenCalledWith("/register");
  });

  it("loggin with invalid credentials", async () => {
    const buttonText = en.login;
    const component = render(<LoginScreen />);
    const element = component.getAllByText(buttonText).pop();

    fireEvent.press(element);

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith("", en.invalid_credentials),
    );
  });

  it("loggin with valid credentials", async () => {
    const email = "test@example.com";
    const password = "123456";
    userService.register(email, email, password);

    const buttonText = en.login;
    const component = render(<LoginScreen />);
    const emailElement = component.getByPlaceholderText(en.email);
    const passwordElement = component.getByPlaceholderText(en.password);
    const element = component.getAllByText(buttonText).pop();

    fireEvent.changeText(emailElement, email);
    fireEvent.changeText(passwordElement, password);
    fireEvent.press(element);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/language");
    });
  });
});
