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

const overview = () => {
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
        <View style={styles.btnContainer}>
          <SettingsButton
            name="Neues Konto anlegen"
            onPress={() => router.push("/Authentication/register")}
            buttonStyle={styles.createButton}
            buttonColor="#007AFF"
            textColor="#fff"
            textStyle={styles.text}
            icon={icons.register}
          />
          <SettingsButton
            name="Anmelden"
            onPress={() => router.push("/Authentication/login")}
            buttonStyle={styles.loginButton}
            textStyle={styles.text}
            icon={icons.login}
          />
        </View>
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
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 67,
  },
  createButton: {
    height: 50,
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  loginButton: {
    height: 50,
    paddingHorizontal: 18,
    width: 280,
    backgroundColor: "#007AFF",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
