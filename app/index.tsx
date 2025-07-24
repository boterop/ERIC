import { useEffect, useRef } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { storageService } from "@/adapters/storageService";

export default function IndexPage() {
  const initialMount = useRef<boolean>(true);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await storageService.get("session");
      if (!token) return router.replace("/login");

      router.replace("/home");
    };

    if (!initialMount.current) return;
    initialMount.current = false;
    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
