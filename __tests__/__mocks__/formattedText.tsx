import { TextStyle } from "react-native";

jest.mock("@/components/FormattedText", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return ({ children, style }: { children: string; style?: TextStyle }) => (
    <Text style={style}>{children}</Text>
  );
});
