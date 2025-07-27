import { useState } from "react";
import { View, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import service from "@/services/userService";
import storageService from "@/services/storageService";
import { router } from "expo-router";
import { UserApi } from "@/ports";

const LoginScreen = ({ userService }: { userService?: UserApi }) => {
  const uService = userService || service;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () =>
    uService
      .login(email, password)
      .then((token) => {
        storageService.save("session", token || "");
        router.replace("/home");
      })
      .catch((error) => {
        if (error.message === "invalid_credentials")
          return Alert.alert("", "Credenciales incorrectas");
        Alert.alert("", error.message);
      });

  const goToRegister = () => router.push("/register");

  return (
    <View
      style={tw`flex w-full h-full items-center justify-center bg-gray-100`}
    >
      <View
        style={tw`flex gap-4 bg-white w-80% p-4 py-8 rounded shadow-md items-center justify-center`}
      >
        <Text style={tw`text-2xl capitalize`}>Iniciar sesión</Text>
        <TextInput
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder="Correo"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity
          style={tw`w-full rounded-full bg-blue-500 py-2 px-4 text-white`}
          onPress={handleLogin}
        >
          <Text style={tw`text-center text-white`}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToRegister()}>
          <Text style={tw`text-center text-blue-500`}>
            ¿No tienes cuenta? Registrate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
