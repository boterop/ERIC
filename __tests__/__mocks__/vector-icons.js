jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  const mock = (_props) => <Text>Icon</Text>;

  return {
    AntDesign: mock,
    Feather: mock,
  };
});
