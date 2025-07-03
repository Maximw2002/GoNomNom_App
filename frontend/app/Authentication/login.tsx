import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SettingsButton from "@/components/SettingsButton";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import AuthInput from "@/components/AuthInput";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/firebase";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const btnScale = useSharedValue(1);
  const btnColor = useSharedValue("#007AFF");
  const txtColor = useSharedValue("#fff");
  const btnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
    backgroundColor: btnColor.value,
  }));
  const txtAnimatedStyle = useAnimatedStyle(() => ({
    color: txtColor.value,
  }));

  const signIn = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus.");
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/(tabs)");
    } catch (error: any) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        Alert.alert(
          "Anmeldung fehlgeschlagen",
          "Die E-Mail oder das Passwort ist falsch."
        );
      } else {
        Alert.alert("Fehler", error.message);
      }
      console.log("Error signing in:", error.message);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerBackVisible: false,
          headerTransparent: true, // Header-Hintergrund transparent
          headerShadowVisible: false,
        }}
      />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={styles.btnContainer}>
          <AuthInput
            placeholder="E-Mail"
            icon={icons.user}
            value={email}
            onChangeText={setEmail}
          />
          <AuthInput
            placeholder="Password"
            icon={icons.lock}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Pressable
            onPressIn={() => {
              btnScale.value = withTiming(0.9, { duration: 200 });
              btnColor.value = withTiming("#fff", {
                duration: 200,
              });
              txtColor.value = withTiming("#000", { duration: 200 });
            }}
            onPressOut={() => {
              btnScale.value = withTiming(1, { duration: 200 });
              btnColor.value = withTiming("#007AFF", { duration: 200 });
              txtColor.value = withTiming("#fff", { duration: 200 });
            }}
            onPress={signIn}
          >
            <Animated.View style={[styles.regBtnStyle, btnAnimatedStyle]}>
              <Animated.Text style={[styles.regTextStyle, txtAnimatedStyle]}>
                Login
              </Animated.Text>
            </Animated.View>
          </Pressable>
        </View>
        <View style={styles.backGround}>
          <Image
            source={require("@/assets/images/login.png")}
            style={{ width: "100%", height: "100%" }}
          />
          <LinearGradient
            colors={[
              "rgba(23, 23, 23, 1)",
              "rgba(23, 23, 23, 0.95)",
              "rgba(23, 23, 23, 0.85)",
              "rgba(23, 23, 23, 0.75)",
              "rgba(23, 23, 23, 0.7)",
              "rgba(23, 23, 23, 0.6)",
              "transparent",
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
      </View>
    </>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backGround: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "87%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0, // Ensure background is behind other elements
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 110,
    marginBottom: 70,
    zIndex: 1, // Ensure title is above the background
  },
  title: {
    fontSize: 45,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Lobster-Regular", // Custom Font
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1, // Ensure buttons are above the background
  },
  regBtnStyle: {
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 50,
    marginTop: 48,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  regTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
