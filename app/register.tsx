import { useState } from "react";
import { View, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import userService from "@/services/userService";
import storageService from "@/services/storageService";
import { useTranslation } from "react-i18next";

const RegisterScreen = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword)
      return Alert.alert("", t("all_fields_required"));

    if (password !== confirmPassword)
      return Alert.alert("", t("passwords_dont_match"));

    userService
      .register(name, email, password)
      .then(async (_user) => {
        const token = await userService.login(email, password);

        if (token) {
          storageService.save("session", token);
        }
        router.replace("/home");
      })
      .catch((error) => {
        Alert.alert("", error.message);
      });
  };

  const goToLogin = () => router.push("/login");

  return (
    <View
      style={tw`flex w-full h-full items-center justify-center bg-gray-100`}
    >
      <View
        style={tw`flex gap-4 bg-white w-80% p-4 py-8 rounded shadow-md items-center justify-center`}
      >
        <Text style={tw`text-2xl capitalize`}>{t("register")}</Text>
        <TextInput
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder={t("full_name")}
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder={t("email")}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder={t("password")}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder={t("confirm_password")}
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <TouchableOpacity
          style={tw`w-full rounded-full bg-blue-500 py-2 px-4 text-white`}
          onPress={handleRegister}
        >
          <Text style={tw`text-center text-white`}>{t("register")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToLogin()}>
          <Text style={tw`text-center text-blue-500`}>
            {t("register_login")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
