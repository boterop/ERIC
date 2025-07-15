import React from "react";
import { render } from "@testing-library/react-native";
import { Screen } from "@/components";

describe("Screen", () => {
  it("renders correctly", () => {
    const component = render(<Screen text="test" result="result" />);

    expect(component.getByText("test")).toBeTruthy();
    expect(component.getByText("result")).toBeTruthy();
  });
});
