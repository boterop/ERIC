import i18n from "@/lang";
import storageService from "@/services/storageService";
import { router } from "expo-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

const LanguageScreen = () => {
  const { t } = useTranslation();
  const language = useRef(i18n.language);

  const switchLanguage = async (lang: string) => {
    await storageService.save("language", lang);
    i18n.changeLanguage(lang);
    router.replace("/home");
  };

  const Option = ({ label, code }: { label: string; code: string }) => {
    const isSelected = language.current === code;
    return (
      <TouchableOpacity
        style={tw`w-full rounded-xl py-2 px-4 ${isSelected ? "bg-black" : "border-2 border-gray-300"}`}
        onPress={() => switchLanguage(code)}
      >
        <Text
          style={tw`text-lg text-center capitalize ${isSelected ? "text-white" : "text-black"}`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={tw`flex w-full h-full items-center justify-center bg-gray-100`}
    >
      <View
        style={tw`flex gap-12 bg-white w-80% p-4 py-8 rounded shadow-md items-center justify-center`}
      >
        <Text style={tw`text-2xl`}>{t("select_language")}</Text>
        <View style={tw`flex gap-4 w-full items-center justify-center`}>
          <Option label={t("language.english")} code="en" />
          <Option label={t("language.spanish")} code="es" />
          <Option label={t("language.french")} code="fr" />
        </View>
      </View>
    </View>
  );
};

export default LanguageScreen;
