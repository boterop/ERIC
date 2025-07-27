import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons/";

const HomeScreen = () => {
  const { t } = useTranslation();

  const dimensions = ["procedural", "emotional", "cognitive", "critial"];

  const goTo = (dimension: string) => router.push(`/dimensions/${dimension}`);

  const Card = ({ title }) => (
    <View
      style={tw`flex-row items-center justify-between w-[90%] rounded-lg border-2 border-gray-300 p-4`}
    >
      <View style={tw`flex-row gap-2 items-center justify-center`}>
        <AntDesign name="question" size={24} color="black" />
        <Text style={tw`text-xl capitalize`}>{title}</Text>
      </View>
      <TouchableOpacity onPress={() => goTo(title)}>
        <AntDesign name="play" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={tw`flex gap-16 w-full h-full items-center justify-center bg-gray-100 p-4`}
    >
      <Text style={tw`text-2xl capitalize`}>{t("select_dimension")}</Text>
      <View style={tw`flex gap-4 w-full items-center justify-center`}>
        {dimensions.map((dimension) => (
          <Card title={t(`dimension.${dimension}`)} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;
