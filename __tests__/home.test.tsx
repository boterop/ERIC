import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import HomeScreen from "@/app/home";
import { router } from "expo-router";
import en from "@/lang/locales/en.json";
import answerService from "@/services/answerService";

describe("HomeScreen", () => {
  it("renders correctly", () => {
    const expectedText = en.select_dimension;
    const component = render(<HomeScreen />);

    waitFor(() => {
      expect(component.getByText(expectedText)).toBeTruthy();
    });
  });

  it("loading view", () => {
    const expectedText = en.waiting_connection;
    const component = render(<HomeScreen />);

    expect(component.getByText(expectedText)).toBeTruthy();
  });

  it("logout", () => {
    const buttonText = en.logout;
    const component = render(<HomeScreen />);
    const element = component.getByText(buttonText);

    fireEvent.press(element);

    expect(router.replace).toHaveBeenCalledWith("/login");
  });

  it("draw 4 dimensions", async () => {
    render(<HomeScreen />);

    await waitFor(() => {
      expect(answerService.listByDimension).toHaveBeenCalledWith(
        "procedural",
        "",
      );
      expect(answerService.listByDimension).toHaveBeenCalledWith(
        "emotional",
        "",
      );
      expect(answerService.listByDimension).toHaveBeenCalledWith(
        "cognitive",
        "",
      );
      expect(answerService.listByDimension).toHaveBeenCalledWith(
        "critical",
        "",
      );
    });
  });

  it("navigates to dimension screen", async () => {
    const buttonText = `${en.dimension.procedural}-button`;
    const component = render(<HomeScreen />);

    await waitFor(() => {
      const element = component.getByTestId(buttonText);

      fireEvent.press(element);
      expect(router.push).toHaveBeenCalledWith("/dimensions/procedural");
    });
  });

  it('show 2 answers for "cognitive" dimension', async () => {
    answerService.create({ dimension: "cognitive", question: 1, value: 2 }, "");
    answerService.create({ dimension: "cognitive", question: 2, value: 1 }, "");

    const component = render(<HomeScreen />);

    waitFor(() => {
      expect(component.getByText(`2/${en.cognitive.count}`)).toBeTruthy();
    });
  });
});
