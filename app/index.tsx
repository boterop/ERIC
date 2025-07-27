import { useEffect, useRef } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { storageService } from "@/adapters/storageService";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lang";

const IndexPage = () => {
  const initialMount = useRef<boolean>(true);

  const checkLogin = async () => {
    const token = await storageService.get("session");
    if (!token) return router.replace("/login");

    router.replace("/home");
  };

  const setLanguage = async () => {
    const language = await storageService.get("language");
    if (!language) return;
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    if (!initialMount.current) return;
    initialMount.current = false;
    setLanguage();
    checkLogin();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    </I18nextProvider>
  );
};

export default IndexPage;
