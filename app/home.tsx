import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons/";
import storageService from "@/services/storageService";

const HomeScreen = () => {
  const { t } = useTranslation();

  const dimensions = ["procedural", "emotional", "cognitive", "critical"];

  const goTo = (dimension: string) => router.push(`/dimensions/${dimension}`);

  const Card = ({ title, dimension }: { title: string; dimension: string }) => (
    <View
      style={tw`flex-row items-center justify-between w-[90%] rounded-lg border-2 border-gray-300 p-4`}
    >
      <View style={tw`flex-row gap-2 items-center justify-center`}>
        <AntDesign name="question" size={24} color="black" />
        <Text style={tw`text-xl capitalize`}>{title}</Text>
      </View>
      <TouchableOpacity onPress={() => goTo(dimension)}>
        <AntDesign name="play" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex gap-16 w-full h-full items-center justify-center p-4`}>
      <TouchableOpacity
        style={tw`absolute top-12 right-4 flex-row gap-2 items-center justify-center`}
        onPress={async () => {
          storageService.remove("session");
          router.replace("/login");
        }}
      >
        <Text style={tw`text-right capitalize`}>{t("logout")}</Text>
        <AntDesign name="logout" size={13} color="black" />
      </TouchableOpacity>
      <Text style={tw`text-2xl capitalize`}>{t("select_dimension")}</Text>
      <View style={tw`flex gap-4 w-full items-center justify-center`}>
        {dimensions.map((dimension) => (
          <Card
            key={dimension}
            title={t(`dimension.${dimension}`)}
            dimension={dimension}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;
