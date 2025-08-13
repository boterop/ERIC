import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

const StartScreen = ({
  setStartScreen,
}: {
  setStartScreen: (_b: boolean) => void;
}) => {
  const { t } = useTranslation();

  return (
    <View style={tw`flex w-full h-full items-center justify-center`}>
      <TouchableOpacity
        style={tw`flex w-full h-full items-center justify-center`}
        onPress={() => setStartScreen(false)}
      >
        <View style={tw`flex w-[90%] border-2 shadow-md rounded-lg p-8`}>
          <Text style={tw`text-xl text-justify`}>{t("start_screen")}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen;
