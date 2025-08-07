jest.mock("react-native-svg", () => {
  const React = require("react");
  const { View } = require("react-native");

  const Mock = (props) => <View {...props} />;

  return {
    Svg: Mock,
    Circle: Mock,
    Rect: Mock,
    Path: Mock,
    G: Mock,
    Line: Mock,
    Text: Mock,
    Defs: Mock,
    Stop: Mock,
    Ellipse: Mock,
    LinearGradient: Mock,
    Polygon: Mock,
    Polyline: Mock,
    RadialGradient: Mock,
    Symbol: Mock,
    Use: Mock,
    ...Mock,
  };
});
