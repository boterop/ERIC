import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

const DimensionScreen = () => {
  const { dimension } = useLocalSearchParams();

  return <Text>{dimension}</Text>;
};

export default DimensionScreen;
