// src/components/Header.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { icons } from "@/constants/icons";
import images from "@/constants/images";

type HeaderProps = {
  title: string;
  back?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, back }) => {
  // Fonts nur einmal für die App laden (besser im Root),
  // hier aber für Demo weiter lokal:
  const [fontsLoaded] = useFonts({
    OrbitronBold: require("@/assets/fonts/Orbitron-Bold.ttf"),
  });

  if (!fontsLoaded) return null; // <–– nicht blockieren!

  return (
    <View style={styles.container}>
      <Image source={images.backGround} style={styles.backGroundImage} />
      {back && <Image source={icons.arrowback} style={styles.backIcon} />}

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 160,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: "OrbitronBold",
    fontSize: 30,
    color: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 80,
    zIndex: 2, // Titel über dem Hintergrundbild
  },
  backIcon: {
    position: "absolute",
    left: 16,
    width: 50,
    height: 50,
  },
  backGroundImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    tintColor: "#007AFF",
    zIndex: 1, // Hintergrundbild hinter dem Header
  },
});
