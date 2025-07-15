import { act, renderHook } from "@testing-library/react-native";
import useCalculator from "@/hooks/useCalculator";

describe("useCalculator", () => {
  it("should return initial state", () => {
    const { result } = renderHook(() => useCalculator());

    expect(result.current.text).toBe("");
    expect(result.current.result).toBe("");
  });

  it("should handle onPress", () => {
    const { result } = renderHook(() => useCalculator());

    const expectedEquation = "2-5";
    const onPress = result.current.onPress;

    act(() => {
      onPress("2");
      onPress("*10^");
      onPress("DEL");
      onPress("-");
      onPress("5");
    });

    expect(result.current.text).toBe(expectedEquation);
  });

  it("should get result", () => {
    const { result } = renderHook(() => useCalculator());

    const expectedEquation = "5*(90+10)-(2*10^2+3*10^2)"; // should be evaluated to 0
    const onPress = result.current.onPress;

    act(() => {
      onPress("5");
      onPress("*");
      onPress("(");
      onPress("90");
      onPress("+");
      onPress("10");
      onPress(")");
      onPress("-");
      onPress("(");
      onPress("2");
      onPress("*10^");
      onPress("2");
      onPress("+");
      onPress("3");
      onPress("*10^");
      onPress("2");
      onPress(")");
      onPress("=");
    });

    expect(result.current.text).toBe(expectedEquation);
    expect(result.current.result).toBe("0");
  });

  it("should save prev ans", () => {
    const { result } = renderHook(() => useCalculator());

    const onPress = result.current.onPress;

    act(() => {
      onPress("3");
      onPress("*");
      onPress("2");
      onPress("=");
    });

    expect(result.current.result).toBe("6");

    act(() => {
      onPress("AC");
      onPress("Ans");
      onPress("+");
      onPress("4");
      onPress("=");
    });

    expect(result.current.result).toBe("10");
  });
});
