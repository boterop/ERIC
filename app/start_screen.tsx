import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Linking, Text, TouchableOpacity, View } from "react-native";

const PORTFOLIO = "https://www.boterop.io";

const StartScreen = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const steps = [t("start_screen.1"), t("start_screen.2"), t("authors")];

  const handleNext = () => {
    if (step >= steps.length - 1) return router.replace("/login");

    return setStep(step + 1);
  };

  const Modal = ({ children }: { children: React.ReactNode }) => (
    <View style={tw`flex w-full h-full items-center justify-center`}>
      <TouchableOpacity
        style={tw`flex w-full h-full items-center justify-center`}
        onPress={() => handleNext()}
      >
        <View style={tw`flex gap-8 w-[90%] border-2 shadow-md rounded-lg p-8`}>
          <Text style={tw`text-xl text-start`}>
            {children}
            {"\n"}
            {step === steps.length - 1 && (
              <Text
                style={tw`text-xl text-start underline`}
                onPress={() => Linking.openURL(PORTFOLIO)}
              >
                {PORTFOLIO}
              </Text>
            )}
          </Text>
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

  return <Modal>{steps[step]}</Modal>;
};

export default StartScreen;
