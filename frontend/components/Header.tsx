// src/components/Header.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { icons } from "@/constants/icons";

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
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.container}>
        {back && (
          <Image source={icons.arrowback} style={styles.backIcon} />
        )}

        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#000",            // identisch zum Screen
  },
  container: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "OrbitronBold",
    fontSize: 30,
    color: "#ffffff",
  },
  backIcon: {
    position: "absolute",
    left: 16,
    width: 50,
    height: 50,
  },
});
