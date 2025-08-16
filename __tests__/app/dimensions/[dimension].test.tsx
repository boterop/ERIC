import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import DimensionScreen from "@/app/dimensions/[dimension]";
import en from "@/lang/locales/en.json";

describe("[dimension] Screen", () => {
  it("renders correctly", async () => {
    const expectedText = en.procedural.instructions;
    const component = render(<DimensionScreen />);
    const element = await component.findByText(expectedText);

    expect(element).toBeTruthy();
  });

  it("it should hide instructions", async () => {
    const expectedText = en.procedural.instructions;
    const component = render(<DimensionScreen />);

    const button = await component.findByText(en.start);

    expect(component.getByText(expectedText)).toBeTruthy();

    fireEvent.press(button);

    expect(component.queryByText(expectedText)).toBeNull();
  });
});
