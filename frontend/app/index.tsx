import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SettingsButton from "@/components/SettingsButton";
import { icons } from "@/constants/icons";
import AuthInput from "@/components/AuthInput";
import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const overviewOpacity = useSharedValue(1);
  const registerOpacity = useSharedValue(0);
  const loginOpacity = useSharedValue(0);
  const overviewZIndex = useSharedValue(1);
  const registerZIndex = useSharedValue(0);
  const loginZIndex = useSharedValue(0);

  const handleShowRegister = () => {
    overviewOpacity.value = withTiming(0, { duration: 300 });
    overviewZIndex.value = 0;
    setTimeout(() => {
      setShowRegister(true);
      registerOpacity.value = withTiming(1, { duration: 500 });
      registerZIndex.value = 1;
    }, 300);
  };

  const handleShowLogin = () => {
    overviewOpacity.value = withTiming(0, { duration: 300 });
    overviewZIndex.value = 0;
    setTimeout(() => {
      setShowLogin(true);
      loginOpacity.value = withTiming(1, { duration: 500 });
      loginZIndex.value = 1;
    }, 300);
  };

  const handleShowOverview = () => {
    registerOpacity.value = withTiming(0, { duration: 300 });
    loginOpacity.value = withTiming(0, { duration: 300 });
    registerZIndex.value = 0;
    loginZIndex.value = 0;
    setTimeout(() => {
      setShowRegister(false);
      setShowLogin(false);
      overviewOpacity.value = withTiming(1, { duration: 500 });
      overviewZIndex.value = 1;
    }, 300);
  };

  const signUp = async () => {
    try {
      if (!email || !password || !username) {
        Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus.");
        return;
      }

      // Check if username is already taken
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userName", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert("Fehler", "Dieser Benutzername ist bereits vergeben.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          userName: username,
          email: user.email,
          profilePicture:
            "http://localhost:3000/images/ProfilePictures/generic.png",
          favorites: [],
          friendIds: [],
          cuisinePref: [],
          pricePref: "€€€",
        });
        router.push("/(tabs)");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Fehler", "Diese E-Mail-Adresse wird bereits verwendet.");
      } else {
        Alert.alert("Fehler", error.message);
      }
      console.log("Error signing up:", error.message);
    }
  };

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

  const signUpBtnScale = useSharedValue(1);
  const signUpBtnColor = useSharedValue("#007AFF");
  const signUpTxtColor = useSharedValue("#fff");

  const signUpbtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: signUpBtnScale.value }],
    backgroundColor: signUpBtnColor.value,
  }));

  const signUptxtAnimatedStyle = useAnimatedStyle(() => ({
    color: signUpTxtColor.value,
  }));

  const overviewAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overviewOpacity.value,
    zIndex: overviewZIndex.value,
  }));

  const registerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: registerOpacity.value,
    zIndex: registerZIndex.value,
  }));

  const loginAnimatedStyle = useAnimatedStyle(() => ({
    opacity: loginOpacity.value,
    zIndex: loginZIndex.value,
  }));

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerBackVisible: false,
          headerTransparent: true,
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

        {(showRegister || showLogin) && (
          <Pressable
            onPress={handleShowOverview}
            style={[styles.backButton, { top: insets.top + 10 }]}
          >
            <Image
              source={icons.arrowback}
              style={{ width: 24, height: 24, tintColor: "#fff" }}
            />
          </Pressable>
        )}

        <Animated.View style={[styles.contentWrapper, overviewAnimatedStyle]}>
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>GoNomNom</Text>
          </View>
          <View style={styles.overviewBtnContainer}>
            <SettingsButton
              name="Neues Konto anlegen"
              onPress={handleShowRegister}
              buttonStyle={styles.createButton}
              buttonColor="#007AFF"
              textColor="#fff"
              textStyle={styles.text}
              icon={icons.register}
            />
            <SettingsButton
              name="Anmelden"
              onPress={handleShowLogin}
              buttonStyle={styles.loginButton}
              textStyle={styles.text}
              icon={icons.login}
            />
          </View>
        </Animated.View>

        <Animated.View style={[styles.contentWrapper, registerAnimatedStyle]}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Registrieren</Text>
          </View>
          <View style={styles.registerBtnContainer}>
            <AuthInput
              placeholder="Username"
              icon={icons.user}
              value={username}
              onChangeText={setUsername}
            />
            <AuthInput
              placeholder="E-Mail"
              icon={icons.email}
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
                signUpBtnScale.value = withTiming(0.9, { duration: 200 });
                signUpBtnColor.value = withTiming("#fff", {
                  duration: 200,
                });
                signUpTxtColor.value = withTiming("#000", { duration: 200 });
              }}
              onPressOut={() => {
                signUpBtnScale.value = withTiming(1, { duration: 200 });
                signUpBtnColor.value = withTiming("#007AFF", {
                  duration: 200,
                });
                signUpTxtColor.value = withTiming("#fff", {
                  duration: 200,
                });
              }}
              onPress={signUp}
            >
              <Animated.View
                style={[styles.regBtnStyle, signUpbtnAnimatedStyle]}
              >
                <Animated.Text
                  style={[styles.regTextStyle, signUptxtAnimatedStyle]}
                >
                  Account erstellen
                </Animated.Text>
              </Animated.View>
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View style={[styles.contentWrapper, loginAnimatedStyle]}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login</Text>
          </View>
          <View style={styles.registerBtnContainer}>
            <AuthInput
              placeholder="E-Mail"
              icon={icons.email}
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
                signUpBtnScale.value = withTiming(0.9, { duration: 200 });
                signUpBtnColor.value = withTiming("#fff", {
                  duration: 200,
                });
                signUpTxtColor.value = withTiming("#000", { duration: 200 });
              }}
              onPressOut={() => {
                signUpBtnScale.value = withTiming(1, { duration: 200 });
                signUpBtnColor.value = withTiming("#007AFF", {
                  duration: 200,
                });
                signUpTxtColor.value = withTiming("#fff", {
                  duration: 200,
                });
              }}
              onPress={signIn}
            >
              <Animated.View
                style={[styles.regBtnStyle, signUpbtnAnimatedStyle]}
              >
                <Animated.Text
                  style={[styles.regTextStyle, signUptxtAnimatedStyle]}
                >
                  Anmelden
                </Animated.Text>
              </Animated.View>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contentWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButton: {
    position: "absolute",
    left: 20,
    zIndex: 10,
  },
  backGround: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 110,
    marginBottom: 150,
  },
  title: {
    fontSize: 45,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "BalooPaaji2-ExtraBold",
  },
  mainTitle: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "BalooPaaji2-ExtraBold",
  },
  overviewBtnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  registerBtnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -115,
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
