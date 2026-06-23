import { useState } from "react";
import { View, Alert, Text, TouchableOpacity } from "react-native";
import userService from "@/services/userService";
import storageService from "@/services/storageService";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Input from "@/components/ui/Input";

const LoginScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "test@test.com") {
      process.env.USER = "test";
    }
    userService
      .login(email, password)
      .then((token) => {
        storageService.save("session", token || "");
        router.replace("/language");
      })
      .catch((error) => {
        Alert.alert("", t(error.message));
      });
  };

  const goToRegister = () => router.push("/register");

  return (
    <View
      style={tw`flex w-full h-full items-center justify-center bg-gray-100`}
    >
      <View
        style={tw`flex gap-4 bg-white w-80% p-4 py-8 rounded shadow-md items-center justify-center`}
      >
        <Text style={tw`text-2xl capitalize`}>{t("login")}</Text>
        <Input
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder={t("email")}
          onChangeText={setEmail}
          value={email}
        />
        <Input
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder={t("password")}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity
          style={tw`w-full rounded-full bg-blue-500 py-2 px-4 text-white`}
          onPress={handleLogin}
        >
          <Text style={tw`text-center text-white`}>{t("login")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToRegister()}>
          <Text style={tw`text-center text-blue-500`}>
            {t("login_register")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
