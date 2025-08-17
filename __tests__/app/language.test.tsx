import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import LanguageScreen from "@/app/language";
import { router } from "expo-router";
import en from "@/lang/locales/en.json";
import i18n from "@/lang";

describe("LanguageScreen", () => {
  it("renders correctly", () => {
    const expectedText = en.select_language;
    const component = render(<LanguageScreen />);

    expect(component.getByText(expectedText)).toBeTruthy();
  });

  describe("Options", () => {
    it("switches language to english", async () => {
      const buttonText = en.language.english;
      const component = render(<LanguageScreen />);
      const element = component.getByText(buttonText);

      fireEvent.press(element);

      await waitFor(() => {
        expect(i18n.changeLanguage).toHaveBeenCalledWith("en");
        expect(router.replace).toHaveBeenCalledWith("/home");
      });
    });

    it("switches language to spanish", async () => {
      const buttonText = en.language.spanish;
      const component = render(<LanguageScreen />);
      const element = component.getByText(buttonText);

      fireEvent.press(element);

      await waitFor(() => {
        expect(i18n.changeLanguage).toHaveBeenCalledWith("es");
        expect(router.replace).toHaveBeenCalledWith("/home");
      });
    });

    it("switches language to french", async () => {
      const buttonText = en.language.french;
      const component = render(<LanguageScreen />);
      const element = component.getByText(buttonText);

      fireEvent.press(element);

      await waitFor(() => {
        expect(i18n.changeLanguage).toHaveBeenCalledWith("fr");
        expect(router.replace).toHaveBeenCalledWith("/home");
      });
    });
  });
});
