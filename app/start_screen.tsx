import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

const StartScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={tw`flex w-full h-full items-center justify-center`}>
      <TouchableOpacity
        style={tw`flex w-full h-full items-center justify-center`}
        onPress={() => router.replace("/login")}
      >
        <View style={tw`flex gap-8 w-[90%] border-2 shadow-md rounded-lg p-8`}>
          <Text style={tw`text-xl text-justify`}>{t("start_screen")}</Text>
          <View style={tw`flex-row w-full items-center justify-center`}>
            <Text style={tw`text-lg text-center font-bold`}>
              {t("continue")}
            </Text>
            <MaterialIcons name="navigate-next" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen;
