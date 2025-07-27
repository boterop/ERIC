import storageService from "@/services/storageService";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

const HomeScreen = () => {
  return (
    <TouchableOpacity
      style={tw`flex w-full h-full items-center justify-center bg-gray-100`}
      onPress={() => {
        storageService.remove("session");
        router.replace("/login");
      }}
    >
      <Text>logout</Text>
    </TouchableOpacity>
  );
};

export default HomeScreen;
