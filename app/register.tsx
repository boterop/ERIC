import { useState } from "react";
import { View, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    Alert.alert("", "Credenciales incorrectas");
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
          onPress={handleLogin}
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
