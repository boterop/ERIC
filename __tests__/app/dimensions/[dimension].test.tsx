import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import DimensionScreen from "@/app/dimensions/[dimension]";
import en from "@/lang/locales/en.json";
import answerFixture from "@/__tests__/fixtures/answer";

describe("[dimension] Screen", () => {
  it("renders correctly", async () => {
    const expectedText = en.procedural.instructions;
    const component = render(<DimensionScreen />);
    const element = await component.findByText(expectedText);

    expect(element).toBeTruthy();
  });

  it("should hide instructions", async () => {
    const expectedText = en.procedural.instructions;
    const component = render(<DimensionScreen />);

    const button = await component.findByText(en.start);

    expect(component.getByText(expectedText)).toBeTruthy();

    fireEvent.press(button);

    expect(component.queryByText(expectedText)).toBeNull();
  });

  it("should start in the first question", async () => {
    const expectedText = en.procedural.questions["1"];
    const component = render(<DimensionScreen />);

    const button = await component.findByText(en.start);

    fireEvent.press(button);

    expect(component.getByText(expectedText)).toBeTruthy();
  });

  it("should start in the last answered question", async () => {
    await answerFixture({ question: 1, dimension: "procedural" });
    await answerFixture({ question: 2, dimension: "procedural" });

    const expectedText = en.procedural.questions["3"];
    const component = render(<DimensionScreen />);

    const button = await component.findByText(en.start);

    fireEvent.press(button);

    expect(component.getByText(expectedText)).toBeTruthy();
  });
});
