import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue } from "react-native-reanimated";
import SettingsButton from "@/components/SettingsButton";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";

const register = () => {
  const router = useRouter();
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
        <View style={styles.backGround}>
          <Image
            source={require("@/assets/images/login.png")}
            style={{ width: "100%", height: "100%" }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.4)",
              "rgba(23, 23, 23, 0.6)",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>GoNomNom</Text>
        </View>
        <View style={styles.btnContainer}></View>
      </View>
    </>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backGround: {
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  title: {
    position: "absolute",
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 60,
  },
});
