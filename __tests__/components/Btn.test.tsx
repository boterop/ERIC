import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Btn } from "@/components";

describe("Btn", () => {
  it("renders correctly", () => {
    const expectedText = "Button test!";
    const component = render(<Btn text={expectedText} onPress={() => {}} />);

    expect(component.getByText(expectedText)).toBeTruthy();
  });

  it("should call onPress when pressed", () => {
    const onPress = jest.fn();
    const btnName = "Button test!";
    const component = render(<Btn text={btnName} onPress={onPress} />);

    fireEvent.press(component.getByText(btnName));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(btnName);
  });
});
