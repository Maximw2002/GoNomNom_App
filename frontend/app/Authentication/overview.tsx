import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const overview = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerBackTitle: "Zurück",
          headerTransparent: true, // Header-Hintergrund transparent
          headerTintColor: "#fff", // Schrift/Icon-Farbe
          headerShadowVisible: false,
        }}
      />
      <View style={styles.container}>
        <View style={styles.back}
        <Image source={images.login} style={{ width: "100%", height: "48%" }} />
      </View>
    </>
  );
};

export default overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});
