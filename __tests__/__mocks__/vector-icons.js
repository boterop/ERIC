jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  const mock = (_props) => <Text>Icon</Text>;

  return {
    AntDesign: mock,
    Entypo: mock,
    Feather: mock,
    FontAwesome: mock,
    FontAwesome5: mock,
    Fontisto: mock,
    Foundation: mock,
    Ionicons: mock,
    MaterialCommunityIcons: mock,
    MaterialIcons: mock,
    Octicons: mock,
    SimpleLineIcons: mock,
    Zocial: mock,
  };
});
