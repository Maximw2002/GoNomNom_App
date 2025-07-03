import { Stack } from "expo-router";
import "./globals.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      "Lobster-Regular": require("@/assets/fonts/Lobster-Regular.ttf"),
      "Alkatra-Medium": require("@/assets/fonts/Alkatra-Medium.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
