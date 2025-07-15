import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { NumberPad } from "@/components";

describe("NumberPad", () => {
  it("renders correctly", () => {
    const numpadNumbers = 10;
    const component = render(<NumberPad onPress={() => {}} />);

    for (let i = 0; i < numpadNumbers; i++) {
      expect(component.getByText(`${i}`)).toBeTruthy();
    }
  });

  it("should call onPress when a button is pressed", () => {
    let result = "";

    const onPress = jest.fn((value: string) => {
      result += value;
    });

    const component = render(<NumberPad onPress={onPress} />);

    const fx = "1234567890+*-/";

    for (const btn of fx) {
      fireEvent.press(component.getByText(btn));
    }

    expect(onPress).toHaveBeenCalledTimes(fx.length);
    expect(result).toBe(fx);
  });
});
