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
  return (
    <View style={styles.container}>
      {/* <Image source={images.backGround} style={styles.backGroundImage} /> */}
      {back && <Image source={icons.arrowback} style={styles.backIcon} />}

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: "Lobster-Regular", // Custom Font
    fontSize: 45,
    color: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    position: "absolute",
    top: 60,
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
