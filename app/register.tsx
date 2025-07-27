import { useState } from "react";
import { View, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import userService from "@/services/userService";
import storageService from "@/services/storageService";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password)
      return Alert.alert("", "Todos los campos son obligatorios");

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
        <Text style={tw`text-2xl capitalize`}>Registro</Text>
        <TextInput
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder="Nombre completo"
          onChangeText={setName}
          value={name}
        />
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
          onPress={handleRegister}
        >
          <Text style={tw`text-center text-white`}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToLogin()}>
          <Text style={tw`text-center text-blue-500`}>
            ¿Ya tienes cuenta? Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
