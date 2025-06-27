import { Stack } from "expo-router";
import "./globals.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="restaurant/[id]" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
